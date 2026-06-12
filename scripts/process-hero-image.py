import os
import cv2
import numpy as np
from PIL import Image

def process_hero_image():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    
    input_path = os.path.join(project_dir, 'assets', 'imagetrash-be4be93a-7105-4df1-9be7-db95f4540876.png')
    output_path = os.path.join(project_dir, 'public', 'ecosort-device-hero.png')
    
    # 1. Load image
    print(f"Loading image from: {input_path}")
    img = cv2.imread(input_path)
    if img is None:
        raise FileNotFoundError(f"Could not load image at {input_path}")
    
    h_img, w_img = img.shape[:2]
    print(f"Original image dimensions: {w_img}x{h_img}")
    
    # 2. GrabCut Segmentation (2 passes)
    # Define initial rect: ~14% left, 8% top, 72% width, 86% height
    x = int(w_img * 0.14)
    y = int(h_img * 0.08)
    w = int(w_img * 0.72)
    h = int(h_img * 0.86)
    rect = (x, y, w, h)
    
    print(f"GrabCut Pass 1 with rect: {rect}")
    mask = np.zeros(img.shape[:2], np.uint8)
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)
    
    cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)
    
    # Pass 2: GrabCut with mask (setting border to background)
    print("GrabCut Pass 2 with mask")
    border_px = 5
    mask[0:border_px, :] = cv2.GC_BGD
    mask[-border_px:, :] = cv2.GC_BGD
    mask[:, 0:border_px] = cv2.GC_BGD
    mask[:, -border_px:] = cv2.GC_BGD
    
    cv2.grabCut(img, mask, None, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_MASK)
    
    # Get binary mask
    binary_mask = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype('uint8')
    
    # Morph close/open (kernel elíptico 5x5)
    morph_kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    binary_mask = cv2.morphologyEx(binary_mask, cv2.MORPH_CLOSE, morph_kernel)
    binary_mask = cv2.morphologyEx(binary_mask, cv2.MORPH_OPEN, morph_kernel)
    
    # 3. Extend bottom base
    # Find last row containing body foreground
    pts = np.argwhere(binary_mask == 255)
    if len(pts) == 0:
        raise ValueError("No foreground found in GrabCut mask")
        
    y_min, x_min = pts.min(axis=0)
    y_max, x_max = pts.max(axis=0)
    last_body = y_max
    
    # Calculate min width of the last 25 rows of the body
    min_w = w_img
    for y_row in range(max(0, last_body - 24), last_body + 1):
        fg_indices = np.where(binary_mask[y_row] == 255)[0]
        if len(fg_indices) > 0:
            width_row = max(fg_indices) - min(fg_indices) + 1
            if width_row < min_w:
                min_w = width_row
    
    print(f"Last body row: {last_body}, min body width of last 25 rows: {min_w}")
    
    # Scan downwards starting from last_body + 1
    x_start = min(np.where(binary_mask[last_body] == 255)[0])
    x_end = max(np.where(binary_mask[last_body] == 255)[0])
    
    for y_row in range(last_body + 1, h_img):
        # Calculate luminance and spread for the row
        row_pixels = img[y_row, :].astype(float)
        b, g, r = row_pixels[:, 0], row_pixels[:, 1], row_pixels[:, 2]
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        spread = np.maximum(r, np.maximum(g, b)) - np.minimum(r, np.minimum(g, b))
        
        # Valid pixels condition: lum > 165, spread < 50
        valid_mask = (lum > 165) & (spread < 50)
        valid_indices = np.where(valid_mask)[0]
        
        # Find continuous segment that overlaps with [x_start, x_end]
        # Allow slight padding of 15px for continuity
        overlapping = [idx for idx in valid_indices if x_start - 15 <= idx <= x_end + 15]
        
        if not overlapping:
            print(f"Stopping extension at row {y_row}: no overlapping valid pixels")
            break
            
        x_start_y = min(overlapping)
        x_end_y = max(overlapping)
        width_y = x_end_y - x_start_y + 1
        
        # Stop if width grows too much (sombra del piso se ensancha)
        if width_y > min_w * 1.3:
            print(f"Stopping extension at row {y_row}: width {width_y} exceeded 1.3 * min_w ({min_w * 1.3})")
            break
            
        # Include in mask
        binary_mask[y_row, x_start_y:x_end_y+1] = 255
        x_start, x_end = x_start_y, x_end_y
        last_body = y_row
        
    # 4. Strip floor shadow (bottom 10%)
    y_start_shadow_check = int(h_img * 0.9)
    print(f"Checking for shadow from row {y_start_shadow_check} downwards")
    
    # First: Remove neutral grey pixels in the bottom region
    for y_row in range(y_start_shadow_check, h_img):
        fg_indices = np.where(binary_mask[y_row] == 255)[0]
        for x_col in fg_indices:
            b, g, r = img[y_row, x_col].astype(float)
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            spread = max(r, g, b) - min(r, g, b)
            # Neutral gray pixels (floor shadow)
            if spread < 18 and lum < 220:
                binary_mask[y_row, x_col] = 0
                
    # Second: Cut off rows where the width grows again (shadow blob)
    widths = []
    for y_row in range(y_start_shadow_check, h_img):
        fg_indices = np.where(binary_mask[y_row] == 255)[0]
        if len(fg_indices) > 0:
            widths.append((y_row, min(fg_indices), max(fg_indices), max(fg_indices) - min(fg_indices) + 1))
        else:
            widths.append((y_row, 0, 0, 0))
            
    min_width_val = 999999
    min_width_idx = -1
    cut_y = -1
    for i in range(len(widths)):
        y_row, xs, xe, w_val = widths[i]
        if w_val == 0:
            continue
        if w_val < min_width_val:
            min_width_val = w_val
            min_width_idx = i
        elif w_val > min_width_val * 1.05 and i > min_width_idx:
            # Width starts growing again after the cylinder neck/base narrow point
            cut_y = y_row
            print(f"Floor shadow blob expansion detected at row {cut_y} (width {w_val} > min {min_width_val}). Cutting off.")
            break
            
    if cut_y != -1:
        binary_mask[cut_y:, :] = 0

    # 5. Clean Alpha and Defringe
    # Erode mask 2px to isolate internal core, and find fringe (edge)
    kernel_erode = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    eroded_mask = cv2.erode(binary_mask, kernel_erode, iterations=2)
    fringe = cv2.subtract(binary_mask, eroded_mask)
    
    # Inpaint fringe area to remove background color bleeding (halos)
    print("Defringing image edges using inpainting")
    defringed_img = cv2.inpaint(img, fringe, 3, cv2.INPAINT_TELEA)
    
    # Smooth alpha mask
    alpha = cv2.GaussianBlur(binary_mask, (3, 3), 0.5)
    
    # Assemble RGBA
    rgba = cv2.cvtColor(defringed_img, cv2.COLOR_BGR2BGRA)
    rgba[:, :, 3] = alpha
    
    # 6. Crop + upscale
    # Get bounding box of the final foreground
    pts = np.argwhere(binary_mask == 255)
    if len(pts) == 0:
        raise ValueError("No foreground remaining after processing")
    y_min, x_min = pts.min(axis=0)
    y_max, x_max = pts.max(axis=0)
    
    print(f"Final foreground bounding box: Y:[{y_min}, {y_max}], X:[{x_min}, {x_max}]")
    
    # We want exactly 627 x 854 crop so 2x upscale gives 1254 x 1708.
    # The bottom padding should be exactly 36px below y_max.
    y_end = y_max + 36
    y_start = y_end - 854
    
    # Check bounds and adjust
    if y_end > h_img:
        y_end = h_img
        y_start = y_end - 854
    if y_start < 0:
        y_start = 0
        y_end = 854
        
    x_center = (x_min + x_max) // 2
    x_start = x_center - 313
    x_end = x_start + 627
    
    if x_start < 0:
        x_start = 0
        x_end = 627
    elif x_end > w_img:
        x_end = w_img
        x_start = w_img - 627
        
    print(f"Cropping region: Y:[{y_start}, {y_end}], X:[{x_start}, {x_end}]")
    cropped_rgba = rgba[y_start:y_end, x_start:x_end]
    
    # Convert BGRA to RGBA for PIL
    cropped_rgba_rgb = cv2.cvtColor(cropped_rgba, cv2.COLOR_BGRA2RGBA)
    
    # Upscale 2x using Lanczos
    print(f"Upscaling to 1254x1708 using Lanczos")
    pil_img = Image.fromarray(cropped_rgba_rgb)
    pil_img_resized = pil_img.resize((1254, 1708), Image.Resampling.LANCZOS)
    
    # Save image
    print(f"Saving final image to: {output_path}")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    pil_img_resized.save(output_path)
    print("Processing complete!")

if __name__ == "__main__":
    process_hero_image()

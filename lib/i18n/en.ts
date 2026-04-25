export type Translations = {
  locale: "en" | "es";
  nav: {
    howItWorks: string;
    techSpecs: string;
    joinWaitlist: string;
  };
  hero: {
    badge: string;
    headline: string;
    headlineAccent: string;
    headlineSuffix: string;
    subtext: string;
    ctaPrimary: string;
    ctaSecondary: string;
    accuracyBadge: string;
    speedBadge: string;
  };
  stats: Array<{ value: string; label: string }>;
  problem: {
    eyebrow: string;
    headline: string;
    body: string;
    rows: Array<{ value: string; label: string; source: string }>;
    imageCaption: string;
    pullQuote: string;
    pullQuoteAttr: string;
  };
  solution: {
    eyebrow: string;
    headline: string;
    body: string;
    accuracyLabel: string;
    accuracySub: string;
    hardwareCaption: string;
    categorySubs: Array<string>;
    features: Array<{ title: string; desc: string }>;
  };
  howItWorks: {
    eyebrow: string;
    headline: string;
    headlineMuted: string;
    imageCaption: string;
    totalTimePrefix: string;
    totalTime: string;
    steps: Array<{ n: string; label: string; headline: string; body: string; tech: string }>;
  };
  techSpecs: {
    eyebrow: string;
    headline: string;
    body: string;
    footerNote: string;
    sessionBadge: string;
    rows: Array<{ label: string; value: string; sub: string }>;
  };
  cta: {
    eyebrow: string;
    headline: string;
    headlineMuted: string;
    body: string;
    placeholder: string;
    button: string;
    success: string;
    roadmapTitle: string;
    nextLabel: string;
    milestones: Array<{ done: boolean; label: string }>;
    roadmapFooter: string;
    statLabels: Array<string>;
  };
  about: {
    eyebrow:  string;
    headline: string;
    body:     string;
    uag:      string;
    team:     Array<{ name: string; role: string }>;
    sessions: string;
    status:   string;
  };
  footer: {
    lang:      string;
    copy:      string;
    github:    string;
    developer: string;
  };
};

export const en: Translations = {
  locale: "en",
  nav: {
    howItWorks:   "How it works",
    techSpecs:    "Tech specs",
    joinWaitlist: "Join waitlist",
  },
  hero: {
    badge:          "Raspberry Pi 5 · On-device AI · No cloud",
    headline:       "The bin that ",
    headlineAccent: "knows",
    headlineSuffix: "where it goes.",
    subtext:
      "EcoSort AI scans any waste item, classifies it with 95.8% accuracy, and physically routes it to the correct bin — in under 2 seconds.",
    ctaPrimary:    "Get early access",
    ctaSecondary:  "How it works",
    accuracyBadge: "95.8% accuracy",
    speedBadge:    "⚡ <2s inference",
  },
  stats: [
    { value: "95.8%", label: "accuracy" },
    { value: "< 2s",  label: "inference" },
    { value: "4",     label: "categories" },
    { value: "3,778", label: "training images" },
  ],
  problem: {
    eyebrow:  "The problem",
    headline: "Most recycling bins\nare just decoration.",
    body:
      "People want to do the right thing. The system fails them. Confusing labels, inconsistent rules, zero real-time feedback — recyclables end up in landfills anyway.",
    rows: [
      { value: "9%",  label: "of all plastic ever produced has been recycled",       source: "UNEP, 2023" },
      { value: "70%", label: "of Mexicans want to recycle but don't know the rules", source: "INEGI, 2022" },
      { value: "40M", label: "tons of solid waste generated in Mexico every year",   source: "SEMARNAT" },
    ],
    imageCaption:  "Tiradero municipal — México. Residuos que pudieron reciclarse.",
    pullQuote:     "The problem isn't willingness. It's infrastructure. People don't sort correctly because no one gives them real-time feedback.",
    pullQuoteAttr: "— EcoSort AI, design thesis",
  },
  solution: {
    eyebrow:  "The solution",
    headline: "EcoSort AI.\nNot an app. A machine.",
    body:
      "A physical device powered by computer vision that sits in your space and sorts for you — in real time, with no human intervention needed.",
    accuracyLabel: "Validation accuracy",
    accuracySub:   "MobileNetV2 · TFLite INT8 · TrashNet dataset",
    hardwareCaption: "Raspberry Pi 5 · Camera Module 3 · 2× NEMA 17 steppers — edge hardware, no cloud",
    categorySubs: ["PET, HDPE, PVC", "Newspaper, office", "Boxes, packaging", "Cans, foil"],
    features: [
      { title: "Edge inference — zero internet",    desc: "MobileNetV2 quantized to TFLite INT8 runs entirely on the Raspberry Pi 5. Your data never leaves the device." },
      { title: "Bowl gimbal — 2 NEMA 17 steppers",  desc: "Two NEMA 17 motors tilt a central bowl on two axes (X and Y) to 35° — routing the item directly into the correct quadrant." },
      { title: "4 material categories",             desc: "Trained on TrashNet — 3,778 real images across Plastic, Paper, Cardboard, and Aluminum." },
      { title: "Real-time dashboard",               desc: "A connected screen shows item, confidence score, and step-by-step recycling instructions immediately." },
    ],
  },
  howItWorks: {
    eyebrow:         "How it works",
    headline:        "Drop it in.",
    headlineMuted:   "It handles the rest.",
    imageCaption:    "Plastic · Aluminum · Cardboard · Paper — the 4 materials EcoSort AI classifies",
    totalTimePrefix: "From drop to sorted: ",
    totalTime:       "under 3 seconds",
    steps: [
      {
        n: "01", label: "Drop",
        headline: "Place any item on the scanner.",
        body:     "No prep needed. A bottle, a can, a box — just set it on the platform. The IR sensor detects it and triggers the camera automatically.",
        tech:     "IR sensor · Auto-trigger",
      },
      {
        n: "02", label: "Identify",
        headline: "On-device AI classifies in <2s.",
        body:     "MobileNetV2 trained on 3,778 TrashNet images runs locally via TFLite INT8 on Raspberry Pi 5. No internet. No cloud. No lag.",
        tech:     "MobileNetV2 · TFLite INT8 · 95.8% acc",
      },
      {
        n: "03", label: "Sort",
        headline: "Stepper motors tilt the bowl.",
        body:     "Two NEMA 17 stepper motors rotate a central bowl on X and Y axes to 35° — the item slides directly into Plastic, Paper, Cardboard, or Aluminum.",
        tech:     "2× NEMA 17 · A4988/TMC2209 · Bowl gimbal",
      },
      {
        n: "04", label: "Feedback",
        headline: "Screen confirms with instructions.",
        body:     "A dashboard shows: item detected, confidence percentage, material class, and exact recycling steps — rinse, crush, remove cap, etc.",
        tech:     "Local display · Real-time",
      },
    ],
  },
  techSpecs: {
    eyebrow:  "Tech specs",
    headline: "Built on real hardware.\nNot a demo.",
    body:     "Every spec is real and validated. This runs on a $90 computer — not a server farm.",
    footerNote:   "University prototype · Python + TensorFlow Lite · Open hardware",
    sessionBadge: "Session S003 complete",
    rows: [
      { label: "Platform",          value: "Raspberry Pi 5",                          sub: "4GB RAM · BCM2712 SoC" },
      { label: "AI model",          value: "MobileNetV2",                             sub: "Transfer learning on ImageNet" },
      { label: "Optimization",      value: "TFLite INT8",                             sub: "Post-training quantization" },
      { label: "Accuracy",          value: "95.8%",                                   sub: "Held-out validation set · 754 images" },
      { label: "Inference time",    value: "< 2 seconds",                             sub: "Fully on-device, no internet" },
      { label: "Training dataset",  value: "TrashNet",                                sub: "3,778 labeled images · 4 categories" },
      { label: "Categories",        value: "Plastic · Paper · Cardboard · Aluminum",  sub: "Most common household recyclables" },
      { label: "Mechanism",         value: "Bowl gimbal — 2× NEMA 17",               sub: "Two-axis tilt · 35° per channel" },
      { label: "Motor driver",      value: "A4988 / TMC2209",                         sub: "GPIO: M1 pins 17,27,22 · M2 pins 23,24,25" },
      { label: "Power supply",      value: "12V · 3A",                               sub: "Required for NEMA 17 operation" },
      { label: "Connectivity",      value: "None required",                           sub: "Edge inference only" },
      { label: "Display",           value: "Local dashboard",                         sub: "Real-time classification + instructions" },
    ],
  },
  cta: {
    eyebrow:       "Join the waitlist",
    headline:      "This is going live.",
    headlineMuted: "Be there first.",
    body:
      "The model is trained. The prototype is being assembled. We'll notify you the moment EcoSort AI is ready — one email, no spam.",
    placeholder: "your@email.com",
    button:      "Join waitlist",
    success:     "You're in. One email when we're ready.",
    roadmapTitle: "Project roadmap",
    nextLabel:    "Next",
    milestones: [
      { done: true,  label: "AI model trained (MobileNetV2 · 95.8%)" },
      { done: true,  label: "TFLite INT8 quantization" },
      { done: true,  label: "Webcam inference validated — S003" },
      { done: false, label: "Hardware purchase & assembly" },
      { done: false, label: "Real-world object validation" },
      { done: false, label: "CAD design — NEMA 17 bowl gimbal" },
      { done: false, label: "Public launch" },
    ],
    roadmapFooter: "UAG · Universidad Autónoma de Guadalajara · Python + TensorFlow Lite",
    statLabels: ["Sessions done", "Accuracy", "Inference"],
  },
  about: {
    eyebrow:  "The team",
    headline: "5 students.\nOne machine.",
    body:     "EcoSort AI is a capstone engineering project at UAG — Universidad Autónoma de Guadalajara. We built it because recycling infrastructure fails people, not the other way around.",
    uag:      "Universidad Autónoma de Guadalajara · Engineering",
    team: [
      { name: "Saulo",    role: "AI & Software Lead" },
      { name: "Mauricio", role: "Mechanical Design" },
      { name: "Emilio",   role: "Physical Integration" },
      { name: "David",    role: "Hardware & Electronics" },
      { name: "Luis",     role: "QA & Testing" },
    ],
    sessions: "4 sessions completed",
    status:   "Active — prototype in assembly",
  },
  footer: {
    lang:      "Español",
    copy:      "EcoSortAI · University prototype",
    github:    "View on GitHub",
    developer: "Built by SauloMLA · UAG students",
  },
};

import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.WAITLIST_EMAIL ?? "your@email.com";

export async function POST(req: NextRequest) {
  try {
    const { email, locale } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // 1. Notify you — new signup
    await resend.emails.send({
      from:    "EcoSortAI <onboarding@resend.dev>",
      to:      TO_EMAIL,
      subject: `New waitlist signup — ${email}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 480px; color: #1c1917;">
          <h2 style="font-size: 1.4rem; margin-bottom: 0.5rem;">New signup 🌱</h2>
          <p style="color: #666; margin-top: 0;">${email} just joined the EcoSort AI waitlist.</p>
          <hr style="border: none; border-top: 1px solid #e5e0d8; margin: 1.5rem 0;" />
          <p style="font-size: 0.8rem; color: #999;">EcoSort AI · ${locale === "es" ? "Español" : "English"}</p>
        </div>
      `,
    });

    // 2. Confirm to the user
    await resend.emails.send({
      from:    "EcoSort AI <onboarding@resend.dev>",
      to:      email,
      subject: locale === "es"
        ? "Ya estás en la lista — EcoSort AI"
        : "You're on the list — EcoSort AI",
      html: locale === "es"
        ? `
          <div style="font-family: Georgia, serif; max-width: 480px; color: #1c1917;">
            <h2 style="font-size: 1.6rem; margin-bottom: 0.5rem;">Ya estás dentro.</h2>
            <p style="color: #555; line-height: 1.6;">
              El modelo está entrenado. El prototipo se está ensamblando.<br/>
              Te avisaremos cuando EcoSort AI esté listo — un solo correo, sin spam.
            </p>
            <hr style="border: none; border-top: 1px solid #e5e0d8; margin: 1.5rem 0;" />
            <p style="font-size: 0.75rem; color: #999;">EcoSort AI · Proyecto universitario</p>
          </div>
        `
        : `
          <div style="font-family: Georgia, serif; max-width: 480px; color: #1c1917;">
            <h2 style="font-size: 1.6rem; margin-bottom: 0.5rem;">You're in.</h2>
            <p style="color: #555; line-height: 1.6;">
              The model is trained. The prototype is being assembled.<br/>
              We'll reach out the moment EcoSort AI is ready — one email, no spam.
            </p>
            <hr style="border: none; border-top: 1px solid #e5e0d8; margin: 1.5rem 0;" />
            <p style="font-size: 0.75rem; color: #999;">EcoSort AI · University prototype</p>
          </div>
        `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[waitlist]", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}

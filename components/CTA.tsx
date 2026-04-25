"use client";

import { useRef, useState } from "react";
import { useReveal } from "@/lib/useReveal";
import type { Translations } from "@/lib/i18n/en";

const STAT_VALUES = ["S003", "95.8%", "< 2s"];

export default function CTA({ t }: { t: Translations }) {
  const ref = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  useReveal(ref);
  const c = t.cta;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, locale: t.locale }),
      });
      if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="cta" className="relative py-28 md:py-36 px-6" style={{ background: "var(--cream)" }}>
      <div className="divider absolute top-0 left-0 right-0" />
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20 items-start">

          {/* Left */}
          <div className="flex flex-col gap-7">
            <p className="reveal text-xs tracking-[0.2em] uppercase font-medium" style={{ color: "var(--forest)" }}>
              {c.eyebrow}
            </p>
            <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl leading-[1.12] tracking-tight" style={{ color: "var(--ink)" }}>
              {c.headline}
              <br />
              <span style={{ color: "var(--ink-mid)" }}>{c.headlineMuted}</span>
            </h2>
            <p className="reveal reveal-delay-2 text-base leading-relaxed" style={{ color: "var(--ink-mid)" }}>
              {c.body}
            </p>

            {/* Form */}
            {status === "done" ? (
              <div
                className="flex flex-col gap-4 px-6 py-6 rounded-xl"
                style={{ background: "var(--forest-bg)", border: "1px solid var(--forest-border)" }}
              >
                {/* Check + headline */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "var(--forest)" }}
                  >
                    <svg viewBox="0 0 14 14" className="w-4 h-4" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-base font-semibold" style={{ color: "var(--forest)", fontFamily: "var(--font-serif)" }}>
                    {c.success}
                  </p>
                </div>
                {/* Detail */}
                <p className="text-sm leading-relaxed" style={{ color: "var(--forest)", opacity: 0.75 }}>
                  {t.locale === "es"
                    ? `Registramos ${email}. Te escribiremos en cuanto el prototipo esté listo — un solo correo.`
                    : `We've registered ${email}. You'll hear from us the moment the prototype is ready — one email only.`}
                </p>
                {/* Divider + note */}
                <div style={{ borderTop: "1px solid var(--forest-border)", paddingTop: "0.75rem" }}>
                  <p className="text-xs" style={{ color: "var(--forest)", opacity: 0.55 }}>
                    {t.locale === "es"
                      ? "EcoSort AI · Proyecto UAG · Sin spam"
                      : "EcoSort AI · UAG project · No spam"}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={c.placeholder}
                  disabled={status === "loading"}
                  className="flex-1 px-4 py-3 rounded-full text-sm focus:outline-none transition-all duration-200 disabled:opacity-50"
                  style={{ background: "var(--white)", border: "1px solid var(--border-mid)", color: "var(--ink)" }}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary whitespace-nowrap disabled:opacity-60"
                >
                  {status === "loading"
                    ? (t.locale === "es" ? "Enviando…" : "Sending…")
                    : c.button}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="text-xs" style={{ color: "#b54b0a" }}>
                {t.locale === "es"
                  ? "Algo salió mal. Intenta de nuevo."
                  : "Something went wrong. Please try again."}
              </p>
            )}

            {/* Mini stats */}
            <div className="reveal reveal-delay-4 grid grid-cols-3 gap-3">
              {STAT_VALUES.map((value, i) => (
                <div key={i} className="flex flex-col items-center gap-1 py-4 rounded-xl text-center"
                  style={{ background: "var(--white)", border: "1px solid var(--border)" }}>
                  <p className="serif text-xl font-semibold" style={{ color: "var(--ink)" }}>{value}</p>
                  <p className="text-[10px] uppercase tracking-wide" style={{ color: "var(--ink-low)" }}>{c.statLabels[i]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — roadmap */}
          <div
            className="reveal reveal-delay-2 p-7 rounded-2xl"
            style={{ background: "var(--white)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
          >
            <p className="text-xs font-medium uppercase tracking-widest mb-6" style={{ color: "var(--ink-low)" }}>
              {c.roadmapTitle}
            </p>
            <div className="flex flex-col gap-3.5">
              {c.milestones.map(({ done, label }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: done ? "var(--forest)" : "var(--sand)", border: done ? "none" : "1.5px solid var(--border-mid)" }}
                  >
                    {done && (
                      <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm" style={{ color: done ? "var(--ink)" : "var(--ink-mid)", fontWeight: done ? 500 : 400 }}>
                    {label}
                  </span>
                  {!done && i === c.milestones.findIndex((m) => !m.done) && (
                    <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "var(--forest-bg)", color: "var(--forest)", border: "1px solid var(--forest-border)" }}>
                      {c.nextLabel}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs mt-7 pt-5" style={{ borderTop: "1px solid var(--border)", color: "var(--ink-low)" }}>
              {c.roadmapFooter}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

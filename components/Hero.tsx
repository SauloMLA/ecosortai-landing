"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Translations } from "@/lib/i18n/en";

export default function Hero({ t }: { t: Translations }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.querySelectorAll<HTMLElement>("[data-hi]").forEach((el, i) => {
      el.style.animationDelay = `${i * 0.14}s`;
      el.classList.add("animate-fade-in-up");
    });
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      style={{ background: "var(--sand-light)" }}
    >
      {/* ── Main content ── */}
      <div
        ref={ref}
        className="flex-1 max-w-6xl w-full mx-auto px-6 grid lg:grid-cols-[1fr_1fr] items-start gap-0 pt-28"
      >
        {/* Left */}
        <div className="flex flex-col gap-6 py-16 lg:py-0">
          {/* Brand as headline */}
          <h1
            data-hi
            className="opacity-0 leading-[0.95] tracking-tight"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "clamp(4rem, 9vw, 7.5rem)",
              color: "var(--ink)",
            }}
          >
            EcoSort
            <br />
            <em className="not-italic" style={{ color: "var(--forest)" }}>AI</em>
          </h1>

          {/* Tagline */}
          <p
            data-hi
            className="opacity-0 text-lg md:text-xl leading-snug"
            style={{
              color: "var(--ink-mid)",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              maxWidth: "28ch",
            }}
          >
            {t.hero.headline}
            <span style={{ color: "var(--ink)" }}>{t.hero.headlineAccent}</span>
            {" "}{t.hero.headlineSuffix}
          </p>

          {/* Body */}
          <p
            data-hi
            className="opacity-0 text-sm leading-relaxed"
            style={{ color: "var(--ink-mid)", maxWidth: "38ch" }}
          >
            {t.hero.subtext}
          </p>

          {/* CTA */}
          <div data-hi className="opacity-0 flex items-center gap-4">
            <a href="#cta" className="btn-primary">{t.hero.ctaPrimary}</a>
            <a
              href="#how-it-works"
              className="text-sm font-medium transition-colors duration-150"
              style={{ color: "var(--ink-mid)" }}
            >
              {t.hero.ctaSecondary} →
            </a>
          </div>
        </div>

        {/* Right — device */}
        <div
          data-hi
          className="opacity-0 relative flex items-start justify-center lg:justify-end"
          style={{ minHeight: "340px" }}
        >
          <Image
            src="/ecosort-real-device.png"
            alt="EcoSort AI smart sorting device — 4 quadrant square bin with camera arch"
            width={523}
            height={724}
            priority
            className="h-auto"
            style={{
              width: "min(90%, 560px)",
              maxHeight: "85vh",
              objectFit: "contain",
              objectPosition: "bottom",
            }}
          />
        </div>
      </div>

      {/* ── Bottom stats bar — like the OG image ── */}
      <div
        className="w-full px-6 pb-8"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="max-w-6xl mx-auto py-5 flex items-center gap-3 flex-wrap">
          {["95.8% accuracy", "No cloud", "Physical AI sorting", "NEMA 17 stepper motors"].map((item, i) => (
            <span key={i} className="flex items-center gap-3">
              {i > 0 && <span style={{ color: "var(--border-mid)" }}>·</span>}
              <span className="text-xs" style={{ color: "var(--ink-low)" }}>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

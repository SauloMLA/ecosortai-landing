"use client";

import { useRef } from "react";
import Image from "next/image";
import { useReveal } from "@/lib/useReveal";
import type { Translations } from "@/lib/i18n/en";

const STEP_COLORS = [
  "var(--forest)",
  "var(--plastic)",
  "var(--cardboard)",
  "var(--aluminum)",
];

export default function HowItWorks({ t }: { t: Translations }) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  const h = t.howItWorks;

  return (
    <section id="how-it-works" className="relative py-28 md:py-36 px-6" style={{ background: "var(--cream)" }}>
      <div className="divider absolute top-0 left-0 right-0" />
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <p className="reveal text-xs tracking-[0.2em] uppercase font-medium mb-7" style={{ color: "var(--forest)" }}>
              {h.eyebrow}
            </p>
            <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl leading-[1.12] tracking-tight" style={{ color: "var(--ink)" }}>
              {h.headline}
              <br />
              <span style={{ color: "var(--ink-mid)" }}>{h.headlineMuted}</span>
            </h2>
          </div>

          <div className="reveal reveal-delay-2 rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-md)", border: "1px solid var(--border)" }}>
            <Image
              src="/recyclables-flatlay.png"
              alt={h.imageCaption}
              width={900}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Steps — no icons, number + text only */}
        <div className="grid md:grid-cols-2 gap-px" style={{ background: "var(--border)", border: "1px solid var(--border)", borderRadius: "1.25rem", overflow: "hidden" }}>
          {h.steps.map(({ n, label, headline, body, tech }, i) => (
            <div
              key={n}
              className={`reveal reveal-delay-${i + 1} relative p-8 flex flex-col gap-4`}
              style={{ background: "var(--sand-light)" }}
            >
              {/* Step number — large background */}
              <span
                aria-hidden
                className="serif absolute top-6 right-7 text-6xl font-bold leading-none select-none"
                style={{ color: "var(--ink-ultra)", letterSpacing: "-0.04em" }}
              >
                {n}
              </span>

              {/* Label */}
              <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: STEP_COLORS[i] }}>
                {label}
              </p>

              {/* Headline */}
              <h3
                className="text-lg leading-snug"
                style={{ color: "var(--ink)", fontFamily: "var(--font-serif)", fontWeight: 600, maxWidth: "28ch" }}
              >
                {headline}
              </h3>

              {/* Body */}
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink-mid)" }}>
                {body}
              </p>

              {/* Tech — monospace label */}
              <p className="text-[10px] font-mono mt-auto pt-2" style={{ color: "var(--ink-low)" }}>
                {tech}
              </p>
            </div>
          ))}
        </div>

        <p className="reveal mt-8 text-center text-sm" style={{ color: "var(--ink-low)" }}>
          {h.totalTimePrefix}
          <strong style={{ color: "var(--ink)", fontWeight: 500 }}>{h.totalTime}</strong>
        </p>
      </div>
    </section>
  );
}

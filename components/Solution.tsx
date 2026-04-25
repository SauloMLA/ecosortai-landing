"use client";

import { useRef } from "react";
import Image from "next/image";
import { useReveal } from "@/lib/useReveal";
import type { Translations } from "@/lib/i18n/en";

const CATEGORY_COLORS = [
  "var(--plastic)",
  "var(--paper)",
  "var(--cardboard)",
  "var(--aluminum)",
];

const CATEGORY_LABELS_EN = ["Plastic", "Paper", "Cardboard", "Aluminum"];
const CATEGORY_LABELS_ES = ["Plástico", "Papel", "Cartón", "Aluminio"];

export default function Solution({ t }: { t: Translations }) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  const s = t.solution;
  const catLabels = t.locale === "es" ? CATEGORY_LABELS_ES : CATEGORY_LABELS_EN;

  return (
    <section className="relative py-28 md:py-36 px-6" style={{ background: "var(--sand-light)" }}>
      <div className="divider absolute top-0 left-0 right-0" />
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="reveal text-xs tracking-[0.2em] uppercase font-medium mb-7" style={{ color: "var(--forest)" }}>
                {s.eyebrow}
              </p>
              <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl leading-[1.12] tracking-tight mb-5" style={{ color: "var(--ink)" }}>
                {s.headline.split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <p className="reveal reveal-delay-2 text-base leading-relaxed" style={{ color: "var(--ink-mid)" }}>
                {s.body}
              </p>
            </div>

            {/* Accuracy */}
            <div
              className="reveal reveal-delay-3 px-6 py-5 rounded-lg"
              style={{ background: "var(--forest-bg)", border: "1px solid var(--forest-border)" }}
            >
              <p className="serif text-5xl font-semibold leading-none mb-1.5" style={{ color: "var(--forest)" }}>
                95.8%
              </p>
              <p className="text-sm font-medium" style={{ color: "var(--forest)" }}>{s.accuracyLabel}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--ink-low)" }}>{s.accuracySub}</p>
            </div>

            {/* Features — divider list, no card borders */}
            <div className="flex flex-col" style={{ borderTop: "1px solid var(--border)" }}>
              {s.features.map(({ title, desc }, i) => (
                <div
                  key={title}
                  className={`reveal reveal-delay-${i + 1} py-5 flex gap-4 items-start`}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span
                    className="mt-[5px] shrink-0 text-[10px] font-semibold tracking-widest"
                    style={{ color: "var(--ink-low)", minWidth: "1.5rem" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-medium mb-0.5" style={{ color: "var(--ink)" }}>{title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--ink-mid)" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-5">
            <div
              className="reveal rounded-lg overflow-hidden"
              style={{ boxShadow: "var(--shadow-md)", border: "1px solid var(--border)" }}
            >
              <Image
                src="/nema17-flatlay.png"
                alt="Raspberry Pi 5 and 2× NEMA 17 stepper motors — EcoSort AI hardware"
                width={900}
                height={600}
                className="w-full h-auto"
              />
            </div>

            <p className="reveal text-[11px] text-center tracking-wide" style={{ color: "var(--ink-low)" }}>
              {s.hardwareCaption}
            </p>

            {/* Category grid — text only */}
            <div
              className="reveal reveal-delay-1 grid grid-cols-2 gap-px"
              style={{ background: "var(--border)", border: "1px solid var(--border)", borderRadius: "0.75rem", overflow: "hidden" }}
            >
              {catLabels.map((label, i) => (
                <div key={label} className="py-5 px-5" style={{ background: "var(--cream)" }}>
                  <p className="text-sm font-semibold" style={{ color: CATEGORY_COLORS[i] }}>{label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--ink-low)" }}>{s.categorySubs[i]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

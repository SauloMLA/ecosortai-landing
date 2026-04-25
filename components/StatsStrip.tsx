"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";
import type { Translations } from "@/lib/i18n/en";

export default function StatsStrip({ t }: { t: Translations }) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <section style={{ background: "var(--dark-bg)" }}>
      <div ref={ref} className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        {/* All 4 stats in a single row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "var(--dark-border)" }}>
          {t.stats.map(({ value, label }, i) => (
            <div
              key={label}
              className={`reveal reveal-delay-${i + 1} flex flex-col items-center justify-center py-12 px-6 text-center`}
              style={{ background: "var(--dark-bg)" }}
            >
              <span
                className="serif font-bold tracking-tight leading-none mb-2"
                style={{
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  color: i === 0 ? "var(--dark-green)" : "var(--dark-text)",
                }}
              >
                {value}
              </span>
              <span
                className="text-xs uppercase tracking-[0.18em] font-medium"
                style={{ color: "var(--dark-low)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

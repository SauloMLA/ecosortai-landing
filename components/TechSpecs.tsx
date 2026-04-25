"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";
import type { Translations } from "@/lib/i18n/en";

const GITHUB_URL = "https://github.com/SauloMLA/ecoSortAI";

export default function TechSpecs({ t }: { t: Translations }) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  const ts = t.techSpecs;

  return (
    <section id="tech-specs" className="relative py-28 md:py-36 px-6" style={{ background: "var(--sand-light)" }}>
      <div className="divider absolute top-0 left-0 right-0" />
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-14 lg:gap-20 items-start">

          {/* Left */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-6">
            <p className="reveal text-xs tracking-[0.2em] uppercase font-medium" style={{ color: "var(--forest)" }}>
              {ts.eyebrow}
            </p>
            <h2
              className="reveal reveal-delay-1 text-4xl md:text-5xl leading-[1.12] tracking-tight"
              style={{ color: "var(--ink)" }}
            >
              {ts.headline.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
            <p className="reveal reveal-delay-2 text-base leading-relaxed" style={{ color: "var(--ink-mid)" }}>
              {ts.body}
            </p>

            <div
              className="reveal reveal-delay-3 p-5 rounded-lg flex flex-col gap-3"
              style={{ background: "var(--forest-bg)", border: "1px solid var(--forest-border)" }}
            >
              <p className="text-xs font-medium" style={{ color: "var(--forest)" }}>{ts.footerNote}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full"
                  style={{ background: "var(--cream)", border: "1px solid var(--forest-border)", color: "var(--forest)" }}
                >
                  {ts.sessionBadge}
                </span>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full transition-colors duration-150 hover:opacity-80"
                  style={{ background: "var(--cream)", border: "1px solid var(--forest-border)", color: "var(--forest)" }}
                >
                  {/* GitHub icon */}
                  <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Right — specs table */}
          <div
            className="reveal reveal-delay-1 rounded-lg overflow-hidden"
            style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
          >
            {ts.rows.map(({ label, value, sub }, i) => (
              <div
                key={label}
                className="flex items-center gap-4 px-6 py-4"
                style={{
                  background: i % 2 === 0 ? "var(--cream)" : "var(--white)",
                  borderBottom: i < ts.rows.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span className="text-sm shrink-0 w-36" style={{ color: "var(--ink-low)" }}>{label}</span>
                <div className="flex-1 flex items-baseline justify-end gap-3 text-right flex-wrap">
                  <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>{value}</span>
                  <span className="text-xs hidden sm:block" style={{ color: "var(--ink-low)" }}>{sub}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

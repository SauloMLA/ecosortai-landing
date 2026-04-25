"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";
import type { Translations } from "@/lib/i18n/en";

export default function Problem({ t }: { t: Translations }) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  const p = t.problem;

  return (
    <section
      className="relative py-28 md:py-40 px-6"
      style={{ background: "var(--dark-bg)" }}
    >
      {/* Top border */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "var(--dark-border)" }} />

      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Eyebrow */}
        <p
          className="reveal text-xs tracking-[0.25em] uppercase font-medium mb-12 text-center"
          style={{ color: "var(--dark-green)" }}
        >
          {p.eyebrow}
        </p>

        {/* Headline — centered, large */}
        <h2
          className="reveal reveal-delay-1 text-center leading-[1.08] tracking-tight mb-16 mx-auto"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            color: "var(--dark-text)",
            maxWidth: "20ch",
          }}
        >
          {p.headline.split("\n").map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </h2>

        {/* 3 impact stats — full width divider row */}
        <div
          className="reveal reveal-delay-2 grid md:grid-cols-3 gap-px mb-16"
          style={{ background: "var(--dark-border)" }}
        >
          {p.rows.map(({ value, label, source }, i) => (
            <div
              key={value}
              className={`reveal reveal-delay-${i + 2} flex flex-col items-center py-10 px-8 text-center`}
              style={{ background: "var(--dark-bg)" }}
            >
              <span
                className="serif font-bold leading-none mb-3"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--dark-text)" }}
              >
                {value}
              </span>
              <span className="text-sm leading-snug mb-2" style={{ color: "var(--dark-muted)", maxWidth: "22ch" }}>
                {label}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--dark-low)" }}>
                {source}
              </span>
            </div>
          ))}
        </div>

        {/* Pull quote — centered */}
        <div className="reveal reveal-delay-3 max-w-2xl mx-auto text-center">
          <p
            className="serif text-xl md:text-2xl italic leading-relaxed mb-4"
            style={{ color: "var(--dark-muted)" }}
          >
            &ldquo;{p.pullQuote}&rdquo;
          </p>
          <p className="text-xs font-medium tracking-wide" style={{ color: "var(--dark-low)" }}>
            {p.pullQuoteAttr}
          </p>
        </div>

      </div>
    </section>
  );
}

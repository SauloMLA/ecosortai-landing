"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";
import type { Translations } from "@/lib/i18n/en";

export default function Demo({ t }: { t: Translations }) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  const d = t.demo;

  return (
    <section id="demo" className="relative py-28 md:py-36 px-6" style={{ background: "var(--cream)" }}>
      <div className="divider absolute top-0 left-0 right-0" />
      <div ref={ref} className="max-w-4xl mx-auto flex flex-col items-center text-center gap-10">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-4 max-w-2xl">
          <p className="reveal text-xs tracking-[0.2em] uppercase font-medium" style={{ color: "var(--forest)" }}>
            {d.eyebrow}
          </p>
          <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl leading-[1.12] tracking-tight" style={{ color: "var(--ink)" }}>
            {d.headline}{" "}
            <span style={{ color: "var(--ink-low)" }}>{d.headlineMuted}</span>
          </h2>
          <p className="reveal reveal-delay-2 text-sm md:text-base leading-relaxed" style={{ color: "var(--ink-mid)" }}>
            {d.body}
          </p>
        </div>

        {/* Video Container */}
        <div 
          className="reveal reveal-delay-3 w-full rounded-2xl overflow-hidden shadow-lg border border-border"
          style={{ 
            boxShadow: "var(--shadow-lg)",
            background: "var(--sand-light)"
          }}
        >
          <div className="relative w-full aspect-video">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/-Ybw4BIoBi4"
              title="EcoSort AI Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ border: "none" }}
            />
          </div>
        </div>

        {/* External Link */}
        <div className="reveal reveal-delay-4">
          <a 
            href="https://youtu.be/-Ybw4BIoBi4" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-ghost flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
              <path d="M23.498 6.163c-.272-1.018-1.077-1.821-2.095-2.093C19.544 3.5 12 3.5 12 3.5s-7.544 0-9.403.57C.779 4.342.102 5.176.012 6.193.004 6.786 0 7.842 0 8.5v7c0 .658.004 1.714.012 2.307.09 1.017.767 1.85 1.785 2.122C3.656 20.5 11.2 20.5 11.2 20.5s7.544 0 9.403-.57c1.018-.272 1.823-1.075 2.095-2.093.078-.593.082-1.649.082-2.307v-7c0-.658-.004-1.714-.082-2.367zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            {d.watchOnYouTube}
          </a>
        </div>

      </div>
    </section>
  );
}

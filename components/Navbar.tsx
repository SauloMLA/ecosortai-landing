"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Translations } from "@/lib/i18n/en";

export default function Navbar({ t }: { t: Translations }) {
  const [scrolled, setScrolled] = useState(false);
  const isEs = t.locale === "es";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(240,235,227,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Wordmark — centered */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 serif text-sm font-semibold"
          style={{ color: "var(--ink)" }}
        >
          EcoSort<span style={{ color: "var(--forest)" }}>AI</span>
        </Link>

        {/* Left — UAG badge + lang */}
        <div className="flex items-center gap-3">
          <span
            className="hidden sm:inline text-[10px] tracking-[0.18em] uppercase font-medium px-2 py-0.5 rounded"
            style={{ color: "var(--forest)", background: "var(--forest-bg)", border: "1px solid var(--forest-border)" }}
          >
            UAG
          </span>
          <Link
            href={isEs ? "/" : "/es"}
            className="text-xs"
            style={{ color: "var(--ink-low)" }}
          >
            {isEs ? "EN" : "ES"}
          </Link>
        </div>

        {/* Right */}
        <a
          href="#cta"
          className="text-xs px-4 py-1.5 rounded-full transition-colors duration-150"
          style={{
            color: "var(--forest)",
            border: "1px solid var(--forest-border)",
            background: "var(--forest-bg)",
          }}
        >
          {t.nav.joinWaitlist}
        </a>
      </div>
    </header>
  );
}

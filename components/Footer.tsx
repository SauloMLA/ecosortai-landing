import Link from "next/link";
import type { Translations } from "@/lib/i18n/en";

const GITHUB_URL = "https://github.com/SauloMLA/ecoSortAI";

export default function Footer({ t }: { t: Translations }) {
  const isEs = t.locale === "es";
  return (
    <footer className="px-6 pt-10 pb-8" style={{ background: "var(--sand)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-5xl mx-auto flex flex-col gap-5">

        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="serif text-sm font-semibold" style={{ color: "var(--ink)" }}>
              EcoSort<span style={{ color: "var(--forest)" }}>AI</span>
            </span>
            <span className="text-xs" style={{ color: "var(--ink-low)" }}>
              {t.footer.developer}
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs" style={{ color: "var(--ink-low)" }}>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors duration-150 hover:text-[var(--ink)]"
            >
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              {t.footer.github}
            </a>

            <span style={{ color: "var(--border-mid)" }}>·</span>

            <Link href={isEs ? "/" : "/es"} className="hover:text-[var(--ink)] transition-colors duration-150">
              {t.footer.lang}
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--border)" }} />

        {/* Bottom row */}
        <p className="text-xs" style={{ color: "var(--ink-low)" }}>
          © {new Date().getFullYear()} {t.footer.copy}
        </p>

      </div>
    </footer>
  );
}

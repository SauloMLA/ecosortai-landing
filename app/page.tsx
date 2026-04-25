import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import TechSpecs from "@/components/TechSpecs";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { es: "/es" },
  },
};

export default function Home() {
  const t = getDictionary("en");
  return (
    <main className="flex flex-col min-h-screen" style={{ background: "var(--sand-light)" }}>
      <Navbar t={t} />
      <Hero t={t} />
      <StatsStrip t={t} />
      <Problem t={t} />
      <Solution t={t} />
      <HowItWorks t={t} />
      <div id="tech-specs"><TechSpecs t={t} /></div>
      <About t={t} />
      <CTA t={t} />
      <Footer t={t} />
    </main>
  );
}

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
  title: "EcoSortAI — El bote que sabe adónde va.",
  description:
    "Dispositivo físico con IA que escanea, clasifica y dirige residuos al contenedor correcto — en menos de 2 segundos. 95.8% de precisión. Sin internet.",
  openGraph: {
    title: "EcoSortAI — El bote que sabe adónde va.",
    description: "95.8% de precisión. Motores NEMA 17. IA en el dispositivo. Sin nube.",
    locale: "es_MX",
    alternateLocale: ["en_US"],
  },
  alternates: {
    canonical: "/es",
    languages: { en: "/" },
  },
};

export default function HomeES() {
  const t = getDictionary("es");
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

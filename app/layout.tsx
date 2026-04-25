import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Lora } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Resolves automatically: custom domain > Vercel preview URL > localhost
function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),

  title: {
    default: "EcoSortAI — The bin that knows where it goes.",
    template: "%s | EcoSortAI",
  },
  description:
    "An AI-powered physical device that scans, classifies, and routes your recycling — Plastic, Paper, Cardboard, or Aluminum — in under 2 seconds. 95.8% accuracy. No internet required. Built by UAG students.",
  keywords: [
    "recycling AI", "smart bin", "EcoSortAI", "Raspberry Pi recycling",
    "MobileNetV2", "waste classification", "sustainability Mexico",
    "NEMA 17 stepper", "edge AI", "TensorFlow Lite", "reciclaje inteligente",
    "clasificacion de residuos", "UAG", "proyecto universitario IA",
    "bote inteligente", "reciclaje automatico Mexico",
  ],
  authors: [{ name: "SauloMLA", url: "https://github.com/SauloMLA" }],
  creator: "SauloMLA",
  publisher: "EcoSort AI — UAG",
  category: "Technology",
  applicationName: "EcoSortAI",

  alternates: {
    canonical: "/",
    languages: { "es-MX": "/es", "en-US": "/" },
  },

  openGraph: {
    title: "EcoSortAI — The bin that knows where it goes.",
    description:
      "95.8% accuracy. NEMA 17 stepper motors. On-device AI. Physical sorting. No cloud. Built by 5 UAG engineering students.",
    type: "website",
    url: "/",
    siteName: "EcoSortAI",
    locale: "en_US",
    alternateLocale: ["es_MX"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EcoSort AI — The smart bin that classifies and physically routes your recycling in under 2 seconds",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EcoSortAI — The bin that knows where it goes.",
    description:
      "95.8% accuracy. Physical AI sorting. No cloud. Built by UAG students.",
    images: [{ url: "/og-image.png", alt: "EcoSort AI smart sorting device" }],
    creator: "@SauloMLA",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  manifest: "/manifest.json",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "EcoSortAI",
      url: getSiteUrl(),
      description:
        "AI-powered physical waste sorting device built by UAG engineering students.",
      potentialAction: {
        "@type": "SearchAction",
        target: `${getSiteUrl()}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Product",
      name: "EcoSort AI",
      description:
        "A physical AI-powered waste sorting device. Uses MobileNetV2 on Raspberry Pi 5 with 2× NEMA 17 stepper motors to classify and route recycling in under 2 seconds. 95.8% accuracy. No internet required.",
      brand: {
        "@type": "Organization",
        name: "EcoSort AI",
        url: getSiteUrl(),
        description:
          "University capstone project — Universidad Autónoma de Guadalajara (UAG)",
        sameAs: ["https://github.com/SauloMLA/ecoSortAI"],
      },
      image: `${getSiteUrl()}/og-image.png`,
      url: getSiteUrl(),
      author: {
        "@type": "Person",
        name: "SauloMLA",
        url: "https://github.com/SauloMLA",
      },
      additionalProperty: [
        { "@type": "PropertyValue", name: "Accuracy",        value: "95.8%" },
        { "@type": "PropertyValue", name: "Inference time",  value: "< 2 seconds" },
        { "@type": "PropertyValue", name: "Platform",        value: "Raspberry Pi 5" },
        { "@type": "PropertyValue", name: "AI model",        value: "MobileNetV2 TFLite INT8" },
        { "@type": "PropertyValue", name: "Mechanism",       value: "NEMA 17 bowl gimbal — 2 axes" },
        { "@type": "PropertyValue", name: "University",      value: "UAG — Universidad Autónoma de Guadalajara" },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${lora.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Rimshad — AI Content Creator & Creative Strategist",
  description: "Rimshad is an AI Content Creator and Creative Strategist creating cinematic AI-powered content, digital experiences and marketing visuals for brands and businesses.",
  metadataBase: new URL("https://rimshad.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rimshad — AI Content Creator & Creative Strategist",
    description: "Rimshad is an AI Content Creator and Creative Strategist creating cinematic AI-powered content, digital experiences and marketing visuals for brands and businesses.",
    url: "https://rimshad.dev",
    siteName: "Rimshad Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/rimshad/rimshad_photo_black_bg.jpg",
        width: 1200,
        height: 1600,
        alt: "Rimshad Portrait"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rimshad — AI Content Creator & Creative Strategist",
    description: "Rimshad is an AI Content Creator and Creative Strategist creating cinematic AI-powered content, digital experiences and marketing visuals for brands and businesses.",
    images: ["/assets/rimshad/rimshad_photo_black_bg.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#FFFFFF] selection:bg-[#c8102e] selection:text-[#FFFFFF]">{children}</body>
    </html>
  );
}

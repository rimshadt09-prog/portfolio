import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MAISON D'ART | Luxury Architectural & Interior Design Studio",
  description: "A cinematic, ultra-premium spatial design showcase of bespoke residences, commercial architecture, and artistic furniture curation.",
  metadataBase: new URL("https://maisondart.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MAISON D'ART | Luxury Architectural & Interior Design Studio",
    description: "A cinematic, ultra-premium spatial design showcase of bespoke residences, commercial architecture, and artistic furniture curation.",
    url: "https://maisondart.com",
    siteName: "MAISON D'ART",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/about/about_studio.jpg",
        width: 1200,
        height: 1600,
        alt: "MAISON D'ART Studio Gallery"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MAISON D'ART | Luxury Architectural & Interior Design Studio",
    description: "A cinematic, ultra-premium spatial design showcase of bespoke residences, commercial architecture, and artistic furniture curation.",
    images: ["/assets/about/about_studio.jpg"]
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#080808] text-[#F4F1EA] selection:bg-[#C5A880] selection:text-[#080808]">{children}</body>
    </html>
  );
}

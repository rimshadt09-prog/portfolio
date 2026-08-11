import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import About from "@/components/About";
import Credentials from "@/components/Credentials";
import CreativeStack from "@/components/CreativeStack";
import Process from "@/components/Process";
import Values from "@/components/Values";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  // Structured JSON-LD SEO Schema.org Markup for Google search optimization
  const seoSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rimshad",
    "jobTitle": "AI Content Creator & Creative Strategist",
    "description": "Rimshad is an AI Content Creator and Creative Strategist creating cinematic AI-powered content, digital experiences and marketing visuals for brands and businesses.",
    "url": "https://rimshad.dev",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kerala",
      "addressCountry": "IN"
    }
  };

  return (
    <SmoothScroll>
      {/* Structural Structured JSON-LD Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoSchema) }}
      />
      
      {/* Global Interactive Motion Enhancements */}
      <CustomCursor />
      <ScrollProgress />
      
      {/* Floating Header Navigation */}
      <Navbar />
      
      {/* Page Body Section Layout */}
      <main className="w-full min-h-screen bg-[#050505]">
        <Hero />
        <Portfolio />
        <Services />
        <About />
        <Credentials />
        <CreativeStack />
        <Process />
        <Values />
        <Testimonials />
        <ContactCTA />
        <Contact />
      </main>

      {/* Luxury Footer */}
      <Footer />
    </SmoothScroll>
  );
}

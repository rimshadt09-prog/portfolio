import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import HeroSequence from "@/components/HeroSequence";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
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
    "@type": "DesignBusiness",
    "name": "MAISON D'ART",
    "image": "https://maisondart.com/assets/about/about_studio.jpg",
    "description": "An editorial gallery of luxury architectural environments and minimal spatial curations.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Architectural Strasse 14A",
      "addressLocality": "Zurich",
      "postalCode": "8001",
      "addressCountry": "CH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.3769,
      "longitude": 8.5417
    },
    "telephone": "+41 44 254 3000",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ]
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
      <main className="w-full min-h-screen bg-[#080808]">
        <HeroSequence />
        <Portfolio />
        <Services />
        <About />
        <Process />
        <Testimonials />
        <ContactCTA />
        <Contact />
      </main>

      {/* Luxury Footer */}
      <Footer />
    </SmoothScroll>
  );
}

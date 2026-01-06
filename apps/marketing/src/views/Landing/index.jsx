import { useEffect } from "react";
import {
  HeroSection,
  ParallaxShowcase,
  AboutSection,
  ProductsSection,
  BenefitsSection,
  TestimonialsSection,
  CTASection,
} from "./sections";

export default function LandingPage() {
  // Update document title
  useEffect(() => {
    document.title =
      "Casa DI' MARE - Bebidas Naturales Artesanales | Naturalidad para ti";
  }, []);

  return (
    <>
      {/* Hero - Full viewport height with animated elements */}
      <HeroSection />

      {/* Parallax Showcase - Interactive beverage display */}
      <ParallaxShowcase />

      {/* About - Who we are */}
      <AboutSection />

      {/* Products - Featured drinks */}
      <ProductsSection />

      {/* Benefits - Why choose us */}
      <BenefitsSection />

      {/* Testimonials - Social proof */}
      <TestimonialsSection />

      {/* CTA - Final conversion section */}
      <CTASection />
    </>
  );
}

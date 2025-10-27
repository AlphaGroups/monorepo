"use client";


import Header from "@/components/LayoutParts/Header"
import HeroSection from "@/components/sections/HeroSection";
import VideoSection from "@/components/sections/VideoSection";
import ServiceSection from "@/components/sections/ServiceSection";
import ProjectsSection from "@/components/sections/ProjectSection";
import TestimonialsSection from "@/components/sections/TestiMonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/LayoutParts/Footer";

const page = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <VideoSection />
        <ServiceSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default page;
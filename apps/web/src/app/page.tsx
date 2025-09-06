"use client";

import Header from "@/components/Layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import TrustedBySection from "@/components/sections/TrustedBySection";
import VideoSection from "@/components/sections/VideoSection";
import ServiceSection from "@/components/sections/ServiceSection";
import ProjectsSection from "@/components/sections/ProjectSection";
import TestimonialsSection from "@/components/sections/TestiMonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Layout/Footer";

const Page = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <TrustedBySection/>
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

export default Page;
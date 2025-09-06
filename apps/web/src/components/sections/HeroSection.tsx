
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
// import heroImage from "@/assets/hero-stem-robotics.jpg";


const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
       
       style={{ 
      backgroundImage: "url('https://storage.googleapis.com/dtb-strapi/Screenshot_2024_04_30_at_4_39_22_PM_min_79a7ede65a/Screenshot_2024_04_30_at_4_39_22_PM_min_79a7ede65a.png')" 
    }}

      >
        <div className="absolute inset-0 bg-gradient-hero/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
            Empowering the Future of Learning Through{" "}
            <span className="text-accent">STEM & Robotics</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            We design and deliver full-fledged labs with IoT modules, LMS, and hands-on kits for educational institutions across India.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
              Explore Our Labs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
           <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
              <Play className="mr-2 h-5 w-5" />
              Talk to Our Experts
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary-foreground/60">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
            <div className="w-1 h-3 bg-current rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
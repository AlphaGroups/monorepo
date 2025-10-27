
// import { Button } from "@/components/ui/button";
// import { ArrowRight, Play } from "lucide-react";
// // import heroImage from "@/assets/hero-stem-robotics.jpg";


// const HeroSection = () => {
//   const clients = [
//     "L&T",
//     "Save the Children",
//     "AIF",
//     "IAHV",
//     "ChildFund",
//     "WWF",
//     "UNICEF",
//     "Teach for India",
//   ];
//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background Image with Overlay */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
       
//        style={{ 
//       backgroundImage: "url('https://storage.googleapis.com/dtb-strapi/Screenshot_2024_04_30_at_4_39_22_PM_min_79a7ede65a/Screenshot_2024_04_30_at_4_39_22_PM_min_79a7ede65a.png')" 
//     }}

//       >
//         <div className="absolute inset-0 bg-gradient-hero/90"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 container mx-auto px-4 lg:px-6 text-center">
//         <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
//           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
//             Empowering the Future of Learning Through{" "}
//             <span className="text-accent">STEM & Robotics</span>
//           </h1>
          
//           <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
//             We design and deliver full-fledged labs with IoT modules, LMS, and hands-on kits for educational institutions across India.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
//             <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
//               Explore Our Labs
//               <ArrowRight className="ml-2 h-5 w-5" />
//             </Button>
//            <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
//               <Play className="mr-2 h-5 w-5" />
//               Talk to Our Experts
//             </Button>
//           </div>
//         </div>
//       </div>
//        {/* Trusted by Section - Fixed at very bottom */}
//       <div className="absolute bottom-0 w-full z-10 bg-black/20 py-3">
//         <div className="text-center mb-12">
//           <p className="text-muted-foreground text-lg">
//             Trusted by leading organizations across India
//           </p>
//         </div>
        
//         <div className="overflow-hidden relative">
//           <div className="flex marquee">
//             {[...clients, ...clients].map((client, index) => (
//               <div 
//                 key={index}
//                 className="text-2xl font-semibold text-primary tracking-wide whitespace-nowrap px-8 flex-shrink-0"
//               >
//                 {client}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary-foreground/60">
//         <div className="animate-bounce">
//           <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
//             <div className="w-1 h-3 bg-current rounded-full mt-2 animate-pulse"></div>
//           </div>
//         </div>
//       </div>

//       {/* Marquee Animation CSS */}
//       <style jsx>{`
//         @keyframes marquee {
//           0% {
//             transform: translateX(100%);
//           }
//           100% {
//             transform: translateX(-100%);
//           }
//         }
//         .animate-marquee {
//           display: outline-block;
//           padding-left: 100%;
//           animation: marquee 20s linear infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default HeroSection;

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Custom Scroll Animation Styles */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `}
      </style>

      {/* Hero Image Section */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://storage.googleapis.com/dtb-strapi/Screenshot_2024_04_30_at_4_39_22_PM_min_79a7ede65a/Screenshot_2024_04_30_at_4_39_22_PM_min_79a7ede65a.png')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-4 lg:px-6 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight break-words">
              Empowering the Future of Learning Through
              <br />
              <span className="text-blue-500">STEM & Robotics</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We design and deliver full-fledged labs with IoT modules, LMS, and hands-on kits for educational institutions across India.
            </p>

            {/* Buttons on Image */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                variant="default"
                size="lg"
                className="min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white"
              >
                Explore Our Labs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px] border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <Play className="mr-2 h-5 w-5" />
                Talk to Our Experts
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
              <div className="w-1 h-3 bg-current rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Partners Scrolling Banner */}
      <div className="bg-background py-4 overflow-hidden border-t border-border">
        <div className="flex animate-scroll whitespace-nowrap gap-12 px-4">
          {[...Array(2)].flatMap((_, i) =>
            ["L&T", "Save the Children", "AIF", "IAHV", "ChildFund", "WWF", "UNICEF", "Teach for India"].map((partner, index) => (
              <span
                key={`${i}-${index}`}
                className="text-muted-foreground font-semibold text-lg hover:text-primary transition-colors flex-shrink-0"
              >
                {partner}
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
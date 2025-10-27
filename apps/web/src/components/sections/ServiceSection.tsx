import Link from "next/link";
import { ArrowRight, Cpu, Building, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ServiceSection = () => {
  const services = [
    {
      icon: Cpu,
      title: "STEM & Robotics Labs",
      description: "Complete lab solutions with IoT modules, Learning Management Systems, and hands-on robotics kits designed for interactive learning.",
      link: "/stem-labs",
      features: ["IoT Integration", "Custom LMS", "Hands-on Kits", "Teacher Training"]
    },
    {
      icon: Building,
      title: "Construction Works",
      description: "Purpose-driven infrastructure development including school buildings, WASH facilities, and educational space renovation.",
      link: "/construction",
      features: ["School Buildings", "WASH Infrastructure", "Renovations", "Self-Execution Model"]
    },
    {
      icon: Package,
      title: "Bulk Material Supply",
      description: "Large-scale supply of educational materials, school furniture, hygiene kits, and emergency relief supplies.",
      link: "/bulk-supply",
      features: ["Educational Materials", "School Furniture", "Hygiene Kits", "Emergency Relief"]
    }
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions for educational institutions, NGOs, and CSR initiatives
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <CardHeader>
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-accent text-primary">
                  <service.icon className="h-6 w-6" />
                </div>
                {/* Title + Description */}
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href={service.link}>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;


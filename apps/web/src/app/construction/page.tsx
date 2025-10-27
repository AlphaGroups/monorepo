"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Building,
  Droplets,
  Wrench,
  Shield,
  Clock,
  Award,
} from "lucide-react";
import Header from "@/components/LayoutParts/Header";
import Footer from "@/components/LayoutParts/Footer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const Construction = () => {
  const services = [
    {
      icon: Building,
      title: "School Buildings",
      description:
        "Modern, sustainable school infrastructure designed for optimal learning environments.",
      features: [
        "Earthquake-resistant design",
        "Natural lighting optimization",
        "Ventilation systems",
        "Accessibility compliance",
      ],
    },
    {
      icon: Droplets,
      title: "WASH Infrastructure",
      description:
        "Water, sanitation, and hygiene facilities that promote health and dignity.",
      features: [
        "Water supply systems",
        "Sanitation facilities",
        "Hygiene stations",
        "Waste management",
      ],
    },
    {
      icon: Wrench,
      title: "Renovations",
      description:
        "Upgrading existing educational spaces to meet modern standards.",
      features: [
        "Structural improvements",
        "Modern amenities",
        "Safety upgrades",
        "Energy efficiency",
      ],
    },
  ];

  const advantages = [
    {
      icon: Shield,
      title: "Self-Execution Model",
      description: "Complete control over quality and timeline.",
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "Projects completed on schedule.",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Highest standards of construction.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://www.gannestonconstruction.com/wp-content/uploads/2022/09/5-types-of-building-construction-ganneston-construction.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl">
            <Badge className="mb-6 bg-blue-600 text-white text-sm px-4 py-1 rounded-full shadow-md">
              Construction Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Creating Purpose-Driven Infrastructure for Learning
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Building schools, WASH facilities, and educational spaces that
              transform communities and create lasting impact through our
              self-execution model.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog>
                <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg px-6 py-3 text-lg">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Request Lab Setup</DialogTitle>
                    <DialogDescription>
                      Fill in your details below to request a STEM Lab setup.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter a password"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Link href="/projects" passHref>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 text-lg"
                >
                  View All Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Our Construction Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive infrastructure solutions for educational
              institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="mb-4 p-4 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <service.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-primary">
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Execution Model Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Our Self-Execution Model
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Unlike traditional contractors, Alpha Groups maintains complete
                control over the construction process. Our self-execution model
                ensures quality, transparency, and timely delivery of every
                project.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">
                      Self-execution model ensuring quality control
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Direct oversight of all construction activities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">
                      Sustainable construction practices
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Environmentally responsible building methods.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">
                      Community-centered design approach
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Buildings designed for local needs and culture.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {advantages.map((advantage, index) => (
                <Card key={index} className="p-6 shadow-md">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <advantage.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary">
                        {advantage.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
        <div className="container mx-auto px-4 lg:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let's discuss your construction needs and create infrastructure that
            serves communities for generations.
          </p>
          <Link href="/projects" passHref>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 text-lg"
                >
                  View All Projects
                </Button>
              </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Construction;

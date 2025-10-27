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
  Cpu,
  Wifi,
  BookOpen,
  Users,
  Target,
  CheckCircle,
} from "lucide-react";
import Header from "@/components/LayoutParts/Header";
import Footer from "@/components/LayoutParts/Footer";
// import heroImage from "@/assets/hero-stem-robotics.jpeg"; // add your image path here
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const STEMLabs = () => {
  const features = [
    {
      icon: Cpu,
      title: "IoT Integration",
      description:
        "Complete IoT modules with sensors, actuators, and microcontrollers for hands-on learning.",
    },
    {
      icon: Wifi,
      title: "LMS Platform",
      description:
        "Integrated Learning Management System with curriculum tracking and progress monitoring.",
    },
    {
      icon: BookOpen,
      title: "Curriculum Support",
      description:
        "Age-appropriate curriculum designed by education experts and industry professionals.",
    },
    {
      icon: Users,
      title: "Teacher Training",
      description:
        "Comprehensive training programs to ensure effective lab utilization and learning outcomes.",
    },
  ];

  const labComponents = [
    "Arduino & Raspberry Pi Modules",
    "Robotics Kits & Components",
    "3D Printing Equipment",
    "Sensor Arrays (Temperature, Humidity, Motion)",
    "Programming Software & Tools",
    "Project-based Learning Materials",
    "Safety Equipment & Guidelines",
    "Technical Support & Maintenance",
  ];

  const benefits = [
    "Hands-on STEM learning experience",
    "Enhanced problem-solving skills",
    "Technology integration in education",
    "Preparation for future careers",
    "Collaborative learning environment",
    "Real-world project applications",
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
              "url('https://tse3.mm.bing.net/th/id/OIP.sAWjjFt-K-mhTB9M3LWtbQHaEJ?pid=Api&P=0&h=180')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl">
            <Badge className="mb-6 bg-blue-600 text-white text-sm px-4 py-1 rounded-full shadow-md">
              STEM Education
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Advanced STEM & Robotics Labs
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Transform education with our comprehensive STEM lab solutions
              featuring IoT modules, robotics kits, and integrated learning
              management systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg px-6 py-3 text-lg">
                    Request Lab Setup
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
              {/* View All Projects Button with Link */}
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

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Complete STEM Lab Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to create an engaging, modern STEM learning
              environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg font-bold text-primary">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Components Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                What's Included in Our STEM Labs
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our comprehensive lab packages include everything needed to
                deliver world-class STEM education.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {labComponents.map((component, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 text-primary"
                  >
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-sm font-medium">{component}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6 shadow-md">
                <div className="flex items-center space-x-4 mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                  <h3 className="text-xl font-bold text-primary">
                    Learning Outcomes
                  </h3>
                </div>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 text-muted-foreground"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
        <div className="container mx-auto px-4 lg:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform STEM Education?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join hundreds of schools across India that have already
            revolutionized their STEM programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-200 shadow-md px-6 py-3 text-lg">
              Schedule Consultation
            </Button>
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
      </section>

      <Footer />
    </div>
  );
};

export default STEMLabs;

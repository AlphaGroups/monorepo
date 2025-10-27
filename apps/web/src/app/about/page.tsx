import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Heart, Lightbulb, Shield, Globe, Handshake } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Trust & Verification",
      description: "Every professional on our platform is thoroughly vetted and verified to ensure quality and reliability."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Local Focus",
      description: "We connect you with local contractors who understand your area and can deliver personalized service."
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Transparent Process",
      description: "Our bidding process is open and fair, ensuring both parties get the best value and service."
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Users" },
    { number: "4.8/5", label: "Average Rating" },
    { number: "1000+", label: "Projects Completed" },
    { number: "200+", label: "Verified Contractors" }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="mb-4">
              About BitsNdBricks
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Revolutionizing how projects and professionals connect
            </h1>
            <p className="text-xl text-muted-foreground">
              Our mission is simple: connecting project owners with verified local contractors 
              for smarter, faster, transparent selection.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground">
                We believe that finding the right professional for your project shouldn't be a 
                time-consuming, uncertain process. That's why we've built a platform that brings 
                transparency, efficiency, and trust to the contractor-client relationship.
              </p>
              <p className="text-lg text-muted-foreground">
                Whether you're a homeowner looking for a reliable contractor or a professional 
                seeking quality projects, BitsNdBricks provides the tools and verification 
                processes to make meaningful connections happen.
              </p>
            </div>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-primary flex items-center justify-center">
                  <div className="text-center text-white">
                    <Heart className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">Built with Care</h3>
                    <p className="text-white/90">Every feature designed for your success</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Our Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary mx-auto mb-4 flex items-center justify-center text-white">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">{value.title}</h3>
                  <p className="text-muted-foreground text-center">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Our Impact</h2>
            <p className="text-muted-foreground text-lg">
              Numbers that show our growing community's success
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Lightbulb className="h-12 w-12 mx-auto text-accent" />
            <h2 className="text-3xl lg:text-4xl font-bold">Looking Forward</h2>
            <p className="text-xl text-white/90">
              We're constantly innovating to make project collaboration even better. 
              Our vision is to become the go-to platform for all professional services, 
              expanding beyond construction to serve every industry that connects 
              project owners with skilled professionals.
            </p>
            <div className="pt-6">
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                Join us on this journey
              </Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
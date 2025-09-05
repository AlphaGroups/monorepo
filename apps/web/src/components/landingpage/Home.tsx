"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, Quote, ChevronLeft, ChevronRight, Users, Award, Zap } from 'lucide-react';

const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "The quality of professionals I've connected with has been outstanding.",
      author: "Thomas",
      role: "verified review",
      rating: 5
    },
    {
      quote: "BitsNdBricks made finding reliable contractors so much easier. The bidding process is transparent and fair.",
      author: "Sarah Mitchell",
      role: "Project Owner",
      rating: 5
    },
    {
      quote: "Great platform for connecting with quality projects. Professional interface and reliable payment system.",
      author: "Michael Chen", 
      role: "Contractor",
      rating: 5
    },
    {
      quote: "The verification process gives me confidence that I'm working with legitimate professionals.",
      author: "Jessica Kumar",
      role: "Homeowner",
      rating: 5
    }
  ];

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Verified Professionals",
      description: "All contractors are thoroughly vetted and verified"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast Matching",
      description: "Get connected with suitable professionals quickly"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Transparent Bidding",
      description: "Fair and transparent project bidding process"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              Trusted by 500+ Users
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Find projects, bid on work, and connect with 
              <span className="text-accent"> verified professionals</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Connecting project owners with verified local contractors for smarter, faster, transparent selection
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-lg">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="font-semibold">4.8/5</span>
              <span className="text-white/80">from over 500 reviews</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <ExternalLink className="h-5 w-5 mr-2" />
                Visit Platform
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white/20 text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Site Preview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold">Live Platform Preview</h2>
            <p className="text-muted-foreground text-lg">
              Explore our platform directly or open in a new tab for the full experience
            </p>
          </div>
          
          <Card className="overflow-hidden shadow-brand">
            <CardContent className="p-0">
              <div className="relative">
                <iframe
                  src="https://dev.bitsndbricks.com/"
                  className="w-full h-[600px] border-0"
                  title="BitsNdBricks Platform"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open('https://dev.bitsndbricks.com/', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Full Site
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Why Choose BitsNdBricks?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We make project collaboration simple, transparent, and reliable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary mx-auto mb-4 flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">What Our Users Say</h2>
            <p className="text-muted-foreground text-lg">
              Real feedback from project owners and contractors
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="relative overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <Quote className="h-8 w-8 text-primary opacity-50" />
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-xl lg:text-2xl font-medium text-center mb-6">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                <div className="text-center">
                  <p className="font-semibold text-lg">{testimonials[currentTestimonial].author}</p>
                  <p className="text-muted-foreground">{testimonials[currentTestimonial].role}</p>
                </div>

                <div className="flex justify-center items-center space-x-4 mt-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevTestimonial}
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentTestimonial ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextTestimonial}
                    className="rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
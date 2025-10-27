import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      quote: "Alpha Groups transformed our approach to STEM education. The labs they designed are not just functional but truly inspiring for our students.",
      author: "Dr. Priya Sharma",
      position: "Principal",
      organization: "Delhi Public School",
      image: "https://tse3.mm.bing.net/th/id/OIP.vKHdWEntpqxd4GXRAqM5ngHaHy?pid=Api&P=0&h=180"
    },
    {
      quote: "Working with Alpha Groups on our school construction project was seamless. Their self-execution model ensured quality and timely delivery.",
      author: "Rajesh Kumar",
      position: "CSR Head",
      organization: "L&T Foundation",
      image: "https://tse4.mm.bing.net/th/id/OIP.4sCk1KJpl0TobgHN0fsG_AHaHa?pid=Api&P=0&h=180"
    },
    {
      quote: "The bulk material supply for our emergency response was executed flawlessly. Alpha Groups understands the urgency of humanitarian work.",
      author: "Sarah Johnson",
      position: "Program Director",
      organization: "Save the Children India",
      image: "https://tse4.mm.bing.net/th/id/OIP.2HxDL5GRe5WJSuOHMI1qBwHaHa?pid=Api&P=0&h=180"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-accent">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Partners Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading NGOs, schools, and CSR teams across India
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Card className="shadow-medium">
              <CardContent className="p-8 md:p-12">
                <Quote className="h-12 w-12 text-primary mb-6 mx-auto" />
                
                <blockquote className="text-xl md:text-2xl text-center leading-relaxed mb-8 text-foreground">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].author}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                  />
                  <div className="text-center">
                    <div className="font-semibold text-lg text-foreground">
                      {testimonials[currentIndex].author}
                    </div>
                    <div className="text-muted-foreground">
                      {testimonials[currentIndex].position}
                    </div>
                    <div className="text-primary font-medium">
                      {testimonials[currentIndex].organization}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background shadow-medium"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background shadow-medium"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? "bg-primary" : "bg-muted"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
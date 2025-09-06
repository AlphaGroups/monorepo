import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Building, Wrench, Lightbulb, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SchoolInfra = () => {
  const infrastructures = [
    {
      icon: Building,
      title: "Classroom Construction",
      description: "Safe, durable, and student-friendly learning spaces",
      items: ["Primary Classrooms", "Labs", "Libraries", "Multi-purpose Halls"]
    },
    {
      icon: Wrench,
      title: "Renovation & Repairs",
      description: "Upgrading old infrastructure to meet modern needs",
      items: ["Roof Repairs", "Painting", "Flooring", "Furniture Refurbishment"]
    },
    {
      icon: Lightbulb,
      title: "Electrical & Lighting",
      description: "Power and lighting solutions for classrooms and campuses",
      items: ["Wiring & Cabling", "Energy-efficient Lights", "Fans & Cooling", "Solar Solutions"]
    },
    {
      icon: Droplet,
      title: "Water & Sanitation",
      description: "Hygienic facilities to ensure student well-being",
      items: ["Drinking Water Systems", "Washrooms", "Handwashing Stations", "Waste Management"]
    }
  ];

  const features = [
    "Expert project management",
    "High-quality and durable materials",
    "Safety-first construction standards",
    "Timely completion of projects",
    "Sustainable and eco-friendly practices",
    "Tailored solutions for schools and institutions"
  ];

  const metrics = [
    { value: "500+", label: "Schools Built" },
    { value: "1,000+", label: "Renovation Projects" },
    { value: "2M+", label: "Students Benefited" },
    { value: "50+", label: "Construction Partners" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative">
          <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://temporarybuildings.com/wp-content/uploads/2024/03/Bulk-storage-warehouse-solution-1024x445.jpg')" }}
          >
         <div className="absolute inset-0 bg-black bg-opacity-30"></div>

          </div>
          <div className="relative container mx-auto px-4 py-28 text-center text-white">
            <span className="px-4 py-1 bg-green-600 rounded-full text-sm font-medium">
              School Infrastructure
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mt-6">
              Building Strong Foundations for Learning
            </h1>
            <p className="mt-6 text-lg max-w-3xl mx-auto text-gray-200">
              From classrooms to sanitation facilities, we provide comprehensive infrastructure
              solutions that create safe and inspiring learning environments.
            </p>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="bg-gray-900 py-12">
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {metrics.map((m, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-green-500">{m.value}</div>
                <div className="text-gray-300">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Infrastructures Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Build</h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Comprehensive infrastructure development for modern schools and institutions
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {infrastructures.map((infra, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <infra.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle>{infra.title}</CardTitle>
                    <CardDescription>{infra.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {infra.items.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 lg:px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Why Choose Alpha Groups for Infrastructure?</h3>
              <p className="text-gray-600 mb-6">
                Our expertise in construction and facility management ensures schools get
                reliable, safe, and future-ready infrastructure. We go beyond building—
                we create environments that inspire learning.
              </p>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-300"></div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 py-20 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Better Schools?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with us for customized infrastructure solutions and create
              lasting impact for generations to come.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Get a Proposal
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Contact Our Experts
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SchoolInfra;


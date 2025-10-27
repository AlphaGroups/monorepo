"use client";

import { useState } from "react";
import Header from "@/components/LayoutParts/Header";
import Footer from "@/components/LayoutParts/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MapPin, Users } from "lucide-react";

const ProjectsPage = () => {
  const projects = [
    {
      title: "Smart STEM Lab - Delhi Public School",
      location: "Mumbai, Maharashtra",
      date: "2024",
      students: "1,200+",
      description:
        "Complete IoT-enabled STEM lab with robotics kits, sensors, and integrated LMS platform.",
      tags: ["STEM Labs", "IoT", "Robotics"],
      status: "Completed",
      category: "STEM Labs",
    },
    {
      title: "School Infrastructure Development",
      location: "Rural Rajasthan",
      date: "2024",
      students: "800+",
      description:
        "Construction of modern classrooms, library, and WASH facilities for rural education.",
      tags: ["Construction", "WASH", "Infrastructure"],
      status: "Ongoing",
      category: "Construction",
    },
    {
      title: "Emergency Relief Supply Chain",
      location: "Multiple States",
      date: "2023-2024",
      students: "10,000+",
      description:
        "Rapid deployment of educational materials and hygiene kits during flood relief operations.",
      tags: ["Bulk Supply", "Emergency Relief", "Logistics"],
      status: "Completed",
      category: "Bulk Supply",
    },
  ];

  const categories = ["STEM Labs", "Construction", "Bulk Supply"];
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredProjects = selectedFilter
    ? projects.filter((p) => p.category === selectedFilter)
    : projects;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
                All Projects
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore all our initiatives across India, filtered by category.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedFilter === category ? "default" : "outline"}
                  onClick={() =>
                    setSelectedFilter(
                      selectedFilter === category ? null : category
                    )
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant={
                          project.status === "Completed" ? "default" : "secondary"
                        }
                      >
                        {project.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {project.date}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 text-accent" />
                        {project.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2 text-accent" />
                        {project.students} students impacted
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;

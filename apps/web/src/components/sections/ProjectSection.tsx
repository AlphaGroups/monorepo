"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Smart STEM Lab - Delhi Public School",
      location: "Mumbai, Maharashtra",
      date: "2024",
      students: "1,200+",
      description:
        "IoT-enabled STEM lab with robotics kits, sensors, and LMS platform.",
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
        "Construction of classrooms, library, and WASH facilities for rural education.",
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
        "Deployment of educational materials & hygiene kits during flood relief operations.",
      tags: ["Bulk Supply", "Emergency Relief", "Logistics"],
      status: "Completed",
      category: "Bulk Supply",
    },
  ];

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const filteredProjects = selectedFilter
    ? projects.filter((p) => p.category === selectedFilter)
    : projects;

  const categories = ["STEM Labs", "Construction", "Bulk Supply"];

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Our Impact Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real projects creating lasting change in communities across India
          </p>
        </div>

        {/* Filter Buttons */}
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

        {/* Projects Section */}
        <div className="relative w-full overflow-hidden">
          <div
            className={`flex gap-4 ${
              !selectedFilter ? "animate-scroll" : "flex-wrap justify-center"
            }`}
          >
            {(!selectedFilter
              ? [...Array(5)].flatMap(() => filteredProjects) // repeat for scroll effect
              : filteredProjects
            ).map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 w-72 h-[280px] flex-shrink-0 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <CardHeader className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <Badge
                      variant={
                        project.status === "Completed" ? "default" : "secondary"
                      }
                    >
                      {project.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {project.date}
                    </span>
                  </div>
                  <CardTitle className="text-base font-bold text-primary line-clamp-2">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1 text-accent" />
                      {project.location}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Users className="h-3 w-3 mr-1 text-accent" />
                      {project.students} students
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="text-[10px] px-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/projects">
            <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
              View All Projects
            </Button>
          </Link>
        </div>
      </div>

      {/* Modal for Project Details */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-lg">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
                <DialogDescription>{selectedProject.description}</DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-accent" />
                  {selectedProject.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-accent" />
                  {selectedProject.students} students
                </div>
                <p>
                  <strong>Status:</strong> {selectedProject.status}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag: string, i: number) => (
                    <Badge key={i} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button
                size="sm"
                className="mt-6 bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => setSelectedProject(null)}
              >
                <X className="h-4 w-4 mr-1" /> Close
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Animation Styles */}
      <style jsx>{`
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-20%);
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;

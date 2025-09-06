import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Smart STEM Lab - Delhi Public School",
      location: "Mumbai, Maharashtra",
      date: "2024",
      students: "1,200+",
      description: "Complete IoT-enabled STEM lab with robotics kits, sensors, and integrated LMS platform.",
      tags: ["STEM Labs", "IoT", "Robotics"],
      status: "Completed"
    },
    {
      title: "School Infrastructure Development",
      location: "Rural Rajasthan",
      date: "2024",
      students: "800+",
      description: "Construction of modern classrooms, library, and WASH facilities for rural education.",
      tags: ["Construction", "WASH", "Infrastructure"],
      status: "Ongoing"
    },
    {
      title: "Emergency Relief Supply Chain",
      location: "Multiple States",
      date: "2023-2024",
      students: "10,000+",
      description: "Rapid deployment of educational materials and hygiene kits during flood relief operations.",
      tags: ["Bulk Supply", "Emergency Relief", "Logistics"],
      status: "Completed"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Our Impact Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real projects creating lasting change in communities across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                    {project.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{project.date}</span>
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

        <div className="text-center mt-12">
          <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
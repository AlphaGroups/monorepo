"use client";

import React, { useEffect, useState, Suspense } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api";
import {
  Users,
  Building2,
  GraduationCap,
  Video,
  FileText,
  Plus,
  BarChart3,
  Activity,
  Server,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Metric {
  title: string;
  value: number | string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ElementType;
  href?: string;
}

const Page: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<Metric[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [health, setHealth] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [adminsRes, collegesRes, teachersRes, studentsRes] =
          await Promise.all([
            api.get("/admins", { params: { page: 1, size: 50 } }),
            api.get("/colleges", { params: { page: 1, size: 50 } }),
            api.get("/teachers", { params: { page: 1, size: 50 } }),
            api.get("/students", { params: { page: 1, size: 50 } }),
          ]);

        const newMetrics: Metric[] = [
          {
            title: "Total Admins",
            value: adminsRes.data.total ?? (Array.isArray(adminsRes.data) ? adminsRes.data.length : adminsRes.data.length ?? 0),
            change: "+3",
            changeType: "positive",
            icon: Users,
            href: "/admin/users/admins",
          },
          {
            title: "Colleges",
            value: collegesRes.data.total ?? (Array.isArray(collegesRes.data) ? collegesRes.data.length : collegesRes.data.length ?? 0),
            change: "+2",
            changeType: "positive",
            icon: Building2,
            href: "/admin/colleges",
          },
          {
            title: "Teachers",
            value: teachersRes.data.total ?? (Array.isArray(teachersRes.data) ? teachersRes.data.length : teachersRes.data.length ?? 0),
            change: "+5",
            changeType: "positive",
            icon: GraduationCap,
            href: "/admin/users/teachers",
          },
          {
            title: "Students",
            value: studentsRes.data.total ?? (Array.isArray(studentsRes.data) ? studentsRes.data.length : studentsRes.data.length ?? 0),
            change: "+127",
            changeType: "positive",
            icon: Users,
            href: "/admin/users/students",
          },
        ];

        setMetrics(newMetrics);
        // Optional placeholders
        setStats([]);
        setActivities([]);
        setHealth([]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">System Overview</h1>
            <p className="text-muted-foreground">
              Manage your entire learning management system
            </p>
          </div>
          <div className="flex space-x-2">
            {/* <Button variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Reports
            </Button> */}
            {/* <Button className="bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Quick Actions
            </Button> */}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            metrics.map((metric, idx) => (
              <Card key={idx} className="hover-lift card-elegant">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Badge
                      variant={metric.changeType === "positive" ? "default" : "destructive"}
                      className="mr-2 text-xs"
                    >
                      {metric.change}
                    </Badge>
                    from last month
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Activity & Health */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest system-wide activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-center py-4">
                Activity data coming soon...
              </p>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" />
                System Health
              </CardTitle>
              <CardDescription>Current system status and performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-center py-4">
                System health data coming soon...
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-20 flex-col">
                <Plus className="h-6 w-6 mb-2" />
                Add Admin
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Video className="h-6 w-6 mb-2" />
                Upload Video
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <FileText className="h-6 w-6 mb-2" />
                Create Test
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <BarChart3 className="h-6 w-6 mb-2" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
};

export default Page;


"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { BarChart3, Plus, Users, Building2, GraduationCap } from "lucide-react";
import api from "@/services/api"; // ✅ use preconfigured axios
import {
  Users,
  Building2,
  GraduationCap,
  Video,
  FileText,
  TrendingUp,
  Plus,
  BarChart3,
  Activity,
  CheckCircle,
  AlertCircle,
  Server,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Suspense } from "react";

interface Metric {
  title: string;
  value: number | string;
  change: string;
  changeType: "positive" | "negative";
  icon: any;
  href: string;
}

const SuperAdminDashboard = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [health, setHealth] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch counts using the correct API endpoints
        const [adminsRes, collegesRes, teachersRes, studentsRes] =
          await Promise.all([
            api.get("/admins"),
            api.get("/colleges"),
            api.get("/teachers"),
            api.get("/students"),
          ]);

        // Format metrics data
        const newMetrics: Metric[] = [
          {
            title: "Total Admins",
            value: adminsRes.data.count || adminsRes.data.length,
            change: "+3",
            changeType: "positive" as const,
            icon: Users,
            href: "/admin/users/admins",
          },
          {
            title: "Colleges",
            value: collegesRes.data.count || collegesRes.data.length,
            change: "+2",
            changeType: "positive" as const,
            icon: Building2,
            href: "/admin/colleges",
          },
          {
            title: "Teachers",
            value: teachersRes.data.count || teachersRes.data.length,
            change: "+5",
            changeType: "positive" as const,
            icon: GraduationCap,
            href: "/admin/users/teachers",
          },
          {
            title: "Students",
            value: studentsRes.data.count || studentsRes.data.length,
            change: "+127",
            changeType: "positive" as const,
            icon: Users,
            href: "/admin/users/students",
          },
        ];

        setMetrics(newMetrics);

        // Uncomment when these endpoints are available
        // const activitiesRes = await api.get("/dashboard/activities");
        // setActivities(activitiesRes.data);

        // const healthRes = await api.get("/dashboard/system-health");
        // setHealth(healthRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
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
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Reports
          </Button>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          metrics.map((metric, index) => (
            <Card key={index} className="hover-lift card-elegant">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Badge
                    variant={
                      metric.changeType === "positive"
                        ? "default"
                        : "destructive"
                    }
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((metric, index) => (
          <Card key={index} className="hover-lift card-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Badge
                  variant={
                    metric.changeType === "positive" ? "default" : "destructive"
                  }
                  className="mr-2 text-xs"
                >
                  {metric.change}
                </Badge>
                from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity Feed - Placeholder for now */}
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

        {/* System Health - Placeholder for now */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="mr-2 h-5 w-5" />
              System Health
            </CardTitle>
            <CardDescription>
              Current system status and performance
            </CardDescription>
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
  );
};

export default SuperAdminDashboard;

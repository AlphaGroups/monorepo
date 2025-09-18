// "use client";

// import React, { useEffect, useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import {
//   Users,
//   Building2,
//   GraduationCap,
//   Video,
//   FileText,
//   TrendingUp,
//   Plus,
//   BarChart3,
//   Activity,
//   CheckCircle,
//   AlertCircle,
//   Server,
// } from "lucide-react";
// import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9080";

// const SuperAdminDashboard = () => {
//   const [stats, setStats] = useState<any[]>([]);
//   const [activities, setActivities] = useState<any[]>([]);
//   const [health, setHealth] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         // ✅ Fetch counts
//         const [adminsRes, collegesRes, teachersRes, studentsRes] = await Promise.all([
//           axios.get(`${API_URL}/admins/count`, { headers: { Authorization: `Bearer ${token}` } }),
//           axios.get(`${API_URL}/colleges/count`, { headers: { Authorization: `Bearer ${token}` } }),
//           axios.get(`${API_URL}/teachers/count`, { headers: { Authorization: `Bearer ${token}` } }),
//           axios.get(`${API_URL}/students/count`, { headers: { Authorization: `Bearer ${token}` } }),
//         ]);

//         const metrics = [
//           {
//             title: "Total Admins",
//             value: adminsRes.data.count,
//             change: "+3",
//             changeType: "positive" as const,
//             icon: Users,
//             href: "/admin/users/admins",
//           },
//           {
//             title: "Colleges",
//             value: collegesRes.data.count,
//             change: "+2",
//             changeType: "positive" as const,
//             icon: Building2,
//             href: "/admin/colleges",
//           },
//           {
//             title: "Teachers",
//             value: teachersRes.data.count,
//             change: "+5",
//             changeType: "positive" as const,
//             icon: GraduationCap,
//             href: "/admin/users/teachers",
//           },
//           {
//             title: "Students",
//             value: studentsRes.data.count,
//             change: "+127",
//             changeType: "positive" as const,
//             icon: Users,
//             href: "/admin/users/students",
//           },
//         ];

//         setStats(metrics);

//         // ✅ Fetch recent activities
//         const activitiesRes = await axios.get(`${API_URL}/dashboard/activities`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setActivities(activitiesRes.data);

//         // ✅ Fetch system health
//         const healthRes = await axios.get(`${API_URL}/dashboard/system-health`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setHealth(healthRes.data);
//       } catch (error) {
//         console.error("Dashboard fetch error:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-heading font-bold">System Overview</h1>
//           <p className="text-muted-foreground">Manage your entire learning management system</p>
//         </div>
//         <div className="flex space-x-2">
//           <Button variant="outline">
//             <BarChart3 className="mr-2 h-4 w-4" />
//             Reports
//           </Button>
//           <Button className="bg-gradient-primary">
//             <Plus className="mr-2 h-4 w-4" />
//             Quick Actions
//           </Button>
//         </div>
//       </div>

//       {/* Metrics Grid */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {stats.map((metric, index) => (
//           <Card key={index} className="hover-lift card-elegant">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
//               <metric.icon className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{metric.value}</div>
//               <div className="flex items-center text-xs text-muted-foreground">
//                 <Badge
//                   variant={metric.changeType === "positive" ? "default" : "destructive"}
//                   className="mr-2 text-xs"
//                 >
//                   {metric.change}
//                 </Badge>
//                 from last month
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         {/* Recent Activity Feed */}
//         <Card className="card-elegant">
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <Activity className="mr-2 h-5 w-5" />
//               Recent Activity
//             </CardTitle>
//             <CardDescription>Latest system-wide activities</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {activities.map((activity, index) => (
//               <div
//                 key={index}
//                 className="flex items-start space-x-3 pb-3 last:pb-0 border-b last:border-0"
//               >
//                 <div className="p-2 bg-primary/10 rounded-full">
//                   {activity.type === "user" && <Users className="h-3 w-3 text-primary" />}
//                   {activity.type === "content" && <Video className="h-3 w-3 text-primary" />}
//                   {activity.type === "college" && <Building2 className="h-3 w-3 text-primary" />}
//                   {activity.type === "system" && <Server className="h-3 w-3 text-primary" />}
//                 </div>
//                 <div className="flex-1 space-y-1">
//                   <p className="text-sm font-medium">{activity.action}</p>
//                   <p className="text-sm text-muted-foreground">{activity.details}</p>
//                   <p className="text-xs text-muted-foreground">{activity.time}</p>
//                 </div>
//               </div>
//             ))}
//           </CardContent>
//         </Card>

//         {/* System Health */}
//         <Card className="card-elegant">
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <Server className="mr-2 h-5 w-5" />
//               System Health
//             </CardTitle>
//             <CardDescription>Current system status and performance</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {health.map((item, index) => (
//               <div key={index} className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-sm font-medium">{item.name}</span>
//                     {item.status === "operational" ? (
//                       <CheckCircle className="h-4 w-4 text-success" />
//                     ) : (
//                       <AlertCircle className="h-4 w-4 text-warning" />
//                     )}
//                   </div>
//                   <span className="text-sm text-muted-foreground">{item.value}%</span>
//                 </div>
//                 <Progress value={item.value} className="h-2" />
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       <Card className="card-elegant">
//         <CardHeader>
//           <CardTitle>Quick Actions</CardTitle>
//           <CardDescription>Common administrative tasks</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//             <Button variant="outline" className="h-20 flex-col">
//               <Plus className="h-6 w-6 mb-2" />
//               Add Admin
//             </Button>
//             <Button variant="outline" className="h-20 flex-col">
//               <Video className="h-6 w-6 mb-2" />
//               Upload Video
//             </Button>
//             <Button variant="outline" className="h-20 flex-col">
//               <FileText className="h-6 w-6 mb-2" />
//               Create Test
//             </Button>
//             <Button variant="outline" className="h-20 flex-col">
//               <BarChart3 className="h-6 w-6 mb-2" />
//               View Reports
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SuperAdminDashboard;

"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle ,CardDescription } from "@/components/ui/card";
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
    const fetchCounts = async () => {
      try {
        const [adminsRes, collegesRes, teachersRes, studentsRes] =
          await Promise.all([
            api.get("/admins"),
            api.get("/colleges"),
            api.get("/teachers"),
            api.get("/students"),
          ]);

        setMetrics([
          {
            title: "Total Admins",
            value: adminsRes.data.length,
            change: "+3",
            changeType: "positive",
            icon: Users,
            href: "/admin/users/admins",
          },
          {
            title: "Colleges",
            value: collegesRes.data.length,
            change: "+2",
            changeType: "positive",
            icon: Building2,
            href: "/admin/colleges",
          },
          {
            title: "Teachers",
            value: teachersRes.data.length,
            change: "+5",
            changeType: "positive",
            icon: GraduationCap,
            href: "/admin/users/teachers",
          },
          {
            title: "Students",
            value: studentsRes.data.length,
            change: "+127",
            changeType: "positive",
            icon: Users,
            href: "/admin/users/students",
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
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
          <p className="text-muted-foreground">Loading metrics...</p>
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
        {/* Recent Activity Feed */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system-wide activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 pb-3 last:pb-0 border-b last:border-0"
              >
                <div className="p-2 bg-primary/10 rounded-full">
                  {activity.type === "user" && (
                    <Users className="h-3 w-3 text-primary" />
                  )}
                  {activity.type === "content" && (
                    <Video className="h-3 w-3 text-primary" />
                  )}
                  {activity.type === "college" && (
                    <Building2 className="h-3 w-3 text-primary" />
                  )}
                  {activity.type === "system" && (
                    <Server className="h-3 w-3 text-primary" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.details}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Health */}
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
            {health.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{item.name}</span>
                    {item.status === "operational" ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-warning" />
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.value}%
                  </span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
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

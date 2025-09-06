import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  School,
  Users,
  Video,
  FileText,
  Plus,
  Eye,
  Edit,
  BarChart3,
  TrendingUp,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const AdminDashboard = () => {
  const collegeStats = [
    {
      title: 'Classes',
      value: '12',
      change: '+2',
      icon: School,
      description: 'Active classes'
    },
    {
      title: 'Students',
      value: '450',
      change: '+23',
      icon: Users,
      description: 'Enrolled students'
    },
    {
      title: 'Active Videos',
      value: '89',
      change: '+12',
      icon: Video,
      description: 'Assigned videos'
    },
    {
      title: 'Tests',
      value: '34',
      change: '+5',
      icon: FileText,
      description: 'Available tests'
    }
  ];

  const classes = [
    {
      name: 'Mathematics 101',
      students: 45,
      completion: 92,
      status: 'excellent',
      instructor: 'Dr. Smith',
      lastActivity: '2 hours ago'
    },
    {
      name: 'Physics Advanced',
      students: 32,
      completion: 87,
      status: 'good',
      instructor: 'Prof. Johnson',
      lastActivity: '4 hours ago'
    },
    {
      name: 'Chemistry Basic',
      students: 28,
      completion: 65,
      status: 'needs-attention',
      instructor: 'Dr. Brown',
      lastActivity: '1 day ago'
    },
    {
      name: 'Biology Fundamentals',
      students: 38,
      completion: 78,
      status: 'good',
      instructor: 'Prof. Davis',
      lastActivity: '6 hours ago'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-success text-success-foreground">Excellent</Badge>;
      case 'good':
        return <Badge variant="secondary">Good</Badge>;
      case 'needs-attention':
        return <Badge variant="destructive">Needs Attention</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">College Overview</h1>
          <p className="text-muted-foreground">
            ABC Institute of Technology
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Create Class
          </Button>
        </div>
      </div>

      {/* College Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {collegeStats.map((stat, index) => (
          <Card key={index} className="hover-lift card-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Badge variant="secondary" className="mr-2 text-xs">
                  {stat.change}
                </Badge>
                {stat.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Overall Performance */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Performance Summary
          </CardTitle>
          <CardDescription>Overall college performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Completion Rate</span>
                <span className="text-2xl font-bold text-success">78%</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">↑ 5% from last month</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Student Engagement</span>
                <span className="text-2xl font-bold text-primary">85%</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground">↑ 3% from last month</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Test Pass Rate</span>
                <span className="text-2xl font-bold text-accent">73%</span>
              </div>
              <Progress value={73} className="h-2" />
              <p className="text-xs text-muted-foreground">↑ 8% from last month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Class Management */}
      <Card className="card-elegant">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Class Management</CardTitle>
            <CardDescription>Overview of all your classes</CardDescription>
          </div>
          <Button size="sm" className="bg-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Class
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {classes.map((classItem, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <School className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{classItem.name}</h3>
                      {getStatusBadge(classItem.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Instructor: {classItem.instructor} • {classItem.students} students
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last activity: {classItem.lastActivity}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{classItem.completion}% Complete</div>
                    <Progress value={classItem.completion} className="w-24 h-2 mt-1" />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-elegant">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold">Top Performing</h3>
                <p className="text-sm text-muted-foreground">Math 101 (92%)</p>
                <p className="text-xs text-muted-foreground">Physics (87%)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-warning/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold">Needs Attention</h3>
                <p className="text-sm text-muted-foreground">Chemistry (65%)</p>
                <p className="text-xs text-muted-foreground">Low completion rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Generate Report</h3>
                <p className="text-sm text-muted-foreground">Monthly analytics</p>
                <Button size="sm" variant="outline" className="mt-2">
                  Create Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
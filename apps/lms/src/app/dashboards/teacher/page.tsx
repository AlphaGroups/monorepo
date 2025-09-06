import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  Video,
  FileText,
  BarChart3,
  Clock,
  Plus,
  Mail,
  Settings,
  TrendingUp,
  Calendar
} from 'lucide-react';

const ClassUserDashboard = () => {
  const classStats = [
    {
      title: 'Students',
      value: '45',
      icon: Users,
      description: 'Enrolled students'
    },
    {
      title: 'Videos',
      value: '12',
      icon: Video,
      description: 'Assigned videos'
    },
    {
      title: 'Tests',
      value: '8',
      icon: FileText,
      description: 'Created tests'
    },
    {
      title: 'Avg Score',
      value: '82%',
      icon: BarChart3,
      description: 'Class average'
    }
  ];

  const students = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.johnson@college.edu',
      progress: 85,
      lastActivity: '2 hours ago',
      status: 'active',
      testsCompleted: 7,
      videosWatched: 11
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob.smith@college.edu',
      progress: 72,
      lastActivity: 'Yesterday',
      status: 'active',
      testsCompleted: 6,
      videosWatched: 9
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol.davis@college.edu',
      progress: 58,
      lastActivity: '3 days ago',
      status: 'behind',
      testsCompleted: 4,
      videosWatched: 7
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david.wilson@college.edu',
      progress: 91,
      lastActivity: '1 hour ago',
      status: 'excellent',
      testsCompleted: 8,
      videosWatched: 12
    },
    {
      id: '5',
      name: 'Eva Martinez',
      email: 'eva.martinez@college.edu',
      progress: 67,
      lastActivity: '6 hours ago',
      status: 'active',
      testsCompleted: 5,
      videosWatched: 8
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-success text-success-foreground">Excellent</Badge>;
      case 'active':
        return <Badge variant="secondary">Active</Badge>;
      case 'behind':
        return <Badge variant="destructive">Behind</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const upcomingTasks = [
    {
      title: 'Mid-term Assessment',
      dueDate: '5 days',
      type: 'test',
      students: 45
    },
    {
      title: 'Calculus Video Review',
      dueDate: '1 week',
      type: 'video',
      students: 12
    },
    {
      title: 'Weekly Progress Report',
      dueDate: '2 days',
      type: 'report',
      students: 45
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Mathematics 101</h1>
          <p className="text-muted-foreground">
            Calculus and Linear Algebra • Fall 2024
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Send Reminder
          </Button>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Assign Content
          </Button>
        </div>
      </div>

      {/* Class Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {classStats.map((stat, index) => (
          <Card key={index} className="hover-lift card-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Student Progress */}
        <Card className="md:col-span-2 card-elegant">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Student Progress</CardTitle>
              <CardDescription>Track individual student performance</CardDescription>
            </div>
            <Button size="sm" variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Manage
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/api/placeholder/40/40`} alt={student.name} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm">
                        {getInitials(student.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{student.name}</p>
                        {getStatusBadge(student.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                        <span>{student.videosWatched}/12 videos</span>
                        <span>{student.testsCompleted}/8 tests</span>
                        <span>Last: {student.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium mb-1">{student.progress}%</div>
                    <Progress value={student.progress} className="w-24 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Upcoming
            </CardTitle>
            <CardDescription>Tasks and deadlines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-start space-x-3 pb-3 last:pb-0 border-b last:border-0">
                <div className="p-2 bg-primary/10 rounded-full">
                  {task.type === 'test' && <FileText className="h-3 w-3 text-primary" />}
                  {task.type === 'video' && <Video className="h-3 w-3 text-primary" />}
                  {task.type === 'report' && <BarChart3 className="h-3 w-3 text-primary" />}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{task.title}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Due in {task.dueDate}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{task.students} students</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Content Management */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
          <CardDescription>Recently assigned content and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Recent Videos</h4>
                <Video className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>"Quadratic Equations"</span>
                  <span className="text-success">85% completed</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-muted-foreground">Assigned 3 days ago</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Active Tests</h4>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>"Chapter 5 Quiz"</span>
                  <span className="text-primary">72% completion</span>
                </div>
                <Progress value={72} className="h-2" />
                <p className="text-xs text-muted-foreground">Due in 5 days</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Class Performance</h4>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Average Score</span>
                  <span className="text-accent font-semibold">82%</span>
                </div>
                <Progress value={82} className="h-2" />
                <p className="text-xs text-muted-foreground">↑ 3% from last week</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for class management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col">
              <Video className="h-6 w-6 mb-2" />
              Assign Video
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              Create Test
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Mail className="h-6 w-6 mb-2" />
              Send Message
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              View Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassUserDashboard;
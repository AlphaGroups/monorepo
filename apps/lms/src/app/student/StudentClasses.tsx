import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Calendar, 
  Play, 
  Clock,
  CheckCircle,
  Award,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentClasses = () => {
  const classes = [
    {
      id: 'math-101',
      name: 'Mathematics 101',
      instructor: 'Dr. Sarah Smith',
      description: 'Fundamentals of calculus and linear algebra',
      progress: 85,
      grade: 'A-',
      totalVideos: 12,
      watchedVideos: 10,
      totalTests: 8,
      completedTests: 7,
      averageScore: 92,
      nextDeadline: 'Final Exam - Dec 15',
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      credits: 3,
      color: 'bg-blue-500',
      status: 'active'
    },
    {
      id: 'physics-adv',
      name: 'Physics Advanced',
      instructor: 'Prof. Michael Johnson',
      description: 'Advanced concepts in mechanics and thermodynamics',
      progress: 72,
      grade: 'B+',
      totalVideos: 15,
      watchedVideos: 11,
      totalTests: 6,
      completedTests: 4,
      averageScore: 78,
      nextDeadline: 'Midterm - Dec 10',
      schedule: 'Tue, Thu - 2:00 PM',
      credits: 4,
      color: 'bg-green-500',
      status: 'active'
    },
    {
      id: 'chemistry',
      name: 'Chemistry Basic',
      instructor: 'Dr. Emily Brown',
      description: 'Introduction to organic and inorganic chemistry',
      progress: 91,
      grade: 'A',
      totalVideos: 10,
      watchedVideos: 10,
      totalTests: 5,
      completedTests: 5,
      averageScore: 95,
      nextDeadline: 'All assignments complete',
      schedule: 'Mon, Wed - 11:00 AM',
      credits: 3,
      color: 'bg-purple-500',
      status: 'completed'
    }
  ];

  const upcomingAssignments = [
    {
      title: 'Calculus Problem Set 5',
      class: 'Mathematics 101',
      dueDate: '2 days',
      type: 'assignment',
      priority: 'high'
    },
    {
      title: 'Physics Lab Report',
      class: 'Physics Advanced',
      dueDate: '5 days',
      type: 'report',
      priority: 'medium'
    },
    {
      title: 'Chemistry Quiz 3',
      class: 'Chemistry Basic',
      dueDate: '1 week',
      type: 'quiz',
      priority: 'low'
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="secondary">Low Priority</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Classes</h1>
        <p className="text-muted-foreground">
          Overview of your enrolled courses and progress
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="active">Active Classes</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Classes</p>
                    <p className="text-2xl font-bold">{classes.length}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Progress</p>
                    <p className="text-2xl font-bold">
                      {Math.round(classes.reduce((acc, c) => acc + c.progress, 0) / classes.length)}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Credits</p>
                    <p className="text-2xl font-bold">
                      {classes.reduce((acc, c) => acc + c.credits, 0)}
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">GPA</p>
                    <p className="text-2xl font-bold">3.67</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Class Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="hover-lift card-elegant">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${classItem.color}`} />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{classItem.name}</CardTitle>
                      <CardDescription>{classItem.instructor}</CardDescription>
                    </div>
                    {getStatusBadge(classItem.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{classItem.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{classItem.progress}%</span>
                    </div>
                    <Progress value={classItem.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center space-x-1">
                        <Video className="h-3 w-3" />
                        <span>{classItem.watchedVideos}/{classItem.totalVideos} videos</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <FileText className="h-3 w-3" />
                        <span>{classItem.completedTests}/{classItem.totalTests} tests</span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center space-x-1">
                        <Award className="h-3 w-3" />
                        <span>Grade: {classItem.grade} (Avg: {classItem.averageScore}%)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{classItem.schedule}</span>
                        </div>
                        <div className="mt-1">Next: {classItem.nextDeadline}</div>
                      </div>
                      <Link to={`/student/classes/${classItem.id}`}>
                        <Button size="sm" className="bg-gradient-primary">
                          <Play className="mr-1 h-3 w-3" />
                          Continue
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Classes</CardTitle>
              <CardDescription>Classes currently in progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classes.filter(c => c.status === 'active').map((classItem) => (
                  <div key={classItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full ${classItem.color}`} />
                      <div>
                        <h3 className="font-semibold">{classItem.name}</h3>
                        <p className="text-sm text-muted-foreground">{classItem.instructor}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span>{classItem.credits} credits</span>
                          <span>{classItem.schedule}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium mb-1">{classItem.progress}%</div>
                      <Progress value={classItem.progress} className="w-24 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Classes</CardTitle>
              <CardDescription>Successfully finished courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classes.filter(c => c.status === 'completed').map((classItem) => (
                  <div key={classItem.id} className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{classItem.name}</h3>
                        <p className="text-sm text-muted-foreground">{classItem.instructor}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span>Final Grade: {classItem.grade}</span>
                          <span>{classItem.credits} credits earned</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Completed</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upcoming Assignments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Upcoming Assignments
          </CardTitle>
          <CardDescription>Don't miss these important deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingAssignments.map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{assignment.title}</h4>
                    <p className="text-sm text-muted-foreground">{assignment.class}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-medium">Due in {assignment.dueDate}</p>
                  {getPriorityBadge(assignment.priority)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentClasses;
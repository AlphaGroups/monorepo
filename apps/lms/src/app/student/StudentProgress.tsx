import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award,
  BookOpen,
  Clock,
  Star,
  Trophy,
  CheckCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const StudentProgress = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semester');

  const overallStats = {
    gpa: 3.67,
    creditsEarned: 45,
    creditsTotal: 60,
    completionRate: 78,
    attendanceRate: 92,
    assignmentsOnTime: 85
  };

  const classProgress = [
    {
      name: 'Mathematics 101',
      progress: 85,
      grade: 'A-',
      gradePoints: 3.7,
      videosWatched: 10,
      totalVideos: 12,
      testsCompleted: 7,
      totalTests: 8,
      avgScore: 92,
      trend: 'up'
    },
    {
      name: 'Physics Advanced',
      progress: 72,
      grade: 'B+',
      gradePoints: 3.3,
      videosWatched: 11,
      totalVideos: 15,
      testsCompleted: 4,
      totalTests: 6,
      avgScore: 78,
      trend: 'down'
    },
    {
      name: 'Chemistry Basic',
      progress: 91,
      grade: 'A',
      gradePoints: 4.0,
      videosWatched: 10,
      totalVideos: 10,
      testsCompleted: 5,
      totalTests: 5,
      avgScore: 95,
      trend: 'up'
    }
  ];

  const weeklyProgress = [
    { week: 'Week 1', hoursStudied: 12, testsCompleted: 2, avgScore: 85 },
    { week: 'Week 2', hoursStudied: 15, testsCompleted: 3, avgScore: 88 },
    { week: 'Week 3', hoursStudied: 18, testsCompleted: 4, avgScore: 92 },
    { week: 'Week 4', hoursStudied: 14, testsCompleted: 2, avgScore: 87 },
    { week: 'Week 5', hoursStudied: 20, testsCompleted: 5, avgScore: 94 },
    { week: 'Week 6', hoursStudied: 16, testsCompleted: 3, avgScore: 90 }
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', score: 92, hours: 45, improvement: 8 },
    { subject: 'Physics', score: 78, hours: 38, improvement: -3 },
    { subject: 'Chemistry', score: 95, hours: 32, improvement: 12 }
  ];

  const skillsData = [
    { skill: 'Problem Solving', current: 85, target: 90 },
    { skill: 'Critical Thinking', current: 78, target: 85 },
    { skill: 'Mathematical Reasoning', current: 92, target: 95 },
    { skill: 'Scientific Method', current: 82, target: 88 },
    { skill: 'Data Analysis', current: 75, target: 85 }
  ];

  const learningGoals = [
    {
      title: 'Complete Calculus Module',
      description: 'Master all derivative and integration concepts',
      progress: 85,
      dueDate: '2024-02-15',
      status: 'on-track'
    },
    {
      title: 'Achieve 90% in Physics Tests',
      description: 'Maintain high performance in physics assessments',
      progress: 70,
      dueDate: '2024-02-20',
      status: 'needs-attention'
    },
    {
      title: 'Complete All Lab Reports',
      description: 'Submit quality chemistry lab reports on time',
      progress: 100,
      dueDate: '2024-01-30',
      status: 'completed'
    }
  ];

  const monthlyData = [
    { name: 'Sep', gpa: 3.2, hours: 45 },
    { name: 'Oct', gpa: 3.4, hours: 52 },
    { name: 'Nov', gpa: 3.6, hours: 48 },
    { name: 'Dec', gpa: 3.7, hours: 55 },
    { name: 'Jan', gpa: 3.67, hours: 60 }
  ];

  const gradientData = [
    { name: 'Current Progress', value: overallStats.completionRate, fill: '#8884d8' }
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'on-track':
        return <Badge className="bg-green-500">On Track</Badge>;
      case 'needs-attention':
        return <Badge className="bg-yellow-500">Needs Attention</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <ArrowUp className="h-4 w-4 text-green-500" /> : 
      <ArrowDown className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Progress</h1>
          <p className="text-muted-foreground">
            Track your academic performance and learning journey
          </p>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semester">This Semester</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">GPA</p>
                <p className="text-2xl font-bold text-primary">{overallStats.gpa}</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Credits</p>
                <p className="text-2xl font-bold">
                  {overallStats.creditsEarned}/{overallStats.creditsTotal}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion</p>
                <p className="text-2xl font-bold text-green-600">{overallStats.completionRate}%</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attendance</p>
                <p className="text-2xl font-bold text-blue-600">{overallStats.attendanceRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Time</p>
                <p className="text-2xl font-bold text-purple-600">{overallStats.assignmentsOnTime}%</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rank</p>
                <p className="text-2xl font-bold text-orange-600">3rd</p>
              </div>
              <Award className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subject Progress</TabsTrigger>
          <TabsTrigger value="goals">Learning Goals</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Progress Over Time
                </CardTitle>
                <CardDescription>Your GPA and study hours trend</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="gpa" stroke="#8884d8" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="hours" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Overall Progress
                </CardTitle>
                <CardDescription>Your semester completion progress</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={gradientData}>
                    <RadialBar
                      dataKey="value"
                      cornerRadius={10}
                      fill="#8884d8"
                    />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-4xl font-bold">
                      {overallStats.completionRate}%
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Class Performance Overview</CardTitle>
              <CardDescription>Your progress across all enrolled classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classProgress.map((classItem, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{classItem.name}</h3>
                          {getTrendIcon(classItem.trend)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span>{classItem.videosWatched}/{classItem.totalVideos} videos</span>
                          <span>{classItem.testsCompleted}/{classItem.totalTests} tests</span>
                          <span>Avg: {classItem.avgScore}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getGradeColor(classItem.grade)}`}>
                        {classItem.grade}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {classItem.progress}% complete
                      </div>
                      <Progress value={classItem.progress} className="w-24 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Compare your performance across subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Study Time Distribution</CardTitle>
                <CardDescription>Time spent on each subject</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={subjectPerformance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ subject, hours }) => `${subject}: ${hours}h`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="hours"
                    >
                      {subjectPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658'][index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Skills Development</CardTitle>
              <CardDescription>Track your skill progression and targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsData.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.skill}</span>
                      <div className="flex items-center space-x-2 text-sm">
                        <span>Current: {skill.current}%</span>
                        <span className="text-muted-foreground">Target: {skill.target}%</span>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={skill.current} className="h-3" />
                      <div 
                        className="absolute top-0 h-3 w-1 bg-red-500 rounded"
                        style={{ left: `${skill.target}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Learning Goals
              </CardTitle>
              <CardDescription>Your personalized learning objectives and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningGoals.map((goal, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                      </div>
                      {getStatusBadge(goal.status)}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Due: {new Date(goal.dueDate).toLocaleDateString()}</span>
                      </div>
                      {goal.status === 'completed' && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="h-3 w-3" />
                          <span>Completed</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Study Analytics</CardTitle>
              <CardDescription>Detailed breakdown of your weekly study patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="hoursStudied" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="testsCompleted" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5" />
                  Best Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">95%</div>
                  <p className="text-sm text-muted-foreground">Chemistry Quiz</p>
                  <p className="text-xs text-muted-foreground mt-1">Jan 15, 2024</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Study Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">12</div>
                  <p className="text-sm text-muted-foreground">Days Active</p>
                  <p className="text-xs text-muted-foreground mt-1">Keep it up!</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">+8%</div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-xs text-muted-foreground mt-1">Great progress!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentProgress;
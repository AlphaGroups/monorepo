import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Video,
  FileText,
  Trophy,
  Calendar,
  Play,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  Bell,
  Target
} from 'lucide-react';

const StudentDashboard = () => {
  const classes = [
    {
      id: 'math-101',
      name: 'Mathematics 101',
      instructor: 'Dr. Smith',
      progress: 85,
      nextAction: 'Watch: "Derivatives"',
      nextActionType: 'video',
      totalVideos: 12,
      watchedVideos: 10,
      totalTests: 8,
      completedTests: 7,
      grade: 'A-',
      color: 'bg-blue-500'
    },
    {
      id: 'physics-adv',
      name: 'Physics Advanced',
      instructor: 'Prof. Johnson',
      progress: 72,
      nextAction: 'Test Due: 2 days',
      nextActionType: 'test',
      totalVideos: 15,
      watchedVideos: 11,
      totalTests: 6,
      completedTests: 4,
      grade: 'B+',
      color: 'bg-green-500'
    },
    {
      id: 'chemistry',
      name: 'Chemistry Basic',
      instructor: 'Dr. Brown',
      progress: 91,
      nextAction: 'All caught up! ✅',
      nextActionType: 'complete',
      totalVideos: 10,
      watchedVideos: 10,
      totalTests: 5,
      completedTests: 5,
      grade: 'A',
      color: 'bg-purple-500'
    }
  ];

  const achievements = [
    {
      title: 'Speed Learner',
      description: '5 videos completed this week',
      icon: Video,
      earned: true
    },
    {
      title: 'Perfect Score',
      description: 'Scored 100% on Chemistry Quiz',
      icon: Star,
      earned: true
    },
    {
      title: 'Consistent Learner',
      description: '7-day learning streak',
      icon: Trophy,
      earned: true
    },
    {
      title: 'Early Bird',
      description: 'Complete assignments early',
      icon: Clock,
      earned: false
    }
  ];

  const recentActivity = [
    {
      action: 'Completed video',
      content: '"Linear Algebra Basics" (Math 101)',
      time: '2 hours ago',
      type: 'video'
    },
    {
      action: 'Scored 95%',
      content: 'Chemistry Quiz #4',
      time: '1 day ago',
      type: 'test'
    },
    {
      action: 'Started learning',
      content: '"Quantum Mechanics" (Physics Adv)',
      time: '2 days ago',
      type: 'video'
    }
  ];

  const upcomingDeadlines = [
    {
      title: 'Physics Test #5',
      course: 'Physics Advanced',
      dueDate: '2 days',
      priority: 'high'
    },
    {
      title: 'Math Assignment',
      course: 'Mathematics 101',
      dueDate: '5 days',
      priority: 'medium'
    },
    {
      title: 'Chemistry Lab Report',
      course: 'Chemistry Basic',
      dueDate: '1 week',
      priority: 'low'
    }
  ];

  const getNextActionIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'test': return <FileText className="h-4 w-4" />;
      case 'complete': return <CheckCircle className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Welcome back, Alice! 👋</h1>
          <p className="text-muted-foreground">
            Ready to continue your learning journey?
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button className="bg-gradient-primary">
            <Play className="mr-2 h-4 w-4" />
            Resume Learning
          </Button>
        </div>
      </div>

      {/* My Classes */}
      <div>
        <h2 className="text-xl font-heading font-semibold mb-4">My Classes</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((classItem) => (
            <Card key={classItem.id} className="hover-lift card-elegant">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${classItem.color}`} />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{classItem.name}</CardTitle>
                    <CardDescription>{classItem.instructor}</CardDescription>
                  </div>
                  <Badge variant="secondary">{classItem.grade}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{classItem.progress}%</span>
                  </div>
                  <Progress value={classItem.progress} className="h-2" />
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{classItem.watchedVideos}/{classItem.totalVideos} videos</span>
                  <span>{classItem.completedTests}/{classItem.totalTests} tests</span>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-2 text-sm">
                    {getNextActionIcon(classItem.nextActionType)}
                    <span>{classItem.nextAction}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Continue Learning */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Play className="mr-2 h-5 w-5" />
              Continue Learning
            </CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Linear Algebra Basics</h4>
                  <p className="text-sm text-muted-foreground">Mathematics 101</p>
                </div>
              </div>
              <Progress value={65} className="h-2 mb-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>13:45 / 21:20</span>
                <span>65% complete</span>
              </div>
            </div>

            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 pb-3 last:pb-0 border-b last:border-0">
                <div className="p-2 bg-accent/10 rounded-full">
                  {activity.type === 'video' && <Video className="h-3 w-3 text-accent" />}
                  {activity.type === 'test' && <FileText className="h-3 w-3 text-accent" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.action}</span> {activity.content}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription>Don't miss these important dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <Clock className="h-4 w-4 text-destructive" />
                  </div>
                  <div>
                    <h4 className="font-medium">{deadline.title}</h4>
                    <p className="text-sm text-muted-foreground">{deadline.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${getPriorityColor(deadline.priority)}`}>
                    {deadline.dueDate}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">{deadline.priority}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Achievements & Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 h-5 w-5" />
              Achievements
            </CardTitle>
            <CardDescription>Your learning milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    achievement.earned 
                      ? 'bg-accent/10 border-accent/20' 
                      : 'bg-muted/30 border-muted opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <achievement.icon className={`h-5 w-5 ${
                      achievement.earned ? 'text-accent' : 'text-muted-foreground'
                    }`} />
                    <h4 className="font-medium text-sm">{achievement.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Learning Stats
            </CardTitle>
            <CardDescription>Your progress this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">12</div>
                <p className="text-sm text-muted-foreground">Videos Watched</p>
              </div>
              <div className="text-center p-3 bg-accent/10 rounded-lg">
                <div className="text-2xl font-bold text-accent">6</div>
                <p className="text-sm text-muted-foreground">Tests Completed</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Weekly Goal</span>
                <span className="text-sm font-medium">8/10 hours</span>
              </div>
              <Progress value={80} className="h-2" />
              <p className="text-xs text-muted-foreground">Great job! 2 more hours to reach your goal.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
          <CardDescription>Jump to your most-used features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col">
              <Play className="h-6 w-6 mb-2" />
              Resume Learning
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              Take Test
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Target className="h-6 w-6 mb-2" />
              View Progress
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Study Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
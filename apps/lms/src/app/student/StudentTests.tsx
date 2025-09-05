import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Play,
  Trophy,
  Calendar,
  BarChart3,
  Search,
  TrendingUp
} from 'lucide-react';

const StudentTests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tests = [
    {
      id: '1',
      title: 'Calculus Fundamentals Quiz',
      subject: 'Mathematics',
      instructor: 'Dr. Sarah Smith',
      type: 'Quiz',
      questions: 15,
      timeLimit: 30,
      maxAttempts: 3,
      attemptsUsed: 1,
      bestScore: 92,
      averageScore: 85,
      status: 'completed',
      dueDate: '2024-01-25',
      assignedDate: '2024-01-18',
      difficulty: 'Intermediate',
      topics: ['Derivatives', 'Limits', 'Integration'],
      lastAttempt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Physics: Laws of Motion Test',
      subject: 'Physics',
      instructor: 'Prof. Michael Johnson',
      type: 'Test',
      questions: 25,
      timeLimit: 60,
      maxAttempts: 2,
      attemptsUsed: 0,
      bestScore: null,
      averageScore: 78,
      status: 'available',
      dueDate: '2024-01-28',
      assignedDate: '2024-01-20',
      difficulty: 'Advanced',
      topics: ['Newton\'s Laws', 'Friction', 'Momentum'],
      priority: 'high'
    },
    {
      id: '3',
      title: 'Organic Chemistry Basics',
      subject: 'Chemistry',
      instructor: 'Dr. Emily Brown',
      type: 'Assignment',
      questions: 20,
      timeLimit: 45,
      maxAttempts: 2,
      attemptsUsed: 2,
      bestScore: 78,
      averageScore: 82,
      status: 'completed',
      dueDate: '2024-01-22',
      assignedDate: '2024-01-15',
      difficulty: 'Beginner',
      topics: ['Functional Groups', 'Nomenclature', 'Reactions'],
      lastAttempt: '2024-01-21'
    },
    {
      id: '4',
      title: 'Advanced Integration Methods',
      subject: 'Mathematics',
      instructor: 'Dr. Sarah Smith',
      type: 'Test',
      questions: 18,
      timeLimit: 50,
      maxAttempts: 2,
      attemptsUsed: 1,
      bestScore: 85,
      averageScore: 79,
      status: 'in-progress',
      dueDate: '2024-01-30',
      assignedDate: '2024-01-22',
      difficulty: 'Advanced',
      topics: ['Integration by Parts', 'Substitution', 'Partial Fractions'],
      lastAttempt: '2024-01-23'
    },
    {
      id: '5',
      title: 'Thermodynamics Quiz',
      subject: 'Physics',
      instructor: 'Prof. Michael Johnson',
      type: 'Quiz',
      questions: 12,
      timeLimit: 25,
      maxAttempts: 3,
      attemptsUsed: 0,
      bestScore: null,
      averageScore: 73,
      status: 'overdue',
      dueDate: '2024-01-23',
      assignedDate: '2024-01-16',
      difficulty: 'Intermediate',
      topics: ['Heat Transfer', 'Entropy', 'Gas Laws'],
      priority: 'high'
    }
  ];

  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry'];
  const statuses = ['all', 'available', 'in-progress', 'completed', 'overdue'];

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || test.subject === selectedSubject;
    const matchesStatus = selectedStatus === 'all' || test.status === selectedStatus;
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const stats = {
    totalTests: tests.length,
    completedTests: tests.filter(t => t.status === 'completed').length,
    averageScore: Math.round(tests.filter(t => t.bestScore).reduce((sum, t) => sum + (t.bestScore || 0), 0) / tests.filter(t => t.bestScore).length),
    overdueTests: tests.filter(t => t.status === 'overdue').length
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-blue-500">Available</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return <Badge className="bg-green-600">Beginner</Badge>;
      case 'Intermediate':
        return <Badge className="bg-yellow-600">Intermediate</Badge>;
      case 'Advanced':
        return <Badge className="bg-red-600">Advanced</Badge>;
      default:
        return <Badge variant="outline">{difficulty}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <Play className="h-4 w-4 text-blue-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Test Center</h1>
        <p className="text-muted-foreground">
          Access your assignments, quizzes, and track your performance
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tests</p>
                <p className="text-2xl font-bold">{stats.totalTests}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{stats.completedTests}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(stats.averageScore)}`}>
                  {stats.averageScore}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-red-500">{stats.overdueTests}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tests" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tests">All Tests</TabsTrigger>
          <TabsTrigger value="results">Results & Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tests and topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>
                        {subject === 'all' ? 'All Subjects' : subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status === 'all' ? 'All Status' : 
                         status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tests Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {filteredTests.map((test) => (
              <Card key={test.id} className="hover-lift card-elegant">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getStatusIcon(test.status)}
                        <CardTitle className="text-lg">{test.title}</CardTitle>
                        {test.priority === 'high' && (
                          <Badge variant="destructive" className="text-xs">High Priority</Badge>
                        )}
                      </div>
                      <CardDescription>
                        {test.instructor} • {test.subject} • {test.type}
                      </CardDescription>
                    </div>
                    {getStatusBadge(test.status)}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="secondary">{test.subject}</Badge>
                    {getDifficultyBadge(test.difficulty)}
                    <Badge variant="outline">{test.type}</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Questions</div>
                      <div className="font-medium">{test.questions}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Time Limit</div>
                      <div className="font-medium">{test.timeLimit} min</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Attempts</div>
                      <div className="font-medium">{test.attemptsUsed}/{test.maxAttempts}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Due Date</div>
                      <div className="font-medium">
                        {new Date(test.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {test.bestScore !== null && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Best Score</span>
                        <span className={`font-bold ${getScoreColor(test.bestScore)}`}>
                          {test.bestScore}%
                        </span>
                      </div>
                      <Progress value={test.bestScore} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        Class Average: {test.averageScore}%
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Topics Covered:</div>
                    <div className="flex flex-wrap gap-1">
                      {test.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      {test.lastAttempt && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Last attempt: {new Date(test.lastAttempt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {test.status === 'completed' && (
                        <Button variant="outline" size="sm">
                          View Results
                        </Button>
                      )}
                      {(test.status === 'available' || test.status === 'in-progress' || test.status === 'overdue') && 
                       test.attemptsUsed < test.maxAttempts && (
                        <Button size="sm" className="bg-gradient-primary">
                          {test.status === 'in-progress' ? 'Resume' : 'Start Test'}
                        </Button>
                      )}
                      {test.attemptsUsed >= test.maxAttempts && test.status !== 'completed' && (
                        <Badge variant="secondary">No attempts left</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Performance Overview
                </CardTitle>
                <CardDescription>Your test performance summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Average</span>
                    <span className={`text-lg font-bold ${getScoreColor(stats.averageScore)}`}>
                      {stats.averageScore}%
                    </span>
                  </div>
                  <Progress value={stats.averageScore} className="h-3" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Completion Rate</span>
                    <span className="text-lg font-bold">
                      {Math.round((stats.completedTests / stats.totalTests) * 100)}%
                    </span>
                  </div>
                  <Progress value={(stats.completedTests / stats.totalTests) * 100} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5" />
                  Subject Performance
                </CardTitle>
                <CardDescription>Performance breakdown by subject</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {['Mathematics', 'Physics', 'Chemistry'].map((subject) => {
                  const subjectTests = tests.filter(t => t.subject === subject && t.bestScore !== null);
                  const avgScore = subjectTests.length > 0 
                    ? Math.round(subjectTests.reduce((sum, t) => sum + (t.bestScore || 0), 0) / subjectTests.length)
                    : 0;
                  
                  return (
                    <div key={subject} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{subject}</span>
                        <span className={`font-bold ${getScoreColor(avgScore)}`}>{avgScore}%</span>
                      </div>
                      <Progress value={avgScore} className="h-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Test Results</CardTitle>
              <CardDescription>Your latest test performances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tests.filter(t => t.bestScore !== null).slice(0, 5).map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{test.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {test.subject} • {new Date(test.lastAttempt || test.assignedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getScoreColor(test.bestScore || 0)}`}>
                        {test.bestScore}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Avg: {test.averageScore}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentTests;
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Search, TrendingUp, TrendingDown, Clock, Award, BookOpen, Video, FileText } from 'lucide-react';

interface StudentProgress {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  overallProgress: number;
  videosWatched: number;
  testsCompleted: number;
  averageScore: number;
  timeSpent: number; // in hours
  lastActivity: string;
  status: 'excellent' | 'good' | 'needs_attention' | 'at_risk';
  subjects: {
    name: string;
    progress: number;
    score: number;
  }[];
}

const mockStudentProgress: StudentProgress[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    overallProgress: 85,
    videosWatched: 45,
    testsCompleted: 12,
    averageScore: 92,
    timeSpent: 120,
    lastActivity: '2024-01-20',
    status: 'excellent',
    subjects: [
      { name: 'Mathematics', progress: 90, score: 95 },
      { name: 'Physics', progress: 80, score: 88 },
      { name: 'Chemistry', progress: 85, score: 92 }
    ]
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    overallProgress: 65,
    videosWatched: 32,
    testsCompleted: 8,
    averageScore: 78,
    timeSpent: 89,
    lastActivity: '2024-01-19',
    status: 'good',
    subjects: [
      { name: 'Mathematics', progress: 70, score: 82 },
      { name: 'Physics', progress: 60, score: 75 },
      { name: 'Chemistry', progress: 65, score: 77 }
    ]
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@example.com',
    overallProgress: 45,
    videosWatched: 18,
    testsCompleted: 4,
    averageScore: 65,
    timeSpent: 45,
    lastActivity: '2024-01-15',
    status: 'needs_attention',
    subjects: [
      { name: 'Mathematics', progress: 50, score: 68 },
      { name: 'Physics', progress: 40, score: 62 },
      { name: 'Chemistry', progress: 45, score: 65 }
    ]
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    overallProgress: 25,
    videosWatched: 8,
    testsCompleted: 2,
    averageScore: 45,
    timeSpent: 20,
    lastActivity: '2024-01-10',
    status: 'at_risk',
    subjects: [
      { name: 'Mathematics', progress: 30, score: 50 },
      { name: 'Physics', progress: 20, score: 40 },
      { name: 'Chemistry', progress: 25, score: 45 }
    ]
  }
];

const progressChartData = [
  { month: 'Sep', progress: 20 },
  { month: 'Oct', progress: 35 },
  { month: 'Nov', progress: 55 },
  { month: 'Dec', progress: 70 },
  { month: 'Jan', progress: 85 }
];

const statusData = [
  { name: 'Excellent', value: 25, color: '#22c55e' },
  { name: 'Good', value: 45, color: '#3b82f6' },
  { name: 'Needs Attention', value: 20, color: '#f59e0b' },
  { name: 'At Risk', value: 10, color: '#ef4444' }
];

const StudentProgress = () => {
  const [students] = useState<StudentProgress[]>(mockStudentProgress);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(students[0]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-green-500">Excellent</Badge>;
      case 'good':
        return <Badge className="bg-blue-500">Good</Badge>;
      case 'needs_attention':
        return <Badge className="bg-yellow-500">Needs Attention</Badge>;
      case 'at_risk':
        return <Badge variant="destructive">At Risk</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'good':
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case 'needs_attention':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'at_risk':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Student Progress Analytics</h1>
        <p className="text-muted-foreground">Monitor and analyze student learning progress</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="individual">Individual Progress</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold">{students.length}</p>
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
                      {Math.round(students.reduce((acc, s) => acc + s.overallProgress, 0) / students.length)}%
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
                    <p className="text-sm font-medium text-muted-foreground">Avg Score</p>
                    <p className="text-2xl font-bold">
                      {Math.round(students.reduce((acc, s) => acc + s.averageScore, 0) / students.length)}%
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
                    <p className="text-sm font-medium text-muted-foreground">At Risk</p>
                    <p className="text-2xl font-bold text-red-500">
                      {students.filter(s => s.status === 'at_risk').length}
                    </p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student Progress Overview</CardTitle>
              <CardDescription>
                Filter and view all students' progress at a glance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="needs_attention">Needs Attention</SelectItem>
                    <SelectItem value="at_risk">At Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Overall Progress</TableHead>
                      <TableHead>Avg Score</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow 
                        key={student.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.avatar} />
                              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground">{student.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={student.overallProgress} className="w-[100px]" />
                            <span className="text-sm font-medium">{student.overallProgress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{student.averageScore}%</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Video className="mr-1 h-3 w-3" />
                              {student.videosWatched}
                            </div>
                            <div className="flex items-center">
                              <FileText className="mr-1 h-3 w-3" />
                              {student.testsCompleted}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {student.timeSpent}h
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(student.status)}
                            {getStatusBadge(student.status)}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(student.lastActivity).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="individual" className="space-y-6">
          {selectedStudent && (
            <>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedStudent.avatar} />
                      <AvatarFallback className="text-lg">
                        {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{selectedStudent.name}</CardTitle>
                      <CardDescription className="text-lg">{selectedStudent.email}</CardDescription>
                    </div>
                    <div className="ml-auto">
                      {getStatusBadge(selectedStudent.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{selectedStudent.overallProgress}%</div>
                      <div className="text-sm text-muted-foreground">Overall Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">{selectedStudent.averageScore}%</div>
                      <div className="text-sm text-muted-foreground">Average Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-500">{selectedStudent.timeSpent}h</div>
                      <div className="text-sm text-muted-foreground">Time Spent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-500">{selectedStudent.videosWatched}</div>
                      <div className="text-sm text-muted-foreground">Videos Watched</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subject Progress</CardTitle>
                  <CardDescription>Progress breakdown by subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedStudent.subjects.map((subject, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{subject.name}</span>
                          <div className="flex items-center space-x-4 text-sm">
                            <span>Progress: {subject.progress}%</span>
                            <span>Score: {subject.score}%</span>
                          </div>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress Trend</CardTitle>
                <CardDescription>Overall progress over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={progressChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Status Distribution</CardTitle>
                <CardDescription>Breakdown of student performance levels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
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
              <CardTitle>Performance by Subject</CardTitle>
              <CardDescription>Average scores across different subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { subject: 'Mathematics', score: 85 },
                  { subject: 'Physics', score: 78 },
                  { subject: 'Chemistry', score: 82 },
                  { subject: 'Biology', score: 88 },
                  { subject: 'Computer Science', score: 91 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentProgress;
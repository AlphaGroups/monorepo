import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Search, Edit, Trash2, Mail, GraduationCap, BookOpen, TrendingUp, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  studentId: z.string().min(1, 'Student ID is required'),
  phone: z.string().optional(),
  year: z.string().min(1, 'Academic year is required'),
  program: z.string().min(1, 'Program is required'),
  classIds: z.array(z.string()).min(1, 'At least one class must be selected'),
});

type FormData = z.infer<typeof formSchema>;

interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  phone?: string;
  year: string;
  program: string;
  classIds: string[];
  classList: string[];
  avatar?: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin?: string;
  overallProgress: number;
  completedVideos: number;
  totalVideos: number;
  completedTests: number;
  totalTests: number;
  averageScore: number;
}

// Mock data
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@student.edu',
    studentId: 'STU001',
    phone: '+1-555-0345',
    year: '2nd Year',
    program: 'Computer Science',
    classIds: ['class-1', 'class-2'],
    classList: ['Math 101', 'Advanced Calculus'],
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '30 minutes ago',
    overallProgress: 85,
    completedVideos: 34,
    totalVideos: 40,
    completedTests: 8,
    totalTests: 10,
    averageScore: 87
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@student.edu',
    studentId: 'STU002',
    phone: '+1-555-0678',
    year: '3rd Year',
    program: 'Physics',
    classIds: ['class-3'],
    classList: ['Physics Advanced'],
    status: 'active',
    createdAt: '2024-02-10',
    lastLogin: '2 hours ago',
    overallProgress: 62,
    completedVideos: 15,
    totalVideos: 25,
    completedTests: 4,
    totalTests: 8,
    averageScore: 73
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@student.edu',
    studentId: 'STU003',
    year: '1st Year',
    program: 'Chemistry',
    classIds: ['class-4', 'class-5'],
    classList: ['Chemistry Basic', 'Organic Chemistry'],
    status: 'inactive',
    createdAt: '2024-01-20',
    lastLogin: '3 days ago',
    overallProgress: 45,
    completedVideos: 9,
    totalVideos: 20,
    completedTests: 2,
    totalTests: 6,
    averageScore: 65
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@student.edu',
    studentId: 'STU004',
    phone: '+1-555-0789',
    year: '4th Year',
    program: 'Engineering',
    classIds: ['class-1', 'class-3'],
    classList: ['Math 101', 'Physics Advanced'],
    status: 'active',
    createdAt: '2024-03-01',
    lastLogin: '1 hour ago',
    overallProgress: 92,
    completedVideos: 38,
    totalVideos: 42,
    completedTests: 9,
    totalTests: 10,
    averageScore: 94
  }
];

const mockPrograms = [
  'Computer Science', 'Physics', 'Chemistry', 'Mathematics', 'Engineering', 'Biology', 'Literature', 'History'
];

const mockYears = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'];

const mockClasses = [
  { id: 'class-1', name: 'Math 101' },
  { id: 'class-2', name: 'Advanced Calculus' },
  { id: 'class-3', name: 'Physics Advanced' },
  { id: 'class-4', name: 'Chemistry Basic' },
  { id: 'class-5', name: 'Organic Chemistry' }
];

const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      studentId: '',
      phone: '',
      year: '',
      program: '',
      classIds: [],
    },
  });

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.program.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const onSubmit = (data: FormData) => {
    const assignedClasses = mockClasses.filter(c => data.classIds.includes(c.id));
    
    if (editingStudent) {
      // Update existing student
      setStudents(prev => prev.map(student => 
        student.id === editingStudent.id 
          ? { 
              ...student, 
              ...data, 
              classList: assignedClasses.map(c => c.name)
            }
          : student
      ));
      toast({
        title: "Student Updated",
        description: "Student details have been updated successfully.",
      });
    } else {
      // Create new student
      const newStudent: Student = {
        id: Math.random().toString(36).substr(2, 9),
        name: data.name,
        email: data.email,
        studentId: data.studentId,
        phone: data.phone,
        year: data.year,
        program: data.program,
        classIds: data.classIds,
        classList: assignedClasses.map(c => c.name),
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        overallProgress: 0,
        completedVideos: 0,
        totalVideos: 10,
        completedTests: 0,
        totalTests: 5,
        averageScore: 0
      };
      setStudents(prev => [...prev, newStudent]);
      toast({
        title: "Student Created",
        description: "New student has been created successfully.",
      });
    }
    
    form.reset();
    setIsDialogOpen(false);
    setEditingStudent(null);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    form.reset({
      name: student.name,
      email: student.email,
      studentId: student.studentId,
      phone: student.phone || '',
      year: student.year,
      program: student.program,
      classIds: student.classIds,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (studentId: string) => {
    try {
      const response = await fetch(`/api/students/${studentId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setStudents(prev => prev.filter(student => student.id !== studentId));
        toast({
          title: "Student Removed",
          description: "Student has been removed from the system.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete student. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const activeStudents = students.filter(s => s.status === 'active');
  const totalProgress = activeStudents.reduce((sum, s) => sum + s.overallProgress, 0) / activeStudents.length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-muted-foreground">Manage student enrollment and track academic progress</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Import
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingStudent(null); form.reset(); }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingStudent ? 'Edit Student' : 'Enroll New Student'}</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="studentId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Student ID</FormLabel>
                          <FormControl>
                            <Input placeholder="STU001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="student@college.edu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1-555-0123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Academic Year</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockYears.map((year) => (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="program"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Program</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select program" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockPrograms.map((program) => (
                                <SelectItem key={program} value={program}>
                                  {program}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="classIds"
                    render={() => (
                      <FormItem>
                        <FormLabel>Enroll in Classes</FormLabel>
                        <div className="grid grid-cols-2 gap-2">
                          {mockClasses.map((cls) => (
                            <FormField
                              key={cls.id}
                              control={form.control}
                              name="classIds"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={cls.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(cls.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), cls.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== cls.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {cls.name}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingStudent ? 'Update Student' : 'Enroll Student'}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">All Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold">{students.length}</p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                    <p className="text-2xl font-bold">{students.filter(s => s.status === 'active').length}</p>
                  </div>
                  <Badge variant="default" className="h-8 w-8 rounded-full p-0 flex items-center justify-center">
                    ✓
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average Progress</p>
                    <p className="text-2xl font-bold">{Math.round(totalProgress)}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                    <p className="text-2xl font-bold">78%</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students
                  .filter(s => s.status === 'active')
                  .sort((a, b) => b.overallProgress - a.overallProgress)
                  .slice(0, 5)
                  .map((student) => (
                    <div key={student.id} className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.program} - {student.year}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${getProgressColor(student.overallProgress)}`}>
                          {student.overallProgress}%
                        </p>
                        <Progress value={student.overallProgress} className="w-20" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          {/* Filters */}
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Students Table */}
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Classes</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.studentId}</p>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              <span>{student.email}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Badge variant="outline">{student.program}</Badge>
                          <p className="text-sm text-muted-foreground mt-1">{student.year}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {student.classList.slice(0, 2).map((className) => (
                            <Badge key={className} variant="secondary" className="text-xs">
                              {className}
                            </Badge>
                          ))}
                          {student.classList.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{student.classList.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Overall</span>
                            <span className={getProgressColor(student.overallProgress)}>
                              {student.overallProgress}%
                            </span>
                          </div>
                          <Progress value={student.overallProgress} className="w-20" />
                          <div className="text-xs text-muted-foreground">
                            Videos: {student.completedVideos}/{student.totalVideos} | 
                            Tests: {student.completedTests}/{student.totalTests}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <p className="font-bold text-lg">{student.averageScore}%</p>
                          <p className="text-sm text-muted-foreground">Avg Score</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            student.status === 'active' ? 'default' : 
                            student.status === 'suspended' ? 'destructive' : 'secondary'
                          }
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(student)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(student.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Excellent (80%+)</span>
                    <span className="font-bold text-green-600">
                      {students.filter(s => s.overallProgress >= 80).length} students
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Good (60-79%)</span>
                    <span className="font-bold text-yellow-600">
                      {students.filter(s => s.overallProgress >= 60 && s.overallProgress < 80).length} students
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Needs Improvement (&lt;60%)</span>
                    <span className="font-bold text-red-600">
                      {students.filter(s => s.overallProgress < 60).length} students
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Program Enrollment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPrograms.slice(0, 5).map((program) => {
                    const count = students.filter(s => s.program === program).length;
                    return (
                      <div key={program} className="flex justify-between items-center">
                        <span>{program}</span>
                        <span className="font-bold">{count} students</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentManagement;
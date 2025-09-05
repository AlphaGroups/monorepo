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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Search, Edit, Trash2, Mail, Phone, GraduationCap, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  department: z.string().min(1, 'Department is required'),
  subjects: z.array(z.string()).min(1, 'At least one subject is required'),
  classIds: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ClassUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  subjects: string[];
  classIds: string[];
  classList: string[];
  avatar?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
  studentCount: number;
}

// Mock data
const mockClassUsers: ClassUser[] = [
  {
    id: '1',
    name: 'Dr. Sarah Williams',
    email: 'sarah.williams@college.edu',
    phone: '+1-555-0234',
    department: 'Mathematics',
    subjects: ['Calculus', 'Algebra', 'Statistics'],
    classIds: ['class-1', 'class-2'],
    classList: ['Math 101', 'Advanced Calculus'],
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '1 hour ago',
    studentCount: 45
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@college.edu',
    phone: '+1-555-0567',
    department: 'Physics',
    subjects: ['Quantum Physics', 'Thermodynamics'],
    classIds: ['class-3'],
    classList: ['Physics Advanced'],
    status: 'active',
    createdAt: '2024-02-10',
    lastLogin: '3 hours ago',
    studentCount: 32
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@college.edu',
    department: 'Chemistry',
    subjects: ['Organic Chemistry', 'Biochemistry'],
    classIds: ['class-4', 'class-5'],
    classList: ['Chemistry Basic', 'Organic Chemistry'],
    status: 'inactive',
    createdAt: '2024-01-20',
    lastLogin: '2 days ago',
    studentCount: 28
  }
];

const mockDepartments = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Engineering', 'Literature', 'History'
];

const mockSubjects = [
  'Calculus', 'Algebra', 'Statistics', 'Geometry', 'Quantum Physics', 'Thermodynamics', 'Mechanics',
  'Organic Chemistry', 'Inorganic Chemistry', 'Biochemistry', 'Biology', 'Genetics', 'Anatomy',
  'Programming', 'Data Structures', 'Algorithms', 'Machine Learning'
];

const mockClasses = [
  { id: 'class-1', name: 'Math 101', studentCount: 45 },
  { id: 'class-2', name: 'Advanced Calculus', studentCount: 32 },
  { id: 'class-3', name: 'Physics Advanced', studentCount: 28 },
  { id: 'class-4', name: 'Chemistry Basic', studentCount: 35 },
  { id: 'class-5', name: 'Organic Chemistry', studentCount: 25 }
];

const ClassUserManagement = () => {
  const [classUsers, setClassUsers] = useState<ClassUser[]>(mockClassUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<ClassUser | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      department: '',
      subjects: [],
      classIds: [],
    },
  });

  const filteredUsers = classUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = async (data: FormData) => {
    try {
      const assignedClasses = mockClasses.filter(c => data.classIds?.includes(c.id));
      
      if (editingUser) {
        // Update existing class user - API call
        const response = await fetch(`/api/teachers/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            classList: assignedClasses.map(c => c.name),
            studentCount: assignedClasses.reduce((sum, c) => sum + c.studentCount, 0)
          })
        });
        
        if (response.ok) {
          setClassUsers(prev => prev.map(user => 
            user.id === editingUser.id 
              ? { 
                  ...user, 
                  ...data, 
                  classList: assignedClasses.map(c => c.name),
                  studentCount: assignedClasses.reduce((sum, c) => sum + c.studentCount, 0)
                }
              : user
          ));
          toast({
            title: "Teacher Updated",
            description: "Teacher details have been updated successfully.",
          });
        }
      } else {
        // Create new class user - API call
        const response = await fetch('/api/teachers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            classList: assignedClasses.map(c => c.name),
            studentCount: assignedClasses.reduce((sum, c) => sum + c.studentCount, 0)
          })
        });
        
        if (response.ok) {
          const newUser: ClassUser = {
            id: Math.random().toString(36).substr(2, 9),
            name: data.name,
            email: data.email,
            phone: data.phone,
            department: data.department,
            subjects: data.subjects,
            classIds: data.classIds || [],
            classList: assignedClasses.map(c => c.name),
            status: 'active',
            createdAt: new Date().toISOString().split('T')[0],
            studentCount: assignedClasses.reduce((sum, c) => sum + c.studentCount, 0)
          };
          setClassUsers(prev => [...prev, newUser]);
          toast({
            title: "Teacher Created",
            description: "New teacher has been created successfully.",
          });
        }
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to save teacher. Please try again.",
        variant: "destructive",
      });
    }
    
    form.reset();
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  const handleEdit = (user: ClassUser) => {
    setEditingUser(user);
    form.reset({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      department: user.department,
      subjects: user.subjects,
      classIds: user.classIds,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (userId: string) => {
    try {
      const response = await fetch(`/api/teachers/${userId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setClassUsers(prev => prev.filter(user => user.id !== userId));
        toast({
          title: "Teacher Removed",
          description: "Teacher has been removed from the system.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete teacher. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Teacher Management</h1>
          <p className="text-muted-foreground">Manage teachers and class assignments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingUser(null); form.reset(); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingUser ? 'Edit Teacher' : 'Create New Teacher'}</DialogTitle>
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
                          <Input placeholder="Dr. John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="teacher@college.edu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
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
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockDepartments.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
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
                  name="subjects"
                  render={() => (
                    <FormItem>
                      <FormLabel>Subjects (Select multiple)</FormLabel>
                      <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                        {mockSubjects.map((subject) => (
                          <FormField
                            key={subject}
                            control={form.control}
                            name="subjects"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={subject}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(subject)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, subject])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== subject
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {subject}
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
                
                <FormField
                  control={form.control}
                  name="classIds"
                  render={() => (
                    <FormItem>
                      <FormLabel>Assign Classes (Optional)</FormLabel>
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
                                    {cls.name} ({cls.studentCount} students)
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
                    {editingUser ? 'Update Teacher' : 'Create Teacher'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Teachers</p>
                <p className="text-2xl font-bold">{classUsers.length}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Teachers</p>
                <p className="text-2xl font-bold">{classUsers.filter(u => u.status === 'active').length}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{classUsers.reduce((sum, u) => sum + u.studentCount, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Teachers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Teachers & Class Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span>{user.email}</span>
                        </div>
                        {user.phone && (
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.subjects.slice(0, 2).map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {user.subjects.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{user.subjects.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.classList.slice(0, 2).map((className) => (
                        <Badge key={className} variant="outline" className="text-xs">
                          {className}
                        </Badge>
                      ))}
                      {user.classList.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.classList.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{user.studentCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
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
    </div>
  );
};

export default ClassUserManagement;
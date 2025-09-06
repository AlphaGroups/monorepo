import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, MoreHorizontal, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Class {
  id: string;
  name: string;
  code: string;
  description: string;
  instructor: string;
  studentsCount: number;
  status: 'active' | 'inactive' | 'archived';
  schedule: string;
  startDate: string;
  endDate: string;
  category: string;
}

const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    code: 'MATH-301',
    description: 'Advanced calculus and linear algebra',
    instructor: 'Dr. Smith',
    studentsCount: 45,
    status: 'active',
    schedule: 'Mon, Wed, Fri 10:00 AM',
    startDate: '2024-01-15',
    endDate: '2024-05-15',
    category: 'Mathematics'
  },
  {
    id: '2',
    name: 'Physics Laboratory',
    code: 'PHYS-201',
    description: 'Hands-on physics experiments',
    instructor: 'Prof. Johnson',
    studentsCount: 30,
    status: 'active',
    schedule: 'Tue, Thu 2:00 PM',
    startDate: '2024-01-15',
    endDate: '2024-05-15',
    category: 'Science'
  },
  {
    id: '3',
    name: 'Computer Programming',
    code: 'CS-101',
    description: 'Introduction to programming concepts',
    instructor: 'Dr. Wilson',
    studentsCount: 60,
    status: 'active',
    schedule: 'Mon, Wed 1:00 PM',
    startDate: '2024-01-15',
    endDate: '2024-05-15',
    category: 'Computer Science'
  }
];

const ClassList = () => {
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cls.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || cls.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'archived':
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleDeleteClass = async (classId: string) => {
    try {
      const response = await fetch(`/api/classes/${classId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setClasses(classes.filter(cls => cls.id !== classId));
      }
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Class Management</h1>
          <p className="text-muted-foreground">Manage all classes and their details</p>
        </div>
        <Button asChild>
          <Link to="/admin/classes/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Class
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Classes</CardTitle>
          <CardDescription>
            Manage and monitor all classes in your institution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search classes, codes, or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class Info</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{cls.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {cls.code} • {cls.category}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {cls.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{cls.instructor}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        {cls.studentsCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {cls.schedule}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(cls.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{cls.startDate}</div>
                        <div className="text-muted-foreground">to {cls.endDate}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/classes/${cls.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/classes/${cls.id}/edit`}>Edit Class</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/classes/${cls.id}/students`}>Manage Students</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDeleteClass(cls.id)}
                          >
                            Delete Class
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassList;
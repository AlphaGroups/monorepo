"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  fetchTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "@/services/teacher/teacher";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Search, Edit, Trash2, GraduationCap } from "lucide-react";

// ✅ Zod schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  department: z.string().min(1, "Department is required"),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
});

type FormData = z.infer<typeof formSchema>;

interface Teacher {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  department: string;
  subjects: string[];
  avatar?: string;
  status: "active" | "inactive";
  createdAt: string;
}

// 🔹 Mapper to keep frontend shape consistent
const mapTeacher = (t: any): Teacher => ({
  id: t.id,
  name: t.full_name,
  email: t.email,
  phone: t.mobile,
  department: t.department ?? "",
  subjects: t.subject ? t.subject.split(",") : [],
  avatar: t.avatar ?? "",
  status: t.status ?? "active",
  createdAt: t.createdAt ?? "",
});

const ClassUserManagement = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      department: "",
      subjects: [],
    },
  });

  // ✅ Load teachers on mount
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTeachers();
        setTeachers(data.map(mapTeacher));
      } catch {
        toast.error("Failed to fetch teachers.");
      }
    };
    load();
  }, []);

  const filteredTeachers = teachers.filter(
    (t) =>
      (t.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.email ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.department ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        full_name: data.name,
        email: data.email,
        mobile: data.phone || "",
        password: editingTeacher ? "dummy" : "teacher123",
        college_id: 1, // TODO: dynamic
        subject: data.subjects.join(","),
      };

      if (editingTeacher) {
        await updateTeacher(editingTeacher.id, payload);
        toast.success("Teacher updated successfully.");
      } else {
        await createTeacher(payload);
        toast.success("New teacher created successfully.");
      }

      const refreshed = await fetchTeachers();
      setTeachers(refreshed.map(mapTeacher));
    } catch {
      toast.error("Failed to save teacher.");
    }
    form.reset();
    setIsDialogOpen(false);
    setEditingTeacher(null);
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    form.reset({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      department: teacher.department,
      subjects: teacher.subjects,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deleteTeacher(id);
      setTeachers((prev) => prev.filter((t) => t.id !== id));
      toast.success("Teacher deleted.");
    } catch {
      toast.error("Failed to delete teacher.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <GraduationCap className="w-6 h-6" /> Teacher Management
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTeacher(null)}>
              <Plus className="w-4 h-4 mr-2" /> Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingTeacher ? "Edit Teacher" : "Add Teacher"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone" {...field} />
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
                      <FormControl>
                        <Input placeholder="Enter department" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subjects"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subjects (comma separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Math, Science"
                          value={field.value.join(", ")}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {editingTeacher ? "Update" : "Create"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center">
        <Search className="w-4 h-4 mr-2 text-gray-500" />
        <Input
          placeholder="Search teachers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Teacher Table */}
      <Card>
        <CardHeader>
          <CardTitle>Teacher List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={t.avatar} />
                      <AvatarFallback>{t.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-sm text-gray-500">{t.email}</div>
                      <div className="text-sm text-gray-400">{t.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{t.department}</TableCell>
                  <TableCell>
                    {t.subjects.map((s, i) => (
                      <Badge key={i} variant="secondary" className="mr-1">
                        {s}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={t.status === "active" ? "default" : "secondary"}
                    >
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(t)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(t.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTeachers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No teachers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassUserManagement;

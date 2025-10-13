"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Plus, Pencil, Trash, MoreHorizontal, Eye, X } from "lucide-react";
import {
  Admin,
  College,
  AdminPayload,
  getAdmins,
  getColleges,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "@/services/Admin/admin";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  grantAdminAccess,
  revokeAdminAccessFromClass,
  revokeAdminAccessFromAll,
  AdminAccessResponse
} from "@/services/Admin/adminAccess";

// ✅ form validation
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  mobile: z.string().min(10, "Invalid mobile number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  collegeId: z.string().nonempty("Select a college"),
});

type FormData = z.infer<typeof formSchema>;

interface Class {
  id: string;
  name: string;
  code: string;
  description: string;
  instructor: string;
  studentsCount: number;
  status: "active" | "inactive" | "archived";
  schedule: string;
  startDate: string;
  endDate: string;
  category: string;
}

interface ClassAccess {
  id: string;
  name: string;
  code: string;
  instructor: string;
}

interface AdminWithAccess extends Admin {
  classesAccess?: ClassAccess[];
}

export default function AdminManagement() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [adminAccess, setAdminAccess] = useState<Record<string, ClassAccess[]>>({});
  const [selectedClassForGrant, setSelectedClassForGrant] = useState<Record<string, string>>({});
  const [classes, setClasses] = useState<Class[]>([]);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      collegeId: "",
    },
  });

  // ✅ fetch admins
  const fetchAdmins = async (page: number = 1, size: number = 10) => {
    try {
      const response = await getAdmins(page, size);
      const adminsData = Array.isArray(response) ? response : response.data || [];
      setAdmins(adminsData);
    } catch {
      toast.error("Failed to fetch admins.");
    }
  };

  // ✅ fetch colleges
  const fetchColleges = async (page: number = 1, size: number = 10) => {
    try {
      const response = await getColleges(page, size);
      const collegesData = Array.isArray(response) ? response : response.data || [];
      setColleges(collegesData);
    } catch {
      toast.error("Failed to fetch colleges.");
    }
  };

  // Mock function to fetch classes (since real API may not exist)
  const fetchClasses = async () => {
    // Using mock data similar to ClassList page
    const mockClasses: Class[] = [
      {
        id: "1",
        name: "Advanced Mathematics",
        code: "MATH-301",
        description: "Advanced calculus and linear algebra",
        instructor: "Dr. Smith",
        studentsCount: 45,
        status: "active",
        schedule: "Mon, Wed, Fri 10:00 AM",
        startDate: "2024-01-15",
        endDate: "2024-05-15",
        category: "Mathematics",
      },
      {
        id: "2",
        name: "Physics Laboratory",
        code: "PHYS-201",
        description: "Hands-on physics experiments",
        instructor: "Prof. Johnson",
        studentsCount: 30,
        status: "active",
        schedule: "Tue, Thu 2:00 PM",
        startDate: "2024-01-15",
        endDate: "2024-05-15",
        category: "Science",
      },
      {
        id: "3",
        name: "Computer Programming",
        code: "CS-101",
        description: "Introduction to programming concepts",
        instructor: "Dr. Wilson",
        studentsCount: 60,
        status: "active",
        schedule: "Mon, Wed 1:00 PM",
        startDate: "2024-01-15",
        endDate: "2024-05-15",
        category: "Computer Science",
      },
    ];
    setClasses(mockClasses);
  };

  // Function to get admin's class access (mock implementation)
  const fetchAdminAccess = async (adminId: string) => {
    // In a real implementation, this would fetch from the backend
    // For now, return empty array or mock data
    return [] as ClassAccess[];
  };

  // Function to load admin access data
  const loadAdminAccessData = async () => {
    // For each admin, fetch their class access
    for (const admin of admins) {
      const adminAccessData = await fetchAdminAccess(admin.id);
      setAdminAccess(prev => ({
        ...prev,
        [admin.id]: adminAccessData
      }));
    }
  };

  useEffect(() => {
    fetchAdmins();
    fetchColleges();
    fetchClasses();
  }, []);

  // Load admin access data whenever admins change
  useEffect(() => {
    if (admins.length > 0) {
      loadAdminAccessData();
    }
  }, [admins]);

  // Function to handle granting access
  const handleGrantAccess = async (adminId: string, adminName: string) => {
    const classId = selectedClassForGrant[adminId];
    if (!classId) {
      toast.error("Please select a class to grant access to");
      return;
    }

    setLoadingStates(prev => ({ ...prev, [`grant_${adminId}_${classId}`]: true }));
    
    try {
      await grantAdminAccess(adminId, classId);
      toast.success(`Access granted to ${adminName} for the selected class`);
      
      // Update local state
      const classInfo = classes.find(c => c.id === classId);
      if (classInfo) {
        setAdminAccess(prev => ({
          ...prev,
          [adminId]: [...(prev[adminId] || []), { 
            id: classInfo.id, 
            name: classInfo.name, 
            code: classInfo.code,
            instructor: classInfo.instructor
          }]
        }));
      }
      
      // Reset selection
      setSelectedClassForGrant(prev => {
        const newSelected = { ...prev };
        delete newSelected[adminId];
        return newSelected;
      });
    } catch (error) {
      toast.error("Failed to grant access. Please try again.");
      console.error("Error granting access:", error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [`grant_${adminId}_${classId}`]: false }));
    }
  };

  // Function to handle revoking access from a specific class
  const handleRevokeAccessFromClass = async (adminId: string, classId: string, adminName: string, className: string) => {
    setLoadingStates(prev => ({ ...prev, [`revoke_${adminId}_${classId}`]: true }));
    
    try {
      await revokeAdminAccessFromClass(adminId, classId);
      toast.success(`Access revoked for ${adminName} from class ${className}`);
      
      // Update local state
      setAdminAccess(prev => ({
        ...prev,
        [adminId]: (prev[adminId] || []).filter(access => access.id !== classId)
      }));
    } catch (error) {
      toast.error("Failed to revoke access. Please try again.");
      console.error("Error revoking access:", error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [`revoke_${adminId}_${classId}`]: false }));
    }
  };

  // Function to handle revoking all access
  const handleRevokeAllAccess = async (adminId: string, adminName: string) => {
    setLoadingStates(prev => ({ ...prev, [`revoke_all_${adminId}`]: true }));
    
    try {
      await revokeAdminAccessFromAll(adminId);
      toast.success(`All access revoked for ${adminName}`);
      
      // Update local state
      setAdminAccess(prev => ({
        ...prev,
        [adminId]: []
      }));
    } catch (error) {
      toast.error("Failed to revoke all access. Please try again.");
      console.error("Error revoking all access:", error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [`revoke_all_${adminId}`]: false }));
    }
  };

  // ✅ create or update admin
  const onSubmit = async (data: FormData) => {
    try {
      const college = colleges.find((c) => c.id === data.collegeId);
      const payload: AdminPayload = {
        full_name: data.name,
        email: data.email,
        mobile: data.mobile,
        password: data.password,

        college_name: data.collegeId,
      };

      if (editingAdmin) {
        await updateAdmin(editingAdmin.id, payload);
        toast.success("Admin updated successfully");
      } else {
        await createAdmin(payload);
        toast.success("Admin created successfully");
      }

      fetchAdmins();
      form.reset();
      setIsDialogOpen(false);
      setEditingAdmin(null);
    } catch {
      toast.error("Failed to save admin. Please try again.");
    }
  };

  // ✅ delete admin
  const handleDelete = async (adminId: string) => {
    try {
      await deleteAdmin(adminId);
      toast.success("Admin deleted successfully");
      fetchAdmins();
    } catch {
      toast.error("Failed to delete admin.");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Admin Management</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingAdmin(null)}>
              <Plus className="mr-2 h-4 w-4" /> Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAdmin ? "Edit Admin" : "Add Admin"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input {...form.register("name")} />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Email</Label>
                <Input {...form.register("email")} />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label>mobile</Label>
                <Input {...form.register("mobile")} />
                {form.formState.errors.mobile && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.mobile.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" {...form.register("password")} />
                {form.formState.errors.password && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <Label>College</Label>
                <Command>
                  <CommandInput
                    placeholder="Search or enter new college..."
                    value={form.watch("collegeId")}
                    onValueChange={(value) => form.setValue("collegeId", value)}
                  />
                  <CommandList>
                    <CommandEmpty>
                      <Button
                        variant="ghost"
                        type="button"
                        className="w-full justify-start"
                        onClick={() => {
                          const newCollegeName = form.getValues("collegeId");
                          if (
                            newCollegeName &&
                            !colleges.find((c) => c.name === newCollegeName)
                          ) {
                            const newCollege: College = {
                              id: Date.now().toString(), // temp ID
                              name: newCollegeName,
                            };
                            setColleges((prev) => [...prev, newCollege]);
                            toast.success(
                              `Added new college: ${newCollegeName}`
                            );
                          }
                        }}
                      >
                        ➕ Create “{form.watch("collegeId")}”
                      </Button>
                    </CommandEmpty>
                    <CommandGroup heading="Colleges">
                      {colleges.map((college) => (
                        <CommandItem
                          key={college.id}
                          onSelect={() =>
                            form.setValue("collegeId", college.name)
                          }
                        >
                          {college.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>

                {form.formState.errors.collegeId && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.collegeId.message}
                  </p>
                )}
              </div>

              <Button type="submit">
                {editingAdmin ? "Update" : "Create"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>mobile</TableHead>
              <TableHead>College</TableHead>
              <TableHead>Class Access</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.full_name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.mobile}</TableCell>
                <TableCell>{admin.college_name}</TableCell>
                <TableCell>
                  <div className="space-y-2">
                    {/* Display current class access */}
                    {adminAccess[admin.id] && adminAccess[admin.id].length > 0 ? (
                      <div className="space-y-1">
                        {adminAccess[admin.id].map((access) => (
                          <div key={access.id} className="flex justify-between items-center bg-muted p-2 rounded">
                            <span className="text-sm">
                              <span className="font-medium">{access.code}</span> - {access.name}
                            </span>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRevokeAccessFromClass(admin.id, access.id, admin.full_name, access.name)}
                              disabled={loadingStates[`revoke_${admin.id}_${access.id}`]}
                            >
                              {loadingStates[`revoke_${admin.id}_${access.id}`] ? (
                                <span>Revoking...</span>
                              ) : (
                                <X className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">No class access granted</span>
                    )}
                    
                    {/* Grant access controls */}
                    <div className="flex mt-2 space-x-2">
                      <Select
                        value={selectedClassForGrant[admin.id] || ""}
                        onValueChange={(value) => setSelectedClassForGrant(prev => ({
                          ...prev,
                          [admin.id]: value
                        }))}
                      >
                        <SelectTrigger className="w-[140px] h-8 text-xs">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem key={cls.id} value={cls.id}>
                              {cls.code} - {cls.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGrantAccess(admin.id, admin.full_name)}
                        disabled={loadingStates[`grant_${admin.id}_${selectedClassForGrant[admin.id] || 'none'}`]}
                      >
                        {loadingStates[`grant_${admin.id}_${selectedClassForGrant[admin.id] || 'none'}`] ? (
                          <span>Granting...</span>
                        ) : (
                          'Grant'
                        )}
                      </Button>
                    </div>
                    
                    {/* Revoke all access button */}
                    {adminAccess[admin.id] && adminAccess[admin.id].length > 0 && (
                      <div className="mt-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRevokeAllAccess(admin.id, admin.full_name)}
                          disabled={loadingStates[`revoke_all_${admin.id}`]}
                        >
                          {loadingStates[`revoke_all_${admin.id}`] ? (
                            <span>Revoking...</span>
                          ) : (
                            'Revoke All Access'
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="flex space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => {
                          setEditingAdmin(admin);
                          form.setValue("name", admin.full_name);
                          form.setValue("email", admin.email);
                          // form.setValue("mobile", admin.mobile);
                          form.setValue("password", "");
                          form.setValue(
                            "collegeId",
                            colleges
                              .find((c) => c.name === admin.college_name)
                              ?.id.toString() || ""
                          );
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDelete(admin.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

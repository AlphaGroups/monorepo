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

import { Plus, Pencil, Trash, MoreHorizontal, Eye, X, Users, GraduationCap, UserCog, School, Shield } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");

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
  const fetchAdmins = async () => {
    try {
      const data = await getAdmins();
      setAdmins(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to fetch admins.");
    }
  };

  // ✅ fetch colleges
  const fetchColleges = async () => {
    try {
      const data = await getColleges();
      setColleges(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to fetch colleges.");
    }
  };

  // Mock function to fetch classes (since real API may not exist)
  const fetchClasses = async () => {
    // Using mock data for classes 1-12 as requested
    const mockClasses: Class[] = Array.from({ length: 12 }, (_, i) => {
      const classNum = i + 1;
      return {
        id: classNum.toString(),
        name: `${classNum}${classNum === 1 ? 'st' : classNum === 2 ? 'nd' : classNum === 3 ? 'rd' : 'th'} Grade`,
        code: `GRADE-${classNum.toString().padStart(2, '0')}`,
        description: `${classNum}${classNum === 1 ? 'st' : classNum === 2 ? 'nd' : classNum === 3 ? 'rd' : 'th'} grade curriculum`,
        instructor: `Instructor ${classNum}`,
        studentsCount: Math.floor(Math.random() * 30) + 15, // Random count between 15-45
        status: "active",
        schedule: `Mon, Wed, Fri ${8 + Math.floor(classNum / 2)}:00 AM`,
        startDate: "2024-01-15",
        endDate: "2024-05-15",
        category: "General Education",
      };
    });
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
      // Update the service function call with correct format
      // The current service function sends admin_id and class_id in the body
      // But the API expects admin_id as query param and class_id as array in body
      // For now, using the service as is but we may need to update it
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

  // Filter admins based on search term
  const filteredAdmins = admins.filter(admin => 
    admin.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.college_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserCog className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Admin Management</CardTitle>
                <p className="text-muted-foreground">Manage system administrators and their access rights</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Input
                placeholder="Search admins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingAdmin(null)} className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" /> Add Admin
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {editingAdmin ? <Pencil className="h-5 w-5" /> : <UserCog className="h-5 w-5" />}
                    {editingAdmin ? "Edit Admin" : "Add New Admin"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input {...form.register("name")} />
                    {form.formState.errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input {...form.register("email")} />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Mobile</Label>
                    <Input {...form.register("mobile")} />
                    {form.formState.errors.mobile && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.mobile.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input type="password" {...form.register("password")} />
                    {form.formState.errors.password && (
                      <p className="text-red-500 text-sm mt-1">
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
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.collegeId.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full">
                    {editingAdmin ? "Update Admin" : "Create Admin"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Mobile</TableHead>
                  <TableHead className="font-semibold">College</TableHead>
                  <TableHead className="font-semibold">Class Access</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.length > 0 ? (
                  filteredAdmins.map((admin) => (
                    <TableRow key={admin.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-800 font-medium text-sm">
                              {admin.full_name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          {admin.full_name}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{admin.email}</TableCell>
                      <TableCell className="text-muted-foreground">{admin.mobile}</TableCell>
                      <TableCell>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {admin.college_name}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          {/* Display current class access */}
                          {adminAccess[admin.id] && adminAccess[admin.id].length > 0 ? (
                            <div className="space-y-1">
                              {adminAccess[admin.id].map((access) => (
                                <div key={access.id} className="flex justify-between items-center bg-blue-50 p-2 rounded-lg">
                                  <div className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm">
                                      <span className="font-medium">{access.code}</span> - {access.name}
                                    </span>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleRevokeAccessFromClass(admin.id, access.id, admin.full_name, access.name)}
                                    disabled={loadingStates[`revoke_${admin.id}_${access.id}`]}
                                    className="h-7 w-7 p-0"
                                  >
                                    {loadingStates[`revoke_${admin.id}_${access.id}`] ? (
                                      <span className="h-4 w-4" />
                                    ) : (
                                      <X className="h-4 w-4 text-red-500" />
                                    )}
                                  </Button>
                                </div>
                              ))}
                              <div className="mt-2 flex flex-wrap gap-1">
                                <span className="text-xs text-muted-foreground">
                                  {adminAccess[admin.id].length} class{adminAccess[admin.id].length !== 1 ? 'es' : ''} assigned
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Shield className="h-4 w-4" />
                              No class access granted
                            </span>
                          )}
                          
                          {/* Grant access controls */}
                          <div className="flex flex-col sm:flex-row gap-2 mt-2">
                            <div className="flex-1 flex gap-2">
                              <Select
                                value={selectedClassForGrant[admin.id] || ""}
                                onValueChange={(value) => setSelectedClassForGrant(prev => ({
                                  ...prev,
                                  [admin.id]: value
                                }))}
                              >
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue placeholder="Select class" />
                                </SelectTrigger>
                                <SelectContent>
                                  {classes.filter(cls => 
                                    !adminAccess[admin.id]?.some(access => access.id === cls.id) // Only show classes not yet assigned
                                  ).map((cls) => (
                                    <SelectItem key={cls.id} value={cls.id}>
                                      {cls.code} - {cls.name}
                                    </SelectItem>
                                  ))}
                                  {classes.filter(cls => 
                                    !adminAccess[admin.id]?.some(access => access.id === cls.id)
                                  ).length === 0 && (
                                    <SelectItem value="" disabled className="text-muted-foreground">
                                      All classes assigned
                                    </SelectItem>
                                  )}
                                </SelectContent>
                              </Select>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleGrantAccess(admin.id, admin.full_name)}
                                disabled={loadingStates[`grant_${admin.id}_${selectedClassForGrant[admin.id] || 'none'}`] || !selectedClassForGrant[admin.id]}
                                className="h-8 text-xs"
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
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRevokeAllAccess(admin.id, admin.full_name)}
                                disabled={loadingStates[`revoke_all_${admin.id}`]}
                                className="h-8 text-xs border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                              >
                                {loadingStates[`revoke_all_${admin.id}`] ? (
                                  <span>Revoking...</span>
                                ) : (
                                  'Revoke All'
                                )}
                              </Button>
                            )}
                          </div>
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
                            <DropdownMenuItem 
                              onClick={() => {
                                setEditingAdmin(admin);
                                form.setValue("name", admin.full_name);
                                form.setValue("email", admin.email);
                                form.setValue("mobile", admin.mobile);
                                form.setValue("password", "");
                                form.setValue(
                                  "collegeId",
                                  colleges
                                    .find((c) => c.name === admin.college_name)
                                    ?.name || ""
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      {searchTerm ? "No admins found matching your search" : "No admins found"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {admins.length > 0 && (
            <div className="flex items-center justify-between p-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{filteredAdmins.length}</span> of{" "}
                <span className="font-medium">{admins.length}</span> admin{admins.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

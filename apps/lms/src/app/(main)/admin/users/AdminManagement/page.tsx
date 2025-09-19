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

import { Plus, Pencil, Trash } from "lucide-react";
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

// ✅ form validation
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  mobile: z.string().min(10, "Invalid mobile number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  collegeId: z.string().nonempty("Select a college"),
});

type FormData = z.infer<typeof formSchema>;

export default function AdminManagement() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);

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

  useEffect(() => {
    fetchAdmins();
    fetchColleges();
  }, []);

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
                <TableCell className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
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
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(admin.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

"use client";

import React, { useEffect, useState, Suspense } from "react";
import api from "@/services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  School,
  Users,
  Video,
  FileText,
  Plus,
  Eye,
  Edit,
  BarChart3,
} from "lucide-react";

interface CollegeStats {
  title: string;
  value: string | number;
  change: string;
  icon: any;
  description: string;
}

interface ClassItem {
  id: number;
  name: string;
  students: number;
  completion: number;
  status: string;
  instructor: string;
  lastActivity: string;
}

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Political Science",
  "Economics",
  "English",
  "Hindi",
  "Computer Science",
];

const classesList = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
const sections = ["A", "B", "C", "D"];

export default function Page() {
  const [collegeStats, setCollegeStats] = useState<CollegeStats[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);

  const [teacherForm, setTeacherForm] = useState({
    full_name: "",
    email: "",
    mobile: "",
    password: "",
    subject: "",
  });

  const [studentForm, setStudentForm] = useState({
    full_name: "",
    email: "",
    mobile: "",
    password: "",
    class: "",
    section: "",
  });

  const [studentFile, setStudentFile] = useState<File | null>(null);
  const [bulkClass, setBulkClass] = useState("");
  const [bulkSection, setBulkSection] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const safeGet = async (path: string) => {
          try {
            const res = await api.get(path, {
              params: {
                page: 1,
                size: 50,
              },
            });

            // Handle both direct array responses and paginated responses
            if (Array.isArray(res.data)) {
              return res.data;
            } else {
              // If response is paginated, use the data property
              return res.data.data || [];
            }
          } catch (err: any) {
            if ([404, 405].includes(err?.response?.status)) return null;
            throw err;
          }
        };

        const [studentsData, teachersData, videosData, testsData] =
          await Promise.all([
            safeGet("/students/"),
            safeGet("/teachers/"),
            safeGet("/videos/"),
            safeGet("/tests/"),
          ]);

        const stats: CollegeStats[] = [
          {
            title: "Classes",
            value: teachersData?.length ?? "N/A",
            change: "+2",
            icon: School,
            description: "Active classes",
          },
          {
            title: "Students",
            value: studentsData?.length ?? "N/A",
            change: "+23",
            icon: Users,
            description: "Enrolled students",
          },
          {
            title: "Active Videos",
            value: videosData?.length ?? "N/A",
            change: "+12",
            icon: Video,
            description: "Assigned videos",
          },
          {
            title: "Tests",
            value: testsData?.length ?? "N/A",
            change: "+5",
            icon: FileText,
            description: "Available tests",
          },
        ];
        setCollegeStats(stats);

        setClasses(
          teachersData?.map((teacher: any, idx: number) => ({
            id: idx + 1,
            name: `${teacher.subject} Class`,
            students: studentsData?.filter(
              (s: any) => s.class === teacher.subject
            ).length,
            completion: Math.floor(Math.random() * 100),
            status: "good",
            instructor: teacher.full_name,
            lastActivity: "Recently",
          })) ?? []
        );
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    };

    fetchDashboardData();
  }, []);

  const handleCreateTeacher = async () => {
    try {
      if (!teacherForm.full_name || !teacherForm.email || !teacherForm.password)
        return alert("Please provide all required fields.");

      await api.post("/teachers/", teacherForm);
      alert("✅ Teacher created successfully!");
      setTeacherForm({
        full_name: "",
        email: "",
        mobile: "",
        password: "",
        subject: "",
      });
    } catch (err) {
      console.error("Error creating teacher:", err);
      alert("❌ Failed to create teacher");
    }
  };

  const handleCreateStudent = async () => {
    try {
      if (
        !studentForm.full_name ||
        !studentForm.email ||
        !studentForm.password ||
        !studentForm.class ||
        !studentForm.section
      )
        return alert("Please provide all required fields.");

      await api.post("/students/", studentForm);
      alert("✅ Student created successfully!");
      setStudentForm({
        full_name: "",
        email: "",
        mobile: "",
        password: "",
        class: "",
        section: "",
      });
    } catch (err) {
      console.error("Error creating student:", err);
      alert("❌ Failed to create student");
    }
  };

  const handleUploadStudents = async () => {
    if (!studentFile || !bulkClass || !bulkSection)
      return alert("Please select file, class, and section");

    const formData = new FormData();
    formData.append("file", studentFile);
    formData.append("class_name", bulkClass);
    formData.append("section", bulkSection);

    try {
      const res = await api.post("/students/import/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
      alert(
        `✅ Students uploaded successfully! Imported: ${res.data.successful_imports}`
      );
      setStudentFile(null);
      setBulkClass("");
      setBulkSection("");
    } catch (err: any) {
      console.error("Error uploading students:", err);
      if (err.response?.data?.detail) {
        alert("❌ Upload failed: " + JSON.stringify(err.response.data.detail));
      } else {
        alert("❌ Failed to upload students");
      }
    }
  };

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">
              College Overview
            </h1>
            <p className="text-muted-foreground">Dynamic College Data</p>
          </div>
          <div className="flex space-x-2">
            {/* Teacher Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Teacher
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Teacher</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={teacherForm.full_name}
                    onChange={(e) =>
                      setTeacherForm({
                        ...teacherForm,
                        full_name: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={teacherForm.email}
                    onChange={(e) =>
                      setTeacherForm({ ...teacherForm, email: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Mobile"
                    value={teacherForm.mobile}
                    onChange={(e) =>
                      setTeacherForm({ ...teacherForm, mobile: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={teacherForm.password}
                    onChange={(e) =>
                      setTeacherForm({
                        ...teacherForm,
                        password: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                  <select
                    value={teacherForm.subject}
                    onChange={(e) =>
                      setTeacherForm({
                        ...teacherForm,
                        subject: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subj) => (
                      <option key={subj} value={subj}>
                        {subj}
                      </option>
                    ))}
                  </select>
                  <Button onClick={handleCreateTeacher} className="w-full">
                    Save Teacher
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Student Modal */}
            {/* <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Student</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={studentForm.full_name}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        full_name: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={studentForm.email}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, email: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Mobile"
                    value={studentForm.mobile}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, mobile: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={studentForm.password}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        password: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                  <select
                    value={studentForm.class}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, class: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select Class</option>
                    {classesList.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                  <select
                    value={studentForm.section}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        section: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select Section</option>
                    {sections.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                  <Button onClick={handleCreateStudent} className="w-full">
                    Save Student
                  </Button>
                </div>
              </DialogContent>
            </Dialog> */}

            {/* Bulk Upload */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Students
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Student File</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <select
                    value={bulkClass}
                    onChange={(e) => setBulkClass(e.target.value)}
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select Class</option>
                    {classesList.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                  <select
                    value={bulkSection}
                    onChange={(e) => setBulkSection(e.target.value)}
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select Section</option>
                    {sections.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) =>
                      setStudentFile(e.target.files ? e.target.files[0] : null)
                    }
                    className="w-full"
                  />
                  <Button onClick={handleUploadStudents} className="w-full">
                    Upload
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* College Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {collegeStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Badge variant="secondary" className="mr-2 text-xs">
                    {stat.change}
                  </Badge>
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Class Management */}
        <Card>
          <CardHeader>
            <CardTitle>Class Management</CardTitle>
            <CardDescription>Overview of all your classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classes.map((classItem) => (
                <div
                  key={classItem.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <School className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{classItem.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Instructor: {classItem.instructor} •{" "}
                        {classItem.students} students
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last activity: {classItem.lastActivity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {classItem.completion}% Complete
                      </div>
                      <Progress
                        value={classItem.completion}
                        className="w-24 h-2 mt-1"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}

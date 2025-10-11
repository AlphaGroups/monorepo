// import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9080";

// // ✅ Bulk Import Students
// export const importStudents = async (file: File) => {
//   const formData = new FormData();
//   formData.append("file", file);

//   const response = await axios.post(`${API_URL}/students/import`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };

// // ✅ Fetch Students
// export const fetchStudents = async () => {
//   const response = await axios.get(`${API_URL}/students/`);
//   return response.data;
// };
import api from "@/services/api";
import { PaginatedResponse, Student } from "../interfaces";

// ✅ Bulk Import Students
export const importStudents = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/students/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ✅ Fetch All Students with pagination
export const fetchStudents = async (page: number = 1, size: number = 10) => {
  const response = await api.get("/students/", {
    params: {
      page,
      size
    }
  });
  
  // Handle both direct array responses and paginated responses
  if (Array.isArray(response.data)) {
    return {
      data: response.data,
      total: response.data.length,
      page: page,
      size: size,
      totalPages: Math.ceil(response.data.length / size)
    };
  } else {
    // If the response is already paginated, return it directly
    return response.data;
  }
};

// ✅ Fetch Single Student
export const fetchStudentById = async (id: number | string) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

// ✅ Create Student
export const createStudent = async (studentData: any) => {
  const response = await api.post("/students/", studentData);
  return response.data;
};

// ✅ Update Student
export const updateStudent = async (id: number | string, studentData: any) => {
  const response = await api.put(`/students/${id}`, studentData);
  return response.data;
};

// ✅ Delete Student
export const deleteStudent = async (id: number | string) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};

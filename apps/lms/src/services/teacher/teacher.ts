import axios from "axios";
import { PaginatedResponse } from "../interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9080";

// ✅ Create Teacher
export const createTeacher = async (teacherData: {
  full_name: string;
  email: string;
  mobile: string;
  password: string;
  college_id: number;
  subject: string;
}) => {
  // Get token inside the function (client-side)
  const token = localStorage.getItem("accessToken");
  const response = await axios.post(`${API_URL}/teachers/`, teacherData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ✅ Fetch Teachers (list) with pagination
export const fetchTeachers = async (page: number = 1, size: number = 10) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(`${API_URL}/teachers/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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



// ✅ Update Teacher
export const updateTeacher = async (
  id: string | number,
  updateData: Partial<{
    full_name: string;
    email: string;
    mobile: string;
    password: string;
    college_id: number;
    subject: string;
  }>
) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.put(`${API_URL}/teachers/${id}`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ✅ Delete Teacher
export const deleteTeacher = async (id: string | number) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.delete(`${API_URL}/teachers/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
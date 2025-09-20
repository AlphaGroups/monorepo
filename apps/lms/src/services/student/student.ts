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
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9080";

// ✅ Bulk Import Students
export const importStudents = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_URL}/students/import`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ✅ Fetch All Students
export const fetchStudents = async () => {
  const response = await axios.get(`${API_URL}/students/`);
  return response.data;
};

// ✅ Fetch Single Student
export const fetchStudentById = async (id: number | string) => {
  const response = await axios.get(`${API_URL}/students/${id}`);
  return response.data;
};

// ✅ Create Student
export const createStudent = async (studentData: any) => {
  const response = await axios.post(`${API_URL}/students/`, studentData);
  return response.data;
};

// ✅ Update Student
export const updateStudent = async (id: number | string, studentData: any) => {
  const response = await axios.put(`${API_URL}/students/${id}`, studentData);
  return response.data;
};

// ✅ Delete Student
export const deleteStudent = async (id: number | string) => {
  const response = await axios.delete(`${API_URL}/students/${id}`);
  return response.data;
};

// apps/lms/src/services/user.service.ts
import api from "./api";

export const UserService = {
  getAll: async () => {
    const res = await api.get("/users");
    return res.data;
  },

  getById: async (id: number) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },

  update: async (id: number, data: any) => {
    const res = await api.put(`/users/${id}`, data);
    return res.data;
  },
};

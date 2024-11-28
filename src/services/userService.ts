import axios from 'axios';
import { User } from '@/types/user';
import { UserFormData } from '@/components/admin/UserForm';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type CreateUserData = UserFormData & {
  userJoinDate: string;
  totalTickets: number;
  totalSpent: number;
  status: string;
  message: string;
};

export const userService = {
  async getAll(): Promise<User[]> {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  },

  async getById(id: number): Promise<User> {
    const response = await axios.get(`${API_URL}/user/${id}`);
    return response.data;
  },

  create: async (userData: CreateUserData): Promise<User> => {
    const response = await axios.post<User>(`${API_URL}/User`, userData);
    return response.data;
  },

  update: async (id: number, userData: Partial<UserFormData>): Promise<User> => {
    const response = await axios.put<User>(`${API_URL}/User/${id}`, userData);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_URL}/user/${id}`);
  }
};
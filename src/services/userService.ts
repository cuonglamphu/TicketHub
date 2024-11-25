import axios from 'axios';
import { User } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userService = {
  async getAll(): Promise<User[]> {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  },

  async getById(id: number): Promise<User> {
    const response = await axios.get(`${API_URL}/user/${id}`);
    return response.data;
  },

  async create(user: Omit<User, 'userId'>): Promise<User> {
    const response = await axios.post(`${API_URL}/user`, user);
    return response.data;
  },

  async update(id: number, user: Partial<User>): Promise<User> {
    const response = await axios.put(`${API_URL}/user/${id}`, user);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_URL}/user/${id}`);
  }
};
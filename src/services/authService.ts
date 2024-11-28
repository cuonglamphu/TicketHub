import axios from 'axios';
import { LoginDto, RegisterDto, User } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  async register(data: RegisterDto): Promise<User> {
    const response = await axios.post(`${API_URL}/User/register`, data);
    return response.data;
  },

  async login(data: LoginDto): Promise<User> {
    const response = await axios.post(`${API_URL}/User/login`, data);
    const user = response.data;
    
    // Store user data in localStorage
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return user;
  },

  logout(): void {
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
};
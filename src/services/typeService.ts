import axios from 'axios';
import { Type } from '@/types/ticket';

interface ApiError {
  response?: {
    data: {
      message: string;
    };
    status: number;
  };
  message: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const typeService = {
  async create(type: Omit<Type, 'typeId'>) {
    try {
      // Format data according to API spec
      const requestData = {
        typeName: type.typeName,
        typeDesc: type.typeDesc,
        eventId: type.eventId
      };

      console.log('Sending request to API:', requestData);
      
      const response = await axios.post(`${API_URL}/type`, requestData);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('API Error Details:', {
        message: apiError.message,
        response: apiError.response?.data,
        status: apiError.response?.status
      });
      throw error;
    }
  },

  async getByEventId(eventId: number) {
    try {
      const response = await axios.get(`${API_URL}/type/event/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  async getById(typeId: number) {
    try {
      const response = await axios.get(`${API_URL}/type/${typeId}`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  
};
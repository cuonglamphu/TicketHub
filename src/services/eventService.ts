import axios from 'axios';
import { Event, CreateEventDto, RecommendedEvent } from '@/types/event';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface SearchParams {
  keyword?: string;
  catId?: number;
  city?: string;
  startDate?: string;
  endDate?: string;
}

export const eventService = {
  getAll: async () => {
    const response = await axios.get<Event[]>(`${API_URL}/event`);
    console.log(response.data)
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axios.get<Event>(`${API_URL}/event/${id}`);
    return response.data;
  },

  getByCategory: async (catId: number) => {
    const response = await axios.get<Event[]>(`${API_URL}/event/category/${catId}`);
    return response.data;
  },

  create: async (data: CreateEventDto) => {
    const response = await axios.post<Event>(`${API_URL}/event`, data);
    return response.data;
  },

  update: async (id: number, data: CreateEventDto) => {
    const response = await axios.put<Event>(`${API_URL}/event/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await axios.delete(`${API_URL}/event/${id}`);
  },

  getHotEvents: async () => {
    const response = await axios.get<RecommendedEvent[]>(`${API_URL}/event/hot`);
    console.log('Hot events response:', response.data)
    return response.data;
  },

  getRecommendedEvents: async (userId: number) => {
    const response = await axios.get<RecommendedEvent[]>(`${API_URL}/event/recommended/${userId}`);
    console.log(response.data)
    return response.data;
  },

  getRecommendedEventsDefault: async () => {
    const response = await axios.get<RecommendedEvent[]>(`${API_URL}/event/recommended`);
    console.log(response.data)
    return response.data;
  },

  async searchEvents(searchParams: SearchParams) {
    try {
      const params: Record<string, string> = {};
      
      if (searchParams.keyword) params.keyword = searchParams.keyword;
      if (searchParams.catId) params.catId = searchParams.catId.toString();
      if (searchParams.city) params.city = searchParams.city;
      if (searchParams.startDate) params.startDate = searchParams.startDate;
      if (searchParams.endDate) params.endDate = searchParams.endDate;

      const queryParams = new URLSearchParams(params);
      const response = await fetch(`${API_URL}/event/search?${queryParams}`);
      
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Invalid search parameters. Please check your input.');
        }
        throw new Error(`Server error: ${response.status}`);
      }
      
      const text = await response.text();
      if (!text) {
        return [];
      }
      
      try {
        const data = JSON.parse(text);
        return data;
      } catch (e) {
        console.error('JSON Parse Error:', e);
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Search Events Error:', error);
      throw error;
    }
  },
}
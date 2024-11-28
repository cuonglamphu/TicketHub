import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CategoryResponse {
  catId: number;
  catName: string;
  catSlug: string;
  catDesc: string;
  catThumb: string;
}

export interface CreateCategoryDto {
  catName: string;
  catDesc: string;
  catSlug: string;
  catThumb: string;
}

export interface UpdateCategoryDto {
  catName: string;
  catDesc: string;
  catSlug: string;
  catThumb: string;
}

export const categoryService = {
  getAll: async () => {
    const response = await axios.get<CategoryResponse[]>(`${API_URL}/Category`);
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axios.get<CategoryResponse>(`${API_URL}/Category/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await axios.get<CategoryResponse>(`${API_URL}/Category/slug/${slug}`);
    return response.data;
  },

  create: async (data: CreateCategoryDto) => {
    const response = await axios.post<CategoryResponse>(`${API_URL}/Category`, data);
    return response.data;
  },

  update: async (id: number, data: UpdateCategoryDto) => {
    const response = await axios.put(`${API_URL}/Category/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await axios.delete(`${API_URL}/Category/${id}`);
  }
};

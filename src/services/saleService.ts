import { Sale } from '@/types/sale';

export const saleService = {
  async getAll(): Promise<Sale[]> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Sale`);
      if (!response.ok) throw new Error('Failed to fetch sales');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch sales data', error);
      throw new Error('Failed to fetch sales data');
    }
  },

  async getById(id: number): Promise<Sale> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Sale/${id}`);
      if (!response.ok) throw new Error('Failed to fetch sale');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch sale data', error);
      throw new Error('Failed to fetch sale data');
    }
  }
};
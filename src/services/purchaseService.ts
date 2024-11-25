import axios from 'axios';
import { Sale, PurchaseTicketDto, PurchaseDisplay } from '@/types/purchase';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const purchaseService = {
  getUserPurchases: async (userId: number): Promise<Sale[]> => {
    try {
      const response = await axios.get<Sale[]>(`${API_URL}/Purchase/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user purchases:', error);
      throw error;
    }
  },

  createPurchase: async (purchaseData: PurchaseTicketDto) => {
    try {
      const response = await axios.post(`${API_URL}/Purchase`, purchaseData);
      return response.data;
    } catch (error) {
      console.error('Error creating purchase:', error);
      throw error;
    }
  },

  // Helper function to format purchase data for display
  formatPurchaseForDisplay: (sale: any): PurchaseDisplay[] => {
    return sale.purchases.map((purchase: any, index: number) => {
      const eventDateTime = new Date(purchase.eventTimeStart);
      const saleDateTime = new Date(sale.saleDate);
      
      return {
        id: `${sale.saleId}-${index}`,
        eventName: purchase.eventName,
        eventDate: eventDateTime.toLocaleDateString('vi-VN'),
        eventTime: eventDateTime.toLocaleTimeString('vi-VN'),
        eventLocation: purchase.eventCity,
        eventThumb: purchase.eventThumb || '/default-event-image.jpg',
        quantity: purchase.quantity,
        ticketType: purchase.ticketType,
        price: purchase.price,
        total: purchase.total,
        saleDate: saleDateTime.toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        saleId: sale.saleId
      };
    });
  }
};
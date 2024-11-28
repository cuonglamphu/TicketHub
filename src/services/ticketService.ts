import axios from 'axios';
import { Ticket, CreateTicketDto } from '@/types/ticket';


const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface PurchaseRequest {
    userId: number;
    data: {
        ticketId: number;
        quantity: number;
        ipAddress: string;
        deviceInfo: string;
        browserInfo: string;
    };
}

interface PurchaseResponse {
    saleId: number;
    saleTotal: number;
    saleDate: string;
    purchases: Array<{
        ticketId: number;
        eventName: string;
        eventCity: string;
        eventTimeStart: string;
        ticketType: string;
        quantity: number;
        price: number;
        total: number;
    }>;
}

export const ticketService = {
  getAll: async () => {
    const response = await axios.get<Ticket[]>(`${API_URL}/Ticket`);
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axios.get<Ticket>(`${API_URL}/Ticket/${id}`);
    return response.data;
  },

  getByEventId: async (eventId: number) => {
    const response = await axios.get<Ticket[]>(`${API_URL}/Ticket/event/${eventId}`);
    return response.data;
  },

  create: async (data: CreateTicketDto) => {
    const response = await axios.post<Ticket>(`${API_URL}/Ticket`, data);
    return response.data;
  },

  update: async (id: number, data: Partial<CreateTicketDto>) => {
    const response = await axios.put<Ticket>(`${API_URL}/Ticket/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await axios.delete(`${API_URL}/Ticket/${id}`);
  },

  purchaseTicket: async ({ userId, data }: PurchaseRequest): Promise<PurchaseResponse> => {
    const response = await axios.post(
        `${API_URL}/Ticket/purchase?userId=${userId}`,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );
    return response.data;
  },
};

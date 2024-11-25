export interface HotEvent {
  id: number
  name: string
  image: string
  date: string
  description: string
  time: string
  location: string
  price: number
  ticketTypes: Array<{
    ticketId: number;
    name: string;
    price: number;
    quantity: number;
  }>;
}

export interface RecommendedEvent {
  eveId: number;
  eveName: string;
  eveDesc: string;
  eveTimestart: string;
  eveCity: string;
  eveThumb?: string;
  tickets?: any[];
  category?: {
    catId: number;
    catName: string;
    catDesc: string;
    catThumb: string;
  };
  ticketTypes?: Array<{
    ticketId: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  location?: string;
  image?: string;
  price?: number;
  description?: string;
}

export interface AdminEvent {
  id?: number;
  eventName: string;
  totalExpenses: number;
  venueId: number;
  catId: number;
  date: string;
  startTime: string;
} 

export interface Event {
  eveId: number;
  eveName: string;
  eveDesc: string;
  eveThumb: string;
  eveCity: string;
  eveTimestart: string;
  eveTimeend: string;
  catId: number;
  category?: {
    catId: number;
    catName: string;
    catDesc: string;
    catThumb: string;
  };
}

export interface CreateEventDto {
  eveName: string;
  eveDesc: string;
  eveThumb: string;
  eveCity: string;
  eveTimestart: string;
  eveTimeend: string;
  catId: number;
}

export interface UpdateEventDto extends CreateEventDto {}
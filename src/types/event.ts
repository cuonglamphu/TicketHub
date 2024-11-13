export interface HotEvent {
  id: number
  name: string
  image: string
  date: string
  description: string
  time: string
  location: string
  price: number
}

export interface RecommendedEvent extends HotEvent {
  time: string
  location: string
  price: number
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
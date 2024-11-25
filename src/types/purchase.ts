export interface Purchase {
    ticketId: number;
    eventName: string;
    eventCity: string;
    eventTimeStart: string;
    ticketType: string;
    quantity: number;
    price: number;
    total: number;
    qrCode?: string;
    eventThumb?: string;
  }

  export interface Sale {
    saleId: number;
    saleTotal: number;
    saleDate: string;
    purchases: Purchase[];
  }

  export interface PurchaseTicketDto {
    ticketId: number;
    quantity: number;
    userId: number;
  }

  export interface PurchaseDisplay {
    id: string;
    eventName: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    eventThumb: string;
    quantity: number;
    ticketType: string;
    price: number;
    total: number;
    saleDate: string;
    saleId: number;
  }
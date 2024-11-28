export interface Purchase {
    eventId: number;
    eventName: string;
    eventCity: string;
    eventTimeStart: string;
    ticketId: number;
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
    ipAddress: string;
    deviceInfo: string;
    browserInfo: string;
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
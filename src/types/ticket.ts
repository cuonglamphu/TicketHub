import { Category } from './category';
import { Event as CustomEvent } from './event';

export interface TicketDisplay {
    name: string;
    price: number;
    quantity: number;
    ticketId: number;
}

export interface Type {
    typeId?: number;
    typeName: string;
    typeDesc: string;
    eventId: number;
}

export interface Ticket {
    TicketId: number;
    TicketPrice: number;
    TicketQty: number;
    EveId: number;
    TypeId: number;
    event?: {
        eveId: number;
        eveName: string;
        eveThumb: string;
        eveTimestart: string;
        eveCity: string;
    };
    type?: {
        typeId: number;
        typeName: string;
    };
    ticket_id?: number;
    ticket_price?: number;
    ticket_qty?: number;
    eve_id?: number;
    type_id?: number;
}

export interface CreateTicketDto {
    TicketQty: number;
    TicketPrice: number;
    EveId: number;
    TypeId: number;
}

export interface UpdateTicketDto {
    TicketQty?: number;
    TicketPrice?: number;
    EveId?: number;
    TypeId?: number;
}

export interface TicketFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateTicketDto) => Promise<void>;
    ticket: Ticket | null;
    categories: Category[];
    events: CustomEvent[];
}

export interface TicketPurchase {
    purchaseId: number;
    userId: number;
    ticketId: number;
    quantity: number;
    purchaseDate: string;
    totalPrice: number;
    qrCode: string;
    ticket: {
        ticketId: number;
        ticketPrice: number;
        event: {
            eveId: number;
            eveName: string;
            eveThumb: string;
            eveTimestart: string;
            eveCity: string;
        };
        type: {
            typeId: number;
            typeName: string;
        };
    };
} 
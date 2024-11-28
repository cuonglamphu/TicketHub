import { Category } from './category';
import { Event as CustomEvent } from './event';

export interface TicketDisplay {
    ticketId: number;
    name: string;
    price: number;
    quantity: number;
}

export interface Type {
    typeId: number;
    typeName: string;
    typeDesc: string;
    eventId: number;
}

export interface Ticket {
    ticketId: number;
    ticketPrice: number;
    ticketQty: number;
    eveId: number;
    typeId: number;
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

export type TicketDisplayArray = Array<TicketDisplay>;

export function convertToTicketDisplay(ticket: Ticket): TicketDisplay {
    return {
        name: ticket.type?.typeName || 'Standard Ticket',
        price: ticket.ticketPrice || ticket.ticket_price || 0,
        quantity: ticket.ticketQty || ticket.ticket_qty || 0,
        ticketId: ticket.ticketId || ticket.ticket_id || 0
    };
} 
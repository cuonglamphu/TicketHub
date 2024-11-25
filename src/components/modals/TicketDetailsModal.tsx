import { Modal } from './Modal';
import { PurchaseDisplay } from '@/types/purchase';
import { QRCodeSVG } from 'qrcode.react';
import { Calendar, MapPin, Clock, Ticket, Download } from 'lucide-react';
import { Button } from '../ui/button';
import * as htmlToImage from 'html-to-image';

interface TicketDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: PurchaseDisplay;
}

const pixelFont = { fontFamily: "'VT323', monospace" };

export function TicketDetailsModal({ isOpen, onClose, ticket }: TicketDetailsModalProps) {
  if (!ticket) return null;

  const qrData = JSON.stringify({
    ticketId: ticket.id,
    eventName: ticket.eventName,
    eventDate: ticket.eventDate,
    eventTime: ticket.eventTime,
    ticketType: ticket.ticketType,
    quantity: ticket.quantity,
    saleId: ticket.saleId
  });

  const downloadTicket = async () => {
    const ticketElement = document.getElementById('ticket-content');
    if (ticketElement) {
      try {
        const dataUrl = await htmlToImage.toPng(ticketElement, {
          quality: 1.0,
          backgroundColor: '#4CAF50',
        });
        
        const link = document.createElement('a');
        link.download = `ticket-${ticket.eventName}-${ticket.saleId}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error downloading ticket:', error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ticket Details">
      <div id="ticket-content" className="p-4 space-y-4 bg-gradient-to-b from-[#4CAF50] to-[#388E3C] rounded-xl shadow-xl border-2 border-dashed border-yellow-500 max-w-md mx-auto">
        {/* QR Code Section */}
        <div className="flex justify-center mb-4">
          <div className="p-2 bg-white rounded-lg shadow-md">
            <QRCodeSVG 
              value={qrData}
              size={120}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>

        {/* Ticket Information */}
        <div className="space-y-2 text-center">
          <h2 className="text-lg font-bold text-[#FFEB3B]" style={pixelFont}>
            {ticket.eventName}
          </h2>

          <div className="space-y-1 text-white text-sm">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4 text-[#FFEB3B]" />
              <span style={pixelFont}>{ticket.eventDate}</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-[#FFEB3B]" />
              <span style={pixelFont}>{ticket.eventTime}</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-[#FFEB3B]" />
              <span style={pixelFont}>{ticket.eventLocation}</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Ticket className="w-4 h-4 text-[#FFEB3B]" />
              <span style={pixelFont}>
                {ticket.ticketType} - {ticket.quantity} tickets
              </span>
            </div>
          </div>

          {/* Purchase Details */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="space-y-1 text-white/90 text-sm" style={pixelFont}>
              <div className="flex justify-between">
                <span>Purchase Date:</span>
                <span>{ticket.saleDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Order ID:</span>
                <span>#{ticket.saleId}</span>
              </div>
              <div className="flex justify-between">
                <span>Price per ticket:</span>
                <span>{ticket.price.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between font-bold text-white">
                <span>Total:</span>
                <span>{ticket.total.toLocaleString()}đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Download Button Section */}
      <div className="p-4">
        <Button
          onClick={downloadTicket}
          className={`
            w-full rounded-lg shadow-md
            bg-[#FFEB3B] text-black hover:bg-[#FDD835]
            flex items-center justify-center gap-2 px-4 py-2
            transform hover:-translate-y-1 transition-all
          `}
          style={pixelFont}
        >
          <Download className="w-4 h-4" />
          Download Ticket
        </Button>
      </div>
    </Modal>
  );
} 
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import Image from 'next/image'
import html2canvas from 'html2canvas'
import { useRef } from 'react'

interface TicketDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: {
    id: string;
    eventId: string;
    eventName: string;
    eventImage: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    quantity: number;
    price: number;
    purchaseDate: string;
    qrCode: string;
  };
}

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]"
const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" }

export function TicketDetailsModal({ isOpen, onClose, ticket }: TicketDetailsModalProps) {
  const ticketRef = useRef<HTMLDivElement>(null)

  if (!isOpen) return null

  const handleDownload = async () => {
    if (ticketRef.current) {
      try {
        const canvas = await html2canvas(ticketRef.current)
        const dataUrl = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.download = `ticket-${ticket.id}.png`
        link.href = dataUrl
        link.click()
      } catch (error) {
        console.error('Error downloading ticket:', error)
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`bg-[#4CAF50] p-8 ${pixelBorder} max-w-md w-full`}>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-[#FFEB3B]" style={pixelFont}>Ticket Details</h2>
          <Button variant="ghost" onClick={onClose} className="text-[#FFEB3B] hover:text-white">
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div ref={ticketRef} className="space-y-4 p-4 bg-[#4CAF50] rounded-lg">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-[#FFEB3B]" style={pixelFont}>{ticket.eventName}</h3>
            <p className="text-white" style={pixelFont}>{ticket.eventDate} at {ticket.eventTime}</p>
            <p className="text-white" style={pixelFont}>{ticket.eventLocation}</p>
          </div>

          <Image 
            src={ticket.qrCode}
            alt="Ticket QR Code"
            width={200}
            height={200}
            className="mx-auto"
          />
          
          <div className="text-white space-y-2">
            <p style={pixelFont}>Ticket ID: {ticket.id}</p>
            <p style={pixelFont}>Purchase Date: {ticket.purchaseDate}</p>
            <p style={pixelFont}>Quantity: {ticket.quantity}</p>
            <p style={pixelFont}>Total Price: ${ticket.price * ticket.quantity}</p>
          </div>
        </div>

        <Button 
          onClick={handleDownload}
          className={`w-full ${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] text-xl mt-4`}
          style={pixelFont}
        >
          Download Ticket
        </Button>
      </div>
    </div>
  )
} 
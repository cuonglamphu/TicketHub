'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Calendar, MapPin, Ticket } from 'lucide-react'
import { getStoredUser } from '@/utils/auth'
import { useRouter } from 'next/navigation'
import { TicketDetailsModal } from '@/components/modals/TicketDetailsModal'

interface TicketType {
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
}

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]"
const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" }

// Move mockTickets outside the component
const mockTickets: TicketType[] = [
  {
    id: '1',
    eventId: '1',
    eventName: 'Pixel Music Festival',
    eventImage: 'https://salt.tkbcdn.com/ts/ds/de/fd/9b/8f4fd89066ec3447a0ddd21995e44bf2.png',
    eventDate: '2024-04-15',
    eventTime: '19:00',
    eventLocation: 'Digital Arena',
    quantity: 2,
    price: 50,
    purchaseDate: '2024-03-01',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example'
  },
  {
    id: '2',
    eventId: '1',
    eventName: 'Pixel Music Festival',
    eventImage: 'https://salt.tkbcdn.com/ts/ds/3d/42/7f/2a0ab3db23dffe7893188d2199b63b19.jpg',
    eventDate: '2024-04-15',
    eventTime: '19:00',
    eventLocation: 'Digital Arena',
    quantity: 2,
    price: 50,
    purchaseDate: '2024-03-01',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example'
  },
  {
    id: '3',
    eventId: '1',
    eventName: 'Pixel Music Festival',
    eventImage: 'https://salt.tkbcdn.com/ts/ds/4f/3f/f0/cbd75651ae0c3c8d4c5a0c6a76c2f6d1.jpg',
    eventDate: '2024-04-15',
    eventTime: '19:00',
    eventLocation: 'Digital Arena',
    quantity: 2,
    price: 50,
    purchaseDate: '2024-03-01',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example'
  },
  // Add more mock tickets as needed
];

export default function TicketsPage() {
  const [tickets, setTickets] = useState<TicketType[]>([])
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null)
  const [isTicketDetailsModalOpen, setIsTicketDetailsModalOpen] = useState(false)
  const router = useRouter()
  const [, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const user = getStoredUser();
    if (!user) {
      router.push('/');
      return;
    }
    setTickets(mockTickets);
  }, [router]);

  const openTicketDetailsModal = (ticket: TicketType) => {
    setSelectedTicket(ticket)
    setIsTicketDetailsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 bg-[#4CAF50]/20 rounded-full blur-3xl -top-32 -left-32" />
        <div className="absolute w-64 h-64 bg-[#FFEB3B]/20 rounded-full blur-3xl -bottom-32 -right-32" />
      </div>

      {/* Pixel art decorations */}
      <div className="absolute top-10 right-10 w-16 h-16 animate-bounce">
        <div className="w-full h-full bg-[#FFEB3B] rotate-45 transform" style={{boxShadow: '4px 4px 0 0 #000000'}} />
      </div>
      <div className="absolute bottom-10 left-10 w-16 h-16 animate-pulse">
        <div className="w-full h-full bg-[#4CAF50] rotate-12 transform" style={{boxShadow: '4px 4px 0 0 #000000'}} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header section with decorative elements */}
        <div className="flex items-center justify-between mb-12">
          <div className="relative">
            <h1 className="text-5xl font-bold text-[#FFEB3B] mb-2" style={pixelFont}>
              My Tickets
            </h1>
            <div className="h-2 bg-[#FFEB3B] w-32" style={{boxShadow: '2px 2px 0 0 #000000'}} />
          </div>
          <div className="hidden md:block">
            <div className="text-[#FFEB3B] text-xl" style={pixelFont}>
              Total Tickets: {tickets.length}
            </div>
          </div>
        </div>

        {/* Tickets grid with enhanced styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tickets.map((ticket) => (
            <Card 
              key={ticket.id} 
              className={`
                bg-gradient-to-br from-[#4CAF50] to-[#388E3C] 
                ${pixelBorder} 
                transform hover:-translate-y-2 transition-all duration-300
                hover:shadow-[8px_8px_0_0_#000000]
              `}
            >
              <div className="relative">
                <Image 
                  src={ticket.eventImage} 
                  alt={ticket.eventName} 
                  width={500}
                  height={500}
                  className="w-full h-48 object-cover" 
                  quality={100}
                />
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#388E3C] to-transparent" />
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-[#FFEB3B]" style={pixelFont}>
                  {ticket.eventName}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center text-white text-lg" style={pixelFont}>
                    <Calendar className="mr-3 h-5 w-5 text-[#FFEB3B]" />
                    {ticket.eventDate} at {ticket.eventTime}
                  </div>
                  <div className="flex items-center text-white text-lg" style={pixelFont}>
                    <MapPin className="mr-3 h-5 w-5 text-[#FFEB3B]" />
                    {ticket.eventLocation}
                  </div>
                  <div className="flex items-center text-white text-lg" style={pixelFont}>
                    <Ticket className="mr-3 h-5 w-5 text-[#FFEB3B]" />
                    Quantity: {ticket.quantity}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button 
                  onClick={() => openTicketDetailsModal(ticket)}
                  className={`
                    w-full ${pixelBorder} bg-[#FFEB3B] text-black 
                    hover:bg-[#FDD835] text-xl transition-all
                    hover:shadow-[6px_6px_0_0_#000000]
                  `}
                  style={pixelFont}
                >
                  View Ticket Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <TicketDetailsModal
        ticket={selectedTicket!}
        isOpen={isTicketDetailsModalOpen}
        onClose={() => setIsTicketDetailsModalOpen(false)}
      />
    </div>
  )
}

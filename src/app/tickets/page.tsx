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

export default function TicketsPage() {
  const [tickets, setTickets] = useState<TicketType[]>([])
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null)
  const [isTicketDetailsModalOpen, setIsTicketDetailsModalOpen] = useState(false)
  const router = useRouter()
  const user = getStoredUser()

  useEffect(() => {
    if (!user) {
      router.push('/')
      return
    }
    
    // Mock data - replace with actual API call
    setTickets([
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
        // qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TICKET-001'
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
    ])
  }, [user, router])

  const openTicketDetailsModal = (ticket: TicketType) => {
    setSelectedTicket(ticket)
    setIsTicketDetailsModalOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-[#FFEB3B]" style={pixelFont}>
        My Tickets
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className={`bg-[#4CAF50] ${pixelBorder}`}>
            <Image 
              src={ticket.eventImage} 
              alt={ticket.eventName} 
              width={500}
              height={500}
              className="w-full h-48 object-cover rounded-t-lg rounded-tr" 
              quality={100}
            />
            <CardContent className="p-4">
              <h3 className="text-2xl font-semibold mb-2 text-[#FFEB3B]" style={pixelFont}>
                {ticket.eventName}
              </h3>
              <div className="flex items-center text-sm text-white mb-1 text-xl" style={pixelFont}>
                <Calendar className="mr-2 h-4 w-4" />
                {ticket.eventDate} at {ticket.eventTime}
              </div>
              <div className="flex items-center text-sm text-white text-xl" style={pixelFont}>
                <MapPin className="mr-2 h-4 w-4" />
                {ticket.eventLocation}
              </div>
              <div className="flex items-center text-sm text-white text-xl" style={pixelFont}>
                <Ticket className="mr-2 h-4 w-4" />
                Quantity: {ticket.quantity}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button 
                onClick={() => openTicketDetailsModal(ticket)}
                className={`w-full ${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] text-xl`}
                style={pixelFont}
              >
                View Ticket Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <TicketDetailsModal
        ticket={selectedTicket!}
        isOpen={isTicketDetailsModalOpen}
        onClose={() => setIsTicketDetailsModalOpen(false)}
      />
    </div>
  )
}

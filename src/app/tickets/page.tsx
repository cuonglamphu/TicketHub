'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Calendar, MapPin, Ticket, Filter } from 'lucide-react'
import { getStoredUser } from '@/utils/auth'
import { useRouter } from 'next/navigation'
import { TicketDetailsModal } from '@/components/modals/TicketDetailsModal'
import { purchaseService } from '@/services/purchaseService'
import { PurchaseDisplay } from '@/types/purchase'
import TicketsLoading from './loading'
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from 'lucide-react'
import { ImageWithFallback } from '@/components/ui/image-with-fallback';

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]"
const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" }

export default function TicketsPage() {
  const [tickets, setTickets] = useState<PurchaseDisplay[]>([])
  const [selectedTicket, setSelectedTicket] = useState<PurchaseDisplay | null>(null)
  const [isTicketDetailsModalOpen, setIsTicketDetailsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterCity, setFilterCity] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchTickets = async () => {
      const user = getStoredUser();
      if (!user) {
        router.push('/');
        return;
      }

      try {
        setIsLoading(true);
        const salesData = await purchaseService.getUserPurchases(user.userId);
        const formattedTickets = salesData.flatMap(sale => 
          purchaseService.formatPurchaseForDisplay(sale)
        );
        setTickets(formattedTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [router]);

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

  const openTicketDetailsModal = (ticket: PurchaseDisplay) => {
    setSelectedTicket(ticket)
    setIsTicketDetailsModalOpen(true)
  }

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || ticket.ticketType === filterType
    const matchesCity = filterCity === 'all' || ticket.eventLocation.toLowerCase().includes(filterCity.toLowerCase())

    return matchesSearch && matchesType && matchesCity
  })

  const uniqueTicketTypes = Array.from(new Set(tickets.map(ticket => ticket.ticketType)))
  const uniqueCities = Array.from(new Set(tickets.map(ticket => {
    const city = ticket.eventLocation.split(',')[0].trim()
    return city
  })))

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] relative overflow-hidden">
        {/* Keep the background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-64 h-64 bg-[#4CAF50]/20 rounded-full blur-3xl -top-32 -left-32" />
          <div className="absolute w-64 h-64 bg-[#FFEB3B]/20 rounded-full blur-3xl -bottom-32 -right-32" />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-12">
            <div className="relative">
              <Skeleton className="h-12 w-48 bg-gray-700 mb-2" />
              <Skeleton className="h-2 w-32 bg-gray-700" />
            </div>
            <div className="hidden md:block">
              <Skeleton className="h-8 w-32 bg-gray-700" />
            </div>
          </div>

          {/* Tickets grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div 
                key={index}
                className={`
                  bg-gray-800 rounded-lg ${pixelBorder}
                  transform transition-all duration-300
                `}
              >
                <Skeleton className="w-full h-48 bg-gray-700" />
                <div className="p-6">
                  <Skeleton className="h-8 w-3/4 bg-gray-700 mb-4" />
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-full bg-gray-700" />
                    <Skeleton className="h-6 w-full bg-gray-700" />
                    <Skeleton className="h-6 w-full bg-gray-700" />
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Skeleton className="h-12 w-full bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
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

        {/* Search and Filter Section */}
        <div className={`bg-gradient-to-br from-[#4CAF50] to-[#388E3C] p-6 mb-8 ${pixelBorder}`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tickets..."
                  className={`w-full px-4 py-3 pr-10 bg-white text-black rounded-xl ${pixelBorder}`}
                  style={pixelFont}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 ${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835]`}
              style={pixelFont}
            >
              <Filter className="w-5 h-5 inline-block mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={`px-4 py-3 bg-white text-black rounded-xl ${pixelBorder}`}
                style={pixelFont}
              >
                <option value="all">All Types</option>
                {uniqueTicketTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className={`px-4 py-3 bg-white text-black rounded-xl ${pixelBorder}`}
                style={pixelFont}
              >
                <option value="all">All Cities</option>
                {uniqueCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {filteredTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTickets.map((ticket) => (
              <Card 
                key={`${ticket.id}-${ticket.eventName}-${ticket.quantity}`}
                className={`
                  bg-gradient-to-br from-[#4CAF50] to-[#388E3C] 
                  ${pixelBorder} 
                  transform hover:-translate-y-2 transition-all duration-300
                  hover:shadow-[8px_8px_0_0_#000000]
                `}
              >
                <div className="relative">
                  <ImageWithFallback   
                    src={ticket.eventThumb} 
                    alt={ticket.eventName} 
                    width={500}
                    height={500}
                    className="w-full h-48 object-cover" 
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
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                    style={pixelFont}
                  >
                    View Ticket Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl text-[#FFEB3B]" style={pixelFont}>
              No tickets found
            </h3>
            <p className="text-white mt-2" style={pixelFont}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      <TicketDetailsModal
        ticket={selectedTicket!}
        isOpen={isTicketDetailsModalOpen}
        onClose={() => setIsTicketDetailsModalOpen(false)}
      />
    </div>
  )
}

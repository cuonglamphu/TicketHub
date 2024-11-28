'use client';

import { useState, useEffect, use, useCallback } from 'react';
import { Calendar, MapPin, Clock, Ticket, Share2, Heart } from 'lucide-react';
import { getStoredUser } from '@/utils/auth';
import { Modal } from "@/components/modals/Modal";
import SignInForm from '@/components/home/SignInForm';
import { TicketPurchaseModal } from "@/components/modals/TicketPurchaseModal";
import { eventService } from '@/services/eventService';
import {  TicketDisplay, Type } from '@/types/ticket';
import { ticketService } from '@/services/ticketService';
import { typeService } from '@/services/typeService';
import { Event } from '@/types/event';
import { toast } from 'sonner';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
const pixelFont = { fontFamily: "'VT323', monospace" };

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ticketDisplays, setTicketDisplays] = useState<TicketDisplay[]>([]);

  const fetchEventData = useCallback(async () => {
    try {
      setLoading(true);
      const eventData = await eventService.getById(Number(resolvedParams.id));
      setEvent(eventData);
    } catch (error) {
      console.error('Error fetching event:', error);
      toast.error('Failed to load event details');
    } finally {
      setLoading(false);
    }
  }, [resolvedParams.id]);

  const fetchTicketData = useCallback(async () => {
    try {
      const tickets = await ticketService.getByEventId(Number(resolvedParams.id));
      console.log("Fetched tickets:", tickets);

      const typeMap = new Map<number, Type>();
      
      for (const ticket of tickets) {
        const typeId = ticket.typeId;
        console.log("Processing ticket with typeId:", typeId);
        
        if (typeId && !typeMap.has(typeId)) {
          try {
            const typeInfo = await typeService.getById(typeId);
            console.log("Fetched type info:", typeInfo);
            if (typeInfo) {
              typeMap.set(typeId, typeInfo);
            }
          } catch (error) {
            console.error(`Error fetching type info for ID ${typeId}:`, error);
          }
        }
      }

      const displays: TicketDisplay[] = tickets.map(ticket => {
        const typeId = ticket.typeId;
        const typeInfo = typeId ? typeMap.get(typeId) : undefined;
        console.log("Mapping ticket:", ticket, "with type:", typeInfo);
        
        return {
          ticketId: ticket.ticketId,
          name: typeInfo?.typeName || 'Standard Ticket',
          price: ticket.ticketPrice,
          quantity: ticket.ticketQty
        };
      });

      console.log("Final displays:", displays);
      setTicketDisplays(displays);
    } catch (error) {
      console.error('Error fetching ticket data:', error);
      toast.error('Failed to load ticket information');
    }
  }, [resolvedParams.id]);

  useEffect(() => {
    if (resolvedParams.id) {
      fetchEventData();
      fetchTicketData();
    }
  }, [resolvedParams.id, fetchEventData, fetchTicketData]);

  const handleBuyTickets = () => {
    const user = getStoredUser();
    if (!user) {
      setIsSignInOpen(true);
      return;
    }
    setIsTicketModalOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>; // You can create a proper loading component
  }

  if (!event) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Image Section */}
          <div className={`relative h-[400px] ${pixelBorder} overflow-hidden bg-gradient-to-b from-[#2C0B3F] to-[#1C0522]`}>
            {/* Background blur effect with gradient overlay */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={event.eveThumb}
                alt={event.eveName}
                width={1000}
                height={1000}
                className="object-cover w-full h-full opacity-40 blur-sm scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C0B3F]/80 to-transparent" />
            </div>
            
            {/* Main image */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative w-full h-full max-w-4xl mx-auto">
                <ImageWithFallback
                  src={event.eveThumb}
                  alt={event.eveName}
                  className="object-contain w-full h-full rounded-lg"
                  priority
                />
                
                {/* Decorative elements */}
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-pink-500 to-purple-600" />
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-pink-500 to-purple-600" />
                
                {/* Sparkle effects */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-pulse" />
                <div className="absolute top-8 right-8 w-2 h-2 bg-white rounded-full animate-pulse delay-75" />
                <div className="absolute bottom-4 left-8 w-2 h-2 bg-white rounded-full animate-pulse delay-150" />
                <div className="absolute bottom-8 right-4 w-2 h-2 bg-white rounded-full animate-pulse delay-300" />
              </div>
            </div>
            
            {/* Optional: Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-pink-500/50" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-pink-500/50" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-pink-500/50" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-pink-500/50" />
          </div>

          {/* Event Info */}
          <div className={`bg-[#4CAF50] p-6 ${pixelBorder}`}>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-4xl font-bold text-[#FFEB3B]" style={pixelFont}>
                {event.eveName}
              </h1>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 ${pixelBorder} bg-white hover:bg-gray-100`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-black'}`} />
                </button>
                <button className={`p-2 ${pixelBorder} bg-white hover:bg-gray-100`}>
                  <Share2 className="w-6 h-6 text-black" />
                </button>
              </div>
            </div>

            <div className="space-y-4 text-white" style={pixelFont}>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {new Date(event.eveTimestart).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {new Date(event.eveTimestart).toLocaleTimeString()}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {event.eveCity}
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5" />
                ${event.eveId}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className={`bg-[#4CAF50] p-6 ${pixelBorder}`}>
            <h2 className="text-2xl font-bold mb-4 text-[#FFEB3B]" style={pixelFont}>
              About This Event
            </h2>
            <p className="text-white" style={pixelFont}>{event.eveDesc}</p>
          </div>

          {/* Thông tin vé - Redesigned */}
          <div className={`bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] p-8 ${pixelBorder}`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[#FFEB3B] mb-2" style={pixelFont}>
                  Thông tin vé
                </h2>
                <p className="text-gray-400" style={pixelFont}>
                  Chọn loại vé phù hợp với bạn
                </p>
              </div>
              <button
                onClick={handleBuyTickets}
                className={`mt-4 md:mt-0 px-6 py-3 ${pixelBorder} bg-[#4CAF50] text-white hover:bg-[#45a049] transition-all duration-300`}
                style={pixelFont}
              >
                Mua vé ngay
              </button>
            </div>
            
            {/* Danh sách vé */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ticketDisplays.map((ticket) => (
                <div 
                  key={`ticket-${ticket.ticketId}`}
                  className={`relative p-6 bg-[#333333] rounded-lg hover:bg-[#404040] transition-all duration-300 group ${pixelBorder}`}
                >
                  <div className="absolute top-0 right-0 mt-4 mr-4">
                    <div className="bg-[#4CAF50] px-3 py-1 rounded-full">
                      <span className="text-sm text-white" style={pixelFont}>
                        Còn {ticket.quantity} vé
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col h-full">
                    <h3 className="text-xl font-bold text-[#FFEB3B] mb-2" style={pixelFont}>
                      {ticket.name}
                    </h3>
                    
                    <div className="flex-grow">
                      <div className="flex items-baseline mb-4">
                        <span className="text-2xl font-bold text-[#4CAF50]" style={pixelFont}>
                          {(ticket.price || 0).toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-400 ml-1" style={pixelFont}>đ</span>
                      </div>
                      
                      <p className="text-gray-400" style={pixelFont}>
                        Bao gồm vé vào cổng và quà tặng đặc biệt
                      </p>
                    </div>
                    
                    <button
                      onClick={handleBuyTickets}
                      className="mt-4 w-full py-2 bg-transparent border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white transition-colors duration-300 rounded-md"
                      style={pixelFont}
                    >
                      Chọn vé
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Buy Tickets Card */}
          <div className={`bg-[#4CAF50] p-6 ${pixelBorder} sticky top-4`}>  
            <h2 className="text-2xl font-bold mb-4 text-[#FFEB3B]" style={pixelFont}>
              Get Your Tickets
            </h2>
            <p className="text-white mb-4" style={pixelFont}>
              Secure your spot at this amazing event!
            </p>
            <button
              onClick={handleBuyTickets}
              className={`w-full py-3 ${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] flex items-center justify-center gap-2`}
              style={pixelFont}
            >
              <Ticket className="w-5 h-5" />
              Buy Tickets
            </button>
          </div>

          {/* Category Info */}
          <div className={`bg-[#4CAF50] p-6 ${pixelBorder}`}>
            <h2 className="text-2xl font-bold mb-4 text-[#FFEB3B]" style={pixelFont}>
              Event Category
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <div>
                <h3 className="text-[#FFEB3B]" style={pixelFont}>{event.category?.catName}</h3>
                <p className="text-white" style={pixelFont}>{event.category?.catDesc}</p>
              </div>    
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} title="Sign In">
        <SignInForm onClose={() => {
          setIsSignInOpen(false);
          window.location.reload();
        }} />
      </Modal>

      {event && (
        

        <TicketPurchaseModal
          isOpen={isTicketModalOpen}
          onClose={() => setIsTicketModalOpen(false)}
          event={{
            eveId: event.eveId,
            eveName: event.eveName,
            eveDesc: event.eveDesc,
            eveTimestart: event.eveTimestart,
            eveCity: event.eveCity,
            ticketTypes: ticketDisplays?.map(ticket => ({
              ticketId: ticket.ticketId || 0,
              name: ticket.name,
              price: ticket.price,
              quantity: ticket.quantity
            })) || [],
            location: event.eveCity,
            image: event.eveThumb,
            price: event.eveId,
            description: event.eveDesc
          }}
          ticketTypes={ticketDisplays || []}
        />
      )}
    </div>
  );
} 
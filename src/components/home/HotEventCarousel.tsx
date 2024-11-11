import { useEffect, TouchEvent, useRef } from "react"
import Image from 'next/image' 
import { useState } from "react"
import { hotEvents } from '@/data/mock'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { TicketPurchaseModal } from "@/components/modals/TicketPurchaseModal"
import { RecommendedEvent } from "@/types/event"
const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]"
const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" }



export function HotEventCarousel({ events, onBuyTickets }: { events: typeof hotEvents, onBuyTickets: (event: RecommendedEvent) => void }) {
    const [isTicketPurchaseOpen, setIsTicketPurchaseOpen] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)
    const timerRef = useRef<NodeJS.Timeout | null>(null);


    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % events.length)
    }
  
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + events.length) % events.length)
    }
  
    // Add function to start carousel
    const startCarousel = () => {
        timerRef.current = setInterval(nextSlide, 5000);
    };

    // Add function to stop carousel
    const stopCarousel = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    useEffect(() => {
        startCarousel();
        return () => stopCarousel();
    }, );
  
    const handleTouchStart = (e: TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        
        const distance = touchStart - touchEnd
        const minSwipeDistance = 50

        if (Math.abs(distance) >= minSwipeDistance) {
            if (distance > 0) {
                nextSlide()
            } else {
                prevSlide()
            }
        }

        setTouchStart(null)
        setTouchEnd(null)
    }

    const handleBuyTickets = (event: RecommendedEvent) => {
        stopCarousel();
        onBuyTickets(event);
    }
  
    return (
      <div 
        className={`my-4 mx-auto max-w-[90%] md:max-w-[85%] relative overflow-hidden h-[400px] md:h-[500px] ${pixelBorder} bg-[#4CAF50]`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-3/5 h-[50%] md:h-full">
                <Image
                  src={event.image}
                  alt={event.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  quality={100}
                />
              </div>
              <div className="md:w-2/5 h-[50%] md:h-full p-4 flex flex-col justify-center  py-8">
                <h2 className="text-xl md:text-2xl lg:text-5xl font-bold mb-2 text-[#FFEB3B]" style={pixelFont}>{event.name}</h2>
                <p className="text-sm md:text-base text-white mb-4 text-xl" style={pixelFont}>{event.description}</p>
                <p className="text-sm md:text-base text-[#FFEB3B] mb-4 text-xl" style={pixelFont}>{event.date}</p>
                  <Button onClick={() => handleBuyTickets(event)} className={`${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] self-start text-xl mb-2 `} style={pixelFont}>
                  Get Tickets
                </Button>
              </div>
            </div>
            <TicketPurchaseModal
              event={event} 
              isOpen={isTicketPurchaseOpen}
              onClose={() => {
                  setIsTicketPurchaseOpen(false);
                  startCarousel(); // Restart carousel when modal closes
              }}
            />
          </div>
        ))}
        <Button
          variant="outline"
          size="icon"
          className={`hidden md:flex absolute top-1/2 left-2 -translate-y-1/2 ${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] z-10`}
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous event</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={`hidden md:flex absolute top-1/2 right-2 -translate-y-1/2 ${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] z-10`}
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next event</span>
        </Button>
        
      </div>
      
    )
  }
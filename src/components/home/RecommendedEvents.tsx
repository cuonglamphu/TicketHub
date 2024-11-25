import { Calendar, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { RecommendedEvent } from "@/types/event"
import Image from 'next/image'
interface RecommendedEventsProps {
  events: RecommendedEvent[]
  onViewDetails: (event: RecommendedEvent) => void
  onBuyTickets: (event: RecommendedEvent) => void
}

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]"
const pixelFont = { fontFamily: "'Press Start 2P', cursive" }

export function RecommendedEvents({ events, onViewDetails, onBuyTickets }: RecommendedEventsProps) {
  return (
    <div className="mt-8 pixel-bg p-8 rounded-lg" style={pixelFont}>
      <h2 className="text-2xl font-bold mb-6 text-[#FFEB3B] pixel-text-shadow animate-pulse">
        RECOMMENDED EVENTS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div 
            key={event.eveId} 
            className={`${pixelBorder} bg-[#4A4A4A] rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105`}
          >
            <div className="relative">
              <img
                src={event.eveThumb || '/default-image.jpg'}
                alt={event.eveName}
                className="w-full h-48 object-cover pixelated"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50" />
            </div>
            
            <div className="p-4 bg-[#2C2C2C] text-white">
              <h3 className="text-lg mb-2 text-[#FFA500] pixel-text-shadow">{event.eveName}</h3>
              <p className="text-sm text-gray-300 mb-2 line-clamp-2">{event.eveDesc}</p>
              
              <div className="mb-4 space-y-2">
                <div className="flex items-center text-[#8BF5FF]">
                  <Calendar className="w-4 h-4 mr-2 pixel-icon" />
                  <span className="text-xs">{new Date(event.eveTimestart).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-[#FF69B4]">
                  <MapPin className="w-4 h-4 mr-2 pixel-icon" />
                  <span className="text-xs">{event.eveCity}</span>
                </div>
              </div>

              <button
                onClick={() => onViewDetails(event)}
                className="w-full px-4 py-2 bg-[#FFD700] text-black font-bold rounded-none pixel-button hover:bg-[#FFA500] active:translate-y-1 transition-all duration-200"
              >
                ⚔️ VIEW QUEST DETAILS
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
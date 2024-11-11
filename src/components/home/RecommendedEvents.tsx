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

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]"
const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" }

export function RecommendedEvents({ events, onViewDetails, onBuyTickets }: RecommendedEventsProps) {
  return (
    <div>
      <h2 className="text-4xl font-bold mb-4 text-[#FFEB3B] text-center md:text-left" style={pixelFont}>
        Recommended Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <Card key={event.id} className={`bg-[#4CAF50] ${pixelBorder}`}>
              <Image 
                src={event.image} 
                alt={event.name} 
                width={500}
                height={500}
                // border radius top left and top right, top right more rounded
                className="w-full h-48 object-cover rounded-t-lg rounded-tr" 
                quality={100}
              />
            <CardContent className="p-4">
              <h3 className="text-2xl font-semibold mb-2 text-[#FFEB3B]" style={pixelFont}>
                {event.name}
              </h3>
              <div className="flex items-center text-sm text-white mb-1 text-xl" style={pixelFont}>
                <Calendar className="mr-2 h-4 w-4" />
                {event.date} at {event.time}
              </div>
              <div className="flex items-center text-sm text-white text-xl" style={pixelFont}>
                <MapPin className="mr-2 h-4 w-4" />
                {event.location}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => onViewDetails(event)} 
                className={`${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] text-xl`} 
                style={pixelFont}
              >
                View Details
              </Button>
              <Button 
                onClick={() => onBuyTickets(event)} 
                className={`${pixelBorder} bg-[#F44336] text-white hover:bg-[#D32F2F] text-xl`} 
                style={pixelFont}
              >
                Buy Tickets
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 
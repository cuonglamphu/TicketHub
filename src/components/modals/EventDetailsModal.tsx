import { Button } from "@/components/ui/button"
import { RecommendedEvent } from "@/types/event"
import { X } from 'lucide-react'
import { Calendar, MapPin } from 'lucide-react'
import { useState } from "react"
import Image from 'next/image'
const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]"
const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" }

interface EventDetailsModalProps {
    event: RecommendedEvent | undefined
    isOpen: boolean
    onClose: () => void
}

export function EventDetailsModal({ event, isOpen, onClose }: EventDetailsModalProps) {
    const [showFullImage, setShowFullImage] = useState(false);
    
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        {showFullImage ? (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50" onClick={() => setShowFullImage(false)}>
            <Image 
              src={event!.image} 
              alt={event!.name} 
              fill
              className="max-w-[90vw] max-h-[90vh] object-contain cursor-pointer p-4"
              quality={100}
            />
          </div>
        ) : (
          <div className={`bg-[#4CAF50] p-8 ${pixelBorder} max-w-2xl w-full`}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white text-xl" style={pixelFont}>{event!.name}</h2>
              <Button variant="ghost" onClick={onClose} className="text-[#FFEB3B] hover:text-white">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex justify-center items-center text-center">
            <Image 
              src={event!.image} 
              alt={event!.name} 
              width={500}
              height={500}
              className={`w-full h-96 object-cover mb-4 ${pixelBorder} cursor-pointer hover:opacity-90 transition-opacity  `} 
              quality={100}
                onClick={() => setShowFullImage(true)}
              />
            </div>
            <p className="text-white mb-4 text-xl" style={pixelFont}>{event!.description}</p>
            <div className="flex items-center text-[#FFEB3B] mb-2 text-xl" style={pixelFont}>
              <Calendar className="mr-2 h-5 w-5" />
              {event!.date} at {event!.time}
            </div>
            <div className="flex items-center text-[#FFEB3B] mb-4 text-xl" style={pixelFont}>
              <MapPin className="mr-2 h-5 w-5" />
              {event!.location}
            </div>
            <p className="text-2xl font-bold text-[#FFEB3B] mb-4 text-xl" style={pixelFont}>${event!.price}</p>
            <Button onClick={onClose} className={`w-full ${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] text-xl`} style={pixelFont}>
              Close
            </Button>
          </div>
        )}
      </div>
    );
  }
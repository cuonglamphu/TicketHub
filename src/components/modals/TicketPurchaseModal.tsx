import { useState } from "react";
import { RecommendedEvent } from "@/types/event";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { X} from 'lucide-react'


interface TicketPurchaseModalProps {
    event: RecommendedEvent | undefined
    isOpen: boolean
    onClose: () => void
}

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]"
const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" }

export function TicketPurchaseModal({ event, isOpen, onClose }: TicketPurchaseModalProps) {
    const [quantity, setQuantity] = useState(1);
  
    if (!isOpen) return null;

    const total = quantity * event!.price;
  
    const handlePurchase = () => {
      // TODO: Implement purchase logic
      console.log('Purchase:', { event: event!.name, quantity, total });
      onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`bg-[#4CAF50] p-8 ${pixelBorder} max-w-md w-full`}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white" style={pixelFont}>Buy Tickets</h2>
              <Button variant="ghost" onClick={onClose} className="text-[#FFEB3B] hover:text-white">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <h3 className="text-xl font-semibold text-[#FFEB3B] mb-4" style={pixelFont}>{event!.name}</h3>
            <div className="flex justify-between items-center mb-4">
              <label htmlFor="quantity" className="text-white" style={pixelFont}>Quantity:</label>
              <Input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                className={`w-20 text-right bg-white text-black ${pixelBorder}`}
                style={pixelFont}
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-white" style={pixelFont}>Price per ticket:</span>
              <span className="font-semibold text-[#FFEB3B]" style={pixelFont}>${event!.price}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-white" style={pixelFont}>Total:</span>
              <span className="text-xl font-bold text-[#FFEB3B]" style={pixelFont}>${total}</span>
            </div>
            <Button onClick={handlePurchase} className={`w-full ${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] text-xl`} style={pixelFont}>
              Confirm Purchase
            </Button>
          </div>
        </div>
      );
}
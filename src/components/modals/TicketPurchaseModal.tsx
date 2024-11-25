import { useState, useEffect } from "react";
import { RecommendedEvent } from "@/types/event";
import { TicketDisplay } from "@/types/ticket";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface TicketPurchaseModalProps {
    event: RecommendedEvent | undefined;
    isOpen: boolean;
    onClose: () => void;
    selectedTicketType?: TicketDisplay;
    ticketTypes: TicketDisplay[];
}

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
const pixelFont = { fontFamily: "'VT323', monospace" };

export function TicketPurchaseModal({
    event,
    isOpen,
    onClose,
    selectedTicketType,
    ticketTypes = []
}: TicketPurchaseModalProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedType, setSelectedType] = useState<TicketDisplay | undefined>(selectedTicketType);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setQuantity(1);
            setSelectedType(selectedTicketType);
            setError(null);
        }
    }, [isOpen, selectedTicketType]);

    if (!isOpen) return null;
    if (!event) {
        console.error('Event data is missing');
        return null;
    }

    const calculateMaxQuantity = (availableQuantity: number): number => {
        try {
            if (availableQuantity <= 20) {
                return Math.max(1, Math.floor(availableQuantity * 0.1));
            }
            return Math.max(1, Math.floor(availableQuantity * 0.05));
        } catch (err) {
            console.error('Error calculating max quantity:', err);
            return 1;
        }
    };

    const maxQuantity = selectedType ? calculateMaxQuantity(selectedType.quantity) : 0;
    const total = quantity * (selectedType?.price || 0);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const value = parseInt(e.target.value);
            if (isNaN(value)) return;
            const newQuantity = Math.max(1, Math.min(value, maxQuantity));
            setQuantity(newQuantity);
        } catch (err) {
            console.error('Error handling quantity change:', err);
            setError('Invalid quantity value');
        }
    };

    const handleTypeSelect = (value: string) => {
        const newType = ticketTypes.find(t => t.name === value);
        setSelectedType(newType);
        setQuantity(1);
        setError(null);
    };

    const handlePurchase = () => {
        try {
            if (!selectedType) {
                setError('Please select a ticket type');
                return;
            }
            
            // Tạo URL parameters cho trang xác nhận
            const params = new URLSearchParams({
                eventId: event.eveId.toString(),
                eventName: event.eveName,
                ticketId: selectedType.ticketId.toString(),
                ticketType: selectedType.name,
                quantity: quantity.toString(),
                total: total.toString(),
                unitPrice: selectedType.price.toString()
            });

            // Chuyển hướng đến trang xác nhận với thông tin mua vé
            window.location.href = `/confirm-purchase?${params.toString()}`;
            
            onClose();
        } catch (err) {
            console.error('Error processing purchase:', err);
            setError('Failed to process purchase');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className={`bg-[#4CAF50] p-8 ${pixelBorder} max-w-md w-full`}>
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-white" style={pixelFont}>Buy Tickets</h2>
                    <Button 
                        variant="ghost" 
                        onClick={onClose} 
                        className="text-[#FFEB3B] hover:text-white"
                    >
                        <X className="h-6 w-6" />
                    </Button>
                </div>

                <h3 className="text-xl font-semibold text-[#FFEB3B] mb-4" style={pixelFont}>
                    {event.eveName}
                </h3>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Ticket Type Selection */}
                {!selectedTicketType && ticketTypes.length > 0 && (
                    <div className="mb-4">
                        <label className="text-white mb-2 block" style={pixelFont}>
                            Select Ticket
                        </label>
                        <Select
                            value={selectedType?.name ?? ""}
                            onValueChange={handleTypeSelect}
                        >
                            <SelectTrigger className={`w-full bg-white ${pixelBorder}`}>
                                <SelectValue placeholder="Choose ticket type" />
                            </SelectTrigger>
                            <SelectContent>
                                {ticketTypes.map((type) => (
                                    <SelectItem 
                                        key={type.ticketId} 
                                        value={type.name}
                                        disabled={type.quantity === 0}
                                    >
                                        {type.name} - ${type.price} {type.quantity === 0 ? '(Sold Out)' : ''}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {/* Quantity Selection */}
                {selectedType && (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <label htmlFor="quantity" className="text-white" style={pixelFont}>
                                Quantity: (Max: {maxQuantity})
                            </label>
                            <Input
                                type="number"
                                id="quantity"
                                min="1"
                                max={maxQuantity}
                                value={quantity}
                                onChange={handleQuantityChange}
                                className={`w-20 text-right bg-white text-black ${pixelBorder}`}
                                style={pixelFont}
                            />
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <span className="text-white" style={pixelFont}>Price per ticket:</span>
                            <span className="font-semibold text-[#FFEB3B]" style={pixelFont}>
                                ${selectedType.price}
                            </span>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xl font-bold text-white" style={pixelFont}>Total:</span>
                            <span className="text-xl font-bold text-[#FFEB3B]" style={pixelFont}>
                                ${total}
                            </span>
                        </div>

                        <Button
                            onClick={handlePurchase}
                            disabled={!selectedType}
                            className={`w-full ${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] text-xl`}
                            style={pixelFont}
                        >
                            Confirm Purchase
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
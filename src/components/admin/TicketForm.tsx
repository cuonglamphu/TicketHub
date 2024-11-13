'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { pixelBorder } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TicketFormProps {
  isOpen: boolean;
  onClose: () => void;
  ticket?: Ticket | null;
  availableEvents: Event[];
}

interface Event {
  id: number;
  title: string;
  category: string;
  date: string;
}

interface Ticket {
  id?: number;
  eventId: number;
  eventName: string;
  category: string;
  type: string;
  price: string;
  available: number;
  sold: number;
  revenue: string;
}

export function TicketForm({ isOpen, onClose, ticket, availableEvents }: TicketFormProps) {
  const [formData, setFormData] = useState<Ticket>({
    eventId: 0,
    eventName: '',
    category: '',
    type: 'regular',
    price: '',
    available: 0,
    sold: 0,
    revenue: '$0'
  });

  useEffect(() => {
    if (ticket) {
      setFormData(ticket);
    }
  }, [ticket]);

  const categories = [...new Set(availableEvents.map(event => event.category))];
  
  const filteredEvents = availableEvents
    .filter(event => formData.category ? event.category === formData.category : true)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleCategoryChange = (category: string) => {
    setFormData({
      ...formData,
      category,
      eventId: 0,
      eventName: ''
    });
  };

  const handleEventChange = (eventId: string) => {
    const selectedEvent = availableEvents.find(e => e.id === parseInt(eventId));
    if (selectedEvent) {
      setFormData({
        ...formData,
        eventId: selectedEvent.id,
        eventName: selectedEvent.title
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`bg-[#4CAF50] ${pixelBorder} p-6 rounded-lg w-full max-w-md`}>
        <DialogTitle>
          {ticket ? 'Edit Ticket' : 'Add New Ticket'}
        </DialogTitle>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-[#FFEB3B]">Category</Label>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
              disabled={!!ticket}
            >
              <SelectTrigger className={`${pixelBorder} bg-white mt-1`}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-[#FFEB3B]">Event</Label>
            <Select
              value={formData.eventId.toString()}
              onValueChange={handleEventChange}
              disabled={!!ticket || !formData.category}
            >
              <SelectTrigger className={`${pixelBorder} bg-white mt-1`}>
                <SelectValue placeholder="Select event" />
              </SelectTrigger>
              <SelectContent>
                {filteredEvents.map(event => (
                  <SelectItem key={event.id} value={event.id.toString()}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-[#FFEB3B]">Ticket Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({...formData, type: value})}
            >
              <SelectTrigger className={`${pixelBorder} bg-white mt-1`}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="early">Early Bird</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-[#FFEB3B]">Price ($)</Label>
            <Input
              type="number"
              value={formData.price.replace('$', '')}
              onChange={(e) => setFormData({...formData, price: `$${e.target.value}`})}
              className={`${pixelBorder} bg-white mt-1`}
              required
            />
          </div>

          <div>
            <Label className="text-[#FFEB3B]">Available Tickets</Label>
            <Input
              type="number"
              value={formData.available}
              onChange={(e) => setFormData({...formData, available: parseInt(e.target.value)})}
              className={`${pixelBorder} bg-white mt-1`}
              required
            />
          </div>

          <div className="flex gap-2 mt-6">
            <Button
              type="submit"
              className={`flex-1 ${pixelBorder} bg-[#FFEB3B] hover:bg-[#FDD835] text-black`}
            >
              {ticket ? 'Update' : 'Create'}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className={`flex-1 ${pixelBorder} bg-gray-500 hover:bg-gray-600 text-white`}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 
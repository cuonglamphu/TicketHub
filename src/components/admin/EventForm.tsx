'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminEvent } from '@/types/event';

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  event?: AdminEvent;
}

const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" };

// Sample data - replace with API calls
const venues = [
  { id: 1, name: 'Central Park' },
  { id: 2, name: 'Madison Square Garden' },
];

const categories = [
  { id: 1, name: 'Music' },
  { id: 2, name: 'Sports' },
];

export function EventForm({ isOpen, onClose, event }: EventFormProps) {
  const [formData, setFormData] = useState({
    eventName: '',
    totalExpenses: 0,
    venueId: '',
    catId: '',
    date: '',
    startTime: '',
  });

  useEffect(() => {
    if (event) {
      setFormData({
        eventName: event.eventName || '',
        totalExpenses: event.totalExpenses || 0,
        venueId: event.venueId?.toString() || '',
        catId: event.catId?.toString() || '',
        date: event.date || '',
        startTime: event.startTime || '',
      });
    } else {
      setFormData({
        eventName: '',
        totalExpenses: 0,
        venueId: '',
        catId: '',
        date: '',
        startTime: '',
      });
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement form submission logic
    console.log('Form data:', formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#4CAF50] sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-[#FFEB3B]" style={pixelFont}>
            {event ? 'Edit Event' : 'Create New Event'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white block mb-1" style={pixelFont}>
              Event Name
            </label>
            <Input
              value={formData.eventName}
              onChange={(e) => setFormData(prev => ({ ...prev, eventName: e.target.value }))}
              className="bg-white"
              required
            />
          </div>

          <div>
            <label className="text-white block mb-1" style={pixelFont}>
              Total Expenses
            </label>
            <Input
              type="number"
              value={formData.totalExpenses}
              onChange={(e) => setFormData(prev => ({ ...prev, totalExpenses: parseFloat(e.target.value) }))}
              className="bg-white"
              required
            />
          </div>

          <div>
            <label className="text-white block mb-1" style={pixelFont}>
              Venue
            </label>
            <Select
              value={formData.venueId}
              onValueChange={(value) => setFormData(prev => ({ ...prev, venueId: value }))}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select venue" />
              </SelectTrigger>
              <SelectContent>
                {venues.map((venue) => (
                  <SelectItem key={venue.id} value={venue.id.toString()}>
                    {venue.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-white block mb-1" style={pixelFont}>
              Category
            </label>
            <Select
              value={formData.catId}
              onValueChange={(value) => setFormData(prev => ({ ...prev, catId: value }))}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-white block mb-1" style={pixelFont}>
              Date
            </label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="bg-white"
              required
            />
          </div>

          <div>
            <label className="text-white block mb-1" style={pixelFont}>
              Start Time
            </label>
            <Input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
              className="bg-white"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-white hover:bg-gray-100"
              style={pixelFont}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#FFEB3B] hover:bg-[#FDD835] text-black"
              style={pixelFont}
            >
              {event ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 
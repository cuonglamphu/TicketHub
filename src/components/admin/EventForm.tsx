'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Event, CreateEventDto } from '@/types/event';
import { Category } from '@/types/category';
import { categoryService } from '@/services/categoryService';
import { Calendar, MapPin, Image as ImageIcon } from 'lucide-react';

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEventDto) => Promise<void>;
  event?: Event;
}

const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" };
const inputClasses = "bg-white/90 border-2 border-black focus:border-[#FFEB3B] transition-colors";
const labelClasses = "text-[#FFEB3B] font-bold block mb-2 flex items-center gap-2";

export function EventForm({ isOpen, onClose, onSubmit, event }: EventFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<CreateEventDto>({
    eveName: '',
    eveDesc: '',
    eveCity: '',
    eveTimestart: '',
    eveTimeend: '',
    eveThumb: '',
    catId: 0
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAll();
        setCategories(data as Category[]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (event) {
      setFormData({
        eveName: event.eveName,
        eveDesc: event.eveDesc,
        eveCity: event.eveCity,
        eveTimestart: event.eveTimestart,
        eveTimeend: event.eveTimeend,
        eveThumb: event.eveThumb,
        catId: event.catId
      });
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#4CAF50] sm:max-w-[600px] border-4 border-black shadow-[8px_8px_0_0_#000000]">
        <DialogHeader>
          <DialogTitle className="text-[#FFEB3B] text-2xl text-center mb-4" style={pixelFont}>
            {event ? '🎮 Edit Event' : '🎮 Create New Event'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className={labelClasses} style={pixelFont}>
                  <span className="text-2xl">🎯</span> Event Name
                </label>
                <Input
                  value={formData.eveName}
                  onChange={(e) => setFormData(prev => ({ ...prev, eveName: e.target.value }))}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses} style={pixelFont}>
                  <MapPin className="h-5 w-5" /> City
                </label>
                <Input
                  value={formData.eveCity}
                  onChange={(e) => setFormData(prev => ({ ...prev, eveCity: e.target.value }))}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses} style={pixelFont}>
                  <Calendar className="h-5 w-5" /> Start Time
                </label>
                <Input
                  type="datetime-local"
                  value={formData.eveTimestart}
                  onChange={(e) => setFormData(prev => ({ ...prev, eveTimestart: e.target.value }))}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses} style={pixelFont}>
                  <Calendar className="h-5 w-5" /> End Time
                </label>
                <Input
                  type="datetime-local"
                  value={formData.eveTimeend}
                  onChange={(e) => setFormData(prev => ({ ...prev, eveTimeend: e.target.value }))}
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className={labelClasses} style={pixelFont}>
                  <span className="text-2xl">📝</span> Description
                </label>
                <Textarea
                  value={formData.eveDesc}
                  onChange={(e) => setFormData(prev => ({ ...prev, eveDesc: e.target.value }))}
                  className={`${inputClasses} h-[120px]`}
                  required
                />
              </div>

              <div>
                <label className={labelClasses} style={pixelFont}>
                  <ImageIcon className="h-5 w-5" /> Thumbnail URL
                </label>
                <Input
                  value={formData.eveThumb}
                  onChange={(e) => setFormData(prev => ({ ...prev, eveThumb: e.target.value }))}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses} style={pixelFont}>
                  <span className="text-2xl">🏷️</span> Category
                </label>
                <Select
                  value={formData.catId.toString()}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, catId: parseInt(value) }))}
                >
                  <SelectTrigger className={`${inputClasses} bg-white`}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem 
                        key={category.catId} 
                        value={category.catId.toString()}
                        className="text-base"
                      >
                        {category.catName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t-2 border-black">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-white hover:bg-gray-100 border-2 border-black text-black"
              style={pixelFont}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#FFEB3B] hover:bg-[#FDD835] text-black border-2 border-black"
              style={pixelFont}
            >
              {event ? '🚀 Update Event' : '🚀 Create Event'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 
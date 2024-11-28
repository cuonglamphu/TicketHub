'use client';

import { useState, useEffect, use, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import { Event } from '@/types/event';
import { eventService } from '@/services/eventService';
import { categoryService } from '@/services/categoryService';
import { toast } from 'sonner';

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
const pixelFont = { fontFamily: "'VT323', monospace" };

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  const fetchCategoryEvents = useCallback(async () => {
    try {
      setLoading(true);
      const category = await categoryService.getBySlug(resolvedParams.slug);
      if (category) {
        setCategoryName(category.catName);
        const eventsData = await eventService.getByCategory(category.catId);
        setEvents(eventsData);
      }
    } catch (error) {
      console.error('Error fetching category events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  }, [resolvedParams.slug]);

  useEffect(() => {
    fetchCategoryEvents();
  }, [fetchCategoryEvents]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`bg-[#4CAF50] ${pixelBorder} animate-pulse`}>
              <div className="w-full h-48 bg-[#388E3C]" />
              <div className="p-4 space-y-3">
                <div className="h-6 bg-[#388E3C] rounded w-3/4" />
                <div className="h-4 bg-[#388E3C] rounded w-1/2" />
                <div className="h-4 bg-[#388E3C] rounded w-2/3" />
                <div className="h-10 bg-[#388E3C] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#FFEB3B] mb-8" style={pixelFont}>
        {categoryName} Events
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div 
            key={event.eveId} 
            className={`bg-[#4CAF50] ${pixelBorder}`}
          >
            <div className="relative h-48">
              <Image
                src={event.eveThumb}
                alt={event.eveName}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-[#FFEB3B]" style={pixelFont}>
                {event.eveName}
              </h3>
              <div className="flex items-center text-white mb-1" style={pixelFont}>
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(event.eveTimestart).toLocaleDateString()}
              </div>
              <div className="flex items-center text-white mb-2" style={pixelFont}>
                <MapPin className="mr-2 h-4 w-4" />
                {event.eveCity}
              </div>
              <Link 
                href={`/events/${event.eveId}`}
                className={`inline-block w-full text-center py-2 ${pixelBorder} 
                  bg-[#FFEB3B] text-black hover:bg-[#FDD835]`}
                style={pixelFont}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
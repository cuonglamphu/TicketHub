'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
const pixelFont = { fontFamily: "'VT323', monospace" };

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Mock data - replace with API call
    setEvents([
      {
        id: 1,
        title: 'Summer Music Festival',
        date: '2024-06-15',
        location: 'Central Park',
        description: 'A day of amazing music performances',
        image: 'https://salt.tkbcdn.com/ts/ds/5d/3b/5c/006fb1fd95e2d66dcf737569f6be23c9.jpg'
      },
      // Add more events...
    ]);
  }, [resolvedParams.slug]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div 
            key={event.id} 
            className={`bg-[#4CAF50] ${pixelBorder}`}
          >
            <Image
              src={event.image}
              alt={event.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-[#FFEB3B]" style={pixelFont}>
                {event.title}
              </h3>
              <div className="flex items-center text-white mb-1" style={pixelFont}>
                <Calendar className="mr-2 h-4 w-4" />
                {event.date}
              </div>
              <div className="flex items-center text-white mb-2" style={pixelFont}>
                <MapPin className="mr-2 h-4 w-4" />
                {event.location}
              </div>
              <Link 
                href={`/events/${event.id}`}
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
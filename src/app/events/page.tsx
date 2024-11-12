'use client';

import { useState } from 'react';
import { Search, Filter, Music, MapPin, Calendar, DollarSign } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" };

// Mock data - replace with real API call
const events = [
  {
    id: 1,
    title: "Summer Music Festival",
    category: "Music",
    date: "2024-07-15",
    time: "18:00",
    location: "Central Park",
    price: 50,
    image: "https://salt.tkbcdn.com/ts/ds/de/fd/9b/8f4fd89066ec3447a0ddd21995e44bf2.png"
  },
  {
    id: 2,
    title: "Summer Music Festival",
    category: "Music",
    date: "2024-07-15",
    time: "18:00",
    location: "Central Park",
    price: 50,
    image: "https://salt.tkbcdn.com/ts/ds/de/fd/9b/8f4fd89066ec3447a0ddd21995e44bf2.png"
  },
  {
    id: 3,
    title: "Summer Music Festival",
    category: "Music",
    date: "2024-07-15",
    time: "18:00",
    location: "Central Park",
    price: 50,
    image: "https://salt.tkbcdn.com/ts/ds/de/fd/9b/8f4fd89066ec3447a0ddd21995e44bf2.png"
  },
  {
    id: 4,
    title: "Summer Music Festival",
    category: "Music",
    date: "2024-07-15",
    time: "18:00",
    location: "Central Park",
    price: 50,
    image: "https://salt.tkbcdn.com/ts/ds/de/fd/9b/8f4fd89066ec3447a0ddd21995e44bf2.png"
  },
  // Add more events...
];

const categories = ["All", "Music", "Sports", "Arts", "Others"];
const cities = ["All Cities", "Ho Chi Minh", "Hanoi", "Da Nang"];
const prices = ["All Prices", "Under $50", "$50-$100", "Over $100"];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#4CAF50]/10 rounded-full blur-3xl -top-48 -left-48" />
        <div className="absolute w-96 h-96 bg-[#FFEB3B]/10 rounded-full blur-3xl -bottom-48 -right-48" />
      </div>

      {/* Pixel art decorations */}
      <div className="absolute top-20 right-20 w-20 h-20 animate-bounce">
        <div className="w-full h-full bg-[#FFEB3B] rotate-45 transform" style={{boxShadow: '4px 4px 0 0 #000000'}} />
      </div>
      <div className="absolute bottom-20 left-20 w-16 h-16 animate-pulse">
        <div className="w-full h-full bg-[#4CAF50] rotate-12 transform" style={{boxShadow: '4px 4px 0 0 #000000'}} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with decorative elements */}
        <div className="flex items-center justify-between mb-12">
          <div className="relative">
            <h1 className="text-5xl font-bold text-[#FFEB3B] mb-2" style={pixelFont}>
              Discover Events
            </h1>
            <div className="h-2 bg-[#FFEB3B] w-48" style={{boxShadow: '2px 2px 0 0 #000000'}} />
          </div>
        </div>

        {/* Search and Filter Section with enhanced styling */}
        <div className={`bg-gradient-to-br from-[#4CAF50] to-[#388E3C] p-6 mb-8 ${pixelBorder}`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  className={`w-full px-4 py-3 pr-10 bg-white text-black rounded-xl ${pixelBorder} focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]`}
                  style={pixelFont}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 ${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] flex items-center gap-2 text-lg transition-all hover:shadow-[6px_6px_0_0_#000000]`}
              style={pixelFont}
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                { options: categories, value: selectedCategory, onChange: setSelectedCategory },
                { options: cities, value: selectedCity, onChange: setSelectedCity },
                { options: prices, value: selectedPrice, onChange: setSelectedPrice }
              ].map((filter, index) => (
                <select
                  key={index}
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  className={`px-4 py-3 bg-white text-black rounded-xl ${pixelBorder} focus:outline-none focus:ring-2 focus:ring-[#FFEB3B] cursor-pointer`}
                  style={pixelFont}
                >
                  {filter.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ))}
            </div>
          )}
        </div>

        {/* Events Grid with enhanced cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div 
              key={event.id} 
              className={`
                bg-gradient-to-br from-[#4CAF50] to-[#388E3C] 
                ${pixelBorder} 
                transform hover:-translate-y-2 transition-all duration-300
                hover:shadow-[8px_8px_0_0_#000000]
              `}
            >
              <div className="relative h-60">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  quality={100}
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#388E3C] to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#FFEB3B] mb-4" style={pixelFont}>
                  {event.title}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-white" style={pixelFont}>
                    <Music className="mr-3 h-5 w-5 text-[#FFEB3B]" />
                    {event.category}
                  </div>
                  <div className="flex items-center text-white" style={pixelFont}>
                    <Calendar className="mr-3 h-5 w-5 text-[#FFEB3B]" />
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center text-white" style={pixelFont}>
                    <MapPin className="mr-3 h-5 w-5 text-[#FFEB3B]" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-[#FFEB3B]" style={pixelFont}>
                    <DollarSign className="mr-3 h-5 w-5" />
                    {event.price}
                  </div>
                </div>

                <Link
                  href={`/events/${event.id}`}
                  className={`
                    block w-full text-center py-3 
                    ${pixelBorder} bg-[#FFEB3B] text-black 
                    hover:bg-[#FDD835] text-xl transition-all
                    hover:shadow-[6px_6px_0_0_#000000]
                  `}
                  style={pixelFont}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
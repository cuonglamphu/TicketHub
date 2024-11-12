'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
const pixelFont = { fontFamily: "'VT323', monospace" };

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-[#FFEB3B]" style={pixelFont}>
        Discover Events
      </h1>

      {/* Search and Filter Section */}
      <div className={`bg-[#4CAF50] p-6 mb-8 ${pixelBorder}`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                className={`w-full px-4 py-2 pr-10 bg-white text-black rounded ${pixelBorder}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 ${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] flex items-center gap-2`}
            style={pixelFont}
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-2 bg-white text-black rounded ${pixelBorder}`}
              style={pixelFont}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* City Filter */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className={`px-4 py-2 bg-white text-black rounded ${pixelBorder}`}
              style={pixelFont}
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className={`px-4 py-2 bg-white text-black rounded ${pixelBorder}`}
              style={pixelFont}
            >
              {prices.map(price => (
                <option key={price} value={price}>{price}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className={`bg-[#4CAF50] ${pixelBorder} transform transition-all duration-300 hover:scale-105`}>
            <div className="relative h-60">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-fit"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-[#FFEB3B] mb-2" style={pixelFont}>
                {event.title}
              </h3>
              <div className="space-y-2 text-white" style={pixelFont}>
                <p>{event.category}</p>
                <p>{event.date} at {event.time}</p>
                <p>{event.location}</p>
                <p className="text-[#FFEB3B]">${event.price}</p>
              </div>
              <Link
                href={`/events/${event.id}`}
                className={`block mt-4 text-center py-2 ${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835]`}
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
'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Music, MapPin, Calendar, DollarSign } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Event } from '@/types/event';
import { Category } from '@/types/category';
import { eventService } from '@/services/eventService';
import { categoryService } from '@/services/categoryService';
import { pixelBorder, pixelFont } from '@/lib/utils';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';

const cities = ["All Cities", "Ho Chi Minh", "Hanoi", "Da Nang"];
const prices = ["All Prices", "Under $50", "$50-$100", "Over $100"];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [eventsData, categoriesData] = await Promise.all([
        eventService.getAll(),
        categoryService.getAll()
      ]);
      setEvents(eventsData);
      setCategories(categoriesData as Category[]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.eveName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.eveCity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.catId.toString() === selectedCategory;
    const matchesCity = selectedCity === 'All Cities' || event.eveCity === selectedCity;
    return matchesSearch && matchesCategory && matchesCity;
  });

  if (loading) {
    return <div>Loading...</div>; // You can create a proper loading component
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#4CAF50]/10 rounded-full blur-3xl -top-48 -left-48" />
        <div className="absolute w-96 h-96 bg-[#FFEB3B]/10 rounded-full blur-3xl -bottom-48 -right-48" />
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
                  className={`w-full px-4 py-3 pr-10 bg-white text-black rounded-xl ${pixelBorder}`}
                  style={pixelFont}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 ${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835]`}
              style={pixelFont}
            >
              <Filter className="w-5 h-5 inline-block mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-4 py-3 bg-white text-black rounded-xl ${pixelBorder}`}
                style={pixelFont}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.catId} value={category.catId.toString()}>
                    {category.catName}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className={`px-4 py-3 bg-white text-black rounded-xl ${pixelBorder}`}
                style={pixelFont}
              >
                <option value="All Cities">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className={`px-4 py-3 bg-white text-black rounded-xl ${pixelBorder}`}
                style={pixelFont}
              >
                <option value="All Prices">All Prices</option>
                {prices.map(price => (
                  <option key={price} value={price}>{price}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Events Grid with enhanced cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div 
              key={event.eveId} 
              className={`
                bg-gradient-to-br from-[#4CAF50] to-[#388E3C] 
                ${pixelBorder}
                transform transition-all duration-300 hover:scale-105
                hover:shadow-[0_0_20px_rgba(76,175,80,0.3)]
                relative overflow-hidden
              `}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#FFEB3B]" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#FFEB3B]" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#FFEB3B]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#FFEB3B]" />

              <div className="relative h-60 group">
                <ImageWithFallback
                  src={event.eveThumb}
                  alt={event.eveName}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" 
                />
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6 relative">
                {/* Decorative line */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-[#FFEB3B]/30" />

                <h3 className="text-2xl font-bold text-[#FFEB3B] mb-4 hover:text-white transition-colors duration-300" style={pixelFont}>
                  {event.eveName}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-white/90 hover:text-white transition-colors duration-200" style={pixelFont}>
                    <Music className="mr-3 h-5 w-5 text-[#FFEB3B] animate-pulse" />
                    {event.category?.catName}
                  </div>
                  <div className="flex items-center text-white/90 hover:text-white transition-colors duration-200" style={pixelFont}>
                    <Calendar className="mr-3 h-5 w-5 text-[#FFEB3B]" />
                    {new Date(event.eveTimestart).toLocaleString()}
                  </div>
                  <div className="flex items-center text-white/90 hover:text-white transition-colors duration-200" style={pixelFont}>
                    <MapPin className="mr-3 h-5 w-5 text-[#FFEB3B]" />
                    {event.eveCity}
                  </div>
                </div>

                <Link
                  href={`/events/${event.eveId}`}
                  className={`
                    block w-full text-center py-3 
                    ${pixelBorder} 
                    bg-[#FFEB3B] text-black
                    hover:bg-[#FDD835] 
                    transition-all duration-300
                    hover:shadow-[0_0_15px_rgba(255,235,59,0.5)]
                    relative overflow-hidden
                    group
                  `}
                  style={pixelFont}
                >
                  <span className="relative z-10">View Details</span>
                  {/* Button hover effect */}
                  <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
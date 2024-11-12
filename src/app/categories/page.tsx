'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Music, Gamepad2, Palette, Utensils } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  eventCount: number;
}

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" };

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Mock data - replace with API call
    setCategories([
      {
        id: 1,
        name: 'Music',
        description: 'Live concerts, festivals, and musical performances',
        image: 'https://salt.tkbcdn.com/ts/ds/ab/c3/34/a0da8994fb4ab5117ae208039cd261ae.png',
        eventCount: 12
      },
      {
        id: 2,
        name: 'Sports',
        description: 'Sports events, tournaments, and competitions',
        image: 'https://salt.tkbcdn.com/ts/ds/cd/5e/61/df391f3476fbdae8ae9026dba07c8ad6.png',
        eventCount: 8
      },
      {
        id: 3,
        name: 'Arts & Theater',
        description: 'Art exhibitions, theater shows, and cultural events',
        image: 'https://salt.tkbcdn.com/ts/ds/5d/3b/5c/006fb1fd95e2d66dcf737569f6be23c9.jpg',
        eventCount: 15
      },
      {
        id: 4,
        name: 'Food & Drinks',
        description: 'Food festivals, wine tastings, and culinary events',
        image: 'https://salt.tkbcdn.com/ts/ds/de/fd/9b/8f4fd89066ec3447a0ddd21995e44bf2.png',
        eventCount: 6
      }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 md:w-96 h-64 md:h-96 bg-[#4CAF50]/10 rounded-full blur-3xl -top-32 -left-32" />
        <div className="absolute w-64 md:w-96 h-64 md:h-96 bg-[#FFEB3B]/10 rounded-full blur-3xl -bottom-32 -right-32" />
      </div>

      {/* Pixel art decorations - Hide on mobile */}
      <div className="hidden md:block absolute top-20 right-20 w-16 h-16 animate-bounce">
        <div className="w-full h-full bg-[#FFEB3B] rotate-45 transform" style={{boxShadow: '4px 4px 0 0 #000000'}} />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-block relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFEB3B] mb-4 break-words" 
                style={pixelFont}>
              Event Categories
            </h1>
            <div className="h-1 md:h-2 bg-[#FFEB3B] w-full mx-auto" 
                 style={{boxShadow: '2px 2px 0 0 #000000'}} />
          </div>
          <p className="text-white/80 mt-4 md:mt-6 text-base md:text-xl px-4" 
             style={pixelFont}>
            Find the perfect event that matches your interests
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8">
          {categories.map((category) => (
            <Link 
              href={`/categories/${category.id}`}
              key={category.id}
              className={`
                group bg-gradient-to-br from-[#4CAF50] to-[#388E3C]
                ${pixelBorder} 
                transform hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300
                hover:shadow-[4px_4px_0_0_#000000] md:hover:shadow-[8px_8px_0_0_#000000]
              `}
            >
              {/* Image Container */}
              <div className="relative h-36 md:h-48 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110 duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#388E3C] via-transparent to-transparent" />
                
                {/* Category Icon */}
                <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-[#FFEB3B] p-1.5 md:p-2 rounded-lg shadow-lg">
                  {category.name === 'Music' && <Music className="w-4 h-4 md:w-6 md:h-6 text-black" />}
                  {category.name === 'Sports' && <Gamepad2 className="w-4 h-4 md:w-6 md:h-6 text-black" />}
                  {category.name === 'Arts & Theater' && <Palette className="w-4 h-4 md:w-6 md:h-6 text-black" />}
                  {category.name === 'Food & Drinks' && <Utensils className="w-4 h-4 md:w-6 md:h-6 text-black" />}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <h3 className="text-xl md:text-2xl font-bold text-[#FFEB3B]" style={pixelFont}>
                    {category.name}
                  </h3>
                  <span className="px-2 md:px-3 py-0.5 md:py-1 bg-[#FFEB3B] text-black rounded-full text-xs md:text-sm" 
                        style={pixelFont}>
                    {category.eventCount} Events
                  </span>
                </div>
                
                <p className="text-white/90 mb-3 md:mb-4 text-xs md:text-base" style={pixelFont}>
                  {category.description}
                </p>

                <div className="flex items-center text-[#FFEB3B] text-sm md:text-base group-hover:translate-x-2 transition-transform" 
                     style={pixelFont}>
                  Explore Events
                  <ArrowRight className="ml-1 md:ml-2 w-3 h-3 md:w-4 md:h-4 animate-pulse" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 
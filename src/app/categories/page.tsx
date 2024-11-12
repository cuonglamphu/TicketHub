'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  eventCount: number;
}

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
const pixelFont = { fontFamily: "'VT323', monospace" };

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-[#FFEB3B]" style={pixelFont}>
        Discover Events by Category
      </h1>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link 
            href={`/categories/${category.id}`}
            key={category.id}
            className={`group relative overflow-hidden ${pixelBorder} transition-transform hover:scale-105`}
          >
            {/* Background Image with Overlay */}
            <div className="relative h-64">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-[#FFEB3B]" style={pixelFont}>
                  {category.name}
                </h3>
                <span className="text-white px-3 py-1 rounded-full bg-[#4CAF50]" style={pixelFont}>
                  {category.eventCount} Events
                </span>
              </div>
              
              <p className="text-white mb-4" style={pixelFont}>
                {category.description}
              </p>

              <div className="flex items-center text-[#FFEB3B] group-hover:translate-x-2 transition-transform" style={pixelFont}>
                Explore Events
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 
'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";

export default function EventDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Image Skeleton */}
          <div className={`relative h-[400px] ${pixelBorder} overflow-hidden bg-[#4CAF50]/20`}>
            <Skeleton className="w-full h-full bg-[#FFEB3B]/20" />
          </div>

          {/* Event Info Skeleton */}
          <div className={`bg-[#4CAF50]/20 p-6 ${pixelBorder}`}>
            <div className="flex justify-between items-start mb-4">
              <Skeleton className="h-10 w-64 bg-[#FFEB3B]/20" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10 bg-[#FFEB3B]/20" />
                <Skeleton className="h-10 w-10 bg-[#FFEB3B]/20" />
              </div>
            </div>

            <div className="space-y-4">
              {[Calendar, Clock, MapPin, Ticket].map((Icon, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-[#FFEB3B]/20" />
                  <Skeleton className="h-6 w-32 bg-[#FFEB3B]/20" />
                </div>
              ))}
            </div>
          </div>

          {/* Description Skeleton */}
          <div className={`bg-[#4CAF50]/20 p-6 ${pixelBorder}`}>
            <Skeleton className="h-8 w-48 mb-4 bg-[#FFEB3B]/20" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-[#FFEB3B]/20" />
              <Skeleton className="h-4 w-full bg-[#FFEB3B]/20" />
              <Skeleton className="h-4 w-3/4 bg-[#FFEB3B]/20" />
            </div>
          </div>

          {/* Gallery Skeleton */}
          <div className={`bg-[#4CAF50]/20 p-6 ${pixelBorder}`}>
            <Skeleton className="h-8 w-48 mb-4 bg-[#FFEB3B]/20" />
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((index) => (
                <Skeleton key={index} className="h-32 bg-[#FFEB3B]/20" />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Buy Tickets Card Skeleton */}
          <div className={`bg-[#4CAF50]/20 p-6 ${pixelBorder} sticky top-4`}>
            <Skeleton className="h-8 w-48 mb-4 bg-[#FFEB3B]/20" />
            <Skeleton className="h-4 w-full mb-4 bg-[#FFEB3B]/20" />
            <Skeleton className="h-12 w-full bg-[#FFEB3B]/20" />
          </div>

          {/* Organizer Info Skeleton */}
          <div className={`bg-[#4CAF50]/20 p-6 ${pixelBorder}`}>
            <Skeleton className="h-8 w-48 mb-4 bg-[#FFEB3B]/20" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-32 bg-[#FFEB3B]/20" />
              <Skeleton className="h-4 w-full bg-[#FFEB3B]/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
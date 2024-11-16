'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { Search } from 'lucide-react';

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";

export default function EventsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#4CAF50]/10 rounded-full blur-3xl -top-48 -left-48" />
        <div className="absolute w-96 h-96 bg-[#FFEB3B]/10 rounded-full blur-3xl -bottom-48 -right-48" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-12">
          <div className="relative">
            <Skeleton className="h-12 w-64 bg-[#FFEB3B]/20 mb-2" />
            <Skeleton className="h-2 w-48 bg-[#FFEB3B]/20" />
          </div>
        </div>

        {/* Search and Filter Section skeleton */}
        <div className={`bg-gradient-to-br from-[#4CAF50] to-[#388E3C] p-6 mb-8 ${pixelBorder}`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Skeleton className="w-full h-12 bg-[#FFEB3B]/20" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500/20" />
              </div>
            </div>
            <Skeleton className="h-12 w-32 bg-[#FFEB3B]/20" />
          </div>
        </div>

        {/* Events Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br from-[#4CAF50] to-[#388E3C] ${pixelBorder}`}
            >
              <Skeleton className="w-full h-60 bg-[#FFEB3B]/20" />
              <div className="p-6">
                <Skeleton className="h-8 w-3/4 bg-[#FFEB3B]/20 mb-4" />
                <div className="space-y-3 mb-6">
                  <Skeleton className="h-6 w-1/2 bg-[#FFEB3B]/20" />
                  <Skeleton className="h-6 w-2/3 bg-[#FFEB3B]/20" />
                  <Skeleton className="h-6 w-1/2 bg-[#FFEB3B]/20" />
                  <Skeleton className="h-6 w-1/4 bg-[#FFEB3B]/20" />
                </div>
                <Skeleton className="h-12 w-full bg-[#FFEB3B]/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
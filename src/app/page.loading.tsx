'use client';

import { Skeleton } from "@/components/ui/skeleton";
const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";

export default function HomeLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#8BC34A]">
      <main className="flex-grow">
        {/* Hot Event Carousel Skeleton */}
        <div className="relative w-full h-[500px] bg-[#4CAF50]/20">
          <Skeleton className="w-full h-full bg-[#FFEB3B]/20" />
          {/* Carousel Controls */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Skeleton className="h-12 w-12 rounded-full bg-[#FFEB3B]/20 mx-4" />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Skeleton className="h-12 w-12 rounded-full bg-[#FFEB3B]/20 mx-4" />
          </div>
          {/* Carousel Info */}
          <div className="absolute bottom-8 left-8 right-8">
            <Skeleton className="h-10 w-1/3 mb-4 bg-[#FFEB3B]/20" />
            <Skeleton className="h-6 w-1/4 bg-[#FFEB3B]/20" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search Section */}
          <Skeleton className="h-12 w-96 mx-auto mb-8 bg-[#FFEB3B]/20" />
          
          {/* Search Filters */}
          <div className={`bg-[#4CAF50]/20 p-6 mb-12 ${pixelBorder}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-1 md:col-span-2">
                <Skeleton className="h-12 w-full bg-[#FFEB3B]/20" />
              </div>
              {[1, 2].map((index) => (
                <Skeleton key={index} className="h-12 w-full bg-[#FFEB3B]/20" />
              ))}
              <Skeleton className="h-12 w-full bg-[#FFEB3B]/20" />
            </div>
          </div>

          {/* Recommended Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div key={index} className={`bg-[#4CAF50]/20 ${pixelBorder} overflow-hidden`}>
                <Skeleton className="w-full h-48 bg-[#FFEB3B]/20" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2 bg-[#FFEB3B]/20" />
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 bg-[#FFEB3B]/20" />
                      <Skeleton className="h-4 w-24 bg-[#FFEB3B]/20" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 bg-[#FFEB3B]/20" />
                      <Skeleton className="h-4 w-32 bg-[#FFEB3B]/20" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-10 flex-1 bg-[#FFEB3B]/20" />
                    <Skeleton className="h-10 flex-1 bg-[#FFEB3B]/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 
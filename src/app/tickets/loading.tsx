'use client';

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";

export default function TicketsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-12">
          <div className="relative">
            <Skeleton className="h-12 w-48 bg-[#FFEB3B]/20" />
            <Skeleton className="h-2 w-32 mt-2 bg-[#FFEB3B]/20" />
          </div>
          <Skeleton className="h-8 w-32 bg-[#FFEB3B]/20 hidden md:block" />
        </div>

        {/* Tickets grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((index) => (
            <Card 
              key={index}
              className={`bg-[#4CAF50]/20 ${pixelBorder}`}
            >
              <Skeleton className="w-full h-48 bg-[#FFEB3B]/20" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-8 w-3/4 bg-[#FFEB3B]/20" />
                <div className="space-y-3">
                  <Skeleton className="h-6 w-full bg-[#FFEB3B]/20" />
                  <Skeleton className="h-6 w-full bg-[#FFEB3B]/20" />
                  <Skeleton className="h-6 w-1/2 bg-[#FFEB3B]/20" />
                </div>
                <Skeleton className="h-12 w-full mt-4 bg-[#FFEB3B]/20" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 
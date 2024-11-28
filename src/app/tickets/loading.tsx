'use client';

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";

export default function TicketsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 bg-[#4CAF50]/20 rounded-full blur-3xl -top-32 -left-32" />
        <div className="absolute w-64 h-64 bg-[#FFEB3B]/20 rounded-full blur-3xl -bottom-32 -right-32" />
      </div>

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
              className={`
                bg-gradient-to-br from-[#4CAF50]/20 to-[#388E3C]/20 
                ${pixelBorder}
                animate-pulse
              `}
            >
              <Skeleton className="w-full h-48 bg-[#FFEB3B]/10" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-8 w-3/4 bg-[#FFEB3B]/10" />
                <div className="space-y-3">
                  <Skeleton className="h-6 w-full bg-[#FFEB3B]/10" />
                  <Skeleton className="h-6 w-full bg-[#FFEB3B]/10" />
                  <Skeleton className="h-6 w-1/2 bg-[#FFEB3B]/10" />
                </div>
                <Skeleton className="h-12 w-full mt-4 bg-[#FFEB3B]/10" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 
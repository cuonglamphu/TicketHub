'use client';

import { Skeleton } from "@/components/ui/skeleton";

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";

export default function CategoriesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 md:w-96 h-64 md:h-96 bg-[#4CAF50]/10 rounded-full blur-3xl -top-32 -left-32" />
        <div className="absolute w-64 md:w-96 h-64 md:h-96 bg-[#FFEB3B]/10 rounded-full blur-3xl -bottom-32 -right-32" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Header Section skeleton */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-block relative">
            <Skeleton className="h-16 w-64 md:w-96 bg-[#FFEB3B]/20 mb-4" />
            <Skeleton className="h-2 w-48 md:w-64 bg-[#FFEB3B]/20 mx-auto" />
          </div>
          <Skeleton className="h-8 w-3/4 md:w-1/2 bg-[#FFEB3B]/20 mt-4 mx-auto" />
        </div>

        {/* Categories Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8">
          {[1, 2, 3, 4].map((index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br from-[#4CAF50] to-[#388E3C] ${pixelBorder}`}
            >
              <Skeleton className="h-36 md:h-48 w-full bg-[#FFEB3B]/20" />
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <Skeleton className="h-8 w-24 bg-[#FFEB3B]/20" />
                  <Skeleton className="h-6 w-20 bg-[#FFEB3B]/20" />
                </div>
                <Skeleton className="h-16 w-full bg-[#FFEB3B]/20 mb-3" />
                <Skeleton className="h-6 w-32 bg-[#FFEB3B]/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
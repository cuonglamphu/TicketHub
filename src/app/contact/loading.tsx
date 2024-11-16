'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Phone, MapPin } from 'lucide-react';

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";

export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 bg-[#4CAF50]/20 rounded-full blur-3xl -top-32 -left-32" />
        <div className="absolute w-64 h-64 bg-[#FFEB3B]/20 rounded-full blur-3xl -bottom-32 -right-32" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header skeleton */}
        <Skeleton className="h-12 w-48 mb-8 bg-[#FFEB3B]/20" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Contact Information Skeleton */}
          <div className={`bg-[#4CAF50]/20 p-6 ${pixelBorder}`}>
            <Skeleton className="h-8 w-48 mb-6 bg-[#FFEB3B]/20" />

            <div className="space-y-6">
              {[Phone, Mail, MapPin].map((Icon, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-[#FFEB3B]/20 p-3 rounded-full">
                    <Icon className="w-6 h-6 text-[#FFEB3B]/20" />
                  </div>
                  <div>
                    <Skeleton className="h-5 w-24 mb-1 bg-[#FFEB3B]/20" />
                    <Skeleton className="h-4 w-40 bg-[#FFEB3B]/20" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form Skeleton */}
          <div className={`bg-[#4CAF50]/20 p-6 ${pixelBorder}`}>
            <Skeleton className="h-8 w-48 mb-6 bg-[#FFEB3B]/20" />

            <div className="space-y-4">
              {/* Name, Email, Subject Fields */}
              {['Full Name', 'Email', 'Subject'].map((_, index) => (
                <div key={index}>
                  <Skeleton className="h-5 w-24 mb-2 bg-[#FFEB3B]/20" />
                  <Skeleton className={`w-full h-10 bg-[#FFEB3B]/20 ${pixelBorder}`} />
                </div>
              ))}

              {/* Message Field */}
              <div>
                <Skeleton className="h-5 w-24 mb-2 bg-[#FFEB3B]/20" />
                <Skeleton className={`w-full h-32 bg-[#FFEB3B]/20 ${pixelBorder}`} />
              </div>

              {/* Submit Button */}
              <Skeleton className={`h-12 w-full bg-[#FFEB3B]/20 mt-4 ${pixelBorder}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

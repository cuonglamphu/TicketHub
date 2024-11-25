'use client';

import { Skeleton } from "@/components/ui/skeleton";

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";

const PROFILE_ITEMS = [
  { id: 'profile-email', label: 'Email' },
  { id: 'profile-fullName', label: 'Full Name' },
  { id: 'profile-phone', label: 'Phone' }
];

const PASSWORD_ITEMS = [
  { id: 'password-current', label: 'Current Password' },
  { id: 'password-new', label: 'New Password' },
  { id: 'password-confirm', label: 'Confirm Password' }
];

export default function AccountLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-12 w-64 mb-8 bg-[#FFEB3B]/20" />

      <div className={`bg-[#4CAF50]/20 p-6 mb-8 ${pixelBorder}`}>
        <Skeleton className="h-8 w-48 mb-6 bg-[#FFEB3B]/20" />
        
        <div className="space-y-6">
          {PROFILE_ITEMS.map((item) => (
            <div key={item.id}>
              <Skeleton className="h-6 w-24 mb-2 bg-[#FFEB3B]/20" />
              <Skeleton className="h-10 w-full bg-[#FFEB3B]/20" />
            </div>
          ))}
          <Skeleton className="h-12 w-32 bg-[#FFEB3B]/20" />
        </div>
      </div>

      <div className={`bg-[#4CAF50]/20 p-6 ${pixelBorder}`}>
        <Skeleton className="h-8 w-48 mb-6 bg-[#FFEB3B]/20" />
        
        <div className="space-y-6">
          {PASSWORD_ITEMS.map((item) => (
            <div key={item.id}>
              <Skeleton className="h-6 w-24 mb-2 bg-[#FFEB3B]/20" />
              <Skeleton className="h-10 w-full bg-[#FFEB3B]/20" />
            </div>
          ))}
          <Skeleton className="h-12 w-48 bg-[#FFEB3B]/20" />
        </div>
      </div>
    </div>
  );
} 
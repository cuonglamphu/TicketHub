'use client';

import { Navbar } from "@/components/layout/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser } from "@/utils/auth";

export default function TicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const user = getStoredUser();
    if (!user) {
      router.push('/');
    }
  },);

  return (
    <div className="min-h-screen flex flex-col bg-[#8BC34A]">
      <Navbar 
        onSignInClick={() => router.push('/')} 
        onSignUpClick={() => router.push('/')} 
        onSignOutClick={() => {
          localStorage.removeItem('user');
          router.push('/');
        }} 
      />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}

'use client';

import { Navbar } from "@/components/layout/Navbar";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { useRouter } from "next/navigation";

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

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
      <CategoryNav />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
} 
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { useRouter } from "next/navigation";

export default function CategoriesLayout({
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
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
} 
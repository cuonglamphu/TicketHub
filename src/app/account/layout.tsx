'use client';

import { Navbar } from "@/components/layout/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser } from "@/utils/auth";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const user = getStoredUser();
    if (!user) {
      router.push('/');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return null;
  }

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
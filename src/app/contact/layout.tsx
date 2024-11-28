'use client';

import { Navbar } from "@/components/layout/Navbar";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function ContactLayout({
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
      <footer className="bg-[#4CAF50] text-white relative overflow-hidden">
        {/* Large Centered GIF in Footer */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-5 pointer-events-none">
          <Image 
            src="/vinhan.gif" 
            alt="Pixel decoration" 
            width={500} 
            height={500} 
            className="pixel-perfect animate-slow-spin"
          />
        </div>

        {/* Footer Content */}
        <div className="container mx-auto px-4">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 relative">
            {/* About Section */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-pixel text-[#FFEB3B] mb-4">About PixelTix</h3>
              <p className="font-pixel text-base md:text-lg text-white/90">
                Your ultimate destination for discovering and booking amazing events. Join us in creating unforgettable experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-pixel text-[#FFEB3B] mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {['Events', 'Categories', 'Venues', 'Blog'].map((link) => (
                  <li key={link}>
                    <button className="font-pixel text-base md:text-lg text-white/90 hover:text-[#FFEB3B] transition-colors duration-200
                                     flex items-center gap-2 group">
                      <span className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all text-xl">
                        ▶
                      </span>
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-pixel text-[#FFEB3B] mb-4">Support</h3>
              <ul className="space-y-3">
                {['Help Center', 'Contact Us', 'FAQs', 'Terms of Service'].map((link) => (
                  <li key={link}>
                    <button className="font-pixel text-base md:text-lg text-white/90 hover:text-[#FFEB3B] transition-colors duration-200
                                     flex items-center gap-2 group">
                      <span className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all text-xl">
                        ▶
                      </span>
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-pixel text-[#FFEB3B] mb-4">Connect</h3>
              <div className="flex gap-4">
                {[
                  { icon: "👾", label: "Discord" },
                  { icon: "🐦", label: "Twitter" },
                  { icon: "📸", label: "Instagram" },
                  { icon: "📘", label: "Facebook" }
                ].map((social) => (
                  <button
                    key={social.label}
                    className="w-12 h-12 bg-[#FFEB3B] rounded-none border-4 border-black 
                             shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                             hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                             transform hover:translate-x-[2px] hover:translate-y-[2px]
                             transition-all duration-75
                             flex items-center justify-center
                             group relative"
                    aria-label={social.label}
                  >
                    <span className="text-2xl group-hover:animate-bounce text-black">{social.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute left-0 w-full h-[4px] bg-black"></div>
          </div>

          {/* Bottom Section */}
          <div className="py-6 relative">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🎮</span>
                <span className="font-pixel text-[#FFEB3B] text-2xl md:text-3xl">PixelTix</span>
              </div>
              
              <p className="font-pixel text-base md:text-lg text-white/90 text-center md:text-right">
                © 2024 PixelTix. All rights reserved. 
                <span className="inline-block animate-pulse mx-2">|</span> 
                Made with <span className="text-[#F44336] text-xl">♥</span> by PixelTix Team
              </p>
            </div>
          </div>
        </div>

        {/* Pixel Art Border Top */}
        <div className="absolute top-0 left-0 w-full h-[4px] border-t-4 border-black"></div>
        <div className="absolute bottom-0 left-0 w-full h-[4px] border-b-4 border-black"></div>
      </footer>
    </div>
    
  );
} 
'use client';

import Link from 'next/link'
import { ChevronDown, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getStoredUser } from '@/utils/auth'
import { useEffect } from 'react';
import { useState } from 'react';

interface User {
  firstName: string;
  id?: string;
  email?: string;
}

interface NavbarProps {
  onSignInClick: () => void
  onSignUpClick: () => void
  onSignOutClick: () => void
}

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]"
const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" }

export function Navbar({ onSignInClick, onSignUpClick, onSignOutClick }: NavbarProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser(getStoredUser())
  }, [])


  return (
        <nav className={`bg-[#4CAF50] text-white py-4 ${pixelBorder}`}>
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="text-3xl font-bold" style={pixelFont}>PixelTix</Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/" className="hover:text-[#FFEB3B] transition-colors duration-200" style={pixelFont}>Home</Link>
              <Link href="/events" className="hover:text-[#FFEB3B] transition-colors duration-200" style={pixelFont}>Events</Link>
              <Link href="/categories" className="hover:text-[#FFEB3B] transition-colors duration-200" style={pixelFont}>Categories</Link>
              <Link href="/contact" className="hover:text-[#FFEB3B] transition-colors duration-200" style={pixelFont}>Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <><p>hi {user?.firstName} !</p>
              {/* hidden in mobile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className={`${pixelBorder} bg-white text-black hover:bg-[#FDD835] text-xl hidden md:block`} style={pixelFont}>
                    {/* Arrow down icon */}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={`${pixelBorder} bg-[#4CAF50]`}>
                  <DropdownMenuItem>
                    <Link href="/tickets" className="text-white hover:text-[#FFEB3B] text-xl" style={pixelFont}>My Tickets</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/account" className="text-white hover:text-[#FFEB3B] text-xl" style={pixelFont}>Account Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button onClick={onSignOutClick} variant="outline" className={`${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] text-xl`} style={pixelFont}>
                      Sign Out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu></>
              ) : (
                <>
              <Button onClick={onSignUpClick} className={`${pixelBorder} bg-[#F44336] text-white hover:bg-[#D32F2F] text-xl`} style={pixelFont}>
                    Sign Up
                  </Button>
                </>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className={`md:hidden ${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835]`}>
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={`${pixelBorder} bg-[#4CAF50]`}>
                  <DropdownMenuItem>
                    <Link href="/" className="text-white hover:text-[#FFEB3B] text-xl" style={pixelFont}>Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/events" className="text-white hover:text-[#FFEB3B] text-xl" style={pixelFont}>Events</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/categories" className="text-white hover:text-[#FFEB3B] text-xl" style={pixelFont}>Categories</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/contact" className="text-white hover:text-[#FFEB3B] text-xl" style={pixelFont}>Contact</Link>
                  </DropdownMenuItem>
                  <Button onClick={onSignInClick} variant="outline" className={`${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] `} style={pixelFont}>
                    Sign In
                  </Button>
                  {user && (
                    <>
                  <DropdownMenuItem>
                    <Link href="/tickets" className="text-white hover:text-[#FFEB3B] text-xl" style={pixelFont}>My Tickets</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/account" className="text-white hover:text-[#FFEB3B] text-xl" style={pixelFont}>Account Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button onClick={onSignOutClick} variant="outline" className={`${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] text-xl`} style={pixelFont}>Log Out</Button>
                  </DropdownMenuItem>
                  </>
                   
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
  )
} 

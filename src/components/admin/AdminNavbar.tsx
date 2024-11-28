'use client';

import { useState } from "react";
import { Menu, Bell, User, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { pixelBorder, pixelFont } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface AdminNavbarProps {
  onMenuClick?: () => void;
}

export function AdminNavbar({ onMenuClick }: AdminNavbarProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <nav className="bg-[#4CAF50] border-b-4 border-black">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-[#FFEB3B] hover:bg-[#388E3C]"
              onClick={onMenuClick}
            >
              <Menu className="h-6 w-6" />
            </Button>

            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search..."
                className={`pl-10 w-[300px] ${pixelBorder} bg-white`}
              />
            </div>
          </div>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[#FFEB3B] hover:bg-[#388E3C]"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            <Search className="h-6 w-6" />
          </Button>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-[#FFEB3B] hover:bg-[#388E3C]"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={`${pixelBorder} bg-[#4CAF50]`}>
                <DropdownMenuLabel className="text-[#FFEB3B]" style={pixelFont}>
                  Notifications
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-white">New order received</DropdownMenuItem>
                <DropdownMenuItem className="text-white">System update available</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative text-[#FFEB3B] hover:bg-[#388E3C]">
                    <User className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={`${pixelBorder} bg-[#4CAF50]`}>
                <DropdownMenuLabel className="text-[#FFEB3B]" style={pixelFont}>
                  Admin Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-white">Profile</DropdownMenuItem>
                <DropdownMenuItem className="text-white">Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-white">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchVisible && (
          <div className="mt-3 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search..."
                className={`pl-10 w-full ${pixelBorder} bg-white`}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 
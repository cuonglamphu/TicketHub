'use client';

import { UserCircle, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" };

export function AdminNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <nav className={`bg-[#4CAF50] text-white py-4 ${pixelBorder}`}>
      <div className="px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#FFEB3B]" style={pixelFont}>
          Admin Dashboard
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <UserCircle className="h-6 w-6 text-[#FFEB3B]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={`${pixelBorder} bg-[#4CAF50]`}>
            <DropdownMenuItem onClick={handleLogout} className="text-white cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span style={pixelFont}>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
} 
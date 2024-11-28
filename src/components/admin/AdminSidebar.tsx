'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Ticket, 
  Calendar, 
  Users, 
  Settings,
  DollarSign,
  Tags,
  ChevronLeft,
  LogOut
} from "lucide-react";
import { cn, pixelFont } from "@/lib/utils";
import { Button } from "../ui/button";
import Image from "next/image";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Calendar, label: "Events", href: "/admin/events" },
  { icon: Ticket, label: "Tickets", href: "/admin/tickets" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: DollarSign, label: "Sales", href: "/admin/sales" },
  { icon: Tags, label: "Categories", href: "/admin/categories" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div 
      className={cn(
        "relative flex flex-col bg-[#4CAF50] border-r-4 border-black transition-all duration-300",
        isCollapsed ? "w-[80px]" : "w-[250px]"
      )}
    >
      {/* Logo Section */}
      <div className="p-4 flex justify-center items-center border-b-4 border-black">
        <Image
          src="/micle.gif"
          alt="Logo"
          width={isCollapsed ? 40 : 120}
          height={isCollapsed ? 40 : 40}
          className="transition-all duration-300"
        />
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 bg-[#FFEB3B] hover:bg-[#FDD835] text-black rounded-full w-6 h-6"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ChevronLeft className={cn(
          "h-4 w-4 transition-transform",
          isCollapsed && "rotate-180"
        )} />
      </Button>

      {/* Navigation Links */}
      <div className="flex-1 py-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <span className={cn(
                "flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors",
                "hover:bg-[#45a049] group cursor-pointer",
                isActive && "bg-[#388E3C]"
              )}>
                <item.icon className={cn(
                  "h-5 w-5",
                  isActive ? "text-[#FFEB3B]" : "text-white group-hover:text-[#FFEB3B]"
                )} />
                {!isCollapsed && (
                  <span className={cn(
                    "text-sm font-medium",
                    isActive ? "text-[#FFEB3B]" : "text-white group-hover:text-[#FFEB3B]"
                  )} style={pixelFont}>
                    {item.label}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t-4 border-black">
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center gap-3 text-white hover:text-[#FFEB3B] hover:bg-[#45a049]",
            !isCollapsed && "justify-start"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && (
            <span style={pixelFont}>Logout</span>
          )}
        </Button>
      </div>
    </div>
  );
} 
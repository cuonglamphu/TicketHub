'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Tag, 
  Calendar, 
  Ticket, 
  Users, 
  BarChart 
} from 'lucide-react';

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" };

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Categories', href: '/admin/categories', icon: Tag },
  { name: 'Events', href: '/admin/events', icon: Calendar },
  { name: 'Tickets', href: '/admin/tickets', icon: Ticket },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Sales', href: '/admin/sales', icon: BarChart },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className={`hidden md:flex md:flex-col md:w-64 bg-[#388E3C] ${pixelBorder}`}>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-4 py-3 text-lg rounded-lg
                  ${isActive 
                    ? 'bg-[#4CAF50] text-[#FFEB3B]' 
                    : 'text-white hover:bg-[#4CAF50] hover:text-[#FFEB3B]'}
                  transition-colors duration-200
                `}
                style={pixelFont}
              >
                <item.icon className="mr-3 h-6 w-6" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 
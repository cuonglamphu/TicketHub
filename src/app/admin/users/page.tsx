'use client';

import { useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { Users } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { pixelBorder, pixelFont } from "@/lib/utils";
import { User } from '@/types/user';
import { UserForm } from '@/components/admin/UserForm';

export default function UsersPage() {
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);


  const sampleUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'User',
      joinDate: '2024-01-15',
      ticketsBought: 5,
      totalSpent: '$250',
    },
    // Add more sample users
  ];

  type Column<T> = {
    key: keyof T;
    label: string;
    sortable?: boolean;
  };

  const columns: Column<User>[] = [
    { key: 'name', label: 'Name', sortable: true } as const,
    { key: 'email', label: 'Email', sortable: true } as const,
    { key: 'role', label: 'Role', sortable: true } as const,
    { key: 'joinDate', label: 'Join Date', sortable: true } as const,
    { key: 'ticketsBought', label: 'Tickets', sortable: true } as const,
    { key: 'totalSpent', label: 'Total Spent', sortable: true } as const,
  ];

  const stats = [
    { label: 'Total Users', value: '1,234' },
    { label: 'Active Users', value: '892' },
    { label: 'New This Month', value: '45' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="h-8 w-8 text-[#FFEB3B]" />
          <h1 className="text-3xl font-bold text-[#FFEB3B]" style={pixelFont}>
            Users
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card 
            key={stat.label} 
            className={`p-6 ${pixelBorder} bg-[#4CAF50]`}
          >
            <h3 className="text-lg font-medium text-[#FFEB3B]" style={pixelFont}>
              {stat.label}
            </h3>
            <p className="text-3xl font-bold text-white mt-2" style={pixelFont}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      <DataTable<User>
        columns={columns}
        data={sampleUsers}
        onEdit={(user) => {
          setSelectedUser(user);
          setIsUserFormOpen(true);
        }}
        onDelete={(user) => {
          console.log('Delete user:', user);
        }}
      />

      <UserForm 
        isOpen={isUserFormOpen}
        onClose={() => setIsUserFormOpen(false)}
        user={selectedUser}
      />
    </div>
  );
} 
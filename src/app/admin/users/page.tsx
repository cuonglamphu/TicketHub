'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { Users } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { pixelBorder, pixelFont } from "@/lib/utils";
import { User } from '@/types/user';
import { UserForm } from '@/components/admin/UserForm';
import { userService } from '@/services/userService';
import { toast } from 'sonner';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData: Omit<User, 'userId'>) => {
    try {
      await userService.create(userData);
      toast.success('User created successfully');
      fetchUsers();
      setIsUserFormOpen(false);
    } catch (error) {
      toast.error('Failed to create user');
    }
  };

  const handleUpdateUser = async (id: number, userData: Partial<User>) => {
    try {
      await userService.update(id, userData);
      toast.success('User updated successfully');
      fetchUsers();
      setIsUserFormOpen(false);
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (window.confirm(`Are you sure you want to delete ${user.userName}?`)) {
      try {
        await userService.delete(user.userId);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  type Column = {
    key: keyof User;
    label: string;
    sortable?: boolean;
    formatter?: (value: any) => string;
  };
  
  const columns: Column[] = [
    { key: 'userName', label: 'Name', sortable: true },
    { key: 'userEmail', label: 'Email', sortable: true },
    { key: 'userRole', label: 'Role', sortable: true },
    { 
      key: 'userJoinDate', 
      label: 'Join Date', 
      sortable: true,
      formatter: (value: string) => new Date(value).toLocaleDateString()
    },
    { 
      key: 'totalTickets', 
      label: 'Tickets', 
      sortable: true,
      formatter: (value: number) => value.toString()
    },
    { 
      key: 'totalSpent', 
      label: 'Total Spent', 
      sortable: true,
      formatter: (value: number) => `$${value.toFixed(2)}`
    },
  ] as const;

  const stats = [
    { label: 'Total Users', value: users.length.toString() },
    { label: 'Active Users', value: users.filter(u => (u.totalTickets ?? 0) > 0).length.toString() },
    { label: 'New This Month', value: users.filter(u => {
      const joinDate = new Date(u.userJoinDate);
      const now = new Date();
      return joinDate.getMonth() === now.getMonth() && 
             joinDate.getFullYear() === now.getFullYear() &&
             joinDate <= now;
    }).length.toString() },
  ];

  if (loading) return <div>Loading...</div>;

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
        data={users}
        onEdit={(user) => {
          setSelectedUser(user);
          setIsUserFormOpen(true);
        }}
        onDelete={handleDeleteUser}
      />

      <UserForm 
        isOpen={isUserFormOpen}
        onClose={() => {
          setIsUserFormOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSubmit={selectedUser ? 
          (data) => handleUpdateUser(selectedUser.userId, data) : 
          handleCreateUser
        }
      />
    </div>
  );
} 
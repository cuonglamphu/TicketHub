'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { Users } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { pixelBorder, pixelFont } from "@/lib/utils";
import { User } from '@/types/user';
import { UserForm, UserFormData } from '@/components/admin/UserForm';
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
      console.error('Failed to fetch users', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (formData: UserFormData) => {
    try {
      const newUserData = {
        ...formData,
        userJoinDate: new Date().toISOString(),
        totalTickets: 0,
        totalSpent: 0,
        status: 'active',
        message: ''
      };
      await userService.create(newUserData);
      toast.success('User created successfully');
      fetchUsers();
      setIsUserFormOpen(false);
    } catch (error) {
      console.error('Failed to create user', error);
      toast.error('Failed to create user');
    }
  };

  const handleUpdateUser = async (id: number, formData: UserFormData) => {
    try {
      await userService.update(id, formData);
      toast.success('User updated successfully');
      fetchUsers();
      setIsUserFormOpen(false);
    } catch (error) {
      console.error('Failed to update user', error);
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
        console.error('Failed to delete user', error);
        toast.error('Failed to delete user');
      }
    }
  };

  type Column<T> = {
    key: keyof T;
    label: string;
    sortable?: boolean;
    formatter?: (value: string | number | boolean | undefined) => string;
  };
  
  const columns: Column<User>[] = [
    { 
      key: 'userName', 
      label: 'Name', 
      sortable: true,
      formatter: (value: string | number | boolean | undefined) => String(value)
    },
    { 
      key: 'userEmail', 
      label: 'Email', 
      sortable: true,
      formatter: (value: string | number | boolean | undefined) => String(value)
    },
    { 
      key: 'userRole', 
      label: 'Role', 
      sortable: true,
      formatter: (value: string | number | boolean | undefined) => String(value)
    },
    { 
      key: 'userJoinDate', 
      label: 'Join Date', 
      sortable: true,
      formatter: (value: string | number | boolean | undefined) => 
        value ? new Date(String(value)).toLocaleDateString() : ''
    },
    { 
      key: 'totalTickets', 
      label: 'Tickets',
      sortable: true,
      formatter: (value: string | number | boolean | undefined) => String(value || 0)
    },
    { 
      key: 'totalSpent', 
      label: 'Total Spent', 
      sortable: true,
      formatter: (value: string | number | boolean | undefined) => {
        const numValue = Number(value);
        return isNaN(numValue) ? '$0.00' : `$${numValue.toFixed(2)}`;
      }
    },
    { 
      key: 'fraud', 
      label: 'Status', 
      sortable: true,
      formatter: (value: string | number | boolean | undefined) => 
        value === true ? '⚠️ Fraud' : 'Normal'
    }
  ];

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
        onSubmit={async (data: UserFormData) => {
          if (selectedUser) {
            await handleUpdateUser(selectedUser.userId, data);
          } else {
            await handleCreateUser(data);
          }
        }}
      />
    </div>
  );
} 
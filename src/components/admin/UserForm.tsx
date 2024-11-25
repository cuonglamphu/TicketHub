"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { useState, useEffect } from "react";
import { pixelBorder, pixelFont } from "@/lib/utils";

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSubmit: (data: any) => Promise<void>;
}

type UserFormData = {
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: 'USER' | 'ADMIN';
};

export function UserForm({ isOpen, onClose, user, onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    userName: '',
    userEmail: '',
    userPassword: '',
    userRole: 'USER'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName,
        userEmail: user.userEmail,
        userPassword: '',
        userRole: user.userRole as 'USER' | 'ADMIN'
      });
    } else {
      setFormData({
        userName: '',
        userEmail: '',
        userPassword: '',
        userRole: 'USER'
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${pixelBorder} bg-[#4CAF50]`}>
        <DialogHeader>
          <DialogTitle className="text-[#FFEB3B]" style={pixelFont}>
            {user ? 'Edit User' : 'Create User'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="userName">Name</Label>
            <Input
              id="userName"
              value={formData.userName}
              onChange={(e) => setFormData({...formData, userName: e.target.value})}
              className={pixelBorder}
            />
          </div>
          <div>
            <Label htmlFor="userEmail">Email</Label>
            <Input
              id="userEmail"
              type="email"
              value={formData.userEmail}
              onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
              className={pixelBorder}
            />
          </div>
          {!user && (
            <div>
              <Label htmlFor="userPassword">Password</Label>
              <Input
                id="userPassword"
                type="password"
                value={formData.userPassword}
                onChange={(e) => setFormData({...formData, userPassword: e.target.value})}
                className={pixelBorder}
              />
            </div>
          )}
          <div>
            <Label htmlFor="userRole">Role</Label>
            <Select
              value={formData.userRole}
              onValueChange={(value) => setFormData({...formData, userRole: value as 'ADMIN' | 'USER'})}
            >
              <SelectTrigger className={pixelBorder}>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className={`${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835]`}>
            {user ? 'Update' : 'Create'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 
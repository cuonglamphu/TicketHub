'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getStoredUser } from '@/utils/auth';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
}

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" };

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({
    id: '',
    email: '',
    fullName: '',
    avatar: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const user = getStoredUser();
    if (!user) {
      router.push('/');
      return;
    }

    // TODO: Fetch user profile from API
    setProfile({
      id: user.userId.toString(),
      email: user.userEmail,
      fullName: user.userName,
      avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=John'
    });
  }, [router]);

  const handleProfileUpdate = async () => {
    try {
      // TODO: Implement API call to update profile
      console.log('Updating profile:', profile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    try {
      // TODO: Implement API call to change password
      console.log('Changing password');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-[#FFEB3B]" style={pixelFont}>
        Account Settings
      </h1>

      <div className={`bg-[#4CAF50] p-6 mb-8 ${pixelBorder}`}>
        <h2 className="text-2xl font-bold mb-4 text-[#FFEB3B]" style={pixelFont}>
          Profile Information
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-[#FFEB3B] mb-2" style={pixelFont}>Email</label>
            <Input
              type="email"
              value={profile.email ?? ''}
              disabled
              className="bg-white"
            />
          </div>

          <div>
            <label className="block text-[#FFEB3B] mb-2" style={pixelFont}>Full Name</label>
            <Input
              type="text"
              value={profile.fullName ?? ''}
              onChange={(e) => setProfile({...profile, fullName: e.target.value})}
              disabled={!isEditing}
              className="bg-white"
            />
          </div>

          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className={`${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] text-xl`}
              style={pixelFont}
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-4">
              <Button
                onClick={handleProfileUpdate}
                className={`${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] text-xl`}
                style={pixelFont}
              >
                Save Changes
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                className={`${pixelBorder} bg-white text-black hover:bg-gray-100 text-xl`}
                style={pixelFont}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className={`bg-[#4CAF50] p-6 ${pixelBorder}`}>
        <h2 className="text-2xl font-bold mb-4 text-[#FFEB3B]" style={pixelFont}>
          Change Password
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-[#FFEB3B] mb-2" style={pixelFont}>Current Password</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-white"
            />
          </div>

          <div>
            <label className="block text-[#FFEB3B] mb-2" style={pixelFont}>New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-white"
            />
          </div>

          <div>
            <label className="block text-[#FFEB3B] mb-2" style={pixelFont}>Confirm New Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-white"
            />
          </div>

          <Button
            onClick={handlePasswordChange}
            className={`${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] text-xl`}
            style={pixelFont}
          >
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
} 
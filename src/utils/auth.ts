import { User } from '@/types/auth';

export const getStoredUser = (): User | null => {
    if (typeof window === 'undefined') return null;
    
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
        const user = JSON.parse(userStr);
        return user;
    } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        return null;
    }
};
// Giữ lại hàm này cho các trường hợp không thể dùng hook
export const getStoredUser = () => {    
    try {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;

        const user = JSON.parse(userStr);
        if (user.expiresAt && new Date().getTime() > user.expiresAt) {
            localStorage.removeItem('user');
            return null;
        }

        return user;
    } catch (error) {
        console.error('Error getting stored user:', error);
        return null;
    }
};
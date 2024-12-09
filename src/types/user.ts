export interface User {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  userRole: string;
  userJoinDate: string;
  totalTickets: number;
  totalSpent: number;
  status: string;
  message: string;
  fraud?: boolean;
}

export type UserFormProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
};


export interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
  joinDate?: string;
  ticketsBought?: number;
  totalSpent?: string;
}

export type UserFormProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
};


export interface RegisterDto {
    userName: string;
    firstName: string;
    lastName: string;
    userEmail: string;
    userPassword: string;
    confirmPassword: string;
  }
  
  export interface LoginDto {
    userEmail: string;
    userPassword: string;
  }
  
  export interface User {
    userId: number;
    userName: string;
    firstName: string;
    lastName: string;
    userEmail: string;
    userRole: string;
    userJoinDate: string;
  }
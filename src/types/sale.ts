import { Purchase } from "./purchase";

export interface Sale {
    saleId: number;
    userId: number;
    userName: string;
    userEmail: string;
    saleDate: string;
    saleTotal: number;
    purchases: Purchase[];
  }
export interface Category {
  catId: number;
  catName: string;
  catDesc: string;
  catSlug: string;
  catThumb?: string;
  eventCount: number;
  upcomingEventCount: number;
  totalRevenue: number;
}

export interface CategoryFormData {
  catName: string;
  catSlug: string;
  catDesc: string;
  catThumb: string;
} 
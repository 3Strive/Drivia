export type Condition = 'Brand New' | 'Tokunbo' | 'Nigerian Used';
export type ListingStatus = 'Available' | 'Reserved' | 'Sold';
export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Test Drive'
  | 'Negotiating'
  | 'Sold'
  | 'Lost';
export type LeadSource =
  | 'WhatsApp'
  | 'Facebook'
  | 'Instagram'
  | 'Walk-in'
  | 'Referral'
  | 'Phone';
export type PlatformId = 'whatsapp' | 'facebook' | 'instagram' | 'twitter';

export interface CarListing {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: Condition;
  status: ListingStatus;
  location: string;
  color: string;
  dealer?: string;
  dealerRating?: 4.8;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  description: string;
  phone: string;
  postedAt: string;
  inspection?: { score: number; status: string };
  images: string[];
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  budget: number;
  carOfInterest: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  budgetMin: number;
  budgetMax: number;
  preferredMake?: string;
  tags: string[];
  totalPurchases: number;
  lastContact: string;
  hot: boolean;
}

export interface BroadcastPost {
  id: string;
  title: string;
  platform: string;
  status: 'Live' | 'Scheduled' | 'Draft' | 'Archived';
  reach: number;
  enquiries: number;
  sentAt: string;
}

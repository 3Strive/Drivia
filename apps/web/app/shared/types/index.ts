// ─── shared/types.ts ──────────────────────────────────────────────────────────
// Central type definitions for the Drivia dealer tool.
// Import from here in every module.

// ─── PALETTE ──────────────────────────────────────────────────────────────────
export const P = '#6C63FF';
export const P_DARK = '#5B54E8';
export const P_LIGHT = '#EEF0FF';
export const BG = '#F4F5FA';
export const WHITE = '#FFFFFF';
export const SUCCESS = '#38A169';
export const WARNING = '#D69E2E';
export const DANGER = '#E53E3E';

// ─── INVENTORY ────────────────────────────────────────────────────────────────
export type Condition = 'Brand New' | 'Tokunbo' | 'Nigerian Used';
export type ListingStatus = 'Available' | 'Reserved' | 'Sold';

export interface CarListing {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number; // ₦
  mileage: number; // km
  condition: Condition;
  status: ListingStatus;
  location: string;
  color: string;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  description: string;
  phone: string;
  images: string[];
  gradient: string;
  postedAt: string; // ISO date
  sharedTo: PlatformId[];
}

// ─── LEADS ────────────────────────────────────────────────────────────────────
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

export interface Lead {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  source: LeadSource;
  status: LeadStatus;
  listingId: string; // which car they're interested in
  budget: number; // ₦
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// ─── BROADCAST ────────────────────────────────────────────────────────────────
export type PlatformId = 'whatsapp' | 'facebook' | 'instagram';
export type BroadcastStatus = 'Draft' | 'Scheduled' | 'Sent' | 'Failed';

export interface BroadcastMessage {
  id: string;
  listingId: string;
  platforms: PlatformId[];
  captions: Record<PlatformId, string>;
  status: BroadcastStatus;
  scheduledAt?: string;
  sentAt?: string;
  reach: Record<PlatformId, number>;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  platform: string;
  platformColor: string;
  carsBought: number;
  totalSpent: number;
  lastContact: string;
  tags: 'VIP' | 'Repeat' | 'New' | 'Inactive';
  addedAt: string;
}

// ─── ANALYTICS ────────────────────────────────────────────────────────────────
export interface SaleRecord {
  id: string;
  listingId: string;
  buyerName: string;
  salePrice: number;
  profit: number;
  date: string;
  source: LeadSource;
}

// ─── CRM ──────────────────────────────────────────────────────────────────────
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  budgetMin: number;
  budgetMax: number;
  preferredMake?: string;
  preferredType?: string; // SUV, Sedan, etc.
  notes: string;
  totalPurchases: number;
  lastContact: string;
  tags: string[];
}

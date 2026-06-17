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

export interface InspReport {
  engine: number;
  exterior: number;
  interior: number;
  transmission: number;
  electronics: number;
  overall: number;
  inspector: string;
  date: string;
}
export interface CarListing {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  bodyType?: string;
  views?: number;
  enquiries?: number;
  daysListed?: number;
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
  dealerName?: string;
  inspectedBy?: string;
  dealerRating?: number;
  savedCount?: number;
  inspection?: InspStatus;
  report?: InspReport;
  rating?: number;
  reviewCount?: number;
  dealerId?: string;
}

// AddCarForm uses string-friendly types for controlled inputs
export type AddCarForm = {
  make: string;
  model: string;
  year: number | '';
  bodyType: string;
  price: number | '';
  mileage: number | '';
  condition: Condition | '';
  status?: ListingStatus;
  location: string;
  color: string;
  transmission: '' | 'Automatic' | 'Manual';
  fuelType: '' | 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  description: string;
  phone: string;
  gradient: string;
  postedAt: string;
  sharedTo: PlatformId[];
  images: string[];
};

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
  listingId: string;
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
  avatar?: string;
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
  preferredType?: string;
  notes: string;
  totalPurchases: number;
  lastContact: string;
  tags: string[];
}

export interface FollowUp {
  id: string;
  name: string;
  phone: string;
  note: string;
  dueIn: string;
  overdue: boolean;
  avatar?: string;
}

export interface InventoryFilters {
  search: string;
  make: string;
  bodyType: string;
  priceRange: string;
  status: string;
}

export interface BroadcastCampaign {
  id: string;
  message: string;
  platforms: string[];
  sentAt: string;
  reach: number;
  opened: number;
  replies: number;
  status: 'sent' | 'scheduled' | 'failed';
}

export interface InspectionRequest {
  id: string;
  dealerName: string;
  car: string;
  location: string;
  requestedDate: string;
  status: 'pending' | 'accepted' | 'completed';
}

export interface Referral {
  id: string;
  name: string;
  email: string;
  signedUpAt: string;
  status: 'pending' | 'verified' | 'rewarded';
  reward: number;
}

export type ListStatus = 'Available' | 'Reserved' | 'Sold';
export type InspStatus = 'Inspected' | 'Not Inspected' | 'Pending';
export type PostStatus = 'idle' | 'posting' | 'success' | 'error';

export interface Platform {
  id: PlatformId;
  name: string;
  color: string;
  bg: string;
  charLimit: number | null;
  connected: boolean;
  icon: JSX.Element;
}

export interface NotificationSettingsProps {
  key: string;
  label: string;
  desc: string;
  defaultOn: boolean;
}

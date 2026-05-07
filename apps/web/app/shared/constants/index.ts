import { Condition, InspStatus, ListStatus } from '../types';

export const COND_COLOR: Record<Condition, { text: string; bg: string }> = {
  'Brand New': { text: '#1e40af', bg: '#dbeafe' },
  Tokunbo: { text: '#0d7a68', bg: '#ccfbf1' },
  'Nigerian Used': { text: '#9a3412', bg: '#fff7ed' },
};
export const STATUS_COLOR: Record<ListStatus, { text: string; bg: string }> = {
  Available: { text: '#166534', bg: '#dcfce7' },
  Reserved: { text: '#92400e', bg: '#fef3c7' },
  Sold: { text: '#991b1b', bg: '#fee2e2' },
};
export const INSP_COLOR: Record<
  InspStatus,
  { text: string; bg: string; border: string }
> = {
  Inspected: { text: '#166534', bg: '#f0fdf4', border: '#86efac' },
  'Not Inspected': { text: '#991b1b', bg: '#fff1f2', border: '#fecdd3' },
  Pending: { text: '#92400e', bg: '#fffbeb', border: '#fde68a' },
};

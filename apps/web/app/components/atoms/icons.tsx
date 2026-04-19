import React from 'react';
import { Ico } from './Ico';

// ─── ICONS ────────────────────────────────────────────────────────────────────

export const BellIco = () => (
  <Ico
    d={[
      'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9',
      'M13.73 21a2 2 0 0 1-3.46 0',
    ]}
  />
);

export const MoonIco = () => (
  <Ico d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
);

export const GridIco = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

export const UpIco = () => (
  <Ico d="M12 19V5M5 12l7-7 7 7" size={12} sw={2.5} stroke="#38A169" />
);

export const DownIco = () => (
  <Ico d="M12 5v14M5 12l7 7 7-7" size={12} sw={2.5} stroke="#E53E3E" />
);

export const CarIco = () => (
  <Ico
    d={[
      'M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h11l5 5v5h-2',
      'M7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0',
      'M15 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0',
    ]}
  />
);

export const PlusIco = () => <Ico d="M12 5v14M5 12h14" />;

export const SearchIco = () => (
  <Ico d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
);

export const FilterIco = () => (
  <Ico d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
);

export const UserIco = () => (
  <Ico d={['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z']} />
);

export const CheckIco = () => <Ico d="M20 6L9 17l-5-5" />;

export const ChevronDownIco = () => <Ico d="M6 9l6 6 6-6" />;

export const ChevronRightIco = () => <Ico d="M9 18l6-6-6-6" />;

export const PhoneIco = () => (
  <Ico d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
);

export const MessageIco = () => (
  <Ico d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
);

export const ShareIco = () => (
  <Ico d={['M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8', 'M16 6l-4-4-4 4', 'M12 2v13']} />
);

export const StarIco = () => (
  <Ico
    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
    fill="currentColor"
    stroke="none"
  />
);

export const EditIco = () => (
  <Ico d={['M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7', 'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z']} />
);

export const TrashIco = () => (
  <Ico d={['M3 6h18', 'M19 6l-1 14H6L5 6', 'M8 6V4h8v2']} />
);

export const EyeIco = () => (
  <Ico d={['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z']} />
);

export const UploadIco = () => (
  <Ico d={['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12']} />
);

export const LogOutIco = () => (
  <Ico d={['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'M16 17l5-5-5-5', 'M21 12H9']} />
);

export const ShieldIco = () => (
  <Ico d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
);

export const TrendingUpIco = () => (
  <Ico d={['M23 6l-9.5 9.5-5-5L1 18', 'M17 6h6v6']} />
);

export const MenuIco = () => (
  <Ico d={['M3 12h18', 'M3 6h18', 'M3 18h18']} />
);

export const CloseIco = () => <Ico d={['M18 6L6 18', 'M6 6l12 12']} />;

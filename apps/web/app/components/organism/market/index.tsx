'use client';

import { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Badge,
  Avatar,
  Grid,
  HStack,
  VStack,
  Heading,
  Image,
  Link,
} from '@chakra-ui/react';
import AppLayout from '../../template/general-layout';

const P = '#6C63FF';
const P_DARK = '#5B54E8';
const P_LIGHT = '#EEF0FF';
const BG = '#F4F5FA';
const WHITE = '#FFFFFF';

const Ico = ({
  d,
  size = 16,
  stroke = 'currentColor',
  fill = 'none',
  sw = 2,
}: {
  d: string | string[];
  size?: number;
  stroke?: string;
  fill?: string;
  sw?: number;
}): JSX.Element => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth={sw}
  >
    {Array.isArray(d) ? (
      d.map((p, i) => <path key={i} d={p} />)
    ) : (
      <path d={d} />
    )}
  </svg>
);

const SearchIco = () => (
  <Ico d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
);
const BellIco = () => (
  <Ico
    d={[
      'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9',
      'M13.73 21a2 2 0 0 1-3.46 0',
    ]}
  />
);
const MoonIco = () => (
  <Ico d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
);
const GridIco = () => (
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
const ListIco = () => (
  <Ico
    d={[
      'M8 6h13',
      'M8 12h13',
      'M8 18h13',
      'M3 6h.01',
      'M3 12h.01',
      'M3 18h.01',
    ]}
  />
);
const CloseIco = () => <Ico d="M18 6 6 18M6 6l12 12" sw={2.5} />;
const PhoneIco = () => (
  <Ico
    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.14-1.14a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
    size={14}
  />
);
const LocIco = () => (
  <Ico
    d={[
      'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
      'M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4',
    ]}
    size={13}
  />
);
const SpeedIco = () => (
  <Ico
    d={['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 12l4-4', 'M12 12v4']}
    size={13}
  />
);
const FuelIco = () => (
  <Ico
    d={[
      'M3 22V10a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12',
      'M3 10V6a2 2 0 0 1 2-2h2',
      'M7 22v-4h6v4',
      'M17 10h2a2 2 0 0 1 2 2v3a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1v-5l-3-3',
    ]}
    size={13}
  />
);
const TrophyIco = () => (
  <Ico
    d={[
      'M6 9H4.5a2.5 2.5 0 0 1 0-5H6',
      'M18 9h1.5a2.5 2.5 0 0 0 0-5H18',
      'M4 22h16',
      'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22',
      'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22',
      'M18 2H6v7a6 6 0 0 0 12 0V2z',
    ]}
    size={14}
    stroke={P}
  />
);
const HeartIco = ({ on }: { on: boolean }) => (
  <Ico
    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
    fill={on ? P : 'none'}
    stroke={on ? P : 'currentColor'}
    size={15}
  />
);
const ShieldOk = ({ size = 14 }: { size?: number }) => (
  <Ico
    d={['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M9 12l2 2 4-4']}
    size={size}
    stroke="#38A169"
  />
);
const ShieldNo = ({ size = 14 }: { size?: number }) => (
  <Ico
    d={[
      'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
      'M15 9l-6 6',
      'M9 9l6 6',
    ]}
    size={size}
    stroke="#E53E3E"
  />
);
const ShieldPend = ({ size = 14 }: { size?: number }) => (
  <Ico
    d={['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M12 8v4', 'M12 16h.01']}
    size={size}
    stroke="#D69E2E"
  />
);

const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`;
const fmtK = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(0)}k` : `${n}`);

type Condition = 'Brand New' | 'Tokunbo' | 'Nigerian Used';
type InspStatus = 'Inspected' | 'Not Inspected' | 'Pending';
type ListStatus = 'Available' | 'Reserved' | 'Sold';
type SortBy =
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'rating'
  | 'inspected_first';
type ViewMode = 'grid' | 'list';

interface InspReport {
  engine: number;
  exterior: number;
  interior: number;
  transmission: number;
  electronics: number;
  overall: number;
  inspector: string;
  date: string;
}
interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: Condition;
  status: ListStatus;
  inspection: InspStatus;
  report?: InspReport;
  location: string;
  color: string;
  transmission: 'Automatic' | 'Manual';
  fuel: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  dealerId: string;
  phone: string;
  gradient: string;
  img: string;
  savedCount: number;
  viewCount: number;
  rating: number;
  reviewCount: number;
  postedDaysAgo: number;
}
interface Dealer {
  id: string;
  name: string;
  avatar: string;
  location: string;
  totalListings: number;
  soldCount: number;
  rating: number;
  reviewCount: number;
  responseTime: string;
  inspectedPct: number;
  joinedYear: number;
  badge: 'Gold' | 'Silver' | 'Verified' | 'New';
}

const INSP_CFG: Record<
  InspStatus,
  { bg: string; color: string; border: string; icon: JSX.Element }
> = {
  Inspected: {
    bg: '#F0FFF4',
    color: '#276749',
    border: '#9AE6B4',
    icon: <ShieldOk />,
  },
  'Not Inspected': {
    bg: '#FFF5F5',
    color: '#9B2C2C',
    border: '#FEB2B2',
    icon: <ShieldNo />,
  },
  Pending: {
    bg: '#FFFAF0',
    color: '#744210',
    border: '#FAF089',
    icon: <ShieldPend />,
  },
};
const COND_CFG: Record<Condition, { bg: string; color: string }> = {
  'Brand New': { bg: P_LIGHT, color: P },
  Tokunbo: { bg: '#E6FFFA', color: '#2C7A7B' },
  'Nigerian Used': { bg: '#FFFAF0', color: '#C05621' },
};
const STAT_CFG: Record<ListStatus, { bg: string; color: string }> = {
  Available: { bg: '#C6F6D5', color: '#276749' },
  Reserved: { bg: '#FEFCBF', color: '#744210' },
  Sold: { bg: '#FED7D7', color: '#9B2C2C' },
};
const BADGE_CFG: Record<
  Dealer['badge'],
  { bg: string; color: string; icon: string }
> = {
  Gold: { bg: '#FEFCBF', color: '#744210', icon: '🥇' },
  Silver: { bg: '#EDF2F7', color: '#4A5568', icon: '🥈' },
  Verified: { bg: P_LIGHT, color: P, icon: '✓' },
  New: { bg: '#E6FFFA', color: '#2C7A7B', icon: '🆕' },
};

const CARS: Car[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2021,
    price: 16500000,
    mileage: 42000,
    condition: 'Tokunbo',
    status: 'Available',
    inspection: 'Inspected',
    report: {
      engine: 9,
      exterior: 8,
      interior: 8,
      transmission: 9,
      electronics: 9,
      overall: 86,
      inspector: 'AutoCheck NG',
      date: 'Nov 2, 2024',
    },
    location: 'Lekki, Lagos',
    color: 'Silver',
    transmission: 'Automatic',
    fuel: 'Petrol',
    dealerId: 'd1',
    phone: '08012345678',
    gradient: 'linear-gradient(135deg,#3F51B5,#6C63FF)',
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=220&fit=crop',
    savedCount: 34,
    viewCount: 312,
    rating: 4.7,
    reviewCount: 18,
    postedDaysAgo: 3,
  },
  {
    id: '2',
    make: 'Honda',
    model: 'CR-V',
    year: 2020,
    price: 21000000,
    mileage: 55000,
    condition: 'Tokunbo',
    status: 'Available',
    inspection: 'Inspected',
    report: {
      engine: 8,
      exterior: 9,
      interior: 8,
      transmission: 8,
      electronics: 7,
      overall: 80,
      inspector: 'AutoCheck NG',
      date: 'Oct 30, 2024',
    },
    location: 'Ikeja, Lagos',
    color: 'Black',
    transmission: 'Automatic',
    fuel: 'Petrol',
    dealerId: 'd1',
    phone: '08012345678',
    gradient: 'linear-gradient(135deg,#1a1a2e,#16213e)',
    img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=220&fit=crop',
    savedCount: 21,
    viewCount: 198,
    rating: 4.5,
    reviewCount: 12,
    postedDaysAgo: 5,
  },
  {
    id: '3',
    make: 'Mercedes',
    model: 'C300',
    year: 2019,
    price: 35000000,
    mileage: 38000,
    condition: 'Tokunbo',
    status: 'Reserved',
    inspection: 'Inspected',
    report: {
      engine: 9,
      exterior: 9,
      interior: 9,
      transmission: 9,
      electronics: 8,
      overall: 92,
      inspector: 'DriveCheck PH',
      date: 'Oct 28, 2024',
    },
    location: 'Victoria Island',
    color: 'White',
    transmission: 'Automatic',
    fuel: 'Petrol',
    dealerId: 'd2',
    phone: '08087654321',
    gradient: 'linear-gradient(135deg,#bdbdbd,#757575)',
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=220&fit=crop',
    savedCount: 58,
    viewCount: 490,
    rating: 4.9,
    reviewCount: 27,
    postedDaysAgo: 7,
  },
  {
    id: '4',
    make: 'Lexus',
    model: 'RX350',
    year: 2018,
    price: 28000000,
    mileage: 68000,
    condition: 'Tokunbo',
    status: 'Available',
    inspection: 'Not Inspected',
    location: 'Abuja, FCT',
    color: 'Gold',
    transmission: 'Automatic',
    fuel: 'Petrol',
    dealerId: 'd3',
    phone: '07011234567',
    gradient: 'linear-gradient(135deg,#b8860b,#ffd700)',
    img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=220&fit=crop',
    savedCount: 15,
    viewCount: 142,
    rating: 4.1,
    reviewCount: 6,
    postedDaysAgo: 10,
  },
  {
    id: '5',
    make: 'Toyota',
    model: 'Highlander',
    year: 2022,
    price: 45000000,
    mileage: 12000,
    condition: 'Tokunbo',
    status: 'Available',
    inspection: 'Inspected',
    report: {
      engine: 10,
      exterior: 9,
      interior: 10,
      transmission: 10,
      electronics: 9,
      overall: 96,
      inspector: 'AutoCheck NG',
      date: 'Nov 5, 2024',
    },
    location: 'Lekki, Lagos',
    color: 'Red',
    transmission: 'Automatic',
    fuel: 'Petrol',
    dealerId: 'd1',
    phone: '08012345678',
    gradient: 'linear-gradient(135deg,#c62828,#e53935)',
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=220&fit=crop',
    savedCount: 72,
    viewCount: 641,
    rating: 5.0,
    reviewCount: 9,
    postedDaysAgo: 1,
  },
  {
    id: '6',
    make: 'Ford',
    model: 'Ranger',
    year: 2020,
    price: 18500000,
    mileage: 72000,
    condition: 'Nigerian Used',
    status: 'Available',
    inspection: 'Pending',
    location: 'Port Harcourt',
    color: 'Blue',
    transmission: 'Manual',
    fuel: 'Diesel',
    dealerId: 'd4',
    phone: '09087654321',
    gradient: 'linear-gradient(135deg,#1565C0,#1976D2)',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=220&fit=crop',
    savedCount: 8,
    viewCount: 89,
    rating: 3.8,
    reviewCount: 4,
    postedDaysAgo: 14,
  },
  {
    id: '7',
    make: 'BMW',
    model: 'X5',
    year: 2020,
    price: 52000000,
    mileage: 31000,
    condition: 'Tokunbo',
    status: 'Available',
    inspection: 'Inspected',
    report: {
      engine: 9,
      exterior: 9,
      interior: 9,
      transmission: 9,
      electronics: 9,
      overall: 90,
      inspector: 'AutoCheck NG',
      date: 'Nov 1, 2024',
    },
    location: 'Victoria Island',
    color: 'Black',
    transmission: 'Automatic',
    fuel: 'Petrol',
    dealerId: 'd2',
    phone: '08087654321',
    gradient: 'linear-gradient(135deg,#212121,#424242)',
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=220&fit=crop',
    savedCount: 49,
    viewCount: 388,
    rating: 4.8,
    reviewCount: 22,
    postedDaysAgo: 2,
  },
  {
    id: '8',
    make: 'Hyundai',
    model: 'Tucson',
    year: 2021,
    price: 19500000,
    mileage: 29000,
    condition: 'Tokunbo',
    status: 'Available',
    inspection: 'Not Inspected',
    location: 'Enugu',
    color: 'White',
    transmission: 'Automatic',
    fuel: 'Petrol',
    dealerId: 'd5',
    phone: '07056789012',
    gradient: 'linear-gradient(135deg,#00695C,#26A69A)',
    img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=220&fit=crop',
    savedCount: 11,
    viewCount: 104,
    rating: 3.9,
    reviewCount: 5,
    postedDaysAgo: 8,
  },
  {
    id: '9',
    make: 'Range Rover',
    model: 'Velar',
    year: 2019,
    price: 62000000,
    mileage: 44000,
    condition: 'Tokunbo',
    status: 'Available',
    inspection: 'Inspected',
    report: {
      engine: 8,
      exterior: 9,
      interior: 9,
      transmission: 8,
      electronics: 8,
      overall: 84,
      inspector: 'DriveCheck PH',
      date: 'Oct 25, 2024',
    },
    location: 'Lekki, Lagos',
    color: 'Blue',
    transmission: 'Automatic',
    fuel: 'Petrol',
    dealerId: 'd2',
    phone: '08087654321',
    gradient: 'linear-gradient(135deg,#283593,#3949AB)',
    img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=220&fit=crop',
    savedCount: 63,
    viewCount: 520,
    rating: 4.6,
    reviewCount: 31,
    postedDaysAgo: 12,
  },
  {
    id: '10',
    make: 'Toyota',
    model: 'Corolla',
    year: 2019,
    price: 12000000,
    mileage: 85000,
    condition: 'Nigerian Used',
    status: 'Available',
    inspection: 'Not Inspected',
    location: 'Ibadan',
    color: 'Silver',
    transmission: 'Manual',
    fuel: 'Petrol',
    dealerId: 'd5',
    phone: '07056789012',
    gradient: 'linear-gradient(135deg,#546E7A,#78909C)',
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=220&fit=crop',
    savedCount: 6,
    viewCount: 74,
    rating: 3.5,
    reviewCount: 3,
    postedDaysAgo: 20,
  },
];

const DEALERS: Dealer[] = [
  {
    id: 'd1',
    name: 'Lagos Auto Hub',
    avatar: 'https://i.pravatar.cc/40?img=11',
    location: 'Lekki, Lagos',
    totalListings: 47,
    soldCount: 312,
    rating: 4.8,
    reviewCount: 198,
    responseTime: '< 1hr',
    inspectedPct: 92,
    joinedYear: 2019,
    badge: 'Gold',
  },
  {
    id: 'd2',
    name: 'Premium Motors NG',
    avatar: 'https://i.pravatar.cc/40?img=22',
    location: 'Victoria Island',
    totalListings: 31,
    soldCount: 189,
    rating: 4.9,
    reviewCount: 142,
    responseTime: '< 30min',
    inspectedPct: 100,
    joinedYear: 2020,
    badge: 'Gold',
  },
  {
    id: 'd3',
    name: 'Abuja Car Deals',
    avatar: 'https://i.pravatar.cc/40?img=33',
    location: 'Abuja, FCT',
    totalListings: 18,
    soldCount: 95,
    rating: 4.2,
    reviewCount: 67,
    responseTime: '< 3hrs',
    inspectedPct: 55,
    joinedYear: 2021,
    badge: 'Silver',
  },
  {
    id: 'd4',
    name: 'PH Motors',
    avatar: 'https://i.pravatar.cc/40?img=44',
    location: 'Port Harcourt',
    totalListings: 12,
    soldCount: 61,
    rating: 3.9,
    reviewCount: 34,
    responseTime: '< 6hrs',
    inspectedPct: 40,
    joinedYear: 2022,
    badge: 'Verified',
  },
  {
    id: 'd5',
    name: 'Enugu Auto Sales',
    avatar: 'https://i.pravatar.cc/40?img=55',
    location: 'Enugu',
    totalListings: 8,
    soldCount: 22,
    rating: 3.7,
    reviewCount: 15,
    responseTime: '< 12hrs',
    inspectedPct: 30,
    joinedYear: 2023,
    badge: 'New',
  },
];

// ─── STARS ────────────────────────────────────────────────────────────────────
function Stars({
  rating,
  size = 11,
}: {
  rating: number;
  size?: number;
}): JSX.Element {
  return (
    <HStack gap="1px">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? '#F6AD55' : '#E2E8F0'}
          stroke="none"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </HStack>
  );
}

// ─── SCORE BAR ────────────────────────────────────────────────────────────────
function ScoreBar({
  label,
  value,
}: {
  label: string;
  value: number;
}): JSX.Element {
  const color = value >= 8 ? '#38A169' : value >= 6 ? '#D69E2E' : '#E53E3E';
  return (
    <Flex align="center" gap="8px" mb="5px">
      <Text fontSize="11px" color="gray.500" w="95px" flexShrink="0">
        {label}
      </Text>
      <Box flex="1" h="5px" bg="gray.100" borderRadius="3px" overflow="hidden">
        <Box h="100%" w={`${value * 10}%`} bg={color} borderRadius="3px" />
      </Box>
      <Text
        fontSize="11px"
        fontWeight="700"
        color={color}
        w="22px"
        textAlign="right"
      >
        {value}
      </Text>
    </Flex>
  );
}

// ─── CAR CARD ─────────────────────────────────────────────────────────────────
function CarCard({
  car,
  saved,
  onSave,
  onDetail,
}: {
  car: Car;
  saved: boolean;
  onSave: () => void;
  onDetail: () => void;
}): JSX.Element {
  const insp = INSP_CFG[car.inspection];
  return (
    <Box
      bg={WHITE}
      borderRadius="16px"
      overflow="hidden"
      border="1px solid"
      borderColor="gray.100"
      boxShadow="0 2px 12px rgba(0,0,0,0.06)"
      _hover={{
        transform: 'translateY(-3px)',
        boxShadow: '0 10px 30px rgba(108,99,255,0.13)',
      }}
      transition="all 0.2s"
      cursor="pointer"
      onClick={onDetail}
    >
      {/* Thumbnail */}
      <Box
        h="152px"
        position="relative"
        overflow="hidden"
        style={{ background: car.gradient }}
      >
        <Image
          src={car.img}
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          objectFit="cover"
          opacity="0.78"
        />
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-t,rgba(0,0,0,0.42),transparent)"
        />

        <HStack position="absolute" top="9px" left="9px" gap="4px">
          <Badge
            bg={STAT_CFG[car.status].bg}
            color={STAT_CFG[car.status].color}
            borderRadius="5px"
            fontSize="9px"
            px="6px"
            py="2px"
            fontWeight="700"
          >
            {car.status}
          </Badge>
          <Badge
            bg={COND_CFG[car.condition].bg}
            color={COND_CFG[car.condition].color}
            borderRadius="5px"
            fontSize="9px"
            px="6px"
            py="2px"
            fontWeight="700"
          >
            {car.condition}
          </Badge>
        </HStack>

        <Box
          as="button"
          position="absolute"
          top="9px"
          right="9px"
          w="27px"
          h="27px"
          borderRadius="8px"
          bg="whiteAlpha.900"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={saved ? P : 'gray.500'}
          _hover={{ bg: 'white' }}
          onClick={(e) => {
            e.stopPropagation();
            onSave();
          }}
          transition="all 0.15s"
        >
          <HeartIco on={saved} />
        </Box>

        <HStack position="absolute" bottom="7px" left="9px" gap="6px">
          <Text fontSize="11px" color="white" fontWeight="700">
            {car.year}
          </Text>
          <Text fontSize="10px" color="whiteAlpha.700">
            ·
          </Text>
          <Text fontSize="10px" color="whiteAlpha.800">
            {fmtK(car.mileage)} km
          </Text>
          <Text fontSize="10px" color="whiteAlpha.700">
            ·
          </Text>
          <Text fontSize="10px" color="whiteAlpha.800">
            {car.transmission}
          </Text>
        </HStack>
      </Box>

      <Box p="12px 14px">
        <Text
          fontWeight="800"
          fontSize="14px"
          color="gray.800"
          lineClamp={1}
          mb="3px"
        >
          {car.make} {car.model}
        </Text>

        <HStack gap="10px" mb="8px">
          <HStack gap="3px" color="gray.400">
            <LocIco />
            <Text fontSize="11px">{car.location}</Text>
          </HStack>
          <HStack gap="3px" color="gray.400">
            <FuelIco />
            <Text fontSize="11px">{car.fuel}</Text>
          </HStack>
        </HStack>

        {/* Inspection pill */}
        <Flex
          align="center"
          gap="5px"
          display="inline-flex"
          px="8px"
          py="4px"
          borderRadius="7px"
          mb="8px"
          bg={insp.bg}
          border="1px solid"
          borderColor={insp.border}
        >
          {insp.icon}
          <Text fontSize="10px" fontWeight="700" color={insp.color}>
            {car.inspection}
          </Text>
          {car.report && (
            <Text fontSize="10px" color={insp.color} opacity="0.8">
              · {car.report.overall}/100
            </Text>
          )}
        </Flex>

        <HStack gap="5px" mb="10px">
          <Stars rating={car.rating} />
          <Text fontSize="11px" color="gray.400">
            {car.rating.toFixed(1)} ({car.reviewCount})
          </Text>
        </HStack>

        <Flex justify="space-between" align="center">
          <Text fontSize="15px" fontWeight="900" color={P}>
            {fmt(car.price)}
          </Text>
          <HStack gap="5px" onClick={(e) => e.stopPropagation()}>
            <Link
              href={`https://wa.me/234${car.phone.slice(1)}`}
              target="_blank"
              w="28px"
              h="28px"
              borderRadius="7px"
              bg="#25D36618"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: '#25D36630' }}
            >
              <Text fontSize="11px" fontWeight="900" color="#25D366">
                W
              </Text>
            </Link>
            <Box
              as="button"
              w="28px"
              h="28px"
              borderRadius="7px"
              bg={P_LIGHT}
              display="flex"
              alignItems="center"
              justifyContent="center"
              color={P}
              _hover={{ bg: `${P}28` }}
            >
              <PhoneIco />
            </Box>
          </HStack>
        </Flex>

        <Flex
          justify="space-between"
          mt="8px"
          pt="7px"
          borderTop="1px solid"
          borderColor="gray.50"
        >
          <Text fontSize="10px" color="gray.400">
            {car.viewCount} views
          </Text>
          <Text fontSize="10px" color="gray.400">
            {car.savedCount} saves
          </Text>
          <Text fontSize="10px" color="gray.400">
            {car.postedDaysAgo}d ago
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}

// ─── DETAIL MODAL ─────────────────────────────────────────────────────────────
function DetailModal({
  car,
  onClose,
}: {
  car: Car;
  onClose: () => void;
}): JSX.Element {
  const insp = INSP_CFG[car.inspection];
  const dealer = DEALERS.find((d) => d.id === car.dealerId)!;
  const bdg = BADGE_CFG[dealer.badge];

  return (
    <>
      <Box
        position="fixed"
        inset="0"
        bg="blackAlpha.600"
        zIndex="1000"
        onClick={onClose}
        style={{ backdropFilter: 'blur(4px)' }}
      />
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
        zIndex="1001"
        w="800px"
        maxW="96vw"
        maxH="90vh"
        bg={WHITE}
        borderRadius="22px"
        overflow="hidden"
        boxShadow="0 32px 100px rgba(0,0,0,0.2)"
        display="flex"
        flexDir="column"
      >
        <Flex
          align="center"
          justify="space-between"
          px="24px"
          py="16px"
          borderBottom="1px solid"
          borderColor="gray.100"
          flexShrink="0"
        >
          <Box>
            <Text fontWeight="900" fontSize="18px" color="gray.800">
              {car.year} {car.make} {car.model}
            </Text>
            <HStack gap="6px" mt="3px">
              <Badge
                bg={COND_CFG[car.condition].bg}
                color={COND_CFG[car.condition].color}
                borderRadius="5px"
                fontSize="10px"
                px="7px"
                fontWeight="700"
              >
                {car.condition}
              </Badge>
              <Badge
                bg={STAT_CFG[car.status].bg}
                color={STAT_CFG[car.status].color}
                borderRadius="5px"
                fontSize="10px"
                px="7px"
                fontWeight="700"
              >
                {car.status}
              </Badge>
            </HStack>
          </Box>
          <Box
            as="button"
            onClick={onClose}
            w="34px"
            h="34px"
            borderRadius="9px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.100"
            color="gray.500"
            _hover={{ bg: 'gray.200' }}
          >
            <CloseIco />
          </Box>
        </Flex>

        <Box overflow="auto" flex="1">
          <Grid templateColumns="1.3fr 1fr">
            {/* LEFT */}
            <Box p="22px" borderRight="1px solid" borderColor="gray.100">
              <Box
                borderRadius="14px"
                overflow="hidden"
                mb="16px"
                h="195px"
                position="relative"
                style={{ background: car.gradient }}
              >
                <Image
                  src={car.img}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  opacity="0.82"
                />
              </Box>

              {/* Specs grid */}
              <Grid templateColumns="1fr 1fr" gap="8px" mb="16px">
                {[
                  ['Transmission', car.transmission],
                  ['Fuel', car.fuel],
                  ['Color', car.color],
                  ['Mileage', `${car.mileage.toLocaleString()} km`],
                  ['Location', car.location],
                  ['Posted', `${car.postedDaysAgo}d ago`],
                ].map(([k, v]) => (
                  <Box
                    key={k}
                    bg="gray.50"
                    borderRadius="9px"
                    px="12px"
                    py="9px"
                  >
                    <Text fontSize="10px" color="gray.400" fontWeight="600">
                      {k}
                    </Text>
                    <Text fontSize="13px" fontWeight="700" color="gray.800">
                      {v}
                    </Text>
                  </Box>
                ))}
              </Grid>

              {/* Rating breakdown */}
              <Box bg="gray.50" borderRadius="12px" p="14px">
                <Text
                  fontSize="11px"
                  fontWeight="700"
                  color="gray.500"
                  textTransform="uppercase"
                  letterSpacing="0.5px"
                  mb="10px"
                >
                  Reviews
                </Text>
                <Flex align="center" gap="14px">
                  <Box textAlign="center" flexShrink="0">
                    <Text
                      fontSize="34px"
                      fontWeight="900"
                      color="gray.800"
                      lineHeight="1"
                    >
                      {car.rating.toFixed(1)}
                    </Text>
                    <Stars rating={car.rating} size={12} />
                    <Text fontSize="10px" color="gray.400" mt="2px">
                      {car.reviewCount} reviews
                    </Text>
                  </Box>
                  <Box flex="1">
                    {[5, 4, 3, 2, 1].map((n) => {
                      const filled =
                        n === 5 ? 60 : n === 4 ? 25 : n === 3 ? 10 : 3;
                      return (
                        <Flex key={n} align="center" gap="6px" mb="4px">
                          <Text fontSize="10px" color="gray.400" w="8px">
                            {n}
                          </Text>
                          <Box
                            flex="1"
                            h="4px"
                            bg="gray.200"
                            borderRadius="2px"
                            overflow="hidden"
                          >
                            <Box
                              h="100%"
                              bg="#F6AD55"
                              borderRadius="2px"
                              w={`${filled}%`}
                            />
                          </Box>
                        </Flex>
                      );
                    })}
                  </Box>
                </Flex>
              </Box>
            </Box>

            {/* RIGHT */}
            <Box p="22px">
              <Text fontSize="28px" fontWeight="900" color={P} mb="3px">
                {fmt(car.price)}
              </Text>
              <HStack gap="8px" mb="20px">
                <HStack gap="3px" color="gray.400">
                  <LocIco />
                  <Text fontSize="12px">{car.location}</Text>
                </HStack>
                <Text fontSize="11px" color="gray.400">
                  ·
                </Text>
                <Text fontSize="12px" color="gray.400">
                  {car.viewCount} views · {car.savedCount} saves
                </Text>
              </HStack>

              {/* Inspection report */}
              <Box mb="18px">
                <Text
                  fontSize="11px"
                  fontWeight="700"
                  color="gray.500"
                  textTransform="uppercase"
                  letterSpacing="0.5px"
                  mb="8px"
                >
                  Inspection
                </Text>
                <Flex
                  align="center"
                  gap="8px"
                  px="12px"
                  py="9px"
                  borderRadius="10px"
                  bg={insp.bg}
                  border="1px solid"
                  borderColor={insp.border}
                  mb="10px"
                >
                  {car.inspection === 'Inspected' ? (
                    <ShieldOk size={16} />
                  ) : car.inspection === 'Pending' ? (
                    <ShieldPend size={16} />
                  ) : (
                    <ShieldNo size={16} />
                  )}
                  <Text
                    fontSize="13px"
                    fontWeight="700"
                    color={insp.color}
                    flex="1"
                  >
                    {car.inspection}
                  </Text>
                  {car.report && (
                    <Box textAlign="center">
                      <Text
                        fontSize="20px"
                        fontWeight="900"
                        color={insp.color}
                        lineHeight="1"
                      >
                        {car.report.overall}
                      </Text>
                      <Text fontSize="9px" color={insp.color} opacity="0.7">
                        /100
                      </Text>
                    </Box>
                  )}
                </Flex>
                {car.report ? (
                  <Box>
                    <ScoreBar label="Engine" value={car.report.engine} />
                    <ScoreBar label="Exterior" value={car.report.exterior} />
                    <ScoreBar label="Interior" value={car.report.interior} />
                    <ScoreBar
                      label="Transmission"
                      value={car.report.transmission}
                    />
                    <ScoreBar
                      label="Electronics"
                      value={car.report.electronics}
                    />
                    <HStack justify="space-between" mt="6px">
                      <Text fontSize="10px" color="gray.400">
                        By {car.report.inspector}
                      </Text>
                      <Text fontSize="10px" color="gray.400">
                        {car.report.date}
                      </Text>
                    </HStack>
                  </Box>
                ) : (
                  <Box
                    bg="gray.50"
                    borderRadius="9px"
                    p="12px"
                    textAlign="center"
                  >
                    <Text fontSize="12px" color="gray.400">
                      {car.inspection === 'Pending'
                        ? 'Inspection in progress. Check back soon.'
                        : 'This vehicle has not been inspected. Proceed with caution.'}
                    </Text>
                  </Box>
                )}
              </Box>

              {/* Dealer */}
              <Box p="12px" bg="gray.50" borderRadius="12px" mb="16px">
                <Text
                  fontSize="10px"
                  fontWeight="700"
                  color="gray.400"
                  textTransform="uppercase"
                  letterSpacing="0.5px"
                  mb="8px"
                >
                  Dealer
                </Text>
                <HStack gap="10px" mb="6px">
                  <Avatar.Root size="sm">
                    <Avatar.Image src={dealer.avatar} />
                    <Avatar.Fallback>{dealer.name[0]}</Avatar.Fallback>
                  </Avatar.Root>
                  <Box flex="1">
                    <HStack gap="5px" mb="1px">
                      <Text fontSize="13px" fontWeight="700" color="gray.800">
                        {dealer.name}
                      </Text>
                      <Badge
                        bg={bdg.bg}
                        color={bdg.color}
                        fontSize="9px"
                        px="6px"
                        borderRadius="5px"
                        fontWeight="700"
                      >
                        {bdg.icon} {dealer.badge}
                      </Badge>
                    </HStack>
                    <HStack gap="5px">
                      <Stars rating={dealer.rating} />
                      <Text fontSize="10px" color="gray.400">
                        ({dealer.reviewCount})
                      </Text>
                    </HStack>
                  </Box>
                </HStack>
                <Grid templateColumns="1fr 1fr" gap="6px" mt="6px">
                  {[
                    ['Response', dealer.responseTime],
                    ['Inspected', `${dealer.inspectedPct}% of stock`],
                    ['Listings', `${dealer.totalListings} active`],
                    ['Total Sold', `${dealer.soldCount} cars`],
                  ].map(([k, v]) => (
                    <Box
                      key={k}
                      bg={WHITE}
                      borderRadius="7px"
                      px="10px"
                      py="6px"
                    >
                      <Text fontSize="9px" color="gray.400" fontWeight="600">
                        {k}
                      </Text>
                      <Text fontSize="11px" fontWeight="700" color="gray.700">
                        {v}
                      </Text>
                    </Box>
                  ))}
                </Grid>
              </Box>

              {/* CTAs */}
              <VStack gap="8px">
                <Link
                  href={`https://wa.me/234${car.phone.slice(1)}`}
                  target="_blank"
                  display="flex"
                  w="100%"
                  alignItems="center"
                  justifyContent="center"
                  gap="8px"
                  bg="#25D366"
                  color="white"
                  borderRadius="11px"
                  h="42px"
                  fontSize="13px"
                  fontWeight="700"
                  _hover={{ opacity: 0.88 }}
                  boxShadow="0 4px 14px #25D36644"
                >
                  💬 WhatsApp Dealer
                </Link>
                <Link
                  href={`tel:${car.phone}`}
                  display="flex"
                  w="100%"
                  alignItems="center"
                  justifyContent="center"
                  gap="8px"
                  bg={P_LIGHT}
                  color={P}
                  borderRadius="11px"
                  h="42px"
                  fontSize="13px"
                  fontWeight="700"
                  _hover={{ bg: `${P}22` }}
                >
                  <PhoneIco /> Call Dealer
                </Link>
              </VStack>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

// ─── DEALER RANK CARD ─────────────────────────────────────────────────────────
function DealerRankCard({
  dealer,
  rank,
}: {
  dealer: Dealer;
  rank: number;
}): JSX.Element {
  const bdg = BADGE_CFG[dealer.badge];
  const medal =
    rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null;
  return (
    <Flex
      align="center"
      gap="10px"
      px="12px"
      py="10px"
      borderRadius="10px"
      bg="gray.50"
      mb="5px"
      _hover={{ bg: P_LIGHT }}
      transition="all 0.15s"
      cursor="pointer"
    >
      <Text fontSize="13px" w="20px" textAlign="center" flexShrink="0">
        {medal ?? (
          <Text as="span" fontSize="11px" color="gray.400" fontWeight="700">
            #{rank}
          </Text>
        )}
      </Text>
      <Avatar.Root size="xs" flexShrink="0">
        <Avatar.Image src={dealer.avatar} />
        <Avatar.Fallback>{dealer.name[0]}</Avatar.Fallback>
      </Avatar.Root>
      <Box flex="1" minW="0">
        <HStack gap="4px" mb="1px">
          <Text fontSize="12px" fontWeight="700" color="gray.800" lineClamp={1}>
            {dealer.name}
          </Text>
          <Badge
            bg={bdg.bg}
            color={bdg.color}
            fontSize="8px"
            px="5px"
            borderRadius="4px"
            fontWeight="700"
            flexShrink="0"
          >
            {bdg.icon} {dealer.badge}
          </Badge>
        </HStack>
        <HStack gap="3px">
          <Stars rating={dealer.rating} size={9} />
          <Text fontSize="9px" color="gray.400">
            ({dealer.reviewCount})
          </Text>
        </HStack>
      </Box>
      <Box textAlign="right" flexShrink="0">
        <Text fontSize="12px" fontWeight="800" color="gray.700">
          {dealer.soldCount}
        </Text>
        <Text fontSize="9px" color="gray.400">
          sold
        </Text>
      </Box>
    </Flex>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function CarMarketplace(): JSX.Element {
  const [search, setSearch] = useState('');
  const [filterInsp, setFilterInsp] = useState<InspStatus | 'All'>('All');
  const [filterCond, setFilterCond] = useState<Condition | 'All'>('All');
  const [filterFuel, setFilterFuel] = useState('All');
  const [sortBy, setSortBy] = useState<SortBy>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [detail, setDetail] = useState<Car | null>(null);

  const toggleSave = (id: string) => setSaved((p) => ({ ...p, [id]: !p[id] }));

  let filtered = CARS.filter((c) => {
    if (
      search &&
      !`${c.make} ${c.model} ${c.year} ${c.location}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
      return false;
    if (filterInsp !== 'All' && c.inspection !== filterInsp) return false;
    if (filterCond !== 'All' && c.condition !== filterCond) return false;
    if (filterFuel !== 'All' && c.fuel !== filterFuel) return false;
    return true;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'inspected_first')
      return a.inspection === 'Inspected' ? -1 : 1;
    return a.postedDaysAgo - b.postedDaysAgo;
  });

  const inspCount = CARS.filter((c) => c.inspection === 'Inspected').length;
  const availCount = CARS.filter((c) => c.status === 'Available').length;
  const sortedDealers = [...DEALERS].sort((a, b) => b.soldCount - a.soldCount);

  return (
    <AppLayout>
      {/* TOPBAR */}
      <Flex
        align="center"
        justify="space-between"
        px="32px"
        py="16px"
        bg={WHITE}
        borderBottom="1px solid"
        borderColor="gray.100"
        position="sticky"
        top="0"
        zIndex="10"
      >
        <Box>
          <Text fontSize="11px" color="gray.400">
            Drivia / Marketplace
          </Text>
          <Heading fontSize="22px" fontWeight="800" color="gray.800" mt="1px">
            Car Marketplace
          </Heading>
        </Box>
        <HStack gap="10px">
          <Box position="relative" w="240px">
            <Box
              position="absolute"
              left="10px"
              top="50%"
              transform="translateY(-50%)"
              color="gray.400"
              zIndex="1"
            >
              <SearchIco />
            </Box>
            <Input
              pl="34px"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search make, model, location…"
              bg="gray.50"
              border="none"
              borderRadius="12px"
              fontSize="13px"
              h="36px"
              _placeholder={{ color: 'gray.400' }}
              _focus={{ bg: 'gray.100', boxShadow: 'none' }}
            />
          </Box>
          {([<BellIco />, <MoonIco />] as JSX.Element[]).map((ic, i) => (
            <Button
              key={i}
              variant="ghost"
              p="2"
              borderRadius="10px"
              color="gray.500"
              _hover={{ bg: 'gray.100' }}
            >
              {ic}
            </Button>
          ))}
          <Avatar.Root size="sm">
            <Avatar.Image src="https://i.pravatar.cc/40?img=47" />
            <Avatar.Fallback>D</Avatar.Fallback>
          </Avatar.Root>
        </HStack>
      </Flex>

      {/* HERO */}
      <Box
        mx="28px"
        mt="24px"
        mb="20px"
        borderRadius="20px"
        h="156px"
        overflow="hidden"
        position="relative"
        boxShadow="0 8px 32px rgba(108,99,255,0.35)"
        style={{
          background:
            'linear-gradient(135deg,#6C63FF 0%,#5B54E8 55%,#4338CA 100%)',
        }}
      >
        <Box
          position="absolute"
          right="-20px"
          top="-30px"
          w="200px"
          h="200px"
          borderRadius="full"
          bg="rgba(255,255,255,0.07)"
        />
        <Box
          position="absolute"
          right="220px"
          bottom="-50px"
          w="170px"
          h="170px"
          borderRadius="full"
          bg="rgba(255,255,255,0.05)"
        />
        <Text
          position="absolute"
          right="44px"
          top="50%"
          transform="translateY(-50%)"
          fontSize="72px"
          lineHeight="1"
        >
          🚗
        </Text>
        <Box position="relative" zIndex="1" p="30px">
          <Heading
            fontSize="22px"
            fontWeight="900"
            color="white"
            lineHeight="1.2"
            mb="6px"
          >
            Nigeria's Most Trusted Car Market
          </Heading>
          <Text fontSize="12px" color="rgba(255,255,255,0.78)" mb="12px">
            {inspCount} inspected · {availCount} available now · Verified
            dealers nationwide
          </Text>
          <HStack gap="8px">
            {[
              `✅ ${inspCount} Inspected`,
              '🔒 Secure Deals',
              '📍 Nationwide',
            ].map((t) => (
              <Badge
                key={t}
                bg="rgba(255,255,255,0.18)"
                color="white"
                borderRadius="7px"
                fontSize="10px"
                px="9px"
                py="4px"
                fontWeight="600"
              >
                {t}
              </Badge>
            ))}
          </HStack>
        </Box>
      </Box>

      <Flex gap="20px" px="28px" pb="28px" align="flex-start">
        {/* MAIN */}
        <Box flex="1" minW="0">
          {/* FILTERS */}
          <Box
            bg={WHITE}
            borderRadius="14px"
            p="14px 16px"
            mb="14px"
            boxShadow="0 2px 8px rgba(0,0,0,0.04)"
          >
            <Flex gap="12px" align="flex-start" wrap="wrap">
              {/* Inspection */}
              <Box>
                <Text
                  fontSize="9px"
                  color="gray.400"
                  fontWeight="700"
                  mb="5px"
                  textTransform="uppercase"
                  letterSpacing="0.5px"
                >
                  Inspection
                </Text>
                <HStack gap="5px">
                  {(
                    ['All', 'Inspected', 'Not Inspected', 'Pending'] as const
                  ).map((f) => {
                    const active = filterInsp === f;
                    const cfg = f !== 'All' ? INSP_CFG[f as InspStatus] : null;
                    return (
                      <Box
                        key={f}
                        as="button"
                        onClick={() => setFilterInsp(f)}
                        px="9px"
                        py="4px"
                        borderRadius="7px"
                        fontSize="11px"
                        fontWeight="600"
                        border="1.5px solid"
                        transition="all 0.15s"
                        bg={active ? (cfg?.bg ?? P_LIGHT) : WHITE}
                        color={active ? (cfg?.color ?? P) : 'gray.400'}
                        borderColor={active ? (cfg?.border ?? P) : 'gray.200'}
                      >
                        {f}
                      </Box>
                    );
                  })}
                </HStack>
              </Box>
              <Box
                w="1px"
                h="36px"
                bg="gray.100"
                alignSelf="flex-end"
                mb="4px"
              />
              {/* Condition */}
              <Box>
                <Text
                  fontSize="9px"
                  color="gray.400"
                  fontWeight="700"
                  mb="5px"
                  textTransform="uppercase"
                  letterSpacing="0.5px"
                >
                  Condition
                </Text>
                <HStack gap="5px">
                  {(
                    ['All', 'Brand New', 'Tokunbo', 'Nigerian Used'] as const
                  ).map((f) => {
                    const active = filterCond === f;
                    const cfg = f !== 'All' ? COND_CFG[f as Condition] : null;
                    return (
                      <Box
                        key={f}
                        as="button"
                        onClick={() => setFilterCond(f)}
                        px="9px"
                        py="4px"
                        borderRadius="7px"
                        fontSize="11px"
                        fontWeight="600"
                        border="1.5px solid"
                        transition="all 0.15s"
                        bg={active ? (cfg?.bg ?? P_LIGHT) : WHITE}
                        color={active ? (cfg?.color ?? P) : 'gray.400'}
                        borderColor={active ? (cfg?.bg ?? P) : 'gray.200'}
                      >
                        {f}
                      </Box>
                    );
                  })}
                </HStack>
              </Box>
              <Box
                w="1px"
                h="36px"
                bg="gray.100"
                alignSelf="flex-end"
                mb="4px"
              />
              {/* Fuel */}
              <Box>
                <Text
                  fontSize="9px"
                  color="gray.400"
                  fontWeight="700"
                  mb="5px"
                  textTransform="uppercase"
                  letterSpacing="0.5px"
                >
                  Fuel
                </Text>
                <HStack gap="5px">
                  {['All', 'Petrol', 'Diesel', 'Hybrid', 'Electric'].map(
                    (f) => (
                      <Box
                        key={f}
                        as="button"
                        onClick={() => setFilterFuel(f)}
                        px="9px"
                        py="4px"
                        borderRadius="7px"
                        fontSize="11px"
                        fontWeight="600"
                        border="1.5px solid"
                        transition="all 0.15s"
                        bg={filterFuel === f ? P_LIGHT : WHITE}
                        color={filterFuel === f ? P : 'gray.400'}
                        borderColor={filterFuel === f ? P : 'gray.200'}
                      >
                        {f}
                      </Box>
                    ),
                  )}
                </HStack>
              </Box>
            </Flex>
          </Box>

          {/* SORT ROW */}
          <Flex justify="space-between" align="center" mb="14px">
            <Text fontSize="12px" fontWeight="600" color="gray.500">
              {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} found
            </Text>
            <HStack gap="8px">
              <HStack gap="5px">
                {(
                  [
                    ['newest', 'Newest'],
                    ['price_asc', 'Price ↑'],
                    ['price_desc', 'Price ↓'],
                    ['rating', 'Top Rated'],
                    ['inspected_first', 'Inspected First'],
                  ] as [SortBy, string][]
                ).map(([v, label]) => (
                  <Box
                    key={v}
                    as="button"
                    onClick={() => setSortBy(v)}
                    px="9px"
                    py="4px"
                    borderRadius="7px"
                    fontSize="11px"
                    fontWeight="600"
                    bg={sortBy === v ? P : WHITE}
                    color={sortBy === v ? 'white' : 'gray.500'}
                    boxShadow={
                      sortBy === v
                        ? `0 2px 8px ${P}44`
                        : '0 1px 4px rgba(0,0,0,0.07)'
                    }
                    transition="all 0.15s"
                  >
                    {label}
                  </Box>
                ))}
              </HStack>
              <HStack
                bg={WHITE}
                borderRadius="9px"
                p="3px"
                boxShadow="0 1px 4px rgba(0,0,0,0.07)"
                gap="2px"
              >
                {(
                  [
                    ['grid', <GridIco />],
                    ['list', <ListIco />],
                  ] as [ViewMode, JSX.Element][]
                ).map(([v, ic]) => (
                  <Box
                    key={v}
                    as="button"
                    onClick={() => setViewMode(v)}
                    w="26px"
                    h="26px"
                    borderRadius="6px"
                    bg={viewMode === v ? P : 'transparent'}
                    color={viewMode === v ? 'white' : 'gray.400'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    transition="all 0.15s"
                  >
                    {ic}
                  </Box>
                ))}
              </HStack>
            </HStack>
          </Flex>

          {/* LISTINGS */}
          {filtered.length === 0 ? (
            <Flex direction="column" align="center" py="64px" gap="12px">
              <Text fontSize="32px">🔍</Text>
              <Text fontWeight="700" fontSize="16px" color="gray.600">
                No vehicles match your filters
              </Text>
              <Button
                bg={P}
                color="white"
                borderRadius="10px"
                fontSize="13px"
                fontWeight="700"
                h="36px"
                px="20px"
                _hover={{ bg: P_DARK }}
                onClick={() => {
                  setFilterInsp('All');
                  setFilterCond('All');
                  setFilterFuel('All');
                  setSearch('');
                }}
              >
                Clear Filters
              </Button>
            </Flex>
          ) : viewMode === 'grid' ? (
            <Grid
              templateColumns="repeat(auto-fill, minmax(248px, 1fr))"
              gap="14px"
            >
              {filtered.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  saved={!!saved[car.id]}
                  onSave={() => toggleSave(car.id)}
                  onDetail={() => setDetail(car)}
                />
              ))}
            </Grid>
          ) : (
            <VStack gap="8px" align="stretch">
              {filtered.map((car) => {
                const insp = INSP_CFG[car.inspection];
                return (
                  <Flex
                    key={car.id}
                    bg={WHITE}
                    borderRadius="13px"
                    overflow="hidden"
                    boxShadow="0 2px 8px rgba(0,0,0,0.05)"
                    cursor="pointer"
                    _hover={{ boxShadow: '0 4px 18px rgba(108,99,255,0.1)' }}
                    transition="all 0.15s"
                    onClick={() => setDetail(car)}
                  >
                    <Box
                      w="120px"
                      flexShrink="0"
                      style={{ background: car.gradient }}
                    >
                      <Image
                        src={car.img}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        opacity="0.8"
                      />
                    </Box>
                    <Box p="12px 16px" flex="1" minW="0">
                      <Flex justify="space-between" align="flex-start" mb="4px">
                        <Box>
                          <Text
                            fontWeight="800"
                            fontSize="14px"
                            color="gray.800"
                          >
                            {car.year} {car.make} {car.model}
                          </Text>
                          <HStack gap="5px" mt="2px">
                            <Badge
                              bg={COND_CFG[car.condition].bg}
                              color={COND_CFG[car.condition].color}
                              borderRadius="4px"
                              fontSize="9px"
                              px="6px"
                              fontWeight="700"
                            >
                              {car.condition}
                            </Badge>
                            <Badge
                              bg={STAT_CFG[car.status].bg}
                              color={STAT_CFG[car.status].color}
                              borderRadius="4px"
                              fontSize="9px"
                              px="6px"
                              fontWeight="700"
                            >
                              {car.status}
                            </Badge>
                          </HStack>
                        </Box>
                        <Text
                          fontSize="16px"
                          fontWeight="900"
                          color={P}
                          flexShrink="0"
                        >
                          {fmt(car.price)}
                        </Text>
                      </Flex>
                      <HStack gap="12px" mt="6px">
                        <Flex
                          align="center"
                          gap="5px"
                          px="7px"
                          py="3px"
                          borderRadius="6px"
                          bg={insp.bg}
                          border="1px solid"
                          borderColor={insp.border}
                          display="inline-flex"
                        >
                          {insp.icon}
                          <Text
                            fontSize="10px"
                            fontWeight="700"
                            color={insp.color}
                          >
                            {car.inspection}
                          </Text>
                          {car.report && (
                            <Text fontSize="10px" color={insp.color}>
                              {' '}
                              · {car.report.overall}/100
                            </Text>
                          )}
                        </Flex>
                        <HStack gap="3px">
                          <Stars rating={car.rating} />
                          <Text fontSize="11px" color="gray.400">
                            {car.rating.toFixed(1)}
                          </Text>
                        </HStack>
                        <HStack gap="3px" color="gray.400">
                          <LocIco />
                          <Text fontSize="11px">{car.location}</Text>
                        </HStack>
                        <HStack gap="3px" color="gray.400">
                          <SpeedIco />
                          <Text fontSize="11px">{fmtK(car.mileage)} km</Text>
                        </HStack>
                      </HStack>
                    </Box>
                  </Flex>
                );
              })}
            </VStack>
          )}
        </Box>

        {/* SIDEBAR */}
        <Box w="256px" minW="256px" flexShrink="0">
          {/* Inspection guide */}
          <Box
            bg={WHITE}
            borderRadius="14px"
            p="16px"
            mb="14px"
            boxShadow="0 2px 8px rgba(0,0,0,0.05)"
          >
            <Text fontWeight="800" fontSize="13px" color="gray.800" mb="12px">
              Inspection Guide
            </Text>
            {(['Inspected', 'Pending', 'Not Inspected'] as InspStatus[]).map(
              (s) => {
                const cfg = INSP_CFG[s];
                const count = CARS.filter((c) => c.inspection === s).length;
                const desc =
                  s === 'Inspected'
                    ? 'Certified by AutoCheck NG'
                    : s === 'Pending'
                      ? 'Currently being inspected'
                      : 'Buyer caution advised';
                return (
                  <Flex
                    key={s}
                    align="center"
                    gap="9px"
                    p="9px"
                    borderRadius="9px"
                    bg={cfg.bg}
                    border="1px solid"
                    borderColor={cfg.border}
                    mb="7px"
                    _last={{ mb: 0 }}
                  >
                    {s === 'Inspected' ? (
                      <ShieldOk size={16} />
                    ) : s === 'Pending' ? (
                      <ShieldPend size={16} />
                    ) : (
                      <ShieldNo size={16} />
                    )}
                    <Box flex="1">
                      <Text fontSize="12px" fontWeight="700" color={cfg.color}>
                        {s}
                      </Text>
                      <Text fontSize="10px" color={cfg.color} opacity="0.7">
                        {desc}
                      </Text>
                    </Box>
                    <Badge
                      bg={cfg.border}
                      color={cfg.color}
                      borderRadius="5px"
                      fontSize="10px"
                      px="6px"
                      fontWeight="700"
                    >
                      {count}
                    </Badge>
                  </Flex>
                );
              },
            )}
          </Box>

          {/* Dealer rankings */}
          <Box
            bg={WHITE}
            borderRadius="14px"
            p="16px"
            mb="14px"
            boxShadow="0 2px 8px rgba(0,0,0,0.05)"
          >
            <Flex justify="space-between" align="center" mb="10px">
              <HStack gap="6px">
                <TrophyIco />
                <Text fontWeight="800" fontSize="13px" color="gray.800">
                  Top Dealers
                </Text>
              </HStack>
              <Text fontSize="11px" color={P} fontWeight="600" cursor="pointer">
                See all
              </Text>
            </Flex>
            <Flex px="12px" mb="6px">
              <Text fontSize="9px" color="gray.400" fontWeight="700" w="28px">
                #
              </Text>
              <Text fontSize="9px" color="gray.400" fontWeight="700" flex="1">
                DEALER
              </Text>
              <Text fontSize="9px" color="gray.400" fontWeight="700">
                SOLD
              </Text>
            </Flex>
            {sortedDealers.map((d, i) => (
              <DealerRankCard key={d.id} dealer={d} rank={i + 1} />
            ))}
          </Box>

          {/* Market stats */}
          <Box
            bg={WHITE}
            borderRadius="14px"
            p="16px"
            boxShadow="0 2px 8px rgba(0,0,0,0.05)"
          >
            <Text fontWeight="800" fontSize="13px" color="gray.800" mb="10px">
              Market Stats
            </Text>
            {[
              ['Total Listings', `${CARS.length}`, '🚗'],
              ['Inspected', `${inspCount} of ${CARS.length}`, '✅'],
              ['Available Now', `${availCount}`, '🟢'],
              [
                'Avg. Price',
                fmt(
                  Math.round(
                    CARS.reduce((a, c) => a + c.price, 0) / CARS.length,
                  ),
                ),
                '💰',
              ],
              [
                'Avg. Rating',
                `${(CARS.reduce((a, c) => a + c.rating, 0) / CARS.length).toFixed(1)} ⭐`,
                '📊',
              ],
              ['Total Dealers', `${DEALERS.length}`, '🏪'],
            ].map(([label, value, icon]) => (
              <Flex
                key={label}
                justify="space-between"
                align="center"
                py="7px"
                borderBottom="1px solid"
                borderColor="gray.50"
                _last={{ borderBottom: 'none' }}
              >
                <HStack gap="6px">
                  <Text fontSize="12px">{icon}</Text>
                  <Text fontSize="11px" color="gray.500">
                    {label}
                  </Text>
                </HStack>
                <Text fontSize="11px" fontWeight="700" color="gray.800">
                  {value}
                </Text>
              </Flex>
            ))}
          </Box>
        </Box>
      </Flex>

      {detail && <DetailModal car={detail} onClose={() => setDetail(null)} />}
    </AppLayout>
  );
}

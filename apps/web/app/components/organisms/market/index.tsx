'use client';

import { useState, useRef, useCallback } from 'react';
import { FaHeart, FaRegHeart, FaSearch, FaTimes } from 'react-icons/fa';
import { LuPlus } from 'react-icons/lu';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';

import { Box, Flex, Text } from '@chakra-ui/react';
import { CarListing } from '../../../shared/types';
import { FYPCard } from './FYPCard';
import { DetailPanel } from './DetailPanel';
import { HeaderPanel } from './HeaderPanel';
import { COLORS } from '../../atoms';

// ─── TYPES ────────────────────────────────────────────────────────────────────
type FilterOpt =
  | 'All'
  | 'Inspected'
  | 'Tokunbo'
  | 'Brand New'
  | 'Nigerian Used';
type SortOpt = 'Newest' | 'Price ↑' | 'Price ↓' | 'Top Rated';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const EXTRA_IMAGES = [
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
  'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80',
];

const CARS: CarListing[] = [
  {
    id: '1',
    title: '2021 Toyota Camry',
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
    fuelType: 'Petrol',
    description: 'Clean Toyota Camry with excellent condition.',
    phone: '08012345678',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    ],
    gradient: 'linear(to-r, gray.700, gray.900)',
    postedAt: '2024-11-02T10:00:00Z',
    sharedTo: [],
    dealerId: 'd1',
    dealerName: 'Lagos Auto Hub',
    dealerRating: 4.8,
    savedCount: 34,
    views: 312,
    rating: 4.7,
    reviewCount: 18,
    daysListed: 3,
  },

  {
    id: '2',
    title: '2020 Honda CR-V',
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
    fuelType: 'Petrol',
    description: 'Reliable Honda CR-V in great shape.',
    phone: '08012345678',
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
    ],
    gradient: 'linear(to-r, blackAlpha.700, gray.900)',
    postedAt: '2024-10-30T10:00:00Z',
    sharedTo: [],
    dealerId: 'd1',
    dealerName: 'Lagos Auto Hub',
    dealerRating: 4.8,
    savedCount: 21,
    views: 198,
    rating: 4.5,
    reviewCount: 12,
    daysListed: 5,
  },

  {
    id: '3',
    title: '2019 Mercedes C300',
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
    fuelType: 'Petrol',
    description: 'Luxury Mercedes with premium interior.',
    phone: '08087654321',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    ],
    gradient: 'linear(to-r, gray.800, black)',
    postedAt: '2024-10-28T10:00:00Z',
    sharedTo: [],
    dealerId: 'd2',
    dealerName: 'Premium Motors NG',
    dealerRating: 4.9,
    savedCount: 58,
    views: 490,
    rating: 4.9,
    reviewCount: 27,
    daysListed: 7,
  },

  {
    id: '4',
    title: '2018 Lexus RX350',
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
    fuelType: 'Petrol',
    description: 'Comfortable Lexus SUV with smooth ride.',
    phone: '07011234567',
    images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    ],
    gradient: 'linear(to-r, yellow.700, orange.900)',
    postedAt: '2024-10-25T10:00:00Z',
    sharedTo: [],
    dealerId: 'd3',
    dealerName: 'Abuja Car Deals',
    dealerRating: 4.2,
    savedCount: 15,
    views: 142,
    rating: 4.1,
    reviewCount: 6,
    daysListed: 10,
  },

  {
    id: '5',
    title: '2022 Toyota Highlander',
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
    fuelType: 'Petrol',
    description: 'Almost new Highlander with low mileage.',
    phone: '08012345678',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    ],
    gradient: 'linear(to-r, red.700, black)',
    postedAt: '2024-11-05T10:00:00Z',
    sharedTo: [],
    dealerId: 'd1',
    dealerName: 'Lagos Auto Hub',
    dealerRating: 4.8,
    savedCount: 72,
    views: 641,
    rating: 5.0,
    reviewCount: 9,
    daysListed: 1,
  },
];
// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n: number) => '₦' + (n / 1_000_000).toFixed(1) + 'M';
const km = (m: number) => (m === 0 ? '0 km' : (m / 1000).toFixed(0) + 'k km');
const initials = (s: string) =>
  s
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

function getSlides(images: string[]): string[] {
  const slides = [...images];
  let i = 0;
  while (slides.length < 4) {
    slides.push(EXTRA_IMAGES[i % EXTRA_IMAGES.length]);
    i++;
  }
  return slides;
}

export default function CarMarketplace() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterOpt>('All');
  const [sort, setSort] = useState<SortOpt>('Newest');
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [detail, setDetail] = useState<CarListing | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [current, setCurrent] = useState(1);
  const feedRef = useRef<HTMLDivElement>(null);

  const toggleSave = (id: string) => setSaved((p) => ({ ...p, [id]: !p[id] }));

  const filtered = CARS.filter((c) => {
    const q = `${c.make} ${c.model} ${c.year} ${c.location}`.toLowerCase();
    if (!q.includes(search.toLowerCase())) return false;
    if (filter === 'All') return true;
    if (filter === 'Inspected') return c.inspection === 'Inspected';
    return c.condition === filter;
  }).sort((a, b) => {
    if (sort === 'Price ↑') return a.price - b.price;
    if (sort === 'Price ↓') return b.price - a.price;
    if (sort === 'Top Rated') return (b.rating ?? 0) - (a.rating ?? 0);
    return a.daysListed ?? 0 - (b.daysListed ?? 0);
  });

  const onFeedScroll = useCallback(() => {
    if (!feedRef.current) return;
    const idx = Math.round(feedRef.current.scrollTop / window.innerHeight) + 1;
    setCurrent(Math.min(idx, filtered.length));
  }, [filtered.length]);

  return (
    <Box
      h="100dvh"
      bg="black"
      overflow="hidden"
      fontFamily="'DM Sans', system-ui, sans-serif"
    >
      {/* Feed */}
      <Box
        ref={feedRef}
        onScroll={onFeedScroll}
        h="100dvh"
        overflowY="scroll"
        css={{
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {filtered.length === 0 ? (
          <Flex
            h="100dvh"
            direction="column"
            align="center"
            justify="center"
            gap="12px"
            color="white"
          >
            <Text fontSize="40px">
              <FaSearch size={20} fill={COLORS.primary} />
            </Text>
            <Text fontSize="16px" fontWeight={700}>
              No cars match your filters
            </Text>
            <Box
              as="button"
              onClick={() => {
                setFilter('All');
                setSearch('');
              }}
              bg="#6C63FF"
              color="white"
              border="none"
              borderRadius="10px"
              px="20px"
              py="10px"
              fontSize="14px"
              fontWeight={700}
              cursor="pointer"
              _hover={{ bg: '#5B54E8' }}
            >
              Clear filters
            </Box>
          </Flex>
        ) : (
          filtered.map((car) => (
            <FYPCard
              initials={initials}
              km={km}
              fmt={fmt}
              getSlides={getSlides}
              key={car.id}
              car={car}
              saved={!!saved[car.id]}
              onSave={() => toggleSave(car.id)}
              onDetail={() => setDetail(car)}
            />
          ))
        )}
      </Box>

      {/* Floating header */}
      <HeaderPanel
        open={panelOpen}
        onClose={() => setPanelOpen((p) => !p)}
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
        current={current}
        total={filtered.length}
      />
      <Box
        position="fixed"
        bottom="290px"
        right="8px"
        zIndex={100}
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="50px"
        h="50px"
        borderRadius="99px"
        bg="rgba(255, 255, 255, 0.781)"
        color="white"
        fontSize="24px"
        cursor="pointer"
      >
        <LuPlus size={30} color="#000" />
      </Box>

      {/* Detail bottom sheet */}
      {detail && (
        <DetailPanel
          initials={initials}
          fmt={fmt}
          car={detail}
          onClose={() => setDetail(null)}
        />
      )}
    </Box>
  );
}

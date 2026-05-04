'use client';

import { useState, useRef, useCallback } from 'react';
import { FaHeart, FaRegHeart, FaSearch, FaTimes } from 'react-icons/fa';
import { LuPlus } from 'react-icons/lu';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';

import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Badge,
  HStack,
  VStack,
  Image,
  Link,
  Grid,
  GridItem,
} from '@chakra-ui/react';

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Condition = 'Brand New' | 'Tokunbo' | 'Nigerian Used';
type InspStatus = 'Inspected' | 'Not Inspected' | 'Pending';
type ListStatus = 'Available' | 'Reserved' | 'Sold';
type FilterOpt =
  | 'All'
  | 'Inspected'
  | 'Tokunbo'
  | 'Brand New'
  | 'Nigerian Used';
type SortOpt = 'Newest' | 'Price ↑' | 'Price ↓' | 'Top Rated';

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
  dealerName: string;
  dealerRating: number;
  phone: string;
  images: string[];
  savedCount: number;
  viewCount: number;
  rating: number;
  reviewCount: number;
  postedDaysAgo: number;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const EXTRA_IMAGES = [
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
  'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80',
];

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
    dealerName: 'Lagos Auto Hub',
    dealerRating: 4.8,
    phone: '08012345678',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    ],
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
    dealerName: 'Lagos Auto Hub',
    dealerRating: 4.8,
    phone: '08012345678',
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
    ],
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
    dealerName: 'Premium Motors NG',
    dealerRating: 4.9,
    phone: '08087654321',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    ],
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
    dealerName: 'Abuja Car Deals',
    dealerRating: 4.2,
    phone: '07011234567',
    images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    ],
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
    dealerName: 'Lagos Auto Hub',
    dealerRating: 4.8,
    phone: '08012345678',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    ],
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
    dealerName: 'PH Motors',
    dealerRating: 3.9,
    phone: '09087654321',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    ],
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
    dealerName: 'Premium Motors NG',
    dealerRating: 4.9,
    phone: '08087654321',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    ],
    savedCount: 49,
    viewCount: 388,
    rating: 4.8,
    reviewCount: 22,
    postedDaysAgo: 2,
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

const COND_COLOR: Record<Condition, { text: string; bg: string }> = {
  'Brand New': { text: '#1e40af', bg: '#dbeafe' },
  Tokunbo: { text: '#0d7a68', bg: '#ccfbf1' },
  'Nigerian Used': { text: '#9a3412', bg: '#fff7ed' },
};
const STATUS_COLOR: Record<ListStatus, { text: string; bg: string }> = {
  Available: { text: '#166534', bg: '#dcfce7' },
  Reserved: { text: '#92400e', bg: '#fef3c7' },
  Sold: { text: '#991b1b', bg: '#fee2e2' },
};
const INSP_COLOR: Record<
  InspStatus,
  { text: string; bg: string; border: string }
> = {
  Inspected: { text: '#166534', bg: '#f0fdf4', border: '#86efac' },
  'Not Inspected': { text: '#991b1b', bg: '#fff1f2', border: '#fecdd3' },
  Pending: { text: '#92400e', bg: '#fffbeb', border: '#fde68a' },
};

// ─── SCORE BAR ────────────────────────────────────────────────────────────────
function ScoreBar({ label, value }: { label: string; value: number }) {
  const color = value >= 8 ? '#16a34a' : value >= 6 ? '#d97706' : '#dc2626';
  return (
    <Flex align="center" gap="8px" mb="5px">
      <Text fontSize="11px" color="whiteAlpha.500" w="90px" flexShrink={0}>
        {label}
      </Text>
      <Box
        flex={1}
        h="4px"
        bg="whiteAlpha.100"
        borderRadius="2px"
        overflow="hidden"
      >
        <Box h="100%" w={`${value * 10}%`} bg={color} borderRadius="2px" />
      </Box>
      <Text
        fontSize="11px"
        fontWeight={700}
        color={color}
        w="20px"
        textAlign="right"
      >
        {value}
      </Text>
    </Flex>
  );
}

// ─── DETAIL BOTTOM SHEET ──────────────────────────────────────────────────────
function DetailPanel({ car, onClose }: { car: Car; onClose: () => void }) {
  const insp = INSP_COLOR[car.inspection];
  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={200}
      bg="blackAlpha.700"
      backdropFilter="blur(6px)"
      display="flex"
      alignItems="flex-end"
      onClick={onClose}
    >
      <Box
        w="100%"
        maxW="560px"
        mx="auto"
        bg="#0f0f0f"
        borderRadius="20px 20px 0 0"
        maxH="85vh"
        overflowY="auto"
        border="1px solid"
        borderColor="whiteAlpha.200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <Flex justify="center" pt="12px">
          <Box w="36px" h="4px" borderRadius="2px" bg="whiteAlpha.300" />
        </Flex>

        <Box p="16px 20px 32px">
          {/* Header */}
          <Flex justify="space-between" align="flex-start" mb="16px">
            <Box>
              <Text fontSize="20px" fontWeight={900} color="white">
                {car.year} {car.make} {car.model}
              </Text>
              <HStack gap="6px" mt="5px">
                <Badge
                  px="8px"
                  py="3px"
                  borderRadius="6px"
                  fontSize="10px"
                  fontWeight={700}
                  bg={COND_COLOR[car.condition].bg}
                  color={COND_COLOR[car.condition].text}
                >
                  {car.condition}
                </Badge>
                <Badge
                  px="8px"
                  py="3px"
                  borderRadius="6px"
                  fontSize="10px"
                  fontWeight={700}
                  bg={STATUS_COLOR[car.status].bg}
                  color={STATUS_COLOR[car.status].text}
                >
                  {car.status}
                </Badge>
              </HStack>
            </Box>
            <Box
              as="button"
              onClick={onClose}
              bg="whiteAlpha.200"
              border="none"
              color="white"
              borderRadius="99px"
              w="32px"
              h="32px"
              cursor="pointer"
              fontSize="16px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: 'whiteAlpha.300' }}
            >
              ✕
            </Box>
          </Flex>

          {/* Price */}
          <Text fontSize="30px" fontWeight={900} color="#6C63FF" mb="4px">
            {fmt(car.price)}
          </Text>
          <Text fontSize="12px" color="whiteAlpha.600" mb="18px">
            📍 {car.location} · {car.viewCount} views · {car.savedCount} saves
          </Text>

          {/* Specs grid */}
          <Grid templateColumns="1fr 1fr" gap="8px" mb="18px">
            {[
              ['Transmission', car.transmission],
              ['Fuel', car.fuel],
              ['Color', car.color],
              ['Mileage', `${car.mileage.toLocaleString()} km`],
              ['Posted', `${car.postedDaysAgo}d ago`],
              ['Rating', `⭐ ${car.rating} (${car.reviewCount})`],
            ].map(([k, v]) => (
              <Box key={k} bg="whiteAlpha.100" borderRadius="10px" p="9px 12px">
                <Text
                  fontSize="10px"
                  color="whiteAlpha.500"
                  fontWeight={600}
                  mb="2px"
                >
                  {k}
                </Text>
                <Text fontSize="13px" fontWeight={700} color="white">
                  {v}
                </Text>
              </Box>
            ))}
          </Grid>

          {/* Inspection */}
          <Box mb="18px">
            <Text
              fontSize="10px"
              fontWeight={700}
              color="whiteAlpha.500"
              textTransform="uppercase"
              letterSpacing="0.5px"
              mb="8px"
            >
              Inspection
            </Text>
            <Flex
              align="center"
              gap="10px"
              p="10px 14px"
              borderRadius="10px"
              bg={insp.bg}
              border="1px solid"
              borderColor={insp.border}
              mb="10px"
            >
              <Text fontSize="16px">
                {car.inspection === 'Inspected'
                  ? '🛡️'
                  : car.inspection === 'Pending'
                    ? '⏳'
                    : '⚠️'}
              </Text>
              <Text flex={1} fontSize="13px" fontWeight={700} color={insp.text}>
                {car.inspection}
              </Text>
              {car.report && (
                <Text fontSize="22px" fontWeight={900} color={insp.text}>
                  {car.report.overall}
                  <Text as="span" fontSize="11px">
                    /100
                  </Text>
                </Text>
              )}
            </Flex>
            {car.report && (
              <Box bg="whiteAlpha.50" borderRadius="10px" p="12px 14px">
                <ScoreBar label="Engine" value={car.report.engine} />
                <ScoreBar label="Exterior" value={car.report.exterior} />
                <ScoreBar label="Interior" value={car.report.interior} />
                <ScoreBar
                  label="Transmission"
                  value={car.report.transmission}
                />
                <ScoreBar label="Electronics" value={car.report.electronics} />
                <Flex justify="space-between" mt="8px">
                  <Text fontSize="10px" color="whiteAlpha.400">
                    By {car.report.inspector}
                  </Text>
                  <Text fontSize="10px" color="whiteAlpha.400">
                    {car.report.date}
                  </Text>
                </Flex>
              </Box>
            )}
          </Box>

          {/* Dealer */}
          <Box bg="whiteAlpha.100" borderRadius="12px" p="12px 14px" mb="20px">
            <Text
              fontSize="10px"
              fontWeight={700}
              color="whiteAlpha.500"
              textTransform="uppercase"
              letterSpacing="0.5px"
              mb="8px"
            >
              Dealer
            </Text>
            <HStack gap="10px">
              <Flex
                w="36px"
                h="36px"
                borderRadius="99px"
                bg="#fbbf24"
                align="center"
                justify="center"
                fontSize="12px"
                fontWeight={900}
                color="white"
                flexShrink={0}
              >
                {initials(car.dealerName)}
              </Flex>
              <Box>
                <Text fontSize="13px" fontWeight={700} color="white">
                  {car.dealerName}
                </Text>
                <Text fontSize="11px" color="#fbbf24">
                  ⭐ {car.dealerRating}
                </Text>
              </Box>
            </HStack>
          </Box>

          {/* CTAs */}
          <HStack gap="10px">
            <Link
              href={`https://wa.me/234${car.phone.slice(1)}`}
              target="_blank"
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="8px"
              bg="#25D366"
              color="white"
              borderRadius="12px"
              h="48px"
              fontSize="14px"
              fontWeight={700}
              textDecoration="none"
              _hover={{ opacity: 0.9 }}
            >
              💬 WhatsApp
            </Link>
            <Link
              href={`tel:${car.phone}`}
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="8px"
              bg="rgba(108,99,255,0.2)"
              color="#a5a0ff"
              borderRadius="12px"
              h="48px"
              fontSize="14px"
              fontWeight={700}
              textDecoration="none"
              border="1px solid"
              borderColor="rgba(108,99,255,0.3)"
              _hover={{ opacity: 0.9 }}
            >
              📞 Call
            </Link>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}

// ─── FYP CARD ─────────────────────────────────────────────────────────────────
function FYPCard({
  car,
  saved,
  onSave,
  onDetail,
}: {
  car: Car;
  saved: boolean;
  onSave: () => void;
  onDetail: () => void;
}) {
  const slides = getSlides(car.images);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cond = COND_COLOR[car.condition];
  const insp = INSP_COLOR[car.inspection];

  const goTo = (idx: number) => {
    const next = Math.max(0, Math.min(idx, slides.length - 1));
    scrollRef.current?.scrollTo({
      left: next * window.innerWidth,
      behavior: 'smooth',
    });
    setActiveSlide(next);
  };

  const onScroll = () => {
    if (!scrollRef.current) return;
    const idx = Math.round(scrollRef.current.scrollLeft / window.innerWidth);
    setActiveSlide(Math.min(idx, slides.length - 1));
  };

  return (
    <Box
      h="100dvh"
      position="relative"
      overflow="hidden"
      flexShrink={0}
      scrollSnapAlign="start"
    >
      {/* ── Image slider ── */}
      <Box
        ref={scrollRef}
        onScroll={onScroll}
        display="flex"
        overflowX="auto"
        h="100%"
        css={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {slides.map((uri, idx) => (
          <Box
            key={idx}
            minW="100vw"
            h="100%"
            position="relative"
            bg="#111"
            scrollSnapAlign="start"
          >
            <Image
              src={uri}
              position="absolute"
              inset={0}
              w="100%"
              h="90%"
              objectFit="cover"
              filter="blur(20px)"
              transform="scale(1.08)"
              opacity={0.55}
              alt=""
            />
            <Box position="absolute" inset={0} bg="blackAlpha.400" />
            <Image
              src={uri}
              alt={`${car.make} ${car.model}`}
              position="absolute"
              inset={0}
              w="100%"
              h="100%"
              objectFit="contain"
            />
          </Box>
        ))}
      </Box>

      {/* ── Arrows ── */}
      {activeSlide > 0 && (
        <Box
          as="button"
          onClick={() => goTo(activeSlide - 1)}
          position="absolute"
          left="12px"
          top="50%"
          transform="translateY(-50%)"
          w="40px"
          h="40px"
          borderRadius="99px"
          bg="blackAlpha.600"
          border="1px solid"
          borderColor="whiteAlpha.300"
          color="white"
          fontSize="22px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          zIndex={10}
          _hover={{ bg: 'blackAlpha.800' }}
        >
          ‹
        </Box>
      )}
      {activeSlide < slides.length - 1 && (
        <Box
          as="button"
          onClick={() => goTo(activeSlide + 1)}
          position="absolute"
          right="12px"
          top="50%"
          transform="translateY(-50%)"
          w="40px"
          h="40px"
          borderRadius="99px"
          bg="blackAlpha.600"
          border="1px solid"
          borderColor="whiteAlpha.300"
          color="white"
          fontSize="22px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          zIndex={10}
          _hover={{ bg: 'blackAlpha.800' }}
        >
          ›
        </Box>
      )}

      {/* ── Dot indicators ── */}
      <HStack
        position="absolute"
        bottom="220px"
        left="50%"
        transform="translateX(-50%)"
        gap="6px"
      >
        {slides.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => goTo(idx)}
            w={idx === activeSlide ? '18px' : '6px'}
            h="6px"
            borderRadius="99px"
            bg={idx === activeSlide ? 'white' : 'whiteAlpha.400'}
            transition="all 0.25s"
            cursor="pointer"
          />
        ))}
      </HStack>

      {/* ── Condition pill — top left ── */}
      <Box position="absolute" bottom="205px" left="16px">
        <Badge
          px="10px"
          py="4px"
          borderRadius="99px"
          fontSize="11px"
          fontWeight={700}
          letterSpacing="0.5px"
          textTransform="uppercase"
          bg={cond.bg}
          color={cond.text}
        >
          {car.condition}
        </Badge>
      </Box>

      {/* ── Inspection score + save — top right ── */}
      <VStack
        position="absolute"
        top="6%"
        right="16px"
        align="flex-end"
        gap="8px"
      >
        {car.inspection === 'Inspected' && (
          <HStack
            bg="whiteAlpha.900"
            borderRadius="99px"
            px="10px"
            py="4px"
            gap="5px"
          >
            <Box w="7px" h="7px" borderRadius="99px" bg="#22c55e" />
            <Text fontSize="11px" fontWeight={700} color="gray.800">
              {car.report?.overall}/100
            </Text>
          </HStack>
        )}
      </VStack>

      <VStack
        position="absolute"
        bottom="250px"
        right="16px"
        as="button"
        onClick={onSave}
        cursor="pointer"
        _hover={{ bg: 'blackAlpha.700' }}
      >
        {saved ? (
          <FaHeart size={30} color="red" />
        ) : (
          <FaRegHeart size={30} color="white" />
        )}
      </VStack>
      {/* ── Bottom overlay ── */}
      <Box
        onClick={onDetail}
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bgGradient="linear(to-t, blackAlpha.900, transparent)"
        px="16px"
        pt="40px"
        pb="36px"
        cursor="pointer"
      >
        <Text
          fontSize={{ base: '22px', md: '28px' }}
          fontWeight={900}
          color="white"
          letterSpacing="0.3px"
        >
          {fmt(car.price)}
        </Text>
        <Text
          fontSize={{ base: '15px', md: '19px' }}
          fontWeight={800}
          color="white"
          my="3px"
        >
          {car.year} {car.make} {car.model}
        </Text>

        <Flex
          align="center"
          gap="8px"
          flexWrap="wrap"
          mb="14px"
          opacity={0.85}
          fontSize={{ base: '11px', md: '13px' }}
        >
          <Text color="white">📍 {car.location}</Text>
          <Box w="3px" h="3px" borderRadius="99px" bg="whiteAlpha.500" />
          <Text color="white">🛣 {km(car.mileage)}</Text>
          <Box w="3px" h="3px" borderRadius="99px" bg="whiteAlpha.500" />
          <Text color="white">⛽ {car.fuel}</Text>
          <Box w="3px" h="3px" borderRadius="99px" bg="whiteAlpha.500" />
          <Badge
            px="7px"
            py="2px"
            borderRadius="6px"
            fontSize="10px"
            fontWeight={700}
            bg={insp.bg}
            color={insp.text}
          >
            {car.inspection}
          </Badge>
        </Flex>

        <Flex align="center" gap="10px">
          <Flex
            w="32px"
            h="32px"
            borderRadius="99px"
            bg="#fbbf24"
            align="center"
            justify="center"
            fontSize="11px"
            fontWeight={900}
            color="white"
            flexShrink={0}
          >
            {initials(car.dealerName)}
          </Flex>
          <Box flex={1} minW={0}>
            <Text fontSize="12px" fontWeight={700} color="white" lineClamp={1}>
              {car.dealerName}
            </Text>
            <Text fontSize="11px" color="#fbbf24">
              ⭐ {car.dealerRating}
            </Text>
          </Box>
          <Link
            href={`tel:${car.phone}`}
            onClick={(e) => e.stopPropagation()}
            display="flex"
            alignItems="center"
            gap="4px"
            bg="whiteAlpha.900"
            borderRadius="10px"
            px="12px"
            py="8px"
            fontSize="12px"
            fontWeight={700}
            color="gray.700"
            textDecoration="none"
            flexShrink={0}
            _hover={{ bg: 'white' }}
          >
            <FaPhoneAlt /> Call
          </Link>
          <Link
            href={`https://wa.me/234${car.phone.slice(1)}`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            display="flex"
            alignItems="center"
            gap="4px"
            bg="#dcfce7"
            borderRadius="10px"
            px="12px"
            py="8px"
            fontSize="12px"
            fontWeight={700}
            color="#16a34a"
            textDecoration="none"
            flexShrink={0}
            _hover={{ bg: '#bbf7d0' }}
          >
            <FaWhatsapp />
            Chat
          </Link>
        </Flex>

        <Text
          fontSize="11px"
          color="whiteAlpha.500"
          mt="10px"
          textAlign="center"
        >
          Tap for full details · {car.viewCount} views · {car.savedCount} saves
        </Text>
      </Box>
    </Box>
  );
}

// ─── HEADER PANEL ─────────────────────────────────────────────────────────────
function HeaderPanel({
  open,
  onClose,
  search,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
  current,
  total,
}: {
  open: boolean;
  onClose: () => void;
  search: string;
  setSearch: (v: string) => void;
  filter: FilterOpt;
  setFilter: (v: FilterOpt) => void;
  sort: SortOpt;
  setSort: (v: SortOpt) => void;
  current: number;
  total: number;
}) {
  return (
    <>
      {open && <Box position="fixed" inset={0} zIndex={98} onClick={onClose} />}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={99}
        bg={open ? 'rgba(0,0,0,0.92)' : 'transparent'}
        backdropFilter={open ? 'blur(16px)' : 'none'}
        pt={open ? '52px' : '14px'}
        px="16px"
        pb={open ? '16px' : 0}
        transition="all 0.25s"
        pointerEvents="none"
      >
        {/* Always-visible bar */}
        <Flex justify="space-between" align="center" pointerEvents="all">
          <Text
            fontSize="22px"
            fontWeight={900}
            color="white"
            bg="blackAlpha.400"
            borderRadius="9px"
            px="10px"
            py="3px"
          >
            Marketplace
          </Text>
          <HStack gap="8px">
            <Box
              as="button"
              onClick={onClose}
              display="flex"
              alignItems="center"
              gap="6px"
              bg="blackAlpha.600"
              border="1px solid"
              borderColor="whiteAlpha.300"
              borderRadius="99px"
              px="13px"
              py="7px"
              color="white"
              cursor="pointer"
              fontSize="12px"
              fontWeight={700}
              _hover={{ bg: 'blackAlpha.800' }}
            >
              {open ? <FaTimes /> : <FaSearch size={20} />}
            </Box>
          </HStack>
        </Flex>

        {/* Expanded content */}
        {open && (
          <Box mt="14px" pointerEvents="all">
            {/* Search */}
            <Flex
              align="center"
              gap="8px"
              bg="whiteAlpha.100"
              border="1px solid"
              borderColor="whiteAlpha.200"
              borderRadius="10px"
              px="14px"
              h="42px"
              mb="10px"
            >
              <Text fontSize="15px">
                <FaSearch color="#fff" />
              </Text>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Make, model, location..."
                bg="transparent"
                border="none"
                outline="none"
                color="white"
                fontSize="14px"
                _placeholder={{ color: 'whiteAlpha.400' }}
                _focus={{ boxShadow: 'none' }}
                p={0}
              />
            </Flex>

            {/* Filter chips */}
            <Flex
              gap="7px"
              overflowX="auto"
              pb="10px"
              css={{
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {(
                [
                  'All',
                  'Inspected',
                  'Tokunbo',
                  'Brand New',
                  'Nigerian Used',
                ] as FilterOpt[]
              ).map((f) => (
                <Box
                  key={f}
                  as="button"
                  onClick={() => setFilter(f)}
                  px="12px"
                  py="5px"
                  borderRadius="99px"
                  flexShrink={0}
                  bg={filter === f ? '#6C63FF' : 'whiteAlpha.100'}
                  border="1px solid"
                  borderColor={filter === f ? '#6C63FF' : 'whiteAlpha.200'}
                  color={filter === f ? 'white' : 'whiteAlpha.700'}
                  fontSize="12px"
                  fontWeight={600}
                  cursor="pointer"
                  _hover={{ bg: filter === f ? '#5B54E8' : 'whiteAlpha.200' }}
                >
                  {f}
                </Box>
              ))}
            </Flex>

            {/* Sort chips */}
            <Flex
              align="center"
              gap="7px"
              overflowX="auto"
              css={{
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              <Text
                fontSize="12px"
                fontWeight={700}
                color="whiteAlpha.500"
                flexShrink={0}
              >
                Sort:
              </Text>
              {(['Newest', 'Price ↑', 'Price ↓', 'Top Rated'] as SortOpt[]).map(
                (o) => (
                  <Box
                    key={o}
                    as="button"
                    onClick={() => setSort(o)}
                    px="11px"
                    py="4px"
                    borderRadius="99px"
                    flexShrink={0}
                    bg={sort === o ? '#6C63FF' : 'whiteAlpha.100'}
                    border="1px solid"
                    borderColor={sort === o ? '#6C63FF' : 'whiteAlpha.200'}
                    color={sort === o ? 'white' : 'whiteAlpha.600'}
                    fontSize="11px"
                    fontWeight={600}
                    cursor="pointer"
                    _hover={{ bg: sort === o ? '#5B54E8' : 'whiteAlpha.200' }}
                  >
                    {o}
                  </Box>
                ),
              )}
            </Flex>
          </Box>
        )}
      </Box>
    </>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function CarMarketplace() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterOpt>('All');
  const [sort, setSort] = useState<SortOpt>('Newest');
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [detail, setDetail] = useState<Car | null>(null);
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
    if (sort === 'Top Rated') return b.rating - a.rating;
    return a.postedDaysAgo - b.postedDaysAgo;
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
            <Text fontSize="40px">🔍</Text>
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
      {detail && <DetailPanel car={detail} onClose={() => setDetail(null)} />}
    </Box>
  );
}

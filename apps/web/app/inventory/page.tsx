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
  Textarea,
  Image,
} from '@chakra-ui/react';
import type { CarListing, Condition, ListingStatus } from '../shared/types';
import AppLayout from '../components/template/general-layout';

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const P = '#6C63FF';
const P_DARK = '#5B54E8';
const P_LIGHT = '#EEF0FF';
const BG = '#F4F5FA';
const WHITE = '#FFFFFF';

// ─── TYPES ────────────────────────────────────────────────────────────────────
type ViewMode = 'grid' | 'list';
type ModalMode = 'add' | 'edit' | 'view' | null;

// ─── ICONS ───────────────────────────────────────────────────────────────────
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
const PlusIco = () => <Ico d="M12 5v14M5 12h14" size={15} sw={2.5} />;
const GridIco = () => (
  <svg
    width="15"
    height="15"
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
const EditIco = () => (
  <Ico
    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
    size={14}
  />
);
const TrashIco = () => (
  <Ico
    d={[
      'M3 6h18',
      'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2',
    ]}
    size={14}
  />
);
const ShareIco = () => (
  <Ico
    d={[
      'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8',
      'M16 6l-4-4-4 4',
      'M12 2v13',
    ]}
    size={14}
  />
);
const CloseIco = () => <Ico d="M18 6 6 18M6 6l12 12" sw={2.5} />;
const CarIco = () => (
  <Ico
    d={[
      'M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v8a2 2 0 0 1-2 2h-3',
      'M7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0',
      'M15 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0',
    ]}
    size={18}
  />
);
const FilterIco = () => (
  <Ico d={['M22 3H2l8 9.46V19l4 2v-8.54L22 3']} size={15} />
);
const CheckIco = () => <Ico d="M20 6 9 17l-5-5" sw={2.5} size={12} />;
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

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`;

const STATUS_CFG: Record<
  ListingStatus,
  { bg: string; color: string; label: string }
> = {
  Available: { bg: '#C6F6D5', color: '#276749', label: 'Available' },
  Reserved: { bg: '#FEFCBF', color: '#744210', label: 'Reserved' },
  Sold: { bg: '#FED7D7', color: '#9B2C2C', label: 'Sold' },
};

const CONDITION_CFG: Record<Condition, { bg: string; color: string }> = {
  'Brand New': { bg: P_LIGHT, color: P },
  Tokunbo: { bg: '#E6FFFA', color: '#2C7A7B' },
  'Nigerian Used': { bg: '#FFFAF0', color: '#C05621' },
};

// ─── SEED DATA ────────────────────────────────────────────────────────────────
const SEED: CarListing[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2021,
    price: 16500000,
    mileage: 42000,
    condition: 'Tokunbo',
    status: 'Available',
    location: 'Lekki, Lagos',
    color: 'Silver',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    description:
      'Clean Tokunbo Camry. Full option, leather seats, reverse camera. No accident history.',
    phone: '08012345678',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=240&fit=crop',
    ],
    gradient: 'linear-gradient(135deg,#3F51B5,#6C63FF)',
    postedAt: '2024-11-01',
    sharedTo: ['whatsapp', 'facebook'],
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
    location: 'Ikeja, Lagos',
    color: 'Black',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    description:
      'Honda CR-V 2020. Very clean. Push start, sunroof, all sensors working.',
    phone: '08012345678',
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=240&fit=crop',
    ],
    gradient: 'linear-gradient(135deg,#1a1a2e,#16213e)',
    postedAt: '2024-11-03',
    sharedTo: ['whatsapp'],
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
    location: 'Victoria Island',
    color: 'White',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    description:
      'Mercedes-Benz C300 2019. Sport package, AMG trim, panoramic roof.',
    phone: '08012345678',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=240&fit=crop',
    ],
    gradient: 'linear-gradient(135deg,#e0e0e0,#9e9e9e)',
    postedAt: '2024-10-28',
    sharedTo: ['whatsapp', 'facebook', 'instagram'],
  },
  {
    id: '4',
    make: 'Lexus',
    model: 'RX350',
    year: 2018,
    price: 28000000,
    mileage: 68000,
    condition: 'Tokunbo',
    status: 'Sold',
    location: 'Abuja, FCT',
    color: 'Gold',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    description: 'Lexus RX350 2018. Full option, cooled seats, navigation.',
    phone: '08012345678',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=240&fit=crop',
    ],
    gradient: 'linear-gradient(135deg,#b8860b,#ffd700)',
    postedAt: '2024-10-15',
    sharedTo: ['whatsapp', 'instagram'],
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
    location: 'Lekki, Lagos',
    color: 'Red',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    description: '2022 Highlander. Almost brand new. 7-seater, full spec.',
    phone: '08012345678',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=240&fit=crop',
    ],
    gradient: 'linear-gradient(135deg,#c62828,#e53935)',
    postedAt: '2024-11-05',
    sharedTo: [],
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
    location: 'Port Harcourt',
    color: 'Blue',
    transmission: 'Manual',
    fuelType: 'Diesel',
    description:
      'Ford Ranger 2020. Diesel. Strong engine, good for rough terrain.',
    phone: '08012345678',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop',
    ],
    gradient: 'linear-gradient(135deg,#1565C0,#1976D2)',
    postedAt: '2024-11-02',
    sharedTo: ['facebook'],
  },
];

// ─── BLANK FORM ───────────────────────────────────────────────────────────────
const BLANK: Omit<CarListing, 'id' | 'postedAt' | 'sharedTo'> = {
  make: '',
  model: '',
  year: new Date().getFullYear(),
  price: 0,
  mileage: 0,
  condition: 'Tokunbo',
  status: 'Available',
  location: '',
  color: '',
  transmission: 'Automatic',
  fuelType: 'Petrol',
  description: '',
  phone: '',
  images: [],
  gradient: `linear-gradient(135deg,${P},${P_DARK})`,
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
interface CarCardProps {
  car: CarListing;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
  onView: () => void;
}

function CarCard({
  car,
  onEdit,
  onDelete,
  onShare,
  onView,
}: CarCardProps): JSX.Element {
  const statusCfg = STATUS_CFG[car.status];
  const conditionCfg = CONDITION_CFG[car.condition];
  return (
    <Box
      bg={WHITE}
      borderRadius="16px"
      overflow="hidden"
      boxShadow="0 2px 12px rgba(0,0,0,0.06)"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 28px rgba(108,99,255,0.15)',
      }}
      transition="all 0.2s"
      cursor="pointer"
      onClick={onView}
    >
      {/* Image */}
      <Box
        h="150px"
        position="relative"
        overflow="hidden"
        style={{ background: car.gradient }}
      >
        {car.images[0] && (
          <Image
            src={car.images[0]}
            position="absolute"
            inset="0"
            w="100%"
            h="100%"
            objectFit="cover"
            opacity="0.75"
          />
        )}
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-t,rgba(0,0,0,0.45),transparent)"
        />
        {/* Status badge */}
        <Badge
          position="absolute"
          top="10px"
          left="10px"
          bg={statusCfg.bg}
          color={statusCfg.color}
          borderRadius="6px"
          fontSize="10px"
          px="8px"
          py="2px"
          fontWeight="700"
        >
          {car.status}
        </Badge>
        {/* Shared indicators */}
        <HStack position="absolute" top="10px" right="10px" gap="4px">
          {car.sharedTo.map((p: any) => (
            <Box
              key={p}
              w="20px"
              h="20px"
              borderRadius="5px"
              bg={
                p === 'whatsapp'
                  ? '#25D366'
                  : p === 'facebook'
                    ? '#1877F2'
                    : '#E1306C'
              }
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="9px" color="white" fontWeight="900">
                {p === 'whatsapp' ? 'W' : p === 'facebook' ? 'f' : 'ig'}
              </Text>
            </Box>
          ))}
        </HStack>
        {/* Year */}
        <Text
          position="absolute"
          bottom="8px"
          left="10px"
          fontSize="11px"
          color="whiteAlpha.800"
          fontWeight="600"
        >
          {car.year}
        </Text>
      </Box>
      {/* Info */}
      <Box p="14px">
        <Text fontWeight="800" fontSize="14px" color="gray.800" lineClamp={1}>
          {car.make} {car.model}
        </Text>
        <HStack gap="6px" mt="4px" mb="10px" wrap="wrap">
          <Badge
            bg={conditionCfg.bg}
            color={conditionCfg.color}
            borderRadius="5px"
            fontSize="9px"
            px="6px"
            py="1px"
            fontWeight="700"
          >
            {car.condition}
          </Badge>
          <Text fontSize="11px" color="gray.400">
            {car.mileage.toLocaleString()} km
          </Text>
          <Text fontSize="11px" color="gray.400">
            ·
          </Text>
          <Text fontSize="11px" color="gray.400">
            {car.transmission}
          </Text>
        </HStack>
        <Flex justify="space-between" align="center">
          <Text fontSize="16px" fontWeight="800" color={P}>
            {fmt(car.price)}
          </Text>
          <HStack gap="4px" onClick={(e) => e.stopPropagation()}>
            <Box
              as="button"
              onClick={onShare}
              w="28px"
              h="28px"
              borderRadius="7px"
              bg={P_LIGHT}
              color={P}
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: `${P}25` }}
              transition="all 0.15s"
              title="Share"
            >
              <ShareIco />
            </Box>
            <Box
              as="button"
              onClick={onEdit}
              w="28px"
              h="28px"
              borderRadius="7px"
              bg="gray.100"
              color="gray.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: 'gray.200' }}
              transition="all 0.15s"
              title="Edit"
            >
              <EditIco />
            </Box>
            <Box
              as="button"
              onClick={onDelete}
              w="28px"
              h="28px"
              borderRadius="7px"
              bg="red.50"
              color="red.400"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: 'red.100' }}
              transition="all 0.15s"
              title="Delete"
            >
              <TrashIco />
            </Box>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}

// ─── LIST ROW ─────────────────────────────────────────────────────────────────
interface ListRowProps {
  car: CarListing;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
}
function ListRow({
  car,
  onEdit,
  onDelete,
  onShare,
}: ListRowProps): JSX.Element {
  const statusCfg = STATUS_CFG[car.status];
  return (
    <Flex
      align="center"
      px="20px"
      py="14px"
      bg={WHITE}
      borderRadius="12px"
      boxShadow="0 1px 6px rgba(0,0,0,0.05)"
      gap="16px"
      _hover={{ boxShadow: '0 4px 14px rgba(108,99,255,0.1)' }}
      transition="all 0.15s"
    >
      {/* Thumbnail */}
      <Box
        w="56px"
        h="40px"
        borderRadius="8px"
        overflow="hidden"
        flexShrink="0"
        style={{ background: car.gradient }}
      >
        {car.images[0] && (
          <Image
            src={car.images[0]}
            w="100%"
            h="100%"
            objectFit="cover"
            opacity="0.8"
          />
        )}
      </Box>
      <Box flex="2" minW="0">
        <Text fontWeight="700" fontSize="13px" color="gray.800" lineClamp={1}>
          {car.year} {car.make} {car.model}
        </Text>
        <Text fontSize="11px" color="gray.400">
          {car.location}
        </Text>
      </Box>
      <Text flex="1" fontSize="14px" fontWeight="800" color={P} minW="0">
        {fmt(car.price)}
      </Text>
      <Badge
        bg={statusCfg.bg}
        color={statusCfg.color}
        borderRadius="6px"
        fontSize="10px"
        px="10px"
        py="3px"
        fontWeight="700"
        flexShrink="0"
      >
        {car.status}
      </Badge>
      <Text flex="1" fontSize="12px" color="gray.500" minW="0">
        {car.condition}
      </Text>
      <Text flex="1" fontSize="12px" color="gray.500" minW="0">
        {car.mileage.toLocaleString()} km
      </Text>
      <HStack gap="6px" flexShrink="0">
        <Box
          as="button"
          onClick={onShare}
          w="28px"
          h="28px"
          borderRadius="7px"
          bg={P_LIGHT}
          color={P}
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{ bg: `${P}25` }}
          transition="all 0.15s"
        >
          <ShareIco />
        </Box>
        <Box
          as="button"
          onClick={onEdit}
          w="28px"
          h="28px"
          borderRadius="7px"
          bg="gray.100"
          color="gray.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{ bg: 'gray.200' }}
          transition="all 0.15s"
        >
          <EditIco />
        </Box>
        <Box
          as="button"
          onClick={onDelete}
          w="28px"
          h="28px"
          borderRadius="7px"
          bg="red.50"
          color="red.400"
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{ bg: 'red.100' }}
          transition="all 0.15s"
        >
          <TrashIco />
        </Box>
      </HStack>
    </Flex>
  );
}

// ─── ADD / EDIT MODAL ─────────────────────────────────────────────────────────
interface FormModalProps {
  mode: 'add' | 'edit';
  car: CarListing;
  onSave: (c: CarListing) => void;
  onClose: () => void;
}

function FormModal({
  mode,
  car,
  onSave,
  onClose,
}: FormModalProps): JSX.Element {
  const [form, setForm] = useState<CarListing>(car);
  const set = (k: keyof CarListing, v: unknown) =>
    setForm((p: any) => ({ ...p, [k]: v }));

  const labelStyle = {
    fontSize: '11px',
    fontWeight: '700',
    color: 'gray.500',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.4px',
    mb: '5px',
  };
  const inputStyle = {
    bg: 'gray.50',
    border: '1px solid',
    borderColor: 'gray.200',
    borderRadius: '10px',
    fontSize: '13px',
    h: '38px',
    _focus: { bg: 'white', borderColor: P, boxShadow: `0 0 0 1px ${P}` },
    _placeholder: { color: 'gray.300' },
  };

  return (
    <>
      <Box
        position="fixed"
        inset="0"
        bg="blackAlpha.500"
        zIndex="1000"
        onClick={onClose}
        style={{ backdropFilter: 'blur(3px)' }}
      />
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
        zIndex="1001"
        w="600px"
        maxW="95vw"
        maxH="90vh"
        bg={WHITE}
        borderRadius="20px"
        boxShadow="0 24px 80px rgba(0,0,0,0.18)"
        overflow="hidden"
        display="flex"
        flexDir="column"
      >
        {/* Header */}
        <Flex
          align="center"
          justify="space-between"
          px="24px"
          py="18px"
          borderBottom="1px solid"
          borderColor="gray.100"
          flexShrink="0"
        >
          <Box>
            <Text fontWeight="800" fontSize="17px" color="gray.800">
              {mode === 'add' ? 'Add New Listing' : 'Edit Listing'}
            </Text>
            <Text fontSize="12px" color="gray.400">
              {mode === 'add'
                ? 'Fill in the car details below'
                : `Editing ${form.year} ${form.make} ${form.model}`}
            </Text>
          </Box>
          <Box
            as="button"
            onClick={onClose}
            w="32px"
            h="32px"
            borderRadius="8px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="gray.400"
            _hover={{ bg: 'gray.100' }}
          >
            <CloseIco />
          </Box>
        </Flex>

        {/* Body */}
        <Box overflow="auto" p="24px" flex="1">
          <Grid templateColumns="1fr 1fr" gap="16px">
            {/* Make */}
            <Box>
              <Text {...labelStyle}>Make</Text>
              <Input
                {...inputStyle}
                value={form.make}
                placeholder="e.g. Toyota"
                onChange={(e) => set('make', e.target.value)}
              />
            </Box>
            {/* Model */}
            <Box>
              <Text {...labelStyle}>Model</Text>
              <Input
                {...inputStyle}
                value={form.model}
                placeholder="e.g. Camry"
                onChange={(e) => set('model', e.target.value)}
              />
            </Box>
            {/* Year */}
            <Box>
              <Text {...labelStyle}>Year</Text>
              <Input
                {...inputStyle}
                type="number"
                value={form.year}
                onChange={(e) => set('year', Number(e.target.value))}
              />
            </Box>
            {/* Price */}
            <Box>
              <Text {...labelStyle}>Price (₦)</Text>
              <Input
                {...inputStyle}
                type="number"
                value={form.price}
                placeholder="e.g. 16500000"
                onChange={(e) => set('price', Number(e.target.value))}
              />
            </Box>
            {/* Mileage */}
            <Box>
              <Text {...labelStyle}>Mileage (km)</Text>
              <Input
                {...inputStyle}
                type="number"
                value={form.mileage}
                onChange={(e) => set('mileage', Number(e.target.value))}
              />
            </Box>
            {/* Phone */}
            <Box>
              <Text {...labelStyle}>Contact Phone</Text>
              <Input
                {...inputStyle}
                value={form.phone}
                placeholder="080XXXXXXXX"
                onChange={(e) => set('phone', e.target.value)}
              />
            </Box>
            {/* Location */}
            <Box>
              <Text {...labelStyle}>Location</Text>
              <Input
                {...inputStyle}
                value={form.location}
                placeholder="e.g. Lekki, Lagos"
                onChange={(e) => set('location', e.target.value)}
              />
            </Box>
            {/* Color */}
            <Box>
              <Text {...labelStyle}>Color</Text>
              <Input
                {...inputStyle}
                value={form.color}
                placeholder="e.g. Silver"
                onChange={(e) => set('color', e.target.value)}
              />
            </Box>
            {/* Condition */}
            <Box>
              <Text {...labelStyle}>Condition</Text>
              <Flex gap="6px">
                {(['Brand New', 'Tokunbo', 'Nigerian Used'] as Condition[]).map(
                  (c) => (
                    <Box
                      key={c}
                      as="button"
                      onClick={() => set('condition', c)}
                      flex="1"
                      py="8px"
                      borderRadius="8px"
                      fontSize="10px"
                      fontWeight="700"
                      border="1.5px solid"
                      transition="all 0.15s"
                      borderColor={form.condition === c ? P : 'gray.200'}
                      bg={form.condition === c ? P_LIGHT : WHITE}
                      color={form.condition === c ? P : 'gray.500'}
                    >
                      {c}
                    </Box>
                  ),
                )}
              </Flex>
            </Box>
            {/* Status */}
            <Box>
              <Text {...labelStyle}>Status</Text>
              <Flex gap="6px">
                {(['Available', 'Reserved', 'Sold'] as ListingStatus[]).map(
                  (s) => {
                    const cfg = STATUS_CFG[s];
                    return (
                      <Box
                        key={s}
                        as="button"
                        onClick={() => set('status', s)}
                        flex="1"
                        py="8px"
                        borderRadius="8px"
                        fontSize="10px"
                        fontWeight="700"
                        border="1.5px solid"
                        transition="all 0.15s"
                        borderColor={form.status === s ? cfg.color : 'gray.200'}
                        bg={form.status === s ? cfg.bg : WHITE}
                        color={form.status === s ? cfg.color : 'gray.500'}
                      >
                        {s}
                      </Box>
                    );
                  },
                )}
              </Flex>
            </Box>
            {/* Transmission */}
            <Box>
              <Text {...labelStyle}>Transmission</Text>
              <Flex gap="8px">
                {(['Automatic', 'Manual'] as const).map((t) => (
                  <Box
                    key={t}
                    as="button"
                    onClick={() => set('transmission', t)}
                    flex="1"
                    py="8px"
                    borderRadius="8px"
                    fontSize="11px"
                    fontWeight="600"
                    border="1.5px solid"
                    transition="all 0.15s"
                    borderColor={form.transmission === t ? P : 'gray.200'}
                    bg={form.transmission === t ? P_LIGHT : WHITE}
                    color={form.transmission === t ? P : 'gray.500'}
                  >
                    {t}
                  </Box>
                ))}
              </Flex>
            </Box>
            {/* Fuel */}
            <Box>
              <Text {...labelStyle}>Fuel Type</Text>
              <Flex gap="6px">
                {(['Petrol', 'Diesel', 'Hybrid', 'Electric'] as const).map(
                  (f) => (
                    <Box
                      key={f}
                      as="button"
                      onClick={() => set('fuelType', f)}
                      flex="1"
                      py="8px"
                      borderRadius="8px"
                      fontSize="10px"
                      fontWeight="600"
                      border="1.5px solid"
                      transition="all 0.15s"
                      borderColor={form.fuelType === f ? P : 'gray.200'}
                      bg={form.fuelType === f ? P_LIGHT : WHITE}
                      color={form.fuelType === f ? P : 'gray.500'}
                    >
                      {f}
                    </Box>
                  ),
                )}
              </Flex>
            </Box>
          </Grid>
          {/* Description */}
          <Box mt="16px">
            <Text {...labelStyle}>Description</Text>
            <Textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={3}
              fontSize="13px"
              borderRadius="10px"
              bg="gray.50"
              borderColor="gray.200"
              placeholder="Describe the car condition, features, history..."
              _focus={{
                bg: 'white',
                borderColor: P,
                boxShadow: `0 0 0 1px ${P}`,
              }}
              resize="none"
              fontFamily="'DM Sans', sans-serif"
            />
          </Box>
        </Box>

        {/* Footer */}
        <Flex
          align="center"
          justify="flex-end"
          gap="10px"
          px="24px"
          py="16px"
          borderTop="1px solid"
          borderColor="gray.100"
          bg="gray.50"
          flexShrink="0"
        >
          <Button
            variant="ghost"
            fontSize="13px"
            color="gray.500"
            borderRadius="10px"
            h="40px"
            _hover={{ bg: 'gray.100' }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            bg={P}
            color="white"
            fontSize="13px"
            fontWeight="700"
            borderRadius="10px"
            h="40px"
            px="24px"
            _hover={{ bg: P_DARK }}
            onClick={() => onSave(form)}
            boxShadow={`0 4px 14px ${P}44`}
          >
            {mode === 'add' ? 'Add Listing' : 'Save Changes'}
          </Button>
        </Flex>
      </Box>
    </>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Inventory(): JSX.Element {
  const [cars, setCars] = useState<CarListing[]>(SEED);
  const [view, setView] = useState<ViewMode>('grid');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<ListingStatus | 'All'>(
    'All',
  );
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selected, setSelected] = useState<CarListing | null>(null);

  // Stats
  const total = cars.length;
  const available = cars.filter((c) => c.status === 'Available').length;
  const reserved = cars.filter((c) => c.status === 'Reserved').length;
  const sold = cars.filter((c) => c.status === 'Sold').length;
  const totalValue = cars
    .filter((c) => c.status !== 'Sold')
    .reduce((a, c) => a + c.price, 0);

  const filtered = cars.filter((c) => {
    const matchSearch =
      !search ||
      `${c.make} ${c.model} ${c.year} ${c.location}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleSave = (car: CarListing) => {
    if (modalMode === 'add') {
      setCars((p) => [
        ...p,
        {
          ...car,
          id: Date.now().toString(),
          postedAt: new Date().toISOString().split('T')[0],
          sharedTo: [],
        },
      ]);
    } else {
      setCars((p) => p.map((c) => (c.id === car.id ? car : c)));
    }
    setModalMode(null);
    setSelected(null);
  };

  const handleDelete = (id: string) =>
    setCars((p) => p.filter((c) => c.id !== id));

  const openAdd = () => {
    setSelected({
      ...BLANK,
      id: '',
      postedAt: new Date().toISOString().split('T')[0],
      sharedTo: [],
    });
    setModalMode('add');
  };

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
            Drivia / Inventory
          </Text>
          <Heading fontSize="22px" fontWeight="800" color="gray.800" mt="1px">
            Inventory
          </Heading>
        </Box>
        <HStack gap="10px">
          <Box position="relative" w="220px">
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
              pl="32px"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search make, model…"
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

      <Box p="28px">
        {/* STAT CARDS */}
        <Grid templateColumns="repeat(5,1fr)" gap="14px" mb="24px">
          {[
            { label: 'Total Listings', value: total, color: P, icon: '🚗' },
            {
              label: 'Available',
              value: available,
              color: '#38A169',
              icon: '✅',
            },
            {
              label: 'Reserved',
              value: reserved,
              color: '#D69E2E',
              icon: '🔒',
            },
            { label: 'Sold', value: sold, color: '#E53E3E', icon: '🏁' },
            {
              label: 'Stock Value',
              value: fmt(totalValue),
              color: P,
              icon: '💰',
            },
          ].map((s) => (
            <Box
              key={s.label}
              bg={WHITE}
              borderRadius="14px"
              p="16px 20px"
              boxShadow="0 2px 10px rgba(0,0,0,0.05)"
            >
              <HStack gap="10px">
                <Box
                  w="36px"
                  h="36px"
                  borderRadius="10px"
                  bg={`${s.color}15`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="16px"
                  flexShrink="0"
                >
                  {s.icon}
                </Box>
                <Box>
                  <Text fontSize="10px" color="gray.400" fontWeight="600">
                    {s.label}
                  </Text>
                  <Text
                    fontSize="18px"
                    fontWeight="800"
                    color="gray.800"
                    lineHeight="1.2"
                  >
                    {s.value}
                  </Text>
                </Box>
              </HStack>
            </Box>
          ))}
        </Grid>

        {/* TOOLBAR */}
        <Flex justify="space-between" align="center" mb="16px">
          <HStack gap="6px">
            {(['All', 'Available', 'Reserved', 'Sold'] as const).map((f) => (
              <Button
                key={f}
                size="sm"
                borderRadius="8px"
                fontWeight="600"
                fontSize="12px"
                h="32px"
                px="14px"
                bg={filterStatus === f ? P : WHITE}
                color={filterStatus === f ? 'white' : 'gray.500'}
                boxShadow={
                  filterStatus === f
                    ? `0 4px 12px ${P}44`
                    : '0 1px 4px rgba(0,0,0,0.07)'
                }
                _hover={{ bg: filterStatus === f ? P_DARK : 'gray.50' }}
                onClick={() => setFilterStatus(f)}
              >
                {f}{' '}
                {f !== 'All' && (
                  <Badge
                    ml="5px"
                    bg={filterStatus === f ? 'whiteAlpha.300' : 'gray.100'}
                    color={filterStatus === f ? 'white' : 'gray.500'}
                    borderRadius="4px"
                    fontSize="10px"
                    px="5px"
                  >
                    {f === 'Available'
                      ? available
                      : f === 'Reserved'
                        ? reserved
                        : sold}
                  </Badge>
                )}
              </Button>
            ))}
          </HStack>
          <HStack gap="8px">
            <HStack
              bg={WHITE}
              borderRadius="10px"
              p="4px"
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
                  onClick={() => setView(v)}
                  w="28px"
                  h="28px"
                  borderRadius="7px"
                  bg={view === v ? P : 'transparent'}
                  color={view === v ? 'white' : 'gray.400'}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transition="all 0.15s"
                >
                  {ic}
                </Box>
              ))}
            </HStack>
            <Button
              bg={P}
              color="white"
              borderRadius="10px"
              fontSize="13px"
              fontWeight="700"
              h="36px"
              px="16px"
              gap="6px"
              _hover={{ bg: P_DARK }}
              boxShadow={`0 4px 12px ${P}44`}
              onClick={openAdd}
            >
              <PlusIco /> Add Listing
            </Button>
          </HStack>
        </Flex>

        {/* LISTINGS */}
        {filtered.length === 0 ? (
          <Flex
            direction="column"
            align="center"
            justify="center"
            py="64px"
            gap="12px"
          >
            <Text fontSize="32px">🚗</Text>
            <Text fontWeight="700" fontSize="16px" color="gray.600">
              No listings found
            </Text>
            <Text fontSize="13px" color="gray.400">
              Try a different search or filter
            </Text>
          </Flex>
        ) : view === 'grid' ? (
          <Grid
            templateColumns="repeat(auto-fill,minmax(240px,1fr))"
            gap="16px"
          >
            {filtered.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onEdit={() => {
                  setSelected(car);
                  setModalMode('edit');
                }}
                onDelete={() => handleDelete(car.id)}
                onShare={() => {
                  setSelected(car);
                  setModalMode('view');
                }}
                onView={() => {
                  setSelected(car);
                  setModalMode('view');
                }}
              />
            ))}
          </Grid>
        ) : (
          <VStack gap="8px" align="stretch">
            {/* List header */}
            <Flex px="20px" py="8px" gap="16px">
              {['Car', 'Price', 'Status', 'Condition', 'Mileage', ''].map(
                (h, i) => (
                  <Text
                    key={i}
                    fontSize="10px"
                    fontWeight="700"
                    color="gray.400"
                    textTransform="uppercase"
                    letterSpacing="0.5px"
                    flex={i === 0 || i === 5 ? undefined : 1}
                    w={i === 0 ? '56px' : i === 5 ? '120px' : undefined}
                  >
                    {h}
                  </Text>
                ),
              )}
            </Flex>
            {filtered.map((car) => (
              <ListRow
                key={car.id}
                car={car}
                onEdit={() => {
                  setSelected(car);
                  setModalMode('edit');
                }}
                onDelete={() => handleDelete(car.id)}
                onShare={() => {
                  setSelected(car);
                  setModalMode('view');
                }}
              />
            ))}
          </VStack>
        )}

        {/* FOOTER */}
        <Flex
          justify="space-between"
          align="center"
          mt="32px"
          pt="16px"
          borderTop="1px solid"
          borderColor="gray.100"
        >
          <Text fontSize="11px" color="gray.400">
            Showing {filtered.length} of {total} listings
          </Text>
          <Text fontSize="11px" color="gray.400">
            Drivia Dealer Tool © 2024
          </Text>
        </Flex>
      </Box>

      {/* MODALS */}
      {(modalMode === 'add' || modalMode === 'edit') && selected && (
        <FormModal
          mode={modalMode}
          car={selected}
          onSave={handleSave}
          onClose={() => {
            setModalMode(null);
            setSelected(null);
          }}
        />
      )}
    </AppLayout>
  );
}

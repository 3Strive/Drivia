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
  Link,
} from '@chakra-ui/react';
import AppLayout from '../components/template/general-layout';
import { Customer } from '../shared/types';

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const P = '#6C63FF';
const P_DARK = '#5B54E8';
const P_LIGHT = '#EEF0FF';
const BG = '#F4F5FA';
const WHITE = '#FFFFFF';

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
const CloseIco = () => <Ico d="M18 6 6 18M6 6l12 12" sw={2.5} />;
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
const PhoneIco = () => (
  <Ico
    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.14-1.14a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
    size={14}
  />
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
const GridViewIco = () => (
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
const StarIco = () => (
  <Ico
    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
    fill="currentColor"
    stroke="none"
    size={12}
  />
);
const MatchIco = () => (
  <Ico
    d="M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
    size={14}
    stroke="#38A169"
  />
);

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`;
const fmtShort = (n: number) =>
  n >= 1_000_000
    ? `₦${(n / 1_000_000).toFixed(0)}M`
    : `₦${(n / 1000).toFixed(0)}K`;
const daysSince = (iso: string): number =>
  Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);

// ─── SEED DATA ────────────────────────────────────────────────────────────────
const SEED: Customer[] = [
  {
    id: '1',
    name: 'Biodun Fashola',
    phone: '08056789012',
    email: 'biodun@gmail.com',
    avatar: 'https://i.pravatar.cc/60?img=25',
    budgetMin: 25000000,
    budgetMax: 32000000,
    preferredMake: 'Lexus',
    preferredType: 'SUV',
    notes:
      'Repeat buyer. Bought RX350. Now looking for another Lexus or Mercedes.',
    totalPurchases: 1,
    lastContact: '2024-10-30',
    tags: ['Repeat Customer', 'VIP', 'Luxury'],
  },
  {
    id: '2',
    name: 'Emeka Nwosu',
    phone: '09087654321',
    email: 'emeka.n@yahoo.com',
    avatar: 'https://i.pravatar.cc/60?img=15',
    budgetMin: 30000000,
    budgetMax: 40000000,
    preferredMake: 'Mercedes',
    preferredType: 'Sedan',
    notes: 'Interested in Mercedes C or E class. Very serious buyer.',
    totalPurchases: 0,
    lastContact: '2024-11-05',
    tags: ['Hot Lead', 'Luxury'],
  },
  {
    id: '3',
    name: 'Ngozi Adeyemi',
    phone: '08134567890',
    email: '',
    avatar: 'https://i.pravatar.cc/60?img=31',
    budgetMin: 40000000,
    budgetMax: 50000000,
    preferredMake: 'Toyota',
    preferredType: 'SUV',
    notes: 'Negotiating on Highlander. Price is the sticking point.',
    totalPurchases: 0,
    lastContact: '2024-11-05',
    tags: ['Hot Lead', 'SUV Buyer'],
  },
  {
    id: '4',
    name: 'Chidi Okafor',
    phone: '08023456789',
    email: 'chidi.ok@gmail.com',
    avatar: 'https://i.pravatar.cc/60?img=11',
    budgetMin: 14000000,
    budgetMax: 18000000,
    preferredMake: 'Toyota',
    preferredType: 'Sedan',
    notes: 'First-time buyer. Budget sensitive. Looking for a clean Camry.',
    totalPurchases: 0,
    lastContact: '2024-11-06',
    tags: ['First-time Buyer'],
  },
  {
    id: '5',
    name: 'Segun Adesanya',
    phone: '08167890123',
    email: 'segun.a@hotmail.com',
    avatar: 'https://i.pravatar.cc/60?img=57',
    budgetMin: 50000000,
    budgetMax: 80000000,
    preferredMake: 'BMW',
    preferredType: 'Sedan',
    notes: 'Looking for BMW 5 series or Mercedes E class. High budget.',
    totalPurchases: 2,
    lastContact: '2024-10-20',
    tags: ['VIP', 'Repeat Customer', 'Luxury'],
  },
  {
    id: '6',
    name: 'Fatima Abdullahi',
    phone: '07011234567',
    email: 'fatima.a@gmail.com',
    avatar: 'https://i.pravatar.cc/60?img=21',
    budgetMin: 19000000,
    budgetMax: 24000000,
    preferredMake: 'Honda',
    preferredType: 'SUV',
    notes: 'Interested in CR-V or HRV. Needs automatic.',
    totalPurchases: 0,
    lastContact: '2024-11-05',
    tags: ['SUV Buyer'],
  },
  {
    id: '7',
    name: 'Ada Eze',
    phone: '07056789012',
    email: 'ada.eze@gmail.com',
    avatar: 'https://i.pravatar.cc/60?img=44',
    budgetMin: 12000000,
    budgetMax: 16000000,
    preferredMake: '',
    preferredType: 'Sedan',
    notes: 'Open to any sedan under 16M. Clean condition is priority.',
    totalPurchases: 0,
    lastContact: '2024-11-04',
    tags: ['Budget Buyer'],
  },
  {
    id: '8',
    name: 'Tunde Bakare',
    phone: '08145678901',
    email: '',
    avatar: 'https://i.pravatar.cc/60?img=12',
    budgetMin: 16000000,
    budgetMax: 20000000,
    preferredMake: 'Ford',
    preferredType: 'Truck',
    notes: 'Needs a pickup truck. Prefers diesel engine. PH-based.',
    totalPurchases: 0,
    lastContact: '2024-11-06',
    tags: ['Truck Buyer'],
  },
];

// ─── LISTINGS (for match suggestions) ────────────────────────────────────────
const LISTINGS = [
  {
    id: '1',
    title: '2021 Toyota Camry',
    price: 16500000,
    type: 'Sedan',
    make: 'Toyota',
  },
  {
    id: '2',
    title: '2020 Honda CR-V',
    price: 21000000,
    type: 'SUV',
    make: 'Honda',
  },
  {
    id: '3',
    title: '2019 Mercedes C300',
    price: 35000000,
    type: 'Sedan',
    make: 'Mercedes',
  },
  {
    id: '4',
    title: '2018 Lexus RX350',
    price: 28000000,
    type: 'SUV',
    make: 'Lexus',
  },
  {
    id: '5',
    title: '2022 Toyota Highlander',
    price: 45000000,
    type: 'SUV',
    make: 'Toyota',
  },
  {
    id: '6',
    title: '2020 Ford Ranger',
    price: 18500000,
    type: 'Truck',
    make: 'Ford',
  },
];

function getMatches(customer: Customer) {
  return LISTINGS.filter((l) => {
    const priceMatch =
      l.price >= customer.budgetMin * 0.9 &&
      l.price <= customer.budgetMax * 1.05;
    const typeMatch =
      !customer.preferredType || l.type === customer.preferredType;
    const makeMatch =
      !customer.preferredMake || l.make === customer.preferredMake;
    return priceMatch && (typeMatch || makeMatch);
  });
}

const ALL_TAGS = Array.from(new Set(SEED.flatMap((c) => c.tags)));

// ─── CUSTOMER CARD ───────────────────────────────────────────────────────────
interface CustomerCardProps {
  customer: Customer;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}
function CustomerCard({
  customer,
  onEdit,
  onDelete,
  onView,
}: CustomerCardProps): JSX.Element {
  const matches = getMatches(customer);
  const daysSinceContact = daysSince(customer.lastContact);
  const isHot = customer.tags.includes('Hot Lead');
  const isVIP = customer.tags.includes('VIP');
  const isOverdue = daysSinceContact > 7;

  return (
    <Box
      bg={WHITE}
      borderRadius="14px"
      p="16px"
      boxShadow="0 2px 10px rgba(0,0,0,0.05)"
      border="1.5px solid"
      borderColor={isHot ? '#FC8181' : isVIP ? `${P}33` : 'gray.100'}
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 20px rgba(108,99,255,0.12)',
      }}
      transition="all 0.18s"
      cursor="pointer"
      onClick={onView}
    >
      <Flex justify="space-between" align="flex-start" mb="12px">
        <HStack gap="10px">
          <Box position="relative">
            <Avatar.Root size="md">
              <Avatar.Image src={customer.avatar} />
              <Avatar.Fallback>{customer.name[0]}</Avatar.Fallback>
            </Avatar.Root>
            {customer.totalPurchases > 0 && (
              <Box
                position="absolute"
                bottom="-2px"
                right="-2px"
                bg="#F6E05E"
                borderRadius="full"
                w="16px"
                h="16px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StarIco />
              </Box>
            )}
          </Box>
          <Box>
            <Text fontWeight="700" fontSize="14px" color="gray.800">
              {customer.name}
            </Text>
            <Text fontSize="11px" color="gray.400">
              {customer.phone}
            </Text>
          </Box>
        </HStack>
        <HStack gap="4px">
          {isVIP && (
            <Badge
              bg={P_LIGHT}
              color={P}
              fontSize="9px"
              borderRadius="5px"
              px="6px"
              fontWeight="700"
            >
              VIP
            </Badge>
          )}
          {isHot && (
            <Badge
              bg="#FED7D7"
              color="#9B2C2C"
              fontSize="9px"
              borderRadius="5px"
              px="6px"
              fontWeight="700"
            >
              🔥 Hot
            </Badge>
          )}
        </HStack>
      </Flex>

      {/* Budget */}
      <Flex justify="space-between" align="center" mb="8px">
        <Text fontSize="11px" color="gray.400">
          Budget
        </Text>
        <Text fontSize="13px" fontWeight="700" color={P}>
          {fmtShort(customer.budgetMin)} – {fmtShort(customer.budgetMax)}
        </Text>
      </Flex>

      {/* Preference */}
      <Flex justify="space-between" align="center" mb="10px">
        <Text fontSize="11px" color="gray.400">
          Looking for
        </Text>
        <Text fontSize="12px" fontWeight="600" color="gray.700">
          {[customer.preferredMake, customer.preferredType]
            .filter(Boolean)
            .join(' ') || 'Any'}
        </Text>
      </Flex>

      {/* Matches */}
      {matches.length > 0 && (
        <Box bg="#F0FFF4" borderRadius="8px" px="10px" py="7px" mb="10px">
          <HStack gap="6px">
            <MatchIco />
            <Text fontSize="11px" fontWeight="700" color="#276749">
              {matches.length} matching car{matches.length > 1 ? 's' : ''} in
              stock
            </Text>
          </HStack>
          <Text fontSize="10px" color="#276749" mt="2px" lineClamp={1}>
            {matches.map((m) => m.title).join(', ')}
          </Text>
        </Box>
      )}

      {/* Last contact */}
      <Flex justify="space-between" align="center" mb="12px">
        <Text fontSize="11px" color={isOverdue ? 'red.400' : 'gray.400'}>
          {isOverdue ? '⚠️ ' : ''}Last contact {daysSinceContact}d ago
        </Text>
        {customer.totalPurchases > 0 && (
          <Text fontSize="11px" color="#276749" fontWeight="600">
            ✓ {customer.totalPurchases} purchase
            {customer.totalPurchases > 1 ? 's' : ''}
          </Text>
        )}
      </Flex>

      {/* Actions */}
      <Flex
        justify="space-between"
        align="center"
        onClick={(e) => e.stopPropagation()}
      >
        <HStack gap="6px">
          <Link
            href={`tel:${customer.phone}`}
            w="28px"
            h="28px"
            borderRadius="7px"
            bg="#E6FFFA"
            color="#2C7A7B"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{ bg: '#B2F5EA' }}
            title="Call"
          >
            <PhoneIco />
          </Link>
          <Link
            href={`https://wa.me/234${customer.phone.slice(1)}`}
            target="_blank"
            w="28px"
            h="28px"
            borderRadius="7px"
            bg="#F0FFF4"
            color="#276749"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{ bg: '#C6F6D5' }}
            title="WhatsApp"
          >
            <Text fontSize="11px" fontWeight="900">
              W
            </Text>
          </Link>
        </HStack>
        <HStack gap="6px">
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
          >
            <TrashIco />
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
}

// ─── DETAIL DRAWER ────────────────────────────────────────────────────────────
interface DrawerProps {
  customer: Customer;
  onClose: () => void;
  onEdit: () => void;
}
function CustomerDrawer({
  customer,
  onClose,
  onEdit,
}: DrawerProps): JSX.Element {
  const matches = getMatches(customer);
  return (
    <>
      <Box
        position="fixed"
        inset="0"
        bg="blackAlpha.400"
        zIndex="1000"
        onClick={onClose}
        style={{ backdropFilter: 'blur(2px)' }}
      />
      <Box
        position="fixed"
        right="0"
        top="0"
        bottom="0"
        w="380px"
        bg={WHITE}
        zIndex="1001"
        boxShadow="-8px 0 40px rgba(0,0,0,0.12)"
        overflow="auto"
        display="flex"
        flexDir="column"
      >
        {/* Header */}
        <Flex
          align="center"
          justify="space-between"
          px="20px"
          py="16px"
          borderBottom="1px solid"
          borderColor="gray.100"
          flexShrink="0"
        >
          <Text fontWeight="800" fontSize="16px" color="gray.800">
            Customer Profile
          </Text>
          <HStack gap="8px">
            <Box
              as="button"
              onClick={onEdit}
              w="30px"
              h="30px"
              borderRadius="8px"
              bg={P_LIGHT}
              color={P}
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: `${P}22` }}
            >
              <EditIco />
            </Box>
            <Box
              as="button"
              onClick={onClose}
              w="30px"
              h="30px"
              borderRadius="8px"
              bg="gray.100"
              color="gray.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: 'gray.200' }}
            >
              <CloseIco />
            </Box>
          </HStack>
        </Flex>

        <Box p="20px" flex="1">
          {/* Profile */}
          <Flex direction="column" align="center" mb="20px">
            <Box position="relative" mb="10px">
              <Avatar.Root size="xl">
                <Avatar.Image src={customer.avatar} />
                <Avatar.Fallback fontSize="22px">
                  {customer.name[0]}
                </Avatar.Fallback>
              </Avatar.Root>
              {customer.totalPurchases > 0 && (
                <Box
                  position="absolute"
                  bottom="0"
                  right="0"
                  bg="#F6E05E"
                  borderRadius="full"
                  w="22px"
                  h="22px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <StarIco />
                </Box>
              )}
            </Box>
            <Text fontWeight="800" fontSize="18px" color="gray.800">
              {customer.name}
            </Text>
            <Text fontSize="13px" color="gray.400" mb="8px">
              {customer.phone}
            </Text>
            <HStack gap="6px" wrap="wrap" justify="center">
              {customer.tags.map((tag: any) => (
                <Badge
                  key={tag}
                  bg={P_LIGHT}
                  color={P}
                  borderRadius="6px"
                  fontSize="10px"
                  px="8px"
                  py="2px"
                  fontWeight="700"
                >
                  {tag}
                </Badge>
              ))}
            </HStack>
          </Flex>

          {/* Key details */}
          <VStack
            align="stretch"
            gap="0"
            bg="gray.50"
            borderRadius="12px"
            overflow="hidden"
            mb="16px"
          >
            {[
              [
                'Budget',
                `${fmtShort(customer.budgetMin)} – ${fmtShort(customer.budgetMax)}`,
              ],
              [
                'Prefers',
                [customer.preferredMake, customer.preferredType]
                  .filter(Boolean)
                  .join(' ') || 'Any',
              ],
              [
                'Purchases',
                `${customer.totalPurchases} car${customer.totalPurchases !== 1 ? 's' : ''}`,
              ],
              ['Last contact', `${daysSince(customer.lastContact)} days ago`],
              ...(customer.email ? [['Email', customer.email]] : []),
            ].map(([k, v], i, arr) => (
              <Flex
                key={k}
                justify="space-between"
                align="center"
                px="14px"
                py="10px"
                borderBottom={i < arr.length - 1 ? '1px solid' : 'none'}
                borderColor="gray.100"
              >
                <Text fontSize="12px" color="gray.400">
                  {k}
                </Text>
                <Text fontSize="12px" fontWeight="700" color="gray.700">
                  {v}
                </Text>
              </Flex>
            ))}
          </VStack>

          {/* Matching cars */}
          <Box mb="16px">
            <Text
              fontSize="12px"
              fontWeight="700"
              color="gray.500"
              textTransform="uppercase"
              letterSpacing="0.4px"
              mb="8px"
            >
              Matching Cars in Stock ({matches.length})
            </Text>
            {matches.length === 0 ? (
              <Box bg="gray.50" borderRadius="10px" p="14px" textAlign="center">
                <Text fontSize="12px" color="gray.400">
                  No matching cars currently in stock
                </Text>
              </Box>
            ) : (
              <VStack gap="6px" align="stretch">
                {matches.map((m) => (
                  <Flex
                    key={m.id}
                    justify="space-between"
                    align="center"
                    bg="#F0FFF4"
                    borderRadius="9px"
                    px="12px"
                    py="10px"
                    border="1px solid"
                    borderColor="#C6F6D5"
                  >
                    <Box>
                      <Text fontSize="13px" fontWeight="700" color="gray.800">
                        {m.title}
                      </Text>
                      <Text fontSize="11px" color="#276749" fontWeight="600">
                        {fmt(m.price)}
                      </Text>
                    </Box>
                    <Button
                      size="xs"
                      bg="#25D366"
                      color="white"
                      borderRadius="7px"
                      fontSize="10px"
                      fontWeight="700"
                      h="26px"
                      px="10px"
                      _hover={{ opacity: 0.85 }}
                    >
                      Notify
                    </Button>
                  </Flex>
                ))}
              </VStack>
            )}
          </Box>

          {/* Notes */}
          <Box>
            <Text
              fontSize="12px"
              fontWeight="700"
              color="gray.500"
              textTransform="uppercase"
              letterSpacing="0.4px"
              mb="8px"
            >
              Notes
            </Text>
            <Box bg="gray.50" borderRadius="10px" p="12px">
              <Text fontSize="13px" color="gray.600" lineHeight="1.6">
                {customer.notes || 'No notes added'}
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Footer actions */}
        <Flex
          gap="8px"
          p="16px"
          borderTop="1px solid"
          borderColor="gray.100"
          flexShrink="0"
        >
          <Link
            href={`tel:${customer.phone}`}
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="6px"
            bg="gray.100"
            color="gray.700"
            borderRadius="10px"
            h="40px"
            fontSize="13px"
            fontWeight="600"
            _hover={{ bg: 'gray.200' }}
          >
            <PhoneIco /> Call
          </Link>
          <Link
            href={`https://wa.me/234${customer.phone.slice(1)}`}
            target="_blank"
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="6px"
            bg="#25D366"
            color="white"
            borderRadius="10px"
            h="40px"
            fontSize="13px"
            fontWeight="700"
            _hover={{ opacity: 0.85 }}
            boxShadow="0 4px 12px #25D36644"
          >
            WhatsApp
          </Link>
        </Flex>
      </Box>
    </>
  );
}

// ─── FORM MODAL ───────────────────────────────────────────────────────────────
interface FormModalProps {
  mode: 'add' | 'edit';
  customer: Customer;
  onSave: (c: Customer) => void;
  onClose: () => void;
}
function CustomerForm({
  mode,
  customer,
  onSave,
  onClose,
}: FormModalProps): JSX.Element {
  const [form, setForm] = useState<Customer>(customer);
  const set = (k: keyof Customer, v: unknown) =>
    setForm((p: any) => ({ ...p, [k]: v }));
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
  const labelStyle = {
    fontSize: '10px',
    fontWeight: '700' as const,
    color: 'gray.400',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.4px',
    mb: '5px',
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
        w="540px"
        maxW="95vw"
        maxH="90vh"
        bg={WHITE}
        borderRadius="20px"
        boxShadow="0 24px 80px rgba(0,0,0,0.18)"
        overflow="hidden"
        display="flex"
        flexDir="column"
      >
        <Flex
          align="center"
          justify="space-between"
          px="24px"
          py="18px"
          borderBottom="1px solid"
          borderColor="gray.100"
          flexShrink="0"
        >
          <Text fontWeight="800" fontSize="17px" color="gray.800">
            {mode === 'add' ? 'Add Customer' : `Edit — ${form.name}`}
          </Text>
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
        <Box overflow="auto" p="24px" flex="1">
          <Grid templateColumns="1fr 1fr" gap="14px">
            <Box>
              <Text {...labelStyle}>Full Name</Text>
              <Input
                {...inputStyle}
                value={form.name}
                placeholder="Chidi Okafor"
                onChange={(e) => set('name', e.target.value)}
              />
            </Box>
            <Box>
              <Text {...labelStyle}>Phone</Text>
              <Input
                {...inputStyle}
                value={form.phone}
                placeholder="080XXXXXXXX"
                onChange={(e) => set('phone', e.target.value)}
              />
            </Box>
            <Box>
              <Text {...labelStyle}>Email (optional)</Text>
              <Input
                {...inputStyle}
                value={form.email ?? ''}
                placeholder="email@gmail.com"
                onChange={(e) => set('email', e.target.value)}
              />
            </Box>
            <Box>
              <Text {...labelStyle}>Preferred Make</Text>
              <Input
                {...inputStyle}
                value={form.preferredMake ?? ''}
                placeholder="e.g. Toyota"
                onChange={(e) => set('preferredMake', e.target.value)}
              />
            </Box>
            <Box>
              <Text {...labelStyle}>Budget Min (₦)</Text>
              <Input
                {...inputStyle}
                type="number"
                value={form.budgetMin}
                onChange={(e) => set('budgetMin', Number(e.target.value))}
              />
            </Box>
            <Box>
              <Text {...labelStyle}>Budget Max (₦)</Text>
              <Input
                {...inputStyle}
                type="number"
                value={form.budgetMax}
                onChange={(e) => set('budgetMax', Number(e.target.value))}
              />
            </Box>
            <Box>
              <Text {...labelStyle}>Preferred Type</Text>
              <Flex gap="6px" wrap="wrap">
                {['SUV', 'Sedan', 'Truck', 'Coupe', 'Van'].map((t) => (
                  <Box
                    key={t}
                    as="button"
                    onClick={() => set('preferredType', t)}
                    px="8px"
                    py="5px"
                    borderRadius="7px"
                    fontSize="10px"
                    fontWeight="700"
                    border="1.5px solid"
                    transition="all 0.15s"
                    borderColor={form.preferredType === t ? P : 'gray.200'}
                    bg={form.preferredType === t ? P_LIGHT : WHITE}
                    color={form.preferredType === t ? P : 'gray.500'}
                  >
                    {t}
                  </Box>
                ))}
              </Flex>
            </Box>
            <Box>
              <Text {...labelStyle}>Tags</Text>
              <Flex gap="6px" wrap="wrap">
                {ALL_TAGS.map((tag) => (
                  <Box
                    key={tag}
                    as="button"
                    onClick={() =>
                      set(
                        'tags',
                        form.tags.includes(tag)
                          ? form.tags.filter((t: any) => t !== tag)
                          : [...form.tags, tag],
                      )
                    }
                    px="8px"
                    py="5px"
                    borderRadius="7px"
                    fontSize="10px"
                    fontWeight="700"
                    border="1.5px solid"
                    transition="all 0.15s"
                    borderColor={form.tags.includes(tag) ? P : 'gray.200'}
                    bg={form.tags.includes(tag) ? P_LIGHT : WHITE}
                    color={form.tags.includes(tag) ? P : 'gray.500'}
                  >
                    {tag}
                  </Box>
                ))}
              </Flex>
            </Box>
          </Grid>
          <Box mt="14px">
            <Text {...labelStyle}>Notes</Text>
            <Textarea
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              rows={3}
              fontSize="13px"
              borderRadius="10px"
              bg="gray.50"
              borderColor="gray.200"
              placeholder="Notes about this customer, preferences, history…"
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
            {mode === 'add' ? 'Add Customer' : 'Save Changes'}
          </Button>
        </Flex>
      </Box>
    </>
  );
}

// ─── BLANK CUSTOMER ───────────────────────────────────────────────────────────
const BLANK: Customer = {
  id: '',
  name: '',
  phone: '',
  email: '',
  budgetMin: 0,
  budgetMax: 0,
  preferredMake: '',
  preferredType: '',
  notes: '',
  totalPurchases: 0,
  lastContact: new Date().toISOString().split('T')[0],
  tags: [],
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function CRM(): JSX.Element {
  const [customers, setCustomers] = useState<Customer[]>(SEED);
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState<string>('All');
  const [selected, setSelected] = useState<Customer | null>(null);
  const [viewing, setViewing] = useState<Customer | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);

  const filtered = customers.filter((c) => {
    const matchSearch =
      !search ||
      `${c.name} ${c.phone} ${c.preferredMake} ${c.preferredType}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchTag = filterTag === 'All' || c.tags.includes(filterTag);
    return matchSearch && matchTag;
  });

  const handleSave = (c: Customer) => {
    if (modalMode === 'add') {
      setCustomers((p) => [...p, { ...c, id: Date.now().toString() }]);
    } else {
      setCustomers((p) => p.map((x) => (x.id === c.id ? c : x)));
    }
    setModalMode(null);
    setSelected(null);
  };

  const withMatches = customers.filter((c) => getMatches(c).length > 0).length;
  const vipCount = customers.filter((c) => c.tags.includes('VIP')).length;
  const hotCount = customers.filter((c) => c.tags.includes('Hot Lead')).length;
  const overdueContacts = customers.filter(
    (c) => daysSince(c.lastContact) > 7,
  ).length;

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
            Drivia / CRM
          </Text>
          <Heading fontSize="22px" fontWeight="800" color="gray.800" mt="1px">
            Customer CRM
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
              placeholder="Search customers…"
              bg="gray.50"
              border="none"
              borderRadius="12px"
              fontSize="13px"
              h="36px"
              _placeholder={{ color: 'gray.400' }}
              _focus={{ bg: 'gray.100', boxShadow: 'none' }}
            />
          </Box>
          {([<BellIco />, <MoonIco />, <GridViewIco />] as JSX.Element[]).map(
            (ic, i) => (
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
            ),
          )}
          <Avatar.Root size="sm">
            <Avatar.Image src="https://i.pravatar.cc/40?img=47" />
            <Avatar.Fallback>D</Avatar.Fallback>
          </Avatar.Root>
        </HStack>
      </Flex>

      <Box p="28px">
        {/* STAT CARDS */}
        <Grid templateColumns="repeat(4,1fr)" gap="14px" mb="24px">
          {[
            {
              label: 'Total Customers',
              value: customers.length,
              color: P,
              icon: '👥',
            },
            {
              label: 'VIP Buyers',
              value: vipCount,
              color: '#805AD5',
              icon: '⭐',
            },
            {
              label: 'Hot Leads',
              value: hotCount,
              color: '#E53E3E',
              icon: '🔥',
            },
            {
              label: 'Overdue Follow-up',
              value: overdueContacts,
              color: '#D69E2E',
              icon: '⚠️',
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
                  <Text fontSize="18px" fontWeight="800" color="gray.800">
                    {s.value}
                  </Text>
                </Box>
              </HStack>
            </Box>
          ))}
        </Grid>

        {/* Match alert banner */}
        {withMatches > 0 && (
          <Box
            bg="#F0FFF4"
            border="1px solid"
            borderColor="#C6F6D5"
            borderRadius="12px"
            px="18px"
            py="12px"
            mb="20px"
          >
            <HStack justify="space-between">
              <HStack gap="10px">
                <Text fontSize="18px">🎯</Text>
                <Box>
                  <Text fontSize="13px" fontWeight="700" color="#276749">
                    {withMatches} customer{withMatches > 1 ? 's' : ''} match
                    cars in your current inventory
                  </Text>
                  <Text fontSize="12px" color="#276749" opacity="0.8">
                    Notify them via WhatsApp to close more deals
                  </Text>
                </Box>
              </HStack>
              <Button
                bg="#25D366"
                color="white"
                borderRadius="9px"
                fontSize="12px"
                fontWeight="700"
                h="34px"
                px="14px"
                _hover={{ opacity: 0.85 }}
              >
                Notify All
              </Button>
            </HStack>
          </Box>
        )}

        {/* FILTERS + ADD */}
        <Flex justify="space-between" align="center" mb="16px">
          <Flex gap="6px" wrap="wrap">
            {['All', ...ALL_TAGS].map((tag) => (
              <Button
                key={tag}
                size="sm"
                borderRadius="8px"
                fontWeight="600"
                fontSize="11px"
                h="30px"
                px="12px"
                bg={filterTag === tag ? P : WHITE}
                color={filterTag === tag ? 'white' : 'gray.500'}
                boxShadow={
                  filterTag === tag
                    ? `0 4px 12px ${P}44`
                    : '0 1px 4px rgba(0,0,0,0.07)'
                }
                _hover={{ bg: filterTag === tag ? P_DARK : 'gray.50' }}
                onClick={() => setFilterTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </Flex>
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
            onClick={() => {
              setSelected(BLANK);
              setModalMode('add');
            }}
          >
            <PlusIco /> Add Customer
          </Button>
        </Flex>

        {/* GRID */}
        <Grid templateColumns="repeat(auto-fill,minmax(260px,1fr))" gap="14px">
          {filtered.map((c) => (
            <CustomerCard
              key={c.id}
              customer={c}
              onView={() => setViewing(c)}
              onEdit={() => {
                setSelected(c);
                setModalMode('edit');
              }}
              onDelete={() =>
                setCustomers((p) => p.filter((x) => x.id !== c.id))
              }
            />
          ))}
          {filtered.length === 0 && (
            <Box gridColumn="1/-1" py="64px" textAlign="center">
              <Text fontSize="32px" mb="12px">
                👥
              </Text>
              <Text fontWeight="700" fontSize="16px" color="gray.600">
                No customers found
              </Text>
            </Box>
          )}
        </Grid>

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
            {filtered.length} of {customers.length} customers
          </Text>
          <Text fontSize="11px" color="gray.400">
            Drivia Dealer Tool © 2024
          </Text>
        </Flex>
      </Box>

      {/* DRAWER */}
      {viewing && (
        <CustomerDrawer
          customer={viewing}
          onClose={() => setViewing(null)}
          onEdit={() => {
            setSelected(viewing);
            setModalMode('edit');
            setViewing(null);
          }}
        />
      )}

      {/* FORM MODAL */}
      {modalMode && selected && (
        <CustomerForm
          mode={modalMode}
          customer={selected}
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

'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  Text,
  Input,
  Button,
  Badge,
  HStack,
  VStack,
  Link,
} from '@chakra-ui/react';
import ShareModalDemo, { ShareModal } from '../../molecules/sharemodal';
import { ShareButton } from '../../he/btn-modal';
import { CarListing } from '../../../shared/types';

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const P = '#6C63FF';
const P_DARK = '#5B54E8';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface NavItem {
  href: string;
  label: string;
  icon: JSX.Element;
  rel?: string;
  target?: string;
}

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Ico = ({
  d,
  size = 18,
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

const SearchIco = (): JSX.Element => (
  <Ico d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" size={15} />
);
const ShareIco = (): JSX.Element => (
  <Ico
    d={[
      'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8',
      'M16 6l-4-4-4 4',
      'M12 2v13',
    ]}
    size={15}
  />
);
const GridIco = (): JSX.Element => (
  <svg
    width="18"
    height="18"
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

// ─── NAV ITEMS ───────────────────────────────────────────────────────────────
interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: <GridIco /> },
      {
        href: '/analytics',
        label: 'Analytics',
        icon: <Ico d={['M18 20V10', 'M12 20V4', 'M6 20v-6']} />,
      },
    ],
  },
  {
    label: 'Inventory',
    items: [
      {
        href: '/inventory',
        label: 'My Listings',
        icon: (
          <Ico
            d={[
              'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z',
              'M3 6h18',
              'M16 10a4 4 0 0 1-8 0',
            ]}
          />
        ),
      },
      {
        href: '/marketplace',
        label: 'Marketplace',
        target: '_blank',
        rel: 'noopener noreferrer',
        icon: (
          <Ico
            d={[
              'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
              'M9 22V12h6v10',
            ]}
          />
        ),
      },
    ],
  },
  {
    label: 'Sales',
    items: [
      {
        href: '/leads',
        label: 'Leads',
        icon: (
          <Ico
            d={[
              'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
              'M23 21v-2a4 4 0 0 0-3-3.87',
              'M16 3.13a4 4 0 0 1 0 7.75',
            ]}
          />
        ),
      },
      {
        href: '/crm',
        label: 'Customers',
        icon: (
          <Ico
            d={[
              'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
              'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
            ]}
          />
        ),
      },
    ],
  },
  {
    label: 'Marketing',
    items: [
      {
        href: '/broadcast',
        label: 'Broadcast',
        icon: <Ico d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z" />,
      },
      {
        href: '/socials',
        label: 'Manage Socials',
        icon: (
          <Ico
            d={[
              'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8',
              'M16 6l-4-4-4 4',
              'M12 2v13',
            ]}
          />
        ),
      },
    ],
  },
  {
    label: 'Account',
    items: [
      {
        href: '/plans',
        label: 'Plans',
        icon: (
          <Ico
            d={[
              'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
              'M14 2v6h6',
              'M16 13H8',
              'M16 17H8',
            ]}
          />
        ),
      },
      {
        href: '/profile',
        label: 'Profile',
        icon: (
          <Ico d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8v4M12 16h.01" />
        ),
      },
    ],
  },
  {
    label: 'Others',
    items: [
      {
        href: '/referrals',
        label: 'Referrals',
        icon: (
          <Ico
            d={[
              'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
              'M14 2v6h6',
              'M16 13H8',
              'M16 17H8',
            ]}
          />
        ),
      },
      {
        href: '/inspector',
        label: 'Become an Inspector',
        icon: (
          <Ico d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8v4M12 16h.01" />
        ),
      },
    ],
  },
];

const DEMO_LISTING: CarListing = {
  status: 'Available',
  color: '#3F51B5',
  transmission: 'Automatic',
  fuelType: 'Petrol',
  description: 'string',
  postedAt: '09/30/2026', // ISO date
  sharedTo: ['whatsapp'],
  id: '1',
  title: '2021 Toyota Camry',
  make: 'Toyota',
  model: 'Camry',
  year: 2021,
  price: 16500000,
  mileage: 42000,
  condition: 'Tokunbo',
  location: 'Lekki, Lagos',
  phone: '08012345678',
  images: [
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=220&fit=crop',
  ],
  gradient: 'linear(to-br, #3F51B5, #6C63FF)',
};

// Flat list for search
const NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export function Sidebar(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState<string>('');
  const [isShareOpen, setIsShareOpen] = useState(false);

  const filtered: NavItem[] = query.trim()
    ? NAV_ITEMS.filter((n) =>
        n.label.toLowerCase().includes(query.toLowerCase()),
      )
    : NAV_ITEMS;

  const isActive = (href: string): boolean =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <Box
      w="220px"
      minW="220px"
      bg="white"
      borderRight="1px solid"
      borderColor="gray.100"
      py="24px"
      px="16px"
      display="flex"
      flexDir="column"
      h="100vh"
      position="sticky"
      top="0"
      boxShadow="2px 0 12px rgba(0,0,0,0.03)"
      fontFamily="'DM Sans', sans-serif"
    >
      {/* ── LOGO ── */}
      <HStack
        mb="24px"
        px="8px"
        gap="8px"
        cursor="pointer"
        onClick={() => router.push('/')}
      >
        <Box
          w="28px"
          h="28px"
          borderRadius="8px"
          bg={P}
          flexShrink="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="white" fontSize="14px" fontWeight="900" lineHeight="1">
            D
          </Text>
        </Box>
        <Text fontWeight="800" fontSize="16px" color="gray.800">
          Drivia
        </Text>
        <Badge
          fontSize="9px"
          bg="purple.100"
          color={P}
          borderRadius="4px"
          px="6px"
          py="1px"
          fontWeight="700"
        >
          FREE
        </Badge>
      </HStack>

      {/* ── SEARCH ── */}
      <Box mb="18px">
        <Box position="relative">
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            pl="32px"
            placeholder="Search pages..."
            bg="gray.50"
            border="1px solid"
            borderColor="transparent"
            borderRadius="10px"
            fontSize="13px"
            size="sm"
            h="34px"
            _placeholder={{ color: 'gray.400' }}
            _focus={{ bg: 'white', borderColor: `${P}66`, boxShadow: 'none' }}
            transition="all 0.15s"
          />
        </Box>
      </Box>

      {/* ── NAV LINKS ── */}
      <VStack align="stretch" gap="0px" flex="1" overflowY={'auto'}>
        {filtered.length === 0 ? (
          <Text fontSize="12px" color="gray.400" px="12px" py="8px">
            No pages found
          </Text>
        ) : query.trim() ? (
          // Flat search results
          filtered.map((item) => {
            const active = isActive(item.href);
            return (
              <HStack
                key={item.href}
                as="button"
                px="12px"
                py="9px"
                borderRadius="10px"
                bg={active ? `${P}15` : 'transparent'}
                color={active ? P : 'gray.500'}
                cursor="pointer"
                onClick={() => router.push(item.href)}
                _hover={{
                  bg: active ? `${P}15` : 'gray.50',
                  color: active ? P : 'gray.700',
                }}
                transition="all 0.15s"
                gap="10px"
                w="100%"
                textAlign="left"
                aria-current={active ? 'page' : undefined}
              >
                <Box flexShrink="0">{item.icon}</Box>
                <Text
                  fontSize="13px"
                  fontWeight={active ? '600' : '400'}
                  flex="1"
                >
                  {item.label}
                </Text>
                {active && (
                  <Box
                    w="6px"
                    h="6px"
                    borderRadius="full"
                    bg={P}
                    flexShrink="0"
                  />
                )}
              </HStack>
            );
          })
        ) : (
          // Grouped nav
          NAV_GROUPS.map((group, gi) => (
            <Box key={group.label} mb="6px">
              <Text
                fontSize="9px"
                fontWeight="700"
                color="gray.400"
                textTransform="uppercase"
                letterSpacing="0.6px"
                px="12px"
                py="6px"
              >
                {group.label}
              </Text>
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <HStack
                    key={item.href}
                    as="button"
                    px="12px"
                    py="8px"
                    borderRadius="10px"
                    bg={active ? `${P}15` : 'transparent'}
                    color={active ? P : 'gray.500'}
                    cursor="pointer"
                    onClick={() => router.push(item.href)}
                    _hover={{
                      bg: active ? `${P}15` : 'gray.50',
                      color: active ? P : 'gray.700',
                    }}
                    _active={{
                      outline: 'none',
                      border: 'none',
                    }}
                    _focus={{
                      border: 'none',
                    }}
                    transition="all 0.15s"
                    gap="10px"
                    w="100%"
                    textAlign="left"
                    aria-current={active ? 'page' : undefined}
                  >
                    <Box flexShrink="0">{item.icon}</Box>
                    <Text
                      fontSize="13px"
                      fontWeight={active ? '600' : '400'}
                      flex="1"
                    >
                      {item.label}
                    </Text>
                    {active && (
                      <Box
                        w="6px"
                        h="6px"
                        borderRadius="full"
                        bg={P}
                        flexShrink="0"
                      />
                    )}
                  </HStack>
                );
              })}
            </Box>
          ))
        )}

        {/* Divider */}
        <Box h="1px" bg="gray.100" my="6px" />

        {/* Logout */}
        <HStack
          as="button"
          px="12px"
          py="10px"
          borderRadius="10px"
          color="red.400"
          cursor="pointer"
          onClick={() => router.push('/sign-in')}
          _hover={{ bg: 'red.50', color: 'red.500' }}
          transition="all 0.15s"
          gap="10px"
          w="100%"
          textAlign="left"
          aria-label="Logout"
        >
          <Box flexShrink="0">
            <Ico
              d={[
                'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4',
                'M16 17l5-5-5-5',
                'M21 12H9',
              ]}
            />
          </Box>
          <Text fontSize="13px">Logout</Text>
        </HStack>
      </VStack>

      {/* ── SHARE POST ── */}
      <Box mt="16px" mb="14px">
        <Button
          bg={P}
          color="white"
          borderRadius="10px"
          fontSize="13px"
          fontWeight="600"
          h="38px"
          w="100%"
          gap="8px"
          _hover={{ bg: P_DARK }}
          boxShadow={`0 4px 14px ${P}44`}
          onClick={() => setIsShareOpen(true)}
        >
          <ShareIco /> Share Post
        </Button>
      </Box>

      {/* ── UPGRADE BANNER ── */}
      <Box bg={`${P}10`} borderRadius="16px" p="14px" textAlign="center">
        <Box
          w="36px"
          h="36px"
          borderRadius="full"
          bg={P}
          display="flex"
          alignItems="center"
          justifyContent="center"
          mx="auto"
          mb="8px"
        >
          <Text fontSize="16px" lineHeight="1">
            🚀
          </Text>
        </Box>
        <Text fontSize="11px" fontWeight="700" color="gray.700" mb="3px">
          Upgrade to PRO
        </Text>
        <Text fontSize="9px" color="gray.500" mb="10px" lineHeight="1.5">
          To get access to all features!
          <br />
          Connect with Venus World
        </Text>
        <Button
          size="xs"
          bg={P}
          color="white"
          borderRadius="8px"
          fontSize="10px"
          fontWeight="600"
          w="100%"
          _hover={{ bg: P_DARK }}
        >
          Upgrade Now
        </Button>
      </Box>
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        listing={DEMO_LISTING}
      />
    </Box>
  );
}

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
} from '@chakra-ui/react';
import AppLayout from '../components/template/general-layout';

const P = '#6C63FF';
const P_DARK = '#5B54E8';
const P_LIGHT = '#EEF0FF';
const BG = '#F4F5FA';
const WHITE = '#FFFFFF';
const GREEN = '#38A169';
const WA = '#25D366';

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
const EditIco = () => (
  <Ico
    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
    size={14}
  />
);
const SaveIco = () => (
  <Ico
    d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8"
    size={14}
  />
);
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
const MailIco = () => (
  <Ico
    d={[
      'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z',
      'M22 6l-10 7L2 6',
    ]}
    size={13}
  />
);
const StarFill = (c = '#F6AD55') => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={c} stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const CarIco = () => (
  <Ico
    d={[
      'M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5',
      'M14 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0',
      'M7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0',
    ]}
    size={14}
  />
);
const TrendUpIco = () => (
  <Ico d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" size={14} stroke={GREEN} />
);
const ShieldOk = () => (
  <Ico
    d={['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M9 12l2 2 4-4']}
    size={14}
    stroke={GREEN}
  />
);
const CloseIco = () => <Ico d="M18 6 6 18M6 6l12 12" sw={2.5} />;
const CameraIco = () => (
  <Ico
    d={[
      'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z',
      'M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    ]}
    size={14}
  />
);

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface NotifSetting {
  label: string;
  enabled: boolean;
}
interface SaleRecord {
  id: string;
  car: string;
  buyer: string;
  price: number;
  date: string;
  condition: string;
  platform: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const recentSales: SaleRecord[] = [
  {
    id: '1',
    car: '2021 Toyota Camry',
    buyer: 'Chidi Okafor',
    price: 16500000,
    date: 'Nov 1, 2024',
    condition: 'Tokunbo',
    platform: 'WhatsApp',
  },
  {
    id: '2',
    car: '2018 Lexus RX350',
    buyer: 'Biodun Fashola',
    price: 26000000,
    date: 'Oct 28, 2024',
    condition: 'Tokunbo',
    platform: 'Referral',
  },
  {
    id: '3',
    car: '2020 Honda CR-V',
    buyer: 'Ada Nwosu',
    price: 20500000,
    date: 'Oct 18, 2024',
    condition: 'Tokunbo',
    platform: 'Facebook',
  },
  {
    id: '4',
    car: '2019 Mercedes C300',
    buyer: 'Kola Adesanya',
    price: 34000000,
    date: 'Sep 30, 2024',
    condition: 'Tokunbo',
    platform: 'Walk-in',
  },
  {
    id: '5',
    car: '2020 Toyota Corolla',
    buyer: 'Ngozi Eze',
    price: 13500000,
    date: 'Sep 14, 2024',
    condition: 'Nigerian Used',
    platform: 'WhatsApp',
  },
];

const SOURCE_COLOR: Record<string, string> = {
  WhatsApp: WA,
  Facebook: '#1877F2',
  Instagram: '#E1306C',
  'Walk-in': '#805AD5',
  Referral: '#D69E2E',
};

const initialNotifs: NotifSetting[] = [
  { label: 'New WhatsApp enquiry', enabled: true },
  { label: 'Lead status change', enabled: true },
  { label: 'Listing gets 10+ views', enabled: true },
  { label: 'Inspection report ready', enabled: true },
  { label: 'Listing saved by buyer', enabled: false },
  { label: 'Broadcast sent confirmation', enabled: true },
  { label: 'Plan renewal reminder', enabled: true },
  { label: 'Team member activity', enabled: false },
  { label: 'Weekly performance summary', enabled: true },
  { label: 'New buyer review received', enabled: false },
];

// ─── TOGGLE ───────────────────────────────────────────────────────────────────
function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: () => void;
}): JSX.Element {
  return (
    <Box
      as="button"
      onClick={onChange}
      w="38px"
      h="20px"
      borderRadius="full"
      bg={on ? P : 'gray.200'}
      position="relative"
      transition="background 0.2s"
      flexShrink="0"
    >
      <Box
        position="absolute"
        top="2px"
        left={on ? '20px' : '2px'}
        w="16px"
        h="16px"
        borderRadius="full"
        bg="white"
        boxShadow="0 1px 3px rgba(0,0,0,0.2)"
        transition="left 0.2s"
      />
    </Box>
  );
}

// ─── EDITABLE FIELD ───────────────────────────────────────────────────────────
function EditableField({
  label,
  value,
  onSave,
}: {
  label: string;
  value: string;
  onSave: (v: string) => void;
}): JSX.Element {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  return (
    <Box>
      <Text
        fontSize="10px"
        color="gray.400"
        fontWeight="700"
        textTransform="uppercase"
        letterSpacing="0.4px"
        mb="4px"
      >
        {label}
      </Text>
      {editing ? (
        <HStack gap="6px">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            fontSize="13px"
            fontWeight="600"
            h="32px"
            borderRadius="8px"
            border="1.5px solid"
            borderColor={P}
            bg="white"
            _focus={{ boxShadow: `0 0 0 3px ${P}22` }}
          />
          <Box
            as="button"
            onClick={() => {
              onSave(draft);
              setEditing(false);
            }}
            w="28px"
            h="28px"
            borderRadius="7px"
            bg={P}
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{ bg: P_DARK }}
            flexShrink="0"
          >
            <SaveIco />
          </Box>
          <Box
            as="button"
            onClick={() => {
              setDraft(value);
              setEditing(false);
            }}
            w="28px"
            h="28px"
            borderRadius="7px"
            bg="gray.100"
            color="gray.500"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{ bg: 'gray.200' }}
            flexShrink="0"
          >
            <CloseIco />
          </Box>
        </HStack>
      ) : (
        <Flex align="center" gap="6px" _hover={{ color: 'green.500' }}>
          <Text fontSize="13px" fontWeight="600" color="gray.700">
            {draft}
          </Text>
          <Box
            as="button"
            onClick={() => setEditing(true)}
            color="gray.300"
            _hover={{ color: P }}
            transition="color 0.15s"
          >
            <EditIco />
          </Box>
        </Flex>
      )}
    </Box>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Profile(): JSX.Element {
  const [notifs, setNotifs] = useState<NotifSetting[]>(initialNotifs);
  const [activeTab, setActiveTab] = useState<'overview' | 'sales' | 'settings'>(
    'overview',
  );

  // Dealership editable fields
  const [name, setName] = useState('Lagos Auto Hub');
  const [phone, setPhone] = useState('08012345678');
  const [email, setEmail] = useState('info@lagosautohub.com');
  const [whatsapp, setWhatsapp] = useState('08012345678');
  const [location, setLocation] = useState('Lekki Phase 1, Lagos');
  const [description, setDescription] = useState(
    'Premium Tokunbo and Brand New cars. Certified inspections, trusted by 300+ buyers across Nigeria since 2019.',
  );

  const toggleNotif = (i: number) =>
    setNotifs((p) =>
      p.map((n, j) => (j === i ? { ...n, enabled: !n.enabled } : n)),
    );

  const totalRevenue = recentSales.reduce((a, s) => a + s.price, 0);
  const avgPrice = Math.round(totalRevenue / recentSales.length);

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
            Drivia / Profile
          </Text>
          <Heading fontSize="22px" fontWeight="800" color="gray.800" mt="1px">
            Dealer Profile
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
              pl="34px"
              placeholder="Search…"
              bg="gray.50"
              border="none"
              borderRadius="12px"
              fontSize="13px"
              h="36px"
              _placeholder={{ color: 'gray.400' }}
              _focus={{ bg: 'gray.100', boxShadow: 'none' }}
            />
          </Box>
          {([<BellIco />, <MoonIco />, <GridIco />] as JSX.Element[]).map(
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
        {/* PROFILE HEADER CARD */}
        <Box
          bg={WHITE}
          borderRadius="18px"
          overflow="hidden"
          boxShadow="0 2px 14px rgba(0,0,0,0.07)"
          mb="22px"
        >
          {/* Banner */}
          <Box
            h="130px"
            position="relative"
            overflow="hidden"
            style={{
              background:
                'linear-gradient(135deg,#6C63FF 0%,#5B54E8 50%,#4338CA 100%)',
            }}
          >
            <Box
              position="absolute"
              right="-20px"
              top="-30px"
              w="180px"
              h="180px"
              borderRadius="full"
              bg="rgba(255,255,255,0.08)"
            />
            <Box
              position="absolute"
              right="160px"
              bottom="-40px"
              w="130px"
              h="130px"
              borderRadius="full"
              bg="rgba(255,255,255,0.05)"
            />
            {/* Edit banner */}
            <Box
              as="button"
              position="absolute"
              top="12px"
              right="14px"
              bg="rgba(255,255,255,0.2)"
              color="white"
              px="10px"
              py="5px"
              borderRadius="8px"
              fontSize="11px"
              fontWeight="600"
              display="flex"
              alignItems="center"
              gap="5px"
              _hover={{ bg: 'rgba(255,255,255,0.3)' }}
            >
              <CameraIco /> Edit Banner
            </Box>
          </Box>

          {/* Profile row */}
          <Flex px="28px" pb="22px" align="flex-end" justify="space-between">
            <HStack align="flex-end" gap="16px">
              {/* Avatar */}
              <Box position="relative" mt="-42px">
                <Avatar.Root
                  size="2xl"
                  style={{
                    border: '4px solid white',
                    borderRadius: '50%',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  }}
                >
                  <Avatar.Image src="https://i.pravatar.cc/96?img=47" />
                  <Avatar.Fallback>LA</Avatar.Fallback>
                </Avatar.Root>
                <Box
                  position="absolute"
                  bottom="4px"
                  right="4px"
                  w="22px"
                  h="22px"
                  borderRadius="full"
                  bg={P}
                  border="2px solid white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  as="button"
                  _hover={{ bg: P_DARK }}
                  cursor="pointer"
                >
                  <CameraIco />
                </Box>
              </Box>
              <Box pb="4px">
                <HStack gap="8px" mb="2px" align="center">
                  <Text fontWeight="900" fontSize="20px" color="gray.800">
                    {name}
                  </Text>
                  <Badge
                    bg="#FEFCBF"
                    color="#744210"
                    borderRadius="6px"
                    fontSize="10px"
                    px="8px"
                    py="2px"
                    fontWeight="700"
                  >
                    🥇 Gold Dealer
                  </Badge>
                  <Badge
                    bg="#F0FFF4"
                    color="#276749"
                    borderRadius="6px"
                    fontSize="10px"
                    px="8px"
                    py="2px"
                    fontWeight="700"
                  >
                    <HStack gap="3px" display="inline-flex">
                      <ShieldOk />
                      Verified
                    </HStack>
                  </Badge>
                </HStack>
                <HStack gap="14px">
                  <HStack gap="4px" color="gray.400">
                    <LocIco />
                    <Text fontSize="12px">{location}</Text>
                  </HStack>
                  <HStack gap="4px" color="gray.400">
                    <PhoneIco />
                    <Text fontSize="12px">{phone}</Text>
                  </HStack>
                  <HStack gap="4px" color="gray.400">
                    <MailIco />
                    <Text fontSize="12px">{email}</Text>
                  </HStack>
                </HStack>
              </Box>
            </HStack>

            {/* Quick stats */}
            <HStack
              gap="0"
              bg="gray.50"
              borderRadius="14px"
              overflow="hidden"
              border="1px solid"
              borderColor="gray.100"
            >
              {[
                { val: '47', label: 'Active Listings' },
                { val: '312', label: 'Cars Sold' },
                { val: '4.8', label: 'Avg. Rating' },
                { val: '2019', label: 'Member Since' },
              ].map((s, i) => (
                <Box
                  key={s.label}
                  px="20px"
                  py="14px"
                  textAlign="center"
                  borderRight={i < 3 ? '1px solid' : 'none'}
                  borderColor="gray.100"
                >
                  <Text fontSize="20px" fontWeight="900" color="gray.800">
                    {s.val}
                  </Text>
                  <Text fontSize="10px" color="gray.400" fontWeight="600">
                    {s.label}
                  </Text>
                </Box>
              ))}
            </HStack>
          </Flex>

          {/* Tab bar */}
          <HStack
            gap="0"
            px="28px"
            borderTop="1px solid"
            borderColor="gray.100"
          >
            {(['overview', 'sales', 'settings'] as const).map((tab) => (
              <Box
                key={tab}
                as="button"
                onClick={() => setActiveTab(tab)}
                px="18px"
                py="12px"
                fontSize="13px"
                fontWeight="600"
                color={activeTab === tab ? P : 'gray.400'}
                borderBottom="2px solid"
                borderColor={activeTab === tab ? P : 'transparent'}
                transition="all 0.15s"
                _hover={{ color: P }}
                textTransform="capitalize"
              >
                {tab}
              </Box>
            ))}
          </HStack>
        </Box>

        {/* ── OVERVIEW TAB ─────────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <Grid templateColumns="1.3fr 1fr 0.9fr" gap="18px">
            {/* Dealership info */}
            <Box
              bg={WHITE}
              borderRadius="16px"
              p="22px"
              boxShadow="0 2px 10px rgba(0,0,0,0.05)"
            >
              <Flex justify="space-between" align="center" mb="16px">
                <Text fontWeight="800" fontSize="15px" color="gray.800">
                  Dealership Info
                </Text>
                <Badge
                  bg={P_LIGHT}
                  color={P}
                  borderRadius="7px"
                  fontSize="10px"
                  px="8px"
                  py="2px"
                  fontWeight="700"
                >
                  Pro Plan
                </Badge>
              </Flex>
              <Text fontSize="12px" color="gray.500" lineHeight="1.7" mb="18px">
                {description}
              </Text>
              <VStack gap="12px" align="stretch">
                {[
                  { label: 'Business Name', val: name, set: setName },
                  { label: 'Phone', val: phone, set: setPhone },
                  { label: 'Email', val: email, set: setEmail },
                  { label: 'WhatsApp', val: whatsapp, set: setWhatsapp },
                  { label: 'Location', val: location, set: setLocation },
                  { label: 'About', val: description, set: setDescription },
                ].map((f) => (
                  <Box
                    key={f.label}
                    pb="12px"
                    borderBottom="1px solid"
                    borderColor="gray.50"
                    _last={{ borderBottom: 'none', pb: 0 }}
                  >
                    <EditableField
                      label={f.label}
                      value={f.val}
                      onSave={f.set}
                    />
                  </Box>
                ))}
              </VStack>
            </Box>

            {/* Performance summary */}
            <Box>
              <Box
                bg={WHITE}
                borderRadius="16px"
                p="20px"
                mb="16px"
                boxShadow="0 2px 10px rgba(0,0,0,0.05)"
              >
                <Text
                  fontWeight="800"
                  fontSize="15px"
                  color="gray.800"
                  mb="14px"
                >
                  Performance
                </Text>
                {[
                  {
                    label: 'Total Revenue (Lifetime)',
                    value: '₦318M',
                    icon: '💰',
                    color: P,
                  },
                  {
                    label: 'Cars Sold (All Time)',
                    value: '312',
                    icon: '🚗',
                    color: GREEN,
                  },
                  {
                    label: 'Avg. Selling Price',
                    value: '₦21.4M',
                    icon: '📊',
                    color: '#2C7A7B',
                  },
                  {
                    label: 'Repeat Buyers',
                    value: '47',
                    icon: '🔁',
                    color: '#805AD5',
                  },
                  {
                    label: 'Inspection Rate',
                    value: '92%',
                    icon: '✅',
                    color: GREEN,
                  },
                  {
                    label: 'Response Time',
                    value: '< 1 hour',
                    icon: '⚡',
                    color: '#D69E2E',
                  },
                ].map((s) => (
                  <Flex
                    key={s.label}
                    justify="space-between"
                    align="center"
                    py="9px"
                    borderBottom="1px solid"
                    borderColor="gray.50"
                    _last={{ borderBottom: 'none' }}
                  >
                    <HStack gap="7px">
                      <Text fontSize="13px">{s.icon}</Text>
                      <Text fontSize="12px" color="gray.500">
                        {s.label}
                      </Text>
                    </HStack>
                    <Text fontSize="12px" fontWeight="800" color={s.color}>
                      {s.value}
                    </Text>
                  </Flex>
                ))}
              </Box>

              {/* Social handles */}
              <Box
                bg={WHITE}
                borderRadius="16px"
                p="20px"
                boxShadow="0 2px 10px rgba(0,0,0,0.05)"
              >
                <Text
                  fontWeight="800"
                  fontSize="15px"
                  color="gray.800"
                  mb="12px"
                >
                  Social Profiles
                </Text>
                {[
                  {
                    plat: 'WhatsApp',
                    handle: '08012345678',
                    color: WA,
                    letter: 'W',
                    connected: true,
                  },
                  {
                    plat: 'Facebook',
                    handle: '@LagosAutoHub',
                    color: '#1877F2',
                    letter: 'f',
                    connected: true,
                  },
                  {
                    plat: 'Instagram',
                    handle: '@lagos.auto.hub',
                    color: '#E1306C',
                    letter: 'ig',
                    connected: true,
                  },
                  {
                    plat: 'Twitter/X',
                    handle: 'Not connected',
                    color: '#1DA1F2',
                    letter: 'X',
                    connected: false,
                  },
                ].map((s) => (
                  <Flex
                    key={s.plat}
                    align="center"
                    gap="10px"
                    py="8px"
                    borderBottom="1px solid"
                    borderColor="gray.50"
                    _last={{ borderBottom: 'none' }}
                  >
                    <Box
                      w="28px"
                      h="28px"
                      borderRadius="8px"
                      bg={s.color}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink="0"
                      opacity={s.connected ? 1 : 0.35}
                    >
                      <Text fontSize="10px" color="white" fontWeight="900">
                        {s.letter}
                      </Text>
                    </Box>
                    <Box flex="1">
                      <Text fontSize="12px" fontWeight="600" color="gray.700">
                        {s.plat}
                      </Text>
                      <Text
                        fontSize="11px"
                        color={s.connected ? 'gray.400' : 'gray.300'}
                      >
                        {s.handle}
                      </Text>
                    </Box>
                    <Badge
                      bg={s.connected ? '#C6F6D5' : 'gray.100'}
                      color={s.connected ? '#276749' : 'gray.400'}
                      borderRadius="5px"
                      fontSize="9px"
                      px="6px"
                      py="1px"
                      fontWeight="700"
                    >
                      {s.connected ? 'Connected' : 'Connect'}
                    </Badge>
                  </Flex>
                ))}
              </Box>
            </Box>

            {/* Right column: rating + notifs preview */}
            <Box>
              {/* Buyer rating breakdown */}
              <Box
                bg={WHITE}
                borderRadius="16px"
                p="20px"
                mb="16px"
                boxShadow="0 2px 10px rgba(0,0,0,0.05)"
              >
                <Text
                  fontWeight="800"
                  fontSize="15px"
                  color="gray.800"
                  mb="14px"
                >
                  Buyer Ratings
                </Text>
                <Flex align="center" gap="14px" mb="14px">
                  <Box textAlign="center">
                    <Text
                      fontSize="38px"
                      fontWeight="900"
                      color="gray.800"
                      lineHeight="1"
                    >
                      4.8
                    </Text>
                    <HStack gap="2px" justify="center" mb="2px">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Box key={i}>
                          {StarFill(i <= 4 ? '#F6AD55' : '#FED7AA')}
                        </Box>
                      ))}
                    </HStack>
                    <Text fontSize="10px" color="gray.400">
                      198 reviews
                    </Text>
                  </Box>
                  <Box flex="1">
                    {[
                      [5, 72],
                      [4, 18],
                      [3, 6],
                      [2, 2],
                      [1, 2],
                    ].map(([stars, pct]) => (
                      <Flex key={stars} align="center" gap="6px" mb="5px">
                        <Text fontSize="10px" color="gray.400" w="8px">
                          {stars}
                        </Text>
                        <Box
                          flex="1"
                          h="6px"
                          bg="gray.100"
                          borderRadius="3px"
                          overflow="hidden"
                        >
                          <Box
                            h="100%"
                            bg="#F6AD55"
                            borderRadius="3px"
                            w={`${pct}%`}
                          />
                        </Box>
                        <Text
                          fontSize="10px"
                          color="gray.400"
                          w="24px"
                          textAlign="right"
                        >
                          {pct}%
                        </Text>
                      </Flex>
                    ))}
                  </Box>
                </Flex>
                {/* Review highlights */}
                {[
                  {
                    text: 'Very trustworthy dealer, car exactly as described.',
                    buyer: 'Chidi O.',
                    stars: 5,
                  },
                  {
                    text: 'Fast response on WhatsApp, smooth transaction.',
                    buyer: 'Ada N.',
                    stars: 5,
                  },
                  {
                    text: 'Inspection report gave me confidence to buy.',
                    buyer: 'Kola A.',
                    stars: 4,
                  },
                ].map((r, i) => (
                  <Box
                    key={i}
                    bg="gray.50"
                    borderRadius="10px"
                    p="10px"
                    mb="6px"
                    _last={{ mb: 0 }}
                  >
                    <HStack gap="4px" mb="4px">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Box key={s}>
                          {StarFill(s <= r.stars ? '#F6AD55' : '#E2E8F0')}
                        </Box>
                      ))}
                    </HStack>
                    <Text
                      fontSize="11px"
                      color="gray.600"
                      lineHeight="1.5"
                      mb="4px"
                    >
                      "{r.text}"
                    </Text>
                    <Text fontSize="10px" color="gray.400" fontWeight="600">
                      — {r.buyer}
                    </Text>
                  </Box>
                ))}
              </Box>

              {/* Plan badge */}
              <Box
                bg={P}
                borderRadius="16px"
                p="18px"
                boxShadow={`0 6px 24px ${P}44`}
                style={{ background: `linear-gradient(135deg,${P},${P_DARK})` }}
              >
                <Text fontSize="20px" mb="8px">
                  🚀
                </Text>
                <Text fontWeight="800" fontSize="14px" color="white" mb="4px">
                  Pro Plan Active
                </Text>
                <Text fontSize="11px" color="rgba(255,255,255,0.75)" mb="12px">
                  Renews Dec 1, 2024 · ₦15,000/month
                </Text>
                <Box
                  h="5px"
                  bg="rgba(255,255,255,0.2)"
                  borderRadius="3px"
                  overflow="hidden"
                  mb="5px"
                >
                  <Box h="100%" bg="white" borderRadius="3px" w="60%" />
                </Box>
                <Text fontSize="10px" color="rgba(255,255,255,0.65)" mb="12px">
                  18 / 30 listings used
                </Text>
                <Box
                  as="button"
                  w="100%"
                  bg="rgba(255,255,255,0.18)"
                  color="white"
                  borderRadius="9px"
                  py="8px"
                  fontSize="12px"
                  fontWeight="700"
                  textAlign="center"
                  _hover={{ bg: 'rgba(255,255,255,0.28)' }}
                  display="block"
                  transition="all 0.15s"
                >
                  Manage Plan →
                </Box>
              </Box>
            </Box>
          </Grid>
        )}

        {/* ── SALES TAB ────────────────────────────────────────────────────── */}
        {activeTab === 'sales' && (
          <Box>
            {/* Summary cards */}
            <Grid templateColumns="repeat(4,1fr)" gap="14px" mb="20px">
              {[
                {
                  icon: '💰',
                  label: 'Revenue This Year',
                  value: '₦218M',
                  color: P,
                },
                {
                  icon: '🚗',
                  label: 'Cars Sold This Year',
                  value: '21',
                  color: GREEN,
                },
                {
                  icon: '📊',
                  label: 'Avg. Sale Price',
                  value: '₦21.4M',
                  color: '#2C7A7B',
                },
                { icon: '💬', label: 'From WhatsApp', value: '61%', color: WA },
              ].map((s) => (
                <Box
                  key={s.label}
                  bg={WHITE}
                  borderRadius="14px"
                  p="16px 18px"
                  boxShadow="0 2px 8px rgba(0,0,0,0.05)"
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

            {/* Sales table */}
            <Box
              bg={WHITE}
              borderRadius="16px"
              overflow="hidden"
              boxShadow="0 2px 10px rgba(0,0,0,0.05)"
            >
              <Flex
                align="center"
                justify="space-between"
                px="22px"
                py="16px"
                borderBottom="1px solid"
                borderColor="gray.100"
              >
                <Text fontWeight="800" fontSize="15px" color="gray.800">
                  Recent Sales
                </Text>
                <Button
                  bg={P_LIGHT}
                  color={P}
                  borderRadius="9px"
                  fontSize="12px"
                  fontWeight="700"
                  h="32px"
                  px="14px"
                  _hover={{ bg: `${P}22` }}
                >
                  Export CSV
                </Button>
              </Flex>
              {/* Header */}
              <Grid
                templateColumns="2fr 1.2fr 1fr 0.8fr 0.9fr"
                px="22px"
                py="9px"
                bg="gray.50"
                borderBottom="1px solid"
                borderColor="gray.100"
              >
                {['Car', 'Buyer', 'Price', 'Date', 'Channel'].map((h) => (
                  <Text
                    key={h}
                    fontSize="10px"
                    color="gray.400"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="0.4px"
                  >
                    {h}
                  </Text>
                ))}
              </Grid>
              {recentSales.map((s, i) => (
                <Grid
                  key={s.id}
                  templateColumns="2fr 1.2fr 1fr 0.8fr 0.9fr"
                  px="22px"
                  py="13px"
                  alignItems="center"
                  borderBottom={
                    i < recentSales.length - 1 ? '1px solid' : 'none'
                  }
                  borderColor="gray.50"
                  _hover={{ bg: 'gray.50' }}
                  transition="background 0.1s"
                >
                  <HStack gap="10px">
                    <Box
                      w="36px"
                      h="28px"
                      borderRadius="7px"
                      bg={P_LIGHT}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink="0"
                    >
                      <CarIco />
                    </Box>
                    <Box>
                      <Text fontSize="12px" fontWeight="600" color="gray.800">
                        {s.car}
                      </Text>
                      <Badge
                        bg={COND_BG(s.condition)}
                        color={COND_COLOR(s.condition)}
                        borderRadius="4px"
                        fontSize="9px"
                        px="5px"
                        fontWeight="700"
                      >
                        {s.condition}
                      </Badge>
                    </Box>
                  </HStack>
                  <Text fontSize="12px" color="gray.700">
                    {s.buyer}
                  </Text>
                  <Text fontSize="13px" fontWeight="800" color={P}>
                    ₦{(s.price / 1_000_000).toFixed(1)}M
                  </Text>
                  <Text fontSize="11px" color="gray.400">
                    {s.date}
                  </Text>
                  <Box>
                    <Box
                      w="8px"
                      h="8px"
                      borderRadius="full"
                      bg={SOURCE_COLOR[s.platform] ?? 'gray.400'}
                      display="inline-block"
                      mr="5px"
                    />
                    <Text as="span" fontSize="11px" color="gray.600">
                      {s.platform}
                    </Text>
                  </Box>
                </Grid>
              ))}
              <Box
                px="22px"
                py="12px"
                borderTop="1px solid"
                borderColor="gray.100"
              >
                <Flex justify="space-between">
                  <Text fontSize="11px" color="gray.400">
                    Showing 5 most recent sales
                  </Text>
                  <Text
                    fontSize="11px"
                    color={P}
                    fontWeight="600"
                    cursor="pointer"
                  >
                    View all 312 sales →
                  </Text>
                </Flex>
              </Box>
            </Box>
          </Box>
        )}

        {/* ── SETTINGS TAB ─────────────────────────────────────────────────── */}
        {activeTab === 'settings' && (
          <Grid templateColumns="1fr 1fr" gap="18px">
            {/* Notification preferences */}
            <Box
              bg={WHITE}
              borderRadius="16px"
              p="22px"
              boxShadow="0 2px 10px rgba(0,0,0,0.05)"
            >
              <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">
                Notification Preferences
              </Text>
              <Text fontSize="12px" color="gray.400" mb="16px">
                Choose which events alert you. Delivered via in-app and email.
              </Text>
              <VStack gap="12px" align="stretch">
                {notifs.map((n, i) => (
                  <Flex
                    key={i}
                    justify="space-between"
                    align="center"
                    py="8px"
                    borderBottom="1px solid"
                    borderColor="gray.50"
                    _last={{ borderBottom: 'none' }}
                  >
                    <Text fontSize="13px" color="gray.700" flex="1" pr="14px">
                      {n.label}
                    </Text>
                    <Toggle on={n.enabled} onChange={() => toggleNotif(i)} />
                  </Flex>
                ))}
              </VStack>
            </Box>

            {/* Account settings */}
            <VStack gap="16px" align="stretch">
              {/* Security */}
              <Box
                bg={WHITE}
                borderRadius="16px"
                p="22px"
                boxShadow="0 2px 10px rgba(0,0,0,0.05)"
              >
                <Text
                  fontWeight="800"
                  fontSize="15px"
                  color="gray.800"
                  mb="14px"
                >
                  Security
                </Text>
                <VStack gap="12px" align="stretch">
                  {[
                    {
                      label: 'Change Password',
                      sub: 'Last changed 90 days ago',
                      btn: 'Update',
                    },
                    {
                      label: 'Two-Factor Auth',
                      sub: 'Currently disabled',
                      btn: 'Enable',
                    },
                    {
                      label: 'Connected Devices',
                      sub: '2 active sessions',
                      btn: 'Manage',
                    },
                    {
                      label: 'Delete Account',
                      sub: 'This cannot be undone',
                      btn: 'Delete',
                      danger: true,
                    },
                  ].map((s) => (
                    <Flex
                      key={s.label}
                      justify="space-between"
                      align="center"
                      py="8px"
                      borderBottom="1px solid"
                      borderColor="gray.50"
                      _last={{ borderBottom: 'none' }}
                    >
                      <Box>
                        <Text
                          fontSize="13px"
                          fontWeight="600"
                          color={s.danger ? '#E53E3E' : 'gray.700'}
                        >
                          {s.label}
                        </Text>
                        <Text fontSize="11px" color="gray.400">
                          {s.sub}
                        </Text>
                      </Box>
                      <Button
                        h="30px"
                        px="12px"
                        borderRadius="8px"
                        fontSize="11px"
                        fontWeight="700"
                        bg={s.danger ? 'red.50' : P_LIGHT}
                        color={s.danger ? '#E53E3E' : P}
                        _hover={{ bg: s.danger ? 'red.100' : `${P}22` }}
                      >
                        {s.btn}
                      </Button>
                    </Flex>
                  ))}
                </VStack>
              </Box>

              {/* Preferences */}
              <Box
                bg={WHITE}
                borderRadius="16px"
                p="22px"
                boxShadow="0 2px 10px rgba(0,0,0,0.05)"
              >
                <Text
                  fontWeight="800"
                  fontSize="15px"
                  color="gray.800"
                  mb="14px"
                >
                  App Preferences
                </Text>
                {[
                  { label: 'Default lead view', val: 'Kanban Board' },
                  { label: 'Default listing view', val: 'Grid' },
                  { label: 'Currency', val: 'Nigerian Naira (₦)' },
                  { label: 'Marketplace visibility', val: 'Public' },
                  { label: 'Auto-share to WhatsApp', val: 'Enabled' },
                ].map((p) => (
                  <Flex
                    key={p.label}
                    justify="space-between"
                    align="center"
                    py="9px"
                    borderBottom="1px solid"
                    borderColor="gray.50"
                    _last={{ borderBottom: 'none' }}
                  >
                    <Text fontSize="12px" color="gray.600">
                      {p.label}
                    </Text>
                    <HStack gap="6px">
                      <Text fontSize="12px" fontWeight="600" color="gray.800">
                        {p.val}
                      </Text>
                      <Box
                        color="gray.300"
                        cursor="pointer"
                        _hover={{ color: P }}
                      >
                        <EditIco />
                      </Box>
                    </HStack>
                  </Flex>
                ))}
              </Box>
            </VStack>
          </Grid>
        )}

        <Flex
          justify="space-between"
          align="center"
          mt="32px"
          pt="16px"
          borderTop="1px solid"
          borderColor="gray.100"
        >
          <Text fontSize="11px" color="gray.400">
            Lagos Auto Hub · Drivia Dealer Tool
          </Text>
          <Text fontSize="11px" color="gray.400">
            © 2024 Drivia
          </Text>
        </Flex>
      </Box>
    </AppLayout>
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function COND_BG(c: string): string {
  if (c === 'Brand New') return '#EEF0FF';
  if (c === 'Tokunbo') return '#E6FFFA';
  return '#FFFAF0';
}
function COND_COLOR(c: string): string {
  if (c === 'Brand New') return '#6C63FF';
  if (c === 'Tokunbo') return '#2C7A7B';
  return '#C05621';
}

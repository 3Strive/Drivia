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
} from '@chakra-ui/react';
import type { Contact, BroadcastMessage, PlatformId } from '../shared/types';
import AppLayout from '../components/template/general-layout';

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const P = '#6C63FF';
const P_DARK = '#5B54E8';
const P_LIGHT = '#EEF0FF';
const BG = '#F4F5FA';
const WHITE = '#FFFFFF';
const WA = '#25D366';
const FB = '#1877F2';
const IG = '#E1306C';

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
const SendIco = () => (
  <Ico d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z" size={15} />
);
const ScheduleIco = () => (
  <Ico
    d={[
      'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z',
      'M12 6v6l4 2',
    ]}
    size={15}
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
const CheckIco = () => <Ico d="M20 6 9 17l-5-5" sw={2.5} size={12} />;
const UserIco = () => (
  <Ico
    d={[
      'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
      'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    ]}
    size={14}
  />
);

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`;

// ─── SEED DATA ────────────────────────────────────────────────────────────────
const SEED_CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Chidi Okafor',
    phone: '08023456789',
    tags: ['Sedan Buyer', 'Budget 15M-20M'],
    addedAt: '2024-10-01',
  },
  {
    id: '2',
    name: 'Fatima Abdullahi',
    phone: '07011234567',
    tags: ['SUV Buyer', 'Budget 20M-25M'],
    addedAt: '2024-10-03',
  },
  {
    id: '3',
    name: 'Emeka Nwosu',
    phone: '09087654321',
    tags: ['Luxury', 'Budget 30M+'],
    addedAt: '2024-10-05',
  },
  {
    id: '4',
    name: 'Ngozi Adeyemi',
    phone: '08134567890',
    tags: ['SUV Buyer', 'Budget 40M+'],
    addedAt: '2024-10-08',
  },
  {
    id: '5',
    name: 'Biodun Fashola',
    phone: '08056789012',
    tags: ['Repeat Customer'],
    addedAt: '2024-10-10',
  },
  {
    id: '6',
    name: 'Amara Obi',
    phone: '07098765432',
    tags: ['Budget 10M-15M', 'Sedan Buyer'],
    addedAt: '2024-10-12',
  },
  {
    id: '7',
    name: 'Tunde Bakare',
    phone: '08145678901',
    tags: ['Truck Buyer', 'Budget 15M-20M'],
    addedAt: '2024-10-15',
  },
  {
    id: '8',
    name: 'Kemi Adeleke',
    phone: '07023456789',
    tags: ['SUV Buyer'],
    addedAt: '2024-10-18',
  },
  {
    id: '9',
    name: 'Segun Adesanya',
    phone: '08167890123',
    tags: ['Luxury', 'Repeat Customer'],
    addedAt: '2024-10-20',
  },
  {
    id: '10',
    name: 'Ada Eze',
    phone: '07056789012',
    tags: ['Sedan Buyer', 'Budget 15M-20M'],
    addedAt: '2024-10-22',
  },
];

const ALL_TAGS = Array.from(new Set(SEED_CONTACTS.flatMap((c) => c.tags)));

type BroadcastStatus = 'Draft' | 'Scheduled' | 'Sent' | 'Failed';

interface Broadcast {
  id: string;
  title: string;
  message: string;
  platforms: PlatformId[];
  recipients: string[]; // contact ids
  status: BroadcastStatus;
  scheduledAt?: string;
  sentAt?: string;
  listingRef?: string;
  reach: number;
  createdAt: string;
}

const STATUS_CFG: Record<BroadcastStatus, { bg: string; color: string }> = {
  Draft: { bg: 'gray.100', color: 'gray.500' },
  Scheduled: { bg: '#FEFCBF', color: '#744210' },
  Sent: { bg: '#C6F6D5', color: '#276749' },
  Failed: { bg: '#FED7D7', color: '#9B2C2C' },
};

const SEED_BROADCASTS: Broadcast[] = [
  {
    id: '1',
    title: 'November Deals — Camry & CR-V',
    message:
      '🚗 *Big November Deals!*\n\nWe have two clean cars ready for immediate sale:\n\n1️⃣ *2021 Toyota Camry* — ₦16.5M\n2️⃣ *2020 Honda CR-V* — ₦21M\n\nBoth are Tokunbo, full option.\n\nCall/WhatsApp: 08012345678\n\n#CarDeals #NigeriaAutos',
    platforms: ['whatsapp', 'facebook'],
    recipients: ['1', '2', '3', '4', '5', '6', '7', '8'],
    status: 'Sent',
    sentAt: '2024-11-01T09:00:00Z',
    reach: 8,
    createdAt: '2024-11-01T08:00:00Z',
    listingRef: 'Toyota Camry + Honda CR-V',
  },
  {
    id: '2',
    title: 'New Arrival — 2022 Toyota Highlander',
    message:
      '🔥 *Just In!*\n\n2022 Toyota Highlander — ₦45M\n\nAlmost brand new. Only 12,000km.\n7-seater, full spec, push start.\n\nContact: 08012345678\n\n#Highlander #NewArrival',
    platforms: ['whatsapp', 'instagram'],
    recipients: ['2', '4', '8', '9'],
    status: 'Scheduled',
    scheduledAt: '2024-11-07T10:00:00Z',
    reach: 4,
    createdAt: '2024-11-06T14:00:00Z',
    listingRef: '2022 Toyota Highlander',
  },
  {
    id: '3',
    title: 'Weekend Price Drop Promo',
    message:
      "💰 *Price Drop This Weekend Only!*\n\nWe're slashing prices on select cars.\nVisit our showroom or call to find out more.\n\n📍 Lekki, Lagos\n📞 08012345678",
    platforms: ['whatsapp', 'facebook', 'instagram'],
    recipients: SEED_CONTACTS.map((c) => c.id),
    status: 'Draft',
    reach: 0,
    createdAt: '2024-11-06T10:00:00Z',
  },
];

const PLATFORM_CFG: Record<
  PlatformId,
  { name: string; color: string; short: string }
> = {
  whatsapp: { name: 'WhatsApp', color: WA, short: 'W' },
  facebook: { name: 'Facebook', color: FB, short: 'f' },
  instagram: { name: 'Instagram', color: IG, short: 'ig' },
};

// ─── BROADCAST CARD ───────────────────────────────────────────────────────────
interface BroadcastCardProps {
  b: Broadcast;
  contacts: Contact[];
  onDelete: () => void;
  onSend: () => void;
}
function BroadcastCard({
  b,
  contacts,
  onDelete,
  onSend,
}: BroadcastCardProps): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CFG[b.status];
  const recipientNames = contacts.filter((c) => b.recipients.includes(c.id));

  return (
    <Box
      bg={WHITE}
      borderRadius="14px"
      overflow="hidden"
      boxShadow="0 2px 10px rgba(0,0,0,0.06)"
      border="1px solid"
      borderColor="gray.100"
      _hover={{ boxShadow: '0 4px 18px rgba(108,99,255,0.1)' }}
      transition="all 0.18s"
    >
      <Flex
        align="center"
        justify="space-between"
        px="18px"
        py="14px"
        borderBottom="1px solid"
        borderColor="gray.50"
      >
        <Box flex="1" minW="0">
          <Flex align="center" gap="10px" mb="4px">
            <Text
              fontWeight="700"
              fontSize="14px"
              color="gray.800"
              lineClamp={1}
            >
              {b.title}
            </Text>
            <Badge
              bg={cfg.bg}
              color={cfg.color}
              borderRadius="6px"
              fontSize="10px"
              px="8px"
              py="1px"
              fontWeight="700"
              flexShrink="0"
            >
              {b.status}
            </Badge>
          </Flex>
          <HStack gap="8px" wrap="wrap">
            {b.platforms.map((pid) => (
              <HStack key={pid} gap="4px">
                <Box
                  w="14px"
                  h="14px"
                  borderRadius="4px"
                  bg={PLATFORM_CFG[pid].color}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="8px" color="white" fontWeight="900">
                    {PLATFORM_CFG[pid].short}
                  </Text>
                </Box>
                <Text fontSize="11px" color="gray.500">
                  {PLATFORM_CFG[pid].name}
                </Text>
              </HStack>
            ))}
            <Text fontSize="11px" color="gray.400">
              ·
            </Text>
            <Text fontSize="11px" color="gray.500">
              {b.recipients.length} recipients
            </Text>
            {b.sentAt && (
              <>
                <Text fontSize="11px" color="gray.400">
                  ·
                </Text>
                <Text fontSize="11px" color="gray.400">
                  Sent {new Date(b.sentAt).toLocaleDateString('en-NG')}
                </Text>
              </>
            )}
            {b.scheduledAt && b.status === 'Scheduled' && (
              <>
                <Text fontSize="11px" color="gray.400">
                  ·
                </Text>
                <Text fontSize="11px" color="#744210">
                  Scheduled{' '}
                  {new Date(b.scheduledAt).toLocaleDateString('en-NG')}
                </Text>
              </>
            )}
          </HStack>
        </Box>
        <HStack gap="8px" ml="16px">
          {b.status === 'Draft' && (
            <Button
              size="xs"
              bg={WA}
              color="white"
              borderRadius="7px"
              fontSize="11px"
              fontWeight="700"
              px="10px"
              h="28px"
              _hover={{ opacity: 0.85 }}
              onClick={onSend}
              gap="4px"
            >
              <SendIco /> Send Now
            </Button>
          )}
          <Box
            as="button"
            onClick={() => setExpanded((p) => !p)}
            px="10px"
            py="4px"
            borderRadius="7px"
            fontSize="11px"
            fontWeight="600"
            bg="gray.100"
            color="gray.500"
            _hover={{ bg: 'gray.200' }}
          >
            {expanded ? 'Hide' : 'Preview'}
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

      {expanded && (
        <Box px="18px" py="14px">
          <Grid templateColumns="1.6fr 1fr" gap="16px">
            {/* Message preview */}
            <Box>
              <Text
                fontSize="10px"
                fontWeight="700"
                color="gray.400"
                textTransform="uppercase"
                letterSpacing="0.4px"
                mb="8px"
              >
                Message Preview
              </Text>
              {/* WhatsApp bubble */}
              <Box
                bg="#ECF8EC"
                borderRadius="12px"
                borderTopLeftRadius="3px"
                p="12px"
                maxW="320px"
              >
                <Text
                  fontSize="12px"
                  color="gray.800"
                  lineHeight="1.7"
                  whiteSpace="pre-wrap"
                >
                  {b.message}
                </Text>
                <Text
                  fontSize="10px"
                  color="gray.400"
                  textAlign="right"
                  mt="6px"
                >
                  {b.sentAt
                    ? new Date(b.sentAt).toLocaleTimeString('en-NG', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '12:00 PM'}{' '}
                  ✓✓
                </Text>
              </Box>
            </Box>
            {/* Recipients */}
            <Box>
              <Text
                fontSize="10px"
                fontWeight="700"
                color="gray.400"
                textTransform="uppercase"
                letterSpacing="0.4px"
                mb="8px"
              >
                Recipients ({recipientNames.length})
              </Text>
              <VStack align="stretch" gap="6px" maxH="180px" overflow="auto">
                {recipientNames.map((c) => (
                  <HStack key={c.id} gap="8px">
                    <Avatar.Root size="xs">
                      <Avatar.Fallback>{c.name[0]}</Avatar.Fallback>
                    </Avatar.Root>
                    <Box>
                      <Text fontSize="12px" fontWeight="600" color="gray.700">
                        {c.name}
                      </Text>
                      <Text fontSize="10px" color="gray.400">
                        {c.phone}
                      </Text>
                    </Box>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

// ─── COMPOSE MODAL ────────────────────────────────────────────────────────────
interface ComposeModalProps {
  contacts: Contact[];
  onSave: (b: Omit<Broadcast, 'id' | 'createdAt' | 'reach'>) => void;
  onClose: () => void;
}
function ComposeModal({
  contacts,
  onSave,
  onClose,
}: ComposeModalProps): JSX.Element {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [platforms, setPlatforms] = useState<PlatformId[]>(['whatsapp']);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [listingRef, setListingRef] = useState('');
  const [scheduleMode, setScheduleMode] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');

  const toggleTag = (tag: string) => {
    const tagged = contacts
      .filter((c) => c.tags.includes(tag))
      .map((c) => c.id);
    if (selectedTags.includes(tag)) {
      setSelectedTags((p) => p.filter((t) => t !== tag));
      setSelectedContacts((p) => p.filter((id) => !tagged.includes(id)));
    } else {
      setSelectedTags((p) => [...p, tag]);
      setSelectedContacts((p) => Array.from(new Set([...p, ...tagged])));
    }
  };

  const toggleContact = (id: string) =>
    setSelectedContacts((p) =>
      p.includes(id) ? p.filter((i) => i !== id) : [...p, id],
    );

  const togglePlatform = (pid: PlatformId) =>
    setPlatforms((p) =>
      p.includes(pid) ? p.filter((x) => x !== pid) : [...p, pid],
    );

  const charCount = message.length;
  const waLimit = null; // WhatsApp has no hard limit
  const igLimit = 2200;

  const handleSave = (status: 'Draft' | 'Scheduled' | 'Sent') => {
    onSave({
      title,
      message,
      platforms,
      recipients: selectedContacts,
      status,
      scheduledAt: scheduleMode ? scheduleDate : undefined,
      sentAt: status === 'Sent' ? new Date().toISOString() : undefined,
      listingRef,
    });
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
  const labelStyle = {
    fontSize: '10px',
    fontWeight: '700',
    color: 'gray.400',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    mb: '6px',
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
        w="760px"
        maxW="96vw"
        maxH="92vh"
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
              Compose Broadcast
            </Text>
            <Text fontSize="12px" color="gray.400">
              Create a message to blast to your contacts
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

        <Box overflow="auto" flex="1">
          <Grid templateColumns="1.2fr 1fr" h="100%">
            {/* LEFT: Compose */}
            <Box p="22px" borderRight="1px solid" borderColor="gray.100">
              <VStack align="stretch" gap="16px">
                {/* Title */}
                <Box>
                  <Text {...labelStyle}>Broadcast Title</Text>
                  <Input
                    {...inputStyle}
                    value={title}
                    placeholder="e.g. November Deals — 2 Cars Available"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Box>

                {/* Car reference */}
                <Box>
                  <Text {...labelStyle}>Car Listing Reference (optional)</Text>
                  <Input
                    {...inputStyle}
                    value={listingRef}
                    placeholder="e.g. 2021 Toyota Camry"
                    onChange={(e) => setListingRef(e.target.value)}
                  />
                </Box>

                {/* Platforms */}
                <Box>
                  <Text {...labelStyle}>Post to</Text>
                  <HStack gap="8px">
                    {(
                      ['whatsapp', 'facebook', 'instagram'] as PlatformId[]
                    ).map((pid) => {
                      const cfg = PLATFORM_CFG[pid];
                      const active = platforms.includes(pid);
                      return (
                        <Box
                          key={pid}
                          as="button"
                          onClick={() => togglePlatform(pid)}
                          px="12px"
                          py="8px"
                          borderRadius="9px"
                          fontSize="12px"
                          fontWeight="700"
                          border="1.5px solid"
                          transition="all 0.15s"
                          gap="6px"
                          display="flex"
                          alignItems="center"
                          borderColor={active ? cfg.color : 'gray.200'}
                          bg={active ? `${cfg.color}15` : WHITE}
                          color={active ? cfg.color : 'gray.400'}
                        >
                          <Box
                            w="14px"
                            h="14px"
                            borderRadius="4px"
                            bg={active ? cfg.color : 'gray.300'}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text fontSize="8px" color="white" fontWeight="900">
                              {cfg.short}
                            </Text>
                          </Box>
                          {cfg.name}
                        </Box>
                      );
                    })}
                  </HStack>
                </Box>

                {/* Message */}
                <Box>
                  <Flex justify="space-between" mb="6px">
                    <Text {...labelStyle} mb="0">
                      Message
                    </Text>
                    <Text
                      fontSize="10px"
                      color={
                        charCount > (igLimit ?? Infinity) &&
                        platforms.includes('instagram')
                          ? 'red.400'
                          : 'gray.400'
                      }
                    >
                      {charCount} chars{' '}
                      {platforms.includes('instagram') &&
                        `/ ${igLimit} for Instagram`}
                    </Text>
                  </Flex>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={8}
                    fontSize="12px"
                    lineHeight="1.7"
                    borderRadius="10px"
                    bg="gray.50"
                    borderColor="gray.200"
                    resize="vertical"
                    placeholder={
                      '🚗 *Your Car Title*\n\n💰 Price: ₦XX,XXX,XXX\n📍 Location: Lagos\n\nCall/WhatsApp: 080XXXXXXXX\n\n#CarForSale #NigeriaAutos'
                    }
                    _focus={{
                      bg: 'white',
                      borderColor: P,
                      boxShadow: `0 0 0 1px ${P}`,
                    }}
                    fontFamily="'DM Sans', sans-serif"
                  />
                </Box>

                {/* WhatsApp format tip */}
                <Box bg="#E8F5E9" borderRadius="10px" p="10px 12px">
                  <Text
                    fontSize="11px"
                    fontWeight="700"
                    color="#2E7D32"
                    mb="3px"
                  >
                    💡 WhatsApp formatting
                  </Text>
                  <Text fontSize="11px" color="#2E7D32">
                    *bold* · _italic_ · ~strikethrough~ · ```monospace```
                  </Text>
                </Box>
              </VStack>
            </Box>

            {/* RIGHT: Recipients */}
            <Box p="22px" display="flex" flexDir="column" gap="14px">
              <Box>
                <Text {...labelStyle}>Filter by tag</Text>
                <Flex gap="6px" wrap="wrap">
                  {ALL_TAGS.map((tag) => (
                    <Box
                      key={tag}
                      as="button"
                      onClick={() => toggleTag(tag)}
                      px="8px"
                      py="4px"
                      borderRadius="7px"
                      fontSize="10px"
                      fontWeight="700"
                      border="1.5px solid"
                      transition="all 0.15s"
                      borderColor={selectedTags.includes(tag) ? P : 'gray.200'}
                      bg={selectedTags.includes(tag) ? P_LIGHT : WHITE}
                      color={selectedTags.includes(tag) ? P : 'gray.500'}
                    >
                      {tag}
                    </Box>
                  ))}
                </Flex>
              </Box>

              <Box>
                <Flex justify="space-between" align="center" mb="8px">
                  <Text {...labelStyle} mb="0">
                    Contacts ({selectedContacts.length} selected)
                  </Text>
                  <Box
                    as="button"
                    onClick={() => {
                      if (selectedContacts.length === contacts.length)
                        setSelectedContacts([]);
                      else setSelectedContacts(contacts.map((c) => c.id));
                    }}
                    fontSize="11px"
                    color={P}
                    fontWeight="600"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {selectedContacts.length === contacts.length
                      ? 'Deselect all'
                      : 'Select all'}
                  </Box>
                </Flex>

                <VStack align="stretch" gap="4px" maxH="260px" overflow="auto">
                  {contacts.map((c) => {
                    const isSelected = selectedContacts.includes(c.id);
                    return (
                      <HStack
                        key={c.id}
                        px="10px"
                        py="8px"
                        borderRadius="9px"
                        bg={isSelected ? P_LIGHT : 'gray.50'}
                        cursor="pointer"
                        onClick={() => toggleContact(c.id)}
                        border="1.5px solid"
                        borderColor={isSelected ? `${P}44` : 'transparent'}
                        transition="all 0.12s"
                        gap="10px"
                      >
                        <Box
                          w="18px"
                          h="18px"
                          borderRadius="5px"
                          flexShrink="0"
                          border="1.5px solid"
                          borderColor={isSelected ? P : 'gray.300'}
                          bg={isSelected ? P : WHITE}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          transition="all 0.12s"
                        >
                          {isSelected && <CheckIco />}
                        </Box>
                        <Avatar.Root size="xs" flexShrink="0">
                          <Avatar.Fallback>{c.name[0]}</Avatar.Fallback>
                        </Avatar.Root>
                        <Box flex="1" minW="0">
                          <Text
                            fontSize="12px"
                            fontWeight="600"
                            color="gray.800"
                            lineClamp={1}
                          >
                            {c.name}
                          </Text>
                          <Text fontSize="10px" color="gray.400">
                            {c.phone}
                          </Text>
                        </Box>
                      </HStack>
                    );
                  })}
                </VStack>
              </Box>

              {/* Preview counter */}
              <Box bg="gray.50" borderRadius="10px" p="12px">
                <HStack justify="space-between">
                  <Text fontSize="12px" color="gray.600">
                    Messages to send
                  </Text>
                  <Text fontSize="16px" fontWeight="800" color={P}>
                    {selectedContacts.length * platforms.length}
                  </Text>
                </HStack>
                <Text fontSize="11px" color="gray.400" mt="2px">
                  {selectedContacts.length} contacts × {platforms.length}{' '}
                  platform{platforms.length > 1 ? 's' : ''}
                </Text>
              </Box>
            </Box>
          </Grid>
        </Box>

        {/* Footer */}
        <Flex
          align="center"
          justify="space-between"
          px="24px"
          py="16px"
          borderTop="1px solid"
          borderColor="gray.100"
          bg="gray.50"
          flexShrink="0"
        >
          <HStack gap="8px">
            <Box
              as="button"
              onClick={() => setScheduleMode((p) => !p)}
              px="12px"
              py="8px"
              borderRadius="9px"
              fontSize="12px"
              fontWeight="600"
              border="1.5px solid"
              transition="all 0.15s"
              display="flex"
              alignItems="center"
              gap="6px"
              borderColor={scheduleMode ? '#744210' : 'gray.200'}
              bg={scheduleMode ? '#FEFCBF' : WHITE}
              color={scheduleMode ? '#744210' : 'gray.500'}
            >
              <ScheduleIco /> Schedule
            </Box>
            {scheduleMode && (
              <Input
                type="datetime-local"
                size="sm"
                borderRadius="9px"
                borderColor="gray.200"
                bg={WHITE}
                fontSize="12px"
                h="36px"
                w="200px"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                _focus={{ borderColor: P, boxShadow: `0 0 0 1px ${P}` }}
              />
            )}
          </HStack>
          <HStack gap="10px">
            <Button
              variant="ghost"
              fontSize="13px"
              color="gray.500"
              borderRadius="10px"
              h="40px"
              _hover={{ bg: 'gray.100' }}
              onClick={() => handleSave('Draft')}
            >
              Save Draft
            </Button>
            <Button
              bg={WA}
              color="white"
              fontSize="13px"
              fontWeight="700"
              borderRadius="10px"
              h="40px"
              px="20px"
              gap="8px"
              _hover={{ opacity: 0.85 }}
              disabled={!message || !title || selectedContacts.length === 0}
              onClick={() => handleSave(scheduleMode ? 'Scheduled' : 'Sent')}
              boxShadow={`0 4px 14px ${WA}44`}
            >
              <SendIco />
              {scheduleMode
                ? 'Schedule Broadcast'
                : `Send to ${selectedContacts.length} contacts`}
            </Button>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Broadcast(): JSX.Element {
  const [contacts] = useState<Contact[]>(SEED_CONTACTS);
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>(SEED_BROADCASTS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<BroadcastStatus | 'All'>(
    'All',
  );
  const [composing, setComposing] = useState(false);

  const filtered = broadcasts.filter((b) => {
    const matchSearch =
      !search || b.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleSave = (data: Omit<Broadcast, 'id' | 'createdAt' | 'reach'>) => {
    setBroadcasts((p) => [
      {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        reach: data.status === 'Sent' ? data.recipients.length : 0,
      },
      ...p,
    ]);
    setComposing(false);
  };

  const handleSend = (id: string) => {
    setBroadcasts((p) =>
      p.map((b) =>
        b.id === id
          ? {
              ...b,
              status: 'Sent' as BroadcastStatus,
              sentAt: new Date().toISOString(),
              reach: b.recipients.length,
            }
          : b,
      ),
    );
  };

  const totalReach = broadcasts
    .filter((b) => b.status === 'Sent')
    .reduce((a, b) => a + b.reach, 0);
  const sentCount = broadcasts.filter((b) => b.status === 'Sent').length;
  const draftCount = broadcasts.filter((b) => b.status === 'Draft').length;
  const schedCount = broadcasts.filter((b) => b.status === 'Scheduled').length;

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
            Drivia / Broadcast
          </Text>
          <Heading fontSize="22px" fontWeight="800" color="gray.800" mt="1px">
            Broadcast Manager
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
              placeholder="Search broadcasts…"
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
        {/* STAT CARDS */}
        <Grid templateColumns="repeat(4,1fr)" gap="14px" mb="24px">
          {[
            {
              label: 'Total Contacts',
              value: contacts.length,
              color: P,
              icon: '👥',
            },
            { label: 'Sent', value: sentCount, color: '#276749', icon: '✅' },
            {
              label: 'Scheduled',
              value: schedCount,
              color: '#744210',
              icon: '⏰',
            },
            {
              label: 'Total Reach',
              value: totalReach,
              color: '#2C7A7B',
              icon: '📡',
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

        {/* TOOLBAR */}
        <Flex justify="space-between" align="center" mb="16px">
          <HStack gap="6px">
            {(['All', 'Draft', 'Scheduled', 'Sent', 'Failed'] as const).map(
              (f) => (
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
                  {f}
                </Button>
              ),
            )}
          </HStack>
          <Button
            bg={WA}
            color="white"
            borderRadius="10px"
            fontSize="13px"
            fontWeight="700"
            h="36px"
            px="16px"
            gap="6px"
            _hover={{ opacity: 0.85 }}
            boxShadow={`0 4px 12px ${WA}44`}
            onClick={() => setComposing(true)}
          >
            <PlusIco /> New Broadcast
          </Button>
        </Flex>

        {/* BROADCASTS LIST */}
        <VStack gap="10px" align="stretch">
          {filtered.length === 0 ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              py="64px"
              gap="12px"
            >
              <Text fontSize="32px">📡</Text>
              <Text fontWeight="700" fontSize="16px" color="gray.600">
                No broadcasts yet
              </Text>
              <Text fontSize="13px" color="gray.400">
                Create your first broadcast to reach your customers
              </Text>
              <Button
                bg={P}
                color="white"
                borderRadius="10px"
                fontSize="13px"
                fontWeight="700"
                h="38px"
                px="20px"
                gap="6px"
                _hover={{ bg: P_DARK }}
                onClick={() => setComposing(true)}
              >
                <PlusIco /> Compose Now
              </Button>
            </Flex>
          ) : (
            filtered.map((b) => (
              <BroadcastCard
                key={b.id}
                b={b}
                contacts={contacts}
                onDelete={() =>
                  setBroadcasts((p) => p.filter((x) => x.id !== b.id))
                }
                onSend={() => handleSend(b.id)}
              />
            ))
          )}
        </VStack>

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
            {contacts.length} contacts · {sentCount} broadcasts sent ·{' '}
            {totalReach} total reach
          </Text>
          <Text fontSize="11px" color="gray.400">
            Drivia Dealer Tool © 2024
          </Text>
        </Flex>
      </Box>

      {composing && (
        <ComposeModal
          contacts={contacts}
          onSave={handleSave}
          onClose={() => setComposing(false)}
        />
      )}
    </AppLayout>
  );
}

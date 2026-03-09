'use client';

import { ChangeEvent, useState } from 'react';
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
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
  createListCollection,
} from '@chakra-ui/react';
import type { Lead, LeadStatus, LeadSource, CarListing } from '../shared/types';
import AppLayout from '../components/template/general-layout';

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
const PhoneIco = () => (
  <Ico
    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.14-1.14a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
    size={14}
  />
);
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

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const PIPELINE: LeadStatus[] = [
  'New',
  'Contacted',
  'Test Drive',
  'Negotiating',
  'Sold',
  'Lost',
];

const STATUS_CFG: Record<
  LeadStatus,
  { bg: string; color: string; border: string }
> = {
  New: { bg: '#EEF0FF', color: P, border: P },
  Contacted: { bg: '#E6FFFA', color: '#2C7A7B', border: '#2C7A7B' },
  'Test Drive': { bg: '#FEFCBF', color: '#744210', border: '#D69E2E' },
  Negotiating: { bg: '#FEEBC8', color: '#C05621', border: '#ED8936' },
  Sold: { bg: '#C6F6D5', color: '#276749', border: '#38A169' },
  Lost: { bg: '#FED7D7', color: '#9B2C2C', border: '#E53E3E' },
};

const SOURCE_CFG: Record<LeadSource, { bg: string; label: string }> = {
  WhatsApp: { bg: '#25D366', label: 'W' },
  Facebook: { bg: '#1877F2', label: 'f' },
  Instagram: { bg: '#E1306C', label: 'ig' },
  'Walk-in': { bg: '#718096', label: '🚶' },
  Referral: { bg: '#805AD5', label: '👥' },
  Phone: { bg: '#DD6B20', label: '📞' },
};

const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`;
const timeAgo = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor(diff / 60000);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  return `${m}m ago`;
};

// ─── SEED DATA ────────────────────────────────────────────────────────────────
const SEED_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Chidi Okafor',
    phone: '08023456789',
    avatar: 'https://i.pravatar.cc/40?img=11',
    source: 'WhatsApp',
    status: 'New',
    listingId: '1',
    budget: 17000000,
    notes: 'Interested in Camry. Wants test drive next weekend.',
    createdAt: '2024-11-06T09:00:00Z',
    updatedAt: '2024-11-06T09:00:00Z',
  },
  {
    id: '2',
    name: 'Fatima Abdullahi',
    phone: '07011234567',
    avatar: 'https://i.pravatar.cc/40?img=21',
    source: 'Facebook',
    status: 'Contacted',
    listingId: '2',
    budget: 22000000,
    notes: 'Looking for SUV. Liked the CR-V but wants to negotiate.',
    createdAt: '2024-11-05T14:30:00Z',
    updatedAt: '2024-11-05T16:00:00Z',
  },
  {
    id: '3',
    name: 'Emeka Nwosu',
    phone: '09087654321',
    avatar: 'https://i.pravatar.cc/40?img=15',
    source: 'Instagram',
    status: 'Test Drive',
    listingId: '3',
    budget: 36000000,
    notes: 'Came for C300 test drive. Very interested.',
    createdAt: '2024-11-04T10:00:00Z',
    updatedAt: '2024-11-05T11:00:00Z',
  },
  {
    id: '4',
    name: 'Ngozi Adeyemi',
    phone: '08134567890',
    avatar: 'https://i.pravatar.cc/40?img=31',
    source: 'Referral',
    status: 'Negotiating',
    listingId: '5',
    budget: 44000000,
    notes: 'Referred by Emeka. Wants the Highlander. Offering ₦43M.',
    createdAt: '2024-11-03T08:00:00Z',
    updatedAt: '2024-11-05T09:30:00Z',
  },
  {
    id: '5',
    name: 'Biodun Fashola',
    phone: '08056789012',
    avatar: 'https://i.pravatar.cc/40?img=25',
    source: 'Walk-in',
    status: 'Sold',
    listingId: '4',
    budget: 28000000,
    notes: 'Bought the Lexus RX350. Paid full price. Happy customer!',
    createdAt: '2024-10-28T12:00:00Z',
    updatedAt: '2024-10-30T15:00:00Z',
  },
  {
    id: '6',
    name: 'Amara Obi',
    phone: '07098765432',
    avatar: 'https://i.pravatar.cc/40?img=35',
    source: 'WhatsApp',
    status: 'Lost',
    listingId: '1',
    budget: 14000000,
    notes: "Budget too low. Couldn't meet price.",
    createdAt: '2024-10-25T10:00:00Z',
    updatedAt: '2024-10-26T10:00:00Z',
  },
  {
    id: '7',
    name: 'Tunde Bakare',
    phone: '08145678901',
    avatar: 'https://i.pravatar.cc/40?img=12',
    source: 'Facebook',
    status: 'New',
    listingId: '6',
    budget: 19000000,
    notes: 'Asking about Ford Ranger. Needs diesel.',
    createdAt: '2024-11-06T07:30:00Z',
    updatedAt: '2024-11-06T07:30:00Z',
  },
  {
    id: '8',
    name: 'Kemi Adeleke',
    phone: '07023456789',
    avatar: 'https://i.pravatar.cc/40?img=44',
    source: 'Phone',
    status: 'Contacted',
    listingId: '2',
    budget: 20000000,
    notes: 'Called about CR-V. Scheduled a viewing.',
    createdAt: '2024-11-05T11:00:00Z',
    updatedAt: '2024-11-05T12:00:00Z',
  },
];

const LISTINGS_MAP: Record<string, string> = {
  '1': '2021 Toyota Camry',
  '2': '2020 Honda CR-V',
  '3': '2019 Mercedes C300',
  '4': '2018 Lexus RX350',
  '5': '2022 Toyota Highlander',
  '6': '2020 Ford Ranger',
};

// ─── BLANK LEAD ───────────────────────────────────────────────────────────────
const BLANK_LEAD: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '',
  phone: '',
  source: 'WhatsApp',
  status: 'New',
  listingId: '1',
  budget: 0,
  notes: '',
};

// ─── LEAD CARD (Kanban) ───────────────────────────────────────────────────────
interface LeadCardProps {
  lead: Lead;
  onEdit: () => void;
  onDelete: () => void;
  onMove: (s: LeadStatus) => void;
}

function LeadCard({
  lead,
  onEdit,
  onDelete,
  onMove,
}: LeadCardProps): JSX.Element {
  const src = SOURCE_CFG[lead.source];
  return (
    <Box
      bg={WHITE}
      borderRadius="12px"
      p="14px"
      boxShadow="0 2px 8px rgba(0,0,0,0.06)"
      border="1px solid"
      borderColor="gray.100"
      _hover={{
        boxShadow: '0 4px 16px rgba(108,99,255,0.12)',
        borderColor: `${P}33`,
      }}
      transition="all 0.18s"
    >
      <Flex justify="space-between" align="flex-start" mb="10px">
        <HStack gap="8px">
          <Avatar.Root size="sm">
            <Avatar.Image src={lead.avatar} />
            <Avatar.Fallback>{lead.name[0]}</Avatar.Fallback>
          </Avatar.Root>
          <Box>
            <Text fontWeight="700" fontSize="13px" color="gray.800">
              {lead.name}
            </Text>
            <Text fontSize="11px" color="gray.400">
              {timeAgo(lead.createdAt)}
            </Text>
          </Box>
        </HStack>
        <Box
          w="22px"
          h="22px"
          borderRadius="6px"
          bg={src.bg}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink="0"
        >
          <Text fontSize="9px" color="white" fontWeight="900">
            {src.label}
          </Text>
        </Box>
      </Flex>

      <Text
        fontSize="12px"
        color="gray.600"
        mb="6px"
        lineClamp={2}
        lineHeight="1.5"
      >
        {lead.notes || 'No notes added'}
      </Text>

      <HStack justify="space-between" mb="10px">
        <Text fontSize="12px" fontWeight="700" color={P}>
          {fmt(lead.budget)}
        </Text>
        <Text fontSize="11px" color="gray.400" lineClamp={1} maxW="120px">
          {LISTINGS_MAP[lead.listingId] ?? lead.listingId}
        </Text>
      </HStack>

      {/* Move status */}
      <Box mb="10px">
        <Text fontSize="10px" color="gray.400" mb="5px" fontWeight="600">
          Move to
        </Text>
        <Flex gap="4px" wrap="wrap">
          {PIPELINE.filter((s) => s !== lead.status).map((s) => {
            const cfg = STATUS_CFG[s];
            return (
              <Box
                key={s}
                as="button"
                onClick={() => onMove(s)}
                px="7px"
                py="3px"
                borderRadius="5px"
                fontSize="9px"
                fontWeight="700"
                bg={cfg.bg}
                color={cfg.color}
                border="1px solid"
                borderColor={cfg.border}
                _hover={{ opacity: 0.8 }}
                transition="opacity 0.1s"
              >
                → {s}
              </Box>
            );
          })}
        </Flex>
      </Box>

      <Flex justify="space-between" align="center">
        <HStack gap="4px">
          <Link
            href={`tel:${lead.phone}`}
            w="26px"
            h="26px"
            borderRadius="7px"
            bg="#E6FFFA"
            color="#2C7A7B"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{ bg: '#B2F5EA' }}
            transition="all 0.15s"
            title="Call"
          >
            <PhoneIco />
          </Link>
          <Link
            href={`https://wa.me/234${lead.phone.slice(1)}`}
            target="_blank"
            w="26px"
            h="26px"
            borderRadius="7px"
            bg="#F0FFF4"
            color="#276749"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{ bg: '#C6F6D5' }}
            transition="all 0.15s"
            title="WhatsApp"
          >
            <Text fontSize="11px">W</Text>
          </Link>
        </HStack>
        <HStack gap="4px">
          <Box
            as="button"
            onClick={onEdit}
            w="26px"
            h="26px"
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
            w="26px"
            h="26px"
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
    </Box>
  );
}

// ─── FORM MODAL ───────────────────────────────────────────────────────────────
interface LeadFormProps {
  mode: 'add' | 'edit';
  lead: Lead;
  onSave: (l: Lead) => void;
  onClose: () => void;
}
function LeadForm({ mode, lead, onSave, onClose }: LeadFormProps): JSX.Element {
  const [form, setForm] = useState<Lead>(lead);
  const set = (k: keyof Lead, v: unknown) => setForm((p) => ({ ...p, [k]: v }));
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
  };

  const listings = createListCollection<ListingItem>({
    items: Object.entries(LISTINGS_MAP).map(([id, name]) => ({
      value: id,
      label: name,
    })),
  });

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
        w="520px"
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
            {mode === 'add' ? 'Add New Lead' : `Edit — ${form.name}`}
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
          <Grid templateColumns="1fr 1fr" gap="16px">
            <Box>
              <Text {...labelStyle}>Full Name</Text>
              <Input
                {...inputStyle}
                value={form.name}
                placeholder="e.g. Chidi Okafor"
                onChange={(e) => set('name', e.target.value)}
              />
            </Box>
            <Box>
              <Text {...labelStyle}>Phone Number</Text>
              <Input
                {...inputStyle}
                value={form.phone}
                placeholder="080XXXXXXXX"
                onChange={(e) => set('phone', e.target.value)}
              />
            </Box>
            <Box>
              <Text {...labelStyle}>Budget (₦)</Text>
              <Input
                {...inputStyle}
                type="number"
                value={form.budget}
                onChange={(e) => set('budget', Number(e.target.value))}
              />
            </Box>
            <Box>
              <Text {...labelStyle}>Interested In</Text>
              <SelectRoot
                collection={listings}
                value={[form.listingId]}
                onValueChange={(e) => set('listingId', e.value[0])}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Select listing" />
                </SelectTrigger>
                <SelectContent>
                  {listings.items.map((item: ListingItem) => (
                    <SelectItem key={item.value} item={item}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Box>
            <Box>
              <Text {...labelStyle}>Source</Text>
              <Flex gap="6px" wrap="wrap">
                {(
                  [
                    'WhatsApp',
                    'Facebook',
                    'Instagram',
                    'Walk-in',
                    'Referral',
                    'Phone',
                  ] as LeadSource[]
                ).map((s) => (
                  <Box
                    key={s}
                    as="button"
                    onClick={() => set('source', s)}
                    px="8px"
                    py="5px"
                    borderRadius="7px"
                    fontSize="10px"
                    fontWeight="700"
                    border="1.5px solid"
                    transition="all 0.15s"
                    borderColor={
                      form.source === s ? SOURCE_CFG[s].bg : 'gray.200'
                    }
                    bg={form.source === s ? `${SOURCE_CFG[s].bg}20` : WHITE}
                    color={form.source === s ? SOURCE_CFG[s].bg : 'gray.500'}
                  >
                    {s}
                  </Box>
                ))}
              </Flex>
            </Box>
            <Box>
              <Text {...labelStyle}>Status</Text>
              <Flex gap="5px" wrap="wrap">
                {PIPELINE.map((s) => {
                  const cfg = STATUS_CFG[s];
                  return (
                    <Box
                      key={s}
                      as="button"
                      onClick={() => set('status', s)}
                      px="8px"
                      py="5px"
                      borderRadius="7px"
                      fontSize="10px"
                      fontWeight="700"
                      border="1.5px solid"
                      transition="all 0.15s"
                      borderColor={form.status === s ? cfg.border : 'gray.200'}
                      bg={form.status === s ? cfg.bg : WHITE}
                      color={form.status === s ? cfg.color : 'gray.500'}
                    >
                      {s}
                    </Box>
                  );
                })}
              </Flex>
            </Box>
          </Grid>
          <Box mt="16px">
            <Text {...labelStyle}>Notes</Text>
            <Textarea
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              rows={3}
              fontSize="13px"
              borderRadius="10px"
              bg="gray.50"
              borderColor="gray.200"
              placeholder="Notes about this lead…"
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
            {mode === 'add' ? 'Add Lead' : 'Save Changes'}
          </Button>
        </Flex>
      </Box>
    </>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

type ListingItem = { value: string; label: string };

export default function Leads(): JSX.Element {
  const [leads, setLeads] = useState<Lead[]>(SEED_LEADS);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Lead | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);

  const filtered = search
    ? leads.filter((l) =>
        `${l.name} ${l.phone} ${l.notes}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      )
    : leads;

  const byStatus = (s: LeadStatus) => filtered.filter((l) => l.status === s);

  const handleSave = (lead: Lead) => {
    const now = new Date().toISOString();
    if (modalMode === 'add') {
      setLeads((p) => [
        ...p,
        { ...lead, id: Date.now().toString(), createdAt: now, updatedAt: now },
      ]);
    } else {
      setLeads((p) =>
        p.map((l) => (l.id === lead.id ? { ...lead, updatedAt: now } : l)),
      );
    }
    setModalMode(null);
    setSelected(null);
  };

  const handleMove = (id: string, status: LeadStatus) => {
    setLeads((p) =>
      p.map((l) =>
        l.id === id ? { ...l, status, updatedAt: new Date().toISOString() } : l,
      ),
    );
  };

  const handleDelete = (id: string) =>
    setLeads((p) => p.filter((l) => l.id !== id));

  // Pipeline stats
  const newCount = leads.filter((l) => l.status === 'New').length;
  const soldCount = leads.filter((l) => l.status === 'Sold').length;
  const totalValue = leads
    .filter((l) => l.status === 'Sold')
    .reduce((a, l) => a + l.budget, 0);
  const convRate = leads.length
    ? Math.round((soldCount / leads.length) * 100)
    : 0;

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
            Drivia / Leads
          </Text>
          <Heading fontSize="22px" fontWeight="800" color="gray.800" mt="1px">
            Leads & Enquiries
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
              placeholder="Search leads…"
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
            { label: 'Total Leads', value: leads.length, color: P, icon: '👥' },
            {
              label: 'New Today',
              value: newCount,
              color: '#2C7A7B',
              icon: '🔔',
            },
            {
              label: 'Converted',
              value: soldCount,
              color: '#276749',
              icon: '🏁',
            },
            {
              label: 'Conv. Rate',
              value: `${convRate}%`,
              color: '#805AD5',
              icon: '📈',
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
        <Flex justify="space-between" align="center" mb="20px">
          <Text fontWeight="700" fontSize="15px" color="gray.700">
            Pipeline — {filtered.length} lead{filtered.length !== 1 ? 's' : ''}
          </Text>
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
              setSelected({
                ...BLANK_LEAD,
                id: '',
                createdAt: '',
                updatedAt: '',
              } as Lead);
              setModalMode('add');
            }}
          >
            <PlusIco /> Add Lead
          </Button>
        </Flex>

        {/* KANBAN BOARD */}
        <Box overflowX="auto" pb="8px">
          <Flex gap="14px" minW="max-content">
            {PIPELINE.map((stage) => {
              const cols = byStatus(stage);
              const cfg = STATUS_CFG[stage];
              return (
                <Box key={stage} w="240px" flexShrink="0">
                  {/* Column header */}
                  <Flex align="center" justify="space-between" mb="10px">
                    <HStack gap="8px">
                      <Box
                        w="8px"
                        h="8px"
                        borderRadius="full"
                        bg={cfg.border}
                      />
                      <Text fontWeight="700" fontSize="13px" color="gray.700">
                        {stage}
                      </Text>
                    </HStack>
                    <Badge
                      bg={cfg.bg}
                      color={cfg.color}
                      borderRadius="6px"
                      fontSize="10px"
                      px="7px"
                      py="1px"
                      fontWeight="700"
                    >
                      {cols.length}
                    </Badge>
                  </Flex>

                  {/* Cards */}
                  <VStack gap="8px" align="stretch" minH="80px">
                    {cols.map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        onEdit={() => {
                          setSelected(lead);
                          setModalMode('edit');
                        }}
                        onDelete={() => handleDelete(lead.id)}
                        onMove={(s) => handleMove(lead.id, s)}
                      />
                    ))}
                    {cols.length === 0 && (
                      <Box
                        border="2px dashed"
                        borderColor="gray.200"
                        borderRadius="12px"
                        py="20px"
                        textAlign="center"
                      >
                        <Text fontSize="11px" color="gray.300">
                          No leads
                        </Text>
                      </Box>
                    )}
                  </VStack>
                </Box>
              );
            })}
          </Flex>
        </Box>

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
            {soldCount} sold · Total revenue {fmt(totalValue)}
          </Text>
          <Text fontSize="11px" color="gray.400">
            Drivia Dealer Tool © 2024
          </Text>
        </Flex>
      </Box>

      {/* MODAL */}
      {modalMode && selected && (
        <LeadForm
          mode={modalMode}
          lead={selected}
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

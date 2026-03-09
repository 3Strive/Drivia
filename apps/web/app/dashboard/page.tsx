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
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import AppLayout from '../components/template/general-layout';
import ShareModalDemo from '../components/molecules/share-modal';

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
const UpIco = () => (
  <Ico d="M12 19V5M5 12l7-7 7 7" size={11} sw={2.5} stroke={GREEN} />
);
const DnIco = () => (
  <Ico d="M12 5v14M5 12l7 7 7-7" size={11} sw={2.5} stroke="#E53E3E" />
);
const DotIco = () => (
  <Ico
    d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
    fill="currentColor"
    size={16}
  />
);

const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`;
const fmtShort = (n: number) =>
  n >= 1_000_000
    ? `₦${(n / 1_000_000).toFixed(1)}M`
    : `₦${(n / 1000).toFixed(0)}K`;

// ─── CHART DATA ───────────────────────────────────────────────────────────────
const revenueData = [
  { x: 'Jun', v: 38000000 },
  { x: 'Jul', v: 52000000 },
  { x: 'Aug', v: 41000000 },
  { x: 'Sep', v: 67000000 },
  { x: 'Oct', v: 85000000 },
  { x: 'Nov', v: 63000000 },
];

const platformEnquiries = [
  { x: 'WhatsApp', a: 42, b: 18 },
  { x: 'Facebook', a: 28, b: 9 },
  { x: 'Instagram', a: 21, b: 6 },
  { x: 'Walk-in', a: 14, b: 7 },
];

const dailyViews = [
  { x: 'M', v: 48 },
  { x: 'T', v: 72 },
  { x: 'W', v: 61 },
  { x: 'T', v: 95 },
  { x: 'F', v: 44 },
  { x: 'S', v: 68 },
  { x: 'S', v: 39 },
];

const pieData = [
  { name: 'WhatsApp', value: 43, color: WA },
  { name: 'Facebook', value: 27, color: '#1877F2' },
  { name: 'Instagram', value: 21, color: '#E1306C' },
  { name: 'Other', value: 9, color: '#CBD5E0' },
];

// ─── RECENT LEADS ─────────────────────────────────────────────────────────────
const recentLeads = [
  {
    name: 'Chidi Okafor',
    car: '2021 Toyota Camry',
    budget: '₦17M',
    source: 'WhatsApp',
    status: 'New',
    avatar: 'https://i.pravatar.cc/32?img=11',
    time: '2m ago',
  },
  {
    name: 'Fatima Abdullahi',
    car: '2020 Honda CR-V',
    budget: '₦22M',
    source: 'Facebook',
    status: 'Contacted',
    avatar: 'https://i.pravatar.cc/32?img=21',
    time: '15m ago',
  },
  {
    name: 'Emeka Nwosu',
    car: '2019 Mercedes C300',
    budget: '₦36M',
    source: 'Instagram',
    status: 'Test Drive',
    avatar: 'https://i.pravatar.cc/32?img=15',
    time: '1h ago',
  },
  {
    name: 'Ngozi Adeyemi',
    car: '2022 Toyota Highlander',
    budget: '₦44M',
    source: 'Referral',
    status: 'Negotiating',
    avatar: 'https://i.pravatar.cc/32?img=31',
    time: '3h ago',
  },
  {
    name: 'Biodun Fashola',
    car: '2018 Lexus RX350',
    budget: '₦28M',
    source: 'Walk-in',
    status: 'Sold',
    avatar: 'https://i.pravatar.cc/32?img=25',
    time: '1d ago',
  },
];

const LEAD_STATUS_CFG: Record<string, { bg: string; color: string }> = {
  New: { bg: '#EEF0FF', color: P },
  Contacted: { bg: '#E6FFFA', color: '#2C7A7B' },
  'Test Drive': { bg: '#FEFCBF', color: '#744210' },
  Negotiating: { bg: '#FEEBC8', color: '#C05621' },
  Sold: { bg: '#C6F6D5', color: '#276749' },
  Lost: { bg: '#FED7D7', color: '#9B2C2C' },
};

// ─── STOCK ITEMS ──────────────────────────────────────────────────────────────
const stockAlerts = [
  {
    car: '2021 Toyota Camry',
    daysListed: 3,
    price: '₦16.5M',
    status: 'Available',
    hot: true,
  },
  {
    car: '2022 Toyota Highlander',
    daysListed: 1,
    price: '₦45M',
    status: 'Available',
    hot: true,
  },
  {
    car: '2018 Lexus RX350',
    daysListed: 40,
    price: '₦28M',
    status: 'Available',
    hot: false,
  },
  {
    car: '2020 Ford Ranger',
    daysListed: 22,
    price: '₦18.5M',
    status: 'Available',
    hot: false,
  },
];

// ─── KPI STAT CARD ────────────────────────────────────────────────────────────
function KpiCard({
  icon,
  label,
  value,
  change,
  up,
  color = P,
}: {
  icon: string;
  label: string;
  value: string;
  change: string;
  up: boolean;
  color?: string;
}): JSX.Element {
  return (
    <Box
      bg={WHITE}
      borderRadius="14px"
      p="18px 20px"
      boxShadow="0 2px 10px rgba(0,0,0,0.05)"
    >
      <HStack justify="space-between" mb="10px">
        <Box
          w="38px"
          h="38px"
          borderRadius="11px"
          bg={`${color}18`}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="18px"
        >
          {icon}
        </Box>
        <HStack
          gap="3px"
          bg={up ? '#F0FFF4' : '#FFF5F5'}
          px="7px"
          py="2px"
          borderRadius="6px"
        >
          {up ? <UpIco /> : <DnIco />}
          <Text fontSize="10px" fontWeight="700" color={up ? GREEN : '#E53E3E'}>
            {change}
          </Text>
        </HStack>
      </HStack>
      <Text fontSize="23px" fontWeight="900" color="gray.800" lineHeight="1.1">
        {value}
      </Text>
      <Text fontSize="11px" color="gray.400" mt="3px">
        {label}
      </Text>
    </Box>
  );
}

// ─── CUSTOM TOOLTIP ───────────────────────────────────────────────────────────
const RevTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}): JSX.Element | null => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      bg={WHITE}
      borderRadius="10px"
      p="10px 14px"
      boxShadow="0 4px 20px rgba(0,0,0,0.12)"
      border="1px solid"
      borderColor="gray.100"
    >
      <Text fontSize="11px" color="gray.400" mb="3px">
        {label}
      </Text>
      <Text fontSize="15px" fontWeight="800" color={P}>
        {fmtShort(payload[0].value)}
      </Text>
    </Box>
  );
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function MainDashboard(): JSX.Element {
  const [tasks, setTasks] = useState([
    { label: 'Follow up with Chidi (Camry)', done: false },
    { label: 'Schedule test drive — Emeka', done: true },
    { label: 'Post Highlander on Instagram', done: false },
    { label: 'Send invoice — Biodun Fashola', done: true },
    { label: 'Update price on Ford Ranger', done: false },
    { label: 'Reply 6 WhatsApp enquiries', done: false },
  ]);

  const calDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const calRows: (number | null)[][] = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, null, null],
  ];
  const highlighted = [6, 7, 13, 20, 27];

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
            Drivia / Dashboard
          </Text>
          <Heading fontSize="22px" fontWeight="800" color="gray.800" mt="1px">
            Good morning, Dealer 👋
          </Heading>
        </Box>
        <HStack gap="10px">
          <Box position="relative" w="230px">
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

      <Box p="24px">
        {/* KPI ROW */}
        <Grid templateColumns="repeat(5,1fr)" gap="14px" mb="20px">
          <KpiCard
            icon="💰"
            label="Revenue This Month"
            value="₦63M"
            change="+18%"
            up={true}
            color={P}
          />
          <KpiCard
            icon="🚗"
            label="Cars Sold This Month"
            value="3"
            change="+1"
            up={true}
            color={GREEN}
          />
          <KpiCard
            icon="👥"
            label="Active Leads"
            value="8"
            change="+3"
            up={true}
            color="#2C7A7B"
          />
          <KpiCard
            icon="📦"
            label="Cars in Stock"
            value="6"
            change="-2"
            up={false}
            color="#C05621"
          />
          <KpiCard
            icon="📡"
            label="Total Enquiries"
            value="42"
            change="+12"
            up={true}
            color="#805AD5"
          />
        </Grid>

        {/* ROW 2: Revenue chart + Platform bar */}
        <Grid templateColumns="1.6fr 1fr" gap="16px" mb="16px">
          {/* Revenue over time */}
          <Box
            bg={WHITE}
            borderRadius="16px"
            p="20px"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <ShareModalDemo />
            <Flex justify="space-between" align="center" mb="16px">
              <Box>
                <Text fontWeight="800" fontSize="15px" color="gray.800">
                  Revenue Trend
                </Text>
                <Text fontSize="12px" color="gray.400">
                  Last 6 months
                </Text>
              </Box>
              <HStack gap="4px">
                <Box color={GREEN}>
                  <UpIco />
                </Box>
                <Text fontSize="12px" fontWeight="700" color={GREEN}>
                  +18%
                </Text>
                <Text fontSize="11px" color="gray.400">
                  vs last period
                </Text>
              </HStack>
            </Flex>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart
                data={revenueData}
                margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={P} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={P} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F0F0F5"
                  vertical={false}
                />
                <XAxis
                  dataKey="x"
                  tick={{ fontSize: 11, fill: '#A0AEC0' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v) => `₦${(v / 1_000_000).toFixed(0)}M`}
                  tick={{ fontSize: 10, fill: '#A0AEC0' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<RevTooltip />} />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={P}
                  strokeWidth={2.5}
                  fill="url(#rg)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>

          {/* Platform enquiries */}
          <Box
            bg={WHITE}
            borderRadius="16px"
            p="20px"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">
              Enquiries by Platform
            </Text>
            <Text fontSize="12px" color="gray.400" mb="14px">
              Enquiries vs conversions
            </Text>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart
                data={platformEnquiries}
                margin={{ top: 0, right: 0, left: -28, bottom: 0 }}
                barGap={3}
                barSize={12}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F0F0F5"
                  vertical={false}
                />
                <XAxis
                  dataKey="x"
                  tick={{ fontSize: 10, fill: '#A0AEC0' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Bar
                  dataKey="a"
                  name="Enquiries"
                  fill={`${P}88`}
                  radius={[4, 4, 0, 0] as [number, number, number, number]}
                />
                <Bar
                  dataKey="b"
                  name="Sold"
                  fill={P}
                  radius={[4, 4, 0, 0] as [number, number, number, number]}
                />
              </BarChart>
            </ResponsiveContainer>
            <HStack gap="14px" mt="10px" justify="center">
              <HStack gap="5px">
                <Box w="10px" h="10px" borderRadius="3px" bg={`${P}88`} />
                <Text fontSize="11px" color="gray.500">
                  Enquiries
                </Text>
              </HStack>
              <HStack gap="5px">
                <Box w="10px" h="10px" borderRadius="3px" bg={P} />
                <Text fontSize="11px" color="gray.500">
                  Sold
                </Text>
              </HStack>
            </HStack>
          </Box>
        </Grid>

        {/* ROW 3: Recent leads + Daily views + Pie */}
        <Grid templateColumns="1.5fr 0.8fr 0.65fr" gap="16px" mb="16px">
          {/* Recent leads */}
          <Box
            bg={WHITE}
            borderRadius="16px"
            p="20px"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <Flex justify="space-between" align="center" mb="14px">
              <Text fontWeight="800" fontSize="15px" color="gray.800">
                Recent Leads
              </Text>
              <Text fontSize="12px" color={P} fontWeight="600" cursor="pointer">
                View all →
              </Text>
            </Flex>
            <Grid templateColumns="1.8fr 1.4fr 0.7fr 0.9fr" mb="8px">
              {['Buyer', 'Car of Interest', 'Budget', 'Status'].map((h) => (
                <Text
                  key={h}
                  fontSize="10px"
                  color="gray.400"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.3px"
                >
                  {h}
                </Text>
              ))}
            </Grid>
            <VStack gap="0" align="stretch">
              {recentLeads.map((l, i) => {
                const cfg = LEAD_STATUS_CFG[l.status];
                return (
                  <Grid
                    key={i}
                    templateColumns="1.8fr 1.4fr 0.7fr 0.9fr"
                    alignItems="center"
                    py="10px"
                    borderBottom="1px solid"
                    borderColor="gray.50"
                    _last={{ borderBottom: 'none' }}
                    _hover={{ bg: 'gray.50' }}
                    borderRadius="8px"
                    px="4px"
                    mx="-4px"
                  >
                    <HStack gap="8px">
                      <Avatar.Root size="xs">
                        <Avatar.Image src={l.avatar} />
                        <Avatar.Fallback>{l.name[0]}</Avatar.Fallback>
                      </Avatar.Root>
                      <Box>
                        <Text fontSize="12px" fontWeight="600" color="gray.800">
                          {l.name}
                        </Text>
                        <Text fontSize="10px" color="gray.400">
                          {l.source} · {l.time}
                        </Text>
                      </Box>
                    </HStack>
                    <Text fontSize="11px" color="gray.600" lineClamp={1}>
                      {l.car}
                    </Text>
                    <Text fontSize="12px" fontWeight="700" color={P}>
                      {l.budget}
                    </Text>
                    <Badge
                      bg={cfg.bg}
                      color={cfg.color}
                      borderRadius="6px"
                      fontSize="9px"
                      px="7px"
                      py="2px"
                      fontWeight="700"
                    >
                      {l.status}
                    </Badge>
                  </Grid>
                );
              })}
            </VStack>
          </Box>

          {/* Daily listing views */}
          <Box
            bg={WHITE}
            borderRadius="16px"
            p="20px"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <Flex justify="space-between" align="center" mb="3px">
              <Text fontWeight="800" fontSize="15px" color="gray.800">
                Daily Views
              </Text>
              <HStack gap="3px">
                <Box color={GREEN}>
                  <UpIco />
                </Box>
                <Text fontSize="11px" color={GREEN} fontWeight="700">
                  +22%
                </Text>
              </HStack>
            </Flex>
            <HStack align="baseline" gap="5px" mb="10px">
              <Text fontSize="26px" fontWeight="900" color="gray.800">
                427
              </Text>
              <Text fontSize="11px" color="gray.400">
                this week
              </Text>
            </HStack>
            <ResponsiveContainer width="100%" height={100}>
              <BarChart
                data={dailyViews}
                margin={{ top: 0, right: 0, left: -28, bottom: 0 }}
                barSize={20}
              >
                <XAxis
                  dataKey="x"
                  tick={{ fontSize: 10, fill: '#A0AEC0' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Bar
                  dataKey="v"
                  fill={P}
                  radius={[5, 5, 0, 0] as [number, number, number, number]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          {/* Lead sources pie */}
          <Box
            bg={WHITE}
            borderRadius="16px"
            p="20px"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <Text fontWeight="800" fontSize="15px" color="gray.800" mb="2px">
              Lead Sources
            </Text>
            <Text fontSize="11px" color="gray.400" mb="10px">
              This month
            </Text>
            <Flex justify="center" mb="10px">
              <PieChart width={110} height={110}>
                <Pie
                  data={pieData}
                  cx={50}
                  cy={50}
                  innerRadius={32}
                  outerRadius={50}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={pieData[i].color} />
                  ))}
                </Pie>
              </PieChart>
            </Flex>
            <VStack gap="5px" align="stretch">
              {pieData.map((p) => (
                <Flex key={p.name} justify="space-between" align="center">
                  <HStack gap="5px">
                    <Box
                      w="7px"
                      h="7px"
                      borderRadius="2px"
                      bg={p.color}
                      flexShrink="0"
                    />
                    <Text fontSize="11px" color="gray.500">
                      {p.name}
                    </Text>
                  </HStack>
                  <Text fontSize="11px" fontWeight="700" color="gray.800">
                    {p.value}%
                  </Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        </Grid>

        {/* ROW 4: Stock alerts + Tasks + Calendar */}
        <Grid templateColumns="1.3fr 0.9fr 0.7fr" gap="16px">
          {/* Stock status */}
          <Box
            bg={WHITE}
            borderRadius="16px"
            p="20px"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <Flex justify="space-between" align="center" mb="14px">
              <Text fontWeight="800" fontSize="15px" color="gray.800">
                Stock Status
              </Text>
              <Text fontSize="12px" color={P} fontWeight="600" cursor="pointer">
                View inventory →
              </Text>
            </Flex>
            <Grid templateColumns="1.8fr 0.7fr 0.8fr 0.8fr" mb="8px">
              {['Car', 'Listed', 'Price', 'Status'].map((h) => (
                <Text
                  key={h}
                  fontSize="10px"
                  color="gray.400"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.3px"
                >
                  {h}
                </Text>
              ))}
            </Grid>
            <VStack gap="0" align="stretch">
              {stockAlerts.map((s, i) => (
                <Grid
                  key={i}
                  templateColumns="1.8fr 0.7fr 0.8fr 0.8fr"
                  alignItems="center"
                  py="10px"
                  borderBottom="1px solid"
                  borderColor="gray.50"
                  _last={{ borderBottom: 'none' }}
                >
                  <HStack gap="8px">
                    {s.hot && (
                      <Box
                        w="6px"
                        h="6px"
                        borderRadius="full"
                        bg="#E53E3E"
                        flexShrink="0"
                      />
                    )}
                    <Text
                      fontSize="12px"
                      fontWeight="600"
                      color="gray.800"
                      lineClamp={1}
                    >
                      {s.car}
                    </Text>
                  </HStack>
                  <Text
                    fontSize="11px"
                    color={s.daysListed > 30 ? '#E53E3E' : 'gray.500'}
                    fontWeight={s.daysListed > 30 ? '700' : '400'}
                  >
                    {s.daysListed}d
                  </Text>
                  <Text fontSize="12px" fontWeight="700" color={P}>
                    {s.price}
                  </Text>
                  <Badge
                    bg="#C6F6D5"
                    color="#276749"
                    borderRadius="5px"
                    fontSize="9px"
                    px="6px"
                    py="1px"
                    fontWeight="700"
                  >
                    {s.status}
                  </Badge>
                </Grid>
              ))}
            </VStack>
            <Box mt="12px" p="10px" bg="#FFF5F5" borderRadius="9px">
              <Text fontSize="11px" color="#9B2C2C" fontWeight="700">
                ⚠️ Lexus RX350 has been listed 40 days — consider price drop
              </Text>
            </Box>
          </Box>

          {/* Tasks */}
          <Box
            bg={WHITE}
            borderRadius="16px"
            p="20px"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <Flex justify="space-between" align="center" mb="14px">
              <Text fontWeight="800" fontSize="15px" color="gray.800">
                Today's Tasks
              </Text>
              <Text fontSize="11px" color="gray.400">
                {tasks.filter((t) => t.done).length}/{tasks.length}
              </Text>
            </Flex>

            {/* Progress bar */}
            <Box
              h="4px"
              bg="gray.100"
              borderRadius="2px"
              overflow="hidden"
              mb="14px"
            >
              <Box
                h="100%"
                bg={P}
                borderRadius="2px"
                w={`${Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100)}%`}
                transition="width 0.3s"
              />
            </Box>

            <VStack gap="10px" align="stretch">
              {tasks.map((t, i) => (
                <HStack
                  key={i}
                  gap="10px"
                  cursor="pointer"
                  onClick={() =>
                    setTasks((p) =>
                      p.map((x, j) => (j === i ? { ...x, done: !x.done } : x)),
                    )
                  }
                >
                  <Box
                    w="16px"
                    h="16px"
                    borderRadius="5px"
                    flexShrink="0"
                    border="1.5px solid"
                    borderColor={t.done ? P : 'gray.300'}
                    bg={t.done ? P : WHITE}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    transition="all 0.15s"
                  >
                    {t.done && (
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </Box>
                  <Text
                    fontSize="12px"
                    flex="1"
                    color={t.done ? 'gray.400' : 'gray.700'}
                    textDecoration={t.done ? 'line-through' : 'none'}
                  >
                    {t.label}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Box>

          {/* Mini calendar */}
          <Box
            bg={WHITE}
            borderRadius="16px"
            p="20px"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <Flex justify="space-between" align="center" mb="12px">
              <Text fontWeight="800" fontSize="14px" color="gray.700">
                November 2024
              </Text>
              <Box color="gray.400">
                <DotIco />
              </Box>
            </Flex>
            <Grid templateColumns="repeat(7,1fr)" gap="2px" mb="4px">
              {calDays.map((d) => (
                <Text
                  key={d}
                  fontSize="9px"
                  color="gray.400"
                  textAlign="center"
                  fontWeight="700"
                >
                  {d}
                </Text>
              ))}
            </Grid>
            {calRows.map((row, ri) => (
              <Grid key={ri} templateColumns="repeat(7,1fr)" gap="2px" mb="2px">
                {row.map((d, ci) => (
                  <Box
                    key={ci}
                    h="24px"
                    borderRadius="5px"
                    bg={
                      d !== null && highlighted.includes(d) ? P : 'transparent'
                    }
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text
                      fontSize="10px"
                      color={
                        d !== null
                          ? highlighted.includes(d)
                            ? 'white'
                            : 'gray.600'
                          : 'transparent'
                      }
                      fontWeight={
                        d !== null && highlighted.includes(d) ? '700' : '400'
                      }
                    >
                      {d ?? ''}
                    </Text>
                  </Box>
                ))}
              </Grid>
            ))}
            <Box
              mt="12px"
              pt="10px"
              borderTop="1px solid"
              borderColor="gray.100"
            >
              <Text fontSize="10px" color="gray.400" fontWeight="600" mb="6px">
                UPCOMING
              </Text>
              {[
                { day: 'Thu 6', label: 'Test drive — Emeka' },
                { day: 'Wed 13', label: 'Inspection — BMW X5' },
              ].map((ev) => (
                <HStack key={ev.day} gap="8px" mb="6px">
                  <Box
                    w="6px"
                    h="6px"
                    borderRadius="full"
                    bg={P}
                    flexShrink="0"
                  />
                  <Text fontSize="10px" color="gray.600" fontWeight="600">
                    {ev.day}
                  </Text>
                  <Text fontSize="10px" color="gray.400" lineClamp={1}>
                    {ev.label}
                  </Text>
                </HStack>
              ))}
            </Box>
          </Box>
        </Grid>
      </Box>
    </AppLayout>
  );
}

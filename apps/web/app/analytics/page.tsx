'use client';

import { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Badge,
  Avatar,
  Grid,
  HStack,
  VStack,
  Heading,
  Image,
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

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const P = '#6C63FF';
const P_DARK = '#5B54E8';
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
  <Ico d="M12 19V5M5 12l7-7 7 7" size={12} sw={2.5} stroke="#38A169" />
);
const DownIco = () => (
  <Ico d="M12 5v14M5 12l7 7 7-7" size={12} sw={2.5} stroke="#E53E3E" />
);

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`;
const fmtShort = (n: number) =>
  n >= 1_000_000
    ? `₦${(n / 1_000_000).toFixed(1)}M`
    : `₦${(n / 1000).toFixed(0)}K`;

// ─── CHART DATA ───────────────────────────────────────────────────────────────
const revenueData = [
  { month: 'Jun', revenue: 38000000, sales: 2 },
  { month: 'Jul', revenue: 52000000, sales: 3 },
  { month: 'Aug', revenue: 41000000, sales: 2 },
  { month: 'Sep', revenue: 67000000, sales: 4 },
  { month: 'Oct', revenue: 85000000, sales: 5 },
  { month: 'Nov', revenue: 63000000, sales: 3 },
];

const platformData = [
  { platform: 'WhatsApp', enquiries: 42, sold: 18, color: WA },
  { platform: 'Facebook', enquiries: 28, sold: 9, color: FB },
  { platform: 'Instagram', enquiries: 21, sold: 6, color: IG },
  { platform: 'Walk-in', enquiries: 14, sold: 7, color: '#718096' },
  { platform: 'Referral', enquiries: 11, sold: 6, color: '#805AD5' },
  { platform: 'Phone', enquiries: 8, sold: 4, color: '#DD6B20' },
];

const stockData = [
  { range: '0-7 days', count: 3 },
  { range: '8-14 days', count: 5 },
  { range: '15-30 days', count: 4 },
  { range: '31-60 days', count: 2 },
  { range: '60+ days', count: 1 },
];

const topCars = [
  {
    make: 'Toyota',
    model: 'Camry',
    sold: 8,
    revenue: 132000000,
    avgDays: 12,
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=60&h=40&fit=crop',
  },
  {
    make: 'Honda',
    model: 'CR-V',
    sold: 6,
    revenue: 126000000,
    avgDays: 18,
    img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=60&h=40&fit=crop',
  },
  {
    make: 'Lexus',
    model: 'RX350',
    sold: 5,
    revenue: 140000000,
    avgDays: 9,
    img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=60&h=40&fit=crop',
  },
  {
    make: 'Mercedes',
    model: 'C300',
    sold: 4,
    revenue: 140000000,
    avgDays: 14,
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=60&h=40&fit=crop',
  },
  {
    make: 'Toyota',
    model: 'Highlander',
    sold: 3,
    revenue: 135000000,
    avgDays: 7,
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=60&h=40&fit=crop',
  },
];

const pieData = [
  { name: 'WhatsApp', value: 42, color: WA },
  { name: 'Facebook', value: 28, color: FB },
  { name: 'Instagram', value: 21, color: IG },
  { name: 'Walk-in', value: 14, color: '#718096' },
  { name: 'Other', value: 19, color: '#CBD5E0' },
];

const PERIODS = [
  '7 days',
  '30 days',
  '3 months',
  '6 months',
  '1 year',
] as const;
type Period = (typeof PERIODS)[number];

// ─── CUSTOM TOOLTIP ───────────────────────────────────────────────────────────
const RevenueTooltip = ({
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
      <Text fontSize="12px" color="gray.400" mb="4px">
        {label}
      </Text>
      <Text fontSize="15px" fontWeight="800" color={P}>
        {fmtShort(payload[0].value)}
      </Text>
      {payload[1] && (
        <Text fontSize="11px" color="gray.500">
          {payload[1].value} cars sold
        </Text>
      )}
    </Box>
  );
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Analytics(): JSX.Element {
  const [period, setPeriod] = useState<Period>('6 months');

  // Summary stats
  const totalRevenue = revenueData.reduce((a, d) => a + d.revenue, 0);
  const totalSold = revenueData.reduce((a, d) => a + d.sales, 0);
  const avgSalePrice = Math.round(totalRevenue / totalSold);
  const topSource = platformData.sort((a, b) => b.enquiries - a.enquiries)[0];
  const convRate = Math.round(
    (platformData.reduce((a, d) => a + d.sold, 0) /
      platformData.reduce((a, d) => a + d.enquiries, 0)) *
      100,
  );

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
            Drivia / Analytics
          </Text>
          <Heading fontSize="22px" fontWeight="800" color="gray.800" mt="1px">
            Analytics
          </Heading>
        </Box>
        <HStack gap="10px">
          {/* Period selector */}
          <HStack bg="gray.100" borderRadius="10px" p="3px" gap="2px">
            {PERIODS.map((p) => (
              <Box
                key={p}
                as="button"
                onClick={() => setPeriod(p)}
                px="10px"
                py="5px"
                borderRadius="8px"
                fontSize="11px"
                fontWeight="600"
                bg={period === p ? WHITE : 'transparent'}
                color={period === p ? 'gray.800' : 'gray.400'}
                boxShadow={period === p ? '0 1px 4px rgba(0,0,0,0.1)' : 'none'}
                transition="all 0.15s"
              >
                {p}
              </Box>
            ))}
          </HStack>
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
        {/* KPI CARDS */}
        <Grid templateColumns="repeat(4,1fr)" gap="14px" mb="22px">
          {[
            {
              label: 'Total Revenue',
              value: fmtShort(totalRevenue),
              sub: '+18% vs last period',
              up: true,
              color: P,
              icon: '💰',
            },
            {
              label: 'Cars Sold',
              value: totalSold,
              sub: '+3 vs last period',
              up: true,
              color: '#276749',
              icon: '🚗',
            },
            {
              label: 'Avg Sale Price',
              value: fmtShort(avgSalePrice),
              sub: 'Based on all sales',
              up: true,
              color: '#2C7A7B',
              icon: '📊',
            },
            {
              label: 'Conv. Rate',
              value: `${convRate}%`,
              sub: '-2% vs last period',
              up: false,
              color: '#805AD5',
              icon: '🎯',
            },
          ].map((s) => (
            <Box
              key={s.label}
              bg={WHITE}
              borderRadius="14px"
              p="18px 20px"
              boxShadow="0 2px 10px rgba(0,0,0,0.05)"
            >
              <HStack justify="space-between" mb="8px">
                <Box
                  w="36px"
                  h="36px"
                  borderRadius="10px"
                  bg={`${s.color}15`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="16px"
                >
                  {s.icon}
                </Box>
                <HStack
                  gap="3px"
                  bg={s.up ? '#F0FFF4' : '#FFF5F5'}
                  px="7px"
                  py="2px"
                  borderRadius="6px"
                >
                  {s.up ? <UpIco /> : <DownIco />}
                  <Text
                    fontSize="10px"
                    fontWeight="700"
                    color={s.up ? '#276749' : '#9B2C2C'}
                  >
                    {s.sub.split(' ')[0]}
                  </Text>
                </HStack>
              </HStack>
              <Text
                fontSize="22px"
                fontWeight="900"
                color="gray.800"
                lineHeight="1.1"
              >
                {s.value}
              </Text>
              <Text fontSize="11px" color="gray.400" mt="3px">
                {s.label}
              </Text>
            </Box>
          ))}
        </Grid>

        {/* REVENUE CHART + PIE */}
        <Grid templateColumns="1.8fr 1fr" gap="16px" mb="16px">
          <Box
            bg={WHITE}
            borderRadius="16px"
            p="22px"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <Flex justify="space-between" align="center" mb="20px">
              <Box>
                <Text fontWeight="800" fontSize="15px" color="gray.800">
                  Revenue Over Time
                </Text>
                <Text fontSize="12px" color="gray.400">
                  Monthly sales performance
                </Text>
              </Box>
              <Text fontWeight="800" fontSize="20px" color={P}>
                {fmtShort(totalRevenue)}
              </Text>
            </Flex>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={revenueData}
                margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="month"
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
                <Tooltip content={<RevenueTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={P}
                  strokeWidth={2.5}
                  fill="url(#revGrad)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>

          {/* Platform pie */}
          <Box
            bg={WHITE}
            borderRadius="16px"
            p="22px"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">
              Lead Sources
            </Text>
            <Text fontSize="12px" color="gray.400" mb="16px">
              Where buyers come from
            </Text>
            <Flex justify="center" mb="12px">
              <PieChart width={130} height={130}>
                <Pie
                  data={pieData}
                  cx={60}
                  cy={60}
                  innerRadius={36}
                  outerRadius={58}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={pieData[i].color} />
                  ))}
                </Pie>
              </PieChart>
            </Flex>
            <VStack gap="6px" align="stretch">
              {pieData.map((p) => (
                <Flex key={p.name} justify="space-between" align="center">
                  <HStack gap="6px">
                    <Box
                      w="8px"
                      h="8px"
                      borderRadius="2px"
                      bg={p.color}
                      flexShrink="0"
                    />
                    <Text fontSize="12px" color="gray.600">
                      {p.name}
                    </Text>
                  </HStack>
                  <Text fontSize="12px" fontWeight="700" color="gray.800">
                    {p.value}%
                  </Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        </Grid>

        {/* PLATFORM PERFORMANCE + STOCK VELOCITY */}
        <Grid templateColumns="1.2fr 1fr" gap="16px" mb="16px">
          {/* Platform performance table */}
          <Box
            bg={WHITE}
            borderRadius="16px"
            p="22px"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">
              Platform Performance
            </Text>
            <Text fontSize="12px" color="gray.400" mb="16px">
              Enquiries vs conversions per source
            </Text>
            <VStack gap="0" align="stretch">
              {/* Header */}
              <Grid
                templateColumns="1.5fr 1fr 1fr 1fr"
                pb="8px"
                borderBottom="1px solid"
                borderColor="gray.100"
                mb="4px"
              >
                {['Platform', 'Enquiries', 'Sold', 'Conv.'].map((h) => (
                  <Text
                    key={h}
                    fontSize="10px"
                    fontWeight="700"
                    color="gray.400"
                    textTransform="uppercase"
                    letterSpacing="0.4px"
                  >
                    {h}
                  </Text>
                ))}
              </Grid>
              {platformData.map((row, i) => {
                const conv = Math.round((row.sold / row.enquiries) * 100);
                return (
                  <Grid
                    key={i}
                    templateColumns="1.5fr 1fr 1fr 1fr"
                    py="10px"
                    borderBottom="1px solid"
                    borderColor="gray.50"
                    _last={{ borderBottom: 'none' }}
                    alignItems="center"
                  >
                    <HStack gap="8px">
                      <Box
                        w="26px"
                        h="26px"
                        borderRadius="7px"
                        bg={row.color}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink="0"
                      >
                        <Text fontSize="9px" color="white" fontWeight="900">
                          {row.platform === 'WhatsApp'
                            ? 'W'
                            : row.platform === 'Facebook'
                              ? 'f'
                              : row.platform === 'Instagram'
                                ? 'ig'
                                : row.platform[0]}
                        </Text>
                      </Box>
                      <Text fontSize="13px" fontWeight="600" color="gray.700">
                        {row.platform}
                      </Text>
                    </HStack>
                    <Text fontSize="13px" color="gray.600" fontWeight="600">
                      {row.enquiries}
                    </Text>
                    <Text fontSize="13px" color="#276749" fontWeight="700">
                      {row.sold}
                    </Text>
                    <Box>
                      <Text
                        fontSize="12px"
                        fontWeight="700"
                        color={
                          conv >= 40
                            ? '#276749'
                            : conv >= 25
                              ? '#744210'
                              : '#9B2C2C'
                        }
                      >
                        {conv}%
                      </Text>
                      <Box
                        h="3px"
                        bg="gray.100"
                        borderRadius="2px"
                        mt="3px"
                        w="50px"
                      >
                        <Box
                          h="100%"
                          borderRadius="2px"
                          bg={conv >= 40 ? WA : conv >= 25 ? P : '#E53E3E'}
                          w={`${Math.min(100, conv * 2)}%`}
                        />
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </VStack>
          </Box>

          {/* Stock velocity */}
          <Box
            bg={WHITE}
            borderRadius="16px"
            p="22px"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">
              Stock Velocity
            </Text>
            <Text fontSize="12px" color="gray.400" mb="16px">
              How long cars sit before selling
            </Text>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart
                data={stockData}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                barSize={28}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F0F0F5"
                  vertical={false}
                />
                <XAxis
                  dataKey="range"
                  tick={{ fontSize: 9, fill: '#A0AEC0' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#A0AEC0' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Bar
                  dataKey="count"
                  radius={[6, 6, 0, 0] as [number, number, number, number]}
                >
                  {stockData.map((d, i) => (
                    <Cell
                      key={i}
                      fill={
                        d.range === '0-7 days'
                          ? WA
                          : d.range.startsWith('60')
                            ? '#FC8181'
                            : P
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <Box mt="12px" p="10px" bg="green.50" borderRadius="10px">
              <Text fontSize="12px" color="#276749" fontWeight="700">
                ✅ Avg time to sell:{' '}
                <Text as="span" fontSize="14px">
                  12 days
                </Text>
              </Text>
              <Text fontSize="11px" color="#276749" mt="2px">
                3 cars unsold for 60+ days — consider price drop
              </Text>
            </Box>
          </Box>
        </Grid>

        {/* TOP CARS TABLE */}
        <Box
          bg={WHITE}
          borderRadius="16px"
          p="22px"
          boxShadow="0 2px 10px rgba(0,0,0,0.05)"
        >
          <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">
            Best Selling Cars
          </Text>
          <Text fontSize="12px" color="gray.400" mb="16px">
            Your fastest moving inventory
          </Text>
          <Grid templateColumns="2fr 1fr 1.2fr 1fr" gap="0">
            {['Car', 'Units Sold', 'Revenue', 'Avg Days'].map((h) => (
              <Text
                key={h}
                fontSize="10px"
                fontWeight="700"
                color="gray.400"
                textTransform="uppercase"
                letterSpacing="0.4px"
                pb="8px"
                borderBottom="1px solid"
                borderColor="gray.100"
              >
                {h}
              </Text>
            ))}
            {topCars.map((car, i) => (
              <>
                <Flex
                  key={`${i}-car`}
                  align="center"
                  gap="12px"
                  py="12px"
                  borderBottom="1px solid"
                  borderColor="gray.50"
                >
                  <Box
                    borderRadius="8px"
                    overflow="hidden"
                    w="52px"
                    h="36px"
                    flexShrink="0"
                  >
                    <Image src={car.img} w="100%" h="100%" objectFit="cover" />
                  </Box>
                  <Box>
                    <Text fontSize="13px" fontWeight="700" color="gray.800">
                      {car.make} {car.model}
                    </Text>
                    <Badge
                      bg={P_DARK}
                      color="white"
                      fontSize="9px"
                      borderRadius="4px"
                      px="5px"
                    >
                      #{i + 1}
                    </Badge>
                  </Box>
                </Flex>
                <Flex
                  key={`${i}-sold`}
                  align="center"
                  py="12px"
                  borderBottom="1px solid"
                  borderColor="gray.50"
                >
                  <Text fontSize="14px" fontWeight="800" color="gray.800">
                    {car.sold}
                  </Text>
                </Flex>
                <Flex
                  key={`${i}-rev`}
                  align="center"
                  py="12px"
                  borderBottom="1px solid"
                  borderColor="gray.50"
                >
                  <Text fontSize="13px" fontWeight="700" color={P}>
                    {fmtShort(car.revenue)}
                  </Text>
                </Flex>
                <Flex
                  key={`${i}-days`}
                  align="center"
                  py="12px"
                  borderBottom="1px solid"
                  borderColor="gray.50"
                >
                  <Badge
                    bg={
                      car.avgDays <= 10
                        ? '#C6F6D5'
                        : car.avgDays <= 20
                          ? '#FEFCBF'
                          : '#FED7D7'
                    }
                    color={
                      car.avgDays <= 10
                        ? '#276749'
                        : car.avgDays <= 20
                          ? '#744210'
                          : '#9B2C2C'
                    }
                    borderRadius="6px"
                    fontSize="11px"
                    px="8px"
                    py="2px"
                    fontWeight="700"
                  >
                    {car.avgDays}d
                  </Badge>
                </Flex>
              </>
            ))}
          </Grid>
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
            Data for the last {period} · Updated just now
          </Text>
          <Text fontSize="11px" color="gray.400">
            Drivia Dealer Tool © 2024
          </Text>
        </Flex>
      </Box>
    </AppLayout>
  );
}

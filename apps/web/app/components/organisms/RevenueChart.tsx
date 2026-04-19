import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { RevenueTooltip } from '../molecules/RevenueTooltip';
import { SectionHeader } from '../atoms/SectionHeader';
import { fmtShort } from '../atoms/formatters';
import { COLORS } from '../atoms/palette';

// ─── REVENUE AREA CHART CARD ──────────────────────────────────────────────────
interface RevenueDataPoint {
  month: string;
  revenue: number;
  sales: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
  totalRevenue: number;
}

export const RevenueChart = ({ data, totalRevenue }: RevenueChartProps) => (
  <Box
    bg="white"
    borderRadius="16px"
    p="22px"
    boxShadow="0 2px 10px rgba(0,0,0,0.05)"
  >
    <Flex justify="space-between" align="center" mb="20px">
      <SectionHeader
        title="Revenue Over Time"
        subtitle="Monthly sales performance"
      />
      <Text fontWeight="800" fontSize="20px" color={COLORS.primary}>
        {fmtShort(totalRevenue)}
      </Text>
    </Flex>
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        data={data}
        margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.25} />
            <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F5" vertical={false} />
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
          stroke={COLORS.primary}
          strokeWidth={2.5}
          fill="url(#revGrad)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  </Box>
);

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { SectionHeader } from '../atoms/SectionHeader';
import { COLORS } from '../atoms/palette';

// ─── STOCK VELOCITY BAR CHART CARD ───────────────────────────────────────────
interface StockDataPoint {
  range: string;
  count: number;
}

interface StockVelocityChartProps {
  data: StockDataPoint[];
  avgDays: number;
  staleCount: number;
}

export const StockVelocityChart = ({
  data,
  avgDays,
  staleCount,
}: StockVelocityChartProps) => (
  <Box
    bg="white"
    borderRadius="16px"
    p="22px"
    boxShadow="0 2px 10px rgba(0,0,0,0.05)"
  >
    <SectionHeader
      title="Stock Velocity"
      subtitle="How long cars sit before selling"
    />
    <ResponsiveContainer width="100%" height={160}>
      <BarChart
        data={data}
        margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
        barSize={28}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F5" vertical={false} />
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
        <Bar dataKey="count" radius={[6, 6, 0, 0] as [number, number, number, number]}>
          {data.map((d, i) => (
            <Cell
              key={i}
              fill={
                d.range === '0-7 days'
                  ? COLORS.whatsapp
                  : d.range.startsWith('60')
                    ? '#FC8181'
                    : COLORS.primary
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
          {avgDays} days
        </Text>
      </Text>
      <Text fontSize="11px" color="#276749" mt="2px">
        {staleCount} cars unsold for 60+ days — consider price drop
      </Text>
    </Box>
  </Box>
);

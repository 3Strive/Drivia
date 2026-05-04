'use client';

import React, { useState } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import AppLayout from '../components/template/general-layout';
import { Period } from '../components/atoms';
import {
  AnalyticsTopBar,
  BestSellingCarsTable,
  KpiGrid,
  LeadSourcesPie,
  PageFooter,
  PlatformPerformanceTable,
  RevenueChart,
  StockVelocityChart,
} from '../components/organisms';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const revenueData = [
  { month: 'Jun', revenue: 38000000, sales: 2 },
  { month: 'Jul', revenue: 52000000, sales: 3 },
  { month: 'Aug', revenue: 41000000, sales: 2 },
  { month: 'Sep', revenue: 67000000, sales: 4 },
  { month: 'Oct', revenue: 85000000, sales: 5 },
  { month: 'Nov', revenue: 63000000, sales: 3 },
];

const platformData = [
  { platform: 'WhatsApp', enquiries: 42, sold: 18, color: '#25D366' },
  { platform: 'Facebook', enquiries: 28, sold: 9, color: '#1877F2' },
  { platform: 'Instagram', enquiries: 21, sold: 6, color: '#E1306C' },
  { platform: 'Walk-in', enquiries: 14, sold: 7, color: '#718096' },
  { platform: 'Referral', enquiries: 11, sold: 6, color: '#3B82F6' },
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
  { name: 'WhatsApp', value: 42, color: '#25D366' },
  { name: 'Facebook', value: 28, color: '#1877F2' },
  { name: 'Instagram', value: 21, color: '#E1306C' },
  { name: 'Walk-in', value: 14, color: '#718096' },
  { name: 'Other', value: 19, color: '#CBD5E0' },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>('6 months');

  const totalRevenue = revenueData.reduce((a, d) => a + d.revenue, 0);
  const totalSold = revenueData.reduce((a, d) => a + d.sales, 0);
  const avgSalePrice = Math.round(totalRevenue / totalSold);
  const convRate = Math.round(
    (platformData.reduce((a, d) => a + d.sold, 0) /
      platformData.reduce((a, d) => a + d.enquiries, 0)) *
      100,
  );

  return (
    <AppLayout>
      <AnalyticsTopBar period={period} onPeriodChange={setPeriod} />

      <Box p="28px">
        {/* KPIs */}
        <KpiGrid
          totalRevenue={totalRevenue}
          totalSold={totalSold}
          avgSalePrice={avgSalePrice}
          convRate={convRate}
        />

        {/* Revenue + Pie */}
        <Grid templateColumns="1.8fr 1fr" gap="16px" mb="16px">
          <RevenueChart data={revenueData} totalRevenue={totalRevenue} />
          <LeadSourcesPie data={pieData} />
        </Grid>

        {/* Platform table + Stock velocity */}
        <Grid templateColumns="1.2fr 1fr" gap="16px" mb="16px">
          <PlatformPerformanceTable data={platformData} />
          <StockVelocityChart data={stockData} avgDays={12} staleCount={3} />
        </Grid>

        {/* Best sellers */}
        <BestSellingCarsTable cars={topCars} />

        <PageFooter period={period} />
      </Box>
    </AppLayout>
  );
}

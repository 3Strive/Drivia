import React from 'react';
import { Grid } from '@chakra-ui/react';
import { KpiCard } from '../atoms/KpiCard';
import { fmtShort } from '../atoms/formatters';

// ─── KPI CARDS GRID ───────────────────────────────────────────────────────────
interface KpiGridProps {
  totalRevenue: number;
  totalSold: number;
  avgSalePrice: number;
  convRate: number;
}

export const KpiGrid = ({ totalRevenue, totalSold, avgSalePrice, convRate }: KpiGridProps) => {
  const stats = [
    {
      label: 'Total Revenue',
      value: fmtShort(totalRevenue),
      sub: '+18% vs last period',
      up: true,
      color: '#6C63FF',
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
  ];

  return (
    <Grid templateColumns="repeat(4,1fr)" gap="14px" mb="22px">
      {stats.map((s) => (
        <KpiCard key={s.label} {...s} />
      ))}
    </Grid>
  );
};

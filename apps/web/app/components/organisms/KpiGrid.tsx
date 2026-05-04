import React from 'react';
import { Grid } from '@chakra-ui/react';
import { KpiCard } from '../atoms/KpiCard';
import { fmtShort } from '../atoms/formatters';
import { FaCar, FaMoneyBill } from 'react-icons/fa';
import { IoAnalyticsSharp, IoPricetag } from 'react-icons/io5';

// ─── KPI CARDS GRID ───────────────────────────────────────────────────────────
interface KpiGridProps {
  totalRevenue: number;
  totalSold: number;
  avgSalePrice: number;
  convRate: number;
}

export const KpiGrid = ({
  totalRevenue,
  totalSold,
  avgSalePrice,
  convRate,
}: KpiGridProps) => {
  const stats = [
    {
      label: 'Total Revenue',
      value: fmtShort(totalRevenue),
      sub: '+18% vs last period',
      up: true,
      color: '#6C63FF',
      icon: <FaMoneyBill />,
    },
    {
      label: 'Cars Sold',
      value: totalSold,
      sub: '+3 vs last period',
      up: true,
      color: '#276749',
      icon: <FaCar />,
    },
    {
      label: 'Avg Sale Price',
      value: fmtShort(avgSalePrice),
      sub: 'Based on all sales',
      up: true,
      color: '#2C7A7B',
      icon: <IoPricetag />,
    },
    {
      label: 'Conv. Rate',
      value: `${convRate}%`,
      sub: '-2% vs last period',
      up: false,
      color: '#3B82F6',
      icon: <IoAnalyticsSharp />,
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

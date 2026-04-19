import React from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';
import { PieChart, Pie, Cell } from 'recharts';
import { LegendItem } from '../molecules/LegendItem';
import { SectionHeader } from '../atoms/SectionHeader';

// ─── LEAD SOURCES PIE CHART CARD ──────────────────────────────────────────────
interface PieSlice {
  name: string;
  value: number;
  color: string;
}

interface LeadSourcesPieProps {
  data: PieSlice[];
}

export const LeadSourcesPie = ({ data }: LeadSourcesPieProps) => (
  <Box
    bg="white"
    borderRadius="16px"
    p="22px"
    boxShadow="0 2px 10px rgba(0,0,0,0.05)"
  >
    <SectionHeader title="Lead Sources" subtitle="Where buyers come from" />
    <Flex justify="center" mb="12px">
      <PieChart width={130} height={130}>
        <Pie
          data={data}
          cx={60}
          cy={60}
          innerRadius={36}
          outerRadius={58}
          dataKey="value"
          strokeWidth={0}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={data[i].color} />
          ))}
        </Pie>
      </PieChart>
    </Flex>
    <VStack gap="6px" align="stretch">
      {data.map((p) => (
        <LegendItem key={p.name} name={p.name} value={p.value} color={p.color} />
      ))}
    </VStack>
  </Box>
);

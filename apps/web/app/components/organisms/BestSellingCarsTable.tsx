import React from 'react';
import { Box, Grid, Text } from '@chakra-ui/react';
import { CarTableRow, CarRowData } from '../molecules/CarTableRow';
import { SectionHeader } from '../atoms/SectionHeader';

// ─── BEST SELLING CARS TABLE CARD ─────────────────────────────────────────────
interface BestSellingCarsTableProps {
  cars: Omit<CarRowData, 'rank'>[];
}

const HEADERS = ['Car', 'Units Sold', 'Revenue', 'Avg Days'];

export const BestSellingCarsTable = ({ cars }: BestSellingCarsTableProps) => (
  <Box
    bg="white"
    borderRadius="16px"
    p="22px"
    boxShadow="0 2px 10px rgba(0,0,0,0.05)"
  >
    <SectionHeader
      title="Best Selling Cars"
      subtitle="Your fastest moving inventory"
    />
    <Grid templateColumns="2fr 1fr 1.2fr 1fr" gap="0">
      {HEADERS.map((h) => (
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
      {cars.map((car, i) => (
        <CarTableRow key={i} {...car} rank={i + 1} />
      ))}
    </Grid>
  </Box>
);

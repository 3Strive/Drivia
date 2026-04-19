import React from 'react';
import { Flex, Box, Text, Image } from '@chakra-ui/react';
import { StatusBadge } from '../atoms/StatusBadge';
import { fmtShort } from '../atoms/formatters';
import { COLORS } from '../atoms/palette';

// ─── BEST SELLING CAR TABLE ROW ───────────────────────────────────────────────
export interface CarRowData {
  make: string;
  model: string;
  sold: number;
  revenue: number;
  avgDays: number;
  img: string;
  rank: number;
}

export const CarTableRow = ({ make, model, sold, revenue, avgDays, img, rank }: CarRowData) => {
  const dayStatus =
    avgDays <= 10 ? 'success' : avgDays <= 20 ? 'warning' : 'danger';

  return (
    <>
      <Flex align="center" gap="12px" py="12px" borderBottom="1px solid" borderColor="gray.50">
        <Box borderRadius="8px" overflow="hidden" w="52px" h="36px" flexShrink={0}>
          <Image src={img} w="100%" h="100%" objectFit="cover" />
        </Box>
        <Box>
          <Text fontSize="13px" fontWeight="700" color="gray.800">
            {make} {model}
          </Text>
          <StatusBadge status="primary">#{rank}</StatusBadge>
        </Box>
      </Flex>
      <Flex align="center" py="12px" borderBottom="1px solid" borderColor="gray.50">
        <Text fontSize="14px" fontWeight="800" color="gray.800">{sold}</Text>
      </Flex>
      <Flex align="center" py="12px" borderBottom="1px solid" borderColor="gray.50">
        <Text fontSize="13px" fontWeight="700" color={COLORS.primary}>{fmtShort(revenue)}</Text>
      </Flex>
      <Flex align="center" py="12px" borderBottom="1px solid" borderColor="gray.50">
        <StatusBadge status={dayStatus}>{avgDays}d</StatusBadge>
      </Flex>
    </>
  );
};

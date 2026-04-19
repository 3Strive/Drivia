import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { fmtShort } from '../atoms/formatters';
import { COLORS } from '../atoms/palette';

// ─── RECHARTS CUSTOM TOOLTIP ──────────────────────────────────────────────────
interface RevenueTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

export const RevenueTooltip = ({
  active,
  payload,
  label,
}: RevenueTooltipProps): JSX.Element | null => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      bg="white"
      borderRadius="10px"
      p="10px 14px"
      boxShadow="0 4px 20px rgba(0,0,0,0.12)"
      border="1px solid"
      borderColor="gray.100"
    >
      <Text fontSize="12px" color="gray.400" mb="4px">
        {label}
      </Text>
      <Text fontSize="15px" fontWeight="800" color={COLORS.primary}>
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

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { COLORS } from './palette';

// ─── CONVERSION RATE DISPLAY + MINI BAR ───────────────────────────────────────
interface ConvRateBarProps {
  rate: number; // 0–100
}

export const ConvRateBar = ({ rate }: ConvRateBarProps) => {
  const color =
    rate >= 40 ? COLORS.whatsapp : rate >= 25 ? COLORS.primary : '#E53E3E';
  const textColor =
    rate >= 40 ? '#276749' : rate >= 25 ? '#744210' : '#9B2C2C';

  return (
    <Box>
      <Text fontSize="12px" fontWeight="700" color={textColor}>
        {rate}%
      </Text>
      <Box h="3px" bg="gray.100" borderRadius="2px" mt="3px" w="50px">
        <Box
          h="100%"
          borderRadius="2px"
          bg={color}
          w={`${Math.min(100, rate * 2)}%`}
        />
      </Box>
    </Box>
  );
};

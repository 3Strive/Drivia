import React from 'react';
import { Box, HStack } from '@chakra-ui/react';

// ─── PERIOD SELECTOR TABS ─────────────────────────────────────────────────────
export const PERIODS = ['7 days', '30 days', '3 months', '6 months', '1 year'] as const;
export type Period = (typeof PERIODS)[number];

interface PeriodSelectorProps {
  value: Period;
  onChange: (p: Period) => void;
}

export const PeriodSelector = ({ value, onChange }: PeriodSelectorProps) => (
  <HStack bg="gray.100" borderRadius="10px" p="3px" gap="2px">
    {PERIODS.map((p) => (
      <Box
        key={p}
        as="button"
        onClick={() => onChange(p)}
        px="10px"
        py="5px"
        borderRadius="8px"
        fontSize="11px"
        fontWeight="600"
        bg={value === p ? 'white' : 'transparent'}
        color={value === p ? 'gray.800' : 'gray.400'}
        boxShadow={value === p ? '0 1px 4px rgba(0,0,0,0.1)' : 'none'}
        transition="all 0.15s"
      >
        {p}
      </Box>
    ))}
  </HStack>
);

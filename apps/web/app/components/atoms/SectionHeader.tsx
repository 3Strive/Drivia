import React from 'react';
import { Box, Text } from '@chakra-ui/react';

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
  <Box mb={subtitle ? '16px' : '0'}>
    <Text fontWeight="800" fontSize="15px" color="gray.800" mb={subtitle ? '4px' : '0'}>
      {title}
    </Text>
    {subtitle && (
      <Text fontSize="12px" color="gray.400">
        {subtitle}
      </Text>
    )}
  </Box>
);

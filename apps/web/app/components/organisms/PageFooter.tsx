import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Period } from '../atoms/PeriodSelector';

// ─── PAGE FOOTER ──────────────────────────────────────────────────────────────
interface PageFooterProps {
  period: Period;
  brand?: string;
  year?: number;
}

export const PageFooter = ({
  period,
  brand = 'Drivia Dealer Tool',
  year = 2024,
}: PageFooterProps) => (
  <Flex
    justify="space-between"
    align="center"
    mt="32px"
    pt="16px"
    borderTop="1px solid"
    borderColor="gray.100"
  >
    <Text fontSize="11px" color="gray.400">
      Data for the last {period} · Updated just now
    </Text>
    <Text fontSize="11px" color="gray.400">
      {brand} © {year}
    </Text>
  </Flex>
);

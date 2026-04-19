import React from 'react';
import { Flex, Box, Text, HStack } from '@chakra-ui/react';

// ─── PIE CHART LEGEND ITEM ────────────────────────────────────────────────────
interface LegendItemProps {
  name: string;
  value: number;
  color: string;
}

export const LegendItem = ({ name, value, color }: LegendItemProps) => (
  <Flex justify="space-between" align="center">
    <HStack gap="6px">
      <Box w="8px" h="8px" borderRadius="2px" bg={color} flexShrink={0} />
      <Text fontSize="12px" color="gray.600">
        {name}
      </Text>
    </HStack>
    <Text fontSize="12px" fontWeight="700" color="gray.800">
      {value}%
    </Text>
  </Flex>
);

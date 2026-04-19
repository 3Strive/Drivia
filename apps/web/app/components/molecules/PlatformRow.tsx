import React from 'react';
import { Grid, Flex, Text, HStack } from '@chakra-ui/react';
import { PlatformDot } from '../atoms/PlatformDot';
import { ConvRateBar } from '../atoms/ConvRateBar';

// ─── SINGLE PLATFORM PERFORMANCE ROW ─────────────────────────────────────────
export interface PlatformRowData {
  platform: string;
  enquiries: number;
  sold: number;
  color: string;
}

export const PlatformRow = ({ platform, enquiries, sold, color }: PlatformRowData) => {
  const conv = Math.round((sold / enquiries) * 100);
  return (
    <Grid
      templateColumns="1.5fr 1fr 1fr 1fr"
      py="10px"
      borderBottom="1px solid"
      borderColor="gray.50"
      _last={{ borderBottom: 'none' }}
      alignItems="center"
    >
      <HStack gap="8px">
        <PlatformDot color={color} label={platform} />
        <Text fontSize="13px" fontWeight="600" color="gray.700">
          {platform}
        </Text>
      </HStack>
      <Text fontSize="13px" color="gray.600" fontWeight="600">
        {enquiries}
      </Text>
      <Text fontSize="13px" color="#276749" fontWeight="700">
        {sold}
      </Text>
      <ConvRateBar rate={conv} />
    </Grid>
  );
};

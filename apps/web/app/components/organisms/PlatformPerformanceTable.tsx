import React from 'react';
import { Box, Grid, Text, VStack } from '@chakra-ui/react';
import { PlatformRow, PlatformRowData } from '../molecules/PlatformRow';
import { SectionHeader } from '../atoms/SectionHeader';

// ─── PLATFORM PERFORMANCE TABLE CARD ─────────────────────────────────────────
interface PlatformPerformanceTableProps {
  data: PlatformRowData[];
}

const HEADERS = ['Platform', 'Enquiries', 'Sold', 'Conv.'];

export const PlatformPerformanceTable = ({ data }: PlatformPerformanceTableProps) => (
  <Box
    bg="white"
    borderRadius="16px"
    p="22px"
    boxShadow="0 2px 10px rgba(0,0,0,0.05)"
  >
    <SectionHeader
      title="Platform Performance"
      subtitle="Enquiries vs conversions per source"
    />
    <VStack gap="0" align="stretch">
      <Grid
        templateColumns="1.5fr 1fr 1fr 1fr"
        pb="8px"
        borderBottom="1px solid"
        borderColor="gray.100"
        mb="4px"
      >
        {HEADERS.map((h) => (
          <Text
            key={h}
            fontSize="10px"
            fontWeight="700"
            color="gray.400"
            textTransform="uppercase"
            letterSpacing="0.4px"
          >
            {h}
          </Text>
        ))}
      </Grid>
      {data.map((row, i) => (
        <PlatformRow key={i} {...row} />
      ))}
    </VStack>
  </Box>
);

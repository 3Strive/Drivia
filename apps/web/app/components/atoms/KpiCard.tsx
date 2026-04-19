import React from 'react';
import { Box, Flex, Text, HStack } from '@chakra-ui/react';
import { UpIco, DownIco } from './icons';

// ─── KPI STAT CARD ────────────────────────────────────────────────────────────
export interface KpiCardProps {
  label: string;
  value: string | number;
  sub: string;
  up: boolean;
  color: string;
  icon: string;
}

export const KpiCard = ({
  label,
  value,
  sub,
  up,
  color,
  icon,
}: KpiCardProps) => (
  <Box
    bg="white"
    borderRadius="14px"
    p="18px 20px"
    boxShadow="0 2px 10px rgba(0,0,0,0.05)"
  >
    <HStack justify="space-between" mb="8px">
      <Box
        w="36px"
        h="36px"
        borderRadius="10px"
        bg={`${color}15`}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="16px"
      >
        {icon}
      </Box>
      <HStack
        gap="3px"
        bg={up ? '#F0FFF4' : '#FFF5F5'}
        px="7px"
        py="2px"
        borderRadius="6px"
      >
        {up ? <UpIco /> : <DownIco />}
        <Text
          fontSize="10px"
          fontWeight="700"
          color={up ? '#276749' : '#9B2C2C'}
        >
          {sub.split(' ')[0]}
        </Text>
      </HStack>
    </HStack>
    <Text fontSize="22px" fontWeight="900" color="gray.800" lineHeight="1.1">
      {value}
    </Text>
    <Text fontSize="11px" color="gray.400" mt="3px">
      {label}
    </Text>
  </Box>
);

import React from 'react';
import { Box, Flex, Text, HStack, Button } from '@chakra-ui/react';
import { COLORS } from '../atoms/palette';
import { TrendingUpIco } from '../atoms/icons';

interface CurrentPlanBannerProps {
  planName: string;
  renewalDate: string;
  listingsUsed: number;
  listingsTotal: number;
  onManage: () => void;
}

export const CurrentPlanBanner = ({
  planName, renewalDate, listingsUsed, listingsTotal, onManage,
}: CurrentPlanBannerProps) => {
  const pct = Math.round((listingsUsed / listingsTotal) * 100);
  return (
    <Box bg={`${COLORS.primary}08`} border="1px solid" borderColor={`${COLORS.primary}25`}
      borderRadius="16px" p="22px" mb="24px">
      <Flex justify="space-between" align="flex-start" flexWrap="wrap" gap="12px">
        <HStack gap="14px">
          <Flex w="44px" h="44px" borderRadius="12px" bg={COLORS.primary}
            align="center" justify="center" color="white">
            <TrendingUpIco />
          </Flex>
          <Box>
            <Text fontSize="13px" color="gray.500" fontWeight="600">Current Plan</Text>
            <Text fontSize="20px" fontWeight="900" color={COLORS.primary}>{planName}</Text>
          </Box>
        </HStack>
        <HStack gap="24px" flexWrap="wrap">
          <Box>
            <Text fontSize="11px" color="gray.400" fontWeight="700" textTransform="uppercase">Renewal</Text>
            <Text fontSize="13px" fontWeight="700" color="gray.700">{renewalDate}</Text>
          </Box>
          <Box>
            <Text fontSize="11px" color="gray.400" fontWeight="700" textTransform="uppercase">Listings Used</Text>
            <Text fontSize="13px" fontWeight="700" color="gray.700">{listingsUsed}/{listingsTotal}</Text>
            <Box h="4px" bg="gray.200" borderRadius="2px" mt="4px" w="100px">
              <Box h="100%" borderRadius="2px"
                bg={pct >= 80 ? '#E53E3E' : COLORS.primary}
                w={`${pct}%`} />
            </Box>
          </Box>
          <Button bg={COLORS.primary} color="white" borderRadius="10px"
            fontSize="12px" fontWeight="700" h="36px" px="16px"
            _hover={{ bg: COLORS.primaryDark }} onClick={onManage}>
            Manage Plan
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

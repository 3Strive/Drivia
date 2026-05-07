import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import React from 'react';
import { COLORS, StatusBadge } from '../../atoms';
import { Referral } from '../../../shared/types';

// ─── REFERRAL HISTORY ────────────────────────────────────────────────────────

interface ReferralHistoryListProps {
  referrals: Referral[];
}

const STATUS_MAP: Record<string, 'warning' | 'primary' | 'success'> = {
  pending: 'warning',
  verified: 'primary',
  rewarded: 'success',
};

export const ReferralHistoryList = ({
  referrals,
}: ReferralHistoryListProps) => (
  <Box
    bg="white"
    borderRadius="16px"
    p="22px"
    boxShadow="0 2px 10px rgba(0,0,0,0.05)"
  >
    <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">
      Referral History
    </Text>
    <Text fontSize="12px" color="gray.400" mb="16px">
      People you've referred to Drivia
    </Text>
    <Grid templateColumns="2fr 1.5fr 1fr 1fr" gap="0">
      {['Dealer', 'Signed Up', 'Reward', 'Status'].map((h) => (
        <Text
          key={h}
          fontSize="10px"
          fontWeight="700"
          color="gray.400"
          textTransform="uppercase"
          letterSpacing="0.4px"
          pb="10px"
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          {h}
        </Text>
      ))}
      {referrals.map((r) => (
        <React.Fragment key={r.id}>
          <Box py="12px" borderBottom="1px solid" borderColor="gray.50">
            <Text fontSize="13px" fontWeight="700" color="gray.800">
              {r.name}
            </Text>
            <Text fontSize="11px" color="gray.400">
              {r.email}
            </Text>
          </Box>
          <Flex
            align="center"
            py="12px"
            borderBottom="1px solid"
            borderColor="gray.50"
          >
            <Text fontSize="12px" color="gray.500">
              {r.signedUpAt}
            </Text>
          </Flex>
          <Flex
            align="center"
            py="12px"
            borderBottom="1px solid"
            borderColor="gray.50"
          >
            <Text fontSize="13px" fontWeight="700" color={COLORS.primary}>
              {r.reward > 0 ? `+${r.reward} listings` : '—'}
            </Text>
          </Flex>
          <Flex
            align="center"
            py="12px"
            borderBottom="1px solid"
            borderColor="gray.50"
          >
            <StatusBadge status={STATUS_MAP[r.status]}>
              {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
            </StatusBadge>
          </Flex>
        </React.Fragment>
      ))}
      {referrals.length === 0 && (
        <Flex gridColumn="1 / -1" h="80px" align="center" justify="center">
          <Text fontSize="12px" color="gray.300">
            No referrals yet — share your link!
          </Text>
        </Flex>
      )}
    </Grid>
  </Box>
);

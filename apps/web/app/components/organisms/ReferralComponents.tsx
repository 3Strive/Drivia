import React, { useState } from 'react';
import { Box, Flex, Text, HStack, Input, Button, Grid, VStack } from '@chakra-ui/react';
import { COLORS } from '../atoms/palette';
import { ShareIco, CheckIco } from '../atoms/icons';
import { StatusBadge } from '../atoms/StatusBadge';

// ─── REFERRAL LINK CARD ───────────────────────────────────────────────────────
interface ReferralLinkCardProps {
  referralCode: string;
  referralUrl: string;
  totalEarned: number;
  pendingRewards: number;
}

export const ReferralLinkCard = ({ referralCode, referralUrl, totalEarned, pendingRewards }: ReferralLinkCardProps) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box bg={`${COLORS.primary}08`} border="1px solid" borderColor={`${COLORS.primary}20`}
      borderRadius="16px" p="22px" mb="16px">
      <Flex justify="space-between" align="flex-start" flexWrap="wrap" gap="16px">
        <Box>
          <Text fontSize="15px" fontWeight="800" color="gray.800" mb="4px">Your Referral Link</Text>
          <Text fontSize="12px" color="gray.500" mb="16px">
            Refer a dealer and earn <Text as="span" fontWeight="800" color={COLORS.primary}>2 free listing slots</Text> when they sign up
          </Text>
          <HStack gap="8px" mb="12px">
            <Input value={referralUrl} readOnly borderRadius="10px" fontSize="12px" h="38px"
              border="1px solid" borderColor={`${COLORS.primary}30`} bg="white"
              color="gray.700" fontWeight="600" w="280px" />
            <Button bg={copied ? '#276749' : COLORS.primary} color="white" borderRadius="10px"
              fontSize="12px" fontWeight="700" h="38px" px="16px"
              _hover={{ opacity: 0.9 }} onClick={copy} minW="90px"
              display="flex" alignItems="center" gap="6px">
              {copied ? <><CheckIco /> Copied!</> : <><ShareIco /> Copy</>}
            </Button>
          </HStack>
          <HStack gap="6px" flexWrap="wrap">
            {[
              { label: 'Share on WhatsApp', color: '#25D366', bg: '#25D36615' },
              { label: 'Share on Facebook', color: '#1877F2', bg: '#1877F215' },
              { label: 'Share on Twitter/X', color: '#000', bg: '#00000010' },
            ].map(s => (
              <Box key={s.label} as="button" px="12px" py="6px" borderRadius="8px"
                bg={s.bg} color={s.color} fontSize="11px" fontWeight="700"
                _hover={{ opacity: 0.8 }}>{s.label}</Box>
            ))}
          </HStack>
        </Box>
        <VStack gap="10px">
          {[
            { label: 'Listings Earned', value: totalEarned, color: COLORS.primary },
            { label: 'Pending Reward', value: pendingRewards, color: '#DD6B20' },
          ].map(s => (
            <Box key={s.label} textAlign="center" bg="white" borderRadius="12px"
              p="14px 20px" boxShadow="0 2px 8px rgba(0,0,0,0.06)">
              <Text fontSize="24px" fontWeight="900" color={s.color}>{s.value}</Text>
              <Text fontSize="11px" color="gray.400">{s.label}</Text>
            </Box>
          ))}
        </VStack>
      </Flex>
    </Box>
  );
};

// ─── REFERRAL HISTORY ─────────────────────────────────────────────────────────
export interface Referral {
  id: string;
  name: string;
  email: string;
  signedUpAt: string;
  status: 'pending' | 'verified' | 'rewarded';
  reward: number;
}

interface ReferralHistoryListProps {
  referrals: Referral[];
}

const STATUS_MAP: Record<string, 'warning' | 'primary' | 'success'> = {
  pending: 'warning', verified: 'primary', rewarded: 'success',
};

export const ReferralHistoryList = ({ referrals }: ReferralHistoryListProps) => (
  <Box bg="white" borderRadius="16px" p="22px" boxShadow="0 2px 10px rgba(0,0,0,0.05)">
    <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">Referral History</Text>
    <Text fontSize="12px" color="gray.400" mb="16px">People you've referred to Drivia</Text>
    <Grid templateColumns="2fr 1.5fr 1fr 1fr" gap="0">
      {['Dealer', 'Signed Up', 'Reward', 'Status'].map(h => (
        <Text key={h} fontSize="10px" fontWeight="700" color="gray.400"
          textTransform="uppercase" letterSpacing="0.4px" pb="10px"
          borderBottom="1px solid" borderColor="gray.100">{h}</Text>
      ))}
      {referrals.map(r => (
        <React.Fragment key={r.id}>
          <Box py="12px" borderBottom="1px solid" borderColor="gray.50">
            <Text fontSize="13px" fontWeight="700" color="gray.800">{r.name}</Text>
            <Text fontSize="11px" color="gray.400">{r.email}</Text>
          </Box>
          <Flex align="center" py="12px" borderBottom="1px solid" borderColor="gray.50">
            <Text fontSize="12px" color="gray.500">{r.signedUpAt}</Text>
          </Flex>
          <Flex align="center" py="12px" borderBottom="1px solid" borderColor="gray.50">
            <Text fontSize="13px" fontWeight="700" color={COLORS.primary}>
              {r.reward > 0 ? `+${r.reward} listings` : '—'}
            </Text>
          </Flex>
          <Flex align="center" py="12px" borderBottom="1px solid" borderColor="gray.50">
            <StatusBadge status={STATUS_MAP[r.status]}>
              {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
            </StatusBadge>
          </Flex>
        </React.Fragment>
      ))}
      {referrals.length === 0 && (
        <Flex gridColumn="1 / -1" h="80px" align="center" justify="center">
          <Text fontSize="12px" color="gray.300">No referrals yet — share your link!</Text>
        </Flex>
      )}
    </Grid>
  </Box>
);

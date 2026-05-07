import { useState } from 'react';
import { Colors } from '../../ui/color-pack';
import { CheckIco, COLORS, ShareIco } from '../../atoms';
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

// ─── REFERRAL LINK CARD ───────────────────────────────────────────────────────
interface ReferralLinkCardProps {
  referralCode: string;
  referralUrl: string;
  totalEarned: number;
  pendingRewards: number;
}

export const ReferralLinkCard = ({
  referralCode,
  referralUrl,
  totalEarned,
  pendingRewards,
}: ReferralLinkCardProps) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      bg={`${COLORS.primary}08`}
      border="1px solid"
      borderColor={`${COLORS.primary}20`}
      borderRadius="16px"
      p="22px"
      mb="16px"
    >
      <Flex
        justify="space-between"
        align="flex-start"
        flexWrap="wrap"
        gap="16px"
      >
        <Box>
          <Text fontSize="15px" fontWeight="800" color="gray.800" mb="4px">
            Your Referral Link
          </Text>
          <Text fontSize="12px" color="gray.500" mb="16px">
            Refer a dealer and earn{' '}
            <Text as="span" fontWeight="800" color={COLORS.primary}>
              2 free listing slots
            </Text>{' '}
            when they sign up
          </Text>
          <HStack gap="8px" mb="12px">
            <Input
              value={referralUrl}
              readOnly
              borderRadius="10px"
              fontSize="12px"
              h="38px"
              p={3}
              border="1px solid"
              borderColor={`${COLORS.primary}30`}
              bg="white"
              color="gray.700"
              fontWeight="600"
              w="280px"
            />
            <Button
              bg={copied ? '#276749' : COLORS.primary}
              color="white"
              borderRadius="10px"
              fontSize="12px"
              fontWeight="700"
              h="38px"
              px="16px"
              _hover={{ opacity: 0.9 }}
              onClick={copy}
              minW="90px"
              display="flex"
              alignItems="center"
              gap="6px"
            >
              {copied ? (
                <>
                  <CheckIco /> Copied!
                </>
              ) : (
                <>
                  <ShareIco /> Copy
                </>
              )}
            </Button>
          </HStack>
          <HStack gap="6px" flexWrap="wrap">
            {[
              { label: 'Share on WhatsApp', color: '#25D366', bg: '#25D36615' },
              { label: 'Share on Facebook', color: '#1877F2', bg: '#1877F215' },
              { label: 'Share on Twitter/X', color: '#000', bg: '#00000010' },
            ].map((s) => (
              <Box
                key={s.label}
                as="button"
                px="12px"
                py="6px"
                borderRadius="8px"
                bg={s.bg}
                color={s.color}
                fontSize="11px"
                fontWeight="700"
                _hover={{ opacity: 0.8 }}
              >
                {s.label}
              </Box>
            ))}
          </HStack>
        </Box>
        <VStack gap="10px">
          {[
            {
              label: 'Listings Earned',
              value: totalEarned,
              color: COLORS.primary,
            },
            {
              label: 'Pending Reward',
              value: pendingRewards,
              color: '#DD6B20',
            },
          ].map((s) => (
            <Box
              key={s.label}
              textAlign="center"
              bg="white"
              borderRadius="12px"
              p="14px 20px"
              boxShadow="0 2px 8px rgba(0,0,0,0.06)"
            >
              <Text fontSize="24px" fontWeight="900" color={s.color}>
                {s.value}
              </Text>
              <Text fontSize="11px" color="gray.400">
                {s.label}
              </Text>
            </Box>
          ))}
        </VStack>
      </Flex>
    </Box>
  );
};

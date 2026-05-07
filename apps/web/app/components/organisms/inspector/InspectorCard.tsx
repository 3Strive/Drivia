import { Box, Button, Flex, Grid, HStack, Text } from '@chakra-ui/react';
import { COLORS, ShieldIco, StatusBadge } from '../../atoms';
import { FaCheck } from 'react-icons/fa';

// ─── INSPECTOR ONBOARD CARD ───────────────────────────────────────────────────
interface InspectorOnboardCardProps {
  isVerified: boolean;
  onApply: () => void;
}

export const InspectorOnboardCard = ({
  isVerified,
  onApply,
}: InspectorOnboardCardProps) => (
  <Box
    bg="white"
    borderRadius="16px"
    p="28px"
    boxShadow="0 2px 10px rgba(0,0,0,0.05)"
    mb="16px"
  >
    <Flex gap="20px" align="flex-start" flexWrap="wrap">
      <Flex
        w="56px"
        h="56px"
        borderRadius="16px"
        bg={`${COLORS.primary}15`}
        align="center"
        justify="center"
        color={COLORS.primary}
        flexShrink={0}
      >
        <ShieldIco />
      </Flex>
      <Box flex="1">
        <HStack gap="10px" mb="4px">
          <Text fontSize="17px" fontWeight="800" color="gray.800">
            Become a Verified Inspector
          </Text>
          {isVerified && (
            <StatusBadge status="success">
              <FaCheck size={14} color={'green'} /> Verified
            </StatusBadge>
          )}
        </HStack>
        <Text fontSize="13px" color="gray.500" mb="16px" maxW="540px">
          Dealers earn the <strong>Inspected Badge</strong> after you inspect
          their cars. This drives more buyer trust and faster sales. Charges
          apply per inspection.
        </Text>
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap="12px"
          mb="20px"
          maxW="480px"
        >
          {[
            {
              icon: '🔍',
              title: 'Inspect Cars',
              desc: 'On-site vehicle checks',
            },
            {
              icon: '🏅',
              title: 'Earn Badge',
              desc: 'Give dealers verified status',
            },
            { icon: '💰', title: 'Get Paid', desc: '₦15,000 per inspection' },
          ].map((b) => (
            <Box
              key={b.title}
              bg="gray.50"
              borderRadius="12px"
              p="14px"
              textAlign="center"
            >
              <Text fontSize="22px" mb="4px">
                {b.icon}
              </Text>
              <Text fontSize="12px" fontWeight="800" color="gray.700">
                {b.title}
              </Text>
              <Text fontSize="11px" color="gray.400">
                {b.desc}
              </Text>
            </Box>
          ))}
        </Grid>
        {!isVerified && (
          <Button
            bg={COLORS.primary}
            color="white"
            borderRadius="10px"
            fontSize="13px"
            fontWeight="700"
            h="40px"
            px="24px"
            _hover={{ bg: COLORS.primaryDark }}
            onClick={onApply}
          >
            Apply to be an Inspector
          </Button>
        )}
      </Box>
    </Flex>
  </Box>
);

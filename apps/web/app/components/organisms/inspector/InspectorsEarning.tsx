import { Box, Grid, Text } from '@chakra-ui/react';
import { COLORS, fmtShort } from '../../atoms';

// ─── INSPECTOR EARNINGS CARD ──────────────────────────────────────────────────
interface InspectorEarningsCardProps {
  completed: number;
  totalEarned: number;
  pending: number;
}

export const InspectorEarningsCard = ({
  completed,
  totalEarned,
  pending,
}: InspectorEarningsCardProps) => (
  <Box
    bg="white"
    borderRadius="16px"
    p="22px"
    boxShadow="0 2px 10px rgba(0,0,0,0.05)"
  >
    <Text fontWeight="800" fontSize="15px" color="gray.800" mb="16px">
      Earnings
    </Text>
    <Grid templateColumns="repeat(3, 1fr)" gap="12px">
      {[
        {
          label: 'Inspections Done',
          value: completed,
          color: COLORS.primary,
          icon: '🔍',
        },
        {
          label: 'Total Earned',
          value: fmtShort(totalEarned),
          color: '#276749',
          icon: '💰',
        },
        {
          label: 'Pending Payout',
          value: fmtShort(pending),
          color: '#DD6B20',
          icon: '⏳',
        },
      ].map((s) => (
        <Box
          key={s.label}
          bg="gray.50"
          borderRadius="12px"
          p="16px"
          textAlign="center"
        >
          <Text fontSize="22px" mb="4px">
            {s.icon}
          </Text>
          <Text fontSize="20px" fontWeight="900" color={s.color}>
            {s.value}
          </Text>
          <Text fontSize="11px" color="gray.400" mt="2px">
            {s.label}
          </Text>
        </Box>
      ))}
    </Grid>
  </Box>
);

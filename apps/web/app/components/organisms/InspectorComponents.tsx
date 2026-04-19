import React, { useState } from 'react';
import { Box, Flex, Text, HStack, VStack, Grid, Button, Textarea } from '@chakra-ui/react';
import { COLORS } from '../atoms/palette';
import { ShieldIco, CheckIco, CarIco, StarIco } from '../atoms/icons';
import { StatusBadge } from '../atoms/StatusBadge';
import { fmtShort } from '../atoms/formatters';

// ─── INSPECTOR ONBOARD CARD ───────────────────────────────────────────────────
interface InspectorOnboardCardProps {
  isVerified: boolean;
  onApply: () => void;
}

export const InspectorOnboardCard = ({ isVerified, onApply }: InspectorOnboardCardProps) => (
  <Box bg="white" borderRadius="16px" p="28px" boxShadow="0 2px 10px rgba(0,0,0,0.05)" mb="16px">
    <Flex gap="20px" align="flex-start" flexWrap="wrap">
      <Flex w="56px" h="56px" borderRadius="16px" bg={`${COLORS.primary}15`}
        align="center" justify="center" color={COLORS.primary} flexShrink={0}>
        <ShieldIco />
      </Flex>
      <Box flex="1">
        <HStack gap="10px" mb="4px">
          <Text fontSize="17px" fontWeight="800" color="gray.800">Become a Verified Inspector</Text>
          {isVerified && <StatusBadge status="success">✅ Verified</StatusBadge>}
        </HStack>
        <Text fontSize="13px" color="gray.500" mb="16px" maxW="540px">
          Dealers earn the <strong>Inspected Badge</strong> after you inspect their cars.
          This drives more buyer trust and faster sales. Charges apply per inspection.
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap="12px" mb="20px" maxW="480px">
          {[
            { icon: '🔍', title: 'Inspect Cars', desc: 'On-site vehicle checks' },
            { icon: '🏅', title: 'Earn Badge', desc: 'Give dealers verified status' },
            { icon: '💰', title: 'Get Paid', desc: '₦15,000 per inspection' },
          ].map(b => (
            <Box key={b.title} bg="gray.50" borderRadius="12px" p="14px" textAlign="center">
              <Text fontSize="22px" mb="4px">{b.icon}</Text>
              <Text fontSize="12px" fontWeight="800" color="gray.700">{b.title}</Text>
              <Text fontSize="11px" color="gray.400">{b.desc}</Text>
            </Box>
          ))}
        </Grid>
        {!isVerified && (
          <Button bg={COLORS.primary} color="white" borderRadius="10px"
            fontSize="13px" fontWeight="700" h="40px" px="24px"
            _hover={{ bg: COLORS.primaryDark }} onClick={onApply}>
            Apply to be an Inspector
          </Button>
        )}
      </Box>
    </Flex>
  </Box>
);

// ─── INSPECTION REQUEST LIST ──────────────────────────────────────────────────
export interface InspectionRequest {
  id: string;
  dealerName: string;
  car: string;
  location: string;
  requestedDate: string;
  status: 'pending' | 'accepted' | 'completed';
}

interface InspectionRequestListProps {
  requests: InspectionRequest[];
  onAccept: (id: string) => void;
}

const STATUS_MAP: Record<string, 'warning' | 'primary' | 'success'> = {
  pending: 'warning', accepted: 'primary', completed: 'success',
};

export const InspectionRequestList = ({ requests, onAccept }: InspectionRequestListProps) => (
  <Box bg="white" borderRadius="16px" p="22px" boxShadow="0 2px 10px rgba(0,0,0,0.05)" mb="16px">
    <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">Inspection Requests</Text>
    <Text fontSize="12px" color="gray.400" mb="16px">Dealers awaiting vehicle inspections</Text>
    <VStack gap="10px" align="stretch">
      {requests.map(r => (
        <Flex key={r.id} align="center" gap="14px" p="14px" borderRadius="12px"
          bg="gray.50" border="1px solid" borderColor="gray.100">
          <Flex w="38px" h="38px" borderRadius="10px" bg={`${COLORS.primary}15`}
            align="center" justify="center" color={COLORS.primary} flexShrink={0}>
            <CarIco />
          </Flex>
          <Box flex="1">
            <Text fontSize="13px" fontWeight="700" color="gray.800">{r.car}</Text>
            <Text fontSize="11px" color="gray.500">{r.dealerName} · {r.location}</Text>
            <Text fontSize="11px" color="gray.400" mt="2px">📅 {r.requestedDate}</Text>
          </Box>
          <HStack gap="8px">
            <StatusBadge status={STATUS_MAP[r.status]}>
              {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
            </StatusBadge>
            {r.status === 'pending' && (
              <Button bg={COLORS.primary} color="white" borderRadius="8px"
                fontSize="11px" fontWeight="700" h="30px" px="12px"
                _hover={{ bg: COLORS.primaryDark }} onClick={() => onAccept(r.id)}>
                Accept
              </Button>
            )}
          </HStack>
        </Flex>
      ))}
      {requests.length === 0 && (
        <Flex h="80px" align="center" justify="center">
          <Text fontSize="12px" color="gray.300">No pending inspection requests</Text>
        </Flex>
      )}
    </VStack>
  </Box>
);

// ─── INSPECTOR EARNINGS CARD ──────────────────────────────────────────────────
interface InspectorEarningsCardProps {
  completed: number;
  totalEarned: number;
  pending: number;
}

export const InspectorEarningsCard = ({ completed, totalEarned, pending }: InspectorEarningsCardProps) => (
  <Box bg="white" borderRadius="16px" p="22px" boxShadow="0 2px 10px rgba(0,0,0,0.05)">
    <Text fontWeight="800" fontSize="15px" color="gray.800" mb="16px">Earnings</Text>
    <Grid templateColumns="repeat(3, 1fr)" gap="12px">
      {[
        { label: 'Inspections Done', value: completed, color: COLORS.primary, icon: '🔍' },
        { label: 'Total Earned', value: fmtShort(totalEarned), color: '#276749', icon: '💰' },
        { label: 'Pending Payout', value: fmtShort(pending), color: '#DD6B20', icon: '⏳' },
      ].map(s => (
        <Box key={s.label} bg="gray.50" borderRadius="12px" p="16px" textAlign="center">
          <Text fontSize="22px" mb="4px">{s.icon}</Text>
          <Text fontSize="20px" fontWeight="900" color={s.color}>{s.value}</Text>
          <Text fontSize="11px" color="gray.400" mt="2px">{s.label}</Text>
        </Box>
      ))}
    </Grid>
  </Box>
);

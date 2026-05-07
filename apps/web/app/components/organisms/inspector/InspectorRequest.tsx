import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { CarIco, COLORS, StatusBadge } from '../../atoms';
import { FaCalendar } from 'react-icons/fa';
import { InspectionRequest } from '../../../shared/types';

// ─── INSPECTION REQUEST LIST ──────────────────────────────────────────────────

interface InspectionRequestListProps {
  requests: InspectionRequest[];
  onAccept: (id: string) => void;
}

const STATUS_MAP: Record<string, 'warning' | 'primary' | 'success'> = {
  pending: 'warning',
  accepted: 'primary',
  completed: 'success',
};

export const InspectionRequestList = ({
  requests,
  onAccept,
}: InspectionRequestListProps) => (
  <Box
    bg="white"
    borderRadius="16px"
    p="22px"
    boxShadow="0 2px 10px rgba(0,0,0,0.05)"
    mb="16px"
  >
    <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">
      Inspection Requests
    </Text>
    <Text fontSize="12px" color="gray.400" mb="16px">
      Dealers awaiting vehicle inspections
    </Text>
    <VStack gap="10px" align="stretch">
      {requests.map((r) => (
        <Flex
          key={r.id}
          align="center"
          gap="14px"
          p="14px"
          borderRadius="12px"
          bg="gray.50"
          border="1px solid"
          borderColor="gray.100"
        >
          <Flex
            w="38px"
            h="38px"
            borderRadius="10px"
            bg={`${COLORS.primary}15`}
            align="center"
            justify="center"
            color={COLORS.primary}
            flexShrink={0}
          >
            <CarIco />
          </Flex>
          <Box flex="1">
            <Text fontSize="13px" fontWeight="700" color="gray.800">
              {r.car}
            </Text>
            <Text fontSize="11px" color="gray.500">
              {r.dealerName} · {r.location}
            </Text>
            <Text fontSize="11px" color="gray.400" mt="2px">
              <FaCalendar /> {r.requestedDate}
            </Text>
          </Box>
          <HStack gap="8px">
            <StatusBadge status={STATUS_MAP[r.status]}>
              {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
            </StatusBadge>
            {r.status === 'pending' && (
              <Button
                bg={COLORS.primary}
                color="white"
                borderRadius="8px"
                fontSize="11px"
                fontWeight="700"
                h="30px"
                px="12px"
                _hover={{ bg: COLORS.primaryDark }}
                onClick={() => onAccept(r.id)}
              >
                Accept
              </Button>
            )}
          </HStack>
        </Flex>
      ))}
      {requests.length === 0 && (
        <Flex h="80px" align="center" justify="center">
          <Text fontSize="12px" color="gray.300">
            No pending inspection requests
          </Text>
        </Flex>
      )}
    </VStack>
  </Box>
);

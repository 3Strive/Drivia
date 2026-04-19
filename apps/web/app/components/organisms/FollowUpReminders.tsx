import React from 'react';
import { Box, Flex, Text, HStack, VStack, Button } from '@chakra-ui/react';
import { UserAvatar } from '../atoms/UserAvatar';
import { PhoneIco, MessageIco, CheckIco } from '../atoms/icons';
import { COLORS } from '../atoms/palette';

export interface FollowUp {
  id: string;
  name: string;
  phone: string;
  note: string;
  dueIn: string;
  overdue: boolean;
  avatar?: string;
}

interface FollowUpRemindersProps {
  items: FollowUp[];
  onCall: (id: string) => void;
  onMessage: (id: string) => void;
  onDone: (id: string) => void;
}

export const FollowUpReminders = ({ items, onCall, onMessage, onDone }: FollowUpRemindersProps) => (
  <Box bg="white" borderRadius="16px" p="22px" boxShadow="0 2px 10px rgba(0,0,0,0.05)">
    <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">Follow-ups</Text>
    <Text fontSize="12px" color="gray.400" mb="16px">Scheduled reminders</Text>
    <VStack gap="10px" align="stretch">
      {items.map(f => (
        <Flex key={f.id} align="center" gap="12px" p="12px" borderRadius="12px"
          bg={f.overdue ? '#FFF5F5' : 'gray.50'} border="1px solid"
          borderColor={f.overdue ? 'red.100' : 'gray.100'}>
          <UserAvatar src={f.avatar} fallback={f.name[0]} size="sm" />
          <Box flex="1" minW="0">
            <Text fontSize="13px" fontWeight="700" color="gray.800">{f.name}</Text>
            <Text fontSize="11px" color="gray.500" noOfLines={1}>{f.note}</Text>
            <Text fontSize="10px" color={f.overdue ? 'red.400' : 'gray.400'} fontWeight="700" mt="2px">
              {f.overdue ? '⚠️ Overdue · ' : '🕐 '}{f.dueIn}
            </Text>
          </Box>
          <HStack gap="6px">
            <Box as="button" w="28px" h="28px" borderRadius="7px" bg="white"
              border="1px solid" borderColor="gray.200" display="flex"
              alignItems="center" justifyContent="center" color="gray.500"
              _hover={{ color: COLORS.primary, borderColor: COLORS.primary }}
              onClick={() => onCall(f.id)}><PhoneIco /></Box>
            <Box as="button" w="28px" h="28px" borderRadius="7px" bg="white"
              border="1px solid" borderColor="gray.200" display="flex"
              alignItems="center" justifyContent="center" color="gray.500"
              _hover={{ color: COLORS.primary, borderColor: COLORS.primary }}
              onClick={() => onMessage(f.id)}><MessageIco /></Box>
            <Box as="button" w="28px" h="28px" borderRadius="7px"
              bg={COLORS.primary} display="flex" alignItems="center"
              justifyContent="center" color="white"
              _hover={{ bg: COLORS.primaryDark }}
              onClick={() => onDone(f.id)}><CheckIco /></Box>
          </HStack>
        </Flex>
      ))}
      {items.length === 0 && (
        <Flex h="80px" align="center" justify="center">
          <Text fontSize="12px" color="gray.300">No follow-ups due ✅</Text>
        </Flex>
      )}
    </VStack>
  </Box>
);

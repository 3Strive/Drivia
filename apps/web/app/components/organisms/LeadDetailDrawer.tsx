import React from 'react';
import { Box, Flex, Text, HStack, VStack, Input, Textarea, Button } from '@chakra-ui/react';
import { CloseIco, PhoneIco, MessageIco, CarIco } from '../atoms/icons';
import { StatusBadge } from '../atoms/StatusBadge';
import { UserAvatar } from '../atoms/UserAvatar';
import { COLORS } from '../atoms/palette';
import { Lead } from './LeadKanbanBoard';

interface LeadDetailDrawerProps {
  lead: Lead | null;
  onClose: () => void;
}

const timeline = [
  { action: 'Enquired via WhatsApp', time: '2 hours ago', icon: '💬' },
  { action: 'Viewed listing 3 times', time: '1 hour ago', icon: '👁️' },
  { action: 'Requested price negotiation', time: '30 min ago', icon: '🤝' },
];

export const LeadDetailDrawer = ({ lead, onClose }: LeadDetailDrawerProps) => {
  if (!lead) return null;
  return (
    <>
      <Box position="fixed" inset="0" bg="rgba(0,0,0,0.3)" zIndex={90} onClick={onClose} />
      <Box
        position="fixed" right="0" top="0" h="100vh" w="360px" bg="white"
        zIndex={95} boxShadow="-10px 0 40px rgba(0,0,0,0.1)"
        display="flex" flexDirection="column"
      >
        {/* Header */}
        <Flex p="20px 24px" justify="space-between" align="center" borderBottom="1px solid" borderColor="gray.100">
          <Text fontSize="16px" fontWeight="800" color="gray.800">Lead Details</Text>
          <Box as="button" onClick={onClose} color="gray.400"><CloseIco /></Box>
        </Flex>

        <Box flex="1" overflowY="auto" p="20px 24px">
          {/* Contact */}
          <HStack gap="12px" mb="20px">
            <UserAvatar src={lead.avatar} fallback={lead.name[0]} size="md" />
            <Box>
              <Text fontSize="15px" fontWeight="800" color="gray.800">{lead.name}</Text>
              <Text fontSize="12px" color="gray.400">{lead.phone}</Text>
              <HStack mt="4px" gap="4px">
                <Box w="8px" h="8px" borderRadius="2px" bg={lead.platformColor} />
                <Text fontSize="11px" color="gray.400">{lead.platform}</Text>
              </HStack>
            </Box>
          </HStack>

          {/* Car interest */}
          <Box bg="gray.50" borderRadius="12px" p="14px" mb="16px">
            <Text fontSize="11px" color="gray.400" fontWeight="700" textTransform="uppercase" mb="6px">
              Interested In
            </Text>
            <HStack gap="8px">
              <Box color={COLORS.primary}><CarIco /></Box>
              <Text fontSize="13px" fontWeight="700" color="gray.800">{lead.car}</Text>
            </HStack>
            <Text fontSize="12px" color="gray.500" mt="4px">Budget: {lead.budget}</Text>
          </Box>

          {/* Actions */}
          <HStack gap="8px" mb="20px">
            <Button flex="1" bg={COLORS.whatsapp} color="white" borderRadius="10px"
              fontSize="12px" fontWeight="700" h="36px" _hover={{ opacity: 0.9 }}
              display="flex" alignItems="center" gap="6px">
              <PhoneIco /> Call
            </Button>
            <Button flex="1" bg={COLORS.primary} color="white" borderRadius="10px"
              fontSize="12px" fontWeight="700" h="36px" _hover={{ opacity: 0.9 }}
              display="flex" alignItems="center" gap="6px">
              <MessageIco /> Message
            </Button>
          </HStack>

          {/* Timeline */}
          <Text fontSize="12px" fontWeight="700" color="gray.600" textTransform="uppercase" mb="10px">
            Activity
          </Text>
          <VStack gap="0" align="stretch" mb="20px">
            {timeline.map((t, i) => (
              <Flex key={i} gap="10px" pb="12px">
                <Flex w="28px" h="28px" borderRadius="50%" bg="gray.100"
                  align="center" justify="center" fontSize="12px" flexShrink={0}>
                  {t.icon}
                </Flex>
                <Box>
                  <Text fontSize="12px" fontWeight="600" color="gray.700">{t.action}</Text>
                  <Text fontSize="11px" color="gray.400">{t.time}</Text>
                </Box>
              </Flex>
            ))}
          </VStack>

          {/* Note */}
          <Text fontSize="12px" fontWeight="700" color="gray.600" textTransform="uppercase" mb="8px">
            Add Note
          </Text>
          <Textarea
            placeholder="Note something about this lead..."
            borderRadius="10px" fontSize="13px" rows={3}
            border="1px solid" borderColor="gray.200"
            _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }}
            mb="10px"
          />
          <Button bg={COLORS.primary} color="white" borderRadius="10px"
            fontSize="12px" fontWeight="700" w="100%" h="36px" _hover={{ opacity: 0.9 }}>
            Save Note
          </Button>
        </Box>
      </Box>
    </>
  );
};

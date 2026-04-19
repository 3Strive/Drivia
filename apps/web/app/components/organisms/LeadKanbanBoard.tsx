import React, { useState } from 'react';
import { Box, Flex, Text, HStack, VStack, Badge } from '@chakra-ui/react';
import { COLORS } from '../atoms/palette';
import { UserAvatar } from '../atoms/UserAvatar';
import { PhoneIco, MessageIco } from '../atoms/icons';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  car: string;
  platform: string;
  platformColor: string;
  budget: string;
  time: string;
  avatar?: string;
}

type KanbanColumn = 'new' | 'contacted' | 'viewing' | 'negotiating' | 'sold' | 'lost';

const COLUMNS: { key: KanbanColumn; label: string; color: string }[] = [
  { key: 'new',         label: '🆕 New',          color: '#6C63FF' },
  { key: 'contacted',   label: '📞 Contacted',     color: '#3182CE' },
  { key: 'viewing',     label: '👁️ Viewing',        color: '#DD6B20' },
  { key: 'negotiating', label: '🤝 Negotiating',   color: '#805AD5' },
  { key: 'sold',        label: '✅ Sold',           color: '#276749' },
  { key: 'lost',        label: '❌ Lost',           color: '#9B2C2C' },
];

interface LeadKanbanBoardProps {
  leads: Record<KanbanColumn, Lead[]>;
  onLeadClick: (lead: Lead) => void;
  onMove: (id: string, from: KanbanColumn, to: KanbanColumn) => void;
}

const LeadCard = ({ lead, onClick }: { lead: Lead; onClick: () => void }) => (
  <Box
    bg="white" borderRadius="12px" p="12px" mb="8px" cursor="pointer"
    boxShadow="0 1px 6px rgba(0,0,0,0.07)" border="1px solid" borderColor="gray.100"
    _hover={{ boxShadow: '0 4px 16px rgba(0,0,0,0.12)', borderColor: 'gray.200' }}
    transition="all 0.15s" onClick={onClick}
  >
    <Flex justify="space-between" align="flex-start" mb="8px">
      <HStack gap="8px">
        <UserAvatar src={lead.avatar} fallback={lead.name[0]} size="xs" />
        <Box>
          <Text fontSize="13px" fontWeight="700" color="gray.800">{lead.name}</Text>
          <Text fontSize="11px" color="gray.400">{lead.phone}</Text>
        </Box>
      </HStack>
      <Box w="8px" h="8px" borderRadius="50%" bg={lead.platformColor} flexShrink={0} mt="4px" />
    </Flex>
    <Text fontSize="12px" color="gray.600" fontWeight="600" mb="6px">🚗 {lead.car}</Text>
    <Flex justify="space-between" align="center">
      <Text fontSize="11px" color="gray.400">{lead.budget}</Text>
      <Text fontSize="10px" color="gray.300">{lead.time}</Text>
    </Flex>
    <HStack gap="6px" mt="8px">
      <Box as="button" p="4px 8px" borderRadius="6px" bg="gray.50" color="gray.500"
        fontSize="11px" display="flex" alignItems="center" gap="3px"
        _hover={{ bg: '#E9E8FF', color: COLORS.primary }}>
        <PhoneIco /> Call
      </Box>
      <Box as="button" p="4px 8px" borderRadius="6px" bg="gray.50" color="gray.500"
        fontSize="11px" display="flex" alignItems="center" gap="3px"
        _hover={{ bg: '#E9E8FF', color: COLORS.primary }}>
        <MessageIco /> Message
      </Box>
    </HStack>
  </Box>
);

export const LeadKanbanBoard = ({ leads, onLeadClick, onMove }: LeadKanbanBoardProps) => (
  <Box overflowX="auto" pb="8px">
    <Flex gap="12px" minW="fit-content">
      {COLUMNS.map(col => {
        const colLeads = leads[col.key] || [];
        return (
          <Box key={col.key} w="220px" flexShrink={0}>
            <Flex align="center" justify="space-between" mb="10px">
              <Text fontSize="12px" fontWeight="700" color="gray.700">{col.label}</Text>
              <Badge bg={`${col.color}20`} color={col.color} borderRadius="20px"
                fontSize="10px" fontWeight="800" px="7px">{colLeads.length}</Badge>
            </Flex>
            <Box bg="gray.50" borderRadius="12px" p="8px" minH="120px">
              {colLeads.map(lead => (
                <LeadCard key={lead.id} lead={lead} onClick={() => onLeadClick(lead)} />
              ))}
              {colLeads.length === 0 && (
                <Flex h="80px" align="center" justify="center">
                  <Text fontSize="11px" color="gray.300">No leads</Text>
                </Flex>
              )}
            </Box>
          </Box>
        );
      })}
    </Flex>
  </Box>
);

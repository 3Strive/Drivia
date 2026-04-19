import React from 'react';
import { Box, Flex, Text, HStack, Grid } from '@chakra-ui/react';
import { StatusBadge } from '../atoms/StatusBadge';

export interface BroadcastCampaign {
  id: string;
  message: string;
  platforms: string[];
  sentAt: string;
  reach: number;
  opened: number;
  replies: number;
  status: 'sent' | 'scheduled' | 'failed';
}

const PLATFORM_COLORS: Record<string, string> = {
  whatsapp: '#25D366', facebook: '#1877F2', instagram: '#E1306C', sms: '#718096',
};

const STATUS_MAP: Record<string, 'success' | 'primary' | 'danger'> = {
  sent: 'success', scheduled: 'primary', failed: 'danger',
};

interface BroadcastHistoryListProps {
  campaigns: BroadcastCampaign[];
}

export const BroadcastHistoryList = ({ campaigns }: BroadcastHistoryListProps) => (
  <Box bg="white" borderRadius="16px" p="22px" boxShadow="0 2px 10px rgba(0,0,0,0.05)">
    <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">Broadcast History</Text>
    <Text fontSize="12px" color="gray.400" mb="16px">Past and scheduled campaigns</Text>
    <Grid templateColumns="2.5fr 1fr 1fr 1fr 1fr 80px" gap="0">
      {['Message', 'Channels', 'Reach', 'Opened', 'Replies', 'Status'].map(h => (
        <Text key={h} fontSize="10px" fontWeight="700" color="gray.400"
          textTransform="uppercase" letterSpacing="0.4px" pb="10px"
          borderBottom="1px solid" borderColor="gray.100">{h}</Text>
      ))}
      {campaigns.map(c => (
        <React.Fragment key={c.id}>
          <Box py="12px" borderBottom="1px solid" borderColor="gray.50" pr="12px">
            <Text fontSize="12px" fontWeight="600" color="gray.800" noOfLines={1}>{c.message}</Text>
            <Text fontSize="11px" color="gray.400">{c.sentAt}</Text>
          </Box>
          <Flex align="center" gap="4px" py="12px" borderBottom="1px solid" borderColor="gray.50">
            {c.platforms.map(p => (
              <Box key={p} w="14px" h="14px" borderRadius="3px" bg={PLATFORM_COLORS[p] || '#CBD5E0'} />
            ))}
          </Flex>
          <Flex align="center" py="12px" borderBottom="1px solid" borderColor="gray.50">
            <Text fontSize="13px" fontWeight="700" color="gray.800">{c.reach}</Text>
          </Flex>
          <Flex align="center" py="12px" borderBottom="1px solid" borderColor="gray.50">
            <Text fontSize="13px" fontWeight="700" color="gray.800">
              {Math.round((c.opened / c.reach) * 100)}%
            </Text>
          </Flex>
          <Flex align="center" py="12px" borderBottom="1px solid" borderColor="gray.50">
            <Text fontSize="13px" fontWeight="700" color="gray.800">{c.replies}</Text>
          </Flex>
          <Flex align="center" py="12px" borderBottom="1px solid" borderColor="gray.50">
            <StatusBadge status={STATUS_MAP[c.status]}>
              {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
            </StatusBadge>
          </Flex>
        </React.Fragment>
      ))}
    </Grid>
  </Box>
);

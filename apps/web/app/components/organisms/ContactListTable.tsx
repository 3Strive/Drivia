import React from 'react';
import { Box, Flex, Text, HStack, Grid } from '@chakra-ui/react';
import { UserAvatar } from '../atoms/UserAvatar';
import { StatusBadge } from '../atoms/StatusBadge';
import { PhoneIco, MessageIco, EditIco } from '../atoms/icons';
import { COLORS } from '../atoms/palette';

export interface Contact {
  id: string;
  name: string;
  phone: string;
  platform: string;
  platformColor: string;
  carsBought: number;
  totalSpent: number;
  lastContact: string;
  tags: 'VIP' | 'Repeat' | 'New' | 'Inactive';
  avatar?: string;
}

interface ContactListTableProps {
  contacts: Contact[];
  onEdit: (id: string) => void;
}

const TAG_STATUS: Record<
  string,
  'success' | 'warning' | 'primary' | 'neutral'
> = {
  VIP: 'warning',
  Repeat: 'success',
  New: 'primary',
  Inactive: 'neutral',
};

const HEADERS = [
  'Contact',
  'Platform',
  'Cars Bought',
  'Total Spent',
  'Last Contact',
  'Tags',
  '',
];

export const ContactListTable = ({
  contacts,
  onEdit,
}: ContactListTableProps) => (
  <Box
    bg="white"
    borderRadius="16px"
    p="22px"
    boxShadow="0 2px 10px rgba(0,0,0,0.05)"
    mb="16px"
  >
    <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">
      All Contacts
    </Text>
    <Text fontSize="12px" color="gray.400" mb="16px">
      Your full customer book
    </Text>
    <Box overflowX="auto">
      <Grid
        templateColumns="2fr 1fr 1fr 1.2fr 1.2fr 1fr 80px"
        gap="0"
        minW="700px"
      >
        {HEADERS.map((h) => (
          <Text
            key={h}
            fontSize="10px"
            fontWeight="700"
            color="gray.400"
            textTransform="uppercase"
            letterSpacing="0.4px"
            pb="10px"
            borderBottom="1px solid"
            borderColor="gray.100"
          >
            {h}
          </Text>
        ))}
        {contacts.map((c) => (
          <React.Fragment key={c.id}>
            <Flex
              align="center"
              gap="10px"
              py="12px"
              borderBottom="1px solid"
              borderColor="gray.50"
            >
              <UserAvatar src={c.avatar} fallback={c.name[0]} size="sm" />
              <Box>
                <Text fontSize="13px" fontWeight="700" color="gray.800">
                  {c.name}
                </Text>
                <Text fontSize="11px" color="gray.400">
                  {c.phone}
                </Text>
              </Box>
            </Flex>
            <Flex
              align="center"
              py="12px"
              borderBottom="1px solid"
              borderColor="gray.50"
            >
              <HStack gap="5px">
                <Box w="8px" h="8px" borderRadius="2px" bg={c.platformColor} />
                <Text fontSize="12px" color="gray.600">
                  {c.platform}
                </Text>
              </HStack>
            </Flex>
            <Flex
              align="center"
              py="12px"
              borderBottom="1px solid"
              borderColor="gray.50"
            >
              <Text fontSize="13px" fontWeight="700" color="gray.800">
                {c.carsBought}
              </Text>
            </Flex>
            <Flex
              align="center"
              py="12px"
              borderBottom="1px solid"
              borderColor="gray.50"
            >
              <Text fontSize="12px" fontWeight="700" color={COLORS.primary}>
                ₦{(c.totalSpent / 1_000_000).toFixed(1)}M
              </Text>
            </Flex>
            <Flex
              align="center"
              py="12px"
              borderBottom="1px solid"
              borderColor="gray.50"
            >
              <Text fontSize="12px" color="gray.500">
                {c.lastContact}
              </Text>
            </Flex>
            <Flex
              align="center"
              py="12px"
              borderBottom="1px solid"
              borderColor="gray.50"
            >
              <StatusBadge status={TAG_STATUS[c.tags]}>{c.tags}</StatusBadge>
            </Flex>
            <Flex
              align="center"
              gap="6px"
              py="12px"
              borderBottom="1px solid"
              borderColor="gray.50"
            >
              <Box
                as="button"
                color="gray.400"
                _hover={{ color: COLORS.primary }}
              >
                <PhoneIco />
              </Box>
              <Box
                as="button"
                color="gray.400"
                _hover={{ color: COLORS.primary }}
              >
                <MessageIco />
              </Box>
              <Box
                as="button"
                color="gray.400"
                _hover={{ color: COLORS.primary }}
                onClick={() => onEdit(c.id)}
              >
                <EditIco />
              </Box>
            </Flex>
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  </Box>
);

import React, { useState } from 'react';
import { Box, Flex, Text, Textarea, HStack, Button, VStack } from '@chakra-ui/react';
import { COLORS } from '../atoms/palette';
import { UploadIco, ShareIco } from '../atoms/icons';

const PLATFORMS = [
  { key: 'whatsapp', label: 'WhatsApp', color: '#25D366', icon: 'W' },
  { key: 'facebook', label: 'Facebook', color: '#1877F2', icon: 'f' },
  { key: 'instagram', label: 'Instagram', color: '#E1306C', icon: 'ig' },
  { key: 'sms', label: 'SMS', color: '#718096', icon: 'S' },
];

const VARIABLES = ['{name}', '{car}', '{price}', '{dealership}'];

interface BroadcastComposerProps {
  onSend: (message: string, platforms: string[], schedule: string) => void;
}

export const BroadcastComposer = ({ onSend }: BroadcastComposerProps) => {
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState<string[]>(['whatsapp']);
  const [schedule, setSchedule] = useState('now');

  const toggle = (key: string) =>
    setSelected(s => s.includes(key) ? s.filter(k => k !== key) : [...s, key]);

  const insertVar = (v: string) => setMessage(m => m + v);

  return (
    <Box bg="white" borderRadius="16px" p="22px" boxShadow="0 2px 10px rgba(0,0,0,0.05)" mb="16px">
      <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">Compose Broadcast</Text>
      <Text fontSize="12px" color="gray.400" mb="16px">Send a message to all your contacts on selected platforms</Text>

      {/* Platform toggles */}
      <Text fontSize="11px" fontWeight="700" color="gray.500" textTransform="uppercase" mb="8px">
        Channels
      </Text>
      <HStack gap="8px" mb="16px" flexWrap="wrap">
        {PLATFORMS.map(p => {
          const active = selected.includes(p.key);
          return (
            <Flex key={p.key} as="button" align="center" gap="6px"
              px="12px" py="7px" borderRadius="10px" border="2px solid"
              borderColor={active ? p.color : 'gray.200'}
              bg={active ? `${p.color}10` : 'white'}
              onClick={() => toggle(p.key)} transition="all 0.15s">
              <Flex w="20px" h="20px" borderRadius="5px" bg={active ? p.color : 'gray.200'}
                align="center" justify="center">
                <Text fontSize="8px" color="white" fontWeight="900">{p.icon}</Text>
              </Flex>
              <Text fontSize="12px" fontWeight="700" color={active ? p.color : 'gray.500'}>
                {p.label}
              </Text>
            </Flex>
          );
        })}
      </HStack>

      {/* Variable tags */}
      <Text fontSize="11px" fontWeight="700" color="gray.500" textTransform="uppercase" mb="8px">
        Insert Variable
      </Text>
      <HStack gap="6px" mb="12px" flexWrap="wrap">
        {VARIABLES.map(v => (
          <Box key={v} as="button" px="10px" py="4px" borderRadius="6px"
            bg={`${COLORS.primary}10`} color={COLORS.primary}
            fontSize="12px" fontWeight="700"
            _hover={{ bg: `${COLORS.primary}20` }}
            onClick={() => insertVar(v)}>{v}</Box>
        ))}
      </HStack>

      {/* Message editor */}
      <Textarea
        placeholder="Hi {name}, we have a 2021 Toyota Camry at ₦12.5M. Reply to book a viewing!"
        value={message} onChange={e => setMessage(e.target.value)}
        borderRadius="12px" fontSize="13px" rows={5}
        border="1px solid" borderColor="gray.200" mb="4px"
        _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }}
      />
      <Text fontSize="11px" color="gray.400" mb="16px">{message.length} characters</Text>

      {/* Schedule + media */}
      <Flex gap="10px" align="center" flexWrap="wrap">
        <Box as="button" px="14px" py="7px" borderRadius="10px" border="1px solid"
          borderColor="gray.200" fontSize="12px" fontWeight="600" color="gray.600"
          display="flex" alignItems="center" gap="6px" _hover={{ bg: 'gray.50' }}>
          <UploadIco /> Attach Media
        </Box>
        <HStack gap="6px">
          {['now', 'later'].map(s => (
            <Box key={s} as="button" px="14px" py="7px" borderRadius="10px"
              bg={schedule === s ? COLORS.primary : 'gray.100'}
              color={schedule === s ? 'white' : 'gray.500'}
              fontSize="12px" fontWeight="700"
              onClick={() => setSchedule(s)}>
              {s === 'now' ? '⚡ Send Now' : '🕐 Schedule'}
            </Box>
          ))}
        </HStack>
        <Box flex="1" />
        <Button bg={COLORS.primary} color="white" borderRadius="10px"
          fontSize="13px" fontWeight="700" h="38px" px="20px"
          _hover={{ bg: COLORS.primaryDark }}
          display="flex" alignItems="center" gap="6px"
          onClick={() => onSend(message, selected, schedule)}>
          <ShareIco /> Broadcast
        </Button>
      </Flex>
    </Box>
  );
};

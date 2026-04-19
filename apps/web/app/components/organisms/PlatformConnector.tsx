import React from 'react';
import { Box, Flex, Text, HStack, Button } from '@chakra-ui/react';
import { CheckIco } from '../atoms/icons';
import { COLORS } from '../atoms/palette';

const PLATFORMS = [
  { key: 'facebook',  label: 'Facebook Page',         color: '#1877F2', icon: 'f',  desc: 'Post listings and receive DMs' },
  { key: 'instagram', label: 'Instagram Business',    color: '#E1306C', icon: 'ig', desc: 'Share photos and story posts' },
  { key: 'whatsapp',  label: 'WhatsApp Business API', color: '#25D366', icon: 'W',  desc: 'Auto-replies and broadcasts' },
];

interface PlatformConnectorProps {
  connected: string[];
  onConnect: (key: string) => void;
  onDisconnect: (key: string) => void;
}

export const PlatformConnector = ({ connected, onConnect, onDisconnect }: PlatformConnectorProps) => (
  <Box bg="white" borderRadius="16px" p="22px" boxShadow="0 2px 10px rgba(0,0,0,0.05)" mb="16px">
    <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">Connected Platforms</Text>
    <Text fontSize="12px" color="gray.400" mb="16px">Link your social accounts to post directly from Drivia</Text>
    <Flex gap="12px" flexWrap="wrap">
      {PLATFORMS.map(p => {
        const isConnected = connected.includes(p.key);
        return (
          <Box key={p.key} flex="1" minW="180px" p="16px" borderRadius="14px"
            border="2px solid" borderColor={isConnected ? p.color : 'gray.150'}
            bg={isConnected ? `${p.color}06` : 'gray.50'}>
            <Flex align="center" justify="space-between" mb="8px">
              <Flex w="36px" h="36px" borderRadius="10px" bg={p.color}
                align="center" justify="center">
                <Text fontSize="12px" color="white" fontWeight="900">{p.icon}</Text>
              </Flex>
              {isConnected && (
                <Flex w="20px" h="20px" borderRadius="50%" bg="#C6F6D5"
                  align="center" justify="center" color="#276749">
                  <CheckIco />
                </Flex>
              )}
            </Flex>
            <Text fontSize="13px" fontWeight="700" color="gray.800" mb="3px">{p.label}</Text>
            <Text fontSize="11px" color="gray.500" mb="12px">{p.desc}</Text>
            <Button
              w="100%" h="32px" borderRadius="8px" fontSize="12px" fontWeight="700"
              bg={isConnected ? 'white' : p.color}
              color={isConnected ? 'red.400' : 'white'}
              border={isConnected ? '1px solid' : 'none'}
              borderColor="red.100"
              _hover={{ opacity: 0.9 }}
              onClick={() => isConnected ? onDisconnect(p.key) : onConnect(p.key)}
            >
              {isConnected ? 'Disconnect' : 'Connect'}
            </Button>
          </Box>
        );
      })}
    </Flex>
  </Box>
);

import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Input,
  Button,
  Checkbox,
} from '@chakra-ui/react';
import { COLORS } from '../../atoms/palette';
import { UserIco, EyeIco, ShieldIco } from '../../atoms/icons';

// ─── AUTH SHELL ───────────────────────────────────────────────────────────────
export const AuthShell = ({ children }: { children: React.ReactNode }) => (
  <Flex minH="100vh" bg={COLORS.bg}>
    {/* Left Hero */}
    <Box
      display={{ base: 'none', md: 'flex' }}
      flexDirection="column"
      w="420px"
      flexShrink={0}
      bg={COLORS.primary}
      p="48px"
      justifyContent="space-between"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-60px"
        right="-60px"
        w="300px"
        h="300px"
        borderRadius="50%"
        bg="rgba(255,255,255,0.08)"
      />
      <Box
        position="absolute"
        bottom="-80px"
        left="-40px"
        w="240px"
        h="240px"
        borderRadius="50%"
        bg="rgba(255,255,255,0.05)"
      />
      <Box>
        <HStack gap="10px" mb="48px">
          <Flex
            w="36px"
            h="36px"
            borderRadius="10px"
            bg="rgba(255,255,255,0.2)"
            align="center"
            justify="center"
            color="white"
          >
            <ShieldIco />
          </Flex>
          <Text fontSize="20px" fontWeight="900" color="white">
            Drivia
          </Text>
        </HStack>
        <Text
          fontSize="28px"
          fontWeight="900"
          color="white"
          lineHeight="1.2"
          mb="16px"
        >
          The smarter way to run your dealership
        </Text>
        <Text fontSize="14px" color="rgba(255,255,255,0.75)" lineHeight="1.6">
          Track leads, manage inventory, broadcast to buyers, and grow sales —
          all in one place.
        </Text>
      </Box>
      <Box bg="rgba(255,255,255,0.1)" borderRadius="14px" p="18px">
        <Text fontSize="13px" color="white" fontStyle="italic" mb="10px">
          "Drivia helped me sell 3x more cars in one month. The WhatsApp
          tracking alone is worth it."
        </Text>
        <HStack gap="8px">
          <Flex
            w="32px"
            h="32px"
            borderRadius="50%"
            bg="rgba(255,255,255,0.3)"
            align="center"
            justify="center"
            color="white"
            fontSize="12px"
            fontWeight="800"
          >
            A
          </Flex>
          <Box>
            <Text fontSize="12px" color="white" fontWeight="700">
              Adebayo Okafor
            </Text>
            <Text fontSize="11px" color="rgba(255,255,255,0.6)">
              Premium Auto, Lagos
            </Text>
          </Box>
        </HStack>
      </Box>
    </Box>
    {/* Right Form */}
    <Flex flex="1" align="center" justify="center" p="40px">
      <Box w="100%" maxW="400px">
        {children}
      </Box>
    </Flex>
  </Flex>
);

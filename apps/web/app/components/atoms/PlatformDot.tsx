import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

// ─── PLATFORM COLOR DOT ───────────────────────────────────────────────────────
interface PlatformDotProps {
  color: string;
  label: string;
}

export const PlatformDot = ({ color, label }: PlatformDotProps) => (
  <Box
    w="26px"
    h="26px"
    borderRadius="7px"
    bg={color}
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexShrink={0}
  >
    <Text fontSize="9px" color="white" fontWeight="900">
      {label === 'WhatsApp' ? (
        <FaWhatsapp size={16} />
      ) : label === 'Facebook' ? (
        <FaFacebook size={16} />
      ) : label === 'Instagram' ? (
        <FaInstagram size={16} />
      ) : (
        label[0]
      )}
    </Text>
  </Box>
);

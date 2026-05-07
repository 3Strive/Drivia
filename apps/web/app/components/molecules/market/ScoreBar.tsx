import { Box, Flex, Text } from '@chakra-ui/react';

// ─── SCORE BAR ────────────────────────────────────────────────────────────────
export function ScoreBar({ label, value }: { label: string; value: number }) {
  const color = value >= 8 ? '#16a34a' : value >= 6 ? '#d97706' : '#dc2626';
  return (
    <Flex align="center" gap="8px" mb="5px">
      <Text fontSize="11px" color="whiteAlpha.500" w="90px" flexShrink={0}>
        {label}
      </Text>
      <Box
        flex={1}
        h="4px"
        bg="whiteAlpha.100"
        borderRadius="2px"
        overflow="hidden"
      >
        <Box h="100%" w={`${value * 10}%`} bg={color} borderRadius="2px" />
      </Box>
      <Text
        fontSize="11px"
        fontWeight={700}
        color={color}
        w="20px"
        textAlign="right"
      >
        {value}
      </Text>
    </Flex>
  );
}

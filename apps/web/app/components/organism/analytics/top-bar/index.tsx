import { Box, Button, Flex, Heading, HStack, Text } from '@chakra-ui/react';

export const TopBar = ({ period, setPeriod, PERIODS }: any) => (
  <Flex
    justify="space-between"
    p="16px"
    bg="white"
    borderBottom="1px solid #eee"
  >
    <Box>
      <Text fontSize="11px" color="gray.400">
        Drivia / Analytics
      </Text>
      <Heading fontSize="22px">Analytics</Heading>
    </Box>
    <HStack>
      {PERIODS.map((p: string) => (
        <Button
          key={p}
          onClick={() => setPeriod(p)}
          size="sm"
          variant={period === p ? 'solid' : 'ghost'}
        >
          {p}
        </Button>
      ))}
    </HStack>
  </Flex>
);

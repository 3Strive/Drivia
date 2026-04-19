import React from 'react';
import { Flex, Box, Text, Heading } from '@chakra-ui/react';
import { TopBarActions } from './TopBarActions';

// ─── PAGE TOP BAR (breadcrumb + title + actions) ───────────────────────────────
interface PageTopBarProps {
  breadcrumb: string;
  title: string;
  children?: React.ReactNode; // e.g. PeriodSelector or action buttons
}

export const PageTopBar = ({ breadcrumb, title, children }: PageTopBarProps) => (
  <Flex
    align="center"
    justify="space-between"
    px="32px"
    py="16px"
    bg="white"
    borderBottom="1px solid"
    borderColor="gray.100"
    position="sticky"
    top="0"
    zIndex="10"
  >
    <Box>
      <Text fontSize="11px" color="gray.400">
        {breadcrumb}
      </Text>
      <Heading fontSize="22px" fontWeight="800" color="gray.800" mt="1px">
        {title}
      </Heading>
    </Box>
    <TopBarActions>{children}</TopBarActions>
  </Flex>
);

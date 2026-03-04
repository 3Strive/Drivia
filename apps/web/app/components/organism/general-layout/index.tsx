'use client';

import { Box, HStack } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

import SideBar from '../sidebar';

type GeneralLayoutProps = {
  children: ReactNode;
};

const GeneralLayout = ({ children }: GeneralLayoutProps) => (
  <HStack align="start" gap={0}>
    <SideBar />
    <Box p={6} minH="100vh" w="full">
      {children}
    </Box>
  </HStack>
);

export default GeneralLayout;

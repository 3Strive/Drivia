'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { system } from '@chakra-ui/react/preset';
import React, { FC } from 'react';

export const Provider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
};

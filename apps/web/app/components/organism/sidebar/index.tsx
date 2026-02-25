'use client';

import { Box, Button, HStack, Separator, Text, VStack } from '@chakra-ui/react';
import {
  Cart,
  CreditCard,
  Home,
  LogOut,
  ShareAndroid,
  StatsUpSquare,
  User,
} from 'iconoir-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SideBar = () => {
  const [activeId, setActiveId] = useState(1);
  const router = useRouter();

  const Links = [
    {
      id: 1,
      name: 'Dashboard',
      link: '#',
      icon: <Home />,
    },
    {
      id: 2,
      name: 'MarketPlace',
      link: '#',
      icon: <Cart />,
    },
    {
      id: 3,
      name: 'Manage Socials',
      link: '#',
      icon: <StatsUpSquare />,
    },
    { id: 4, name: 'Plans', link: '#', icon: <CreditCard /> },
    { id: 5, name: 'Profile', link: '#', icon: <User /> },
    { id: 6, name: 'Logout', link: '#', icon: <LogOut /> },
  ];

  const handleClick = (id: number, link: string) => {
    setActiveId(id);

    if (link && link !== '#') {
      router.push(link);
    }
  };

  return (
    <VStack w={290} h={1152} background={'#FFFFFF'} p={4}>
      <Box>
        <VStack h={100} display={'flex'} justifyContent={'center'}>
          <Image
            src={'/assets/drivia-pro.svg'}
            alt={'drivia-pro'}
            width={127}
            height={26}
          />
        </VStack>

        <Separator w={290} />
      </Box>

      <VStack gap={6} mt={4} ml={10} w={259} h={316} p={5}>
        {Links.map((l) => (
          <HStack
            key={l.id}
            w={259}
            h={36}
            gapX={4}
            cursor="pointer"
            onClick={() => handleClick(l.id, l.link)}
            color={activeId === l.id ? '#2B3674' : '#A3AED0'}
          >
            <Box>{l.icon}</Box>
            <Text
              fontFamily={'ui-sans-serif'}
              fontSize={16}
              fontWeight={activeId === l.id ? '600' : '400'}
            >
              {l.name}
            </Text>
          </HStack>
        ))}
      </VStack>

      <VStack>
        <Button background={'#4212EC'} h={46} w={259} rounded={16}>
          Share Post <ShareAndroid />
        </Button>
      </VStack>
    </VStack>
  );
};

export default SideBar;

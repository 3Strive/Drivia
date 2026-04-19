import React from 'react';
import { HStack, Button } from '@chakra-ui/react';
import { BellIco, MoonIco, GridIco } from '../atoms/icons';
import { UserAvatar } from '../atoms/UserAvatar';

// ─── TOP BAR RIGHT-SIDE ACTIONS ───────────────────────────────────────────────
interface TopBarActionsProps {
  avatarSrc?: string;
  avatarFallback?: string;
  children?: React.ReactNode; // slot for period selector or other controls
}

export const TopBarActions = ({
  avatarSrc = 'https://i.pravatar.cc/40?img=47',
  avatarFallback = 'D',
  children,
}: TopBarActionsProps) => (
  <HStack gap="10px">
    {children}
    {([<BellIco />, <MoonIco />, <GridIco />] as JSX.Element[]).map((ic, i) => (
      <Button
        key={i}
        variant="ghost"
        p="2"
        borderRadius="10px"
        color="gray.500"
        _hover={{ bg: 'gray.100' }}
      >
        {ic}
      </Button>
    ))}
    <UserAvatar src={avatarSrc} fallback={avatarFallback} size="sm" />
  </HStack>
);

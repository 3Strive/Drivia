import React from 'react';
import { Avatar } from '@chakra-ui/react';

// ─── USER AVATAR ──────────────────────────────────────────────────────────────
interface UserAvatarProps {
  src?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const UserAvatar = ({ src, fallback = 'U', size = 'sm' }: UserAvatarProps) => (
  <Avatar.Root size={size}>
    {src && <Avatar.Image src={src} />}
    <Avatar.Fallback>{fallback}</Avatar.Fallback>
  </Avatar.Root>
);

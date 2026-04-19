import React from 'react';
import { Badge } from '@chakra-ui/react';

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
type Status = 'success' | 'warning' | 'danger' | 'neutral' | 'primary';

interface StatusBadgeProps {
  children: React.ReactNode;
  status?: Status;
}

const STATUS_STYLES: Record<Status, { bg: string; color: string }> = {
  success: { bg: '#C6F6D5', color: '#276749' },
  warning: { bg: '#FEFCBF', color: '#744210' },
  danger: { bg: '#FED7D7', color: '#9B2C2C' },
  neutral: { bg: '#EDF2F7', color: '#4A5568' },
  primary: { bg: '#E9E8FF', color: '#5B54E8' },
};

export const StatusBadge = ({ children, status = 'neutral' }: StatusBadgeProps) => {
  const s = STATUS_STYLES[status];
  return (
    <Badge
      bg={s.bg}
      color={s.color}
      borderRadius="6px"
      fontSize="11px"
      px="8px"
      py="2px"
      fontWeight="700"
    >
      {children}
    </Badge>
  );
};

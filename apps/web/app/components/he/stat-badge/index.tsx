import { Badge } from '@chakra-ui/react';

export type StatBadgeProps = {
  value: string;
  positive?: boolean;
};

export const StatBadge: React.FC<StatBadgeProps> = ({ value, positive }) => (
  <Badge
    bg={positive ? '#F0FFF4' : '#FFF5F5'}
    color={positive ? '#276749' : '#9B2C2C'}
    fontSize="10px"
    borderRadius="6px"
    px="6px"
  >
    {value}
  </Badge>
);

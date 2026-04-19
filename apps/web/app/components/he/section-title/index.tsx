import { Box, Text } from '@chakra-ui/react';

export type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
}) => (
  <Box>
    <Text fontWeight="800" fontSize="15px" color="gray.800">
      {title}
    </Text>
    {subtitle && (
      <Text fontSize="12px" color="gray.400">
        {subtitle}
      </Text>
    )}
  </Box>
);

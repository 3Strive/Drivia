import { Text } from '@chakra-ui/react';
import { Colors } from '../../ui/color-pack';

export const FieldLabel = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Text
      fontSize="12px"
      fontWeight="700"
      color={Colors.INK2}
      mb="6px"
      letterSpacing="0.2px"
    >
      {children}
    </Text>
  );
};

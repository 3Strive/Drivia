import { HStack, Button, Box } from '@chakra-ui/react';
import { Colors } from '../../ui/color-pack';

type NavButtonsProps = {
  onBack?: () => void;
  onNext: () => void;
  showBack?: boolean;
};

export const NavButtons = ({
  onBack,
  onNext,
  showBack = true,
}: NavButtonsProps): JSX.Element => {
  return (
    <HStack>
      {showBack && onBack && (
        <Box as="button" onClick={onBack}>
          Back
        </Box>
      )}

      <Button bg={Colors.P} color="white" onClick={onNext}>
        Continue
      </Button>
    </HStack>
  );
};

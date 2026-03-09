import { Button } from '@chakra-ui/react';

const P = '#6C63FF';
const P_DARK = '#5B54E8';

interface ShareButtonProps {
  openModal: () => void;
}

export function ShareButton({ openModal }: ShareButtonProps) {
  return (
    <Button
      bg={P}
      color="white"
      borderRadius="12px"
      fontSize="14px"
      fontWeight="700"
      h="46px"
      px="28px"
      _hover={{ bg: P_DARK }}
      onClick={openModal}
      boxShadow={`0 6px 20px ${P}55`}
    >
      Share Post
    </Button>
  );
}

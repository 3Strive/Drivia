import { Box } from '@chakra-ui/react';
import { CarListing, ShareModal } from '../share-modal';

interface ShareModalWrapperProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  listing: CarListing;
}

export function ShareModalWrapper({
  open,
  setOpen,
  listing,
}: ShareModalWrapperProps) {
  return (
    <Box>
      <ShareModal
        isOpen={open}
        onClose={() => setOpen(false)}
        listing={listing}
      />
    </Box>
  );
}

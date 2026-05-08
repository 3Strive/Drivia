import { Box, Button } from '@chakra-ui/react';
import { COLORS } from '../../atoms';
import { ShareModal } from './Sharemodal';
import { useState } from 'react';
import { CarListing } from '../../../shared/types';

// ─── DEMO WRAPPER (delete this in production) ─────────────────────────────────
const DEMO_LISTING: CarListing = {
  id: '1',
  title: '2021 Toyota Camry',
  make: 'Toyota',
  model: 'Camry',
  year: 2021,
  price: 16500000,
  mileage: 42000,
  condition: 'Tokunbo',
  location: 'Lekki, Lagos',
  phone: '08012345678',
  images: [
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=220&fit=crop',
  ],
  gradient: 'linear(to-br, #3F51B5, #6C63FF)',
  transmission: 'Automatic',
  fuelType: 'Petrol',
  description:
    'Well-maintained 2021 Toyota Camry with low mileage. Single owner, full service history, and no accidents. Features include leather seats, touchscreen display, rearview camera, and keyless entry. Perfect for city driving and long trips. Contact for more details or to schedule a test drive.',
  color: 'White',
  status: 'Available',
  postedAt: '2024-05-15T10:30:00Z',
  sharedTo: ['facebook'],
};

export default function ShareModalDemo(): JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <Box
      bg="#F4F5FA"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontFamily="'DM Sans', sans-serif"
    >
      <Button
        bg={COLORS.primary}
        color="white"
        borderRadius="12px"
        fontSize="14px"
        fontWeight="700"
        h="46px"
        px="28px"
        _hover={{ bg: COLORS.primaryDark }}
        onClick={() => setOpen(true)}
        boxShadow={`0 6px 20px ${COLORS.primary}55`}
      >
        Share Post Demo
      </Button>
      <ShareModal
        isOpen={open}
        onClose={() => setOpen(false)}
        listing={DEMO_LISTING}
      />
    </Box>
  );
}

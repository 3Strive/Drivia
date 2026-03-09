import { ReactNode, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { Sidebar } from '../../organism/sidebar';
import { ShareModalWrapper } from '../../molecules/btn-modal';
import { CarListing } from '../../molecules/share-modal';

const DEMO_LISTING: CarListing = {
  id: 1,
  title: '2021 Toyota Camry',
  make: 'Toyota',
  model: 'Camry',
  year: 2021,
  price: 16500000,
  mileage: 42000,
  condition: 'Tokunbo',
  location: 'Lekki, Lagos',
  phone: '08012345678',
  img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=220&fit=crop',
  gradient: 'linear(to-br, #3F51B5, #6C63FF)',
};
export default function AppLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <Flex h="100vh" overflow="hidden" fontFamily="'DM Sans', sans-serif">
      {/* ── Sidebar: always visible, sticky ── */}
      <ShareModalWrapper open={open} setOpen={setOpen} listing={DEMO_LISTING} />
      <Sidebar />

      {/* ── Page content: scrolls independently ── */}
      <Flex flex="1" overflow="auto" direction="column" bg="#F4F5FA">
        {children}
      </Flex>
    </Flex>
  );
}

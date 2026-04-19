'use client';

import React, { useState } from 'react';
import { Box, Grid, Flex, Text, HStack } from '@chakra-ui/react';
import AppLayout from '../components/template/general-layout';
import {
  CarListing,
  InventoryCarGrid,
} from '../components/organisms/InventoryCarGrid';
import {
  InventoryFilters,
  InventoryFiltersBar,
} from '../components/organisms/InventoryFiltersBar';
import { COLORS } from '../components/atoms';
import { PageTopBar } from '../components/molecules';
import { PageFooter, StockVelocityChart } from '../components/organisms';
import { AddCarModal } from '../components/organisms/AddCarModal';

const stockData = [
  { range: '0-7 days', count: 3 },
  { range: '8-14 days', count: 5 },
  { range: '15-30 days', count: 4 },
  { range: '31-60 days', count: 2 },
  { range: '60+ days', count: 1 },
];

const initialCars: CarListing[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2021,
    price: 12500000,
    mileage: 42000,
    bodyType: 'Sedan',
    status: 'available',
    daysListed: 8,
    views: 134,
    enquiries: 12,
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop',
  },
  {
    id: '2',
    make: 'Honda',
    model: 'CR-V',
    year: 2020,
    price: 14200000,
    mileage: 55000,
    bodyType: 'SUV',
    status: 'available',
    daysListed: 14,
    views: 89,
    enquiries: 7,
    img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop',
  },
  {
    id: '3',
    make: 'Lexus',
    model: 'RX350',
    year: 2019,
    price: 22000000,
    mileage: 38000,
    bodyType: 'SUV',
    status: 'reserved',
    daysListed: 5,
    views: 211,
    enquiries: 19,
    img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop',
  },
  {
    id: '4',
    make: 'Mercedes',
    model: 'C300',
    year: 2021,
    price: 28000000,
    mileage: 22000,
    bodyType: 'Sedan',
    status: 'available',
    daysListed: 22,
    views: 178,
    enquiries: 15,
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop',
  },
  {
    id: '5',
    make: 'Toyota',
    model: 'Highlander',
    year: 2022,
    price: 31000000,
    mileage: 18000,
    bodyType: 'SUV',
    status: 'available',
    daysListed: 3,
    views: 67,
    enquiries: 5,
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop',
  },
  {
    id: '6',
    make: 'Ford',
    model: 'Explorer',
    year: 2020,
    price: 18500000,
    mileage: 61000,
    bodyType: 'SUV',
    status: 'sold',
    daysListed: 67,
    views: 320,
    enquiries: 28,
    img: 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=400&h=250&fit=crop',
  },
];

export default function InventoryPage() {
  const [cars, setCars] = useState<CarListing[]>(initialCars);
  const [filters, setFilters] = useState<InventoryFilters>({
    search: '',
    make: '',
    bodyType: '',
    priceRange: '',
    status: '',
  });
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = cars.filter((c) => {
    const q = filters.search.toLowerCase();
    const matchSearch = !q || `${c.make} ${c.model}`.toLowerCase().includes(q);
    const matchMake = !filters.make || c.make === filters.make;
    const matchBody = !filters.bodyType || c.bodyType === filters.bodyType;
    const matchStatus = !filters.status || c.status === filters.status;
    return matchSearch && matchMake && matchBody && matchStatus;
  });

  const stats = [
    { label: 'Total Listed', value: cars.length, color: COLORS.primary },
    {
      label: 'Available',
      value: cars.filter((c) => c.status === 'available').length,
      color: '#276749',
    },
    {
      label: 'Reserved',
      value: cars.filter((c) => c.status === 'reserved').length,
      color: '#DD6B20',
    },
    {
      label: 'Sold',
      value: cars.filter((c) => c.status === 'sold').length,
      color: '#9B2C2C',
    },
  ];

  return (
    <AppLayout>
      <PageTopBar breadcrumb="Drivia / Inventory" title="Inventory" />
      <Box p="28px">
        <Grid templateColumns="repeat(4,1fr)" gap="12px" mb="22px">
          {stats.map((s) => (
            <Box
              key={s.label}
              bg="white"
              borderRadius="12px"
              p="16px 20px"
              boxShadow="0 2px 10px rgba(0,0,0,0.05)"
            >
              <Text fontSize="26px" fontWeight="900" color={s.color}>
                {s.value}
              </Text>
              <Text fontSize="11px" color="gray.400" mt="2px">
                {s.label}
              </Text>
            </Box>
          ))}
        </Grid>

        <InventoryFiltersBar
          filters={filters}
          onChange={setFilters}
          onAddCar={() => setModalOpen(true)}
        />
        <InventoryCarGrid
          cars={filtered}
          onEdit={(id) => console.log('edit', id)}
          onDelete={(id) => setCars((c) => c.filter((x) => x.id !== id))}
        />

        <StockVelocityChart data={stockData} avgDays={12} staleCount={1} />
        <PageFooter period="30 days" />
      </Box>

      <AddCarModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(car) => {
          const newCar: CarListing = {
            id: String(Date.now()),
            make: car.make,
            model: car.model,
            year: Number(car.year),
            price: Number(car.price),
            mileage: Number(car.mileage || 0),
            bodyType: car.bodyType,
            status: 'available',
            daysListed: 0,
            views: 0,
            enquiries: 0,
            img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop',
          };
          setCars((c) => [newCar, ...c]);
        }}
      />
    </AppLayout>
  );
}

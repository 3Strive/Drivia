'use client';

import React, { useState } from 'react';
import { Box, Grid, Text } from '@chakra-ui/react';
import { COLORS } from '../../atoms';
import AppLayout from '../../template/general-layout';
import { PageTopBar } from '../../molecules';
import { InventoryFiltersBar } from './InventoryFiltersBar';
import { InventoryCarGrid } from './InventoryCarGrid';
import { StockVelocityChart } from '../analytics/StockVelocityChart';
import { PageFooter } from '../PageFooter';
import { AddCarModal } from '../AddCarModal';
import {
  AddCarForm,
  CarListing,
  InventoryFilters,
} from '../../../shared/types';

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
    status: 'Available',
    daysListed: 8,
    views: 134,
    enquiries: 12,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop',
    ],
    title: '2021 Toyota Camry',
    location: 'Lekki, Lagos',
    phone: '08012345678',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    description: 'Camry 2021',
    sharedTo: ['whatsapp'],
    postedAt: '20/2/2025',
    condition: 'Tokunbo',
    gradient: 'linear(to-br, #3F51B5, #6C63FF)',
    color: 'Red',
  },
  {
    id: '2',
    make: 'Honda',
    model: 'CR-V',
    year: 2020,
    price: 14200000,
    mileage: 55000,
    bodyType: 'SUV',
    status: 'Available',
    daysListed: 14,
    views: 89,
    enquiries: 7,
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop',
    ],
    title: '2020 Honda CR-V',
    location: 'Ikeja, Lagos',
    phone: '07023456789',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    description: 'CR-V 2020',
    sharedTo: ['facebook'],
    postedAt: '15/3/2025',
    condition: 'Tokunbo',
    color: 'Blue',
    gradient: 'linear(to-br, #2193b0, #6dd5ed)',
  },
  {
    id: '3',
    make: 'Lexus',
    model: 'RX350',
    year: 2019,
    price: 22000000,
    mileage: 38000,
    bodyType: 'SUV',
    status: 'Reserved',
    daysListed: 5,
    views: 211,
    enquiries: 19,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop',
    ],
    title: '2019 Lexus RX350',
    location: 'Victoria Island, Lagos',
    phone: '09034567890',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    description: 'RX350 2019',
    sharedTo: ['instagram'],
    postedAt: '10/4/2025',
    condition: 'Tokunbo',
    color: 'White',
    gradient: 'linear(to-br, #cc2b5e, #753a88)',
  },
  {
    id: '4',
    make: 'Mercedes',
    model: 'C300',
    year: 2021,
    price: 28000000,
    mileage: 22000,
    bodyType: 'Sedan',
    status: 'Available',
    daysListed: 22,
    views: 178,
    enquiries: 15,
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop',
    ],
    title: '2021 Mercedes C300',
    location: 'Lekki, Lagos',
    phone: '08012345678',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    description: 'C300 2021',
    sharedTo: ['whatsapp'],
    postedAt: '20/2/2025',
    condition: 'Tokunbo',
    color: 'Black',
    gradient: 'linear(to-br, #141414, #6c6c6c)',
  },
  {
    id: '5',
    make: 'Toyota',
    model: 'Highlander',
    year: 2022,
    price: 31000000,
    mileage: 18000,
    bodyType: 'SUV',
    status: 'Available',
    daysListed: 3,
    views: 67,
    enquiries: 5,
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop',
    ],
    title: '2022 Toyota Highlander',
    location: 'Lekki, Lagos',
    phone: '08012345678',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    description: 'Highlander 2022',
    sharedTo: ['whatsapp'],
    postedAt: '20/2/2025',
    condition: 'Tokunbo',
    color: 'Silver',
    gradient: 'linear(to-br, #666666, #cccccc)',
  },
  {
    id: '6',
    make: 'Ford',
    model: 'Explorer',
    year: 2020,
    price: 18500000,
    mileage: 61000,
    bodyType: 'SUV',
    status: 'Sold',
    daysListed: 67,
    views: 320,
    enquiries: 28,
    images: [
      'https://images.unsplash.com/photo-1551830820-330a71b99659?w=400&h=250&fit=crop',
    ],
    title: '2020 Ford Explorer',
    location: 'Ikeja, Lagos',
    phone: '07023456789',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    description: 'Explorer 2020',
    sharedTo: ['facebook'],
    postedAt: '15/3/2025',
    condition: 'Tokunbo',
    color: 'Green',
    gradient: 'linear(to-br, #56ab2f, #a8e063)',
  },
];

export default function Inventory() {
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
      value: cars.filter((c) => c.status === 'Available').length,
      color: '#276749',
    },
    {
      label: 'Reserved',
      value: cars.filter((c) => c.status === 'Reserved').length,
      color: '#DD6B20',
    },
    {
      label: 'Sold',
      value: cars.filter((c) => c.status === 'Sold').length,
      color: '#9B2C2C',
    },
  ];

  const handleSaveCar = (car: AddCarForm) => {
    const newCar: CarListing = {
      id: String(Date.now()),
      make: car.make,
      model: car.model,
      year: Number(car.year) || new Date().getFullYear(),
      price: Number(car.price) || 0,
      mileage: Number(car.mileage) || 0,
      bodyType: car.bodyType || undefined,
      status: 'Available',
      daysListed: 0,
      views: 0,
      enquiries: 0,
      images: car.images,
      title: `${car.year} ${car.make} ${car.model}`,
      location: car.location,
      phone: car.phone,
      // FIX: fuelType is now correctly saved (was 'fuel' key before)
      fuelType: car.fuelType as CarListing['fuelType'],
      transmission: car.transmission as CarListing['transmission'],
      description: car.description,
      sharedTo: car.sharedTo,
      postedAt: car.postedAt,
      condition: (car.condition as CarListing['condition']) || 'Tokunbo',
      color: car.color,
      gradient: car.gradient,
    };
    setCars((prev) => [newCar, ...prev]);
  };

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
        onSave={handleSaveCar}
      />
    </AppLayout>
  );
}

import React from 'react';
import { Box, Grid, Image, Text, Flex, HStack, Badge } from '@chakra-ui/react';
import { COLORS } from '../atoms/palette';
import { StatusBadge } from '../atoms/StatusBadge';
import { fmtShort } from '../atoms/formatters';
import { EditIco, EyeIco, TrashIco } from '../atoms/icons';

export interface CarListing {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  bodyType: string;
  status: 'available' | 'sold' | 'reserved';
  daysListed: number;
  img: string;
  views: number;
  enquiries: number;
}

interface InventoryCarGridProps {
  cars: CarListing[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const STATUS_MAP: Record<string, 'success' | 'danger' | 'warning'> = {
  available: 'success',
  sold: 'danger',
  reserved: 'warning',
};

export const InventoryCarGrid = ({ cars, onEdit, onDelete }: InventoryCarGridProps) => (
  <Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap="16px" mb="24px">
    {cars.map(car => (
      <Box key={car.id} bg="white" borderRadius="14px" overflow="hidden" boxShadow="0 2px 10px rgba(0,0,0,0.06)">
        <Box position="relative" h="160px">
          <Image src={car.img} w="100%" h="100%" objectFit="cover" />
          <Box position="absolute" top="10px" right="10px">
            <StatusBadge status={STATUS_MAP[car.status]}>
              {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
            </StatusBadge>
          </Box>
          <Box position="absolute" top="10px" left="10px" bg="rgba(0,0,0,0.55)" borderRadius="6px" px="8px" py="3px">
            <Text fontSize="11px" color="white" fontWeight="700">{car.year}</Text>
          </Box>
        </Box>
        <Box p="14px">
          <Text fontSize="15px" fontWeight="800" color="gray.800" mb="2px">
            {car.make} {car.model}
          </Text>
          <HStack gap="8px" mb="10px" flexWrap="wrap">
            <Text fontSize="11px" color="gray.400">{car.bodyType}</Text>
            <Text fontSize="11px" color="gray.300">·</Text>
            <Text fontSize="11px" color="gray.400">{car.mileage.toLocaleString()} km</Text>
            <Text fontSize="11px" color="gray.300">·</Text>
            <Text fontSize="11px" color={car.daysListed > 30 ? '#E53E3E' : 'gray.400'}>
              {car.daysListed}d listed
            </Text>
          </HStack>
          <Flex justify="space-between" align="center" mb="12px">
            <Text fontSize="18px" fontWeight="900" color={COLORS.primary}>
              {fmtShort(car.price)}
            </Text>
            <HStack gap="10px">
              <HStack gap="3px">
                <Box color="gray.400"><EyeIco /></Box>
                <Text fontSize="11px" color="gray.500">{car.views}</Text>
              </HStack>
              <HStack gap="3px">
                <Box color="gray.400" fontSize="11px">💬</Box>
                <Text fontSize="11px" color="gray.500">{car.enquiries}</Text>
              </HStack>
            </HStack>
          </Flex>
          <Flex gap="8px">
            <Box
              as="button" flex="1" h="32px" borderRadius="8px" border="1px solid"
              borderColor="gray.200" fontSize="12px" fontWeight="600" color="gray.600"
              display="flex" alignItems="center" justifyContent="center" gap="4px"
              _hover={{ bg: 'gray.50' }} onClick={() => onEdit(car.id)}
            >
              <EditIco /> Edit
            </Box>
            <Box
              as="button" w="32px" h="32px" borderRadius="8px" border="1px solid"
              borderColor="red.100" fontSize="12px" color="red.400"
              display="flex" alignItems="center" justifyContent="center"
              _hover={{ bg: 'red.50' }} onClick={() => onDelete(car.id)}
            >
              <TrashIco />
            </Box>
          </Flex>
        </Box>
      </Box>
    ))}
  </Grid>
);

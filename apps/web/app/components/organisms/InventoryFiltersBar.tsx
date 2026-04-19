import React from 'react';
import { Box, Flex, HStack, Input, Button, chakra } from '@chakra-ui/react';
import { SearchIco, PlusIco } from '../atoms/icons';
import { COLORS } from '../atoms/palette';

export interface InventoryFilters {
  search: string;
  make: string;
  bodyType: string;
  priceRange: string;
  status: string;
}

interface InventoryFiltersBarProps {
  filters: InventoryFilters;
  onChange: (f: InventoryFilters) => void;
  onAddCar: () => void;
}

const selectStyles = {
  bg: 'white',
  border: '1px solid',
  borderColor: 'gray.200',
  borderRadius: '10px',
  fontSize: '13px',
  h: '38px',
  px: '10px',
  cursor: 'pointer',
  outline: 'none',
  _focus: { borderColor: COLORS.primary },
};

export const InventoryFiltersBar = ({
  filters,
  onChange,
  onAddCar,
}: InventoryFiltersBarProps) => (
  <Flex
    justify="space-between"
    align="center"
    mb="20px"
    gap="12px"
    flexWrap="wrap"
  >
    <HStack gap="10px" flex="1" flexWrap="wrap">
      {/* Search */}
      <Box position="relative" minW="220px">
        <Box
          position="absolute"
          left="10px"
          top="50%"
          transform="translateY(-50%)"
          color="gray.400"
          zIndex={1}
        >
          <SearchIco />
        </Box>
        <Input
          pl="34px"
          placeholder="Search make, model, year..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="10px"
          fontSize="13px"
          h="38px"
          _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }}
        />
      </Box>

      {/* Make */}
      <chakra.select
        value={filters.make}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onChange({ ...filters, make: e.target.value })
        }
        w="140px"
        {...selectStyles}
      >
        <option value="">All Makes</option>
        {['Toyota', 'Honda', 'Lexus', 'Mercedes', 'BMW', 'Ford'].map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </chakra.select>

      {/* Body Type */}
      <chakra.select
        value={filters.bodyType}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onChange({ ...filters, bodyType: e.target.value })
        }
        w="140px"
        {...selectStyles}
      >
        <option value="">Body Type</option>
        {['Sedan', 'SUV', 'Hatchback', 'Pickup', 'Coupe', 'Van'].map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </chakra.select>

      {/* Status */}
      <chakra.select
        value={filters.status}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onChange({ ...filters, status: e.target.value })
        }
        w="130px"
        {...selectStyles}
      >
        <option value="">All Status</option>
        <option value="available">Available</option>
        <option value="sold">Sold</option>
        <option value="reserved">Reserved</option>
      </chakra.select>
    </HStack>

    <Button
      bg={COLORS.primary}
      color="white"
      borderRadius="10px"
      fontSize="13px"
      fontWeight="700"
      h="38px"
      px="16px"
      _hover={{ bg: COLORS.primaryDark }}
      onClick={onAddCar}
      display="flex"
      alignItems="center"
      gap="6px"
    >
      <PlusIco /> Add Car
    </Button>
  </Flex>
);

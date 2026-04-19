import React from 'react';
import { Box } from '@chakra-ui/react';
import { SectionHeader } from '../../../atoms/SectionHeader';
import { CarTableRow, CarRowData } from '../../../molecules/CarTableRow';

export type TableSectionProps = {
  title: string;
  rows: CarRowData[];
};

export const TableSection: React.FC<TableSectionProps> = ({ title, rows }) => (
  <Box bg="white" p="16px" borderRadius="12px">
    <SectionHeader title={title} />
    {rows.map((r, i) => (
      <CarTableRow key={i} {...r} />
    ))}
  </Box>
);

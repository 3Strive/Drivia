'use client';

import React, { useState } from 'react';
import { Box, Grid, Flex, Text, HStack, Input } from '@chakra-ui/react';
import AppLayout from '../components/template/general-layout';
import { COLORS, SearchIco } from '../components/atoms';
import { Lead, LeadKanbanBoard } from '../components/organisms/LeadKanbanBoard';
import { PageTopBar } from '../components/molecules';
import {
  LeadSourcesPie,
  PageFooter,
  PlatformPerformanceTable,
} from '../components/organisms';
import { LeadDetailDrawer } from '../components/organisms/LeadDetailDrawer';

type KanbanColumn =
  | 'new'
  | 'contacted'
  | 'viewing'
  | 'negotiating'
  | 'sold'
  | 'lost';

const platformData = [
  { platform: 'WhatsApp', enquiries: 42, sold: 18, color: '#25D366' },
  { platform: 'Facebook', enquiries: 28, sold: 9, color: '#1877F2' },
  { platform: 'Instagram', enquiries: 21, sold: 6, color: '#E1306C' },
  { platform: 'Walk-in', enquiries: 14, sold: 7, color: '#718096' },
  { platform: 'Referral', enquiries: 11, sold: 6, color: '#805AD5' },
];

const pieData = [
  { name: 'WhatsApp', value: 42, color: '#25D366' },
  { name: 'Facebook', value: 28, color: '#1877F2' },
  { name: 'Instagram', value: 21, color: '#E1306C' },
  { name: 'Walk-in', value: 14, color: '#718096' },
  { name: 'Other', value: 19, color: '#CBD5E0' },
];

const initialLeads: Record<KanbanColumn, Lead[]> = {
  new: [
    {
      id: '1',
      name: 'Emeka Obi',
      phone: '0801 234 5678',
      car: 'Toyota Camry 2021',
      platform: 'WhatsApp',
      platformColor: '#25D366',
      budget: '₦12-14M',
      time: '2 min ago',
    },
    {
      id: '2',
      name: 'Bisi Adeyemi',
      phone: '0702 345 6789',
      car: 'Honda CR-V 2020',
      platform: 'Facebook',
      platformColor: '#1877F2',
      budget: '₦13-16M',
      time: '15 min ago',
    },
    {
      id: '3',
      name: 'Tunde Bakare',
      phone: '0903 456 7890',
      car: 'Lexus RX350',
      platform: 'Instagram',
      platformColor: '#E1306C',
      budget: '₦20M+',
      time: '1 hr ago',
    },
  ],
  contacted: [
    {
      id: '4',
      name: 'Ngozi Eze',
      phone: '0811 567 8901',
      car: 'Mercedes C300',
      platform: 'WhatsApp',
      platformColor: '#25D366',
      budget: '₦25-30M',
      time: 'Yesterday',
    },
    {
      id: '5',
      name: 'Femi Coker',
      phone: '0705 678 9012',
      car: 'Toyota Highlander',
      platform: 'Walk-in',
      platformColor: '#718096',
      budget: '₦28M+',
      time: 'Yesterday',
    },
  ],
  viewing: [
    {
      id: '6',
      name: 'Amaka Nwosu',
      phone: '0813 789 0123',
      car: 'Toyota Camry 2021',
      platform: 'Referral',
      platformColor: '#805AD5',
      budget: '₦12M',
      time: '2 days ago',
    },
  ],
  negotiating: [
    {
      id: '7',
      name: 'Seun Williams',
      phone: '0812 890 1234',
      car: 'Lexus RX350',
      platform: 'WhatsApp',
      platformColor: '#25D366',
      budget: '₦21M',
      time: '3 days ago',
    },
  ],
  sold: [
    {
      id: '8',
      name: 'Kemi Adeyinka',
      phone: '0701 901 2345',
      car: 'Honda CR-V 2020',
      platform: 'Facebook',
      platformColor: '#1877F2',
      budget: '₦14M',
      time: '1 week ago',
    },
  ],
  lost: [
    {
      id: '9',
      name: 'Dele Fasanya',
      phone: '0902 012 3456',
      car: 'Ford Explorer',
      platform: 'Instagram',
      platformColor: '#E1306C',
      budget: '₦18M',
      time: '1 week ago',
    },
  ],
};

const summaryStats = [
  { label: 'Total Leads', value: 9, color: COLORS.primary },
  { label: 'Active Leads', value: 7, color: '#DD6B20' },
  { label: 'Closed Won', value: 1, color: '#276749' },
  { label: 'Closed Lost', value: 1, color: '#9B2C2C' },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState(initialLeads);
  const [selected, setSelected] = useState<Lead | null>(null);

  return (
    <AppLayout>
      <PageTopBar breadcrumb="Drivia / Leads" title="Leads" />
      <Box p="28px">
        <Grid templateColumns="repeat(4,1fr)" gap="12px" mb="22px">
          {summaryStats.map((s) => (
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

        {/* Filter bar */}
        <Flex gap="10px" mb="20px" align="center" flexWrap="wrap">
          <Box position="relative">
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
              placeholder="Search leads..."
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="10px"
              fontSize="13px"
              h="38px"
              w="220px"
              _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }}
            />
          </Box>
          <Box
            as="select"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="10px"
            fontSize="13px"
            h="38px"
            w="140px"
          >
            <option value="">All Platforms</option>
            {['WhatsApp', 'Facebook', 'Instagram', 'Walk-in', 'Referral'].map(
              (p) => (
                <option key={p}>{p}</option>
              ),
            )}
          </Box>
          <Box
            as="select"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="10px"
            fontSize="13px"
            h="38px"
            w="130px"
          >
            <option value="">All Time</option>
            {['Today', 'This Week', 'This Month'].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Box>
        </Flex>

        {/* Kanban board */}
        <Box
          bg="white"
          borderRadius="16px"
          p="22px"
          boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          mb="16px"
        >
          <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">
            Lead Pipeline
          </Text>
          <Text fontSize="12px" color="gray.400" mb="16px">
            Drag leads through your sales stages
          </Text>
          <LeadKanbanBoard
            leads={leads}
            onLeadClick={setSelected}
            onMove={() => {}}
          />
        </Box>

        <Grid templateColumns="1.2fr 1fr" gap="16px" mb="16px">
          <PlatformPerformanceTable data={platformData} />
          <LeadSourcesPie data={pieData} />
        </Grid>

        <PageFooter period="30 days" />
      </Box>

      <LeadDetailDrawer lead={selected} onClose={() => setSelected(null)} />
    </AppLayout>
  );
}

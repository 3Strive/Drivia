'use client';

import React, { useState } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import AppLayout from '../components/template/general-layout';
import { Contact } from '../shared/types';
import {
  FollowUp,
  FollowUpReminders,
} from '../components/organisms/FollowUpReminders';
import { PageTopBar } from '../components/molecules';
import { ContactListTable } from '../components/organisms/ContactListTable';
import { LeadSourcesPie, PageFooter } from '../components/organisms';

const contacts: Contact[] = [
  {
    id: '1',
    name: 'Emeka Obi',
    phone: '0801 234 5678',
    platform: 'WhatsApp',
    platformColor: '#25D366',
    carsBought: 3,
    totalSpent: 42000000,
    lastContact: '2 days ago',
    tags: 'VIP',
    addedAt: '2023-01-01',
  },
  {
    id: '2',
    name: 'Ngozi Eze',
    phone: '0811 567 8901',
    platform: 'Facebook',
    platformColor: '#1877F2',
    carsBought: 2,
    totalSpent: 26500000,
    lastContact: '1 week ago',
    tags: 'Repeat',
    addedAt: '2023-01-02',
  },
  {
    id: '3',
    name: 'Tunde Bakare',
    phone: '0903 456 7890',
    platform: 'Instagram',
    platformColor: '#E1306C',
    carsBought: 1,
    totalSpent: 22000000,
    lastContact: '2 weeks ago',
    tags: 'New',
    addedAt: '2023-01-03',
  },
  {
    id: '4',
    name: 'Bisi Adeyemi',
    phone: '0702 345 6789',
    platform: 'Walk-in',
    platformColor: '#718096',
    carsBought: 0,
    totalSpent: 0,
    lastContact: '1 month ago',
    tags: 'Inactive',
    addedAt: '2023-01-04',
  },
  {
    id: '5',
    name: 'Seun Williams',
    phone: '0812 890 1234',
    platform: 'Referral',
    platformColor: '#3B82F6',
    carsBought: 1,
    totalSpent: 14200000,
    lastContact: '3 days ago',
    tags: 'New',
    addedAt: '2023-01-05',
  },
];

const followUps: FollowUp[] = [
  {
    id: '1',
    name: 'Emeka Obi',
    phone: '0801 234 5678',
    note: 'Follow up on Toyota Highlander interest',
    dueIn: 'Due now',
    overdue: true,
  },
  {
    id: '2',
    name: 'Bisi Adeyemi',
    phone: '0702 345 6789',
    note: 'Check if still looking for a CR-V',
    dueIn: 'Due in 1 hour',
    overdue: false,
  },
  {
    id: '3',
    name: 'Ngozi Eze',
    phone: '0811 567 8901',
    note: 'Send updated price list',
    dueIn: 'Due in 3 hours',
    overdue: false,
  },
];

const pieData = [
  { name: 'WhatsApp', value: 42, color: '#25D366' },
  { name: 'Facebook', value: 28, color: '#1877F2' },
  { name: 'Instagram', value: 21, color: '#E1306C' },
  { name: 'Walk-in', value: 14, color: '#718096' },
  { name: 'Other', value: 19, color: '#CBD5E0' },
];

export default function CrmPage() {
  const [items, setItems] = useState(followUps);

  return (
    <AppLayout>
      <PageTopBar breadcrumb="Drivia / CRM" title="CRM" />
      <Box p="28px">
        <ContactListTable
          contacts={contacts}
          onEdit={(id) => console.log('edit', id)}
        />

        <Grid templateColumns="1fr 1fr" gap="16px" mb="16px">
          <FollowUpReminders
            items={items}
            onCall={(id) => console.log('call', id)}
            onMessage={(id) => console.log('msg', id)}
            onDone={(id) => setItems((i) => i.filter((x) => x.id !== id))}
          />
          <LeadSourcesPie data={pieData} />
        </Grid>

        <PageFooter period="30 days" />
      </Box>
    </AppLayout>
  );
}

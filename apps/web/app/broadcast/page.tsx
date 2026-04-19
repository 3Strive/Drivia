'use client';

import React, { useState } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import AppLayout from '../components/template/general-layout';
import {
  BroadcastCampaign,
  BroadcastHistoryList,
} from '../components/organisms/BroadcastHistoryList';
import { PageTopBar } from '../components/molecules';
import { BroadcastComposer } from '../components/organisms/BroadcastComposer';
import { PageFooter, PlatformPerformanceTable } from '../components/organisms';

const platformData = [
  { platform: 'WhatsApp', enquiries: 42, sold: 18, color: '#25D366' },
  { platform: 'Facebook', enquiries: 28, sold: 9, color: '#1877F2' },
  { platform: 'Instagram', enquiries: 21, sold: 6, color: '#E1306C' },
  { platform: 'SMS', enquiries: 8, sold: 2, color: '#718096' },
];

const initialCampaigns: BroadcastCampaign[] = [
  {
    id: '1',
    message:
      'Hi {name}! We just got a 2021 Toyota Camry at ₦12.5M. DM to book a viewing today!',
    platforms: ['whatsapp', 'facebook'],
    sentAt: 'Nov 15, 2024 · 10:00 AM',
    reach: 124,
    opened: 89,
    replies: 22,
    status: 'sent',
  },
  {
    id: '2',
    message:
      'Weekend sale! All SUVs priced to sell this week only. Check our listings on Drivia.',
    platforms: ['whatsapp', 'instagram', 'facebook'],
    sentAt: 'Nov 10, 2024 · 9:00 AM',
    reach: 211,
    opened: 167,
    replies: 41,
    status: 'sent',
  },
  {
    id: '3',
    message:
      'New arrival: Lexus RX350 2019 — ₦22M. Only serious buyers. Call or WhatsApp.',
    platforms: ['whatsapp'],
    sentAt: 'Scheduled: Nov 20, 2024',
    reach: 98,
    opened: 0,
    replies: 0,
    status: 'scheduled',
  },
  {
    id: '4',
    message:
      'Flash deal: Honda CR-V 2020 · Price reduced to ₦13.8M for this week only!',
    platforms: ['facebook', 'sms'],
    sentAt: 'Nov 5, 2024 · 2:00 PM',
    reach: 85,
    opened: 52,
    replies: 9,
    status: 'sent',
  },
];

export default function BroadcastPage() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);

  return (
    <AppLayout>
      <PageTopBar breadcrumb="Drivia / Broadcast" title="Broadcast" />
      <Box p="28px">
        <BroadcastComposer
          onSend={(msg, platforms, schedule) => {
            setCampaigns((c) => [
              {
                id: String(Date.now()),
                message: msg,
                platforms,
                sentAt: schedule ? `Scheduled: ${schedule}` : 'Just now',
                reach: 0,
                opened: 0,
                replies: 0,
                status: schedule ? 'scheduled' : 'sent',
              },
              ...c,
            ]);
          }}
        />

        <Grid templateColumns="1.2fr 1fr" gap="16px" mb="16px">
          <BroadcastHistoryList campaigns={campaigns} />
          <PlatformPerformanceTable data={platformData} />
        </Grid>

        <PageFooter period="30 days" />
      </Box>
    </AppLayout>
  );
}

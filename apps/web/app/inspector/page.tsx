'use client';

import React, { useState } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import AppLayout from '../components/template/general-layout';
import { PageTopBar } from '../components/molecules';
import {
  InspectionRequest,
  InspectionRequestList,
  InspectorEarningsCard,
  InspectorOnboardCard,
} from '../components/organisms/InspectorComponents';
import { PageFooter } from '../components/organisms';

const initialRequests: InspectionRequest[] = [
  {
    id: '1',
    dealerName: 'Lagos Auto Hub',
    car: 'Toyota Camry 2021',
    location: 'Victoria Island, Lagos',
    requestedDate: 'Nov 20, 2024 · 10:00 AM',
    status: 'pending',
  },
  {
    id: '2',
    dealerName: 'Eko Premium Motors',
    car: 'Honda CR-V 2020',
    location: 'Lekki Phase 1, Lagos',
    requestedDate: 'Nov 21, 2024 · 2:00 PM',
    status: 'accepted',
  },
  {
    id: '3',
    dealerName: 'Abuja Carz',
    car: 'Lexus RX350 2019',
    location: 'Wuse 2, Abuja',
    requestedDate: 'Nov 18, 2024',
    status: 'completed',
  },
  {
    id: '4',
    dealerName: 'Port Harcourt Motors',
    car: 'Mercedes C300',
    location: 'GRA Phase 2, Port Harcourt',
    requestedDate: 'Nov 22, 2024 · 11:00 AM',
    status: 'pending',
  },
];

export default function InspectorPage() {
  const [isVerified] = useState(true);
  const [requests, setRequests] = useState(initialRequests);

  return (
    <AppLayout>
      <PageTopBar breadcrumb="Drivia / Inspector" title="Inspector" />
      <Box p="28px">
        <InspectorOnboardCard
          isVerified={isVerified}
          onApply={() => console.log('apply')}
        />

        <Grid templateColumns="1.2fr 1fr" gap="16px" mb="16px">
          <InspectionRequestList
            requests={requests}
            onAccept={(id) =>
              setRequests((r) =>
                r.map((x) =>
                  x.id === id ? { ...x, status: 'accepted' as const } : x,
                ),
              )
            }
          />
          <InspectorEarningsCard
            completed={12}
            totalEarned={180000}
            pending={45000}
          />
        </Grid>

        <PageFooter period="30 days" />
      </Box>
    </AppLayout>
  );
}

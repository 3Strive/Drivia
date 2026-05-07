'use client';

import React, { useState } from 'react';
import { Box, Grid, Flex, Text, VStack } from '@chakra-ui/react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import AppLayout from '../../template/general-layout';
import { PageTopBar } from '../../molecules';
import { CurrentPlanBanner } from './CurrentPlanBanner';
import { PricingGrid } from './PricingGrid';
import { PageFooter } from '../PageFooter';
import Faq from './Faq';

const featureRows = [
  {
    feature: 'Active Listings',
    starter: '5',
    pro: '25',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Marketplace visibility',
    starter: <FaCheck color={'green'} size={16} />,
    pro: <FaCheck color={'green'} size={16} />,
    enterprise: <FaCheck color={'green'} size={16} />,
  },
  {
    feature: 'WhatsApp lead tracking',
    starter: <FaCheck color={'green'} size={16} />,
    pro: <FaCheck color={'green'} size={16} />,
    enterprise: <FaCheck color={'green'} size={16} />,
  },
  {
    feature: 'All platform tracking',
    starter: <FaTimes size={16} color={'red'} />,
    pro: <FaCheck color={'green'} size={16} />,
    enterprise: <FaCheck color={'green'} size={16} />,
  },
  {
    feature: 'Analytics dashboard',
    starter: 'Basic',
    pro: 'Full',
    enterprise: 'Full + Export',
  },
  {
    feature: 'Broadcast messaging',
    starter: <FaTimes size={16} color={'red'} />,
    pro: <FaCheck color={'green'} size={16} />,
    enterprise: <FaCheck color={'green'} size={16} />,
  },
  {
    feature: 'Lead Kanban board',
    starter: <FaTimes size={16} color={'red'} />,
    pro: <FaCheck color={'green'} size={16} />,
    enterprise: <FaCheck color={'green'} size={16} />,
  },
  {
    feature: 'CRM & follow-ups',
    starter: <FaTimes size={16} color={'red'} />,
    pro: <FaCheck color={'green'} size={16} />,
    enterprise: <FaCheck color={'green'} size={16} />,
  },
  {
    feature: 'Social accounts',
    starter: '1',
    pro: '3',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Multiple dealerships',
    starter: <FaTimes size={16} color={'red'} />,
    pro: <FaTimes size={16} color={'red'} />,
    enterprise: <FaCheck color={'green'} size={16} />,
  },
  {
    feature: 'Priority support',
    starter: <FaTimes size={16} color={'red'} />,
    pro: <FaTimes size={16} color={'red'} />,
    enterprise: <FaCheck color={'green'} size={16} />,
  },
];

export default function Plans() {
  const [currentPlan, setCurrentPlan] = useState('pro');

  return (
    <AppLayout>
      <PageTopBar breadcrumb="Drivia / Plans" title="Plans & Billing" />
      <Box p="28px">
        <CurrentPlanBanner
          planName="Pro"
          renewalDate="December 15, 2024"
          listingsUsed={18}
          listingsTotal={25}
          onManage={() => console.log('manage')}
        />

        <PricingGrid currentPlan={currentPlan} onSelect={setCurrentPlan} />

        {/* Feature comparison table */}
        <Box
          bg="white"
          borderRadius="16px"
          p="22px"
          boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          mb="16px"
        >
          <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">
            Feature Comparison
          </Text>
          <Text fontSize="12px" color="gray.400" mb="20px">
            See exactly what's included in each plan
          </Text>
          <Grid templateColumns="2fr 1fr 1fr 1fr" gap="0">
            {['Feature', 'Starter', 'Pro', 'Enterprise'].map((h, i) => (
              <Text
                key={h}
                fontSize="11px"
                fontWeight="800"
                color={i === 0 ? 'gray.500' : 'gray.700'}
                textTransform="uppercase"
                letterSpacing="0.4px"
                pb="10px"
                borderBottom="2px solid"
                borderColor="gray.100"
                textAlign={i === 0 ? 'left' : 'center'}
              >
                {h}
              </Text>
            ))}
            {featureRows.map((row, i) => (
              <React.Fragment key={row.feature}>
                <Flex
                  align="center"
                  py="11px"
                  borderBottom="1px solid"
                  borderColor="gray.50"
                  bg={i % 2 === 0 ? 'white' : 'gray.50'}
                >
                  <Text fontSize="12px" color="gray.600" fontWeight="500">
                    {row.feature}
                  </Text>
                </Flex>
                {[row.starter, row.pro, row.enterprise].map((val, j) => (
                  <Flex
                    key={j}
                    align="center"
                    justify="center"
                    py="11px"
                    borderBottom="1px solid"
                    borderColor="gray.50"
                    bg={i % 2 === 0 ? 'white' : 'gray.50'}
                  >
                    <Text
                      fontSize="12px"
                      fontWeight="600"
                      color={
                        val === <FaCheck color="green" size={16} />
                          ? '#276749'
                          : val === <FaTimes color="red" size={16} />
                            ? '#CBD5E0'
                            : 'gray.700'
                      }
                    >
                      {val}
                    </Text>
                  </Flex>
                ))}
              </React.Fragment>
            ))}
          </Grid>
        </Box>

        <Faq />

        <PageFooter period="30 days" />
      </Box>
    </AppLayout>
  );
}

'use client';

import React, { useState } from 'react';
import { Box, Grid, Flex, Text, HStack, VStack } from '@chakra-ui/react';
import AppLayout from '../components/template/general-layout';
import { PageTopBar } from '../components/molecules';
import { CurrentPlanBanner } from '../components/organisms/CurrentPlanBanner';
import { PageFooter } from '../components/organisms';
import { PricingGrid } from '../components/organisms/PricingGrid';

const featureRows = [
  {
    feature: 'Active Listings',
    starter: '5',
    pro: '25',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Marketplace visibility',
    starter: '✅',
    pro: '✅',
    enterprise: '✅',
  },
  {
    feature: 'WhatsApp lead tracking',
    starter: '✅',
    pro: '✅',
    enterprise: '✅',
  },
  {
    feature: 'All platform tracking',
    starter: '❌',
    pro: '✅',
    enterprise: '✅',
  },
  {
    feature: 'Analytics dashboard',
    starter: 'Basic',
    pro: 'Full',
    enterprise: 'Full + Export',
  },
  {
    feature: 'Broadcast messaging',
    starter: '❌',
    pro: '✅',
    enterprise: '✅',
  },
  { feature: 'Lead Kanban board', starter: '❌', pro: '✅', enterprise: '✅' },
  { feature: 'CRM & follow-ups', starter: '❌', pro: '✅', enterprise: '✅' },
  {
    feature: 'Social accounts',
    starter: '1',
    pro: '3',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Multiple dealerships',
    starter: '❌',
    pro: '❌',
    enterprise: '✅',
  },
  { feature: 'Priority support', starter: '❌', pro: '❌', enterprise: '✅' },
];

export default function PlansPage() {
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
                        val === '✅'
                          ? '#276749'
                          : val === '❌'
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

        {/* FAQ */}
        <Box
          bg="white"
          borderRadius="16px"
          p="22px"
          boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          mb="16px"
        >
          <Text fontWeight="800" fontSize="15px" color="gray.800" mb="16px">
            Common Questions
          </Text>
          <VStack gap="12px" align="stretch">
            {[
              {
                q: 'Can I switch plans at any time?',
                a: 'Yes, you can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.',
              },
              {
                q: 'What payment methods are accepted?',
                a: 'We accept Paystack and Flutterwave — debit/credit cards, bank transfer, and USSD.',
              },
              {
                q: 'Is there a free trial?',
                a: 'New accounts get a 14-day Pro trial with no credit card required.',
              },
              {
                q: 'What happens to my listings if I downgrade?',
                a: 'Your listings remain visible but you can only edit active ones up to your new plan limit.',
              },
            ].map((faq) => (
              <Box key={faq.q} p="14px" bg="gray.50" borderRadius="12px">
                <Text
                  fontSize="13px"
                  fontWeight="700"
                  color="gray.800"
                  mb="4px"
                >
                  {faq.q}
                </Text>
                <Text fontSize="12px" color="gray.500" lineHeight="1.6">
                  {faq.a}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>

        <PageFooter period="30 days" />
      </Box>
    </AppLayout>
  );
}

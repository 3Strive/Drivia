'use client';

import React from 'react';
import { Box, Grid, Flex, Text, VStack, HStack } from '@chakra-ui/react';
import AppLayout from '../components/template/general-layout';
import {
  Referral,
  ReferralHistoryList,
  ReferralLinkCard,
} from '../components/organisms/ReferralComponents';
import { PageTopBar } from '../components/molecules';
import { COLORS } from '../components/atoms';
import { PageFooter } from '../components/organisms';

const referrals: Referral[] = [
  {
    id: '1',
    name: 'Adaeze Okeke',
    email: 'adaeze@motors.ng',
    signedUpAt: 'Nov 10, 2024',
    status: 'rewarded',
    reward: 2,
  },
  {
    id: '2',
    name: 'Biodun Adeyemi',
    email: 'biodun@carshub.com',
    signedUpAt: 'Nov 14, 2024',
    status: 'verified',
    reward: 2,
  },
  {
    id: '3',
    name: 'Ifeanyi Obi',
    email: 'ifeanyi@autos.ng',
    signedUpAt: 'Nov 17, 2024',
    status: 'pending',
    reward: 0,
  },
  {
    id: '4',
    name: 'Sola Martins',
    email: 'sola@premiumcars.com',
    signedUpAt: 'Oct 28, 2024',
    status: 'rewarded',
    reward: 2,
  },
];

const steps = [
  {
    num: '1',
    title: 'Share your link',
    desc: 'Send your unique referral link to other car dealers via WhatsApp, email, or social media.',
    icon: '🔗',
    color: COLORS.primary,
  },
  {
    num: '2',
    title: 'They sign up',
    desc: "When a dealer creates a Drivia account using your link, they're tracked to your referral.",
    icon: '👤',
    color: '#DD6B20',
  },
  {
    num: '3',
    title: 'You both earn',
    desc: 'Once they verify their dealership, you receive 2 free listing slots. They get a 7-day Pro trial.',
    icon: '🎁',
    color: '#276749',
  },
];

export default function ReferralsPage() {
  return (
    <AppLayout>
      <PageTopBar breadcrumb="Drivia / Referrals" title="Referrals" />
      <Box p="28px">
        <ReferralLinkCard
          referralCode="DRIVIA-CHUKWUDI"
          referralUrl="https://drivia.ng/ref/DRIVIA-CHUKWUDI"
          totalEarned={8}
          pendingRewards={2}
        />

        {/* How it works */}
        <Box
          bg="white"
          borderRadius="16px"
          p="22px"
          boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          mb="16px"
        >
          <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">
            How Referrals Work
          </Text>
          <Text fontSize="12px" color="gray.400" mb="20px">
            Simple 3-step process to earn free listings
          </Text>
          <Grid templateColumns="repeat(3,1fr)" gap="16px">
            {steps.map((s) => (
              <Box
                key={s.num}
                p="20px"
                bg="gray.50"
                borderRadius="14px"
                border="1px solid"
                borderColor="gray.100"
              >
                <Text fontSize="28px" mb="10px">
                  {s.icon}
                </Text>
                <HStack gap="8px" mb="6px">
                  <Flex
                    w="22px"
                    h="22px"
                    borderRadius="50%"
                    bg={s.color}
                    align="center"
                    justify="center"
                    color="white"
                    fontSize="11px"
                    fontWeight="900"
                  >
                    {s.num}
                  </Flex>
                  <Text fontSize="13px" fontWeight="800" color="gray.800">
                    {s.title}
                  </Text>
                </HStack>
                <Text fontSize="12px" color="gray.500" lineHeight="1.6">
                  {s.desc}
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* Earnings tracker */}
        <Grid templateColumns="repeat(4,1fr)" gap="12px" mb="16px">
          {[
            {
              label: 'Total Referred',
              value: referrals.length,
              color: COLORS.primary,
              icon: '👥',
            },
            {
              label: 'Verified',
              value: referrals.filter((r) => r.status !== 'pending').length,
              color: '#DD6B20',
              icon: '✅',
            },
            {
              label: 'Listings Earned',
              value:
                referrals.filter((r) => r.status === 'rewarded').length * 2,
              color: '#276749',
              icon: '🎁',
            },
            {
              label: 'Pending Reward',
              value:
                referrals.filter((r) => r.status === 'verified').length * 2,
              color: '#805AD5',
              icon: '⏳',
            },
          ].map((s) => (
            <Box
              key={s.label}
              bg="white"
              borderRadius="12px"
              p="16px 20px"
              boxShadow="0 2px 10px rgba(0,0,0,0.05)"
            >
              <Text fontSize="22px" mb="4px">
                {s.icon}
              </Text>
              <Text fontSize="24px" fontWeight="900" color={s.color}>
                {s.value}
              </Text>
              <Text fontSize="11px" color="gray.400" mt="2px">
                {s.label}
              </Text>
            </Box>
          ))}
        </Grid>

        <ReferralHistoryList referrals={referrals} />
        <PageFooter period="30 days" />
      </Box>
    </AppLayout>
  );
}

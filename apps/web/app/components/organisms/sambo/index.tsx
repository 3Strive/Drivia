'use client';

import React from 'react';
import { Box, Grid, Flex, Text, VStack, HStack, Link } from '@chakra-ui/react';
import { COLORS } from '../../atoms';
import { ReferralHistoryList } from './ReferalHistory';
import { PageFooter } from '../PageFooter';
import { ReferralLinkCard } from './ReferalLinkCard';
import { PageTopBar } from '../../molecules';
import AppLayout from '../../template/general-layout';
import { FiGift } from 'react-icons/fi';
import { Referral } from '../../../shared/types';
import { IoPeople, IoPerson } from 'react-icons/io5';
import {
  FaCheck,
  FaFacebook,
  FaGift,
  FaHandPointDown,
  FaInstagram,
  FaLink,
  FaMoneyBill,
  FaPeopleArrows,
  FaShare,
  FaStore,
  FaWhatsapp,
} from 'react-icons/fa';
import { GiSandsOfTime } from 'react-icons/gi';

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

const ShareListing = [
  {
    num: '1',
    title: 'Share a listing from the MarketPlace',
    desc: 'For each listing you have a generated referral link which you can give to clients to contact the dealer',
    icon: (
      <HStack>
        <FaStore size={20} />
        <FaShare size={20} />
        <FaFacebook size={10} />
        <FaWhatsapp size={10} />
        <FaInstagram size={10} />
      </HStack>
    ),
    color: COLORS.primary,
  },
  {
    num: '2',
    title: 'Client clicks the link',
    desc: 'When a client clicks your referal link and he/she clicks the contact dealer button, they become a lead.',
    icon: <IoPerson size={30} />,
    color: '#DD6B20',
  },
  {
    num: '3',
    title: 'After successful deal, dealer pays you your commission',
    desc: 'Once the deal is successful dealer pays you your commission',
    icon: <FaMoneyBill size={20} />,
    color: '#276749',
  },
];

export default function Sambo() {
  return (
    <AppLayout>
      <PageTopBar breadcrumb="Drivia / Sambo" title="Car Referrals" />
      <Box p="28px">
        <ReferralLinkCard
          referralCode="DRIVIA-CHUKWUDI"
          referralUrl="https://drivia.ng/ref/DRIVIA-CHUKWUDI/carRefId"
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
            How Car Referrals Work
          </Text>
          <Text fontSize="12px" color="gray.400" mb="20px">
            Simple 3-step process to earn from sharing listings
          </Text>
          <Grid templateColumns="repeat(3,1fr)" gap="16px">
            {ShareListing.map((s) => (
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
                    bg={COLORS.primary}
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
              label: 'Total Shared',
              value: referrals.length,
              color: COLORS.primary,
              icon: <IoPeople size={20} />,
            },
            {
              label: 'Total Clicked',
              value: referrals.filter((r) => r.status !== 'pending').length,
              color: '#DD6B20',
              icon: <FaHandPointDown size={20} />,
            },
            {
              label: 'Total Leads',
              value:
                referrals.filter((r) => r.status === 'rewarded').length * 2,
              color: '#276749',
              icon: <FaPeopleArrows size={20} />,
            },
            {
              label: 'Pending Commission',
              value:
                referrals.filter((r) => r.status === 'verified').length * 2,
              color: '#3B82F6',
              icon: <GiSandsOfTime />,
            },
          ].map((s) => (
            <Box
              key={s.label}
              bg="white"
              borderRadius="12px"
              p="16px 20px"
              boxShadow="0 2px 10px rgba(0,0,0,0.05)"
            >
              <Box fontSize="22px" mb="4px">
                {s.icon}
              </Box>
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

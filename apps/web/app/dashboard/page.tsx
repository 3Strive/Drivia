'use client';

import React from 'react';
import { Box, Grid, Flex, Text, HStack, VStack } from '@chakra-ui/react';
import AppLayout from '../components/template/general-layout';
import { PageTopBar } from '../components/molecules';
import {
  BestSellingCarsTable,
  KpiGrid,
  LeadSourcesPie,
  PageFooter,
  RevenueChart,
} from '../components/organisms';
import { COLORS } from '../components/atoms';
import {
  FaBroadcastTower,
  FaCamera,
  FaCar,
  FaEye,
  FaHeart,
  FaPlus,
} from 'react-icons/fa';
import {
  IoAnalytics,
  IoChatbubbleOutline,
  IoChatbubbles,
  IoChatbubblesOutline,
} from 'react-icons/io5';
import { FaPaperclip } from 'react-icons/fa';

const revenueData = [
  { month: 'Jun', revenue: 38000000, sales: 2 },
  { month: 'Jul', revenue: 52000000, sales: 3 },
  { month: 'Aug', revenue: 41000000, sales: 2 },
  { month: 'Sep', revenue: 67000000, sales: 4 },
  { month: 'Oct', revenue: 85000000, sales: 5 },
  { month: 'Nov', revenue: 63000000, sales: 3 },
];

const pieData = [
  { name: 'WhatsApp', value: 42, color: '#25D366' },
  { name: 'Facebook', value: 28, color: '#1877F2' },
  { name: 'Instagram', value: 21, color: '#E1306C' },
  { name: 'Walk-in', value: 14, color: '#718096' },
  { name: 'Other', value: 19, color: '#CBD5E0' },
];

const topCars = [
  {
    make: 'Toyota',
    model: 'Camry',
    sold: 8,
    revenue: 132000000,
    avgDays: 12,
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=60&h=40&fit=crop',
  },
  {
    make: 'Honda',
    model: 'CR-V',
    sold: 6,
    revenue: 126000000,
    avgDays: 18,
    img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=60&h=40&fit=crop',
  },
  {
    make: 'Lexus',
    model: 'RX350',
    sold: 5,
    revenue: 140000000,
    avgDays: 9,
    img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=60&h=40&fit=crop',
  },
];

const recentActivity = [
  {
    icon: <IoChatbubbleOutline />,
    text: 'New WhatsApp lead for Toyota Camry',
    time: '2 min ago',
    color: '#25D366',
  },
  {
    icon: <FaCar />,
    text: 'Honda CR-V marked as sold',
    time: '18 min ago',
    color: '#276749',
  },
  {
    icon: <FaEye />,
    text: 'Lexus RX350 listing viewed 12 times',
    time: '1 hr ago',
    color: COLORS.primary,
  },
  {
    icon: <FaCamera />,
    text: 'Mercedes C300 photos uploaded',
    time: '2 hrs ago',
    color: '#805AD5',
  },
  {
    icon: <IoChatbubbles />,
    text: 'Price negotiation started on Highlander',
    time: '3 hrs ago',
    color: '#DD6B20',
  },
];

const quickStats = [
  { label: 'Active Listings', value: 14, color: COLORS.primary },
  { label: "Today's Leads", value: 7, color: '#25D366' },
  { label: 'Pending Follow-ups', value: 3, color: '#DD6B20' },
  { label: 'Viewings This Week', value: 5, color: '#805AD5' },
];

const totalRevenue = revenueData.reduce((a, d) => a + d.revenue, 0);
const totalSold = revenueData.reduce((a, d) => a + d.sales, 0);
const avgSalePrice = Math.round(totalRevenue / totalSold);

export default function DashboardPage() {
  return (
    <AppLayout>
      <PageTopBar breadcrumb="Drivia / Dashboard" title="Dashboard" />
      <Box p="28px">
        <Grid templateColumns="repeat(4,1fr)" gap="12px" mb="22px">
          {quickStats.map((s) => (
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

        <KpiGrid
          totalRevenue={totalRevenue}
          totalSold={totalSold}
          avgSalePrice={avgSalePrice}
          convRate={38}
        />

        <Grid templateColumns="1.8fr 1fr" gap="16px" mb="16px">
          <RevenueChart data={revenueData} totalRevenue={totalRevenue} />
          <LeadSourcesPie data={pieData} />
        </Grid>

        <Grid templateColumns="1.4fr 1fr" gap="16px" mb="16px">
          <BestSellingCarsTable cars={topCars} />
          <Box
            bg="white"
            borderRadius="16px"
            p="22px"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">
              Recent Activity
            </Text>
            <Text fontSize="12px" color="gray.400" mb="16px">
              Latest updates across your dealership
            </Text>
            <VStack gap="0" align="stretch">
              {recentActivity.map((a, i) => (
                <Flex
                  key={i}
                  gap="12px"
                  py="11px"
                  borderBottom="1px solid"
                  borderColor="gray.50"
                  _last={{ borderBottom: 'none' }}
                  align="flex-start"
                >
                  <Flex
                    w="30px"
                    h="30px"
                    borderRadius="8px"
                    bg={`${a.color}15`}
                    align="center"
                    justify="center"
                    fontSize="14px"
                    flexShrink={0}
                  >
                    {a.icon}
                  </Flex>
                  <Box flex="1">
                    <Text fontSize="12px" fontWeight="600" color="gray.700">
                      {a.text}
                    </Text>
                    <Text fontSize="10px" color="gray.400" mt="2px">
                      {a.time}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </VStack>
          </Box>
        </Grid>

        <Box
          bg="white"
          borderRadius="16px"
          p="22px"
          boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          mb="16px"
        >
          <Text fontWeight="800" fontSize="15px" color="gray.800" mb="16px">
            Quick Actions
          </Text>
          <HStack gap="12px" flexWrap="wrap">
            {[
              {
                icon: <FaPlus />,
                label: 'Add Car Listing',
                color: COLORS.primary,
              },
              {
                icon: <FaBroadcastTower />,
                label: `Send Broadcast`,
                color: '#25D366',
              },
              {
                icon: <IoAnalytics />,
                label: ` View Analytics`,
                color: '#805AD5',
              },
              {
                icon: <IoChatbubblesOutline />,
                label: `View All Leads`,
                color: '#DD6B20',
              },
              {
                icon: <FaPaperclip />,
                label: `Share Referral Link`,
                color: '#2C7A7B',
              },
            ].map((a) => (
              <HStack
                key={a.label}
                as="button"
                px="18px"
                py="10px"
                borderRadius="10px"
                bg={`${a.color}10`}
                color={a.color}
                fontSize="13px"
                fontWeight="700"
                border="1px solid"
                borderColor={`${a.color}30`}
                _hover={{ bg: `${a.color}20` }}
                transition="all 0.15s"
              >
                {a.icon} {a.label}
              </HStack>
            ))}
          </HStack>
        </Box>

        <PageFooter period="30 days" />
      </Box>
    </AppLayout>
  );
}

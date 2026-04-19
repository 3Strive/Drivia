'use client';

import React, { useState } from 'react';
import { Box, Grid, Flex, Text, VStack, HStack } from '@chakra-ui/react';
import AppLayout from '../components/template/general-layout';
import { PageTopBar } from '../components/molecules';
import { PlatformConnector } from '../components/organisms/PlatformConnector';
import { PostComposer } from '../components/organisms/PostComposer';
import {
  LeadSourcesPie,
  PageFooter,
  RevenueChart,
} from '../components/organisms';
import { COLORS } from '../components/atoms';

const engagementData = [
  { month: 'Jun', revenue: 1200, sales: 8 },
  { month: 'Jul', revenue: 1900, sales: 14 },
  { month: 'Aug', revenue: 1500, sales: 11 },
  { month: 'Sep', revenue: 2800, sales: 22 },
  { month: 'Oct', revenue: 3400, sales: 28 },
  { month: 'Nov', revenue: 2600, sales: 19 },
];

const pieData = [
  { name: 'Facebook', value: 40, color: '#1877F2' },
  { name: 'Instagram', value: 35, color: '#E1306C' },
  { name: 'WhatsApp', value: 25, color: '#25D366' },
];

const recentPosts = [
  {
    id: '1',
    caption: '2021 Toyota Camry XLE · ₦12.5M · DM to view 🚗',
    platform: 'facebook',
    platformColor: '#1877F2',
    likes: 42,
    comments: 8,
    reach: 312,
    postedAt: '2 hours ago',
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=80&h=60&fit=crop',
  },
  {
    id: '2',
    caption: 'Lexus RX350 2019 just arrived ✨ Priced at ₦22M',
    platform: 'instagram',
    platformColor: '#E1306C',
    likes: 87,
    comments: 14,
    reach: 621,
    postedAt: '1 day ago',
    img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=80&h=60&fit=crop',
  },
  {
    id: '3',
    caption: 'Weekend sale — all SUVs must go! Call or WhatsApp now.',
    platform: 'whatsapp',
    platformColor: '#25D366',
    likes: 0,
    comments: 0,
    reach: 124,
    postedAt: '3 days ago',
    img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=80&h=60&fit=crop',
  },
];

const platformIcons: Record<string, string> = {
  facebook: 'f',
  instagram: 'ig',
  whatsapp: 'W',
};

export default function SocialsPage() {
  const [connected, setConnected] = useState(['facebook', 'instagram']);

  return (
    <AppLayout>
      <PageTopBar breadcrumb="Drivia / Socials" title="Socials" />
      <Box p="28px">
        <PlatformConnector
          connected={connected}
          onConnect={(k) => setConnected((c) => [...c, k])}
          onDisconnect={(k) => setConnected((c) => c.filter((x) => x !== k))}
        />

        <PostComposer
          onPublish={(caption, platforms, schedule) =>
            console.log({ caption, platforms, schedule })
          }
        />

        <Grid templateColumns="1.8fr 1fr" gap="16px" mb="16px">
          <Box
            bg="white"
            borderRadius="16px"
            p="22px"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">
              Engagement Over Time
            </Text>
            <Text fontSize="12px" color="gray.400" mb="16px">
              Monthly reach across all platforms
            </Text>
            <RevenueChart
              data={engagementData}
              totalRevenue={engagementData.reduce((a, d) => a + d.revenue, 0)}
            />
          </Box>
          <LeadSourcesPie data={pieData} />
        </Grid>

        {/* Recent posts */}
        <Box
          bg="white"
          borderRadius="16px"
          p="22px"
          boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          mb="16px"
        >
          <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">
            Recent Posts
          </Text>
          <Text fontSize="12px" color="gray.400" mb="16px">
            Performance of your latest content
          </Text>
          <VStack gap="10px" align="stretch">
            {recentPosts.map((post) => (
              <Flex
                key={post.id}
                align="center"
                gap="14px"
                p="12px"
                borderRadius="12px"
                bg="gray.50"
                border="1px solid"
                borderColor="gray.100"
              >
                <Box
                  w="70px"
                  h="50px"
                  borderRadius="8px"
                  overflow="hidden"
                  flexShrink={0}
                >
                  <img
                    src={post.img}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                <Box flex="1" minW="0">
                  <Text
                    fontSize="12px"
                    fontWeight="600"
                    color="gray.800"
                    lineClamp={1}
                  >
                    {post.caption}
                  </Text>
                  <HStack gap="6px" mt="4px">
                    <Flex
                      w="16px"
                      h="16px"
                      borderRadius="4px"
                      bg={post.platformColor}
                      align="center"
                      justify="center"
                    >
                      <Text fontSize="7px" color="white" fontWeight="900">
                        {platformIcons[post.platform]}
                      </Text>
                    </Flex>
                    <Text fontSize="11px" color="gray.400">
                      {post.postedAt}
                    </Text>
                  </HStack>
                </Box>
                <HStack gap="16px" flexShrink={0}>
                  <VStack gap="0" align="center">
                    <Text fontSize="14px" fontWeight="800" color="gray.800">
                      {post.reach}
                    </Text>
                    <Text fontSize="10px" color="gray.400">
                      Reach
                    </Text>
                  </VStack>
                  <VStack gap="0" align="center">
                    <Text
                      fontSize="14px"
                      fontWeight="800"
                      color={COLORS.primary}
                    >
                      {post.likes}
                    </Text>
                    <Text fontSize="10px" color="gray.400">
                      Likes
                    </Text>
                  </VStack>
                  <VStack gap="0" align="center">
                    <Text fontSize="14px" fontWeight="800" color="#DD6B20">
                      {post.comments}
                    </Text>
                    <Text fontSize="10px" color="gray.400">
                      Comments
                    </Text>
                  </VStack>
                </HStack>
              </Flex>
            ))}
          </VStack>
        </Box>

        <PageFooter period="30 days" />
      </Box>
    </AppLayout>
  );
}

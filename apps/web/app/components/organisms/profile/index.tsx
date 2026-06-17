'use client';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Flex,
  Text,
  HStack,
  VStack,
  Switch,
  Button,
  Input,
} from '@chakra-ui/react';

import {
  COLORS,
  EditIco,
  LogOutIco,
  ShieldIco,
  StatusBadge,
  UserAvatar,
} from '../../atoms';
import AppLayout from '../../template/general-layout';
import { PageTopBar } from '../../molecules';
import { EditProfileForm } from './EditProfileForm';
import { PageFooter } from '../PageFooter';
import ChangePassword from './ChangePassword';
import { NotificationSettingsProps } from '../../../shared/types';
import Notification from './Notification';

const profileInitial = {
  businessName: 'Eko Premium Motors',
  ownerName: 'Chukwudi Obi',
  phone: '+234 801 234 5678',
  whatsapp: '+234 801 234 5678',
  email: 'chukwudi@ekomotors.com',
  address: '12 Broad Street, Lagos Island, Lagos',
  bio: 'Lagos-based dealership specialising in clean Tokunbo cars. Over 10 years experience. All cars thoroughly inspected before listing.',
};

const notificationSettings: NotificationSettingsProps[] = [
  {
    key: 'new_lead',
    label: 'New Lead Alert',
    desc: 'Get notified when a new enquiry comes in',
    defaultOn: true,
  },
  {
    key: 'broadcast',
    label: 'Broadcast Receipts',
    desc: 'Delivery and open rate updates',
    defaultOn: true,
  },
  {
    key: 'follow_up',
    label: 'Follow-up Reminders',
    desc: 'Reminders to contact scheduled leads',
    defaultOn: true,
  },
  {
    key: 'system',
    label: 'System Emails',
    desc: 'Billing, plan changes, security alerts',
    defaultOn: true,
  },
  {
    key: 'marketing',
    label: 'Drivia Product Updates',
    desc: 'New features and announcements',
    defaultOn: false,
  },
];

export default function Profile() {
  const [notifs, setNotifs] = useState<Record<string, boolean>>(
    Object.fromEntries(notificationSettings.map((n) => [n.key, n.defaultOn])),
  );
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  return (
    <AppLayout>
      <PageTopBar breadcrumb="Drivia / Profile" title="Profile" />
      <Box p="28px">
        {/* Dealer profile header card */}
        <Box
          bg="white"
          borderRadius="16px"
          p="24px"
          boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          mb="16px"
        >
          <Flex align="center" gap="20px" flexWrap="wrap">
            <Box position="relative">
              <UserAvatar
                src="https://i.pravatar.cc/80?img=47"
                fallback="C"
                size="lg"
              />
              <Box
                position="absolute"
                bottom="-4px"
                right="-4px"
                w="22px"
                h="22px"
                borderRadius="50%"
                bg={COLORS.primary}
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                border="2px solid white"
                color="white"
              >
                <EditIco />
              </Box>
            </Box>
            <Box flex="1">
              <HStack gap="10px" mb="4px">
                <Text fontSize="20px" fontWeight="900" color="gray.800">
                  Eko Premium Motors
                </Text>
                <StatusBadge status="success">✅ Verified</StatusBadge>
              </HStack>
              <Text fontSize="13px" color="gray.500">
                Chukwudi Obi · Lagos Island, Lagos
              </Text>
              <HStack gap="16px" mt="8px">
                {[
                  { label: 'Cars Listed', value: '18' },
                  { label: 'Cars Sold', value: '47' },
                  { label: 'Avg Rating', value: '4.8 ⭐' },
                  { label: 'Member Since', value: 'Jan 2023' },
                ].map((s) => (
                  <Box key={s.label}>
                    <Text fontSize="14px" fontWeight="800" color="gray.800">
                      {s.value}
                    </Text>
                    <Text fontSize="10px" color="gray.400">
                      {s.label}
                    </Text>
                  </Box>
                ))}
              </HStack>
            </Box>
            <Button
              bg="gray.100"
              color="gray.600"
              borderRadius="10px"
              fontSize="12px"
              fontWeight="700"
              h="36px"
              px="16px"
              _hover={{ bg: 'gray.200' }}
              display="flex"
              alignItems="center"
              gap="6px"
            >
              <ShieldIco /> Inspector Badge
            </Button>
          </Flex>
        </Box>

        <Grid templateColumns="1.2fr 1fr" gap="16px" mb="16px">
          <EditProfileForm
            initial={profileInitial}
            onSave={(data) => console.log('saved', data)}
          />
          <ChangePassword
            currentPw={currentPw}
            setCurrentPw={setCurrentPw}
            confirmPw={confirmPw}
            setConfirmPw={setConfirmPw}
            newPw={newPw}
            setNewPw={setNewPw}
          />
        </Grid>

        <Notification
          notificationSettings={notificationSettings}
          notifs={notifs}
          setNotifs={setNotifs}
        />

        {/* Danger zone */}
        <Box
          bg="white"
          borderRadius="16px"
          p="22px"
          boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          border="1px solid"
          borderColor="red.100"
          mb="16px"
        >
          <Text fontWeight="800" fontSize="15px" color="red.400" mb="4px">
            Danger Zone
          </Text>
          <Text fontSize="12px" color="gray.400" mb="16px">
            Irreversible actions — proceed with caution
          </Text>
          <HStack gap="12px" flexWrap="wrap">
            <Button
              bg="white"
              color="red.400"
              border="1px solid"
              borderColor="red.200"
              borderRadius="10px"
              fontSize="12px"
              fontWeight="700"
              h="36px"
              px="16px"
              _hover={{ bg: 'red.50' }}
              display="flex"
              alignItems="center"
              gap="6px"
            >
              <LogOutIco /> Sign Out of All Devices
            </Button>
            <Button
              bg="white"
              color="red.500"
              border="1px solid"
              borderColor="red.200"
              borderRadius="10px"
              fontSize="12px"
              fontWeight="700"
              h="36px"
              px="16px"
              _hover={{ bg: 'red.50' }}
            >
              Deactivate Account
            </Button>
            <Button
              bg="red.500"
              color="white"
              borderRadius="10px"
              fontSize="12px"
              fontWeight="700"
              h="36px"
              px="16px"
              _hover={{ bg: 'red.600' }}
            >
              Delete Account Permanently
            </Button>
          </HStack>
        </Box>

        <PageFooter period="30 days" />
      </Box>
    </AppLayout>
  );
}

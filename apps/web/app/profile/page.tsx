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
import AppLayout from '../components/template/general-layout';
import { PageTopBar } from '../components/molecules';
import {
  COLORS,
  EditIco,
  LogOutIco,
  ShieldIco,
  StatusBadge,
  UserAvatar,
} from '../components/atoms';
import { EditProfileForm } from '../components/organisms/EditProfileForm';
import { PageFooter } from '../components/organisms';

const profileInitial = {
  businessName: 'Eko Premium Motors',
  ownerName: 'Chukwudi Obi',
  phone: '+234 801 234 5678',
  whatsapp: '+234 801 234 5678',
  email: 'chukwudi@ekomotors.com',
  address: '12 Broad Street, Lagos Island, Lagos',
  bio: 'Lagos-based dealership specialising in clean Tokunbo cars. Over 10 years experience. All cars thoroughly inspected before listing.',
};

const notificationSettings = [
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

export default function ProfilePage() {
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

          {/* Password change */}
          <Box
            bg="white"
            borderRadius="16px"
            p="22px"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">
              Change Password
            </Text>
            <Text fontSize="12px" color="gray.400" mb="20px">
              Keep your account secure
            </Text>
            <VStack gap="12px" align="stretch" mb="16px">
              {[
                {
                  label: 'Current Password',
                  value: currentPw,
                  set: setCurrentPw,
                },
                { label: 'New Password', value: newPw, set: setNewPw },
                {
                  label: 'Confirm New Password',
                  value: confirmPw,
                  set: setConfirmPw,
                },
              ].map((f) => (
                <VStack key={f.label} align="start" gap="4px">
                  <Text fontSize="12px" fontWeight="700" color="gray.600">
                    {f.label}
                  </Text>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    borderRadius="10px"
                    fontSize="13px"
                    h="38px"
                    border="1px solid"
                    borderColor="gray.200"
                    _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }}
                  />
                </VStack>
              ))}
            </VStack>
            <Button
              bg={COLORS.primary}
              color="white"
              borderRadius="10px"
              fontSize="13px"
              fontWeight="700"
              h="38px"
              w="100%"
              _hover={{ bg: COLORS.primaryDark }}
              onClick={() => console.log('change password')}
            >
              Update Password
            </Button>
          </Box>
        </Grid>

        {/* Notification settings */}
        <Box
          bg="white"
          borderRadius="16px"
          p="22px"
          boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          mb="16px"
        >
          <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">
            Notifications
          </Text>
          <Text fontSize="12px" color="gray.400" mb="16px">
            Choose what you want to be notified about
          </Text>
          <VStack gap="0" align="stretch">
            {notificationSettings.map((n, i) => (
              <Flex
                key={n.key}
                justify="space-between"
                align="center"
                py="14px"
                borderBottom={
                  i < notificationSettings.length - 1 ? '1px solid' : 'none'
                }
                borderColor="gray.50"
              >
                <Box>
                  <Text fontSize="13px" fontWeight="700" color="gray.800">
                    {n.label}
                  </Text>
                  <Text fontSize="11px" color="gray.400" mt="2px">
                    {n.desc}
                  </Text>
                </Box>
                <Switch.Root
                  checked={notifs[n.key]}
                  onCheckedChange={() =>
                    setNotifs((s) => ({ ...s, [n.key]: !s[n.key] }))
                  }
                  colorScheme="purple"
                />
              </Flex>
            ))}
          </VStack>
        </Box>

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

import { Box, Flex, Switch, SwitchRoot, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { NotificationSettingsProps } from '../../../shared/types';
import { COLORS } from '../../atoms';

export const Notification = ({
  notificationSettings,
  setNotifs,
  notifs,
}: {
  notificationSettings: NotificationSettingsProps[];
  setNotifs: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  notifs: Record<string, boolean>;
}) => {
  return (
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
            >
              <Switch.HiddenInput />
              <Switch.Control
                bg="gray.300"
                _checked={{
                  bg: COLORS.primary,
                }}
              >
                <Switch.Thumb />
              </Switch.Control>
            </Switch.Root>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default Notification;

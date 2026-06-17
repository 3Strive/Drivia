import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { COLORS } from '../../atoms';

const ChangePassword = ({
  currentPw,
  setCurrentPw,
  newPw,
  setNewPw,
  confirmPw,
  setConfirmPw,
}: {
  currentPw: string;
  setCurrentPw: React.Dispatch<React.SetStateAction<string>>;
  newPw: string;
  setNewPw: React.Dispatch<React.SetStateAction<string>>;
  confirmPw: string;
  setConfirmPw: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
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
              p={3}
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
  );
};

export default ChangePassword;

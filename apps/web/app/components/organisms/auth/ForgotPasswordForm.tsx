import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import { COLORS } from '../../atoms';
import { useState } from 'react';

interface ForgotPasswordFormProps {
  onBack: () => void;
}

export const ForgotPasswordForm = ({ onBack }: ForgotPasswordFormProps) => {
  const [step, setStep] = useState<'email' | 'otp' | 'done'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  return (
    <VStack gap="0" align="stretch">
      <Text fontSize="26px" fontWeight="900" color="gray.800" mb="4px">
        Reset Password
      </Text>
      <Text fontSize="13px" color="gray.500" mb="24px">
        {step === 'email'
          ? "We'll send a code to your email"
          : step === 'otp'
            ? 'Enter the code we sent you'
            : 'All done!'}
      </Text>

      {step === 'email' && (
        <>
          <VStack align="start" gap="4px" mb="16px">
            <Text fontSize="12px" fontWeight="700" color="gray.600">
              Email Address
            </Text>
            <Input
              placeholder="you@dealership.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              borderRadius="10px"
              fontSize="13px"
              h="42px"
              border="1px solid"
              borderColor="gray.200"
              _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }}
            />
          </VStack>
          <Button
            bg={COLORS.primary}
            color="white"
            borderRadius="10px"
            fontSize="14px"
            fontWeight="700"
            h="44px"
            _hover={{ bg: COLORS.primaryDark }}
            onClick={() => setStep('otp')}
            mb="12px"
          >
            Send Code
          </Button>
        </>
      )}
      {step === 'otp' && (
        <>
          <VStack align="start" gap="4px" mb="16px">
            <Text fontSize="12px" fontWeight="700" color="gray.600">
              OTP Code
            </Text>
            <Input
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              borderRadius="10px"
              fontSize="13px"
              h="42px"
              border="1px solid"
              borderColor="gray.200"
              _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }}
            />
          </VStack>
          <VStack align="start" gap="4px" mb="16px">
            <Text fontSize="12px" fontWeight="700" color="gray.600">
              New Password
            </Text>
            <Input
              type="password"
              placeholder="••••••••"
              borderRadius="10px"
              fontSize="13px"
              h="42px"
              border="1px solid"
              borderColor="gray.200"
              _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }}
            />
          </VStack>
          <Button
            bg={COLORS.primary}
            color="white"
            borderRadius="10px"
            fontSize="14px"
            fontWeight="700"
            h="44px"
            _hover={{ bg: COLORS.primaryDark }}
            onClick={() => setStep('done')}
            mb="12px"
          >
            Reset Password
          </Button>
        </>
      )}
      {step === 'done' && (
        <Box textAlign="center" py="20px">
          <Text fontSize="40px" mb="10px">
            ✅
          </Text>
          <Text fontSize="15px" fontWeight="700" color="gray.800" mb="6px">
            Password reset!
          </Text>
          <Text fontSize="13px" color="gray.500">
            You can now sign in with your new password.
          </Text>
        </Box>
      )}
      <Text
        as="button"
        fontSize="12px"
        color="gray.400"
        textAlign="center"
        mt="8px"
        _hover={{ color: COLORS.primary }}
        onClick={onBack}
      >
        ← Back to Sign In
      </Text>
    </VStack>
  );
};

import React, { useState } from 'react';
import { Box, Flex, Text, VStack, HStack, Input, Button, Checkbox } from '@chakra-ui/react';
import { COLORS } from '../atoms/palette';
import { UserIco, EyeIco, ShieldIco } from '../atoms/icons';

// ─── AUTH SHELL ───────────────────────────────────────────────────────────────
export const AuthShell = ({ children }: { children: React.ReactNode }) => (
  <Flex minH="100vh" bg={COLORS.bg}>
    {/* Left Hero */}
    <Box
      display={{ base: 'none', md: 'flex' }} flexDirection="column"
      w="420px" flexShrink={0} bg={COLORS.primary} p="48px"
      justifyContent="space-between" position="relative" overflow="hidden"
    >
      <Box position="absolute" top="-60px" right="-60px" w="300px" h="300px"
        borderRadius="50%" bg="rgba(255,255,255,0.08)" />
      <Box position="absolute" bottom="-80px" left="-40px" w="240px" h="240px"
        borderRadius="50%" bg="rgba(255,255,255,0.05)" />
      <Box>
        <HStack gap="10px" mb="48px">
          <Flex w="36px" h="36px" borderRadius="10px" bg="rgba(255,255,255,0.2)"
            align="center" justify="center" color="white">
            <ShieldIco />
          </Flex>
          <Text fontSize="20px" fontWeight="900" color="white">Drivia</Text>
        </HStack>
        <Text fontSize="28px" fontWeight="900" color="white" lineHeight="1.2" mb="16px">
          The smarter way to run your dealership
        </Text>
        <Text fontSize="14px" color="rgba(255,255,255,0.75)" lineHeight="1.6">
          Track leads, manage inventory, broadcast to buyers, and grow sales — all in one place.
        </Text>
      </Box>
      <Box bg="rgba(255,255,255,0.1)" borderRadius="14px" p="18px">
        <Text fontSize="13px" color="white" fontStyle="italic" mb="10px">
          "Drivia helped me sell 3x more cars in one month. The WhatsApp tracking alone is worth it."
        </Text>
        <HStack gap="8px">
          <Flex w="32px" h="32px" borderRadius="50%" bg="rgba(255,255,255,0.3)"
            align="center" justify="center" color="white" fontSize="12px" fontWeight="800">A</Flex>
          <Box>
            <Text fontSize="12px" color="white" fontWeight="700">Adebayo Okafor</Text>
            <Text fontSize="11px" color="rgba(255,255,255,0.6)">Premium Auto, Lagos</Text>
          </Box>
        </HStack>
      </Box>
    </Box>
    {/* Right Form */}
    <Flex flex="1" align="center" justify="center" p="40px">
      <Box w="100%" maxW="400px">{children}</Box>
    </Flex>
  </Flex>
);

// ─── LOGIN FORM ───────────────────────────────────────────────────────────────
interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  onForgot: () => void;
  onRegister: () => void;
  loading?: boolean;
}

export const LoginForm = ({ onSubmit, onForgot, onRegister, loading }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <VStack gap="0" align="stretch">
      <Text fontSize="26px" fontWeight="900" color="gray.800" mb="4px">Welcome back</Text>
      <Text fontSize="13px" color="gray.500" mb="28px">Sign in to your Drivia account</Text>

      <VStack gap="14px" align="stretch" mb="20px">
        <VStack align="start" gap="4px">
          <Text fontSize="12px" fontWeight="700" color="gray.600">Email or Phone</Text>
          <Input placeholder="dealer@example.com" value={email}
            onChange={e => setEmail(e.target.value)}
            borderRadius="10px" fontSize="13px" h="42px"
            border="1px solid" borderColor="gray.200"
            _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }} />
        </VStack>
        <VStack align="start" gap="4px">
          <Flex justify="space-between" w="100%">
            <Text fontSize="12px" fontWeight="700" color="gray.600">Password</Text>
            <Text as="button" fontSize="12px" color={COLORS.primary} fontWeight="600"
              onClick={onForgot} _hover={{ textDecoration: 'underline' }}>
              Forgot password?
            </Text>
          </Flex>
          <Input type="password" placeholder="••••••••" value={password}
            onChange={e => setPassword(e.target.value)}
            borderRadius="10px" fontSize="13px" h="42px"
            border="1px solid" borderColor="gray.200"
            _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }} />
        </VStack>
      </VStack>

      <Button bg={COLORS.primary} color="white" borderRadius="10px"
        fontSize="14px" fontWeight="700" h="44px"
        _hover={{ bg: COLORS.primaryDark }}
        isLoading={loading}
        onClick={() => onSubmit(email, password)} mb="16px">
        Sign In
      </Button>

      <Text fontSize="12px" color="gray.500" textAlign="center">
        Don't have an account?{' '}
        <Text as="span" color={COLORS.primary} fontWeight="700" cursor="pointer"
          onClick={onRegister} _hover={{ textDecoration: 'underline' }}>
          Create one free
        </Text>
      </Text>
    </VStack>
  );
};

// ─── REGISTER FORM ────────────────────────────────────────────────────────────
interface RegisterFormProps {
  onSubmit: (data: Record<string, string>) => void;
  onLogin: () => void;
  loading?: boolean;
}

export const RegisterForm = ({ onSubmit, onLogin, loading }: RegisterFormProps) => {
  const [form, setForm] = useState({ name: '', business: '', phone: '', email: '', password: '' });
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  return (
    <VStack gap="0" align="stretch">
      <Text fontSize="26px" fontWeight="900" color="gray.800" mb="4px">Create your account</Text>
      <Text fontSize="13px" color="gray.500" mb="24px">Join 1,200+ dealers on Drivia</Text>

      <VStack gap="12px" align="stretch" mb="18px">
        {[
          { label: 'Full Name', key: 'name', placeholder: 'Chukwudi Obi', type: 'text' },
          { label: 'Business / Dealership Name', key: 'business', placeholder: 'Eko Motors Ltd', type: 'text' },
          { label: 'Phone / WhatsApp', key: 'phone', placeholder: '+234 801 234 5678', type: 'tel' },
          { label: 'Email', key: 'email', placeholder: 'you@dealership.com', type: 'email' },
          { label: 'Password', key: 'password', placeholder: '••••••••', type: 'password' },
        ].map(f => (
          <VStack key={f.key} align="start" gap="4px">
            <Text fontSize="12px" fontWeight="700" color="gray.600">{f.label}</Text>
            <Input type={f.type} placeholder={f.placeholder} value={(form as any)[f.key]}
              onChange={e => set(f.key, e.target.value)}
              borderRadius="10px" fontSize="13px" h="40px"
              border="1px solid" borderColor="gray.200"
              _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }} />
          </VStack>
        ))}
      </VStack>

      <Button bg={COLORS.primary} color="white" borderRadius="10px"
        fontSize="14px" fontWeight="700" h="44px"
        _hover={{ bg: COLORS.primaryDark }} isLoading={loading}
        onClick={() => onSubmit(form)} mb="14px">
        Create Account — It's Free
      </Button>

      <Text fontSize="11px" color="gray.400" textAlign="center" mb="12px">
        By signing up you agree to our Terms & Privacy Policy
      </Text>
      <Text fontSize="12px" color="gray.500" textAlign="center">
        Already have an account?{' '}
        <Text as="span" color={COLORS.primary} fontWeight="700" cursor="pointer"
          onClick={onLogin} _hover={{ textDecoration: 'underline' }}>
          Sign in
        </Text>
      </Text>
    </VStack>
  );
};

// ─── FORGOT PASSWORD FORM ─────────────────────────────────────────────────────
interface ForgotPasswordFormProps {
  onBack: () => void;
}

export const ForgotPasswordForm = ({ onBack }: ForgotPasswordFormProps) => {
  const [step, setStep] = useState<'email' | 'otp' | 'done'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  return (
    <VStack gap="0" align="stretch">
      <Text fontSize="26px" fontWeight="900" color="gray.800" mb="4px">Reset Password</Text>
      <Text fontSize="13px" color="gray.500" mb="24px">
        {step === 'email' ? "We'll send a code to your email" : step === 'otp' ? 'Enter the code we sent you' : 'All done!'}
      </Text>

      {step === 'email' && (
        <>
          <VStack align="start" gap="4px" mb="16px">
            <Text fontSize="12px" fontWeight="700" color="gray.600">Email Address</Text>
            <Input placeholder="you@dealership.com" value={email}
              onChange={e => setEmail(e.target.value)}
              borderRadius="10px" fontSize="13px" h="42px"
              border="1px solid" borderColor="gray.200"
              _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }} />
          </VStack>
          <Button bg={COLORS.primary} color="white" borderRadius="10px"
            fontSize="14px" fontWeight="700" h="44px" _hover={{ bg: COLORS.primaryDark }}
            onClick={() => setStep('otp')} mb="12px">Send Code</Button>
        </>
      )}
      {step === 'otp' && (
        <>
          <VStack align="start" gap="4px" mb="16px">
            <Text fontSize="12px" fontWeight="700" color="gray.600">OTP Code</Text>
            <Input placeholder="123456" value={otp} onChange={e => setOtp(e.target.value)}
              borderRadius="10px" fontSize="13px" h="42px" border="1px solid" borderColor="gray.200"
              _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }} />
          </VStack>
          <VStack align="start" gap="4px" mb="16px">
            <Text fontSize="12px" fontWeight="700" color="gray.600">New Password</Text>
            <Input type="password" placeholder="••••••••"
              borderRadius="10px" fontSize="13px" h="42px" border="1px solid" borderColor="gray.200"
              _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }} />
          </VStack>
          <Button bg={COLORS.primary} color="white" borderRadius="10px"
            fontSize="14px" fontWeight="700" h="44px" _hover={{ bg: COLORS.primaryDark }}
            onClick={() => setStep('done')} mb="12px">Reset Password</Button>
        </>
      )}
      {step === 'done' && (
        <Box textAlign="center" py="20px">
          <Text fontSize="40px" mb="10px">✅</Text>
          <Text fontSize="15px" fontWeight="700" color="gray.800" mb="6px">Password reset!</Text>
          <Text fontSize="13px" color="gray.500">You can now sign in with your new password.</Text>
        </Box>
      )}
      <Text as="button" fontSize="12px" color="gray.400" textAlign="center" mt="8px"
        _hover={{ color: COLORS.primary }} onClick={onBack}>← Back to Sign In</Text>
    </VStack>
  );
};

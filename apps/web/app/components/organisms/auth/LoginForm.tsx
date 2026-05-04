import { Button, Flex, Input, Text, VStack } from '@chakra-ui/react';
import { COLORS } from '../../atoms';
import { useState } from 'react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  onForgot: () => void;
  onRegister: () => void;
  loading?: boolean;
}

export const LoginForm = ({
  onSubmit,
  onForgot,
  onRegister,
  loading,
}: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <VStack gap="0" align="stretch">
      <Text fontSize="26px" fontWeight="900" color="gray.800" mb="4px">
        Welcome back
      </Text>
      <Text fontSize="13px" color="gray.500" mb="28px">
        Sign in to your Drivia account
      </Text>

      <VStack gap="14px" align="stretch" mb="20px">
        <VStack align="start" gap="4px">
          <Text fontSize="12px" fontWeight="700" color="gray.600">
            Email or Phone
          </Text>
          <Input
            placeholder="dealer@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            borderRadius="10px"
            fontSize="13px"
            h="42px"
            padding={3}
            border="1px solid"
            borderColor="gray.200"
            _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }}
          />
        </VStack>
        <VStack align="start" gap="4px">
          <Flex justify="space-between" w="100%">
            <Text fontSize="12px" fontWeight="700" color="gray.600">
              Password
            </Text>
            <Text
              as="button"
              fontSize="12px"
              color={COLORS.primary}
              fontWeight="600"
              onClick={onForgot}
              _hover={{ textDecoration: 'underline' }}
            >
              Forgot password?
            </Text>
          </Flex>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            borderRadius="10px"
            fontSize="13px"
            padding={3}
            h="42px"
            border="1px solid"
            borderColor="gray.200"
            _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }}
          />
        </VStack>
      </VStack>

      <Button
        bg={COLORS.primary}
        color="white"
        borderRadius="10px"
        fontSize="14px"
        fontWeight="700"
        h="44px"
        _hover={{ bg: COLORS.primaryDark }}
        loading={loading}
        onClick={() => onSubmit(email, password)}
        mb="16px"
      >
        Sign In
      </Button>

      <Text fontSize="12px" color="gray.500" textAlign="center">
        Don't have an account?{' '}
        <Text
          as="span"
          color={COLORS.primary}
          fontWeight="700"
          cursor="pointer"
          onClick={onRegister}
          _hover={{ textDecoration: 'underline' }}
        >
          Create one free
        </Text>
      </Text>
    </VStack>
  );
};

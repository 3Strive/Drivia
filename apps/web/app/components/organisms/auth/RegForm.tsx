import { Button, Input, Text, VStack } from '@chakra-ui/react';
import { Colors } from '../../ui/color-pack';
import { COLORS } from '../../atoms';
import { useState } from 'react';

interface RegisterFormProps {
  onSubmit: (data: Record<string, string>) => void;
  onLogin: () => void;
  loading?: boolean;
}

export const RegisterForm = ({
  onSubmit,
  onLogin,
  loading,
}: RegisterFormProps) => {
  const [form, setForm] = useState({
    name: '',
    business: '',
    phone: '',
    email: '',
    password: '',
  });
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <VStack gap="0" align="stretch">
      <Text fontSize="26px" fontWeight="900" color="gray.800" mb="4px">
        Create your account
      </Text>
      <Text fontSize="13px" color="gray.500" mb="24px">
        Join 1,200+ dealers on Drivia
      </Text>

      <VStack gap="12px" align="stretch" mb="18px">
        {[
          {
            label: 'Email',
            key: 'email',
            placeholder: 'you@dealership.com',
            type: 'email',
          },
          {
            label: 'Password',
            key: 'password',
            placeholder: 'Create a password',
            type: 'password',
          },
        ].map((f) => (
          <VStack key={f.key} align="start" gap="4px">
            <Text fontSize="12px" fontWeight="700" color="gray.600">
              {f.label}
            </Text>
            <Input
              type={f.type}
              placeholder={f.placeholder}
              value={(form as any)[f.key]}
              onChange={(e) => set(f.key, e.target.value)}
              borderRadius="10px"
              fontSize="13px"
              h="40px"
              padding={3}
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
        fontSize="14px"
        fontWeight="700"
        h="44px"
        _hover={{ bg: COLORS.primaryDark }}
        loading={loading}
        onClick={() => onSubmit(form)}
        mb="14px"
      >
        Create Account — It's Free
      </Button>

      <Text fontSize="11px" color="gray.400" textAlign="center" mb="12px">
        By signing up you agree to our Terms & Privacy Policy
      </Text>
      <Text fontSize="12px" color="gray.500" textAlign="center">
        Already have an account?{' '}
        <Text
          as="span"
          color={COLORS.primary}
          fontWeight="700"
          cursor="pointer"
          onClick={onLogin}
          _hover={{ textDecoration: 'underline' }}
        >
          Sign in
        </Text>
      </Text>
    </VStack>
  );
};

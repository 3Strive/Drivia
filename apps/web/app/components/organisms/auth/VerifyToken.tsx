import React from 'react';
import { Button, Field, PinInput, Stack, Text, VStack } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { COLORS } from '../../atoms';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  pin: z
    .array(z.string().min(1))
    .min(1, { message: 'Pin is required' })
    .length(4, { message: 'Pin must be 4 digits long' }),
});

type FormValues = z.infer<typeof formSchema>;
const VerifyToken = ({
  email,
  onLogin,
}: {
  email: string;
  onLogin: () => void;
}) => {
  const { handleSubmit, control, formState } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: ['', '', '', ''],
    },
  });
  const [loading, isLoading] = React.useState(false);
  const router = useRouter();
  const onSubmit = handleSubmit((data) => {
    console.log(data, email);
    isLoading(true);
    router.push('/dashboard');
  });

  return (
    <VStack gap="0" align="stretch">
      <Text fontSize="26px" fontWeight="900" color="gray.800" mb="4px">
        Verify Your Account
      </Text>
      <Text fontSize="13px" color="gray.500" mb="28px">
        We emailed you the 4-digit code to {email}
      </Text>

      <VStack gap="14px" align="stretch" mb="20px">
        <VStack align="start" gap="4px">
          <Text fontSize="12px" fontWeight="700" color="gray.600">
            Enter the 4-digit code
          </Text>
          <form onSubmit={onSubmit}>
            <Stack gap="4" align="flex-start" maxW="sm">
              <Field.Root invalid={!!formState.errors.pin}>
                <Controller
                  control={control}
                  name="pin"
                  render={({ field }) => (
                    <PinInput.Root
                      value={field.value}
                      onValueChange={(e) => field.onChange(e.value)}
                      type="numeric"
                      size={'2xl'}
                    >
                      <PinInput.HiddenInput />
                      <PinInput.Control>
                        <PinInput.Input index={0} />
                        <PinInput.Input index={1} />
                        <PinInput.Input index={2} />
                        <PinInput.Input index={3} />
                      </PinInput.Control>
                    </PinInput.Root>
                  )}
                />
                <Field.ErrorText>
                  {formState.errors.pin?.message}
                </Field.ErrorText>
              </Field.Root>
              <Button
                bg={COLORS.primary}
                type="submit"
                color="white"
                borderRadius="10px"
                fontSize="14px"
                fontWeight="700"
                h="44px"
                w={'full'}
                _hover={{ bg: COLORS.primaryDark }}
                loading={loading}
                mb="16px"
              >
                Sign In
              </Button>{' '}
            </Stack>
          </form>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default VerifyToken;

import { Box, Button, Flex, Grid, Input, Text, VStack } from '@chakra-ui/react';
import { ChevronRightIco, COLORS, UploadIco } from '../../../atoms';
import { useState } from 'react';

export const OnboardingStep1Profile = ({ onNext }: { onNext: () => void }) => {
  const [form, setForm] = useState({
    name: '',
    business: '',
    phone: '',
    city: '',
  });
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  return (
    <VStack gap="0" align="stretch">
      <Text fontSize="22px" fontWeight="900" color="gray.800" mb="4px">
        Set up your dealership
      </Text>
      <Text fontSize="13px" color="gray.500" mb="24px">
        Tell buyers who you are
      </Text>
      <Flex align="center" justify="center" mb="20px">
        <Box
          w="80px"
          h="80px"
          borderRadius="20px"
          bg="gray.100"
          border="2px dashed"
          borderColor="gray.300"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          _hover={{ borderColor: COLORS.primary }}
        >
          <VStack gap="2px">
            <Box color="gray.400">
              <UploadIco />
            </Box>
            <Text fontSize="9px" color="gray.400">
              Logo
            </Text>
          </VStack>
        </Box>
      </Flex>
      <Grid templateColumns="1fr 1fr" gap="12px" mb="20px">
        {[
          { label: 'Full Name', key: 'name', placeholder: 'Chukwudi Obi' },
          {
            label: 'Business Name',
            key: 'business',
            placeholder: 'Eko Motors',
          },
          { label: 'WhatsApp', key: 'phone', placeholder: '+234 801 234 5678' },
          { label: 'City', key: 'city', placeholder: 'Lagos' },
        ].map((f) => (
          <VStack key={f.key} align="start" gap="4px">
            <Text fontSize="12px" fontWeight="700" color="gray.600">
              {f.label}
            </Text>
            <Input
              placeholder={f.placeholder}
              value={(form as any)[f.key]}
              onChange={(e) => set(f.key, e.target.value)}
              borderRadius="10px"
              p={3}
              fontSize="13px"
              h="40px"
              border="1px solid"
              borderColor="gray.200"
              _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }}
            />
          </VStack>
        ))}
      </Grid>
      <Button
        bg={COLORS.primary}
        color="white"
        borderRadius="10px"
        fontSize="13px"
        fontWeight="700"
        h="44px"
        _hover={{ bg: COLORS.primaryDark }}
        onClick={onNext}
        display="flex"
        alignItems="center"
        gap="6px"
      >
        Continue <ChevronRightIco />
      </Button>
    </VStack>
  );
};

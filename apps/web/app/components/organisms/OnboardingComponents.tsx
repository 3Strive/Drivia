import React, { useState } from 'react';
import { Box, Flex, Text, VStack, HStack, Input, Button, Grid } from '@chakra-ui/react';
import { COLORS } from '../atoms/palette';
import { CheckIco, UploadIco, ChevronRightIco } from '../atoms/icons';

type OnboardingStep = 1 | 2 | 3 | 4;
const STEPS = ['Profile', 'Inventory', 'Socials', 'Done'];

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
export const OnboardingProgressBar = ({ step }: { step: OnboardingStep }) => (
  <Flex align="center" justify="center" gap="0" mb="40px">
    {STEPS.map((s, i) => {
      const done = i + 1 < step;
      const active = i + 1 === step;
      return (
        <Flex key={s} align="center">
          <VStack gap="4px">
            <Flex w="32px" h="32px" borderRadius="50%" align="center" justify="center"
              bg={done ? '#276749' : active ? COLORS.primary : 'gray.200'}
              color={done || active ? 'white' : 'gray.400'}
              fontSize="12px" fontWeight="800">
              {done ? <CheckIco /> : i + 1}
            </Flex>
            <Text fontSize="10px" fontWeight="600"
              color={active ? COLORS.primary : done ? '#276749' : 'gray.400'}>{s}</Text>
          </VStack>
          {i < STEPS.length - 1 && (
            <Box w="60px" h="2px" bg={done ? '#276749' : 'gray.200'} mx="4px" mb="16px" />
          )}
        </Flex>
      );
    })}
  </Flex>
);

// ─── STEP 1: PROFILE ──────────────────────────────────────────────────────────
export const OnboardingStep1Profile = ({ onNext }: { onNext: () => void }) => {
  const [form, setForm] = useState({ name: '', business: '', phone: '', city: '' });
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  return (
    <VStack gap="0" align="stretch">
      <Text fontSize="22px" fontWeight="900" color="gray.800" mb="4px">Set up your dealership</Text>
      <Text fontSize="13px" color="gray.500" mb="24px">Tell buyers who you are</Text>
      <Flex align="center" justify="center" mb="20px">
        <Box w="80px" h="80px" borderRadius="20px" bg="gray.100" border="2px dashed"
          borderColor="gray.300" display="flex" alignItems="center" justifyContent="center"
          cursor="pointer" _hover={{ borderColor: COLORS.primary }}>
          <VStack gap="2px">
            <Box color="gray.400"><UploadIco /></Box>
            <Text fontSize="9px" color="gray.400">Logo</Text>
          </VStack>
        </Box>
      </Flex>
      <Grid templateColumns="1fr 1fr" gap="12px" mb="20px">
        {[
          { label: 'Full Name', key: 'name', placeholder: 'Chukwudi Obi' },
          { label: 'Business Name', key: 'business', placeholder: 'Eko Motors' },
          { label: 'WhatsApp', key: 'phone', placeholder: '+234 801 234 5678' },
          { label: 'City', key: 'city', placeholder: 'Lagos' },
        ].map(f => (
          <VStack key={f.key} align="start" gap="4px">
            <Text fontSize="12px" fontWeight="700" color="gray.600">{f.label}</Text>
            <Input placeholder={f.placeholder} value={(form as any)[f.key]}
              onChange={e => set(f.key, e.target.value)}
              borderRadius="10px" fontSize="13px" h="40px"
              border="1px solid" borderColor="gray.200"
              _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }} />
          </VStack>
        ))}
      </Grid>
      <Button bg={COLORS.primary} color="white" borderRadius="10px" fontSize="13px" fontWeight="700"
        h="44px" _hover={{ bg: COLORS.primaryDark }} onClick={onNext}
        display="flex" alignItems="center" gap="6px">
        Continue <ChevronRightIco />
      </Button>
    </VStack>
  );
};

// ─── STEP 2: INVENTORY ────────────────────────────────────────────────────────
export const OnboardingStep2Inventory = ({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) => (
  <VStack gap="0" align="stretch">
    <Text fontSize="22px" fontWeight="900" color="gray.800" mb="4px">Add your first car</Text>
    <Text fontSize="13px" color="gray.500" mb="24px">Get visible on the Drivia marketplace instantly</Text>
    <Grid templateColumns="1fr 1fr" gap="12px" mb="20px">
      {[
        { label: 'Make', placeholder: 'Toyota' },
        { label: 'Model', placeholder: 'Camry' },
        { label: 'Year', placeholder: '2021' },
        { label: 'Price (₦)', placeholder: '12,500,000' },
      ].map(f => (
        <VStack key={f.label} align="start" gap="4px">
          <Text fontSize="12px" fontWeight="700" color="gray.600">{f.label}</Text>
          <Input placeholder={f.placeholder} borderRadius="10px" fontSize="13px" h="40px"
            border="1px solid" borderColor="gray.200"
            _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }} />
        </VStack>
      ))}
    </Grid>
    <HStack gap="10px">
      <Button flex="1" bg={COLORS.primary} color="white" borderRadius="10px"
        fontSize="13px" fontWeight="700" h="44px" _hover={{ bg: COLORS.primaryDark }}
        onClick={onNext}>Add & Continue</Button>
      <Button variant="ghost" borderRadius="10px" fontSize="13px" fontWeight="600"
        color="gray.400" h="44px" onClick={onSkip}>Skip for now</Button>
    </HStack>
  </VStack>
);

// ─── STEP 3: SOCIALS ──────────────────────────────────────────────────────────
export const OnboardingStep3Socials = ({ onNext }: { onNext: () => void }) => {
  const [connected, setConnected] = useState<string[]>([]);
  const toggle = (k: string) => setConnected(s => s.includes(k) ? s.filter(x => x !== k) : [...s, k]);
  const platforms = [
    { key: 'whatsapp', label: 'WhatsApp Business', color: '#25D366', icon: 'W' },
    { key: 'facebook', label: 'Facebook Page', color: '#1877F2', icon: 'f' },
    { key: 'instagram', label: 'Instagram Business', color: '#E1306C', icon: 'ig' },
  ];
  return (
    <VStack gap="0" align="stretch">
      <Text fontSize="22px" fontWeight="900" color="gray.800" mb="4px">Connect your socials</Text>
      <Text fontSize="13px" color="gray.500" mb="24px">Track leads from all your platforms automatically</Text>
      <VStack gap="10px" align="stretch" mb="20px">
        {platforms.map(p => {
          const active = connected.includes(p.key);
          return (
            <Flex key={p.key} align="center" justify="space-between" p="14px" borderRadius="12px"
              border="2px solid" borderColor={active ? p.color : 'gray.200'}
              bg={active ? `${p.color}08` : 'white'} cursor="pointer" onClick={() => toggle(p.key)}>
              <HStack gap="12px">
                <Flex w="36px" h="36px" borderRadius="10px" bg={p.color}
                  align="center" justify="center">
                  <Text fontSize="11px" color="white" fontWeight="900">{p.icon}</Text>
                </Flex>
                <Text fontSize="13px" fontWeight="700" color="gray.800">{p.label}</Text>
              </HStack>
              <Flex w="22px" h="22px" borderRadius="50%"
                bg={active ? '#C6F6D5' : 'gray.100'}
                align="center" justify="center" color={active ? '#276749' : 'gray.300'}>
                <CheckIco />
              </Flex>
            </Flex>
          );
        })}
      </VStack>
      <Button bg={COLORS.primary} color="white" borderRadius="10px" fontSize="13px" fontWeight="700"
        h="44px" _hover={{ bg: COLORS.primaryDark }} onClick={onNext}>Continue</Button>
    </VStack>
  );
};

// ─── STEP 4: DONE ─────────────────────────────────────────────────────────────
export const OnboardingStep4Done = ({ onFinish }: { onFinish: () => void }) => (
  <VStack gap="0" align="center" textAlign="center">
    <Text fontSize="56px" mb="16px">🎉</Text>
    <Text fontSize="24px" fontWeight="900" color="gray.800" mb="8px">You're all set!</Text>
    <Text fontSize="14px" color="gray.500" mb="28px" maxW="320px">
      Your dealership is live on Drivia. Start tracking leads and selling faster.
    </Text>
    {[
      { icon: '✅', text: 'Dealership profile created' },
      { icon: '✅', text: 'First listing published' },
      { icon: '✅', text: 'Social accounts connected' },
    ].map(item => (
      <HStack key={item.text} gap="8px" mb="8px">
        <Text fontSize="14px">{item.icon}</Text>
        <Text fontSize="13px" color="gray.600">{item.text}</Text>
      </HStack>
    ))}
    <Button bg={COLORS.primary} color="white" borderRadius="10px" fontSize="14px" fontWeight="700"
      h="48px" px="40px" _hover={{ bg: COLORS.primaryDark }} mt="24px" onClick={onFinish}>
      Go to Dashboard →
    </Button>
  </VStack>
);

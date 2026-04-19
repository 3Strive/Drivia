'use client';

import { ChangeEvent, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react';
//import { InputField } from '../../../molecules/Input-field';
import { Colors } from '../../../ui/color-pack';
//import { NavButtons } from '../../../molecules/nav-buttons';
import { useRouter } from 'next/navigation';

type Step1Props = {
  onNext: () => void;
};

export const Step1 = ({ onNext }: Step1Props): JSX.Element => {
  const [phone, setPhone] = useState<string>('');

  return (
    <Box>
      <Text fontSize="10px" fontWeight="700" color={Colors.P} mb="10px">
        Step 1
      </Text>

      <Heading fontSize="24px" mb="10px">
        Welcome 👋
      </Heading>

      <InputField
        label="Phone Number"
        placeholder="0801 234 5678"
        value={phone}
        onChange={setPhone}
        prefix="🇳🇬"
        type="tel"
      />

      <NavButtons onNext={onNext} />
    </Box>
  );
};

type Step2Props = {
  onNext: () => void;
  onBack: () => void;
};

export const Step2 = ({ onNext, onBack }: Step2Props): JSX.Element => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);

  const handleOtp = (value: string, index: number): void => {
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
  };

  return (
    <Box>
      <Text fontSize="10px" fontWeight="700" color={Colors.P} mb="10px">
        Step 1
      </Text>

      <Heading fontSize="24px" mb="10px">
        OTP 👋
      </Heading>
      <HStack>
        {otp.map((val, i) => (
          <Input
            key={i}
            value={val}
            maxLength={1}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleOtp(e.target.value, i)
            }
          />
        ))}
      </HStack>

      <NavButtons onBack={onBack} onNext={onNext} />
    </Box>
  );
};

type Step3Props = {
  onNext: () => void;
  onBack: () => void;
};

export const Step3 = ({ onNext, onBack }: Step3Props): JSX.Element => {
  const [bizName, setBizName] = useState<string>('');
  const [yourName, setYourName] = useState<string>('');
  const [yearEst, setYearEst] = useState<string>('');

  return (
    <Box>
      <InputField
        label="Business Name"
        value={bizName}
        onChange={setBizName}
        placeholder="Lagos Auto Hub"
      />

      <InputField
        label="Your Name"
        value={yourName}
        onChange={setYourName}
        placeholder="Full name"
      />

      <InputField
        label="Year Established"
        value={yearEst}
        onChange={setYearEst}
        placeholder="2019"
      />

      <NavButtons onBack={onBack} onNext={onNext} />
    </Box>
  );
};

const CAR_TYPES = ['Brand New', 'Tokunbo', 'SUVs'] as const;

type CarType = (typeof CAR_TYPES)[number];

type Step4Props = {
  onNext: () => void;
  onBack: () => void;
};

export const Step4 = ({ onNext, onBack }: Step4Props): JSX.Element => {
  const [primaryLoc, setPrimaryLoc] = useState<string>('');
  const [selectedTypes, setSelectedTypes] = useState<CarType[]>([]);

  const toggleType = (t: CarType): void => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  };

  return (
    <Box>
      <InputField
        label="Primary Location"
        placeholder="Enter location"
        value={primaryLoc}
        onChange={setPrimaryLoc}
      />

      <Flex gap="8px" wrap="wrap" mb="20px">
        {CAR_TYPES.map((t) => {
          const selected = selectedTypes.includes(t);

          return (
            <Box
              key={t}
              as="button"
              onClick={() => toggleType(t)}
              px="12px"
              py="6px"
              borderRadius="10px"
              bg={selected ? Colors.P_LIGHT : 'white'}
              border="1px solid"
              borderColor={selected ? Colors.P : Colors.LINE}
              fontSize="13px"
              fontWeight="600"
            >
              {t}
            </Box>
          );
        })}
      </Flex>

      <NavButtons onBack={onBack} onNext={onNext} />
    </Box>
  );
};

const PLATFORMS = [
  { id: 'whatsapp', name: 'WhatsApp' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'twitter', name: 'Twitter/X' },
] as const;

type PlatformId = (typeof PLATFORMS)[number]['id'];

type Step5Props = {
  onNext: () => void;
  onBack: () => void;
};

export const Step5 = ({ onNext, onBack }: Step5Props): JSX.Element => {
  const [selected, setSelected] = useState<PlatformId[]>([
    'whatsapp',
    'facebook',
  ]);

  const toggle = (id: PlatformId): void => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <Box>
      <Grid templateColumns="1fr 1fr" gap="10px" mb="20px">
        {PLATFORMS.map((pl) => {
          const isSelected = selected.includes(pl.id);

          return (
            <Flex
              key={pl.id}
              as="button"
              onClick={() => toggle(pl.id)}
              p="12px"
              border="1px solid"
              borderColor={isSelected ? Colors.P : Colors.LINE}
              borderRadius="10px"
              bg={isSelected ? Colors.P_LIGHT : 'white'}
            >
              <Text>{pl.name}</Text>
            </Flex>
          );
        })}
      </Grid>

      <NavButtons onBack={onBack} onNext={onNext} />
    </Box>
  );
};

const PLANS = [
  { id: 'free', name: 'Free', price: '₦0' },
  { id: 'pro', name: 'Pro', price: '₦15K' },
  { id: 'vvip', name: 'VVIP', price: '₦45K' },
] as const;

type PlanId = (typeof PLANS)[number]['id'];

type Step6Props = {
  onNext: () => void;
  onBack: () => void;
};

export const Step6 = ({ onNext, onBack }: Step6Props): JSX.Element => {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('free');

  return (
    <Box>
      <Grid templateColumns="repeat(3,1fr)" gap="10px" mb="20px">
        {PLANS.map((plan) => {
          const isSelected = selectedPlan === plan.id;

          return (
            <Box
              key={plan.id}
              as="button"
              onClick={() => setSelectedPlan(plan.id)}
              border="1px solid"
              borderColor={isSelected ? Colors.P : Colors.LINE}
              borderRadius="10px"
              p="12px"
              bg={isSelected ? Colors.P_LIGHT : 'white'}
            >
              <Text fontWeight="700">{plan.name}</Text>
              <Text color={Colors.P}>{plan.price}</Text>
            </Box>
          );
        })}
      </Grid>

      <NavButtons onBack={onBack} onNext={onNext} />
    </Box>
  );
};

type Step7Props = {}; // no props

export const Step7 = ({}: Step7Props): JSX.Element => {
  const router = useRouter();

  return (
    <Box textAlign="center">
      <Text fontSize="24px" fontWeight="800" mb="10px">
        You're all set!
      </Text>

      <Text mb="20px">
        Your dealer account is ready. Start adding listings.
      </Text>

      <Button
        bg={Colors.P}
        color="white"
        onClick={() => router.push('/dashboard')}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
};

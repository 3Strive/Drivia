'use client';

import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { COLORS } from '../../atoms';
import { OnboardingProgressBar } from '../../molecules/onboarding/ProgressBar';
import { OnboardingStep1Profile } from './steps/Profile';
import { OnboardingStep2Inventory } from './steps/Inventory';
import { OnboardingStep3Socials } from './steps/Socials';
import { OnboardingStep4Done } from './steps/Done';

type OnboardingStep = 1 | 2 | 3 | 4;

export default function Onboarding() {
  const [step, setStep] = useState<OnboardingStep>(1);
  const next = () => setStep((s) => (s < 4 ? ((s + 1) as OnboardingStep) : s));

  return (
    <Box
      minH="100vh"
      bg={COLORS.bg}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p="40px"
    >
      <Box w="100%" maxW="480px">
        <Flex justify="center" mb="8px">
          <Box
            fontSize="28px"
            fontWeight="900"
            color={COLORS.primary}
            letterSpacing="-0.5px"
          >
            drivia
          </Box>
        </Flex>

        <OnboardingProgressBar step={step} />

        <Box
          bg="white"
          borderRadius="20px"
          p="36px"
          boxShadow="0 8px 40px rgba(0,0,0,0.10)"
        >
          {step === 1 && <OnboardingStep1Profile onNext={next} />}
          {step === 2 && (
            <OnboardingStep2Inventory onNext={next} onSkip={next} />
          )}
          {step === 3 && <OnboardingStep3Socials onNext={next} />}
          {step === 4 && (
            <OnboardingStep4Done
              onFinish={() => (window.location.href = '/dashboard')}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

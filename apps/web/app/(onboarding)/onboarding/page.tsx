'use client';

import { useState } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { LeftPanel } from '../../components/organism/left-panel';
import {
  Step1,
  Step2,
  Step4,
  Step5,
  Step6,
  Step7,
} from '../../components/organism/steps';

export default function Onboarding() {
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  return (
    <Flex h="100vh">
      <LeftPanel />

      <Box flex="1" p="40px">
        {step === 1 && <Step1 onNext={next} />}
        {step === 2 && <Step2 onNext={next} onBack={prev} />}
        {step === 3 && <Step4 onNext={next} onBack={prev} />}
        {step === 4 && <Step4 onNext={next} onBack={prev} />}
        {step === 5 && <Step5 onNext={next} onBack={prev} />}
        {step === 6 && <Step6 onNext={next} onBack={prev} />}
        {step === 7 && <Step7 />}
      </Box>
    </Flex>
  );
}

import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { CheckIco, COLORS } from '../../atoms';

type OnboardingStep = 1 | 2 | 3 | 4;
const STEPS = ['Profile', 'Inventory', 'Socials', 'Done'];

export const OnboardingProgressBar = ({ step }: { step: OnboardingStep }) => (
  <Flex align="center" justify="center" gap="0" mb="40px">
    {STEPS.map((s, i) => {
      const done = i + 1 < step;
      const active = i + 1 === step;
      return (
        <Flex key={s} align="center">
          <VStack gap="4px">
            <Flex
              w="32px"
              h="32px"
              borderRadius="50%"
              align="center"
              justify="center"
              bg={done ? '#276749' : active ? COLORS.primary : 'gray.200'}
              color={done || active ? 'white' : 'gray.400'}
              fontSize="12px"
              fontWeight="800"
            >
              {done ? <CheckIco /> : i + 1}
            </Flex>
            <Text
              fontSize="10px"
              fontWeight="600"
              color={active ? COLORS.primary : done ? '#276749' : 'gray.400'}
            >
              {s}
            </Text>
          </VStack>
          {i < STEPS.length - 1 && (
            <Box
              w="60px"
              h="2px"
              bg={done ? '#276749' : 'gray.200'}
              mx="4px"
              mb="16px"
            />
          )}
        </Flex>
      );
    })}
  </Flex>
);

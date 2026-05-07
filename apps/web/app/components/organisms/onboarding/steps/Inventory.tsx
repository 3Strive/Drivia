import { Button, Grid, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { COLORS } from '../../../atoms';

export const OnboardingStep2Inventory = ({
  onNext,
  onSkip,
}: {
  onNext: () => void;
  onSkip: () => void;
}) => (
  <VStack gap="0" align="stretch">
    <Text fontSize="22px" fontWeight="900" color="gray.800" mb="4px">
      Add your first car
    </Text>
    <Text fontSize="13px" color="gray.500" mb="24px">
      Get visible on the Drivia marketplace instantly
    </Text>
    <Grid templateColumns="1fr 1fr" gap="12px" mb="20px">
      {[
        { label: 'Make', placeholder: 'Toyota' },
        { label: 'Model', placeholder: 'Camry' },
        { label: 'Year', placeholder: '2021' },
        { label: 'Price (₦)', placeholder: '12,500,000' },
      ].map((f) => (
        <VStack key={f.label} align="start" gap="4px">
          <Text fontSize="12px" fontWeight="700" color="gray.600">
            {f.label}
          </Text>
          <Input
            placeholder={f.placeholder}
            borderRadius="10px"
            fontSize="13px"
            h="40px"
            border="1px solid"
            borderColor="gray.200"
            _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }}
          />
        </VStack>
      ))}
    </Grid>
    <HStack gap="10px">
      <Button
        flex="1"
        bg={COLORS.primary}
        color="white"
        borderRadius="10px"
        fontSize="13px"
        fontWeight="700"
        h="44px"
        _hover={{ bg: COLORS.primaryDark }}
        onClick={onNext}
      >
        Add & Continue
      </Button>
      <Button
        variant="ghost"
        borderRadius="10px"
        fontSize="13px"
        fontWeight="600"
        color="gray.400"
        h="44px"
        onClick={onSkip}
      >
        Skip for now
      </Button>
    </HStack>
  </VStack>
);

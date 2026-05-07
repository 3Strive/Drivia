import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { FaCheckDouble } from 'react-icons/fa';
import { COLORS } from '../../../atoms';

export const OnboardingStep4Done = ({ onFinish }: { onFinish: () => void }) => (
  <VStack gap="0" align="center" textAlign="center">
    <Text fontSize="56px" mb="16px">
      🎉
    </Text>
    <Text fontSize="24px" fontWeight="900" color="gray.800" mb="8px">
      You're all set!
    </Text>
    <Text fontSize="14px" color="gray.500" mb="28px" maxW="320px">
      Your dealership is live on Drivia. Start tracking leads and selling
      faster.
    </Text>
    {[
      {
        icon: <FaCheckDouble size={16} fill="green" />,
        text: 'Dealership profile created',
      },
      {
        icon: <FaCheckDouble size={16} fill="green" />,
        text: 'First listing published',
      },
      {
        icon: <FaCheckDouble size={16} fill="green" />,
        text: 'Social accounts connected',
      },
    ].map((item) => (
      <HStack key={item.text} gap="8px" mb="8px">
        <Text fontSize="14px">{item.icon}</Text>
        <Text fontSize="13px" color="gray.600">
          {item.text}
        </Text>
      </HStack>
    ))}
    <Button
      bg={COLORS.primary}
      color="white"
      borderRadius="10px"
      fontSize="14px"
      fontWeight="700"
      h="48px"
      px="40px"
      _hover={{ bg: COLORS.primaryDark }}
      mt="24px"
      onClick={onFinish}
    >
      Go to Dashboard →
    </Button>
  </VStack>
);

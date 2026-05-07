import { Box, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export const Faq = () => {
  return (
    <Box
      bg="white"
      borderRadius="16px"
      p="22px"
      boxShadow="0 2px 10px rgba(0,0,0,0.05)"
      mb="16px"
    >
      <Text fontWeight="800" fontSize="15px" color="gray.800" mb="16px">
        Common Questions
      </Text>
      <VStack gap="12px" align="stretch">
        {[
          {
            q: 'Can I switch plans at any time?',
            a: 'Yes, you can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.',
          },
          {
            q: 'What payment methods are accepted?',
            a: 'We accept Paystack and Flutterwave — debit/credit cards, bank transfer, and USSD.',
          },
          {
            q: 'Is there a free trial?',
            a: 'New accounts get a 14-day Pro trial with no credit card required.',
          },
          {
            q: 'What happens to my listings if I downgrade?',
            a: 'Your listings remain visible but you can only edit active ones up to your new plan limit.',
          },
        ].map((faq) => (
          <Box key={faq.q} p="14px" bg="gray.50" borderRadius="12px">
            <Text fontSize="13px" fontWeight="700" color="gray.800" mb="4px">
              {faq.q}
            </Text>
            <Text fontSize="12px" color="gray.500" lineHeight="1.6">
              {faq.a}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Faq;

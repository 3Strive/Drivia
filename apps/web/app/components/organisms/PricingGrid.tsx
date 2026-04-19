import React from 'react';
import { Box, Grid, Flex, Text, VStack, HStack, Button } from '@chakra-ui/react';
import { CheckIco, StarIco } from '../atoms/icons';
import { COLORS } from '../atoms/palette';

const PLANS = [
  {
    key: 'starter',
    name: 'Starter',
    price: 15000,
    period: '/month',
    color: '#718096',
    highlight: false,
    features: [
      '5 active listings',
      'WhatsApp enquiry tracking',
      'Basic analytics',
      'Marketplace visibility',
      '1 social account',
    ],
    cta: 'Get Started',
  },
  {
    key: 'pro',
    name: 'Pro',
    price: 35000,
    period: '/month',
    color: COLORS.primary,
    highlight: true,
    badge: 'Most Popular',
    features: [
      '25 active listings',
      'All platform tracking',
      'Full analytics dashboard',
      'Broadcast messaging',
      '3 social accounts',
      'Lead Kanban board',
      'CRM & follow-ups',
    ],
    cta: 'Start Pro',
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    price: 75000,
    period: '/month',
    color: '#805AD5',
    highlight: false,
    features: [
      'Unlimited listings',
      'All Pro features',
      'Multiple dealerships',
      'Dedicated account manager',
      'Custom integrations',
      'Priority support',
      'Inspector badge included',
    ],
    cta: 'Contact Sales',
  },
];

interface PricingGridProps {
  currentPlan: string;
  onSelect: (plan: string) => void;
}

export const PricingGrid = ({ currentPlan, onSelect }: PricingGridProps) => (
  <Grid templateColumns="repeat(3, 1fr)" gap="16px" mb="24px">
    {PLANS.map(plan => (
      <Box key={plan.key} bg="white" borderRadius="18px" p="28px"
        border="2px solid" borderColor={plan.highlight ? plan.color : 'gray.150'}
        boxShadow={plan.highlight ? `0 8px 32px ${plan.color}25` : '0 2px 10px rgba(0,0,0,0.05)'}
        position="relative">
        {plan.badge && (
          <Box position="absolute" top="-12px" left="50%" transform="translateX(-50%)"
            bg={plan.color} color="white" borderRadius="20px" px="14px" py="4px"
            fontSize="11px" fontWeight="800">
            {plan.badge}
          </Box>
        )}
        <Box
          w="40px" h="40px" borderRadius="12px" bg={`${plan.color}15`}
          display="flex" alignItems="center" justifyContent="center"
          color={plan.color} mb="14px">
          <StarIco />
        </Box>
        <Text fontSize="16px" fontWeight="800" color="gray.800" mb="4px">{plan.name}</Text>
        <HStack align="baseline" gap="2px" mb="20px">
          <Text fontSize="26px" fontWeight="900" color={plan.color}>
            ₦{plan.price.toLocaleString()}
          </Text>
          <Text fontSize="12px" color="gray.400">{plan.period}</Text>
        </HStack>
        <VStack gap="8px" align="stretch" mb="24px">
          {plan.features.map(f => (
            <HStack key={f} gap="8px">
              <Flex w="16px" h="16px" borderRadius="50%" bg={`${plan.color}15`}
                align="center" justify="center" color={plan.color} flexShrink={0}>
                <CheckIco />
              </Flex>
              <Text fontSize="12px" color="gray.600">{f}</Text>
            </HStack>
          ))}
        </VStack>
        <Button w="100%" h="40px" borderRadius="10px" fontSize="13px" fontWeight="700"
          bg={currentPlan === plan.key ? 'gray.100' : plan.color}
          color={currentPlan === plan.key ? 'gray.500' : 'white'}
          _hover={{ opacity: currentPlan === plan.key ? 1 : 0.9 }}
          cursor={currentPlan === plan.key ? 'default' : 'pointer'}
          onClick={() => currentPlan !== plan.key && onSelect(plan.key)}>
          {currentPlan === plan.key ? '✅ Current Plan' : plan.cta}
        </Button>
      </Box>
    ))}
  </Grid>
);

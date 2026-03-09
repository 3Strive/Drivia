'use client';

import { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Badge,
  Avatar,
  Grid,
  HStack,
  VStack,
  Heading,
} from '@chakra-ui/react';
import AppLayout from '../components/template/general-layout';

const P = '#6C63FF';
const P_DARK = '#5B54E8';
const P_LIGHT = '#EEF0FF';
const BG = '#F4F5FA';
const WHITE = '#FFFFFF';
const GREEN = '#38A169';

const Ico = ({
  d,
  size = 16,
  stroke = 'currentColor',
  fill = 'none',
  sw = 2,
}: {
  d: string | string[];
  size?: number;
  stroke?: string;
  fill?: string;
  sw?: number;
}): JSX.Element => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth={sw}
  >
    {Array.isArray(d) ? (
      d.map((p, i) => <path key={i} d={p} />)
    ) : (
      <path d={d} />
    )}
  </svg>
);

const SearchIco = () => (
  <Ico d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
);
const BellIco = () => (
  <Ico
    d={[
      'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9',
      'M13.73 21a2 2 0 0 1-3.46 0',
    ]}
  />
);
const MoonIco = () => (
  <Ico d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
);
const GridIco = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);
const CheckIco = () => (
  <Ico d="M20 6 9 17l-5-5" sw={2.5} size={13} stroke={GREEN} />
);
const CrossIco = () => (
  <Ico d="M18 6 6 18M6 6l12 12" sw={2.5} size={13} stroke="#CBD5E0" />
);
const StarIco = () => (
  <Ico
    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
    fill="#F6AD55"
    stroke="#F6AD55"
    size={14}
  />
);
const ZapIco = () => (
  <Ico d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#F6AD55" size={18} />
);
const DiamondIco = () => (
  <Ico
    d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"
    stroke="#E1306C"
    size={18}
  />
);
const CrownIco = () => (
  <Ico d="M12 6l3.46 6L21 9l-3 12H6L3 9l5.54 3L12 6z" stroke={P} size={18} />
);

type PlanId = 'free' | 'pro' | 'vvip';
type BillingCycle = 'monthly' | 'yearly';

interface Plan {
  id: PlanId;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  tagline: string;
  icon: JSX.Element;
  color: string;
  popular: boolean;
  features: { label: string; included: boolean; note?: string }[];
  limits: {
    listings: number | 'Unlimited';
    broadcasts: number | 'Unlimited';
    platforms: number;
    teamMembers: number;
    support: string;
    inspectionBadge: boolean;
    analytics: boolean;
    crm: boolean;
    apiAccess: boolean;
  };
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    popular: false,
    tagline: 'For dealers just getting started',
    icon: (
      <Ico
        d={[
          'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
          'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
        ]}
        stroke="#4A5568"
        size={18}
      />
    ),
    color: '#4A5568',
    limits: {
      listings: 5,
      broadcasts: 10,
      platforms: 2,
      teamMembers: 1,
      support: 'Email only',
      inspectionBadge: false,
      analytics: false,
      crm: false,
      apiAccess: false,
    },
    features: [
      { label: 'Up to 5 active listings', included: true },
      { label: '10 broadcasts/month', included: true },
      { label: 'WhatsApp + 1 platform', included: true },
      { label: 'Basic lead tracking', included: true },
      { label: 'Inspection badge on listings', included: false },
      { label: 'Analytics dashboard', included: false },
      { label: 'Customer CRM', included: false },
      { label: 'Broadcast scheduling', included: false },
      { label: 'Priority WhatsApp support', included: false },
      { label: 'Team members', included: false },
      { label: 'API access', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 15000,
    yearlyPrice: 144000,
    popular: true,
    tagline: 'For active dealers growing their business',
    icon: <ZapIco />,
    color: '#D69E2E',
    limits: {
      listings: 30,
      broadcasts: 200,
      platforms: 3,
      teamMembers: 3,
      support: 'Priority chat',
      inspectionBadge: true,
      analytics: true,
      crm: true,
      apiAccess: false,
    },
    features: [
      { label: 'Up to 30 active listings', included: true },
      { label: '200 broadcasts/month', included: true },
      { label: 'WhatsApp + Facebook + Instagram', included: true },
      { label: 'Full lead pipeline (Kanban)', included: true },
      { label: 'Inspection badge on listings', included: true },
      { label: 'Analytics dashboard', included: true },
      { label: 'Customer CRM', included: true },
      { label: 'Broadcast scheduling', included: true },
      { label: 'Priority WhatsApp support', included: true },
      { label: 'Up to 3 team members', included: true },
      { label: 'API access', included: false },
    ],
  },
  {
    id: 'vvip',
    name: 'VVIP',
    monthlyPrice: 45000,
    yearlyPrice: 432000,
    popular: false,
    tagline: 'For high-volume dealers & dealership groups',
    icon: <DiamondIco />,
    color: '#E1306C',
    limits: {
      listings: 'Unlimited',
      broadcasts: 'Unlimited',
      platforms: 4,
      teamMembers: 10,
      support: 'Dedicated manager',
      inspectionBadge: true,
      analytics: true,
      crm: true,
      apiAccess: true,
    },
    features: [
      { label: 'Unlimited active listings', included: true, note: 'No cap' },
      { label: 'Unlimited broadcasts', included: true, note: 'No cap' },
      { label: 'All 4 platforms', included: true },
      { label: 'Full lead pipeline (Kanban)', included: true },
      { label: 'Inspection badge on listings', included: true },
      { label: 'Advanced analytics + exports', included: true },
      { label: 'Full Customer CRM', included: true },
      { label: 'Broadcast scheduling', included: true },
      { label: 'Dedicated account manager', included: true },
      { label: 'Up to 10 team members', included: true },
      { label: 'Full API access', included: true },
    ],
  },
];

// Current user's plan
const CURRENT_PLAN: PlanId = 'pro';

// Add-ons
const ADDONS = [
  {
    id: 'inspection',
    name: 'Inspection Credits',
    price: 2500,
    unit: 'per car',
    desc: 'Buy inspection credits. Get your cars certified by AutoCheck NG.',
    icon: '🔍',
  },
  {
    id: 'listings',
    name: 'Extra Listings Pack',
    price: 5000,
    unit: '10 slots/mo',
    desc: 'Need more than your plan limit? Add 10 extra listing slots.',
    icon: '📦',
  },
  {
    id: 'boost',
    name: 'Listing Boost',
    price: 3000,
    unit: 'per listing',
    desc: 'Boost a listing to appear at the top of Marketplace search.',
    icon: '🚀',
  },
  {
    id: 'wa_api',
    name: 'WhatsApp API Access',
    price: 12000,
    unit: 'per month',
    desc: 'Integrate Drivia with your own WhatsApp Business API.',
    icon: '📱',
  },
];

// Usage summary for current plan
const USAGE = [
  { label: 'Active Listings', used: 18, total: 30, color: P },
  { label: 'Broadcasts Sent', used: 87, total: 200, color: '#2C7A7B' },
  { label: 'Team Members', used: 2, total: 3, color: '#D69E2E' },
];

// ─── PLAN CARD ────────────────────────────────────────────────────────────────
function PlanCard({
  plan,
  billing,
  isCurrentPlan,
  onSelect,
}: {
  plan: Plan;
  billing: BillingCycle;
  isCurrentPlan: boolean;
  onSelect: () => void;
}): JSX.Element {
  const price =
    billing === 'monthly'
      ? plan.monthlyPrice
      : Math.round(plan.yearlyPrice / 12);
  const yearly = billing === 'yearly';
  const saving =
    yearly && plan.monthlyPrice > 0
      ? Math.round(
          ((plan.monthlyPrice * 12 - plan.yearlyPrice) /
            (plan.monthlyPrice * 12)) *
            100,
        )
      : 0;

  return (
    <Box
      position="relative"
      bg={WHITE}
      borderRadius="18px"
      overflow="hidden"
      border="2px solid"
      borderColor={
        isCurrentPlan ? P : plan.popular ? `${plan.color}44` : 'gray.100'
      }
      boxShadow={
        isCurrentPlan
          ? `0 8px 32px ${P}28`
          : plan.popular
            ? `0 8px 24px ${plan.color}18`
            : '0 2px 12px rgba(0,0,0,0.06)'
      }
      transform={plan.popular && !isCurrentPlan ? 'none' : 'none'}
    >
      {/* Popular badge */}
      {plan.popular && (
        <Box
          position="absolute"
          top="0"
          right="0"
          left="0"
          bg={`linear-gradient(135deg,${plan.color},${plan.color}dd)`}
          py="5px"
          textAlign="center"
        >
          <Text
            fontSize="10px"
            fontWeight="700"
            color="white"
            letterSpacing="0.5px"
          >
            ⭐ MOST POPULAR
          </Text>
        </Box>
      )}

      {/* Current plan indicator */}
      {isCurrentPlan && (
        <Box
          position="absolute"
          top="0"
          right="0"
          left="0"
          bg={`linear-gradient(135deg,${P},${P_DARK})`}
          py="5px"
          textAlign="center"
        >
          <Text
            fontSize="10px"
            fontWeight="700"
            color="white"
            letterSpacing="0.5px"
          >
            ✓ YOUR CURRENT PLAN
          </Text>
        </Box>
      )}

      <Box p="22px" pt={plan.popular || isCurrentPlan ? '36px' : '22px'}>
        {/* Icon + Name */}
        <HStack gap="10px" mb="10px">
          <Box
            w="38px"
            h="38px"
            borderRadius="11px"
            bg={`${plan.color}18`}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {plan.icon}
          </Box>
          <Box>
            <Text fontWeight="900" fontSize="18px" color="gray.800">
              {plan.name}
            </Text>
            <Text fontSize="11px" color="gray.400">
              {plan.tagline}
            </Text>
          </Box>
        </HStack>

        {/* Price */}
        <Flex align="baseline" gap="4px" mb="4px">
          <Text
            fontSize="32px"
            fontWeight="900"
            color="gray.800"
            lineHeight="1"
          >
            {plan.monthlyPrice === 0
              ? 'Free'
              : `₦${price.toLocaleString('en-NG')}`}
          </Text>
          {plan.monthlyPrice > 0 && (
            <Text fontSize="13px" color="gray.400">
              /month
            </Text>
          )}
        </Flex>
        {yearly && saving > 0 && (
          <Badge
            bg="#C6F6D5"
            color="#276749"
            borderRadius="6px"
            fontSize="10px"
            px="8px"
            py="2px"
            fontWeight="700"
            mb="14px"
            display="inline-block"
          >
            Save {saving}% yearly
          </Badge>
        )}
        {!(yearly && saving > 0) && <Box h="22px" mb="0" />}

        {/* Features */}
        <VStack gap="7px" align="stretch" mb="18px" mt="12px">
          {plan.features.map((f, i) => (
            <HStack key={i} gap="8px">
              <Box flexShrink="0">
                {f.included ? <CheckIco /> : <CrossIco />}
              </Box>
              <Text
                fontSize="12px"
                color={f.included ? 'gray.700' : 'gray.300'}
              >
                {f.label}
                {f.note && (
                  <Text as="span" fontSize="10px" color="gray.400">
                    {' '}
                    ({f.note})
                  </Text>
                )}
              </Text>
            </HStack>
          ))}
        </VStack>

        {/* CTA */}
        {isCurrentPlan ? (
          <Button
            w="100%"
            bg={P_LIGHT}
            color={P}
            borderRadius="11px"
            fontSize="13px"
            fontWeight="700"
            h="42px"
            _hover={{ bg: `${P}22` }}
            disabled
          >
            Current Plan
          </Button>
        ) : plan.id === 'free' ? (
          <Button
            w="100%"
            variant="ghost"
            borderRadius="11px"
            fontSize="13px"
            fontWeight="600"
            h="42px"
            border="1.5px solid"
            borderColor="gray.200"
            color="gray.500"
            _hover={{ bg: 'gray.50' }}
          >
            Downgrade to Free
          </Button>
        ) : (
          <Button
            w="100%"
            bg={isCurrentPlan ? P : plan.color}
            color="white"
            borderRadius="11px"
            fontSize="13px"
            fontWeight="700"
            h="42px"
            _hover={{ opacity: 0.88 }}
            onClick={onSelect}
            boxShadow={`0 4px 16px ${plan.color}44`}
          >
            {PLANS.findIndex((p) => p.id === CURRENT_PLAN) <
            PLANS.findIndex((p) => p.id === plan.id)
              ? `Upgrade to ${plan.name}`
              : `Switch to ${plan.name}`}
          </Button>
        )}
      </Box>
    </Box>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Plans(): JSX.Element {
  const [billing, setBilling] = useState<BillingCycle>('monthly');
  const [selected, setSelected] = useState<PlanId | null>(null);

  return (
    <AppLayout>
      {/* TOPBAR */}
      <Flex
        align="center"
        justify="space-between"
        px="32px"
        py="16px"
        bg={WHITE}
        borderBottom="1px solid"
        borderColor="gray.100"
        position="sticky"
        top="0"
        zIndex="10"
      >
        <Box>
          <Text fontSize="11px" color="gray.400">
            Drivia / Plans
          </Text>
          <Heading fontSize="22px" fontWeight="800" color="gray.800" mt="1px">
            Plans & Billing
          </Heading>
        </Box>
        <HStack gap="10px">
          {([<BellIco />, <MoonIco />, <GridIco />] as JSX.Element[]).map(
            (ic, i) => (
              <Button
                key={i}
                variant="ghost"
                p="2"
                borderRadius="10px"
                color="gray.500"
                _hover={{ bg: 'gray.100' }}
              >
                {ic}
              </Button>
            ),
          )}
          <Avatar.Root size="sm">
            <Avatar.Image src="https://i.pravatar.cc/40?img=47" />
            <Avatar.Fallback>D</Avatar.Fallback>
          </Avatar.Root>
        </HStack>
      </Flex>

      <Box p="28px">
        {/* CURRENT USAGE */}
        <Box
          bg={WHITE}
          borderRadius="16px"
          p="20px"
          mb="24px"
          boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          border="1.5px solid"
          borderColor={P_LIGHT}
        >
          <Flex justify="space-between" align="center" mb="14px">
            <Box>
              <HStack gap="8px" mb="2px">
                <Text fontWeight="800" fontSize="15px" color="gray.800">
                  Your Pro Plan Usage
                </Text>
                <Badge
                  bg={P_LIGHT}
                  color={P}
                  borderRadius="6px"
                  fontSize="10px"
                  px="8px"
                  py="2px"
                  fontWeight="700"
                >
                  PRO · Active
                </Badge>
              </HStack>
              <Text fontSize="12px" color="gray.400">
                Renews December 1, 2024 · ₦15,000/month
              </Text>
            </Box>
            <Button
              bg="white"
              color={P}
              borderRadius="10px"
              fontSize="12px"
              fontWeight="700"
              h="34px"
              px="16px"
              border="1.5px solid"
              borderColor={P}
              _hover={{ bg: P_LIGHT }}
            >
              Manage Billing
            </Button>
          </Flex>
          <Grid templateColumns="repeat(3,1fr)" gap="16px">
            {USAGE.map((u) => (
              <Box key={u.label}>
                <Flex justify="space-between" mb="5px">
                  <Text fontSize="12px" color="gray.600" fontWeight="600">
                    {u.label}
                  </Text>
                  <Text fontSize="12px" color="gray.500">
                    {u.used} / {u.total}
                  </Text>
                </Flex>
                <Box h="7px" bg="gray.100" borderRadius="4px" overflow="hidden">
                  <Box
                    h="100%"
                    borderRadius="4px"
                    bg={u.color}
                    w={`${Math.round((u.used / (u.total as number)) * 100)}%`}
                    transition="width 0.5s"
                  />
                </Box>
                <Text fontSize="10px" color="gray.400" mt="3px">
                  {Math.round((u.used / (u.total as number)) * 100)}% used
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* BILLING TOGGLE */}
        <Flex direction="column" align="center" mb="24px">
          <Text fontSize="15px" fontWeight="700" color="gray.600" mb="12px">
            Choose the right plan for your dealership
          </Text>
          <HStack
            bg={WHITE}
            borderRadius="12px"
            p="4px"
            boxShadow="0 2px 8px rgba(0,0,0,0.07)"
            gap="2px"
          >
            {(['monthly', 'yearly'] as BillingCycle[]).map((b) => (
              <Box
                key={b}
                as="button"
                onClick={() => setBilling(b)}
                px="20px"
                py="8px"
                borderRadius="9px"
                fontSize="12px"
                fontWeight="700"
                bg={billing === b ? P : 'transparent'}
                color={billing === b ? 'white' : 'gray.500'}
                boxShadow={billing === b ? `0 2px 8px ${P}44` : 'none'}
                transition="all 0.15s"
                display="flex"
                alignItems="center"
                gap="7px"
              >
                {b === 'monthly' ? 'Monthly' : 'Yearly'}
                {b === 'yearly' && (
                  <Badge
                    bg={
                      billing === 'yearly'
                        ? 'rgba(255,255,255,0.25)'
                        : '#C6F6D5'
                    }
                    color={billing === 'yearly' ? 'white' : '#276749'}
                    borderRadius="5px"
                    fontSize="9px"
                    px="6px"
                    fontWeight="700"
                  >
                    Save 20%
                  </Badge>
                )}
              </Box>
            ))}
          </HStack>
        </Flex>

        {/* PLAN CARDS */}
        <Grid templateColumns="repeat(3,1fr)" gap="20px" mb="32px">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              billing={billing}
              isCurrentPlan={plan.id === CURRENT_PLAN}
              onSelect={() => setSelected(plan.id)}
            />
          ))}
        </Grid>

        {/* FEATURE COMPARISON TABLE */}
        <Box
          bg={WHITE}
          borderRadius="16px"
          overflow="hidden"
          boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          mb="24px"
        >
          <Box
            px="24px"
            py="16px"
            borderBottom="1px solid"
            borderColor="gray.100"
          >
            <Text fontWeight="800" fontSize="15px" color="gray.800">
              Full Feature Comparison
            </Text>
          </Box>
          {/* Header */}
          <Grid
            templateColumns="2fr 1fr 1fr 1fr"
            px="24px"
            py="10px"
            bg="gray.50"
            borderBottom="1px solid"
            borderColor="gray.100"
          >
            <Text
              fontSize="11px"
              color="gray.400"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="0.4px"
            >
              Feature
            </Text>
            {PLANS.map((p) => (
              <Flex key={p.id} align="center" justify="center" gap="6px">
                <Box
                  w="20px"
                  h="20px"
                  borderRadius="6px"
                  bg={`${p.color}20`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {p.id === CURRENT_PLAN ? (
                    <Ico
                      d="M20 6 9 17l-5-5"
                      sw={2.5}
                      size={10}
                      stroke={p.color}
                    />
                  ) : (
                    <Text fontSize="9px" color={p.color} fontWeight="900">
                      {p.id === 'free' ? 'F' : p.id === 'pro' ? 'P' : 'V'}
                    </Text>
                  )}
                </Box>
                <Text fontSize="12px" fontWeight="700" color={p.color}>
                  {p.name}
                </Text>
              </Flex>
            ))}
          </Grid>
          {/* Rows */}
          {[
            { label: 'Active Listings', values: ['5', '30', 'Unlimited'] },
            { label: 'Broadcasts/month', values: ['10', '200', 'Unlimited'] },
            { label: 'Platforms', values: ['2', '3', '4'] },
            { label: 'Team Members', values: ['1', '3', '10'] },
            { label: 'Inspection Badges', values: [false, true, true] },
            { label: 'Analytics', values: [false, true, true] },
            { label: 'Customer CRM', values: [false, true, true] },
            { label: 'Broadcast Scheduling', values: [false, true, true] },
            { label: 'Priority Support', values: [false, true, 'Dedicated'] },
            { label: 'API Access', values: [false, false, true] },
          ].map((row, i, arr) => (
            <Grid
              key={row.label}
              templateColumns="2fr 1fr 1fr 1fr"
              px="24px"
              py="11px"
              alignItems="center"
              borderBottom={i < arr.length - 1 ? '1px solid' : 'none'}
              borderColor="gray.50"
              bg={i % 2 === 0 ? WHITE : 'gray.50'}
              _hover={{ bg: P_LIGHT }}
              transition="background 0.1s"
            >
              <Text fontSize="13px" color="gray.700">
                {row.label}
              </Text>
              {row.values.map((v, j) => (
                <Flex key={j} justify="center">
                  {typeof v === 'boolean' ? (
                    v ? (
                      <CheckIco />
                    ) : (
                      <CrossIco />
                    )
                  ) : (
                    <Text fontSize="12px" fontWeight="600" color="gray.700">
                      {v}
                    </Text>
                  )}
                </Flex>
              ))}
            </Grid>
          ))}
        </Box>

        {/* ADD-ONS */}
        <Box mb="24px">
          <Text fontWeight="800" fontSize="15px" color="gray.800" mb="14px">
            Add-Ons
          </Text>
          <Grid templateColumns="repeat(4,1fr)" gap="14px">
            {ADDONS.map((a) => (
              <Box
                key={a.id}
                bg={WHITE}
                borderRadius="14px"
                p="16px"
                boxShadow="0 2px 8px rgba(0,0,0,0.05)"
                border="1px solid"
                borderColor="gray.100"
                _hover={{
                  border: '1.5px solid',
                  borderColor: `${P}44`,
                  boxShadow: `0 4px 16px ${P}12`,
                }}
                transition="all 0.18s"
              >
                <Text fontSize="22px" mb="8px">
                  {a.icon}
                </Text>
                <Text
                  fontWeight="700"
                  fontSize="13px"
                  color="gray.800"
                  mb="4px"
                >
                  {a.name}
                </Text>
                <Text
                  fontSize="11px"
                  color="gray.500"
                  mb="10px"
                  lineHeight="1.5"
                >
                  {a.desc}
                </Text>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontSize="15px" fontWeight="800" color={P}>
                      ₦{a.price.toLocaleString('en-NG')}
                    </Text>
                    <Text fontSize="10px" color="gray.400">
                      {a.unit}
                    </Text>
                  </Box>
                  <Button
                    bg={P_LIGHT}
                    color={P}
                    borderRadius="8px"
                    fontSize="11px"
                    fontWeight="700"
                    h="30px"
                    px="12px"
                    _hover={{ bg: `${P}22` }}
                  >
                    Add
                  </Button>
                </Flex>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* FAQ */}
        <Box
          bg={WHITE}
          borderRadius="16px"
          p="22px"
          boxShadow="0 2px 10px rgba(0,0,0,0.05)"
        >
          <Text fontWeight="800" fontSize="15px" color="gray.800" mb="16px">
            Common Questions
          </Text>
          <Grid templateColumns="1fr 1fr" gap="16px">
            {[
              {
                q: 'Can I switch plans at any time?',
                a: 'Yes. Upgrades are immediate. Downgrades take effect at the end of your billing cycle.',
              },
              {
                q: 'What payment methods are accepted?',
                a: 'We accept bank transfer, Paystack, Flutterwave, and USSD. All payments in Naira (₦).',
              },
              {
                q: 'What happens when I hit my limits?',
                a: "You'll be notified and can purchase add-ons or upgrade your plan. No surprise locks.",
              },
              {
                q: 'Is there a free trial for Pro or VVIP?',
                a: 'Yes — 14-day free trial on Pro. VVIP includes a 7-day trial. No credit card required.',
              },
            ].map((faq) => (
              <Box key={faq.q}>
                <Text
                  fontSize="13px"
                  fontWeight="700"
                  color="gray.800"
                  mb="4px"
                >
                  {faq.q}
                </Text>
                <Text fontSize="12px" color="gray.500" lineHeight="1.6">
                  {faq.a}
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>

        <Flex
          justify="space-between"
          align="center"
          mt="32px"
          pt="16px"
          borderTop="1px solid"
          borderColor="gray.100"
        >
          <Text fontSize="11px" color="gray.400">
            Questions? Chat with us on WhatsApp: 08012345678
          </Text>
          <Text fontSize="11px" color="gray.400">
            Drivia Dealer Tool © 2024
          </Text>
        </Flex>
      </Box>

      {/* Upgrade confirmation modal */}
      {selected && selected !== CURRENT_PLAN && (
        <>
          <Box
            position="fixed"
            inset="0"
            bg="blackAlpha.500"
            zIndex="1000"
            onClick={() => setSelected(null)}
            style={{ backdropFilter: 'blur(3px)' }}
          />
          <Box
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
            zIndex="1001"
            w="420px"
            bg={WHITE}
            borderRadius="20px"
            boxShadow="0 24px 80px rgba(0,0,0,0.18)"
            p="28px"
            textAlign="center"
          >
            <Text fontSize="28px" mb="12px">
              🚀
            </Text>
            <Text fontWeight="800" fontSize="18px" color="gray.800" mb="6px">
              Upgrade to {PLANS.find((p) => p.id === selected)?.name}?
            </Text>
            <Text fontSize="13px" color="gray.500" mb="20px">
              You'll be charged ₦
              {PLANS.find(
                (p) => p.id === selected,
              )?.monthlyPrice.toLocaleString('en-NG')}{' '}
              today. Your new limits activate immediately.
            </Text>
            <HStack gap="10px" justify="center">
              <Button
                variant="ghost"
                borderRadius="10px"
                fontSize="13px"
                color="gray.500"
                h="40px"
                px="20px"
                _hover={{ bg: 'gray.100' }}
                onClick={() => setSelected(null)}
              >
                Cancel
              </Button>
              <Button
                bg={P}
                color="white"
                borderRadius="10px"
                fontSize="13px"
                fontWeight="700"
                h="40px"
                px="24px"
                _hover={{ bg: P_DARK }}
                boxShadow={`0 4px 14px ${P}44`}
                onClick={() => setSelected(null)}
              >
                Confirm Upgrade
              </Button>
            </HStack>
          </Box>
        </>
      )}
    </AppLayout>
  );
}

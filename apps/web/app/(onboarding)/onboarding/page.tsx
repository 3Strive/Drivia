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
  Select,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const P = '#6C63FF';
const P_DARK = '#5B54E8';
const P_LIGHT = '#EEF0FF';
const INK = '#0D0C1D';
const INK2 = '#3D3B55';
const INK3 = '#7C7A99';
const LINE = '#EEEDF5';
const BG = '#F7F6FC';
const WHITE = '#FFFFFF';
const GREEN = '#22C55E';
const WA = '#25D366';
const FB = '#1877F2';
const IG = '#E1306C';
const TW = '#1DA1F2';

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface PlatformOption {
  id: string;
  name: string;
  desc: string;
  color: string;
  letter: string;
}

interface PlanOption {
  id: string;
  name: string;
  price: string;
  period: string;
  popular: boolean;
  features: string[];
}

// ─── ICONS ───────────────────────────────────────────────────────────────────
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

const CheckIco = ({ color = WHITE }: { color?: string }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="3"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const ArrowIco = () => <Ico d="M5 12h14M12 5l7 7-7 7" size={15} sw={2.5} />;
const BackIco = () => <Ico d="M19 12H5M12 19l-7-7 7-7" size={15} sw={2.5} />;
const CarIco = () => (
  <Ico
    d={[
      'M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5',
      'M7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0',
      'M14 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0',
    ]}
    size={18}
    stroke={WHITE}
  />
);
const ShieldIco = () => (
  <Ico
    d={['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M9 12l2 2 4-4']}
    size={13}
    stroke={GREEN}
  />
);
const PhoneIco = () => (
  <Ico
    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.14-1.14a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
    size={14}
  />
);
const UploadIco = () => (
  <Ico
    d={[
      'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
      'M17 8l-5-5-5 5',
      'M12 3v12',
    ]}
    size={20}
    stroke={P}
  />
);
const CloseIco = () => (
  <Ico d="M18 6 6 18M6 6l12 12" size={10} sw={2.5} stroke={P} />
);
const LocIco = () => (
  <Ico
    d={[
      'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
      'M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4',
    ]}
    size={12}
  />
);

// WhatsApp logo
const WaLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={WHITE}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.062.524 4.004 1.447 5.7L0 24l6.456-1.424A11.935 11.935 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.034-1.384l-.36-.214-3.732.824.839-3.646-.235-.373A9.818 9.818 0 1 1 12 21.818z" />
  </svg>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const TOTAL_STEPS = 7;

const PLATFORMS: PlatformOption[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    desc: 'Business messaging',
    color: WA,
    letter: 'W',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    desc: 'Page + Marketplace',
    color: FB,
    letter: 'f',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    desc: 'Photo listings',
    color: IG,
    letter: 'ig',
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    desc: 'Reach & visibility',
    color: TW,
    letter: 'X',
  },
];

const PLANS: PlanOption[] = [
  {
    id: 'free',
    name: 'Free',
    price: '₦0',
    period: 'forever',
    popular: false,
    features: ['5 listings', '10 broadcasts/mo', '2 platforms', 'Basic leads'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₦15K',
    period: 'per month',
    popular: true,
    features: [
      '30 listings',
      '200 broadcasts/mo',
      '3 platforms',
      'Full CRM + analytics',
    ],
  },
  {
    id: 'vvip',
    name: 'VVIP',
    price: '₦45K',
    period: 'per month',
    popular: false,
    features: [
      'Unlimited listings',
      'Unlimited broadcasts',
      'All platforms + API',
      'Dedicated manager',
    ],
  },
];

const CAR_TYPES = [
  'Brand New',
  'Tokunbo',
  'Nigerian Used',
  'SUVs',
  'Saloon Cars',
  'Trucks / Pickups',
  'Luxury Cars',
  'Budget Cars',
];
const LOCATIONS = [
  'Lekki, Lagos',
  'Ikeja, Lagos',
  'Victoria Island',
  'Abuja, FCT',
  'Port Harcourt',
  'Enugu',
  'Ibadan',
  'Kano',
];

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: () => void;
}): JSX.Element {
  return (
    <Box
      as="button"
      onClick={onChange}
      w="38px"
      h="20px"
      borderRadius="full"
      bg={on ? P : 'gray.200'}
      position="relative"
      transition="background 0.2s"
      flexShrink="0"
    >
      <Box
        position="absolute"
        top="2px"
        left={on ? '20px' : '2px'}
        w="16px"
        h="16px"
        borderRadius="full"
        bg={WHITE}
        boxShadow="0 1px 3px rgba(0,0,0,0.2)"
        transition="left 0.2s"
      />
    </Box>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <Text
      fontSize="12px"
      fontWeight="700"
      color={INK2}
      mb="6px"
      letterSpacing="0.2px"
    >
      {children}
    </Text>
  );
}

function StyledInput({
  placeholder,
  type = 'text',
  value,
  onChange,
  prefix,
}: {
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (v: string) => void;
  prefix?: string;
}): JSX.Element {
  return (
    <Box position="relative">
      {prefix && (
        <Box
          position="absolute"
          left="13px"
          top="50%"
          transform="translateY(-50%)"
          fontSize="14px"
          color={INK3}
          pointerEvents="none"
          zIndex="1"
        >
          {prefix}
        </Box>
      )}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        pl={prefix ? '36px' : '14px'}
        h="46px"
        borderRadius="12px"
        border="1.5px solid"
        borderColor={LINE}
        bg={WHITE}
        fontSize="14px"
        color={INK}
        _placeholder={{ color: '#BBBBBB' }}
        _focus={{
          borderColor: P,
          boxShadow: `0 0 0 3px ${P}20`,
          outline: 'none',
        }}
      />
    </Box>
  );
}

// ─── LEFT PANEL ──────────────────────────────────────────────────────────────
function LeftPanel(): JSX.Element {
  const floatCards = [
    {
      make: '2021 Toyota Camry',
      price: '₦16,500,000',
      top: '18%',
      left: '8%',
      delay: '0s',
    },
    {
      make: '2020 BMW X5',
      price: '₦52,000,000',
      top: '42%',
      right: '6%',
      delay: '1.5s',
    },
    {
      make: '2022 Toyota Highlander',
      price: '₦45,000,000',
      bottom: '22%',
      left: '10%',
      delay: '3s',
    },
  ];

  return (
    <Box
      w="400px"
      minW="400px"
      bg={INK}
      position="relative"
      overflow="hidden"
      display="flex"
      flexDir="column"
      p="44px 40px"
      fontFamily="'DM Sans', sans-serif"
    >
      {/* Mesh gradients */}
      <Box
        position="absolute"
        inset="0"
        pointerEvents="none"
        style={{
          background: [
            'radial-gradient(ellipse 60% 50% at 20% 20%, #6C63FF33 0%, transparent 70%)',
            'radial-gradient(ellipse 50% 40% at 80% 80%, #a78bfa22 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 60% at 60% 10%, #22C55E18 0%, transparent 60%)',
          ].join(','),
        }}
      />

      {/* Grid lines */}
      <Box
        position="absolute"
        inset="0"
        pointerEvents="none"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating car cards */}
      {floatCards.map((c, i) => (
        <Box
          key={i}
          position="absolute"
          top={c.top}
          left={c.left}
          right={(c as { right?: string }).right}
          bottom={(c as { bottom?: string }).bottom}
          w="165px"
          bg="rgba(255,255,255,0.06)"
          border="1px solid rgba(255,255,255,0.1)"
          borderRadius="14px"
          p="12px 14px"
          style={{
            backdropFilter: 'blur(8px)',
            animation: `floatCard 6s ease-in-out infinite`,
            animationDelay: c.delay,
          }}
        >
          <style>{`@keyframes floatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }`}</style>
          <Text
            fontSize="11px"
            fontWeight="700"
            color="rgba(255,255,255,0.9)"
            mb="3px"
            fontFamily="'DM Sans', sans-serif"
          >
            {c.make}
          </Text>
          <Text fontSize="13px" fontWeight="600" color="#a78bfa">
            {c.price}
          </Text>
          <Flex
            align="center"
            gap="4px"
            mt="6px"
            display="inline-flex"
            bg="rgba(34,197,94,0.2)"
            borderRadius="5px"
            px="7px"
            py="2px"
          >
            <ShieldIco />
            <Text
              fontSize="9px"
              fontWeight="700"
              color="#86efac"
              letterSpacing="0.3px"
            >
              INSPECTED
            </Text>
          </Flex>
        </Box>
      ))}

      {/* Logo */}
      <HStack gap="10px" position="relative" zIndex="2" mb="auto">
        <Box
          w="36px"
          h="36px"
          borderRadius="10px"
          bg={P}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CarIco />
        </Box>
        <Text
          fontSize="20px"
          fontWeight="800"
          color={WHITE}
          fontFamily="'DM Sans', sans-serif"
        >
          Drivia
        </Text>
      </HStack>

      {/* Body text */}
      <Box position="relative" zIndex="2" mt="auto">
        <Text
          fontSize="10px"
          fontWeight="700"
          letterSpacing="1.5px"
          textTransform="uppercase"
          color={P}
          mb="14px"
        >
          Dealer Platform
        </Text>
        <Heading
          fontSize="34px"
          fontWeight="800"
          color={WHITE}
          lineHeight="1.15"
          mb="14px"
          fontFamily="'DM Sans', sans-serif"
        >
          Sell more cars.
          <br />
          <Text as="span" color="#a78bfa">
            Faster.
          </Text>
        </Heading>
        <Text
          fontSize="14px"
          lineHeight="1.7"
          color="rgba(255,255,255,0.55)"
          mb="28px"
        >
          Nigeria's most trusted dealer tool. Manage listings, track leads, and
          reach buyers across WhatsApp, Facebook & Instagram — all from one
          place.
        </Text>
        <HStack gap="24px">
          {[
            { val: '2,400+', lab: 'Active dealers' },
            { val: '₦18B+', lab: 'Cars sold' },
            { val: '4.9 ⭐', lab: 'Dealer rating' },
          ].map((s) => (
            <Box key={s.lab}>
              <Text
                fontSize="22px"
                fontWeight="800"
                color={WHITE}
                fontFamily="'DM Sans', sans-serif"
              >
                {s.val}
              </Text>
              <Text fontSize="10px" color="rgba(255,255,255,0.4)" mt="1px">
                {s.lab}
              </Text>
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  );
}

// ─── PROGRESS ────────────────────────────────────────────────────────────────
function ProgressBar({ step }: { step: number }): JSX.Element {
  const pct = Math.round((step / TOTAL_STEPS) * 100);
  return (
    <Box h="3px" bg={LINE} borderRadius="2px" overflow="hidden" mb="32px">
      <Box
        h="100%"
        borderRadius="2px"
        w={`${pct}%`}
        transition="width 0.5s ease"
        style={{ background: `linear-gradient(90deg,${P},#a78bfa)` }}
      />
    </Box>
  );
}

function StepDots({ step }: { step: number }): JSX.Element {
  return (
    <HStack gap="5px" mb="32px">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
        const n = i + 1;
        const isActive = n === step;
        const isDone = n < step;
        return (
          <Box
            key={n}
            h="4px"
            borderRadius="2px"
            transition="all 0.35s"
            w={isActive ? '28px' : '14px'}
            bg={isActive ? P : isDone ? '#a78bfa' : LINE}
          />
        );
      })}
    </HStack>
  );
}

// ─── NAV BUTTONS ─────────────────────────────────────────────────────────────
function NavButtons({
  onBack,
  onNext,
  nextLabel = 'Continue',
  showBack = true,
  nextFull = false,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  showBack?: boolean;
  nextFull?: boolean;
}): JSX.Element {
  return (
    <HStack gap="10px" mt="4px">
      {showBack && onBack && (
        <Box
          as="button"
          onClick={onBack}
          h="50px"
          px="20px"
          borderRadius="14px"
          border="2px solid"
          borderColor={LINE}
          bg={WHITE}
          color={INK2}
          fontSize="14px"
          fontWeight="700"
          display="flex"
          alignItems="center"
          gap="6px"
          _hover={{ borderColor: INK2 }}
          transition="all 0.15s"
          flexShrink="0"
        >
          <BackIco /> Back
        </Box>
      )}
      <Button
        onClick={onNext}
        bg={P}
        color={WHITE}
        borderRadius="14px"
        h="50px"
        fontSize="14px"
        fontWeight="700"
        flex="1"
        _hover={{ bg: P_DARK, transform: 'translateY(-1px)' }}
        boxShadow={`0 6px 20px ${P}44`}
        transition="all 0.2s"
        display="flex"
        gap="8px"
        alignItems="center"
      >
        {nextLabel} <ArrowIco />
      </Button>
    </HStack>
  );
}

// ─── STEP 1: Welcome ─────────────────────────────────────────────────────────
function Step1({ onNext }: { onNext: () => void }): JSX.Element {
  const [phone, setPhone] = useState('');
  return (
    <Box>
      <Text
        fontSize="10px"
        fontWeight="700"
        letterSpacing="1.4px"
        textTransform="uppercase"
        color={P}
        mb="10px"
      >
        Step 1 of {TOTAL_STEPS}
      </Text>
      <Heading
        fontSize="28px"
        fontWeight="800"
        color={INK}
        lineHeight="1.2"
        mb="8px"
        fontFamily="'DM Sans', sans-serif"
      >
        Welcome to Drivia 👋
      </Heading>
      <Text fontSize="14px" color={INK3} lineHeight="1.65" mb="28px">
        Enter your WhatsApp number to get started. We'll send a verification
        code.
      </Text>

      <Box mb="20px">
        <FieldLabel>WhatsApp / Phone Number</FieldLabel>
        <StyledInput
          placeholder="0801 234 5678"
          type="tel"
          value={phone}
          onChange={setPhone}
          prefix="🇳🇬"
        />
        <Text fontSize="11px" color={INK3} mt="5px">
          Used as your primary contact number on Drivia.
        </Text>
      </Box>

      {/* WhatsApp CTA */}
      <Box
        as="button"
        onClick={onNext}
        w="100%"
        h="48px"
        borderRadius="13px"
        bg={WA}
        color={WHITE}
        fontSize="14px"
        fontWeight="700"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="8px"
        boxShadow="0 4px 16px rgba(37,211,102,0.3)"
        _hover={{ opacity: 0.9 }}
        transition="all 0.2s"
        mb="16px"
      >
        <WaLogo /> Continue with WhatsApp
      </Box>

      {/* Divider */}
      <Flex align="center" gap="12px" mb="16px">
        <Box flex="1" h="1px" bg={LINE} />
        <Text fontSize="12px" color={INK3}>
          or
        </Text>
        <Box flex="1" h="1px" bg={LINE} />
      </Flex>

      <Box
        as="button"
        onClick={onNext}
        w="100%"
        textAlign="center"
        fontSize="13px"
        fontWeight="600"
        color={INK3}
        py="8px"
        _hover={{ color: P }}
        transition="color 0.15s"
      >
        I'll use email instead →
      </Box>
    </Box>
  );
}

// ─── STEP 2: OTP ─────────────────────────────────────────────────────────────
function Step2({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}): JSX.Element {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtp = (val: string, idx: number) => {
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 3) {
      const boxes = document.querySelectorAll<HTMLInputElement>('.otp-input');
      boxes[idx + 1]?.focus();
    }
  };

  return (
    <Box>
      <Text
        fontSize="10px"
        fontWeight="700"
        letterSpacing="1.4px"
        textTransform="uppercase"
        color={P}
        mb="10px"
      >
        Step 2 of {TOTAL_STEPS}
      </Text>
      <Heading
        fontSize="28px"
        fontWeight="800"
        color={INK}
        lineHeight="1.2"
        mb="8px"
        fontFamily="'DM Sans', sans-serif"
      >
        Verify your number
      </Heading>
      <Text fontSize="14px" color={INK3} lineHeight="1.65" mb="28px">
        We sent a 4-digit code to{' '}
        <Text as="strong" color={INK}>
          0801 234 5678
        </Text>
        . Enter it below.
      </Text>

      <HStack gap="10px" mb="24px">
        {otp.map((val, i) => (
          <Input
            key={i}
            className="otp-input"
            value={val}
            onChange={(e) => handleOtp(e.target.value, i)}
            maxLength={1}
            textAlign="center"
            fontSize="28px"
            fontWeight="800"
            color={P}
            h="58px"
            borderRadius="14px"
            border="2px solid"
            borderColor={val ? P : LINE}
            bg={WHITE}
            _focus={{
              borderColor: P,
              boxShadow: `0 0 0 3px ${P}20`,
              outline: 'none',
            }}
            fontFamily="'DM Sans', sans-serif"
          />
        ))}
      </HStack>

      <NavButtons
        onBack={onBack}
        onNext={onNext}
        nextLabel="Verify & Continue"
      />
      <Text
        fontSize="12px"
        color={INK3}
        textAlign="center"
        mt="12px"
        cursor="pointer"
        _hover={{ color: P }}
      >
        Resend code in 0:45
      </Text>
    </Box>
  );
}

// ─── STEP 3: Dealership Details ───────────────────────────────────────────────
function Step3({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}): JSX.Element {
  const [bizName, setBizName] = useState('');
  const [yourName, setYourName] = useState('');
  const [yearEst, setYearEst] = useState('');
  const [about, setAbout] = useState('');

  return (
    <Box>
      <Text
        fontSize="10px"
        fontWeight="700"
        letterSpacing="1.4px"
        textTransform="uppercase"
        color={P}
        mb="10px"
      >
        Step 3 of {TOTAL_STEPS}
      </Text>
      <Heading
        fontSize="28px"
        fontWeight="800"
        color={INK}
        lineHeight="1.2"
        mb="8px"
        fontFamily="'DM Sans', sans-serif"
      >
        Your dealership details
      </Heading>
      <Text fontSize="14px" color={INK3} lineHeight="1.65" mb="24px">
        This appears on your public profile and marketplace listings.
      </Text>

      {/* Logo upload */}
      <HStack gap="16px" mb="20px">
        <Box
          w="72px"
          h="72px"
          borderRadius="50%"
          bg={P_LIGHT}
          border={`3px dashed ${P}`}
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          _hover={{ bg: '#e0deff' }}
          transition="all 0.2s"
          flexShrink="0"
        >
          <UploadIco />
          <Text
            fontSize="8px"
            fontWeight="700"
            color={P}
            textTransform="uppercase"
            letterSpacing="0.5px"
            mt="3px"
          >
            Logo
          </Text>
        </Box>
        <Box>
          <Text fontSize="13px" fontWeight="600" color={INK2} mb="3px">
            Upload your dealership logo
          </Text>
          <Text fontSize="11px" color={INK3}>
            PNG or JPG · max 2MB · Square recommended
          </Text>
        </Box>
      </HStack>

      <Box mb="14px">
        <FieldLabel>Dealership / Business Name *</FieldLabel>
        <StyledInput
          placeholder="e.g. Lagos Auto Hub"
          value={bizName}
          onChange={setBizName}
        />
      </Box>

      <Grid templateColumns="1fr 1fr" gap="12px" mb="14px">
        <Box>
          <FieldLabel>Your Name *</FieldLabel>
          <StyledInput
            placeholder="Full name"
            value={yourName}
            onChange={setYourName}
          />
        </Box>
        <Box>
          <FieldLabel>Year Established</FieldLabel>
          <StyledInput
            placeholder="e.g. 2019"
            value={yearEst}
            onChange={setYearEst}
          />
        </Box>
      </Grid>

      <Box mb="20px">
        <FieldLabel>About Your Dealership</FieldLabel>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="What makes you stand out? e.g. 'We specialise in certified Tokunbo SUVs in Lekki. All cars fully inspected.'"
          onFocus={(e) => (e.target.style.borderColor = P)}
          onBlur={(e) => (e.target.style.borderColor = LINE)}
          style={{
            width: '100%',
            height: '88px',
            borderRadius: '12px',
            padding: '12px 14px',
            border: `1.5px solid ${LINE}`,
            background: WHITE,
            fontSize: '14px',
            color: INK,
            resize: 'none',
            outline: 'none',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'border-color 0.2s',
          }}
        />
      </Box>

      <NavButtons onBack={onBack} onNext={onNext} />
    </Box>
  );
}

// ─── STEP 4: Location & Inventory ────────────────────────────────────────────
function Step4({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}): JSX.Element {
  const [primaryLoc, setPrimaryLoc] = useState('');
  const [extraLocs, setExtraLocs] = useState<string[]>([]);
  const [locInput, setLocInput] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    'Brand New',
    'Tokunbo',
  ]);
  const [volume, setVolume] = useState('1 – 5 cars/month');

  const addLoc = () => {
    if (locInput.trim() && !extraLocs.includes(locInput.trim())) {
      setExtraLocs((p) => [...p, locInput.trim()]);
      setLocInput('');
    }
  };
  const removeLoc = (loc: string) =>
    setExtraLocs((p) => p.filter((l) => l !== loc));
  const toggleType = (t: string) =>
    setSelectedTypes((p) =>
      p.includes(t) ? p.filter((x) => x !== t) : [...p, t],
    );

  return (
    <Box>
      <Text
        fontSize="10px"
        fontWeight="700"
        letterSpacing="1.4px"
        textTransform="uppercase"
        color={P}
        mb="10px"
      >
        Step 4 of {TOTAL_STEPS}
      </Text>
      <Heading
        fontSize="28px"
        fontWeight="800"
        color={INK}
        lineHeight="1.2"
        mb="8px"
        fontFamily="'DM Sans', sans-serif"
      >
        Where do you operate?
      </Heading>
      <Text fontSize="14px" color={INK3} lineHeight="1.65" mb="24px">
        Select your primary location and the types of cars you sell.
      </Text>

      <Box mb="14px">
        <FieldLabel>Primary Location *</FieldLabel>
        <select
          value={primaryLoc}
          onChange={(e) => setPrimaryLoc(e.target.value)}
          onFocus={(e) => (e.target.style.borderColor = P)}
          onBlur={(e) => (e.target.style.borderColor = LINE)}
          style={{
            width: '100%',
            height: '46px',
            borderRadius: '12px',
            padding: '0 14px',
            border: `1.5px solid ${LINE}`,
            background: WHITE,
            fontSize: '14px',
            color: primaryLoc ? INK : '#BBBBBB',
            outline: 'none',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'border-color 0.2s',
            appearance: 'auto',
          }}
        >
          <option value="">Select state / city</option>
          {LOCATIONS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
          <option value="other">Other</option>
        </select>
      </Box>

      <Box mb="18px">
        <FieldLabel>Additional locations (optional)</FieldLabel>
        <HStack gap="8px" mb="8px">
          <Input
            value={locInput}
            onChange={(e) => setLocInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addLoc()}
            placeholder="Type a city and press Enter"
            h="42px"
            borderRadius="10px"
            border="1.5px solid"
            borderColor={LINE}
            bg={WHITE}
            fontSize="13px"
            _placeholder={{ color: '#BBBBBB' }}
            _focus={{
              borderColor: P,
              boxShadow: `0 0 0 3px ${P}20`,
              outline: 'none',
            }}
          />
          <Box
            as="button"
            onClick={addLoc}
            h="42px"
            px="14px"
            borderRadius="10px"
            bg={P_LIGHT}
            color={P}
            fontSize="13px"
            fontWeight="700"
            flexShrink="0"
            _hover={{ bg: `${P}22` }}
          >
            Add
          </Box>
        </HStack>
        {extraLocs.length > 0 && (
          <Flex gap="6px" flexWrap="wrap">
            {extraLocs.map((loc) => (
              <Flex
                key={loc}
                align="center"
                gap="6px"
                bg={P_LIGHT}
                color={P}
                borderRadius="8px"
                px="10px"
                py="5px"
              >
                <HStack gap="3px">
                  <LocIco />
                  <Text fontSize="12px" fontWeight="600">
                    {loc}
                  </Text>
                </HStack>
                <Box
                  as="button"
                  onClick={() => removeLoc(loc)}
                  fontSize="14px"
                  lineHeight="1"
                  color={P}
                  _hover={{ opacity: 0.7 }}
                >
                  ×
                </Box>
              </Flex>
            ))}
          </Flex>
        )}
      </Box>

      <Box mb="18px">
        <FieldLabel>Car types you sell</FieldLabel>
        <Flex gap="7px" flexWrap="wrap">
          {CAR_TYPES.map((t) => {
            const sel = selectedTypes.includes(t);
            return (
              <Box
                key={t}
                as="button"
                onClick={() => toggleType(t)}
                px="13px"
                py="7px"
                borderRadius="10px"
                border="1.5px solid"
                borderColor={sel ? P : LINE}
                bg={sel ? P_LIGHT : WHITE}
                color={sel ? P : INK3}
                fontSize="12px"
                fontWeight="600"
                transition="all 0.15s"
                _hover={{ borderColor: P, color: P }}
              >
                {t}
              </Box>
            );
          })}
        </Flex>
      </Box>

      <Box mb="20px">
        <FieldLabel>Typical monthly stock volume</FieldLabel>
        <select
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          onFocus={(e) => (e.target.style.borderColor = P)}
          onBlur={(e) => (e.target.style.borderColor = LINE)}
          style={{
            width: '100%',
            height: '46px',
            borderRadius: '12px',
            padding: '0 14px',
            border: `1.5px solid ${LINE}`,
            background: WHITE,
            fontSize: '14px',
            color: INK,
            outline: 'none',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'border-color 0.2s',
          }}
        >
          <option>1 – 5 cars/month</option>
          <option>6 – 15 cars/month</option>
          <option>16 – 30 cars/month</option>
          <option>30+ cars/month</option>
        </select>
      </Box>

      <NavButtons onBack={onBack} onNext={onNext} />
    </Box>
  );
}

// ─── STEP 5: Platforms ───────────────────────────────────────────────────────
function Step5({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}): JSX.Element {
  const [selected, setSelected] = useState<string[]>(['whatsapp', 'facebook']);

  const toggle = (id: string) =>
    setSelected((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  return (
    <Box>
      <Text
        fontSize="10px"
        fontWeight="700"
        letterSpacing="1.4px"
        textTransform="uppercase"
        color={P}
        mb="10px"
      >
        Step 5 of {TOTAL_STEPS}
      </Text>
      <Heading
        fontSize="28px"
        fontWeight="800"
        color={INK}
        lineHeight="1.2"
        mb="8px"
        fontFamily="'DM Sans', sans-serif"
      >
        Connect your platforms
      </Heading>
      <Text fontSize="14px" color={INK3} lineHeight="1.65" mb="24px">
        Drivia auto-posts your new listings to these platforms. Connect now or
        later.
      </Text>

      <Grid templateColumns="1fr 1fr" gap="10px" mb="16px">
        {PLATFORMS.map((pl) => {
          const sel = selected.includes(pl.id);
          return (
            <Flex
              key={pl.id}
              as="button"
              onClick={() => toggle(pl.id)}
              align="center"
              gap="12px"
              p="14px 16px"
              borderRadius="12px"
              border="2px solid"
              borderColor={sel ? P : LINE}
              bg={sel ? P_LIGHT : WHITE}
              transition="all 0.2s"
              _hover={{ borderColor: P }}
              cursor="pointer"
              textAlign="left"
            >
              <Box
                w="34px"
                h="34px"
                borderRadius="9px"
                bg={`${pl.color}22`}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink="0"
              >
                <Text fontSize="11px" fontWeight="900" color={pl.color}>
                  {pl.letter}
                </Text>
              </Box>
              <Box flex="1">
                <Text fontSize="13px" fontWeight="700" color={INK}>
                  {pl.name}
                </Text>
                <Text fontSize="11px" color={INK3}>
                  {pl.desc}
                </Text>
              </Box>
              {sel && (
                <Box
                  w="18px"
                  h="18px"
                  borderRadius="5px"
                  bg={P}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink="0"
                >
                  <CheckIco />
                </Box>
              )}
            </Flex>
          );
        })}
      </Grid>

      <Box
        bg="#FFFAF0"
        border="1px solid #FAF089"
        borderRadius="11px"
        p="12px 14px"
        mb="20px"
      >
        <Text fontSize="12px" fontWeight="700" color="#744210" mb="2px">
          💡 You can connect these later
        </Text>
        <Text fontSize="11px" color="#92400E" lineHeight="1.5">
          Platforms you skip now can be connected from Settings → Manage Socials
          at any time.
        </Text>
      </Box>

      <NavButtons onBack={onBack} onNext={onNext} />
    </Box>
  );
}

// ─── STEP 6: Plan ────────────────────────────────────────────────────────────
function Step6({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}): JSX.Element {
  const [selectedPlan, setSelectedPlan] = useState('free');

  return (
    <Box>
      <Text
        fontSize="10px"
        fontWeight="700"
        letterSpacing="1.4px"
        textTransform="uppercase"
        color={P}
        mb="10px"
      >
        Step 6 of {TOTAL_STEPS}
      </Text>
      <Heading
        fontSize="28px"
        fontWeight="800"
        color={INK}
        lineHeight="1.2"
        mb="8px"
        fontFamily="'DM Sans', sans-serif"
      >
        Choose your plan
      </Heading>
      <Text fontSize="14px" color={INK3} lineHeight="1.65" mb="24px">
        Start free and upgrade when you're ready. No credit card needed today.
      </Text>

      <Grid templateColumns="repeat(3,1fr)" gap="10px" mb="16px">
        {PLANS.map((plan) => {
          const sel = selectedPlan === plan.id;
          return (
            <Box
              key={plan.id}
              as="button"
              onClick={() => setSelectedPlan(plan.id)}
              position="relative"
              borderRadius="14px"
              overflow="hidden"
              border="2px solid"
              borderColor={sel ? P : LINE}
              bg={sel ? P_LIGHT : WHITE}
              p="16px"
              boxShadow={sel ? `0 4px 20px ${P}22` : 'none'}
              transition="all 0.2s"
              cursor="pointer"
              textAlign="left"
              _hover={{ borderColor: P }}
            >
              {plan.popular && (
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bg={P}
                  py="4px"
                  textAlign="center"
                >
                  <Text
                    fontSize="8px"
                    fontWeight="800"
                    color={WHITE}
                    letterSpacing="1px"
                  >
                    POPULAR
                  </Text>
                </Box>
              )}

              <Box pt={plan.popular ? '18px' : '0'}>
                {sel && (
                  <Box
                    position="absolute"
                    top={plan.popular ? '26px' : '10px'}
                    right="10px"
                    w="18px"
                    h="18px"
                    borderRadius="5px"
                    bg={P}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <CheckIco />
                  </Box>
                )}

                <Text
                  fontSize="15px"
                  fontWeight="800"
                  color={INK}
                  mb="4px"
                  fontFamily="'DM Sans', sans-serif"
                >
                  {plan.name}
                </Text>
                <Text
                  fontSize="20px"
                  fontWeight="800"
                  color={P}
                  lineHeight="1"
                  fontFamily="'DM Sans', sans-serif"
                >
                  {plan.price}
                </Text>
                <Text fontSize="10px" color={INK3} mb="10px">
                  {plan.period}
                </Text>
                <VStack gap="3px" align="stretch">
                  {plan.features.map((f) => (
                    <HStack key={f} gap="5px" align="flex-start">
                      <Box color={P} flexShrink="0" mt="1px">
                        <CheckIco color={P} />
                      </Box>
                      <Text
                        fontSize="10px"
                        color={INK2}
                        lineHeight="1.5"
                        textAlign="left"
                      >
                        {f}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </Box>
          );
        })}
      </Grid>

      <Box bg={P_LIGHT} borderRadius="11px" p="12px 14px" mb="20px">
        <HStack gap="10px">
          <Text fontSize="18px">🎁</Text>
          <Box>
            <Text fontSize="12px" fontWeight="700" color={P}>
              14-day free trial on Pro
            </Text>
            <Text fontSize="11px" color={INK3}>
              Try all Pro features free. Cancel any time before day 14.
            </Text>
          </Box>
        </HStack>
      </Box>

      <NavButtons onBack={onBack} onNext={onNext} />
    </Box>
  );
}

// ─── STEP 7: Success ─────────────────────────────────────────────────────────
function Step7(): JSX.Element {
  const router = useRouter();
  const checks = [
    { icon: '📋', label: 'Dealer profile created' },
    { icon: '💬', label: 'WhatsApp & Facebook connected' },
    { icon: '🚀', label: 'Free plan activated (upgrade anytime)' },
    { icon: '🗺️', label: 'Listed on Drivia Marketplace' },
  ];

  return (
    <Box>
      {/* Animated check ring */}
      <Flex
        w="88px"
        h="88px"
        borderRadius="50%"
        mx="auto"
        mb="24px"
        alignItems="center"
        justifyContent="center"
        boxShadow={`0 12px 40px ${P}44`}
        style={{
          background: `linear-gradient(135deg,${P},#a78bfa)`,
          animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
          animationDelay: '0.1s',
        }}
      >
        <style>{`
          @keyframes popIn { from{transform:scale(0.4);opacity:0} to{transform:scale(1);opacity:1} }
          @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        `}</style>
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke={WHITE}
          strokeWidth="2.5"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </Flex>

      <Text
        fontSize="10px"
        fontWeight="700"
        letterSpacing="1.4px"
        textTransform="uppercase"
        color={P}
        mb="10px"
        textAlign="center"
      >
        You're all set!
      </Text>
      <Heading
        fontSize="26px"
        fontWeight="800"
        color={INK}
        lineHeight="1.2"
        mb="8px"
        textAlign="center"
        fontFamily="'DM Sans', sans-serif"
      >
        Welcome to Drivia 🚗
      </Heading>
      <Text
        fontSize="14px"
        color={INK3}
        lineHeight="1.65"
        mb="24px"
        textAlign="center"
      >
        Your dealer account is ready. Here's what's been set up:
      </Text>

      <VStack gap="8px" align="stretch" mb="28px">
        {checks.map((c, i) => (
          <Flex
            key={c.label}
            align="center"
            gap="12px"
            bg={WHITE}
            borderRadius="12px"
            p="12px 16px"
            border="1px solid"
            borderColor={LINE}
            style={{
              animation: 'fadeUp 0.4s ease both',
              animationDelay: `${0.15 + i * 0.12}s`,
            }}
          >
            <Box
              w="30px"
              h="30px"
              borderRadius="8px"
              bg="#F0FFF4"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="14px"
              flexShrink="0"
            >
              {c.icon}
            </Box>
            <Text fontSize="13px" fontWeight="600" color={INK} flex="1">
              {c.label}
            </Text>
            <Text fontSize="11px" fontWeight="700" color={GREEN}>
              ✓ Done
            </Text>
          </Flex>
        ))}
      </VStack>

      <Button
        bg={P}
        color={WHITE}
        w="100%"
        h="50px"
        borderRadius="14px"
        fontSize="14px"
        fontWeight="700"
        mb="10px"
        _hover={{ bg: P_DARK }}
        boxShadow={`0 6px 20px ${P}44`}
        onClick={() => router.push('/dashboard')}
      >
        Go to my Dashboard →
      </Button>
      <Box
        as="button"
        w="100%"
        textAlign="center"
        fontSize="13px"
        fontWeight="600"
        color={INK3}
        py="8px"
        _hover={{ color: P }}
        transition="color 0.15s"
      >
        + Add my first listing now
      </Box>
    </Box>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Onboarding(): JSX.Element {
  const [step, setStep] = useState<Step>(1);

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS) as Step);
  const prev = () => setStep((s) => Math.max(s - 1, 1) as Step);

  return (
    <Flex h="100vh" overflow="hidden" fontFamily="'DM Sans', sans-serif">
      <LeftPanel />

      {/* Right panel */}
      <Box
        flex="1"
        overflowY="auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p="40px 48px"
        bg={BG}
      >
        <Box w="100%" maxW="480px">
          <ProgressBar step={step} />
          <StepDots step={step} />

          {step === 1 && <Step1 onNext={next} />}
          {step === 2 && <Step2 onNext={next} onBack={prev} />}
          {step === 3 && <Step3 onNext={next} onBack={prev} />}
          {step === 4 && <Step4 onNext={next} onBack={prev} />}
          {step === 5 && <Step5 onNext={next} onBack={prev} />}
          {step === 6 && <Step6 onNext={next} onBack={prev} />}
          {step === 7 && <Step7 />}
        </Box>
      </Box>
    </Flex>
  );
}

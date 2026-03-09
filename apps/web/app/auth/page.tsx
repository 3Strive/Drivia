'use client';

import { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  HStack,
  VStack,
  Heading,
} from '@chakra-ui/react';

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const P = '#6C63FF';
const P_DARK = '#5B54E8';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface IcoProps {
  d: string | string[];
  size?: number;
  stroke?: string;
  fill?: string;
  sw?: number;
}
type AuthMode = 'signin' | 'signup';

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Ico = ({
  d,
  size = 16,
  stroke = 'currentColor',
  fill = 'none',
  sw = 2,
}: IcoProps): JSX.Element => (
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

const EyeIco = (): JSX.Element => (
  <Ico
    d={[
      'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z',
      'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    ]}
    size={15}
  />
);
const EyeOffIco = (): JSX.Element => (
  <Ico
    d={[
      'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94',
      'M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19',
      'M1 1l22 22',
    ]}
    size={15}
  />
);
const MoonIco = (): JSX.Element => (
  <Ico d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" size={18} />
);

// Google "G" icon
const GoogleIco = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// Drivia logo mark (D shape)
const DriviaLogo = (): JSX.Element => (
  <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
    <path
      d="M10 5 L10 85 L40 85 C62 85 75 68 75 45 C75 22 62 5 40 5 Z"
      fill="white"
      opacity="0.95"
    />
    <path
      d="M28 20 L28 70 L40 70 C55 70 62 58 62 45 C62 32 55 20 40 20 Z"
      fill="#6C63FF"
    />
  </svg>
);

// ─── AUTH PANEL ───────────────────────────────────────────────────────────────
interface AuthPanelProps {
  mode: AuthMode;
  onSwitch: (m: AuthMode) => void;
}

function AuthPanel({ mode, onSwitch }: AuthPanelProps): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPw, setShowPw] = useState<boolean>(false);
  const [keepLogged, setKeepLogged] = useState<boolean>(true);

  const isSignIn = mode === 'signin';

  return (
    <Flex
      flex="1"
      direction="column"
      justify="space-between"
      px="60px"
      py="48px"
      bg="white"
    >
      <Box
        flex="1"
        display="flex"
        flexDir="column"
        justifyContent="center"
        maxW="320px"
        mx="auto"
        w="100%"
      >
        <Heading fontSize="28px" fontWeight="800" color="gray.800" mb="6px">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </Heading>
        <Text fontSize="13px" color="gray.400" mb="28px">
          {isSignIn
            ? 'Enter your email and password to sign in!'
            : 'Enter your email and password to sign Up!'}
        </Text>

        {/* Google button */}
        <Button
          variant="outline"
          w="100%"
          h="42px"
          borderRadius="10px"
          borderColor="gray.200"
          fontSize="13px"
          fontWeight="500"
          color="gray.600"
          mb="16px"
          gap="8px"
          _hover={{ bg: 'gray.50' }}
        >
          <GoogleIco />
          {isSignIn ? 'Sign in with Google' : 'Sign up with Google'}
        </Button>

        {/* Divider */}
        <Flex align="center" gap="12px" mb="20px">
          <Box flex="1" h="1px" bg="gray.100" />
          <Text fontSize="12px" color="gray.300">
            or
          </Text>
          <Box flex="1" h="1px" bg="gray.100" />
        </Flex>

        {/* Email */}
        <Box mb="16px">
          <Text fontSize="12px" fontWeight="700" color="gray.700" mb="6px">
            Email
            <Text as="span" color="red.400">
              *
            </Text>
          </Text>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mail@simmmple.com"
            type="email"
            h="42px"
            borderRadius="10px"
            borderColor="gray.200"
            fontSize="13px"
            _placeholder={{ color: 'gray.300' }}
            _focus={{ borderColor: P, boxShadow: `0 0 0 1px ${P}` }}
          />
        </Box>

        {/* Password */}
        <Box mb="16px">
          <Text fontSize="12px" fontWeight="700" color="gray.700" mb="6px">
            Password
            <Text as="span" color="red.400">
              *
            </Text>
          </Text>
          <Box position="relative">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              type={showPw ? 'text' : 'password'}
              h="42px"
              borderRadius="10px"
              borderColor="gray.200"
              fontSize="13px"
              pr="40px"
              _placeholder={{ color: 'gray.300' }}
              _focus={{ borderColor: P, boxShadow: `0 0 0 1px ${P}` }}
            />
            <Box
              position="absolute"
              right="12px"
              top="50%"
              transform="translateY(-50%)"
              color="gray.400"
              cursor="pointer"
              _hover={{ color: 'gray.600' }}
              onClick={() => setShowPw((p) => !p)}
            >
              {showPw ? <EyeOffIco /> : <EyeIco />}
            </Box>
          </Box>
        </Box>

        {/* Keep logged / Forgot (sign in only) */}
        {isSignIn && (
          <Flex justify="space-between" align="center" mb="24px">
            <HStack
              gap="8px"
              cursor="pointer"
              onClick={() => setKeepLogged((p) => !p)}
            >
              <Box
                w="16px"
                h="16px"
                borderRadius="4px"
                bg={keepLogged ? P : 'white'}
                border="2px solid"
                borderColor={keepLogged ? P : 'gray.300'}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink="0"
              >
                {keepLogged && (
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </Box>
              <Text fontSize="12px" color="gray.600" fontWeight="500">
                Keep me logged in
              </Text>
            </HStack>
            <Text
              fontSize="12px"
              color={P}
              fontWeight="600"
              cursor="pointer"
              _hover={{ textDecoration: 'underline' }}
            >
              Forget password?
            </Text>
          </Flex>
        )}

        {/* Submit */}
        <Button
          bg={P}
          color="white"
          w="100%"
          h="44px"
          borderRadius="10px"
          fontSize="14px"
          fontWeight="700"
          mt={isSignIn ? '0' : '24px'}
          mb="16px"
          _hover={{ bg: P_DARK }}
          boxShadow={`0 4px 18px ${P}55`}
        >
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </Button>

        {/* Switch link */}
        <Text fontSize="12px" color="gray.500" textAlign="center">
          {isSignIn ? (
            <>
              Not registered yet?{' '}
              <Text
                as="span"
                color={P}
                fontWeight="700"
                cursor="pointer"
                onClick={() => onSwitch('signup')}
                _hover={{ textDecoration: 'underline' }}
              >
                Create an Account
              </Text>
            </>
          ) : (
            <>
              Have an Account?{' '}
              <Text
                as="span"
                color={P}
                fontWeight="700"
                cursor="pointer"
                onClick={() => onSwitch('signin')}
                _hover={{ textDecoration: 'underline' }}
              >
                Sign In
              </Text>
            </>
          )}
        </Text>
      </Box>

      {/* Footer */}
      <Text fontSize="11px" color="gray.300" textAlign="center" mt="32px">
        © 2022 Horizon UI. All Rights Reserved. Made with love by Simmmple!
      </Text>
    </Flex>
  );
}

// ─── HERO PANEL ───────────────────────────────────────────────────────────────
function HeroPanel(): JSX.Element {
  return (
    <Box
      w="480px"
      minW="480px"
      position="relative"
      overflow="hidden"
      borderRadius="0 24px 24px 0"
      style={{
        background:
          'radial-gradient(ellipse at 30% 20%, #a78bfa 0%, #6C63FF 35%, #4338ca 60%, #1e1b4b 100%)',
      }}
    >
      {/* Decorative blobs */}
      <Box
        position="absolute"
        top="-60px"
        right="-60px"
        w="300px"
        h="300px"
        borderRadius="full"
        bg="rgba(255,255,255,0.05)"
      />
      <Box
        position="absolute"
        bottom="-80px"
        left="-40px"
        w="260px"
        h="260px"
        borderRadius="full"
        bg="rgba(167,139,250,0.15)"
      />
      <Box
        position="absolute"
        top="40%"
        left="50%"
        transform="translate(-50%,-50%)"
        w="200px"
        h="200px"
        borderRadius="full"
        bg="rgba(255,255,255,0.04)"
      />

      {/* Pink blob bottom */}
      <Box
        position="absolute"
        bottom="80px"
        left="0"
        right="0"
        h="200px"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(236,72,153,0.35) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <Flex
        direction="column"
        h="100%"
        justify="center"
        align="center"
        position="relative"
        zIndex="1"
        p="48px"
      >
        {/* Logo mark */}
        <Box mb="16px">
          <DriviaLogo />
        </Box>

        {/* Brand name */}
        <HStack gap="10px" mb="60px">
          <Text
            fontSize="32px"
            fontWeight="800"
            color="white"
            fontStyle="italic"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Drivia
          </Text>
          {/* Small icon badge */}
          <Box
            w="28px"
            h="28px"
            borderRadius="8px"
            bg="rgba(255,255,255,0.2)"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </Box>
        </HStack>

        {/* CTA card */}
        <Box
          bg="rgba(255,255,255,0.12)"
          backdropFilter="blur(12px)"
          borderRadius="20px"
          p="24px 32px"
          textAlign="center"
          w="100%"
          border="1px solid rgba(255,255,255,0.2)"
        >
          <Text
            fontSize="12px"
            color="rgba(255,255,255,0.7)"
            fontWeight="600"
            letterSpacing="1.5px"
            textTransform="uppercase"
            mb="8px"
          >
            Manage Your Deals
          </Text>
          <Text
            fontSize="26px"
            fontWeight="800"
            color="white"
            fontStyle="italic"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            We Drive Your Sales
          </Text>
        </Box>
      </Flex>

      {/* Footer links */}
      <Flex
        position="absolute"
        bottom="20px"
        left="0"
        right="0"
        justify="center"
        gap="24px"
        zIndex="1"
      >
        {(['Marketplace', 'License', 'Terms of Use', 'Blog'] as const).map(
          (link) => (
            <Text
              key={link}
              fontSize="11px"
              color="rgba(255,255,255,0.5)"
              cursor="pointer"
              _hover={{ color: 'white' }}
            >
              {link}
            </Text>
          ),
        )}
        <Box
          position="absolute"
          right="20px"
          bottom="0"
          cursor="pointer"
          w="32px"
          h="32px"
          borderRadius="full"
          bg="rgba(255,255,255,0.15)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          _hover={{ bg: 'rgba(255,255,255,0.25)' }}
        >
          <MoonIco />
        </Box>
      </Flex>
    </Box>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AuthPage(): JSX.Element {
  const [mode, setMode] = useState<AuthMode>('signin');

  return (
    <Flex
      h="100vh"
      bg="white"
      overflow="hidden"
      fontFamily="'DM Sans', sans-serif"
    >
      <AuthPanel mode={mode} onSwitch={setMode} />
      <HeroPanel />
    </Flex>
  );
}

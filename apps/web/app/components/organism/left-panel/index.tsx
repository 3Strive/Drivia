import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { Colors } from '../../ui/color-pack';
import { CarIco, ShieldIco } from '../../atoms/icon';

export const LeftPanel = (): JSX.Element => {
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
      bg={Colors.INK}
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
          bg={Colors.P}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CarIco />
        </Box>
        <Text
          fontSize="20px"
          fontWeight="800"
          color={Colors.WHITE}
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
          color={Colors.P}
          mb="14px"
        >
          Dealer Platform
        </Text>
        <Heading
          fontSize="34px"
          fontWeight="800"
          color={Colors.WHITE}
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
                color={Colors.WHITE}
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
};

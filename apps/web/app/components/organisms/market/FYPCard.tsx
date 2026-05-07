import {
  Badge,
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaHeart,
  FaLocationArrow,
  FaPhoneAlt,
  FaRegHeart,
  FaRoad,
  FaWhatsapp,
} from 'react-icons/fa';
import { CarListing, Condition, InspStatus } from '../../../shared/types';
import { useRef, useState } from 'react';
import { LuFuel } from 'react-icons/lu';

const COND_COLOR: Record<Condition, { text: string; bg: string }> = {
  'Brand New': { text: '#1e40af', bg: '#dbeafe' },
  Tokunbo: { text: '#0d7a68', bg: '#ccfbf1' },
  'Nigerian Used': { text: '#9a3412', bg: '#fff7ed' },
};

const INSP_COLOR: Record<
  InspStatus,
  { text: string; bg: string; border: string }
> = {
  Inspected: { text: '#166534', bg: '#f0fdf4', border: '#86efac' },
  'Not Inspected': { text: '#991b1b', bg: '#fff1f2', border: '#fecdd3' },
  Pending: { text: '#92400e', bg: '#fffbeb', border: '#fde68a' },
};

// ─── FYP CARD ─────────────────────────────────────────────────────────────────
export function FYPCard({
  car,
  saved,
  onSave,
  onDetail,
  getSlides,
  initials,
  fmt,
  km,
}: {
  car: CarListing;
  saved: boolean;
  onSave: () => void;
  onDetail: () => void;
  getSlides: (images: string[]) => string[];
  initials: (dealerName: string) => string;
  km: (m: number) => string;
  fmt: (n: number) => string;
}) {
  const slides = getSlides(car.images);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cond = COND_COLOR[car.condition];
  const insp = INSP_COLOR[car.inspection ?? 'Not Inspected'];

  const goTo = (idx: number) => {
    const next = Math.max(0, Math.min(idx, slides.length - 1));
    scrollRef.current?.scrollTo({
      left: next * window.innerWidth,
      behavior: 'smooth',
    });
    setActiveSlide(next);
  };

  const onScroll = () => {
    if (!scrollRef.current) return;
    const idx = Math.round(scrollRef.current.scrollLeft / window.innerWidth);
    setActiveSlide(Math.min(idx, slides.length - 1));
  };

  return (
    <Box
      h="100dvh"
      position="relative"
      overflow="hidden"
      flexShrink={0}
      scrollSnapAlign="start"
    >
      {/* ── Image slider ── */}
      <Box
        ref={scrollRef}
        onScroll={onScroll}
        display="flex"
        overflowX="auto"
        h="100%"
        css={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {slides.map((uri, idx) => (
          <Box
            key={idx}
            minW="100vw"
            h="100%"
            position="relative"
            bg="#111"
            scrollSnapAlign="start"
          >
            <Image
              src={uri}
              position="absolute"
              inset={0}
              w="100%"
              h="90%"
              objectFit="cover"
              filter="blur(20px)"
              transform="scale(1.08)"
              opacity={0.55}
              alt=""
            />
            <Box position="absolute" inset={0} bg="blackAlpha.400" />
            <Image
              src={uri}
              alt={`${car.make} ${car.model}`}
              position="absolute"
              inset={0}
              w="100%"
              h="100%"
              objectFit="contain"
            />
          </Box>
        ))}
      </Box>

      {/* ── Arrows ── */}
      {activeSlide > 0 && (
        <Box
          as="button"
          onClick={() => goTo(activeSlide - 1)}
          position="absolute"
          left="12px"
          top="50%"
          transform="translateY(-50%)"
          w="40px"
          h="40px"
          borderRadius="99px"
          bg="blackAlpha.600"
          border="1px solid"
          borderColor="whiteAlpha.300"
          color="white"
          fontSize="22px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          zIndex={10}
          _hover={{ bg: 'blackAlpha.800' }}
        >
          <FaArrowLeft size={20} />
        </Box>
      )}
      {activeSlide < slides.length - 1 && (
        <Box
          as="button"
          onClick={() => goTo(activeSlide + 1)}
          position="absolute"
          right="12px"
          top="50%"
          transform="translateY(-50%)"
          w="40px"
          h="40px"
          borderRadius="99px"
          bg="blackAlpha.600"
          border="1px solid"
          borderColor="whiteAlpha.300"
          color="white"
          fontSize="22px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          zIndex={10}
          _hover={{ bg: 'blackAlpha.800' }}
        >
          <FaArrowRight size={20} />
        </Box>
      )}

      {/* ── Dot indicators ── */}
      <HStack
        position="absolute"
        bottom="220px"
        left="50%"
        transform="translateX(-50%)"
        gap="6px"
      >
        {slides.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => goTo(idx)}
            w={idx === activeSlide ? '18px' : '6px'}
            h="6px"
            borderRadius="99px"
            bg={idx === activeSlide ? 'white' : 'whiteAlpha.400'}
            transition="all 0.25s"
            cursor="pointer"
          />
        ))}
      </HStack>

      {/* ── Condition pill — top left ── */}
      <Box position="absolute" bottom="250px" left="16px">
        <Badge
          px="10px"
          py="4px"
          borderRadius="99px"
          fontSize="11px"
          fontWeight={700}
          letterSpacing="0.5px"
          textTransform="uppercase"
          bg={cond.bg}
          color={cond.text}
        >
          {car.condition}
        </Badge>
      </Box>

      {/* ── Inspection score + save — top right ── */}
      <VStack
        position="absolute"
        top="7%"
        right="16px"
        align="flex-end"
        gap="8px"
      >
        {car.inspection === 'Inspected' && (
          <HStack
            bg="whiteAlpha.900"
            borderRadius="99px"
            px="10px"
            py="4px"
            gap="5px"
          >
            <Box w="7px" h="7px" borderRadius="99px" bg="#22c55e" />
            <Text fontSize="11px" fontWeight={700} color="gray.800">
              {car.report?.overall}/100
            </Text>
          </HStack>
        )}
      </VStack>

      <VStack
        position="absolute"
        bottom="250px"
        right="16px"
        as="button"
        onClick={onSave}
        cursor="pointer"
        _hover={{ bg: 'blackAlpha.700' }}
      >
        {saved ? (
          <FaHeart size={30} color="red" />
        ) : (
          <FaRegHeart size={30} color="white" />
        )}
      </VStack>
      {/* ── Bottom overlay ── */}
      <Box
        onClick={onDetail}
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bgGradient="linear(to-t, blackAlpha.900, transparent)"
        px="16px"
        pt="40px"
        pb="36px"
        cursor="pointer"
      >
        <Text
          fontSize={{ base: '22px', md: '28px' }}
          fontWeight={900}
          color="white"
          letterSpacing="0.3px"
        >
          {fmt(car.price)}
        </Text>
        <Text
          fontSize={{ base: '15px', md: '19px' }}
          fontWeight={800}
          color="white"
          my="3px"
        >
          {car.year} {car.make} {car.model}
        </Text>

        <Flex
          align="center"
          gap="8px"
          flexWrap="wrap"
          mb="14px"
          opacity={0.85}
          fontSize={{ base: '11px', md: '13px' }}
        >
          <Text color="white">
            <FaLocationArrow /> {car.location}
          </Text>
          <Box w="3px" h="3px" borderRadius="99px" bg="whiteAlpha.500" />
          <Text color="white">
            <FaRoad size={16} />
            {km(car.mileage)}
          </Text>
          <Box w="3px" h="3px" borderRadius="99px" bg="whiteAlpha.500" />
          <Text color="white">
            <LuFuel size={16} /> {car.fuelType}
          </Text>
          <Box w="3px" h="3px" borderRadius="99px" bg="whiteAlpha.500" />
          <Badge
            px="7px"
            py="2px"
            borderRadius="6px"
            fontSize="10px"
            fontWeight={700}
            bg={insp.bg}
            color={insp.text}
          >
            {car.inspection}
          </Badge>
        </Flex>

        <Flex align="center" gap="10px">
          <Flex
            w="32px"
            h="32px"
            borderRadius="99px"
            bg="#fbbf24"
            align="center"
            justify="center"
            fontSize="11px"
            fontWeight={900}
            color="white"
            flexShrink={0}
          >
            {initials(car.dealerName!)}
          </Flex>
          <Box flex={1} minW={0}>
            <Text fontSize="12px" fontWeight={700} color="white" lineClamp={1}>
              {car.dealerName}
            </Text>
            <Text fontSize="11px" color="#fbbf24">
              ⭐ {car.dealerRating}
            </Text>
          </Box>
          <Link
            href={`tel:${car.phone}`}
            onClick={(e) => e.stopPropagation()}
            display="flex"
            alignItems="center"
            gap="4px"
            bg="whiteAlpha.900"
            borderRadius="10px"
            px="12px"
            py="8px"
            fontSize="12px"
            fontWeight={700}
            color="gray.700"
            textDecoration="none"
            flexShrink={0}
            _hover={{ bg: 'white' }}
          >
            <FaPhoneAlt /> Call
          </Link>
          <Link
            href={`https://wa.me/234${car.phone.slice(1)}`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            display="flex"
            alignItems="center"
            gap="4px"
            bg="#dcfce7"
            borderRadius="10px"
            px="12px"
            py="8px"
            fontSize="12px"
            fontWeight={700}
            color="#16a34a"
            textDecoration="none"
            flexShrink={0}
            _hover={{ bg: '#bbf7d0' }}
          >
            <FaWhatsapp />
            Chat
          </Link>
        </Flex>

        <Text
          fontSize="11px"
          color="whiteAlpha.500"
          mt="10px"
          textAlign="center"
        >
          Tap for full details · {car.views} views · {car.savedCount} saves
        </Text>
      </Box>
    </Box>
  );
}

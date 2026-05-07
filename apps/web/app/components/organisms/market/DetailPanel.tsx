import { Badge, Box, Flex, Grid, HStack, Link, Text } from '@chakra-ui/react';
import { FaLocationArrow, FaPhone, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { ScoreBar } from '../../molecules/market/ScoreBar';
import { CarListing } from '../../../shared/types';
import {
  COND_COLOR,
  INSP_COLOR,
  STATUS_COLOR,
} from '../../../shared/constants';

// ─── DETAIL BOTTOM SHEET ──────────────────────────────────────────────────────
export function DetailPanel({
  car,
  onClose,
  initials,
  fmt,
}: {
  car: CarListing;
  onClose: () => void;
  initials: (dealerName: string) => string;
  fmt: (n: number) => string;
}) {
  const insp = INSP_COLOR[car.inspection ?? 'Not Inspected'];
  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={200}
      bg="blackAlpha.700"
      backdropFilter="blur(6px)"
      display="flex"
      alignItems="flex-end"
      onClick={onClose}
    >
      <Box
        w="100%"
        maxW="560px"
        mx="auto"
        bg="#0f0f0f"
        borderRadius="20px 20px 0 0"
        maxH="85vh"
        overflowY="auto"
        border="1px solid"
        borderColor="whiteAlpha.200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <Flex justify="center" pt="12px">
          <Box w="36px" h="4px" borderRadius="2px" bg="whiteAlpha.300" />
        </Flex>

        <Box p="16px 20px 32px">
          {/* Header */}
          <Flex justify="space-between" align="flex-start" mb="16px">
            <Box>
              <Text fontSize="20px" fontWeight={900} color="white">
                {car.year} {car.make} {car.model}
              </Text>
              <HStack gap="6px" mt="5px">
                <Badge
                  px="8px"
                  py="3px"
                  borderRadius="6px"
                  fontSize="10px"
                  fontWeight={700}
                  bg={COND_COLOR[car.condition].bg}
                  color={COND_COLOR[car.condition].text}
                >
                  {car.condition}
                </Badge>
                <Badge
                  px="8px"
                  py="3px"
                  borderRadius="6px"
                  fontSize="10px"
                  fontWeight={700}
                  bg={STATUS_COLOR[car.status].bg}
                  color={STATUS_COLOR[car.status].text}
                >
                  {car.status}
                </Badge>
              </HStack>
            </Box>
            <Box
              as="button"
              onClick={onClose}
              bg="whiteAlpha.200"
              border="none"
              color="white"
              borderRadius="99px"
              w="32px"
              h="32px"
              cursor="pointer"
              fontSize="16px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: 'whiteAlpha.300' }}
            >
              <FaTimes size={16} />
            </Box>
          </Flex>

          {/* Price */}
          <Text fontSize="30px" fontWeight={900} color="#6C63FF" mb="4px">
            {fmt(car.price)}
          </Text>
          <Text fontSize="12px" color="whiteAlpha.600" mb="18px">
            <FaLocationArrow size={16} /> {car.location} · {car.views} views ·{' '}
            {car.savedCount} saves
          </Text>

          {/* Specs grid */}
          <Grid templateColumns="1fr 1fr" gap="8px" mb="18px">
            {[
              ['Transmission', car.transmission],
              ['Fuel', car.fuelType],
              ['Color', car.color],
              ['Mileage', `${car.mileage.toLocaleString()} km`],
              ['Posted', `${car.daysListed}d ago`],
              ['Rating', `⭐ ${car.rating} (${car.reviewCount})`],
            ].map(([k, v]) => (
              <Box key={k} bg="whiteAlpha.100" borderRadius="10px" p="9px 12px">
                <Text
                  fontSize="10px"
                  color="whiteAlpha.500"
                  fontWeight={600}
                  mb="2px"
                >
                  {k}
                </Text>
                <Text fontSize="13px" fontWeight={700} color="white">
                  {v}
                </Text>
              </Box>
            ))}
          </Grid>

          {/* Inspection */}
          <Box mb="18px">
            <Text
              fontSize="10px"
              fontWeight={700}
              color="whiteAlpha.500"
              textTransform="uppercase"
              letterSpacing="0.5px"
              mb="8px"
            >
              Inspection
            </Text>
            <Flex
              align="center"
              gap="10px"
              p="10px 14px"
              borderRadius="10px"
              bg={insp.bg}
              border="1px solid"
              borderColor={insp.border}
              mb="10px"
            >
              <Text fontSize="16px">
                {car.inspection === 'Inspected'
                  ? '🛡️'
                  : car.inspection === 'Pending'
                    ? '⏳'
                    : '⚠️'}
              </Text>
              <Text flex={1} fontSize="13px" fontWeight={700} color={insp.text}>
                {car.inspection}
              </Text>
              {car.report && (
                <Text fontSize="22px" fontWeight={900} color={insp.text}>
                  {car.report.overall}
                  <Text as="span" fontSize="11px">
                    /100
                  </Text>
                </Text>
              )}
            </Flex>
            {car.report && (
              <Box bg="whiteAlpha.50" borderRadius="10px" p="12px 14px">
                <ScoreBar label="Engine" value={car.report.engine} />
                <ScoreBar label="Exterior" value={car.report.exterior} />
                <ScoreBar label="Interior" value={car.report.interior} />
                <ScoreBar
                  label="Transmission"
                  value={car.report.transmission}
                />
                <ScoreBar label="Electronics" value={car.report.electronics} />
                <Flex justify="space-between" mt="8px">
                  <Text fontSize="10px" color="whiteAlpha.400">
                    By {car.report.inspector}
                  </Text>
                  <Text fontSize="10px" color="whiteAlpha.400">
                    {car.report.date}
                  </Text>
                </Flex>
              </Box>
            )}
          </Box>

          {/* Dealer */}
          <Box bg="whiteAlpha.100" borderRadius="12px" p="12px 14px" mb="20px">
            <Text
              fontSize="10px"
              fontWeight={700}
              color="whiteAlpha.500"
              textTransform="uppercase"
              letterSpacing="0.5px"
              mb="8px"
            >
              Dealer
            </Text>
            <HStack gap="10px">
              <Flex
                w="36px"
                h="36px"
                borderRadius="99px"
                bg="#fbbf24"
                align="center"
                justify="center"
                fontSize="12px"
                fontWeight={900}
                color="white"
                flexShrink={0}
              >
                {initials(car.dealerName!)}
              </Flex>
              <Box>
                <Text fontSize="13px" fontWeight={700} color="white">
                  {car.dealerName}
                </Text>
                <Text fontSize="11px" color="#fbbf24">
                  ⭐ {car.dealerRating}
                </Text>
              </Box>
            </HStack>
          </Box>

          {/* CTAs */}
          <HStack gap="10px">
            <Link
              href={`https://wa.me/234${car.phone.slice(1)}`}
              target="_blank"
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="8px"
              bg="#25D366"
              color="white"
              borderRadius="12px"
              h="48px"
              fontSize="14px"
              fontWeight={700}
              textDecoration="none"
              _hover={{ opacity: 0.9 }}
            >
              <FaWhatsapp size={16} color={'green'} /> WhatsApp
            </Link>
            <Link
              href={`tel:${car.phone}`}
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="8px"
              bg="rgba(108,99,255,0.2)"
              color="#a5a0ff"
              borderRadius="12px"
              h="48px"
              fontSize="14px"
              fontWeight={700}
              textDecoration="none"
              border="1px solid"
              borderColor="rgba(108,99,255,0.3)"
              _hover={{ opacity: 0.9 }}
            >
              <FaPhone size={16} color="red" /> Call
            </Link>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}

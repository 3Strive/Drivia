'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  VStack,
  Textarea,
  Badge,
  Grid,
  Image,
} from '@chakra-ui/react';
import { CarListing } from '../../shared/types';

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const P = '#6C63FF';
const P_DARK = '#5B54E8';

// ─── TYPES ────────────────────────────────────────────────────────────────────
// export interface CarListing {
//   id: number;
//   title: string;
//   make: string;
//   model: string;
//   year: number;
//   price: number; // in Naira
//   mileage: number; // in km
//   condition: 'Tokunbo' | 'Nigerian Used' | 'Brand New';
//   location: string;
//   phone: string;
//   img?: string;
//   gradient?: string;
// }

type PlatformId = 'whatsapp' | 'facebook' | 'instagram';
type PostStatus = 'idle' | 'posting' | 'success' | 'error';

interface Platform {
  id: PlatformId;
  name: string;
  color: string;
  bg: string;
  charLimit: number | null;
  connected: boolean;
  icon: JSX.Element;
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: CarListing | null;
}

// ─── PLATFORM ICONS ──────────────────────────────────────────────────────────
const WhatsAppIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const FacebookIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const CheckIcon = (): JSX.Element => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const CloseIcon = (): JSX.Element => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const SpinnerIcon = (): JSX.Element => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    style={{ animation: 'spin 0.8s linear infinite' }}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// ─── PLATFORMS CONFIG ─────────────────────────────────────────────────────────
const PLATFORMS: Platform[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    color: '#FFFFFF',
    bg: '#25D366',
    charLimit: null,
    connected: true,
    icon: <WhatsAppIcon />,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    color: '#FFFFFF',
    bg: '#1877F2',
    charLimit: 63206,
    connected: true,
    icon: <FacebookIcon />,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    color: '#FFFFFF',
    bg: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    charLimit: 2200,
    connected: true,
    icon: <InstagramIcon />,
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const formatPrice = (n: number): string => `₦${n.toLocaleString('en-NG')}`;

const formatMileage = (n: number): string => `${n.toLocaleString('en-NG')} km`;

const buildCaption = (listing: CarListing, platform: PlatformId): string => {
  const price = formatPrice(listing.price);
  const mileage = formatMileage(listing.mileage);

  if (platform === 'whatsapp') {
    return (
      `🚗 *${listing.year} ${listing.make} ${listing.model}*\n\n` +
      `💰 *Price:* ${price}\n` +
      `📍 *Location:* ${listing.location}\n` +
      `🛣️ *Mileage:* ${mileage}\n` +
      `✅ *Condition:* ${listing.condition}\n\n` +
      `Interested? Call/WhatsApp: ${listing.phone}\n\n` +
      `#${listing.make} #${listing.model} #CarForSale #NigeriaAutos`
    );
  }

  if (platform === 'instagram') {
    return (
      `${listing.year} ${listing.make} ${listing.model} 🚗✨\n\n` +
      `💵 ${price}\n` +
      `📍 ${listing.location} | ${listing.condition}\n` +
      `🛣️ ${mileage}\n\n` +
      `DM or call ${listing.phone} to book a test drive 🔑\n\n` +
      `#CarDealership #${listing.make}${listing.model} #NaijaAutos ` +
      `#CarForSale #${listing.make}Nigeria #AutoDealer #LagosAutos`
    );
  }

  // facebook
  return (
    `🚘 ${listing.year} ${listing.make} ${listing.model} — Now Available!\n\n` +
    `📌 ${listing.condition} | ${listing.location}\n` +
    `💰 Price: ${price}\n` +
    `🛣️ Mileage: ${mileage}\n\n` +
    `Ready for a test drive? Call or WhatsApp us on ${listing.phone}\n\n` +
    `#${listing.make} #NigeriaUsedCars #CarDealership #AutoSales`
  );
};

// ─── PLATFORM TOGGLE ─────────────────────────────────────────────────────────
interface PlatformToggleProps {
  platform: Platform;
  selected: boolean;
  status: PostStatus;
  onToggle: () => void;
}

function PlatformToggle({
  platform,
  selected,
  status,
  onToggle,
}: PlatformToggleProps): JSX.Element {
  const isDone = status === 'success';
  const isPosting = status === 'posting';
  const isError = status === 'error';

  return (
    <Box
      as="button"
      onClick={!isDone ? onToggle : undefined}
      position="relative"
      borderRadius="14px"
      border="2px solid"
      borderColor={selected ? platform.bg : 'gray.150'}
      bg={selected ? `${platform.bg}10` : 'white'}
      p="14px 16px"
      cursor={isDone ? 'default' : 'pointer'}
      transition="all 0.18s"
      _hover={
        !isDone ? { borderColor: platform.bg, bg: `${platform.bg}08` } : {}
      }
      w="100%"
      textAlign="left"
      opacity={isError ? 0.6 : 1}
    >
      <HStack gap="12px">
        {/* Platform icon bubble */}
        <Box
          w="38px"
          h="38px"
          borderRadius="10px"
          bg={platform.bg}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          flexShrink="0"
          boxShadow={selected ? `0 4px 12px ${platform.bg}55` : 'none'}
          transition="box-shadow 0.18s"
        >
          {isPosting ? <SpinnerIcon /> : platform.icon}
        </Box>

        <Box flex="1">
          <Text fontSize="13px" fontWeight="600" color="gray.800">
            {platform.name}
          </Text>
          <Text
            fontSize="11px"
            color={
              isDone
                ? 'green.500'
                : isError
                  ? 'red.400'
                  : isPosting
                    ? 'gray.400'
                    : platform.connected
                      ? 'green.500'
                      : 'orange.400'
            }
          >
            {isDone
              ? '✓ Posted successfully'
              : isError
                ? 'Failed — tap to retry'
                : isPosting
                  ? 'Posting...'
                  : platform.connected
                    ? 'Connected'
                    : 'Not connected'}
          </Text>
        </Box>

        {/* Checkbox */}
        {!isDone && (
          <Box
            w="20px"
            h="20px"
            borderRadius="6px"
            flexShrink="0"
            border="2px solid"
            borderColor={selected ? P : 'gray.200'}
            bg={selected ? P : 'white'}
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="all 0.15s"
          >
            {selected && <CheckIcon />}
          </Box>
        )}
        {isDone && (
          <Box
            w="20px"
            h="20px"
            borderRadius="full"
            flexShrink="0"
            bg="green.400"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
          >
            <CheckIcon />
          </Box>
        )}
      </HStack>
    </Box>
  );
}

// ─── CAPTION PREVIEW ─────────────────────────────────────────────────────────
interface CaptionEditorProps {
  platform: Platform;
  value: string;
  onChange: (v: string) => void;
}

function CaptionEditor({
  platform,
  value,
  onChange,
}: CaptionEditorProps): JSX.Element {
  const limit = platform.charLimit;
  const count = value.length;
  const overLimit = limit !== null && count > limit;

  return (
    <Box>
      <HStack justify="space-between" mb="6px">
        <HStack gap="6px">
          <Box
            w="16px"
            h="16px"
            borderRadius="4px"
            bg={platform.bg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontSize="9px"
            flexShrink="0"
          >
            {platform.icon}
          </Box>
          <Text fontSize="12px" fontWeight="600" color="gray.600">
            {platform.name}
          </Text>
        </HStack>
        {limit !== null && (
          <Text fontSize="11px" color={overLimit ? 'red.400' : 'gray.400'}>
            {count}/{limit}
          </Text>
        )}
      </HStack>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        fontSize="12px"
        lineHeight="1.6"
        borderRadius="10px"
        borderColor={overLimit ? 'red.300' : 'gray.200'}
        bg="gray.50"
        resize="vertical"
        _focus={{ borderColor: P, boxShadow: `0 0 0 1px ${P}`, bg: 'white' }}
        _placeholder={{ color: 'gray.300' }}
        fontFamily="'DM Sans', sans-serif"
      />
    </Box>
  );
}

// ─── MAIN MODAL ──────────────────────────────────────────────────────────────
export function ShareModal({
  isOpen,
  onClose,
  listing,
}: ShareModalProps): JSX.Element | null {
  const [selected, setSelected] = useState<Record<PlatformId, boolean>>({
    whatsapp: true,
    facebook: true,
    instagram: true,
  });
  const [captions, setCaptions] = useState<Record<PlatformId, string>>({
    whatsapp: '',
    facebook: '',
    instagram: '',
  });
  const [statuses, setStatuses] = useState<Record<PlatformId, PostStatus>>({
    whatsapp: 'idle',
    facebook: 'idle',
    instagram: 'idle',
  });
  const [activeTab, setActiveTab] = useState<PlatformId>('whatsapp');
  const [step, setStep] = useState<'compose' | 'done'>('compose');

  // Regenerate captions when listing changes
  useEffect(() => {
    if (!listing) return;
    setCaptions({
      whatsapp: buildCaption(listing, 'whatsapp'),
      facebook: buildCaption(listing, 'facebook'),
      instagram: buildCaption(listing, 'instagram'),
    });
    setStatuses({ whatsapp: 'idle', facebook: 'idle', instagram: 'idle' });
    setSelected({ whatsapp: true, facebook: true, instagram: true });
    setStep('compose');
  }, [listing]);

  if (!isOpen || !listing) return null;

  const selectedPlatforms = PLATFORMS.filter((p) => selected[p.id]);
  const allDone = selectedPlatforms.every((p) => statuses[p.id] === 'success');
  const isAnyPosting = Object.values(statuses).some((s) => s === 'posting');

  const handleToggle = (id: PlatformId): void => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = async (): Promise<void> => {
    const targets = PLATFORMS.filter((p) => selected[p.id]);
    if (targets.length === 0) return;

    // Mark all selected as "posting"
    setStatuses((prev) => {
      const next = { ...prev };
      targets.forEach((p) => {
        next[p.id] = 'posting';
      });
      return next;
    });

    // Simulate posting to each platform with staggered delays
    for (const platform of targets) {
      await new Promise<void>((resolve) =>
        setTimeout(resolve, 800 + Math.random() * 600),
      );
      setStatuses((prev) => ({ ...prev, [platform.id]: 'success' }));
    }

    setStep('done');
  };

  return (
    <>
      {/* ── BACKDROP ── */}
      <Box
        position="fixed"
        inset="0"
        bg="blackAlpha.600"
        zIndex="1000"
        onClick={onClose}
        style={{ backdropFilter: 'blur(4px)' }}
      />

      {/* ── MODAL ── */}
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex="1001"
        w="680px"
        maxW="95vw"
        maxH="90vh"
        bg="white"
        borderRadius="20px"
        boxShadow="0 24px 80px rgba(0,0,0,0.2)"
        overflow="hidden"
        display="flex"
        flexDir="column"
      >
        {/* ── HEADER ── */}
        <Flex
          align="center"
          justify="space-between"
          px="24px"
          py="18px"
          borderBottom="1px solid"
          borderColor="gray.100"
          flexShrink="0"
        >
          <Box>
            <Text fontWeight="800" fontSize="17px" color="gray.800">
              Share Listing
            </Text>
            <Text fontSize="12px" color="gray.400" mt="1px">
              {step === 'done'
                ? `Posted to ${selectedPlatforms.length} platform${selectedPlatforms.length > 1 ? 's' : ''}`
                : `${selectedPlatforms.length} platform${selectedPlatforms.length > 1 ? 's' : ''} selected`}
            </Text>
          </Box>
          <Box
            as="button"
            onClick={onClose}
            w="32px"
            h="32px"
            borderRadius="8px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="gray.400"
            _hover={{ bg: 'gray.100', color: 'gray.600' }}
            transition="all 0.15s"
          >
            <CloseIcon />
          </Box>
        </Flex>

        <Box overflow="auto" flex="1">
          <Grid templateColumns="1fr 1.4fr" h="100%">
            {/* ── LEFT: Listing preview + platform toggles ── */}
            <Box
              borderRight="1px solid"
              borderColor="gray.100"
              p="20px"
              display="flex"
              flexDir="column"
              gap="16px"
            >
              {/* Car preview card */}
              <Box
                borderRadius="14px"
                overflow="hidden"
                border="1px solid"
                borderColor="gray.100"
              >
                <Box
                  h="110px"
                  position="relative"
                  overflow="hidden"
                  bgGradient={
                    listing.gradient ?? 'linear(to-br, #6C63FF, #9c5bff)'
                  }
                >
                  {listing.images && (
                    <Image
                      src={listing.images[0]}
                      position="absolute"
                      inset="0"
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      opacity="0.7"
                    />
                  )}
                  <Box
                    position="absolute"
                    inset="0"
                    bgGradient="linear(to-t, rgba(0,0,0,0.5), transparent)"
                  />
                  <Badge
                    position="absolute"
                    top="10px"
                    left="10px"
                    bg={
                      listing.condition === 'Brand New'
                        ? 'green.400'
                        : listing.condition === 'Tokunbo'
                          ? P
                          : 'orange.400'
                    }
                    color="white"
                    borderRadius="6px"
                    fontSize="10px"
                    px="8px"
                    py="2px"
                    fontWeight="700"
                  >
                    {listing.condition}
                  </Badge>
                </Box>
                <Box p="12px" bg="gray.50">
                  <Text fontWeight="700" fontSize="14px" color="gray.800">
                    {listing.year} {listing.make} {listing.model}
                  </Text>
                  <HStack gap="10px" mt="4px">
                    <Text fontSize="15px" fontWeight="800" color={P}>
                      {formatPrice(listing.price)}
                    </Text>
                    <Text fontSize="11px" color="gray.400">
                      ·
                    </Text>
                    <Text fontSize="11px" color="gray.500">
                      {formatMileage(listing.mileage)}
                    </Text>
                  </HStack>
                  <Text fontSize="11px" color="gray.400" mt="2px">
                    📍 {listing.location}
                  </Text>
                </Box>
              </Box>

              {/* Platform toggles */}
              <Box>
                <Text
                  fontSize="12px"
                  fontWeight="700"
                  color="gray.500"
                  textTransform="uppercase"
                  letterSpacing="0.5px"
                  mb="8px"
                >
                  Share to
                </Text>
                <VStack gap="8px" align="stretch">
                  {PLATFORMS.map((p) => (
                    <PlatformToggle
                      key={p.id}
                      platform={p}
                      selected={selected[p.id]}
                      status={statuses[p.id]}
                      onToggle={() => handleToggle(p.id)}
                    />
                  ))}
                </VStack>
              </Box>
            </Box>

            {/* ── RIGHT: Caption editors ── */}
            <Box p="20px" display="flex" flexDir="column" gap="16px">
              {step === 'done' ? (
                // ── SUCCESS STATE ──
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  flex="1"
                  gap="16px"
                  py="32px"
                >
                  <Box
                    w="64px"
                    h="64px"
                    borderRadius="full"
                    bg="green.50"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="32px"
                  >
                    🎉
                  </Box>
                  <Box textAlign="center">
                    <Text
                      fontWeight="800"
                      fontSize="18px"
                      color="gray.800"
                      mb="6px"
                    >
                      All posts sent!
                    </Text>
                    <Text fontSize="13px" color="gray.400" maxW="220px">
                      Your listing has been shared to {selectedPlatforms.length}{' '}
                      platform{selectedPlatforms.length > 1 ? 's' : ''}. Buyers
                      will start seeing it shortly.
                    </Text>
                  </Box>
                  <VStack gap="8px" w="100%" mt="8px">
                    {selectedPlatforms.map((p) => (
                      <HStack
                        key={p.id}
                        px="16px"
                        py="10px"
                        bg="green.50"
                        borderRadius="10px"
                        w="100%"
                        gap="10px"
                      >
                        <Box
                          w="28px"
                          h="28px"
                          borderRadius="8px"
                          bg={p.bg}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          color="white"
                          fontSize="12px"
                          flexShrink="0"
                        >
                          {p.icon}
                        </Box>
                        <Text
                          fontSize="13px"
                          fontWeight="600"
                          color="gray.700"
                          flex="1"
                        >
                          {p.name}
                        </Text>
                        <Text
                          fontSize="11px"
                          color="green.500"
                          fontWeight="600"
                        >
                          ✓ Posted
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Flex>
              ) : (
                // ── COMPOSE STATE ──
                <>
                  <Box>
                    <Text
                      fontSize="12px"
                      fontWeight="700"
                      color="gray.500"
                      textTransform="uppercase"
                      letterSpacing="0.5px"
                      mb="10px"
                    >
                      Edit Captions
                    </Text>
                    {/* Tab selector */}
                    <HStack gap="6px" mb="14px">
                      {PLATFORMS.filter((p) => selected[p.id]).map((p) => (
                        <Button
                          key={p.id}
                          size="xs"
                          borderRadius="8px"
                          bg={activeTab === p.id ? p.bg : 'gray.100'}
                          color={activeTab === p.id ? 'white' : 'gray.500'}
                          fontSize="11px"
                          fontWeight="600"
                          onClick={() => setActiveTab(p.id)}
                          _hover={{ opacity: 0.85 }}
                          px="10px"
                          h="26px"
                          gap="5px"
                        >
                          {p.icon} {p.name}
                        </Button>
                      ))}
                    </HStack>

                    {/* Active caption editor */}
                    {PLATFORMS.filter(
                      (p) => selected[p.id] && p.id === activeTab,
                    ).map((p) => (
                      <CaptionEditor
                        key={p.id}
                        platform={p}
                        value={captions[p.id]}
                        onChange={(v) =>
                          setCaptions((prev) => ({ ...prev, [p.id]: v }))
                        }
                      />
                    ))}

                    {selectedPlatforms.length === 0 && (
                      <Box py="24px" textAlign="center">
                        <Text fontSize="13px" color="gray.400">
                          Select at least one platform to continue
                        </Text>
                      </Box>
                    )}
                  </Box>

                  {/* Tips */}
                  <Box bg={`${P}08`} borderRadius="10px" p="12px">
                    <Text fontSize="11px" fontWeight="700" color={P} mb="4px">
                      💡 Tips
                    </Text>
                    <VStack align="start" gap="3px">
                      {[
                        'WhatsApp works best with bold text (*text*) and emojis',
                        'Instagram captions under 125 chars show without truncation',
                        'Add your phone number so buyers can reach you directly',
                      ].map((tip, i) => (
                        <Text key={i} fontSize="11px" color="gray.500">
                          · {tip}
                        </Text>
                      ))}
                    </VStack>
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        </Box>

        {/* ── FOOTER ── */}
        <Flex
          align="center"
          justify="space-between"
          px="24px"
          py="16px"
          borderTop="1px solid"
          borderColor="gray.100"
          bg="gray.50"
          flexShrink="0"
        >
          {step === 'done' ? (
            <>
              <Text fontSize="12px" color="gray.400">
                Posted{' '}
                {new Date().toLocaleTimeString('en-NG', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
              <Button
                bg={P}
                color="white"
                borderRadius="10px"
                fontSize="13px"
                fontWeight="700"
                h="40px"
                px="24px"
                _hover={{ bg: P_DARK }}
                onClick={onClose}
              >
                Done
              </Button>
            </>
          ) : (
            <>
              <Text fontSize="12px" color="gray.400">
                {selectedPlatforms.length === 0
                  ? 'No platforms selected'
                  : `Posting to ${selectedPlatforms.map((p) => p.name).join(', ')}`}
              </Text>
              <HStack gap="10px">
                <Button
                  variant="ghost"
                  fontSize="13px"
                  fontWeight="600"
                  color="gray.500"
                  h="40px"
                  px="16px"
                  borderRadius="10px"
                  _hover={{ bg: 'gray.100' }}
                  onClick={onClose}
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
                  disabled={selectedPlatforms.length === 0 || isAnyPosting}
                  onClick={handleShare}
                  gap="8px"
                  boxShadow={`0 4px 14px ${P}44`}
                >
                  {isAnyPosting ? (
                    <>
                      <SpinnerIcon /> Posting...
                    </>
                  ) : (
                    `Share to ${selectedPlatforms.length} Platform${selectedPlatforms.length > 1 ? 's' : ''}`
                  )}
                </Button>
              </HStack>
            </>
          )}
        </Flex>
      </Box>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}

// ─── DEMO WRAPPER (delete this in production) ─────────────────────────────────
const DEMO_LISTING: CarListing = {
  id: '1',
  title: '2021 Toyota Camry',
  make: 'Toyota',
  model: 'Camry',
  year: 2021,
  price: 16500000,
  mileage: 42000,
  condition: 'Tokunbo',
  location: 'Lekki, Lagos',
  phone: '08012345678',
  images: [
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=220&fit=crop',
  ],
  gradient: 'linear(to-br, #3F51B5, #6C63FF)',
  transmission: 'Automatic',
  fuelType: 'Petrol',
  description:
    'Well-maintained 2021 Toyota Camry with low mileage. Single owner, full service history, and no accidents. Features include leather seats, touchscreen display, rearview camera, and keyless entry. Perfect for city driving and long trips. Contact for more details or to schedule a test drive.',
  color: 'White',
  status: 'Available',
  postedAt: '2024-05-15T10:30:00Z',
  sharedTo: ['facebook'],
};

export default function ShareModalDemo(): JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <Box
      bg="#F4F5FA"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontFamily="'DM Sans', sans-serif"
    >
      <Button
        bg={P}
        color="white"
        borderRadius="12px"
        fontSize="14px"
        fontWeight="700"
        h="46px"
        px="28px"
        _hover={{ bg: P_DARK }}
        onClick={() => setOpen(true)}
        boxShadow={`0 6px 20px ${P}55`}
      >
        Share Post Demo
      </Button>
      <ShareModal
        isOpen={open}
        onClose={() => setOpen(false)}
        listing={DEMO_LISTING}
      />
    </Box>
  );
}

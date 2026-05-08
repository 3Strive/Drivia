'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  VStack,
  Badge,
  Grid,
  Image,
} from '@chakra-ui/react';
import {
  CarListing,
  Platform,
  PlatformId,
  PostStatus,
} from '../../../shared/types';
import { PlatformToggle } from '../../molecules/modal/PlatformToggle';
import {
  FaFacebook,
  FaInstagram,
  FaLocationArrow,
  FaTimes,
  FaWhatsapp,
} from 'react-icons/fa';
import { COLORS, SpinnerIcon } from '../../atoms';
import { CaptionEditor } from '../../molecules/modal/CaptionEditor';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: CarListing | null;
}

// ─── PLATFORMS CONFIG ─────────────────────────────────────────────────────────
const PLATFORMS: Platform[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    color: '#FFFFFF',
    bg: '#25D366',
    charLimit: null,
    connected: true,
    icon: <FaWhatsapp />,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    color: '#FFFFFF',
    bg: '#1877F2',
    charLimit: 63206,
    connected: true,
    icon: <FaFacebook />,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    color: '#FFFFFF',
    bg: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    charLimit: 2200,
    connected: true,
    icon: <FaInstagram />,
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
            <FaTimes />
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
                          ? COLORS.primary
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
                    <Text
                      fontSize="15px"
                      fontWeight="800"
                      color={COLORS.primary}
                    >
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
                    <FaLocationArrow /> {listing.location}
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
                  <Box bg={`${COLORS.primary}08`} borderRadius="10px" p="12px">
                    <Text
                      fontSize="11px"
                      fontWeight="700"
                      color={COLORS.primary}
                      mb="4px"
                    >
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
                bg={COLORS.primary}
                color="white"
                borderRadius="10px"
                fontSize="13px"
                fontWeight="700"
                h="40px"
                px="24px"
                _hover={{ bg: COLORS.primaryDark }}
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
                  bg={COLORS.primary}
                  color="white"
                  borderRadius="10px"
                  fontSize="13px"
                  fontWeight="700"
                  h="40px"
                  px="24px"
                  _hover={{ bg: COLORS.primaryDark }}
                  disabled={selectedPlatforms.length === 0 || isAnyPosting}
                  onClick={handleShare}
                  gap="8px"
                  boxShadow={`0 4px 14px ${COLORS.primary}44`}
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

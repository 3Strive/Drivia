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
  Image,
} from '@chakra-ui/react';
import AppLayout from '../components/template/general-layout';

const P = '#6C63FF';
const P_DARK = '#5B54E8';
const P_LIGHT = '#EEF0FF';
const BG = '#F4F5FA';
const WHITE = '#FFFFFF';
const WA = '#25D366';
const FB = '#1877F2';
const IG = '#E1306C';
const TW = '#1DA1F2';

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
const UpIco = () => (
  <Ico d="M12 19V5M5 12l7-7 7 7" size={10} sw={2.5} stroke="#38A169" />
);
const DnIco = () => (
  <Ico d="M12 5v14M5 12l7 7 7-7" size={10} sw={2.5} stroke="#E53E3E" />
);
const EditIco = () => (
  <Ico
    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
    size={13}
  />
);
const TrashIco = () => (
  <Ico
    d={[
      'M3 6h18',
      'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2',
    ]}
    size={13}
  />
);
const ShareIco = () => (
  <Ico
    d={[
      'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8',
      'M16 6l-4-4-4 4',
      'M12 2v13',
    ]}
    size={13}
  />
);
const EyeIco = () => (
  <Ico
    d={[
      'M1 12s4-8 11-8 11 8 11 8',
      'M1 12s4 8 11 8 11-8 11-8',
      'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
    ]}
    size={13}
  />
);

type PlatformId = 'whatsapp' | 'facebook' | 'instagram' | 'twitter';

interface Post {
  id: string;
  platform: PlatformId;
  caption: string;
  img?: string;
  postedAt: string;
  reach: number;
  enquiries: number;
  leads: number;
  status: 'Live' | 'Draft' | 'Scheduled' | 'Archived';
  listingRef: string;
}

interface PlatformAccount {
  id: PlatformId;
  name: string;
  handle: string;
  color: string;
  shortLabel: string;
  connected: boolean;
  autoPost: boolean;
  followers: number;
  totalPosts: number;
  totalReach: number;
  convRate: number;
  avgEnquiriesPerPost: number;
}

const PLATFORMS: PlatformAccount[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: 'Business Account',
    color: WA,
    shortLabel: 'W',
    connected: true,
    autoPost: true,
    followers: 847,
    totalPosts: 62,
    totalReach: 18400,
    convRate: 42,
    avgEnquiriesPerPost: 6.2,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: '@LagosAutoHub',
    color: FB,
    shortLabel: 'f',
    connected: true,
    autoPost: true,
    followers: 2341,
    totalPosts: 88,
    totalReach: 31200,
    convRate: 31,
    avgEnquiriesPerPost: 3.9,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@lagos.auto.hub',
    color: IG,
    shortLabel: 'ig',
    connected: true,
    autoPost: false,
    followers: 3102,
    totalPosts: 74,
    totalReach: 28900,
    convRate: 27,
    avgEnquiriesPerPost: 2.8,
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    handle: '@LagosAutoHub',
    color: TW,
    shortLabel: 'X',
    connected: false,
    autoPost: false,
    followers: 0,
    totalPosts: 0,
    totalReach: 0,
    convRate: 0,
    avgEnquiriesPerPost: 0,
  },
];

const POSTS: Post[] = [
  {
    id: '1',
    platform: 'whatsapp',
    caption:
      '🚗 *2021 Toyota Camry — ₦16.5M*\n\nClean Tokunbo, full option, inspected.\nCall/WhatsApp: 08012345678\n\n#CarDeals #Lagos',
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=80&h=60&fit=crop',
    postedAt: 'Nov 3, 2024',
    reach: 1240,
    enquiries: 14,
    leads: 4,
    status: 'Live',
    listingRef: 'Toyota Camry 2021',
  },
  {
    id: '2',
    platform: 'facebook',
    caption:
      '🔥 Just In! 2022 Toyota Highlander — ₦45M\n\nAlmost brand new. Only 12,000km. 7-seater, full spec, push start. Perfect family SUV.\n\n📍 Lekki, Lagos\n📞 08012345678\n\n#Highlander #SUV #Lagos',
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=80&h=60&fit=crop',
    postedAt: 'Nov 5, 2024',
    reach: 3800,
    enquiries: 22,
    leads: 7,
    status: 'Live',
    listingRef: 'Toyota Highlander 2022',
  },
  {
    id: '3',
    platform: 'instagram',
    caption:
      'Sleek. Powerful. Ready to move. 🖤\n\n2020 BMW X5 | ₦52M | Tokunbo\n✅ Inspected & Certified\n\nDM or call 08087654321\n\n#BMWNigeria #LuxuryCars #AutoDealer',
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=80&h=60&fit=crop',
    postedAt: 'Nov 4, 2024',
    reach: 4200,
    enquiries: 18,
    leads: 5,
    status: 'Live',
    listingRef: 'BMW X5 2020',
  },
  {
    id: '4',
    platform: 'whatsapp',
    caption:
      '💰 Price Drop Alert!\n\n2018 Lexus RX350 — NOW ₦26M (was ₦28M)\n\nTokunbo, clean. Inspect before buy.\n\n📞 08012345678',
    img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=80&h=60&fit=crop',
    postedAt: 'Nov 6, 2024',
    reach: 890,
    enquiries: 8,
    leads: 2,
    status: 'Live',
    listingRef: 'Lexus RX350 2018',
  },
  {
    id: '5',
    platform: 'facebook',
    caption:
      'Weekend special — 2019 Mercedes C300. Full sport package. ₦35M. VI Lagos.',
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=80&h=60&fit=crop',
    postedAt: 'Nov 2, 2024',
    reach: 2100,
    enquiries: 11,
    leads: 3,
    status: 'Archived',
    listingRef: 'Mercedes C300 2019',
  },
  {
    id: '6',
    platform: 'instagram',
    caption:
      'Caption draft for Ford Ranger diesel listing... #FordRanger #DieselTruck',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=60&fit=crop',
    postedAt: '',
    reach: 0,
    enquiries: 0,
    leads: 0,
    status: 'Draft',
    listingRef: 'Ford Ranger 2020',
  },
  {
    id: '7',
    platform: 'facebook',
    caption:
      '🆕 Coming This Weekend — 2021 Hyundai Tucson, ₦19.5M. Follow for first look!',
    img: '',
    postedAt: 'Nov 9, 2024',
    reach: 0,
    enquiries: 0,
    leads: 0,
    status: 'Scheduled',
    listingRef: 'Hyundai Tucson 2021',
  },
];

const STATUS_CFG: Record<Post['status'], { bg: string; color: string }> = {
  Live: { bg: '#C6F6D5', color: '#276749' },
  Draft: { bg: 'gray.100', color: 'gray.500' },
  Scheduled: { bg: '#FEFCBF', color: '#744210' },
  Archived: { bg: '#FED7D7', color: '#9B2C2C' },
};

// ─── TOGGLE ───────────────────────────────────────────────────────────────────
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
      w="36px"
      h="19px"
      borderRadius="full"
      bg={on ? P : 'gray.300'}
      position="relative"
      transition="background 0.2s"
      flexShrink="0"
    >
      <Box
        position="absolute"
        top="2px"
        left={on ? '19px' : '2px'}
        w="15px"
        h="15px"
        borderRadius="full"
        bg="white"
        boxShadow="0 1px 3px rgba(0,0,0,0.25)"
        transition="left 0.2s"
      />
    </Box>
  );
}

// ─── PLATFORM CARD ────────────────────────────────────────────────────────────
function PlatformCard({
  platform,
  onToggleAutoPost,
  onToggleConnect,
}: {
  platform: PlatformAccount;
  onToggleAutoPost: () => void;
  onToggleConnect: () => void;
}): JSX.Element {
  const posts = POSTS.filter(
    (p) => p.platform === platform.id && p.status === 'Live',
  );
  const totalEnq = posts.reduce((a, p) => a + p.enquiries, 0);

  return (
    <Box
      bg={WHITE}
      borderRadius="16px"
      overflow="hidden"
      boxShadow="0 2px 12px rgba(0,0,0,0.06)"
      border="1.5px solid"
      borderColor={platform.connected ? 'gray.100' : 'gray.200'}
      opacity={platform.connected ? 1 : 0.7}
    >
      {/* Header */}
      <Flex
        align="center"
        justify="space-between"
        px="18px"
        py="14px"
        borderBottom="1px solid"
        borderColor="gray.50"
      >
        <HStack gap="10px">
          <Box
            w="36px"
            h="36px"
            borderRadius="10px"
            bg={platform.color}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink="0"
          >
            <Text fontSize="13px" color="white" fontWeight="900">
              {platform.shortLabel}
            </Text>
          </Box>
          <Box>
            <Text fontWeight="800" fontSize="14px" color="gray.800">
              {platform.name}
            </Text>
            <Text fontSize="11px" color="gray.400">
              {platform.connected ? platform.handle : 'Not connected'}
            </Text>
          </Box>
        </HStack>
        <HStack gap="10px">
          {platform.connected ? (
            <>
              <HStack gap="5px">
                <Text fontSize="11px" color="gray.500">
                  Auto-post
                </Text>
                <Toggle on={platform.autoPost} onChange={onToggleAutoPost} />
              </HStack>
              <Badge
                bg="#C6F6D5"
                color="#276749"
                borderRadius="6px"
                fontSize="9px"
                px="7px"
                py="2px"
                fontWeight="700"
              >
                Connected
              </Badge>
            </>
          ) : (
            <Button
              bg={platform.color}
              color="white"
              borderRadius="9px"
              fontSize="11px"
              fontWeight="700"
              h="28px"
              px="12px"
              _hover={{ opacity: 0.85 }}
              onClick={onToggleConnect}
            >
              Connect
            </Button>
          )}
        </HStack>
      </Flex>

      {/* Stats */}
      {platform.connected && (
        <Box px="18px" py="14px">
          <Grid templateColumns="repeat(4,1fr)" gap="8px" mb="14px">
            {[
              {
                label: 'Followers',
                value: platform.followers.toLocaleString(),
              },
              { label: 'Posts', value: platform.totalPosts.toString() },
              {
                label: 'Total Reach',
                value: `${(platform.totalReach / 1000).toFixed(1)}K`,
              },
              { label: 'Conv. Rate', value: `${platform.convRate}%` },
            ].map((s) => (
              <Box key={s.label} bg="gray.50" borderRadius="9px" p="8px 10px">
                <Text fontSize="10px" color="gray.400" fontWeight="600">
                  {s.label}
                </Text>
                <Text fontSize="15px" fontWeight="800" color="gray.800">
                  {s.value}
                </Text>
              </Box>
            ))}
          </Grid>

          {/* Live posts table */}
          <Text
            fontSize="10px"
            fontWeight="700"
            color="gray.400"
            textTransform="uppercase"
            letterSpacing="0.4px"
            mb="8px"
          >
            Recent Posts ({posts.length})
          </Text>
          {posts.length === 0 ? (
            <Box bg="gray.50" borderRadius="9px" p="12px" textAlign="center">
              <Text fontSize="12px" color="gray.400">
                No live posts on this platform
              </Text>
            </Box>
          ) : (
            <VStack gap="6px" align="stretch">
              {posts.slice(0, 3).map((post) => (
                <Flex
                  key={post.id}
                  align="center"
                  gap="10px"
                  p="8px 10px"
                  bg="gray.50"
                  borderRadius="9px"
                  _hover={{ bg: P_LIGHT }}
                  transition="all 0.15s"
                  cursor="pointer"
                >
                  {post.img && (
                    <Box
                      w="36px"
                      h="28px"
                      borderRadius="6px"
                      overflow="hidden"
                      flexShrink="0"
                    >
                      <Image
                        src={post.img}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                      />
                    </Box>
                  )}
                  <Box flex="1" minW="0">
                    <Text
                      fontSize="11px"
                      fontWeight="600"
                      color="gray.700"
                      lineClamp={1}
                    >
                      {post.listingRef}
                    </Text>
                    <Text fontSize="10px" color="gray.400">
                      {post.postedAt}
                    </Text>
                  </Box>
                  <VStack gap="0" align="flex-end" flexShrink="0">
                    <HStack gap="4px">
                      <Box color="gray.400">
                        <EyeIco />
                      </Box>
                      <Text fontSize="10px" color="gray.500">
                        {post.reach.toLocaleString()}
                      </Text>
                    </HStack>
                    <Text fontSize="10px" color={P} fontWeight="600">
                      {post.enquiries} enquiries
                    </Text>
                  </VStack>
                </Flex>
              ))}
            </VStack>
          )}

          {/* Auto-post info */}
          <Box
            mt="12px"
            p="9px 12px"
            borderRadius="9px"
            bg={platform.autoPost ? '#F0FFF4' : 'gray.50'}
            border="1px solid"
            borderColor={platform.autoPost ? '#C6F6D5' : 'gray.100'}
          >
            <Text
              fontSize="11px"
              fontWeight="600"
              color={platform.autoPost ? '#276749' : 'gray.500'}
            >
              {platform.autoPost
                ? '✅ Auto-posting enabled — new listings post here automatically'
                : '⚪ Auto-posting off — post manually from Broadcast Manager'}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ManageSocials(): JSX.Element {
  const [platforms, setPlatforms] = useState<PlatformAccount[]>(PLATFORMS);
  const [posts] = useState<Post[]>(POSTS);
  const [filterPlat, setFilterPlat] = useState<PlatformId | 'All'>('All');
  const [filterStatus, setFilterStatus] = useState<Post['status'] | 'All'>(
    'All',
  );
  const [search, setSearch] = useState('');

  const toggleAutoPost = (id: PlatformId) =>
    setPlatforms((p) =>
      p.map((x) => (x.id === id ? { ...x, autoPost: !x.autoPost } : x)),
    );
  const toggleConnect = (id: PlatformId) =>
    setPlatforms((p) =>
      p.map((x) => (x.id === id ? { ...x, connected: !x.connected } : x)),
    );

  const filteredPosts = posts.filter((p) => {
    if (filterPlat !== 'All' && p.platform !== filterPlat) return false;
    if (filterStatus !== 'All' && p.status !== filterStatus) return false;
    if (search && !p.listingRef.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const totalReach = posts
    .filter((p) => p.status === 'Live')
    .reduce((a, p) => a + p.reach, 0);
  const totalEnquiries = posts
    .filter((p) => p.status === 'Live')
    .reduce((a, p) => a + p.enquiries, 0);
  const totalLeads = posts
    .filter((p) => p.status === 'Live')
    .reduce((a, p) => a + p.leads, 0);
  const connected = platforms.filter((p) => p.connected).length;

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
            Drivia / Socials
          </Text>
          <Heading fontSize="22px" fontWeight="800" color="gray.800" mt="1px">
            Manage Socials
          </Heading>
        </Box>
        <HStack gap="10px">
          <Box position="relative" w="220px">
            <Box
              position="absolute"
              left="10px"
              top="50%"
              transform="translateY(-50%)"
              color="gray.400"
              zIndex="1"
            >
              <SearchIco />
            </Box>
            <Input
              pl="34px"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts…"
              bg="gray.50"
              border="none"
              borderRadius="12px"
              fontSize="13px"
              h="36px"
              _placeholder={{ color: 'gray.400' }}
              _focus={{ bg: 'gray.100', boxShadow: 'none' }}
            />
          </Box>
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
        {/* STAT CARDS */}
        <Grid templateColumns="repeat(4,1fr)" gap="14px" mb="22px">
          {[
            {
              label: 'Platforms Connected',
              value: `${connected}/4`,
              color: P,
              icon: '🔗',
            },
            {
              label: 'Total Post Reach',
              value: `${(totalReach / 1000).toFixed(1)}K`,
              color: '#2C7A7B',
              icon: '📡',
            },
            {
              label: 'Enquiries from Posts',
              value: totalEnquiries,
              color: '#276749',
              icon: '💬',
            },
            {
              label: 'Leads Generated',
              value: totalLeads,
              color: '#805AD5',
              icon: '🎯',
            },
          ].map((s) => (
            <Box
              key={s.label}
              bg={WHITE}
              borderRadius="14px"
              p="16px 20px"
              boxShadow="0 2px 10px rgba(0,0,0,0.05)"
            >
              <HStack gap="10px">
                <Box
                  w="36px"
                  h="36px"
                  borderRadius="10px"
                  bg={`${s.color}15`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="16px"
                  flexShrink="0"
                >
                  {s.icon}
                </Box>
                <Box>
                  <Text fontSize="10px" color="gray.400" fontWeight="600">
                    {s.label}
                  </Text>
                  <Text fontSize="18px" fontWeight="800" color="gray.800">
                    {s.value}
                  </Text>
                </Box>
              </HStack>
            </Box>
          ))}
        </Grid>

        {/* PLATFORM CARDS */}
        <Text fontSize="14px" fontWeight="800" color="gray.700" mb="14px">
          Platform Accounts
        </Text>
        <Grid templateColumns="repeat(2,1fr)" gap="16px" mb="28px">
          {platforms.map((pl) => (
            <PlatformCard
              key={pl.id}
              platform={pl}
              onToggleAutoPost={() => toggleAutoPost(pl.id)}
              onToggleConnect={() => toggleConnect(pl.id)}
            />
          ))}
        </Grid>

        {/* ALL POSTS TABLE */}
        <Box
          bg={WHITE}
          borderRadius="16px"
          overflow="hidden"
          boxShadow="0 2px 10px rgba(0,0,0,0.05)"
        >
          <Flex
            align="center"
            justify="space-between"
            px="22px"
            py="16px"
            borderBottom="1px solid"
            borderColor="gray.100"
          >
            <Text fontWeight="800" fontSize="15px" color="gray.800">
              All Posts
            </Text>
            <HStack gap="8px">
              {/* Platform filter */}
              <HStack gap="5px">
                <Box
                  as="button"
                  onClick={() => setFilterPlat('All')}
                  px="9px"
                  py="4px"
                  borderRadius="7px"
                  fontSize="11px"
                  fontWeight="600"
                  bg={filterPlat === 'All' ? P : WHITE}
                  color={filterPlat === 'All' ? 'white' : 'gray.400'}
                  border="1.5px solid"
                  borderColor={filterPlat === 'All' ? P : 'gray.200'}
                  transition="all 0.15s"
                >
                  All
                </Box>
                {(['whatsapp', 'facebook', 'instagram'] as PlatformId[]).map(
                  (pid) => {
                    const plat = platforms.find((p) => p.id === pid)!;
                    return (
                      <Box
                        key={pid}
                        as="button"
                        onClick={() => setFilterPlat(pid)}
                        w="28px"
                        h="28px"
                        borderRadius="7px"
                        bg={filterPlat === pid ? plat.color : WHITE}
                        border="1.5px solid"
                        borderColor={
                          filterPlat === pid ? plat.color : 'gray.200'
                        }
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        transition="all 0.15s"
                      >
                        <Text
                          fontSize="10px"
                          fontWeight="900"
                          color={filterPlat === pid ? 'white' : 'gray.400'}
                        >
                          {plat.shortLabel}
                        </Text>
                      </Box>
                    );
                  },
                )}
              </HStack>
              <Box w="1px" h="28px" bg="gray.100" />
              {/* Status filter */}
              {(['All', 'Live', 'Draft', 'Scheduled', 'Archived'] as const).map(
                (s) => (
                  <Box
                    key={s}
                    as="button"
                    onClick={() => setFilterStatus(s)}
                    px="9px"
                    py="4px"
                    borderRadius="7px"
                    fontSize="11px"
                    fontWeight="600"
                    bg={filterStatus === s ? P : WHITE}
                    color={filterStatus === s ? 'white' : 'gray.400'}
                    border="1.5px solid"
                    borderColor={filterStatus === s ? P : 'gray.200'}
                    transition="all 0.15s"
                  >
                    {s}
                  </Box>
                ),
              )}
            </HStack>
          </Flex>

          {/* Table */}
          <Box>
            {/* Header */}
            <Grid
              templateColumns="2.5fr 1fr 0.8fr 0.8fr 0.8fr 0.7fr 1fr"
              px="22px"
              py="9px"
              borderBottom="1px solid"
              borderColor="gray.50"
            >
              {[
                'Post / Listing',
                'Platform',
                'Status',
                'Reach',
                'Enquiries',
                'Leads',
                'Posted',
              ].map((h) => (
                <Text
                  key={h}
                  fontSize="10px"
                  color="gray.400"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.4px"
                >
                  {h}
                </Text>
              ))}
            </Grid>
            {filteredPosts.map((post, i) => {
              const plat = platforms.find((p) => p.id === post.platform)!;
              const stt = STATUS_CFG[post.status];
              return (
                <Grid
                  key={post.id}
                  templateColumns="2.5fr 1fr 0.8fr 0.8fr 0.8fr 0.7fr 1fr"
                  px="22px"
                  py="12px"
                  alignItems="center"
                  borderBottom={
                    i < filteredPosts.length - 1 ? '1px solid' : 'none'
                  }
                  borderColor="gray.50"
                  _hover={{ bg: 'gray.50' }}
                  transition="background 0.1s"
                >
                  {/* Post */}
                  <HStack gap="10px">
                    {post.img ? (
                      <Box
                        w="40px"
                        h="30px"
                        borderRadius="7px"
                        overflow="hidden"
                        flexShrink="0"
                      >
                        <Image
                          src={post.img}
                          w="100%"
                          h="100%"
                          objectFit="cover"
                        />
                      </Box>
                    ) : (
                      <Box
                        w="40px"
                        h="30px"
                        borderRadius="7px"
                        bg="gray.100"
                        flexShrink="0"
                      />
                    )}
                    <Box>
                      <Text fontSize="12px" fontWeight="600" color="gray.800">
                        {post.listingRef}
                      </Text>
                      <Text
                        fontSize="10px"
                        color="gray.400"
                        lineClamp={1}
                        maxW="200px"
                      >
                        {post.caption.split('\n')[0]}
                      </Text>
                    </Box>
                  </HStack>
                  {/* Platform */}
                  <HStack gap="6px">
                    <Box
                      w="20px"
                      h="20px"
                      borderRadius="5px"
                      bg={plat.color}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize="9px" color="white" fontWeight="900">
                        {plat.shortLabel}
                      </Text>
                    </Box>
                    <Text fontSize="11px" color="gray.600">
                      {plat.name}
                    </Text>
                  </HStack>
                  {/* Status */}
                  <Badge
                    bg={stt.bg}
                    color={stt.color}
                    borderRadius="5px"
                    fontSize="9px"
                    px="7px"
                    py="2px"
                    fontWeight="700"
                  >
                    {post.status}
                  </Badge>
                  {/* Reach */}
                  <Text fontSize="12px" color="gray.700" fontWeight="600">
                    {post.reach > 0 ? post.reach.toLocaleString() : '—'}
                  </Text>
                  {/* Enquiries */}
                  <Text
                    fontSize="12px"
                    color={post.enquiries > 0 ? P : 'gray.400'}
                    fontWeight={post.enquiries > 0 ? '700' : '400'}
                  >
                    {post.enquiries > 0 ? post.enquiries : '—'}
                  </Text>
                  {/* Leads */}
                  <Text
                    fontSize="12px"
                    color={post.leads > 0 ? '#276749' : 'gray.400'}
                    fontWeight={post.leads > 0 ? '700' : '400'}
                  >
                    {post.leads > 0 ? post.leads : '—'}
                  </Text>
                  {/* Posted */}
                  <HStack gap="6px">
                    <Text fontSize="11px" color="gray.400">
                      {post.postedAt || '—'}
                    </Text>
                    <HStack gap="4px" ml="auto">
                      <Box
                        as="button"
                        w="24px"
                        h="24px"
                        borderRadius="6px"
                        color="gray.400"
                        bg="gray.100"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        _hover={{ bg: 'gray.200' }}
                      >
                        <EditIco />
                      </Box>
                      <Box
                        as="button"
                        w="24px"
                        h="24px"
                        borderRadius="6px"
                        color="red.400"
                        bg="red.50"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        _hover={{ bg: 'red.100' }}
                      >
                        <TrashIco />
                      </Box>
                    </HStack>
                  </HStack>
                </Grid>
              );
            })}
          </Box>
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
            {filteredPosts.length} posts shown
          </Text>
          <Text fontSize="11px" color="gray.400">
            Drivia Dealer Tool © 2024
          </Text>
        </Flex>
      </Box>
    </AppLayout>
  );
}

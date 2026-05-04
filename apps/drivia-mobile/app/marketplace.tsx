import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Linking,
  ScrollView,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { C, R } from '../constants/theme';
import { Chip, SectionHeader } from '../components/ui';
import type { CarListing, Condition, PlatformId } from '../constants/types';
import { Ionicons } from '@expo/vector-icons';
import { PLATFORMS } from './(tabs)/broadcast';
// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { height: SCREEN_H, width: SCREEN_W } = Dimensions.get('window');

// ─── DATA ─────────────────────────────────────────────────────────────────────
const LISTINGS: CarListing[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2021,
    price: 16500000,
    location: 'Lekki, Lagos',
    condition: 'Tokunbo' as Condition,
    inspection: { score: 80, status: 'Inspected' },
    dealer: 'Lagos Auto Hub',
    dealerRating: 4.8,
    color: 'Silver',
    mileage: 45000,
    status: 'Available',
    transmission: 'Automatic',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
    ],
    fuelType: 'Petrol',
    description: '',
    phone: '08012345678',
    postedAt: '2:54',
  },
  {
    id: '2',
    make: 'Honda',
    model: 'CR-V',
    year: 2021,
    price: 16500000,
    location: 'Lekki, Lagos',
    condition: 'Tokunbo' as Condition,
    inspection: { score: 80, status: 'Inspected' },
    dealer: 'Lagos Auto Hub',
    dealerRating: 4.8,
    color: 'White',
    mileage: 38000,
    status: 'Available',
    transmission: 'Automatic',
    images: [
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80',
    ],
    fuelType: 'Petrol',
    description: '',
    phone: '08012345678',
    postedAt: '3:10',
  },
  {
    id: '3',
    make: 'Lexus',
    model: 'RX 350',
    year: 2021,
    price: 28500000,
    location: 'VI, Lagos',
    condition: 'Tokunbo' as Condition,
    inspection: { score: 92, status: 'Inspected' },
    dealer: 'Prime Motors',
    dealerRating: 4.8,
    color: 'Black',
    mileage: 29000,
    status: 'Available',
    transmission: 'Automatic',
    images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    ],
    fuelType: 'Petrol',
    description: '',
    phone: '08012345678',
    postedAt: '4:00',
  },
  {
    id: '4',
    make: 'BMW',
    model: 'X4',
    year: 2021,
    price: 34000000,
    location: 'Abuja',
    condition: 'Brand New' as Condition,
    inspection: { score: 98, status: 'Inspected' },
    dealer: 'Abuja Auto Palace',
    dealerRating: 4.8,
    color: 'Blue',
    mileage: 0,
    status: 'Available',
    transmission: 'Automatic',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    ],
    fuelType: 'Petrol',
    description: '',
    phone: '08012345678',
    postedAt: '5:20',
  },
  {
    id: '5',
    make: 'Mitsubishi',
    model: 'Outlander',
    year: 2020,
    price: 12000000,
    location: 'Ikeja, Lagos',
    condition: 'Nigerian Used' as Condition,
    inspection: { score: 65, status: 'Inspected' },
    dealer: 'City Cars NG',
    dealerRating: 4.8,
    color: 'Red',
    mileage: 72000,
    status: 'Available',
    transmission: 'Automatic',
    images: [
      'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=800&q=80',
    ],
    fuelType: 'Petrol',
    description: '',
    phone: '08012345678',
    postedAt: '6:00',
  },
  {
    id: '6',
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    price: 14500000,
    location: 'PH, Rivers',
    condition: 'Tokunbo' as Condition,
    inspection: { score: 85, status: 'Inspected' },
    dealer: 'PH Auto Hub',
    dealerRating: 4.8,
    color: 'White',
    mileage: 21000,
    status: 'Available',
    transmission: 'Automatic',
    images: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80',
    ],
    fuelType: 'Petrol',
    description: '',
    phone: '08012345678',
    postedAt: '7:30',
  },
  {
    id: '7',
    make: 'Mercedes',
    model: 'C300',
    year: 2021,
    price: 42000000,
    location: 'Ikoyi, Lagos',
    condition: 'Tokunbo' as Condition,
    inspection: { score: 89, status: 'Inspected' },
    dealer: 'Luxe Rides',
    dealerRating: 4.8,
    color: 'Silver',
    mileage: 31000,
    status: 'Available',
    transmission: 'Automatic',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    ],
    fuelType: 'Petrol',
    description: '',
    phone: '08012345678',
    postedAt: '8:00',
  },
];

const DEALERS = [
  { rank: 1, name: 'Lagos Auto Hub', sold: 312, rating: 4.8, badge: '🥇' },
  { rank: 2, name: 'Abuja Auto Palace', sold: 198, rating: 4.9, badge: '🥈' },
  { rank: 3, name: 'Prime Motors', sold: 156, rating: 4.6, badge: '🥉' },
];

const CONDITION_COLOR: Record<Condition, { text: string; bg: string }> = {
  'Brand New': { text: C.pDark, bg: C.bg },
  Tokunbo: { text: C.green, bg: C.greenBg },
  'Nigerian Used': { text: C.red, bg: C.redBg },
};

type FilterOpt =
  | 'All'
  | 'Inspected'
  | 'Tokunbo'
  | 'Brand New'
  | 'Nigerian Used';
type SortOpt = 'Newest' | 'Price ↑' | 'Price ↓' | 'Top Rated';

function fmt(n: number) {
  return '₦' + (n / 1_000_000).toFixed(1) + 'M';
}
function km(m: number) {
  return m === 0 ? '0 km' : (m / 1000).toFixed(0) + 'k km';
}

// ─── STICKY HEADER OVERLAY ────────────────────────────────────────────────────
function StickyHeader({
  search,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
  current,
  total,
}: {
  search: string;
  setSearch: (v: string) => void;
  filter: FilterOpt;
  setFilter: (v: FilterOpt) => void;
  sort: SortOpt;
  setSort: (v: SortOpt) => void;
  current: number;
  total: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        240,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity,
      ),
    );
    setExpanded((prev) => !prev);
  };

  return (
    // pointerEvents="box-none" lets taps pass through the transparent wrapper
    // to the FlatList cards below, while child Views still capture their own taps.
    <View style={s.headerWrapper} pointerEvents="box-none">
      {/* ── Collapsed state: just a floating ⓘ pill ── */}
      {!expanded && (
        <TouchableOpacity
          style={s.searchPill}
          onPress={toggle}
          activeOpacity={0.8}
        >
          <Ionicons name="search" size={20} color={C.white} />
        </TouchableOpacity>
      )}

      {/* ── Expanded state: full header panel ── */}
      {expanded && (
        <View style={s.stickyHeader}>
          {/* Title row + close button */}
          <View style={s.titleRow}>
            <View>
              <Text style={s.headerSub}>Find your next ride 🚗</Text>
            </View>
            <View style={s.titleRight}>
              <View style={s.counterBadge}>
                <Text style={s.counterTxt}>
                  {current} / {total}
                </Text>
              </View>
              {/* Close / collapse button */}
              <TouchableOpacity
                onPress={toggle}
                style={s.closeBtn}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="close"
                  size={18}
                  color="rgba(255,255,255,0.9)"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search bar */}
          <View style={s.searchRow}>
            <Ionicons name="search" size={16} color="rgba(255,255,255,0.6)" />
            <TextInput
              style={s.searchInput}
              placeholder="Make, model, location..."
              placeholderTextColor="rgba(255,255,255,0.45)"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* Filter chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.chipRow}
            keyboardShouldPersistTaps="handled"
          >
            {(
              [
                'All',
                'Inspected',
                'Tokunbo',
                'Brand New',
                'Nigerian Used',
              ] as FilterOpt[]
            ).map((f) => (
              <Chip
                key={f}
                label={f}
                selected={filter === f}
                onPress={() => setFilter(f)}
              />
            ))}
          </ScrollView>

          {/* Sort row */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.sortRow}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={s.sortLbl}>Sort: </Text>
            {(['Newest', 'Price ↑', 'Price ↓', 'Top Rated'] as SortOpt[]).map(
              (o) => (
                <TouchableOpacity
                  key={o}
                  onPress={() => setSort(o)}
                  style={[s.sortChip, sort === o && s.sortChipActive]}
                >
                  <Text
                    style={[s.sortChipTxt, sort === o && s.sortChipTxtActive]}
                  >
                    {o}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </ScrollView>

          {/* Top Dealers */}
          <SectionHeader title="Top Dealers" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.dealersRow}
            keyboardShouldPersistTaps="handled"
          >
            {DEALERS.map((d) => (
              <View key={d.rank} style={s.dealerCard}>
                <Text style={{ fontSize: 22 }}>{d.badge}</Text>
                <Text style={s.dealerName} numberOfLines={1}>
                  {d.name}
                </Text>
                <Text style={s.dealerSold}>{d.sold} sold</Text>
                <Text style={s.dealerRatingTxt}>
                  {/**create a star rating hook*/}⭐ {d.rating}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

// ─── FYP CARD ─────────────────────────────────────────────────────────────────
// ─── EXTRA PLACEHOLDER IMAGES (pads every listing to ≥ 4 slides) ─────────────
const EXTRA_IMAGES = [
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
  'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80',
];

function getSlides(images: string[]): string[] {
  const base = images.length ? images : [EXTRA_IMAGES[0]];
  const slides = [...base];
  let i = 0;
  while (slides.length < 4) {
    slides.push(EXTRA_IMAGES[i % EXTRA_IMAGES.length]);
    i++;
  }
  return slides;
}

// ─── FYP CARD ─────────────────────────────────────────────────────────────────
function FYPCard({
  item,
  saved,
  onSave,
}: {
  item: CarListing;
  saved: boolean;
  onSave: () => void;
}) {
  const cond = CONDITION_COLOR[item.condition];
  const slides = getSlides(item.images);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  return (
    <View style={s.card}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        style={StyleSheet.absoluteFill}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_W);
          setActiveSlide(index);
        }}
      >
        {slides.map((uri, idx) => (
          <View
            key={idx}
            style={{
              width: SCREEN_W,
              height: SCREEN_H,
              backgroundColor: '#000',
            }}
          >
            <Image
              source={{ uri }}
              style={StyleSheet.absoluteFill}
              blurRadius={18}
              resizeMode="cover"
            />
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: 'rgba(0,0,0,0.45)' },
              ]}
            />
            <Image
              source={{ uri }}
              style={{ width: SCREEN_W, height: SCREEN_H }}
              resizeMode="contain"
            />
          </View>
        ))}
      </ScrollView>

      {/* Dot indicators */}
      <View style={s.dotsRow}>
        {slides.map((_, idx) => (
          <View key={idx} style={[s.dot, idx === activeSlide && s.dotActive]} />
        ))}
      </View>

      {/* Condition pill */}
      <View style={s.topLeft}>
        <View style={[s.condPill, { backgroundColor: cond.bg }]}>
          <Text style={[s.condPillTxt, { color: cond.text }]}>
            {item.condition}
          </Text>
        </View>
      </View>

      {/* Inspection score */}
      {item.inspection?.status === 'Inspected' && (
        <View style={s.topRight}>
          <View style={s.scorePill}>
            <View style={s.greenDot} />
            <Text style={s.scoreTxt}>{item.inspection.score}/100</Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={s.saveBtn} onPress={onSave}>
        {saved ? (
          <Ionicons name="heart" size={30} color="red" />
        ) : (
          <Ionicons name="heart-outline" size={30} color="white" />
        )}
      </TouchableOpacity>

      {/* Bottom info panel */}
      <TouchableOpacity
        onLongPress={() => router.push(`/listing/${item.id}`)}
        style={s.overlayBottom}
      >
        <Text style={s.price}>{fmt(item.price)}</Text>
        <Text style={s.carName}>
          {item.year} {item.make} {item.model}
        </Text>
        <View style={s.metaRow}>
          <Text style={s.metaTxt}>📍 {item.location}</Text>
          <View style={s.metaDot} />
          <Text style={s.metaTxt}>🛣 {km(item.mileage)}</Text>
          <View style={s.metaDot} />
          <Text style={s.metaTxt}>⛽ {item.fuelType}</Text>
        </View>
        <View style={s.dealerInfoRow}>
          <View style={s.dealerAvatar}>
            <Text style={s.dealerAvatarTxt}>
              {item.dealer
                ?.split(' ')
                .map((w) => w[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.dealerNameTxt}>{item.dealer}</Text>
            <Text style={s.dealerRatingRow}>⭐ {item.dealerRating}</Text>
          </View>
          <TouchableOpacity
            style={s.btnCall}
            onPress={(e) => {
              e.stopPropagation();
              Linking.openURL(`tel:${item.phone}`);
            }}
          >
            <Ionicons name="call" size={13} color="#334155" />
            <Text style={s.btnCallTxt}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.btnWa}
            onPress={(e) => {
              e.stopPropagation();
              Linking.openURL(`https://wa.me/234${item.phone}`);
            }}
          >
            <Ionicons name="logo-whatsapp" size={13} color="#16a34a" />
            <Text style={s.btnWaTxt}>Chat</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}
// ─── SCREEN ───────────────────────────────────────────────────────────────────
export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterOpt>('All');
  const [sort, setSort] = useState<SortOpt>('Newest');
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [current, setCurrent] = useState(1);
  const [compose, setCompose] = useState(false);
  const [message, setMessage] = useState('');
  const [selPlats, setSelPlats] = useState<PlatformId[]>(['whatsapp']);
  const togglePlat = (id: PlatformId) =>
    setSelPlats((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );

  const toggleSave = (id: string) => setSaved((p) => ({ ...p, [id]: !p[id] }));

  const filtered = LISTINGS.filter((c) => {
    const q = `${c.make} ${c.model} ${c.year} ${c.location}`.toLowerCase();
    return (
      q.includes(search.toLowerCase()) &&
      (filter === 'All'
        ? true
        : filter === 'Inspected'
          ? !!c.inspection
          : filter === c.condition)
    );
  }).sort((a, b) =>
    sort === 'Price ↑'
      ? a.price - b.price
      : sort === 'Price ↓'
        ? b.price - a.price
        : sort === 'Top Rated'
          ? (b.inspection?.score || 0) - (a.inspection?.score || 0)
          : 0,
  );

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.y / SCREEN_H) + 1;
    setCurrent(Math.min(idx, filtered.length));
  };

  return (
    // Use plain View (not SafeAreaView) as root so the FlatList can go truly
    // full-screen edge-to-edge, and the sticky header respects safe area via paddingTop.
    <View style={s.safe}>
      {/* Car feed — fills the screen, snaps per card */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FYPCard
            saved={!!saved[item.id]}
            onSave={() => toggleSave(item.id)}
            item={item}
          />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_H}
        snapToAlignment="start"
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: SCREEN_H,
          offset: SCREEN_H * index,
          index,
        })}
      />

      {/* Sticky transparent header — rendered last so it sits on top (higher z-index) */}
      <StickyHeader
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
        current={current}
        total={filtered.length}
      />
      <Text style={s.headerTitle}>Marketplace</Text>
      <TouchableOpacity style={s.btnAdd} onPress={() => setCompose(true)}>
        <Ionicons name="add" size={30} />
      </TouchableOpacity>
      <Modal
        visible={compose}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setCompose(false)}
      >
        <View style={s.modal}>
          <View style={s.handle} />
          <View style={s.mHeader}>
            <Text style={s.mTitle}>New Broadcast</Text>
            <TouchableOpacity onPress={() => setCompose(false)}>
              <Text style={s.mClose}>X</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{ paddingHorizontal: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={s.fieldLabel}>Send to</Text>
            <View style={s.platRow}>
              {PLATFORMS.map((pl) => {
                const sel = selPlats.includes(pl.id);
                return (
                  <TouchableOpacity
                    key={pl.id}
                    onPress={() => togglePlat(pl.id)}
                    style={[
                      s.platBtn,
                      sel && {
                        borderColor: pl.color,
                        backgroundColor: pl.color + '18',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        s.platBtnLetter,
                        { color: sel ? pl.color : C.ink3 },
                      ]}
                    >
                      {pl.letter}
                    </Text>
                    <Text
                      style={[
                        s.platBtnName,
                        { color: sel ? pl.color : C.ink3 },
                      ]}
                    >
                      {pl.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={s.fieldLabel}>Message</Text>
            <TextInput
              style={s.msgBox}
              placeholder="Type your broadcast message..."
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
            {selPlats.includes('whatsapp') && message.length > 0 && (
              <View style={s.preview}>
                <Text style={s.previewLabel}>WhatsApp Preview</Text>
                <View style={s.waBubble}>
                  <Text style={s.waBubbleText}>{message}</Text>
                  <Text style={s.waBubbleTime}>10:42 checkcheck</Text>
                </View>
              </View>
            )}
            <Text style={s.fieldLabel}>Audience</Text>
            <View style={s.audienceRow}>
              {['All contacts', 'SUV buyers', 'Budget buyers', 'Luxury'].map(
                (a) => (
                  <TouchableOpacity key={a} style={s.audienceChip}>
                    <Text style={s.audienceChipText}>{a}</Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
            <View style={s.mActions}>
              <TouchableOpacity
                style={[s.sendBtn, { flex: 1, backgroundColor: C.p }]}
                onPress={() => setCompose(false)}
              >
                <Text style={s.sendBtnText}>Send Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.sendBtn, { backgroundColor: C.pLight }]}
                onPress={() => setCompose(false)}
              >
                <Text style={[s.sendBtnText, { color: C.p }]}>Schedule</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 40 }} />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const HEADER_TOP_PADDING = 52; // adjust to match device safe area top inset

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },

  // Full-screen car card
  card: { width: SCREEN_W, height: SCREEN_H, overflow: 'hidden' },
  image: { flex: 1 },

  // ── Header wrapper — full overlay, transparent, passes taps through
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // No background here — completely see-through
  },

  arrowLeft: {
    position: 'absolute',
    left: 12,
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 99,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    zIndex: 10,
  },
  arrowRight: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 99,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    zIndex: 10,
  },
  // Floating ⓘ pill shown when header is collapsed
  searchPill: {
    position: 'absolute',
    top: HEADER_TOP_PADDING - 10,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  // Full expanded header panel
  stickyHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.753)',
    paddingTop: HEADER_TOP_PADDING,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveBtn: {
    width: 30,
    position: 'absolute',
    bottom: 215,
    right: 25,
    height: 30,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    position: 'absolute',
    top: HEADER_TOP_PADDING - 10,
    left: 16,
    fontSize: 26,
    borderRadius: 10,
    padding: 4,
    fontWeight: '900',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.158)',
    alignSelf: 'flex-start',
    letterSpacing: 0.2,
  },

  btnAdd: {
    position: 'absolute',
    bottom: 250.9,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.781)',
    borderRadius: 99,
    padding: 8,
  },

  headerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  counterBadge: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignSelf: 'center',
  },
  counterTxt: { fontSize: 12, fontWeight: '700', color: '#fff' },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: R.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 14,
    gap: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 42,
    fontSize: 14,
    color: '#fff',
  },

  chipRow: { gap: 8, paddingBottom: 10, alignItems: 'center' },

  sortRow: { gap: 8, paddingBottom: 10, alignItems: 'center' },
  sortLbl: { fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.55)' },
  sortChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: R.full,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  sortChipActive: { backgroundColor: C.p, borderColor: C.p },
  sortChipTxt: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
  },
  sortChipTxtActive: { color: '#fff' },

  dealersRow: { gap: 12, paddingVertical: 6 },
  dealerCard: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: R.md,
    padding: 10,
    alignItems: 'center',
    width: 110,
    gap: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  dealerName: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  dealerSold: { fontSize: 10, color: 'rgba(255,255,255,0.55)' },
  dealerRatingTxt: { fontSize: 10, fontWeight: '700', color: '#fbbf24' },

  // ── Car card overlays ────────────────────────────────────────────────────────
  // topLeft / topRight are positioned in the middle of the card, safely
  // below the sticky header regardless of header height.
  topLeft: { position: 'absolute', top: SCREEN_H * 0.72, left: 16 },
  topRight: { position: 'absolute', top: SCREEN_H * 0.1, right: 16 },

  condPill: { borderRadius: 99, paddingHorizontal: 10, paddingVertical: 4 },
  condPillTxt: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  scorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  greenDot: {
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: '#22c55e',
  },
  scoreTxt: { fontSize: 11, fontWeight: '700', color: '#1e293b' },

  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.58)',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 36,
    gap: 6,
  },
  price: { fontSize: 28, fontWeight: '900', color: '#fff', letterSpacing: 0.3 },
  carName: { fontSize: 19, fontWeight: '800', color: '#fff', marginBottom: 2 },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  metaTxt: { fontSize: 12, color: 'rgba(255,255,255,0.82)', fontWeight: '500' },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },

  dealerInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dealerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 99,
    backgroundColor: '#fbbf24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dealerAvatarTxt: { fontSize: 11, fontWeight: '800', color: '#fff' },
  dealerNameTxt: { fontSize: 12, fontWeight: '700', color: '#fff' },
  dealerRatingRow: { fontSize: 11, color: '#fbbf24', fontWeight: '600' },

  btnCall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  btnCallTxt: { fontSize: 12, fontWeight: '700', color: '#334155' },
  btnWa: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#dcfce7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  btnWaTxt: { fontSize: 12, fontWeight: '700', color: '#16a34a' },

  // Dot indicator row — sits just above the bottom overlay
  dotsRow: {
    position: 'absolute',
    bottom: 210, // tweak to float just above overlayBottom
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotActive: {
    width: 18, // pill-shaped active dot
    backgroundColor: '#fff',
  },

  // "2 / 4" counter badge — top-centre
  slideCounter: {
    position: 'absolute',
    top: SCREEN_H * 0.1,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  slideCounterTxt: { fontSize: 11, fontWeight: '700', color: '#fff' },

  modal: {
    flex: 1,
    backgroundColor: C.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: C.line,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
  },
  mHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  mTitle: { fontSize: 18, fontWeight: '800', color: C.ink },
  mClose: { fontSize: 16, color: C.ink3, fontWeight: '700' },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: C.ink2,
    marginBottom: 8,
    marginTop: 16,
  },
  platRow: { flexDirection: 'row', gap: 8 },
  platBtn: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: C.line,
    padding: 10,
    alignItems: 'center',
    gap: 4,
    backgroundColor: C.white,
  },
  platBtnLetter: { fontSize: 15, fontWeight: '900' },
  platBtnName: { fontSize: 10, fontWeight: '700' },
  msgBox: {
    backgroundColor: C.bg,
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: C.ink,
    minHeight: 110,
    borderWidth: 1.5,
    borderColor: C.line,
  },
  preview: {
    marginTop: 14,
    backgroundColor: '#E3F2E1',
    borderRadius: 12,
    padding: 12,
  },
  previewLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: C.green,
    marginBottom: 8,
  },
  waBubble: {
    backgroundColor: '#DCF8C6',
    borderRadius: 12,
    borderBottomRightRadius: 3,
    padding: 10,
  },
  waBubbleText: { fontSize: 13, color: '#1C1C1C', lineHeight: 19 },
  waBubbleTime: {
    fontSize: 10,
    color: '#667781',
    textAlign: 'right',
    marginTop: 4,
  },
  audienceRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  audienceChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: C.pLight,
  },
  audienceChipText: { fontSize: 12, fontWeight: '600', color: C.p },
  mActions: { flexDirection: 'row', gap: 10, marginTop: 24 },
  sendBtn: {
    height: 50,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sendBtnText: { fontSize: 14, fontWeight: '700', color: C.white },
});

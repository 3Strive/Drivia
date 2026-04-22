import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Share,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { C, S, R } from '../../constants/theme';
import {
  Badge,
  Card,
  SectionHeader,
  Divider,
  RowItem,
} from '../../components/ui';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
const LISTINGS: Record<string, any> = {
  '1': {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2021,
    price: 16500000,
    mileage: 45000,
    condition: 'Tokunbo',
    status: 'Available',
    location: 'Lekki Phase 1, Lagos',
    color: 'Silver',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    dealer: 'Lagos Auto Hub',
    dealerPhone: '08012345678',
    dealerRating: 4.8,
    dealerSold: 312,
    images: [
      'https://res.cloudinary.com/dysbhlksu/image/upload/v1753365728/nextjs_uploads/mqxvblvljvj0vg44h8ov.jpg',
      'https://res.cloudinary.com/dysbhlksu/image/upload/v1753365728/nextjs_uploads/mqxvblvljvj0vg44h8ov.jpg',
    ],
    description:
      'Very clean 2021 Toyota Camry XSE. Full option — reverse camera, sunroof. No accident history. Imported from Canada.',
    postedAt: 'November 1, 2024',
    inspected: true,
    inspectionScore: 88,
    inspectionBreakdown: [
      { label: 'Engine', score: 9 },
      { label: 'Exterior', score: 8 },
      { label: 'Interior', score: 9 },
      { label: 'Transmission', score: 9 },
      { label: 'Electronics', score: 9 },
      { label: 'Suspension', score: 8 },
    ],
    inspectorName: 'AutoCheck Nigeria',
    inspectorDate: 'Oct 28, 2024',
    gradient: C.p,
  },
  '2': {
    id: '2',
    make: 'Honda',
    model: 'CR-V',
    year: 2020,
    price: 20500000,
    mileage: 38000,
    condition: 'Tokunbo',
    status: 'Reserved',
    location: 'Ikeja, Lagos',
    color: 'Black',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    dealer: 'Prime Motors',
    dealerPhone: '08023456789',
    dealerRating: 4.6,
    dealerSold: 198,
    images: [],
    description:
      '2020 Honda CR-V EX. Clean title, full service history. Comes with original manuals.',
    postedAt: 'September 15, 2024',
    inspected: true,
    inspectionScore: 92,
    inspectionBreakdown: [
      { label: 'Engine', score: 10 },
      { label: 'Exterior', score: 9 },
      { label: 'Interior', score: 9 },
      { label: 'Transmission', score: 9 },
      { label: 'Electronics', score: 9 },
      { label: 'Suspension', score: 9 },
    ],
    inspectorName: 'AutoCheck Nigeria',
    inspectorDate: 'Sep 10, 2024',
    gradient: '#f093fb',
  },
};

function fmt(n: number) {
  return '₦' + (n / 1_000_000).toFixed(1) + 'M';
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  const color = score >= 9 ? C.green : score >= 7 ? C.gold : C.red;
  return (
    <View style={s.scoreRow}>
      <Text style={s.scoreLabel}>{label}</Text>
      <View style={s.scoreBarWrap}>
        <View
          style={[
            s.scoreBar,
            { width: `${score * 10}%` as any, backgroundColor: color },
          ]}
        />
      </View>
      <Text style={[s.scoreVal, { color }]}>{score}/10</Text>
    </View>
  );
}

// ─── SCREEN ───────────────────────────────────────────────────────────────────
export default function ListingDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const listing = LISTINGS[id ?? '1'] ?? LISTINGS['1'];
  const [showShare, setShowShare] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const imageScrollRef = useRef<ScrollView>(null);

  const hasImages = listing.images && listing.images.length > 0;
  const totalImages = listing.images?.length ?? 0;

  const goToImage = (nextIndex: number) => {
    const clamped = Math.max(0, Math.min(nextIndex, totalImages - 1));
    setActiveImageIndex(clamped);
    imageScrollRef.current?.scrollTo({
      x: clamped * SCREEN_WIDTH,
      animated: true,
    });
  };

  const handleShare = async (via: 'whatsapp' | 'native') => {
    const msg = `🚗 ${listing.year} ${listing.make} ${listing.model}\n💰 ${fmt(listing.price)}\n📍 ${listing.location}\n✅ Inspection: ${listing.inspectionScore}/100\n\nContact: wa.me/${listing.dealerPhone}`;
    if (via === 'whatsapp') {
      Linking.openURL(`https://wa.me/?text=${encodeURIComponent(msg)}`);
    } else {
      await Share.share({ message: msg });
    }
    setShowShare(false);
  };

  return (
    <SafeAreaView style={s.safe}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle} numberOfLines={1}>
          {listing.year} {listing.make} {listing.model}
        </Text>
        <TouchableOpacity onPress={() => setShowShare(true)} style={s.shareBtn}>
          <Text style={{ fontSize: 16 }}>📤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scroll}
      >
        {/* Hero — image carousel or fallback */}
        {hasImages ? (
          <View style={{ height: 240 }}>
            <ScrollView
              ref={imageScrollRef}
              horizontal
              pagingEnabled
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
            >
              {listing.images.map((uri: string, i: number) => (
                <Image
                  key={i}
                  source={{ uri }}
                  style={s.heroImage}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>

            {/* Prev / Next buttons */}
            {activeImageIndex > 0 && (
              <TouchableOpacity
                style={s.navBtnLeft}
                onPress={() => goToImage(activeImageIndex - 1)}
              >
                <Text style={s.navBtnTxt}>‹</Text>
              </TouchableOpacity>
            )}
            {activeImageIndex < totalImages - 1 && (
              <TouchableOpacity
                style={s.navBtnRight}
                onPress={() => goToImage(activeImageIndex + 1)}
              >
                <Text style={s.navBtnTxt}>›</Text>
              </TouchableOpacity>
            )}

            {/* Price + status overlay */}
            <View style={s.heroOverlay}>
              <Text style={s.heroPrice}>{fmt(listing.price)}</Text>
              <View
                style={[
                  s.statusPill,
                  {
                    backgroundColor:
                      listing.status === 'Available'
                        ? C.green
                        : listing.status === 'Reserved'
                          ? C.gold
                          : C.ink3,
                  },
                ]}
              >
                <Text style={s.statusPillTxt}>{listing.status}</Text>
              </View>
            </View>
          </View>
        ) : (
          /* Fallback hero when no images */
          <View style={[s.heroFallback, { backgroundColor: listing.gradient }]}>
            <Text style={s.heroEmoji}>🚗</Text>
            <Text style={s.heroFallbackLabel}>
              {listing.make} {listing.model}
            </Text>
            <View style={s.heroOverlay}>
              <Text style={s.heroPrice}>{fmt(listing.price)}</Text>
              <View
                style={[
                  s.statusPill,
                  {
                    backgroundColor:
                      listing.status === 'Available'
                        ? C.green
                        : listing.status === 'Reserved'
                          ? C.gold
                          : C.ink3,
                  },
                ]}
              >
                <Text style={s.statusPillTxt}>{listing.status}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Image dots — only shown when there are multiple images */}
        {hasImages && listing.images.length > 1 && (
          <View style={s.dots}>
            {listing.images.map((_: string, i: number) => (
              <View
                key={i}
                style={[s.dot, i === activeImageIndex && s.dotActive]}
              />
            ))}
          </View>
        )}

        <View style={s.content}>
          {/* Title + badges */}
          <Text style={s.title}>
            {listing.year} {listing.make} {listing.model}
          </Text>
          <View style={s.badgeRow}>
            <Badge
              label={listing.condition}
              color={
                listing.condition === 'Brand New'
                  ? C.p
                  : listing.condition === 'Tokunbo'
                    ? '#0D9488'
                    : '#C05621'
              }
              bg={
                listing.condition === 'Brand New'
                  ? C.pLight
                  : listing.condition === 'Tokunbo'
                    ? '#CCFBF1'
                    : '#FFF7ED'
              }
            />
            {listing.inspected ? (
              <Badge
                label={`✅ ${listing.inspectionScore}/100`}
                color="#0D9488"
                bg="#CCFBF1"
              />
            ) : (
              <Badge label="⚠️ Not Inspected" color="#B45309" bg="#FEF9C3" />
            )}
          </View>

          {/* Specs */}
          <Card style={s.specsCard}>
            <RowItem label="📍 Location" value={listing.location} />
            <RowItem label="⛽ Fuel" value={listing.fuelType} />
            <RowItem label="⚙️ Transmission" value={listing.transmission} />
            <RowItem label="🎨 Colour" value={listing.color} />
            <RowItem
              label="📏 Mileage"
              value={`${(listing.mileage / 1000).toFixed(0)}k km`}
            />
            <RowItem label="📅 Posted" value={listing.postedAt} last />
          </Card>

          {/* Description */}
          <View style={s.section}>
            <SectionHeader title="Description" />
            <Text style={s.description}>{listing.description}</Text>
          </View>

          {/* Inspection */}
          {listing.inspected && (
            <View style={s.section}>
              <View style={s.inspHeader}>
                <View style={{ flex: 1 }}>
                  <SectionHeader title="Inspection Report" />
                  <Text style={s.inspMeta}>
                    By {listing.inspectorName} · {listing.inspectorDate}
                  </Text>
                </View>
                <View style={s.scoreBig}>
                  <Text style={s.scoreBigVal}>{listing.inspectionScore}</Text>
                  <Text style={s.scoreBigLbl}>/100</Text>
                </View>
              </View>
              <Card>
                {listing.inspectionBreakdown.map(
                  (item: { label: string; score: number }) => (
                    <ScoreBar
                      key={item.label}
                      label={item.label}
                      score={item.score}
                    />
                  ),
                )}
              </Card>
            </View>
          )}

          {/* Dealer */}
          <View style={s.section}>
            <SectionHeader title="Dealer" />
            <Card style={s.dealerCard}>
              <View style={s.dealerAvatar}>
                <Text style={s.dealerAvatarTxt}>{listing.dealer[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.dealerName}>{listing.dealer}</Text>
                <Text style={s.dealerMeta}>
                  ⭐ {listing.dealerRating} · {listing.dealerSold} cars sold
                </Text>
                <View style={s.dealerBadges}>
                  <Badge label="✓ Verified" color={C.green} bg={C.greenBg} />
                  <Badge label="🥇 Gold" color="#92400E" bg="#FEFCE8" />
                </View>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>

      {/* CTA bar */}
      <View style={[s.ctaBar, S.shadowMd]}>
        <TouchableOpacity
          style={s.callCta}
          onPress={() => Linking.openURL(`tel:${listing.dealerPhone}`)}
        >
          <Text style={s.callCtaTxt}>📞 Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.waCta, S.shadow]}
          onPress={() =>
            Linking.openURL(
              `https://wa.me/${listing.dealerPhone}?text=${encodeURIComponent(`Hi, I'm interested in your ${listing.year} ${listing.make} ${listing.model} on Drivia (${fmt(listing.price)}). Still available?`)}`,
            )
          }
        >
          <Text style={s.waCtaTxt}>💬 WhatsApp Dealer</Text>
        </TouchableOpacity>
      </View>

      {/* Share modal */}
      <Modal visible={showShare} animationType="slide" transparent>
        <TouchableOpacity
          style={s.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowShare(false)}
        >
          <View style={s.shareSheet}>
            <Text style={s.sheetTitle}>Share Listing</Text>
            <Text style={s.sheetSub}>
              {listing.year} {listing.make} {listing.model}
            </Text>
            <Divider />
            {[
              {
                icon: '💬',
                label: 'Share via WhatsApp',
                via: 'whatsapp' as const,
                color: C.wa,
              },
              {
                icon: '📤',
                label: 'Share via...',
                via: 'native' as const,
                color: C.p,
              },
            ].map((opt) => (
              <TouchableOpacity
                key={opt.via}
                style={s.shareOption}
                onPress={() => handleShare(opt.via)}
              >
                <View
                  style={[s.shareIcon, { backgroundColor: opt.color + '20' }]}
                >
                  <Text style={{ fontSize: 20 }}>{opt.icon}</Text>
                </View>
                <Text style={s.shareOptionLbl}>{opt.label}</Text>
                <Text style={s.shareArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.line,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: R.md,
    backgroundColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: { fontSize: 18, color: C.ink2 },
  headerTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: C.ink,
    marginHorizontal: 12,
  },
  shareBtn: {
    width: 34,
    height: 34,
    borderRadius: R.md,
    backgroundColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scroll: { paddingBottom: 120 },

  // Image carousel nav buttons
  navBtnLeft: {
    position: 'absolute',
    left: 10,
    top: '50%' as any,
    marginTop: -20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  navBtnRight: {
    position: 'absolute',
    right: 10,
    top: '50%' as any,
    marginTop: -20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  navBtnTxt: {
    fontSize: 24,
    color: C.white,
    fontWeight: '700',
    lineHeight: 28,
  },

  // Image carousel
  heroImage: {
    width: SCREEN_WIDTH,
    height: 240,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  heroPrice: { fontSize: 22, fontWeight: '900', color: C.white },

  // Fallback hero (no images)
  heroFallback: {
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroEmoji: { fontSize: 72 },
  heroFallbackLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: C.white,
    marginTop: 6,
    opacity: 0.85,
  },

  statusPill: {
    borderRadius: R.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusPillTxt: { fontSize: 11, fontWeight: '700', color: C.white },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.line },
  dotActive: { width: 20, backgroundColor: C.p },

  content: { paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: '800', color: C.ink, marginBottom: 10 },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },

  specsCard: { marginBottom: 20, padding: 10 },

  section: { marginBottom: 20 },
  description: { fontSize: 14, color: C.ink2, lineHeight: 22 },

  inspHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  inspMeta: { fontSize: 11, color: C.ink3, marginTop: 2 },
  scoreBig: {
    alignItems: 'center',
    backgroundColor: C.greenBg,
    borderRadius: R.md,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  scoreBigVal: { fontSize: 28, fontWeight: '900', color: C.green },
  scoreBigLbl: { fontSize: 10, color: C.green, fontWeight: '700' },

  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  scoreLabel: { fontSize: 12, color: C.ink2, width: 90 },
  scoreBarWrap: {
    flex: 1,
    height: 7,
    backgroundColor: C.bg,
    borderRadius: 4,
    overflow: 'hidden',
  },
  scoreBar: { height: 7, borderRadius: 4 },
  scoreVal: { fontSize: 11, fontWeight: '700', width: 32, textAlign: 'right' },

  dealerCard: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  dealerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: C.p,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dealerAvatarTxt: { fontSize: 18, fontWeight: '800', color: C.white },
  dealerName: {
    fontSize: 15,
    fontWeight: '800',
    color: C.ink,
    marginBottom: 3,
  },
  dealerMeta: { fontSize: 12, color: C.ink3, marginBottom: 6 },
  dealerBadges: { flexDirection: 'row', gap: 8 },

  ctaBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingBottom: 28,
    backgroundColor: C.white,
    borderTopWidth: 1,
    borderTopColor: C.line,
  },
  callCta: {
    flex: 1,
    height: 50,
    borderRadius: R.md,
    borderWidth: 2,
    borderColor: C.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callCtaTxt: { fontSize: 14, fontWeight: '700', color: C.ink2 },
  waCta: {
    flex: 2,
    height: 50,
    borderRadius: R.md,
    backgroundColor: C.wa,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waCtaTxt: { fontSize: 14, fontWeight: '700', color: C.white },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  shareSheet: {
    backgroundColor: C.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 44,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: C.ink,
    marginBottom: 4,
  },
  sheetSub: { fontSize: 13, color: C.ink3, marginBottom: 12 },
  shareOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.line,
  },
  shareIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareOptionLbl: { flex: 1, fontSize: 14, fontWeight: '600', color: C.ink },
  shareArrow: { fontSize: 20, color: C.ink3 },
});

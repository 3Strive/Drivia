import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { C, S } from '../../constants/theme';
import { Badge, Card, SectionHeader, Divider } from '../../components/ui';
import { Ionicons } from '@expo/vector-icons';

type Tab = 'overview' | 'sales' | 'settings';

const RECENT_SALES = [
  {
    id: '1',
    car: '2021 Toyota Camry',
    buyer: 'Chidi Okafor',
    price: 16500000,
    date: 'Nov 1',
    platform: 'WhatsApp',
  },
  {
    id: '2',
    car: '2018 Lexus RX350',
    buyer: 'Biodun Fashola',
    price: 26000000,
    date: 'Oct 28',
    platform: 'Referral',
  },
  {
    id: '3',
    car: '2020 Honda CR-V',
    buyer: 'Ada Nwosu',
    price: 20500000,
    date: 'Oct 18',
    platform: 'Facebook',
  },
  {
    id: '4',
    car: '2019 Mercedes C300',
    buyer: 'Kola Adesanya',
    price: 34000000,
    date: 'Sep 30',
    platform: 'Walk-in',
  },
];
const PLAT_COLOR: Record<string, string> = {
  WhatsApp: C.wa,
  Facebook: C.fb,
  Instagram: C.ig,
  'Walk-in': '#805AD5',
  Referral: '#D69E2E',
};

const notifDefaults = [
  { label: 'New WhatsApp enquiry', on: true },
  { label: 'Lead status change', on: true },
  { label: 'Listing gets 10+ views', on: true },
  { label: 'Inspection report ready', on: true },
  { label: 'Listing saved by buyer', on: false },
  { label: 'Broadcast confirmation', on: true },
  { label: 'Plan renewal reminder', on: true },
  { label: 'Weekly performance summary', on: true },
];

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <TouchableOpacity
      onPress={onChange}
      style={[ts.track, on && ts.trackOn]}
      activeOpacity={0.9}
    >
      <View style={[ts.thumb, on && ts.thumbOn]} />
    </TouchableOpacity>
  );
}
const ts = StyleSheet.create({
  track: {
    width: 38,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  trackOn: { backgroundColor: C.p },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  thumbOn: { alignSelf: 'flex-end' },
});

export default function Profile() {
  const [tab, setTab] = useState<Tab>('overview');
  const [notifs, setNotifs] = useState(notifDefaults);
  const [name, setName] = useState('Lagos Auto Hub');
  const [phone, setPhone] = useState('08012345678');
  const [loc, setLoc] = useState('Lekki Phase 1, Lagos');

  const toggleNotif = (i: number) =>
    setNotifs((p) => p.map((n, j) => (j === i ? { ...n, on: !n.on } : n)));

  return (
    <View style={s.screen}>
      {/* Header banner */}
      <View style={s.banner}>
        <View style={s.bannerGrad} />
        <View style={s.bannerContent}>
          <View style={s.avatarWrap}>
            <View style={s.avatar}>
              <Text style={s.avatarText}>LA</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={s.nameRow}>
              <Text style={s.dealerName}>{name}</Text>
              <Badge label="Gold Dealer" color="#D69E2E" bg="#FEFCBF" />
            </View>
            <View style={s.infoRow}>
              <Text style={s.infoText}>📍 {loc}</Text>
            </View>
          </View>
        </View>
        {/* Stat strip */}
        <View style={s.statStrip}>
          {[
            { val: '47', label: 'Listings' },
            { val: '312', label: 'Cars Sold' },
            { val: '4.8', label: 'Rating' },
            { val: '2019', label: 'Since' },
          ].map((st, i) => (
            <View
              key={st.label}
              style={[s.statItem, i < 3 && s.statItemBorder]}
            >
              <Text style={s.statVal}>{st.val}</Text>
              <Text style={s.statLabel}>{st.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tabs */}
      <View style={s.tabRow}>
        {(['overview', 'sales', 'settings'] as Tab[]).map((t) => (
          <TouchableOpacity
            key={t}
            style={[s.tab, tab === t && s.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[s.tabText, tab === t && s.tabTextActive]}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={s.body} showsVerticalScrollIndicator={false}>
        {/* ── OVERVIEW ── */}
        {tab === 'overview' && (
          <View style={s.section}>
            <SectionHeader title="Dealership Info" />
            <Card>
              {[
                { label: 'Business Name', val: name },
                { label: 'Phone', val: phone },
                { label: 'Location', val: loc },
              ].map((f, i) => (
                <View key={f.label}>
                  <View style={s.infoField}>
                    <Text style={s.fieldLabel}>{f.label}</Text>
                    <Text style={s.fieldVal}>{f.val}</Text>
                  </View>
                  {i < 2 && <Divider />}
                </View>
              ))}
            </Card>

            <SectionHeader title="Performance" style={{ marginTop: 25 }} />
            <Card>
              {[
                { label: 'Total Revenue', val: '₦318M', color: C.p },
                { label: 'Cars Sold', val: '312', color: C.green },
                {
                  label: 'Avg. Selling Price',
                  val: '₦21.4M',
                  color: '#2C7A7B',
                },
                { label: 'Inspection Rate', val: '92%', color: C.green },
                { label: 'Response Time', val: '<1 hr', color: C.gold },
              ].map((p, i) => (
                <View key={p.label}>
                  <View style={s.perfRow}>
                    <Text style={s.perfLabel}>{p.label}</Text>
                    <Text style={[s.perfVal, { color: p.color }]}>{p.val}</Text>
                  </View>
                  {i < 4 && <Divider />}
                </View>
              ))}
            </Card>

            <SectionHeader title="Social Profiles" style={{ marginTop: 20 }} />
            <Card>
              {[
                {
                  plat: 'WhatsApp',
                  handle: '08012345678',
                  color: C.wa,
                  connected: true,
                },
                {
                  plat: 'Facebook',
                  handle: '@LagosAutoHub',
                  color: C.fb,
                  connected: true,
                },
                {
                  plat: 'Instagram',
                  handle: '@lagos.auto.hub',
                  color: C.ig,
                  connected: true,
                },
                {
                  plat: 'Twitter',
                  handle: 'Not connected',
                  color: C.tw,
                  connected: false,
                },
              ].map((soc, i) => (
                <View key={soc.plat}>
                  <View style={s.socRow}>
                    <View
                      style={[
                        s.socIcon,
                        {
                          backgroundColor: soc.color + '22',
                          opacity: soc.connected ? 1 : 0.4,
                        },
                      ]}
                    >
                      <Text style={[s.socLetter, { color: soc.color }]}>
                        {soc.plat.charAt(0)}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={s.socName}>{soc.plat}</Text>
                      <Text style={s.socHandle}>{soc.handle}</Text>
                    </View>
                    <Badge
                      label={soc.connected ? 'Connected' : 'Connect'}
                      color={soc.connected ? C.green : C.ink3}
                    />
                  </View>
                  {i < 3 && <Divider />}
                </View>
              ))}
            </Card>
          </View>
        )}

        {/* ── SALES ── */}
        {tab === 'sales' && (
          <View style={s.section}>
            <View style={s.saleSummary}>
              {[
                {
                  icon: <Ionicons name="stats-chart" size={20} color={C.red} />,
                  label: 'Revenue',
                  value: '₦84M',
                  color: C.p,
                  sub: '+12% this month',
                },
                {
                  icon: <Ionicons name="car" size={20} color={C.p} />,
                  label: 'Cars Sold',
                  value: '21',
                  color: C.green,
                  sub: 'This month',
                },
                {
                  icon: (
                    <Ionicons
                      name="chatbubbles-outline"
                      size={20}
                      color={C.ink2}
                    />
                  ),
                  label: 'Active Leads',
                  value: '38',
                  color: '#2C7A7B',
                  sub: '6 new today',
                },
                {
                  icon: (
                    <Ionicons name="cube-outline" size={20} color={C.ink2} />
                  ),
                  label: 'In Stock',
                  value: '47',
                  color: C.gold,
                  sub: '3 expiring soon',
                },
              ].map((st) => (
                <View
                  key={st.label}
                  style={[
                    s.saleStat,
                    {
                      borderColor: st.color + '30',
                      backgroundColor: st.color + '0A',
                    },
                  ]}
                >
                  <Text style={{ fontSize: 18, marginBottom: 4 }}>
                    {st.icon}
                  </Text>
                  <Text style={[s.saleStatVal, { color: st.color }]}>
                    {st.value}
                  </Text>
                  <Text style={s.saleStatLabel}>{st.label}</Text>
                </View>
              ))}
            </View>

            <SectionHeader title="Recent Sales" />
            <Card>
              {RECENT_SALES.map((sale, i) => (
                <View key={sale.id}>
                  <View style={s.saleRow}>
                    <View style={s.carIcon}>
                      <Text style={{ fontSize: 16 }}>🚗</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={s.saleCar}>{sale.car}</Text>
                      <Text style={s.saleBuyer}>
                        {sale.buyer} · {sale.date}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', gap: 4 }}>
                      <Text style={s.salePrice}>
                        ₦{(sale.price / 1e6).toFixed(1)}M
                      </Text>
                      <View
                        style={[
                          s.platDot,
                          {
                            backgroundColor:
                              PLAT_COLOR[sale.platform] ?? '#888',
                          },
                        ]}
                      />
                    </View>
                  </View>
                  {i < RECENT_SALES.length - 1 && <Divider />}
                </View>
              ))}
            </Card>
          </View>
        )}

        {/* ── SETTINGS ── */}
        {tab === 'settings' && (
          <View style={s.section}>
            <SectionHeader title="Notifications" />
            <Card>
              {notifs.map((n, i) => (
                <View key={n.label}>
                  <View style={s.notifRow}>
                    <Text style={s.notifLabel}>{n.label}</Text>
                    <Toggle on={n.on} onChange={() => toggleNotif(i)} />
                  </View>
                  {i < notifs.length - 1 && <Divider />}
                </View>
              ))}
            </Card>

            <SectionHeader title="Account" style={{ marginTop: 20 }} />
            <Card>
              {[
                {
                  label: 'Change Password',
                  sub: 'Last changed 90 days ago',
                  danger: false,
                },
                {
                  label: 'Two-Factor Auth',
                  sub: 'Currently disabled',
                  danger: false,
                },
                {
                  label: 'Connected Devices',
                  sub: '2 active sessions',
                  danger: false,
                },
                {
                  label: 'Delete Account',
                  sub: 'This cannot be undone',
                  danger: true,
                },
              ].map((item, i) => (
                <View key={item.label}>
                  <TouchableOpacity style={s.acctRow}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[s.acctLabel, item.danger && { color: C.red }]}
                      >
                        {item.label}
                      </Text>
                      <Text style={s.acctSub}>{item.sub}</Text>
                    </View>
                    <Text style={s.acctArrow}>›</Text>
                  </TouchableOpacity>
                  {i < 3 && <Divider />}
                </View>
              ))}
            </Card>

            <TouchableOpacity
              style={s.logoutBtn}
              onPress={() => router.replace('/(auth)')}
            >
              <Text style={s.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  banner: {
    backgroundColor: C.p,
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  bannerGrad: { position: 'absolute', inset: 0, opacity: 0.3 },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  avatarWrap: {},
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarText: { fontSize: 20, fontWeight: '800', color: C.white },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  dealerName: { fontSize: 18, fontWeight: '800', color: C.white },
  infoRow: { flexDirection: 'row', gap: 12 },
  infoText: { fontSize: 12, color: 'rgba(255,255,255,0.75)' },
  statStrip: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 0,
    marginHorizontal: -20,
    marginTop: 0,
  },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  statItemBorder: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.15)',
  },
  statVal: { fontSize: 17, fontWeight: '800', color: C.white },
  statLabel: { fontSize: 9, color: 'rgba(255,255,255,0.65)', marginTop: 1 },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: C.white,
    borderBottomWidth: 1,
    borderBottomColor: C.line,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: C.p },
  tabText: { fontSize: 13, fontWeight: '600', color: C.ink3 },
  tabTextActive: { color: C.p },
  body: { flex: 1 },
  section: { padding: 20, gap: 0 },
  infoField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  fieldLabel: { fontSize: 12, color: C.ink3, fontWeight: '600' },
  fieldVal: { fontSize: 13, fontWeight: '600', color: C.ink },
  perfRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  perfLabel: { fontSize: 13, color: C.ink3 },
  perfVal: { fontSize: 14, fontWeight: '800' },
  socRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  socIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socLetter: { fontSize: 14, fontWeight: '900' },
  socName: { fontSize: 13, fontWeight: '600', color: C.ink },
  socHandle: { fontSize: 11, color: C.ink3 },
  saleSummary: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  saleStat: { width: '47%', borderRadius: 14, borderWidth: 1.5, padding: 14 },
  saleStatVal: { fontSize: 18, fontWeight: '800', marginBottom: 2 },
  saleStatLabel: { fontSize: 10, color: C.ink3 },
  saleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  carIcon: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: C.pLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saleCar: { fontSize: 13, fontWeight: '600', color: C.ink },
  saleBuyer: { fontSize: 11, color: C.ink3, marginTop: 1 },
  salePrice: { fontSize: 13, fontWeight: '800', color: C.p },
  platDot: { width: 8, height: 8, borderRadius: 4 },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  notifLabel: { fontSize: 13, color: C.ink, flex: 1, paddingRight: 12 },
  acctRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  acctLabel: { fontSize: 14, fontWeight: '600', color: C.ink },
  acctSub: { fontSize: 11, color: C.ink3, marginTop: 2 },
  acctArrow: { fontSize: 20, color: C.ink3 },
  logoutBtn: {
    marginTop: 20,
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: C.red },
});

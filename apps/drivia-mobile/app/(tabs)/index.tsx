import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { C, S } from '../../constants/theme';
import { StatCard, SectionHeader, Card, Badge } from '../../components/ui';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const STATS = [
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
    icon: <Ionicons name="chatbubbles-outline" size={20} color={C.ink2} />,
    label: 'Active Leads',
    value: '38',
    color: '#2C7A7B',
    sub: '6 new today',
  },
  {
    icon: <Ionicons name="cube-outline" size={20} color={C.ink2} />,
    label: 'In Stock',
    value: '47',
    color: C.gold,
    sub: '3 expiring soon',
  },
];

const RECENT_LEADS = [
  {
    id: '1',
    name: 'Chidi Okafor',
    car: 'Toyota Camry 2021',
    budget: '₦16M',
    source: 'WhatsApp',
    status: 'New',
  },
  {
    id: '2',
    name: 'Biodun Fashola',
    car: 'Lexus RX350 2018',
    budget: '₦26M',
    source: 'Facebook',
    status: 'Contacted',
  },
  {
    id: '3',
    name: 'Ada Nwosu',
    car: 'Honda CR-V 2020',
    budget: '₦20M',
    source: 'Walk-in',
    status: 'Test Drive',
  },
  {
    id: '4',
    name: 'Kola Adesanya',
    car: 'Mercedes C300 2019',
    budget: '₦34M',
    source: 'Referral',
    status: 'Negotiating',
  },
];

const STOCK_ALERTS = [
  { id: '1', car: '2019 Toyota Corolla', days: 38, status: 'Available' },
  { id: '2', car: '2018 Honda Accord', days: 25, status: 'Available' },
  { id: '3', car: '2020 Hyundai Sonata', days: 12, status: 'Reserved' },
];

const STATUS_COLOR: Record<string, string> = {
  New: '#3B82F6',
  Contacted: '#8B5CF6',
  'Test Drive': '#F59E0B',
  Negotiating: '#EF4444',
  Sold: C.green,
  Lost: C.ink3,
};
const SOURCE_COLOR: Record<string, string> = {
  WhatsApp: C.wa,
  Facebook: C.fb,
  Instagram: C.ig,
  'Walk-in': '#805AD5',
  Referral: '#D69E2E',
};

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: '1', label: 'Upload inspection report for Camry', done: false },
    { id: '2', label: 'Follow up with Chidi about test drive', done: false },
    { id: '3', label: 'Renew Toyota Highlander listing', done: true },
    { id: '4', label: 'Reply 3 WhatsApp enquiries', done: false },
  ]);
  const toggleTask = (id: string) =>
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={s.header}>
        <View>
          <Text style={s.greeting}>Good morning 👋</Text>
          <Text style={s.dealerName}>Lagos Auto Hub</Text>
        </View>
        <View style={s.headerRight}>
          <TouchableOpacity style={s.bellBtn}>
            <Text style={{ fontSize: 20 }}>
              <Ionicons name="notifications-outline" color={C.ink} size={30} />
            </Text>
            <View style={s.bellDot} />
          </TouchableOpacity>
          <View style={s.avatar}>
            <Text style={s.avatarText}>LA</Text>
          </View>
        </View>
      </View>

      {/* KPI Stats */}
      <View style={s.statsGrid}>
        {STATS.map((st, i) => (
          <View key={i} style={{ width: '48%' }}>
            <StatCard {...st} />
          </View>
        ))}
      </View>

      {/* Quick actions */}
      <View style={s.section}>
        <SectionHeader title="Quick Actions" />
        <View style={s.quickRow}>
          {[
            {
              icon: <Ionicons name="add" color={C.ink3} size={30} />,
              label: 'Add Listing',
              onPress: () => router.push('/(tabs)/inventory'),
            },
            {
              icon: <MaterialIcons name="campaign" size={30} color={C.gold} />,
              label: 'Broadcast',
              onPress: () => router.push('/(tabs)/broadcast'),
            },
            {
              icon: <MaterialIcons name="store" size={30} color={C.p} />,
              label: 'Marketplace',
              onPress: () => router.push('/marketplace'),
            },
            {
              icon: <Ionicons name="stats-chart" size={30} color={C.red} />,
              label: 'Analytics',
              onPress: () => router.push('/analytics'),
            },
          ].map((q) => (
            <TouchableOpacity
              key={q.label}
              style={s.quickBtn}
              onPress={q.onPress}
            >
              <Text style={{ fontSize: 22 }}>{q.icon}</Text>
              <Text style={s.quickLabel}>{q.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Leads */}
      <View style={s.section}>
        <SectionHeader
          title="Recent Leads"
          action="See all"
          onAction={() => router.push('/(tabs)/leads')}
        />
        <Card>
          {RECENT_LEADS.map((lead, i) => (
            <View key={lead.id}>
              <View style={s.leadRow}>
                <View style={s.leadAvatar}>
                  <Text style={s.leadAvatarText}>{lead.name.charAt(0)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.leadName}>{lead.name}</Text>
                  <Text style={s.leadCar}>
                    {lead.car} · {lead.budget}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <Badge
                    label={lead.status}
                    color={STATUS_COLOR[lead.status]}
                  />
                  <View
                    style={[
                      s.sourceDot,
                      { backgroundColor: SOURCE_COLOR[lead.source] ?? C.ink3 },
                    ]}
                  />
                </View>
              </View>
              {i < RECENT_LEADS.length - 1 && <View style={s.divider} />}
            </View>
          ))}
        </Card>
      </View>

      {/* Platform Enquiries */}
      <View style={s.section}>
        <SectionHeader title="Enquiries by Platform" />
        <Card>
          {[
            { platform: 'WhatsApp', count: 24, color: C.wa, pct: 60 },
            { platform: 'Facebook', count: 10, color: C.fb, pct: 25 },
            { platform: 'Instagram', count: 4, color: C.ig, pct: 10 },
            { platform: 'Walk-in', count: 2, color: '#805AD5', pct: 5 },
          ].map((p) => (
            <View key={p.platform} style={s.platRow}>
              <View style={[s.platDot, { backgroundColor: p.color }]} />
              <Text style={s.platName}>{p.platform}</Text>
              <View style={s.platBar}>
                <View
                  style={[
                    s.platFill,
                    { width: `${p.pct}%`, backgroundColor: p.color },
                  ]}
                />
              </View>
              <Text style={s.platCount}>{p.count}</Text>
            </View>
          ))}
        </Card>
      </View>

      {/* Stock Alerts */}
      <View style={s.section}>
        <SectionHeader
          title="Stock Alerts"
          action="View all"
          onAction={() => router.push('/(tabs)/inventory')}
        />
        <Card>
          {STOCK_ALERTS.map((item, i) => (
            <View key={item.id}>
              <View style={s.alertRow}>
                <View
                  style={[
                    s.alertIcon,
                    { backgroundColor: item.days > 30 ? C.redBg : '#FFFAF0' },
                  ]}
                >
                  <Text style={{ fontSize: 16 }}>
                    {item.days > 30 ? '⚠️' : '🕐'}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.alertCar}>{item.car}</Text>
                  <Text
                    style={[
                      s.alertDays,
                      { color: item.days > 30 ? C.red : C.gold },
                    ]}
                  >
                    {item.days} days in stock
                  </Text>
                </View>
                <Badge
                  label={item.status}
                  color={item.status === 'Available' ? C.green : C.gold}
                />
              </View>
              {i < STOCK_ALERTS.length - 1 && <View style={s.divider} />}
            </View>
          ))}
        </Card>
      </View>

      {/* Tasks */}
      <View style={s.section}>
        <SectionHeader title="Today's Tasks" />
        <Card>
          {tasks.map((task, i) => (
            <View key={task.id}>
              <TouchableOpacity
                style={s.taskRow}
                onPress={() => toggleTask(task.id)}
              >
                <View style={[s.checkbox, task.done && s.checkboxDone]}>
                  {task.done && (
                    <Text
                      style={{ color: C.white, fontSize: 9, fontWeight: '800' }}
                    >
                      ✓
                    </Text>
                  )}
                </View>
                <Text style={[s.taskLabel, task.done && s.taskLabelDone]}>
                  {task.label}
                </Text>
              </TouchableOpacity>
              {i < tasks.length - 1 && <View style={s.divider} />}
            </View>
          ))}
        </Card>
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  greeting: { fontSize: 13, color: C.ink3, fontWeight: '500' },
  dealerName: { fontSize: 22, fontWeight: '800', color: C.ink },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  bellBtn: { position: 'relative' },
  bellDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.red,
    borderWidth: 1.5,
    borderColor: C.white,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.p,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: C.white, fontWeight: '800', fontSize: 13 },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  section: { paddingHorizontal: 20, marginBottom: 20 },

  quickRow: { flexDirection: 'row', gap: 10 },
  quickBtn: {
    flex: 1,
    backgroundColor: C.white,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    gap: 6,
    ...S.shadow,
  },
  quickLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: C.ink2,
    textAlign: 'center',
  },

  leadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  leadAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.pLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leadAvatarText: { fontSize: 14, fontWeight: '700', color: C.p },
  leadName: { fontSize: 13, fontWeight: '600', color: C.ink },
  leadCar: { fontSize: 11, color: C.ink3, marginTop: 1 },
  sourceDot: { width: 8, height: 8, borderRadius: 4 },

  platRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  platDot: { width: 10, height: 10, borderRadius: 5 },
  platName: { fontSize: 12, color: C.ink2, width: 76, fontWeight: '500' },
  platBar: {
    flex: 1,
    height: 6,
    backgroundColor: C.line,
    borderRadius: 3,
    overflow: 'hidden',
  },
  platFill: { height: '100%', borderRadius: 3 },
  platCount: {
    fontSize: 12,
    fontWeight: '700',
    color: C.ink,
    width: 24,
    textAlign: 'right',
  },

  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  alertIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertCar: { fontSize: 13, fontWeight: '600', color: C.ink },
  alertDays: { fontSize: 11, fontWeight: '600', marginTop: 2 },

  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: C.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: { backgroundColor: C.p, borderColor: C.p },
  taskLabel: { flex: 1, fontSize: 13, color: C.ink, fontWeight: '500' },
  taskLabelDone: { color: C.ink3, textDecorationLine: 'line-through' },

  divider: { height: 1, backgroundColor: C.line },
});

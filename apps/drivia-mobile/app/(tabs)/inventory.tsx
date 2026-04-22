import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import { C, S } from '../../constants/theme';
import {
  Badge,
  EmptyState,
  PrimaryBtn,
  ScreenHeader,
} from '../../components/ui';
import type {
  CarListing,
  Condition,
  ListingStatus,
} from '../../constants/types';

/* ---------------- MOCK DATA ---------------- */
const MOCK: CarListing[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2021,
    price: 16500000,
    mileage: 45000,
    condition: 'Tokunbo',
    status: 'Available',
    location: 'Lekki, Lagos',
    color: 'White',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    description: 'Clean Tokunbo Camry, full AC',
    phone: '08012345678',
    images: [],
    postedAt: '2024-10-01',
    inspection: { score: 0, status: 'Not Inspected' },
  },
  {
    id: '10',
    make: 'Toyota',
    model: 'Camry',
    year: 2021,
    price: 16500000,
    mileage: 45000,
    condition: 'Tokunbo',
    status: 'Available',
    location: 'Lekki, Lagos',
    color: 'White',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    description: 'Clean Tokunbo Camry, full AC',
    phone: '08012345678',
    images: [],
    postedAt: '2024-10-01',
    inspection: { score: 0, status: 'Not Inspected' },
  },
  {
    id: '2',
    make: 'Lexus',
    model: 'RX350',
    year: 2018,
    price: 26000000,
    mileage: 62000,
    condition: 'Tokunbo',
    status: 'Available',
    location: 'VI, Lagos',
    color: 'Black',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    description: 'Lexus RX350 full option',
    phone: '08012345678',
    images: [],
    postedAt: '2024-09-28',
    inspection: { score: 0, status: 'pending' },
  },
  {
    id: '3',
    make: 'Honda',
    model: 'CR-V',
    year: 2020,
    price: 20500000,
    mileage: 38000,
    condition: 'Tokunbo',
    status: 'Reserved',
    location: 'Ikeja, Lagos',
    color: 'Silver',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    description: 'Honda CRV 2020 Sport',
    phone: '08012345678',
    images: [],
    postedAt: '2024-09-15',
    inspection: { score: 0, status: 'Not Inspected' },
  },
  {
    id: '4',
    make: 'BMW',
    model: 'X5',
    year: 2019,
    price: 45000000,
    mileage: 55000,
    condition: 'Tokunbo',
    status: 'Available',
    location: 'Lekki, Lagos',
    color: 'Blue',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    description: 'BMW X5 xDrive40i',
    phone: '08012345678',
    images: [],
    postedAt: '2024-10-05',
    inspection: { score: 70, status: 'Not Inspected' },
  },
  {
    id: '5',
    make: 'Toyota',
    model: 'Highlander',
    year: 2022,
    price: 52000000,
    mileage: 18000,
    condition: 'Brand New',
    status: 'Available',
    location: 'Abuja, FCT',
    color: 'Red',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    description: 'Brand new Highlander',
    phone: '08012345678',
    images: [],
    postedAt: '2024-10-08',
    inspection: { score: 100, status: 'inspected' },
  },
  {
    id: '6',
    make: 'Toyota',
    model: 'Corolla',
    year: 2019,
    price: 8500000,
    mileage: 95000,
    condition: 'Nigerian Used',
    status: 'Available',
    location: 'Surulere, Lagos',
    color: 'Gray',
    transmission: 'Manual',
    fuelType: 'Petrol',
    description: 'Nigerian used Corolla',
    phone: '08012345678',
    images: [],
    postedAt: '2024-09-20',
    inspection: { score: 0, status: 'inspected' },
  },
];

/* ---------------- COLORS ---------------- */
const COND_COLOR: Record<Condition, string> = {
  'Brand New': C.p,
  Tokunbo: '#166534',
  'Nigerian Used': C.gold,
};

const STATUS_COLOR: Record<ListingStatus, string> = {
  Available: '#166534', // 👈 dark green
  Reserved: C.gold,
  Sold: C.ink3,
};

/* ---------------- HELPERS ---------------- */
function fmt(n: number) {
  return '₦' + (n / 1_000_000).toFixed(1) + 'M';
}

/* ---------------- CARD ---------------- */
function ListingCard({
  item,
  onPress,
}: {
  item: CarListing;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[s.card, S.shadow]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={s.cardHeader}>
        <Text style={s.cardHeaderText}>
          {item.year} {item.make} {item.model}
        </Text>
        <View style={s.cardStatus}>
          <Badge label={item.status} color={STATUS_COLOR[item.status]} />
        </View>
      </View>

      <View style={s.cardBody}>
        <Text style={s.cardPrice}>{fmt(item.price)}</Text>

        <View style={s.metaRow}>
          <Text style={s.meta}>📍 {item.location}</Text>
          <Text style={s.meta}>🔢 {item.mileage.toLocaleString()} km</Text>
          <Text style={s.meta}>⚡ {item.transmission}</Text>
        </View>

        <View style={s.footerRow}>
          <Badge label={item.condition} color={COND_COLOR[item.condition]} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

/* ---------------- SCREEN ---------------- */
export default function Inventory() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<ListingStatus | 'All'>('All');
  const [selected, setSelected] = useState<CarListing | null>(null);

  const filtered = MOCK.filter((c) => {
    const f = filter === 'All' || c.status === filter;
    const s =
      search === '' ||
      `${c.make} ${c.model}`.toLowerCase().includes(search.toLowerCase());
    return f && s;
  });

  const total = MOCK.length;
  const avail = MOCK.filter((c) => c.status === 'Available').length;
  const reserved = MOCK.filter((c) => c.status === 'Reserved').length;
  const sold = MOCK.filter((c) => c.status === 'Sold').length;

  return (
    <View style={s.screen}>
      <ScreenHeader title="My Inventory" />

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.listContent}
        ListHeaderComponent={
          <>
            {/* STATS */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.stats}
            >
              {[
                { label: 'Total', val: total, color: C.p },
                { label: 'Available', val: avail, color: '#166534' },
                { label: 'Reserved', val: reserved, color: C.gold },
                { label: 'Sold', val: sold, color: C.ink3 },
              ].map((st) => (
                <View
                  key={st.label}
                  style={[
                    s.statCard,
                    {
                      backgroundColor: st.color + '10',
                      borderColor: st.color + '30',
                    },
                  ]}
                >
                  <Text style={[s.statVal, { color: st.color }]}>{st.val}</Text>
                  <Text style={[s.statLabel, { color: st.color }]}>
                    {st.label}
                  </Text>
                </View>
              ))}
            </ScrollView>

            {/* SEARCH */}
            <View style={s.search}>
              <TextInput
                placeholder="Search..."
                value={search}
                onChangeText={setSearch}
                style={s.input}
              />
            </View>

            {/* FILTER */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.filters}
            >
              {(['All', 'Available', 'Reserved', 'Sold'] as const).map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[s.filterBtn, filter === f && s.filterActive]}
                  onPress={() => setFilter(f)}
                >
                  <Text
                    style={[s.filterText, filter === f && s.filterTextActive]}
                  >
                    {f}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        }
        ListEmptyComponent={
          <EmptyState title="No cars" sub="Add your first listing" icon="" />
        }
        renderItem={({ item }) => (
          <ListingCard item={item} onPress={() => setSelected(item)} />
        )}
      />

      {/* MODAL */}
      {selected && (
        <Modal visible animationType="slide">
          <View style={{ flex: 1, padding: 20 }}>
            <Text>{selected.make}</Text>
            <PrimaryBtn label="Close" onPress={() => setSelected(null)} />
          </View>
        </Modal>
      )}
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const s = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 10,
    backgroundColor: C.bg,
  },

  listContent: {
    paddingBottom: 30,
  },

  stats: {
    padding: 16,
    gap: 10,
  },

  statCard: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 90,
  },

  statVal: {
    fontSize: 18,
    fontWeight: '800',
  },

  statLabel: {
    fontSize: 11,
  },

  search: {
    marginHorizontal: 20,
    marginBottom: 10,
  },

  input: {
    backgroundColor: C.white,
    borderRadius: 10,
    padding: 12,
  },

  filters: {
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 20,
  },

  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: C.white,
    borderRadius: 10,
  },

  filterActive: {
    backgroundColor: C.p,
  },

  filterText: {
    fontSize: 12,
  },

  filterTextActive: {
    color: C.white,
  },

  card: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: C.white,
  },

  cardHeader: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: C.p,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  cardHeaderText: {
    color: C.white,
    fontWeight: '800',
  },
  cardStatus: {
    backgroundColor: C.white,
    borderTopStartRadius: 16,
  },

  cardBody: {
    padding: 14,
  },

  cardPrice: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },

  metaRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },

  meta: {
    fontSize: 11,
    color: C.ink3,
  },

  footerRow: {
    alignItems: 'flex-start',
    marginTop: 8,
  },
});

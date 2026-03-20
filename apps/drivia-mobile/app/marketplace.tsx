import React, { useState } from "react";
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  TextInput, SafeAreaView, ScrollView, Linking,
} from "react-native";
import { router } from "expo-router";
import { C, S, R } from "../constants/theme";
import { ScreenHeader, Badge, EmptyState, SectionHeader, Chip } from "../components/ui";
import type { Condition } from "../constants/types";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const LISTINGS = [
  { id:"1", make:"Toyota",   model:"Camry",      year:2021, price:16500000, location:"Lekki, Lagos",    condition:"Tokunbo"      as Condition, inspected:true,  score:88,  dealer:"Lagos Auto Hub",    dealerRating:4.8, color:"Silver",  mileage:45000, gradient:C.p     },
  { id:"2", make:"Honda",    model:"CR-V",       year:2020, price:20500000, location:"Ikeja, Lagos",    condition:"Tokunbo"      as Condition, inspected:true,  score:92,  dealer:"Prime Motors",      dealerRating:4.6, color:"Black",   mileage:38000, gradient:"#f093fb"},
  { id:"3", make:"Lexus",    model:"RX350",      year:2018, price:26000000, location:"VI, Lagos",       condition:"Tokunbo"      as Condition, inspected:false, score:0,   dealer:"Trusted Cars NG",   dealerRating:4.2, color:"White",   mileage:72000, gradient:"#4facfe"},
  { id:"4", make:"BMW",      model:"X5",         year:2019, price:48000000, location:"Abuja, FCT",      condition:"Tokunbo"      as Condition, inspected:true,  score:95,  dealer:"Abuja Auto Palace", dealerRating:4.9, color:"Grey",    mileage:62000, gradient:"#fa709a"},
  { id:"5", make:"Toyota",   model:"Highlander", year:2022, price:45000000, location:"Lekki, Lagos",    condition:"Brand New"    as Condition, inspected:true,  score:100, dealer:"Lagos Auto Hub",    dealerRating:4.8, color:"Pearl",   mileage:12000, gradient:"#a18cd1"},
  { id:"6", make:"Toyota",   model:"Corolla",    year:2020, price:13500000, location:"Surulere, Lagos", condition:"Nigerian Used" as Condition, inspected:true,  score:74,  dealer:"Surulere Cars",     dealerRating:4.0, color:"Blue",    mileage:55000, gradient:"#43e97b"},
  { id:"7", make:"Mercedes", model:"C300",       year:2019, price:34000000, location:"Abuja, FCT",      condition:"Tokunbo"      as Condition, inspected:true,  score:91,  dealer:"Abuja Auto Palace", dealerRating:4.9, color:"White",   mileage:58000, gradient:"#f7971e"},
];

const DEALERS = [
  { rank:1, name:"Lagos Auto Hub",    sold:312, rating:4.8, badge:"🥇" },
  { rank:2, name:"Abuja Auto Palace", sold:198, rating:4.9, badge:"🥈" },
  { rank:3, name:"Prime Motors",      sold:156, rating:4.6, badge:"🥉" },
];

const CONDITION_COLOR: Record<Condition, [string, string]> = {
  "Brand New":    [C.p,       C.pLight ],
  "Tokunbo":      ["#0D9488", "#CCFBF1"],
  "Nigerian Used":["#C05621", "#FFF7ED"],
};

type FilterOpt = "All" | "Inspected" | "Tokunbo" | "Brand New" | "Nigerian Used";
type SortOpt   = "Newest" | "Price ↑" | "Price ↓" | "Top Rated";

function fmt(n: number) { return "₦" + (n / 1_000_000).toFixed(1) + "M"; }

// ─── SCREEN ───────────────────────────────────────────────────────────────────
export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterOpt>("All");
  const [sort,   setSort]   = useState<SortOpt>("Newest");

  const data = LISTINGS
    .filter(c => {
      const q = `${c.make} ${c.model} ${c.year} ${c.location}`.toLowerCase();
      return q.includes(search.toLowerCase()) &&
        (filter === "All" ? true : filter === "Inspected" ? c.inspected : filter === c.condition);
    })
    .sort((a, b) =>
      sort === "Price ↑"   ? a.price - b.price :
      sort === "Price ↓"   ? b.price - a.price :
      sort === "Top Rated" ? b.score - a.score  : 0
    );

  return (
    <SafeAreaView style={s.safe}>
      <ScreenHeader title="Marketplace" sub="Drivia" onBack={() => router.back()} />

      <FlatList
        data={data}
        keyExtractor={i => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.list}
        ListHeaderComponent={
          <View>
            {/* Search */}
            <View style={s.searchRow}>
              <Text style={s.searchIco}>🔍</Text>
              <TextInput style={s.searchInput}
                placeholder="Make, model, location..."
                placeholderTextColor={C.ink3}
                value={search} onChangeText={setSearch} />
            </View>

            {/* Filters */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.chipRow}>
              {(["All","Inspected","Tokunbo","Brand New","Nigerian Used"] as FilterOpt[]).map(f => (
                <Chip key={f} label={f} selected={filter === f} onPress={() => setFilter(f)} />
              ))}
            </ScrollView>

            {/* Sort */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.sortRow}>
              <Text style={s.sortLbl}>Sort: </Text>
              {(["Newest","Price ↑","Price ↓","Top Rated"] as SortOpt[]).map(o => (
                <TouchableOpacity key={o} onPress={() => setSort(o)}
                  style={[s.sortChip, sort === o && s.sortChipActive]}>
                  <Text style={[s.sortChipTxt, sort === o && s.sortChipTxtActive]}>{o}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Dealer rankings */}
            <View style={s.section}>
              <SectionHeader title="Top Dealers" />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}>
                {DEALERS.map(d => (
                  <View key={d.rank} style={[s.dealerCard, S.shadow]}>
                    <Text style={{ fontSize: 24 }}>{d.badge}</Text>
                    <Text style={s.dealerName} numberOfLines={1}>{d.name}</Text>
                    <Text style={s.dealerSold}>{d.sold} sold</Text>
                    <Text style={s.dealerRating}>⭐ {d.rating}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            <Text style={s.resultsCount}>{data.length} listings</Text>
          </View>
        }
        renderItem={({ item: c }) => {
          const [cColor, cBg] = CONDITION_COLOR[c.condition];
          return (
            <TouchableOpacity style={[s.card, S.shadow]} activeOpacity={0.85}
              onPress={() => router.push(`/listing/${c.id}`)}>
              <View style={[s.cardAccent, { backgroundColor: c.gradient }]} />
              <View style={s.cardBody}>
                <View style={s.cardTop}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={s.cardTitle}>{c.year} {c.make} {c.model}</Text>
                    <Text style={s.cardDealer}>{c.dealer} · ⭐ {c.dealerRating}</Text>
                  </View>
                  <Text style={s.cardPrice}>{fmt(c.price)}</Text>
                </View>

                <View style={s.badgeRow}>
                  {c.inspected
                    ? <Badge label={`✅ ${c.score}/100`} color="#0D9488" bg="#CCFBF1" />
                    : <Badge label="⚠️ Not Inspected" color="#B45309" bg="#FEF9C3" />}
                  <Badge label={c.condition} color={cColor} bg={cBg} />
                </View>

                <Text style={s.cardMeta}>📍 {c.location}  ·  {(c.mileage / 1000).toFixed(0)}k km  ·  {c.color}</Text>

                <View style={s.actions}>
                  <TouchableOpacity style={s.callBtn}
                    onPress={() => Linking.openURL("tel:08012345678")}>
                    <Text style={s.callBtnTxt}>📞 Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={s.waBtn}
                    onPress={() => Linking.openURL("https://wa.me/2348012345678")}>
                    <Text style={s.waBtnTxt}>💬 WhatsApp</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <EmptyState icon="🔍" title="No listings found" sub="Try adjusting your filters." />
        }
      />
    </SafeAreaView>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  list: { paddingBottom: 32 },

  searchRow:  { flexDirection: "row", alignItems: "center", margin: 16, marginBottom: 10, backgroundColor: C.white, borderRadius: R.md, borderWidth: 1, borderColor: C.line, paddingHorizontal: 14, gap: 8 },
  searchIco:  { fontSize: 14 },
  searchInput:{ flex: 1, height: 44, fontSize: 14, color: C.ink },

  chipRow: { paddingHorizontal: 16, paddingBottom: 10, gap: 8 },
  sortRow: { paddingHorizontal: 16, paddingBottom: 14, gap: 8, alignItems: "center" },
  sortLbl: { fontSize: 12, fontWeight: "700", color: C.ink3 },
  sortChip:       { paddingHorizontal: 12, paddingVertical: 6, borderRadius: R.full, backgroundColor: C.white, borderWidth: 1, borderColor: C.line },
  sortChipActive: { backgroundColor: C.p, borderColor: C.p },
  sortChipTxt:    { fontSize: 12, fontWeight: "600", color: C.ink3 },
  sortChipTxtActive:{ color: C.white },

  section:      { paddingHorizontal: 16, marginBottom: 10 },
  dealerCard:   { backgroundColor: C.white, borderRadius: R.md, padding: 14, alignItems: "center", width: 116, gap: 3 },
  dealerName:   { fontSize: 10, fontWeight: "700", color: C.ink, textAlign: "center" },
  dealerSold:   { fontSize: 10, color: C.ink3 },
  dealerRating: { fontSize: 10, fontWeight: "700", color: C.gold },

  resultsCount: { fontSize: 12, color: C.ink3, fontWeight: "600", paddingHorizontal: 16, marginBottom: 8 },

  card:      { flexDirection: "row", backgroundColor: C.white, borderRadius: R.lg, marginHorizontal: 16, marginBottom: 12, overflow: "hidden" },
  cardAccent:{ width: 5 },
  cardBody:  { flex: 1, padding: 14 },
  cardTop:   { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  cardTitle: { fontSize: 14, fontWeight: "800", color: C.ink, marginBottom: 2 },
  cardDealer:{ fontSize: 11, color: C.ink3 },
  cardPrice: { fontSize: 15, fontWeight: "900", color: C.p },
  badgeRow:  { flexDirection: "row", gap: 6, marginBottom: 8 },
  cardMeta:  { fontSize: 11, color: C.ink3, marginBottom: 12 },

  actions:   { flexDirection: "row", gap: 8 },
  callBtn:   { flex: 1, height: 36, borderRadius: R.sm, backgroundColor: C.bg, borderWidth: 1, borderColor: C.line, alignItems: "center", justifyContent: "center" },
  callBtnTxt:{ fontSize: 12, fontWeight: "600", color: C.ink2 },
  waBtn:     { flex: 1, height: 36, borderRadius: R.sm, backgroundColor: C.wa + "18", borderWidth: 1, borderColor: C.wa + "44", alignItems: "center", justifyContent: "center" },
  waBtnTxt:  { fontSize: 12, fontWeight: "700", color: C.wa },
});

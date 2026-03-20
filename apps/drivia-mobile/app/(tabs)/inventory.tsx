import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList, Modal } from "react-native";
import { C, S } from "../../constants/theme";
import { SectionHeader, Badge, Card, EmptyState, PrimaryBtn, ScreenHeader } from "../../components/ui";
import type { CarListing, Condition, ListingStatus } from "../../constants/types";

const MOCK: CarListing[] = [
  { id:"1", make:"Toyota", model:"Camry",      year:2021, price:16500000, mileage:45000, condition:"Tokunbo",      status:"Available", location:"Lekki, Lagos",   color:"White",  transmission:"Automatic", fuelType:"Petrol", description:"Clean Tokunbo Camry, full AC", phone:"08012345678", images:[], gradient:["#667eea","#764ba2"], postedAt:"2024-10-01", inspection:{ score:88, status:"Inspected" } },
  { id:"2", make:"Lexus",  model:"RX350",      year:2018, price:26000000, mileage:62000, condition:"Tokunbo",      status:"Available", location:"VI, Lagos",      color:"Black",  transmission:"Automatic", fuelType:"Petrol", description:"Lexus RX350 full option",     phone:"08012345678", images:[], gradient:["#f093fb","#f5576c"], postedAt:"2024-09-28", inspection:{ score:92, status:"Inspected" } },
  { id:"3", make:"Honda",  model:"CR-V",       year:2020, price:20500000, mileage:38000, condition:"Tokunbo",      status:"Reserved",  location:"Ikeja, Lagos",   color:"Silver", transmission:"Automatic", fuelType:"Petrol", description:"Honda CRV 2020 Sport",       phone:"08012345678", images:[], gradient:["#4facfe","#00f2fe"], postedAt:"2024-09-15", inspection:{ score:0,  status:"Pending"   } },
  { id:"4", make:"BMW",    model:"X5",         year:2019, price:45000000, mileage:55000, condition:"Tokunbo",      status:"Available", location:"Lekki, Lagos",   color:"Blue",   transmission:"Automatic", fuelType:"Petrol", description:"BMW X5 xDrive40i",           phone:"08012345678", images:[], gradient:["#43e97b","#38f9d7"], postedAt:"2024-10-05", inspection:{ score:76, status:"Inspected" } },
  { id:"5", make:"Toyota", model:"Highlander", year:2022, price:52000000, mileage:18000, condition:"Brand New",    status:"Available", location:"Abuja, FCT",     color:"Red",    transmission:"Automatic", fuelType:"Petrol", description:"Brand new Highlander",       phone:"08012345678", images:[], gradient:["#fa709a","#fee140"], postedAt:"2024-10-08", inspection:{ score:100,status:"Inspected" } },
  { id:"6", make:"Toyota", model:"Corolla",    year:2019, price:8500000,  mileage:95000, condition:"Nigerian Used", status:"Available", location:"Surulere, Lagos",color:"Gray",   transmission:"Manual",    fuelType:"Petrol", description:"Nigerian used Corolla",      phone:"08012345678", images:[], gradient:["#a18cd1","#fbc2eb"], postedAt:"2024-09-20", inspection:{ score:0,  status:"Not Inspected"} },
];

const COND_COLOR: Record<Condition, string> = { "Brand New":C.p, "Tokunbo":C.green, "Nigerian Used":C.gold };
const STATUS_COLOR: Record<ListingStatus, string> = { "Available":C.green, "Reserved":C.gold, "Sold":C.ink3 };

function fmt(n: number) { return "₦" + (n / 1_000_000).toFixed(1) + "M"; }

function ListingCard({ item, onPress }: { item: CarListing; onPress: () => void }) {
  return (
    <TouchableOpacity style={[s.card, S.shadow]} onPress={onPress} activeOpacity={0.85}>
      {/* Gradient header */}
      <View style={[s.cardHeader, { backgroundColor: item.gradient[0] }]}>
        <Text style={s.cardHeaderText}>{item.year} {item.make} {item.model}</Text>
        <View style={s.cardHeaderRight}>
          <Badge label={item.status} color={STATUS_COLOR[item.status]} />
        </View>
      </View>

      <View style={s.cardBody}>
        <Text style={s.cardPrice}>{fmt(item.price)}</Text>
        <View style={s.cardMeta}>
          <Text style={s.cardMetaText}>📍 {item.location}</Text>
          <Text style={s.cardMetaText}>🔢 {item.mileage.toLocaleString()} km</Text>
          <Text style={s.cardMetaText}>⚡ {item.transmission}</Text>
        </View>
        <View style={s.cardFooter}>
          <Badge label={item.condition} color={COND_COLOR[item.condition]} />
          {item.inspection?.status === "Inspected" && (
            <Badge label={`✅ ${item.inspection.score}/100`} color={C.green} />
          )}
          {item.inspection?.status === "Pending" && (
            <Badge label="⏳ Pending" color={C.gold} />
          )}
          {item.inspection?.status === "Not Inspected" && (
            <Badge label="❌ Not Inspected" color={C.red} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function Inventory() {
  const [search,  setSearch]  = useState("");
  const [filter,  setFilter]  = useState<ListingStatus | "All">("All");
  const [view,    setView]    = useState<"grid" | "list">("list");
  const [modal,   setModal]   = useState(false);
  const [selected, setSelected] = useState<CarListing | null>(null);

  const filtered = MOCK.filter(c => {
    const matchFilter = filter === "All" || c.status === filter;
    const matchSearch = search === "" ||
      `${c.make} ${c.model} ${c.year}`.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const total  = MOCK.length;
  const avail  = MOCK.filter(c => c.status === "Available").length;
  const reserved = MOCK.filter(c => c.status === "Reserved").length;
  const sold   = MOCK.filter(c => c.status === "Sold").length;

  return (
    <View style={s.screen}>
      <ScreenHeader title="My Inventory"
        right={
          <TouchableOpacity style={s.addBtn} onPress={() => setModal(true)}>
            <Text style={s.addBtnText}>+ Add</Text>
          </TouchableOpacity>
        } />

      {/* Stats strip */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.statsStrip}>
        {[
          { label:"Total",    val:total,    color:C.p    },
          { label:"Available",val:avail,    color:C.green},
          { label:"Reserved", val:reserved, color:C.gold },
          { label:"Sold",     val:sold,     color:C.ink3 },
        ].map(st => (
          <View key={st.label} style={[s.statPill, { borderColor: st.color + "40", backgroundColor: st.color + "10" }]}>
            <Text style={[s.statPillVal, { color: st.color }]}>{st.val}</Text>
            <Text style={[s.statPillLabel, { color: st.color }]}>{st.label}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Search */}
      <View style={s.searchWrap}>
        <Text style={s.searchIcon}>🔍</Text>
        <TextInput style={s.searchInput} placeholder="Search make, model, year…"
          value={search} onChangeText={setSearch} />
      </View>

      {/* Filter tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.filterRow}>
        {(["All","Available","Reserved","Sold"] as const).map(f => (
          <TouchableOpacity key={f} style={[s.filterChip, filter === f && s.filterChipActive]}
            onPress={() => setFilter(f)}>
            <Text style={[s.filterChipText, filter === f && s.filterChipTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Listings */}
      <FlatList
        data={filtered} keyExtractor={i => i.id}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState icon="🚗" title="No listings found" sub="Add your first car listing" />}
        renderItem={({ item }) => (
          <ListingCard item={item} onPress={() => setSelected(item)} />
        )}
      />

      {/* Detail Modal */}
      {selected && (
        <Modal visible animationType="slide" presentationStyle="pageSheet"
          onRequestClose={() => setSelected(null)}>
          <ScrollView style={s.modalSheet}>
            <View style={[s.modalHeader, { backgroundColor: selected.gradient[0] }]}>
              <TouchableOpacity style={s.modalClose} onPress={() => setSelected(null)}>
                <Text style={{ color: C.white, fontWeight: "700" }}>✕</Text>
              </TouchableOpacity>
              <Text style={s.modalTitle}>{selected.year} {selected.make} {selected.model}</Text>
              <Text style={s.modalPrice}>{fmt(selected.price)}</Text>
            </View>
            <View style={{ padding: 20 }}>
              <View style={{ flexDirection:"row", gap:8, marginBottom:14 }}>
                <Badge label={selected.condition} color={COND_COLOR[selected.condition]} />
                <Badge label={selected.status}    color={STATUS_COLOR[selected.status]} />
              </View>
              {[
                ["Location",     selected.location],
                ["Mileage",      selected.mileage.toLocaleString() + " km"],
                ["Transmission", selected.transmission],
                ["Fuel",         selected.fuelType],
                ["Colour",       selected.color],
                ["Phone",        selected.phone],
              ].map(([k,v]) => (
                <View key={k} style={s.detailRow}>
                  <Text style={s.detailKey}>{k}</Text>
                  <Text style={s.detailVal}>{v}</Text>
                </View>
              ))}
              {selected.inspection?.status === "Inspected" && (
                <View style={[s.inspBox, { borderColor: C.green + "40", backgroundColor: C.greenBg }]}>
                  <Text style={{ fontSize: 13, fontWeight: "700", color: C.green, marginBottom: 4 }}>
                    ✅ Inspection Score: {selected.inspection.score}/100
                  </Text>
                  <Text style={{ fontSize: 11, color: C.ink3 }}>Engine · Exterior · Interior · Transmission all checked</Text>
                </View>
              )}
              <Text style={[s.detailKey, { marginTop: 12, marginBottom: 6 }]}>Description</Text>
              <Text style={{ fontSize: 13, color: C.ink2, lineHeight: 20 }}>{selected.description}</Text>
              <View style={{ gap: 10, marginTop: 24 }}>
                <PrimaryBtn label="📱 WhatsApp Buyer" onPress={() => {}} color={C.wa} />
                <PrimaryBtn label="✏️ Edit Listing"  onPress={() => {}} />
              </View>
            </View>
          </ScrollView>
        </Modal>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  screen:          { flex: 1, backgroundColor: C.bg },
  addBtn:          { backgroundColor: C.p, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  addBtnText:      { color: C.white, fontWeight: "700", fontSize: 13 },
  statsStrip:      { paddingHorizontal: 20, paddingBottom: 12, gap: 8 },
  statPill:        { borderRadius: 12, borderWidth: 1.5, paddingHorizontal: 14, paddingVertical: 8, alignItems: "center" },
  statPillVal:     { fontSize: 18, fontWeight: "800" },
  statPillLabel:   { fontSize: 10, fontWeight: "600" },
  searchWrap:      { flexDirection: "row", alignItems: "center", marginHorizontal: 20, backgroundColor: C.white, borderRadius: 12, paddingHorizontal: 12, height: 44, borderWidth: 1.5, borderColor: C.line, marginBottom: 10 },
  searchIcon:      { fontSize: 14, marginRight: 8 },
  searchInput:     { flex: 1, fontSize: 14, color: C.ink },
  filterRow:       { paddingHorizontal: 20, gap: 8, marginBottom: 14 },
  filterChip:      { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 10, backgroundColor: C.white, borderWidth: 1.5, borderColor: C.line },
  filterChipActive:{ backgroundColor: C.p, borderColor: C.p },
  filterChipText:  { fontSize: 12, fontWeight: "600", color: C.ink3 },
  filterChipTextActive: { color: C.white },
  list:            { paddingHorizontal: 20, paddingBottom: 24, gap: 12 },
  card:            { backgroundColor: C.white, borderRadius: 16, overflow: "hidden" },
  cardHeader:      { padding: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardHeaderText:  { fontSize: 15, fontWeight: "800", color: C.white, flex: 1 },
  cardHeaderRight: { gap: 4 },
  cardBody:        { padding: 14 },
  cardPrice:       { fontSize: 20, fontWeight: "800", color: C.p, marginBottom: 8 },
  cardMeta:        { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 10 },
  cardMetaText:    { fontSize: 11, color: C.ink3 },
  cardFooter:      { flexDirection: "row", gap: 6, flexWrap: "wrap" },
  modalSheet:      { flex: 1, backgroundColor: C.bg },
  modalHeader:     { padding: 20, paddingTop: 48, position: "relative" },
  modalClose:      { position: "absolute", top: 48, right: 20, width: 30, height: 30, borderRadius: 15, backgroundColor: "rgba(0,0,0,0.25)", alignItems: "center", justifyContent: "center" },
  modalTitle:      { fontSize: 22, fontWeight: "800", color: C.white, marginBottom: 4 },
  modalPrice:      { fontSize: 28, fontWeight: "800", color: C.white },
  detailRow:       { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.line },
  detailKey:       { fontSize: 12, color: C.ink3, fontWeight: "600" },
  detailVal:       { fontSize: 13, color: C.ink, fontWeight: "600" },
  inspBox:         { borderRadius: 12, borderWidth: 1.5, padding: 12, marginTop: 12 },
});

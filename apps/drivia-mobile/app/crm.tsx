import React, { useState } from "react";
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  TextInput, SafeAreaView, ScrollView, Linking, Modal, Switch,
} from "react-native";
import { router } from "expo-router";
import { C, S, R } from "../constants/theme";
import { ScreenHeader, Card, SectionHeader, EmptyState, Badge, RowItem, PrimaryBtn } from "../components/ui";
import type { Customer } from "../constants/types";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CUSTOMERS: Customer[] = [
  { id:"1", name:"Chidi Okafor",   phone:"08012345678", budgetMin:15000000, budgetMax:20000000, preferredMake:"Toyota",   tags:["SUV Buyer","Budget 15M-20M"],  totalPurchases:1, lastContact:"2024-11-01", hot:true  },
  { id:"2", name:"Biodun Fashola", phone:"08023456789", budgetMin:24000000, budgetMax:30000000, preferredMake:"Lexus",    tags:["Luxury","Repeat Buyer"],       totalPurchases:3, lastContact:"2024-10-28", hot:false },
  { id:"3", name:"Ada Nwosu",      phone:"08034567890", budgetMin:18000000, budgetMax:25000000, preferredMake:"Honda",    tags:["SUV Buyer","New Customer"],    totalPurchases:0, lastContact:"2024-10-18", hot:true  },
  { id:"4", name:"Kola Adesanya",  phone:"08045678901", budgetMin:30000000, budgetMax:40000000, preferredMake:"Mercedes", tags:["Luxury","Budget 30M+"],        totalPurchases:2, lastContact:"2024-09-30", hot:false },
  { id:"5", name:"Ngozi Eze",      phone:"08056789012", budgetMin:10000000, budgetMax:15000000, preferredMake:"Toyota",   tags:["Budget Car","First Buyer"],    totalPurchases:1, lastContact:"2024-09-14", hot:false },
];

function fmt(n: number) { return "₦" + (n / 1_000_000).toFixed(0) + "M"; }

export default function CRM() {
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);

  const data = CUSTOMERS.filter(c =>
    `${c.name} ${c.preferredMake ?? ""} ${c.tags.join(" ")}`.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={s.safe}>
      <ScreenHeader title="Customers" sub="Drivia" onBack={() => router.back()} />

      {/* Match alert */}
      <View style={s.matchAlert}>
        <Text style={s.matchTxt}>🎯  3 customers match your new CR-V listing!</Text>
        <TouchableOpacity><Text style={s.matchAction}>Notify All →</Text></TouchableOpacity>
      </View>

      <View style={s.searchWrap}>
        <Text>🔍</Text>
        <TextInput style={s.searchInput} placeholder="Name, make, tags…"
          placeholderTextColor={C.ink3} value={search} onChangeText={setSearch} />
      </View>

      <FlatList
        data={data}
        keyExtractor={c => c.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.list}
        ListEmptyComponent={<EmptyState icon="👥" title="No customers" sub="Buyers appear here as leads come in." />}
        renderItem={({ item: c }) => (
          <TouchableOpacity style={[s.card, S.shadow, c.hot && s.cardHot]}
            activeOpacity={0.85} onPress={() => setSelected(c)}>
            <View style={s.cardTop}>
              <View style={s.avatar}><Text style={s.avatarTxt}>{c.name[0]}</Text></View>
              <View style={{ flex: 1 }}>
                <View style={s.nameRow}>
                  <Text style={s.name}>{c.name}</Text>
                  {c.hot && <Text style={s.hotTag}>🔥 Hot</Text>}
                  {c.totalPurchases > 1 && <Text style={s.repeatTag}>⭐ Repeat</Text>}
                </View>
                <Text style={s.budget}>{fmt(c.budgetMin)} – {fmt(c.budgetMax)}</Text>
                <Text style={s.make}>Looking for: {c.preferredMake}</Text>
              </View>
            </View>
            <View style={s.tagRow}>
              {c.tags.map(t => <View key={t} style={s.tag}><Text style={s.tagTxt}>{t}</Text></View>)}
            </View>
            <View style={s.actions}>
              <TouchableOpacity style={s.callBtn} onPress={() => Linking.openURL(`tel:${c.phone}`)}>
                <Text style={s.callTxt}>📞 Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.waBtn} onPress={() => Linking.openURL(`https://wa.me/${c.phone}`)}>
                <Text style={s.waTxt}>💬 WhatsApp</Text>
              </TouchableOpacity>
              <Text style={s.lastContact}>Last: {c.lastContact}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Detail modal */}
      <Modal visible={!!selected} animationType="slide" presentationStyle="pageSheet">
        {selected && (
          <SafeAreaView style={{ flex: 1, backgroundColor: C.white }}>
            <View style={s.modalHeader}>
              <Text style={s.modalTitle}>{selected.name}</Text>
              <TouchableOpacity onPress={() => setSelected(null)} style={s.closeBtn}>
                <Text style={s.closeTxt}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
              <Card>
                <RowItem label="Phone"           value={selected.phone} />
                <RowItem label="Budget"          value={`${fmt(selected.budgetMin)} – ${fmt(selected.budgetMax)}`} />
                <RowItem label="Preferred Make"  value={selected.preferredMake ?? "Any"} />
                <RowItem label="Total Purchases" value={String(selected.totalPurchases)} />
                <RowItem label="Last Contact"    value={selected.lastContact} last />
              </Card>
              <View style={s.tagRow}>
                {selected.tags.map(t => <View key={t} style={s.tag}><Text style={s.tagTxt}>{t}</Text></View>)}
              </View>
              <PrimaryBtn label="🎯  Notify about matching listings" onPress={() => {}} />
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: C.bg },
  matchAlert: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: 16, marginBottom: 0, padding: 12, backgroundColor: C.greenBg, borderRadius: R.md, borderWidth: 1, borderColor: C.green + "55" },
  matchTxt:   { flex: 1, fontSize: 12, fontWeight: "600", color: "#166534" },
  matchAction:{ fontSize: 12, fontWeight: "800", color: C.green },
  searchWrap: { flexDirection: "row", alignItems: "center", margin: 16, backgroundColor: C.white, borderRadius: R.md, borderWidth: 1, borderColor: C.line, paddingHorizontal: 14, gap: 8 },
  searchInput:{ flex: 1, height: 44, fontSize: 14, color: C.ink },
  list:       { paddingHorizontal: 16, paddingBottom: 32 },
  card:       { backgroundColor: C.white, borderRadius: R.lg, padding: 14, marginBottom: 12 },
  cardHot:    { borderWidth: 1.5, borderColor: C.red + "55" },
  cardTop:    { flexDirection: "row", gap: 12, marginBottom: 10 },
  avatar:     { width: 44, height: 44, borderRadius: 22, backgroundColor: C.pLight, alignItems: "center", justifyContent: "center" },
  avatarTxt:  { fontSize: 16, fontWeight: "800", color: C.p },
  nameRow:    { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 3, flexWrap: "wrap" },
  name:       { fontSize: 14, fontWeight: "800", color: C.ink },
  hotTag:     { fontSize: 10, fontWeight: "700", color: C.red },
  repeatTag:  { fontSize: 10, fontWeight: "700", color: C.gold },
  budget:     { fontSize: 13, fontWeight: "700", color: C.p, marginBottom: 2 },
  make:       { fontSize: 11, color: C.ink3 },
  tagRow:     { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 10 },
  tag:        { backgroundColor: C.pLight, borderRadius: R.sm, paddingHorizontal: 8, paddingVertical: 3 },
  tagTxt:     { fontSize: 10, fontWeight: "700", color: C.p },
  actions:    { flexDirection: "row", gap: 8, alignItems: "center" },
  callBtn:    { paddingHorizontal: 12, paddingVertical: 7, borderRadius: R.sm, backgroundColor: C.bg, borderWidth: 1, borderColor: C.line },
  callTxt:    { fontSize: 11, fontWeight: "600", color: C.ink2 },
  waBtn:      { paddingHorizontal: 12, paddingVertical: 7, borderRadius: R.sm, backgroundColor: C.wa + "12", borderWidth: 1, borderColor: C.wa + "44" },
  waTxt:      { fontSize: 11, fontWeight: "700", color: C.wa },
  lastContact:{ flex: 1, fontSize: 10, color: C.ink3, textAlign: "right" },
  modalHeader:{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, borderBottomWidth: 1, borderBottomColor: C.line },
  modalTitle: { fontSize: 18, fontWeight: "800", color: C.ink },
  closeBtn:   { width: 32, height: 32, borderRadius: R.md, backgroundColor: C.bg, alignItems: "center", justifyContent: "center" },
  closeTxt:   { fontSize: 16, color: C.ink3 },
});

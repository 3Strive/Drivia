import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Modal } from "react-native";
import { C, S } from "../../constants/theme";
import { Badge, Card, ScreenHeader, SectionHeader } from "../../components/ui";
import type { Lead, LeadStatus, LeadSource } from "../../constants/types";

const STAGES: LeadStatus[] = ["New","Contacted","Test Drive","Negotiating","Sold","Lost"];

const STAGE_COLOR: Record<LeadStatus, string> = {
  "New":"#3B82F6", "Contacted":"#8B5CF6", "Test Drive":C.gold,
  "Negotiating":C.red, "Sold":C.green, "Lost":C.ink3,
};

const SOURCE_COLOR: Record<LeadSource, string> = {
  "WhatsApp":C.wa, "Facebook":C.fb, "Instagram":C.ig,
  "Walk-in":"#805AD5", "Referral":"#D69E2E", "Phone":C.ink3,
};

const MOCK_LEADS: Lead[] = [
  { id:"1", name:"Chidi Okafor",   phone:"08011111111", source:"WhatsApp",  status:"New",         budget:16000000, createdAt:"2024-10-01", updatedAt:"2024-10-01" },
  { id:"2", name:"Biodun Fashola", phone:"08022222222", source:"Facebook",  status:"Contacted",   budget:26000000, createdAt:"2024-09-28", updatedAt:"2024-10-02" },
  { id:"3", name:"Ada Nwosu",      phone:"08033333333", source:"Walk-in",   status:"Test Drive",  budget:20000000, createdAt:"2024-09-25", updatedAt:"2024-10-03" },
  { id:"4", name:"Kola Adesanya",  phone:"08044444444", source:"Referral",  status:"Negotiating", budget:34000000, createdAt:"2024-09-20", updatedAt:"2024-10-04" },
  { id:"5", name:"Ngozi Eze",      phone:"08055555555", source:"WhatsApp",  status:"Sold",        budget:13000000, createdAt:"2024-09-14", updatedAt:"2024-10-05" },
  { id:"6", name:"Tunde Bello",    phone:"08066666666", source:"Instagram", status:"New",         budget:18000000, createdAt:"2024-10-06", updatedAt:"2024-10-06" },
  { id:"7", name:"Amaka Obi",      phone:"08077777777", source:"Phone",     status:"Contacted",   budget:9000000,  createdAt:"2024-10-07", updatedAt:"2024-10-07" },
  { id:"8", name:"Emeka Nwosu",    phone:"08088888888", source:"Facebook",  status:"Lost",        budget:22000000, createdAt:"2024-09-10", updatedAt:"2024-09-18" },
];

function fmt(n: number) { return "₦" + (n / 1_000_000).toFixed(1) + "M"; }
function daysSince(date: string) {
  return Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
}

function LeadCard({ lead, onPress }: { lead: Lead; onPress: () => void }) {
  const days = daysSince(lead.updatedAt);
  return (
    <TouchableOpacity style={[s.leadCard, S.shadow]} onPress={onPress} activeOpacity={0.85}>
      <View style={s.leadTop}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>{lead.name.charAt(0)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.leadName}>{lead.name}</Text>
          <Text style={s.leadBudget}>{fmt(lead.budget)}</Text>
        </View>
        <View style={[s.sourcePill, { backgroundColor: SOURCE_COLOR[lead.source] + "22" }]}>
          <Text style={[s.sourceText, { color: SOURCE_COLOR[lead.source] }]}>{lead.source}</Text>
        </View>
      </View>
      <View style={s.leadBottom}>
        <Text style={[s.daysText, { color: days > 3 ? C.red : C.ink3 }]}>
          {days === 0 ? "Today" : `${days}d ago`}
        </Text>
        <View style={{ flexDirection:"row", gap:8 }}>
          <TouchableOpacity style={[s.actionBtn, { backgroundColor: C.wa + "18" }]}>
            <Text style={{ fontSize:14 }}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.actionBtn, { backgroundColor: C.pLight }]}>
            <Text style={{ fontSize:14 }}>📞</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function Leads() {
  const [activeStage, setActiveStage] = useState<LeadStatus>("New");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [leads, setLeads] = useState(MOCK_LEADS);

  const stageCounts = STAGES.reduce((acc, st) => {
    acc[st] = leads.filter(l => l.status === st).length;
    return acc;
  }, {} as Record<LeadStatus, number>);

  const stageLeads = leads.filter(l => l.status === activeStage);

  const moveLead = (id: string, status: LeadStatus) => {
    setLeads(p => p.map(l => l.id === id ? { ...l, status } : l));
    setSelected(null);
  };

  return (
    <View style={s.screen}>
      <ScreenHeader title="Leads Pipeline" sub="Drivia" />

      {/* Summary strip */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.summaryStrip}>
        {[
          { label:"Total",  val:leads.length, color:C.p     },
          { label:"Active", val:leads.filter(l => !["Sold","Lost"].includes(l.status)).length, color:C.green },
          { label:"Sold",   val:stageCounts["Sold"],  color:C.green },
          { label:"Lost",   val:stageCounts["Lost"],  color:C.ink3  },
        ].map(s2 => (
          <View key={s2.label} style={[s.summaryPill, { backgroundColor: s2.color + "12", borderColor: s2.color + "30" }]}>
            <Text style={[s.summaryVal, { color: s2.color }]}>{s2.val}</Text>
            <Text style={[s.summaryLabel, { color: s2.color }]}>{s2.label}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Stage tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.stageRow}>
        {STAGES.map(stage => {
          const active = stage === activeStage;
          return (
            <TouchableOpacity key={stage}
              style={[s.stageTab, active && { backgroundColor: STAGE_COLOR[stage], borderColor: STAGE_COLOR[stage] }]}
              onPress={() => setActiveStage(stage)}>
              <Text style={[s.stageTabText, active && { color: C.white }]}>{stage}</Text>
              <View style={[s.stageBadge, { backgroundColor: active ? "rgba(255,255,255,0.3)" : STAGE_COLOR[stage] + "22" }]}>
                <Text style={[s.stageBadgeText, { color: active ? C.white : STAGE_COLOR[stage] }]}>
                  {stageCounts[stage]}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Lead list */}
      <FlatList
        data={stageLeads} keyExtractor={l => l.id}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={s.empty}>
            <Text style={{ fontSize: 36, marginBottom: 10 }}>📭</Text>
            <Text style={{ fontSize: 15, fontWeight: "700", color: C.ink2 }}>No leads in {activeStage}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <LeadCard lead={item} onPress={() => setSelected(item)} />
        )}
      />

      {/* Lead detail modal */}
      {selected && (
        <Modal visible animationType="slide" presentationStyle="pageSheet"
          onRequestClose={() => setSelected(null)}>
          <View style={s.modalSheet}>
            <View style={s.modalHandle} />

            <View style={s.modalHeader}>
              <View style={s.modalAvatar}>
                <Text style={s.modalAvatarText}>{selected.name.charAt(0)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.modalName}>{selected.name}</Text>
                <Text style={s.modalPhone}>{selected.phone}</Text>
              </View>
              <Badge label={selected.status} color={STAGE_COLOR[selected.status]} />
            </View>

            <View style={s.modalBody}>
              {[
                ["Budget",  fmt(selected.budget)],
                ["Source",  selected.source],
                ["Added",   selected.createdAt],
                ["Updated", selected.updatedAt],
              ].map(([k,v]) => (
                <View key={k} style={s.detailRow}>
                  <Text style={s.detailKey}>{k}</Text>
                  <Text style={s.detailVal}>{v}</Text>
                </View>
              ))}
            </View>

            {/* Move to stage */}
            <View style={s.modalSection}>
              <Text style={s.modalSectionTitle}>Move to stage</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8, paddingBottom: 4 }}>
                {STAGES.filter(st => st !== selected.status).map(st => (
                  <TouchableOpacity key={st}
                    style={[s.moveBtn, { backgroundColor: STAGE_COLOR[st] + "18", borderColor: STAGE_COLOR[st] + "44" }]}
                    onPress={() => moveLead(selected.id, st)}>
                    <Text style={[s.moveBtnText, { color: STAGE_COLOR[st] }]}>{st}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Actions */}
            <View style={s.modalActions}>
              <TouchableOpacity style={[s.actionLarge, { backgroundColor: C.wa }]}>
                <Text style={s.actionLargeText}>💬  WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.actionLarge, { backgroundColor: C.pLight }]}>
                <Text style={[s.actionLargeText, { color: C.p }]}>📞  Call</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={s.closeBtn} onPress={() => setSelected(null)}>
              <Text style={s.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  screen:       { flex: 1, backgroundColor: C.bg },
  summaryStrip: { paddingHorizontal: 20, gap: 8, paddingBottom: 10 },
  summaryPill:  { borderRadius: 12, borderWidth: 1.5, paddingHorizontal: 14, paddingVertical: 8, alignItems: "center" },
  summaryVal:   { fontSize: 18, fontWeight: "800" },
  summaryLabel: { fontSize: 10, fontWeight: "600" },

  stageRow:         { paddingHorizontal: 20, gap: 8, marginBottom: 14 },
  stageTab:         { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1.5, borderColor: C.line, backgroundColor: C.white },
  stageTabText:     { fontSize: 12, fontWeight: "700", color: C.ink2 },
  stageBadge:       { borderRadius: 5, paddingHorizontal: 6, paddingVertical: 2 },
  stageBadgeText:   { fontSize: 10, fontWeight: "800" },

  list:         { paddingHorizontal: 20, paddingBottom: 24, gap: 10 },
  empty:        { alignItems: "center", paddingTop: 60 },

  leadCard:     { backgroundColor: C.white, borderRadius: 14, padding: 14 },
  leadTop:      { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  avatar:       { width: 38, height: 38, borderRadius: 19, backgroundColor: C.pLight, alignItems: "center", justifyContent: "center" },
  avatarText:   { fontSize: 15, fontWeight: "700", color: C.p },
  leadName:     { fontSize: 14, fontWeight: "700", color: C.ink },
  leadBudget:   { fontSize: 12, color: C.p, fontWeight: "600", marginTop: 1 },
  sourcePill:   { borderRadius: 7, paddingHorizontal: 8, paddingVertical: 4 },
  sourceText:   { fontSize: 10, fontWeight: "700" },
  leadBottom:   { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  daysText:     { fontSize: 11, fontWeight: "600" },
  actionBtn:    { width: 30, height: 30, borderRadius: 8, alignItems: "center", justifyContent: "center" },

  modalSheet:       { flex: 1, backgroundColor: C.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingBottom: 40 },
  modalHandle:      { width: 40, height: 4, backgroundColor: C.line, borderRadius: 2, alignSelf: "center", marginTop: 12, marginBottom: 20 },
  modalHeader:      { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 20, marginBottom: 16 },
  modalAvatar:      { width: 52, height: 52, borderRadius: 26, backgroundColor: C.pLight, alignItems: "center", justifyContent: "center" },
  modalAvatarText:  { fontSize: 20, fontWeight: "800", color: C.p },
  modalName:        { fontSize: 18, fontWeight: "800", color: C.ink },
  modalPhone:       { fontSize: 13, color: C.ink3, marginTop: 2 },
  modalBody:        { paddingHorizontal: 20, marginBottom: 20 },
  detailRow:        { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.line },
  detailKey:        { fontSize: 12, color: C.ink3, fontWeight: "600" },
  detailVal:        { fontSize: 13, color: C.ink, fontWeight: "600" },
  modalSection:     { paddingHorizontal: 20, marginBottom: 20 },
  modalSectionTitle:{ fontSize: 13, fontWeight: "700", color: C.ink2, marginBottom: 10 },
  moveBtn:          { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, borderWidth: 1.5 },
  moveBtnText:      { fontSize: 12, fontWeight: "700" },
  modalActions:     { flexDirection: "row", gap: 10, paddingHorizontal: 20, marginBottom: 12 },
  actionLarge:      { flex: 1, height: 46, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  actionLargeText:  { fontSize: 14, fontWeight: "700", color: C.white },
  closeBtn:         { marginHorizontal: 20, height: 46, borderRadius: 12, borderWidth: 1.5, borderColor: C.line, alignItems: "center", justifyContent: "center" },
  closeBtnText:     { fontSize: 14, fontWeight: "600", color: C.ink3 },
});

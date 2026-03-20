import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Linking, TextInput,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { C, S, R } from "../../constants/theme";
import { Card, SectionHeader, Badge, Divider, RowItem } from "../../components/ui";
import type { Lead, LeadStatus, LeadSource } from "../../constants/types";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const MOCK: Record<string, Lead> = {
  "1": { id:"1", name:"Chidi Okafor",   phone:"08012345678", source:"WhatsApp", status:"New",         budget:16500000, carOfInterest:"2021 Toyota Camry",   notes:"Wants silver only. Available weekends for test drive.", createdAt:"Nov 1, 2024",  updatedAt:"Nov 1, 2024"  },
  "2": { id:"2", name:"Biodun Fashola", phone:"08023456789", source:"Referral", status:"Contacted",   budget:26000000, carOfInterest:"2018 Lexus RX350",    notes:"Referred by Kola. Ready to buy end of month.",          createdAt:"Oct 28, 2024", updatedAt:"Oct 30, 2024" },
  "3": { id:"3", name:"Ada Nwosu",      phone:"08034567890", source:"Facebook", status:"Test Drive",  budget:20500000, carOfInterest:"2020 Honda CR-V",     notes:"Test drive booked Saturday 10am.",                      createdAt:"Oct 18, 2024", updatedAt:"Nov 1, 2024"  },
  "4": { id:"4", name:"Kola Adesanya",  phone:"08045678901", source:"Walk-in",  status:"Negotiating", budget:34000000, carOfInterest:"2019 Mercedes C300",  notes:"Offering ₦32M. Decision needed by Friday.",             createdAt:"Sep 30, 2024", updatedAt:"Nov 1, 2024"  },
};

const STAGES: LeadStatus[] = ["New", "Contacted", "Test Drive", "Negotiating", "Sold", "Lost"];

const STATUS_STYLE: Record<LeadStatus, { color: string; bg: string; emoji: string }> = {
  "New":         { color:C.p,       bg:C.pLight,   emoji:"🆕" },
  "Contacted":   { color:"#0369A1", bg:"#F0F9FF",  emoji:"📞" },
  "Test Drive":  { color:"#B45309", bg:"#FEF9C3",  emoji:"🚗" },
  "Negotiating": { color:"#7C3AED", bg:"#F5F3FF",  emoji:"🤝" },
  "Sold":        { color:C.green,   bg:C.greenBg,  emoji:"✅" },
  "Lost":        { color:C.ink3,    bg:C.bg,       emoji:"❌" },
};

const SOURCE_COLOR: Record<LeadSource, string> = {
  WhatsApp:C.wa, Facebook:C.fb, Instagram:C.ig,
  "Walk-in":"#805AD5", Referral:"#D69E2E", Phone:C.ink2,
};

function fmt(n: number) { return "₦" + (n / 1_000_000).toFixed(1) + "M"; }

// ─── SCREEN ───────────────────────────────────────────────────────────────────
export default function LeadDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lead   = MOCK[id ?? "1"] ?? MOCK["1"];

  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [note,   setNote]   = useState("");

  const stIdx  = STAGES.indexOf(status);
  const st     = STATUS_STYLE[status];

  const moveStage = (dir: 1 | -1) => {
    const next = STAGES[stIdx + dir];
    if (next) setStatus(next);
  };

  return (
    <SafeAreaView style={s.safe}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Lead Detail</Text>
        <View style={[s.statusPill, { backgroundColor: st.bg }]}>
          <Text style={[s.statusPillTxt, { color: st.color }]}>{st.emoji} {status}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Profile */}
        <View style={[s.profileCard, S.shadow]}>
          <View style={s.avatar}><Text style={s.avatarTxt}>{lead.name[0]}</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{lead.name}</Text>
            <Text style={s.phone}>{lead.phone}</Text>
            <View style={s.sourceRow}>
              <View style={[s.sourceDot, { backgroundColor: SOURCE_COLOR[lead.source] }]} />
              <Text style={s.sourceTxt}>{lead.source} · Added {lead.createdAt}</Text>
            </View>
          </View>
        </View>

        {/* Quick actions */}
        <View style={s.qaRow}>
          {[
            { emoji:"📞", label:"Call",      onPress:() => Linking.openURL(`tel:${lead.phone}`)                          },
            { emoji:"💬", label:"WhatsApp",  onPress:() => Linking.openURL(`https://wa.me/${lead.phone}`)               },
            { emoji:"📅", label:"Schedule",  onPress:() => {}                                                             },
            { emoji:"📝", label:"Note",      onPress:() => {}                                                             },
          ].map((qa, i, arr) => (
            <TouchableOpacity key={qa.label} style={[s.qaBtn, i < arr.length - 1 && s.qaBtnBorder]}
              onPress={qa.onPress}>
              <Text style={s.qaEmoji}>{qa.emoji}</Text>
              <Text style={s.qaLabel}>{qa.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Details */}
        <View style={s.section}>
          <SectionHeader title="Lead Details" />
          <Card style={{ padding: 0 }}>
            <RowItem label="Car of Interest" value={lead.carOfInterest}  />
            <RowItem label="Budget"          value={fmt(lead.budget)}    />
            <RowItem label="Source"          value={lead.source}         />
            <RowItem label="Added"           value={lead.createdAt}      />
            <RowItem label="Last Updated"    value={lead.updatedAt} last />
          </Card>
        </View>

        {/* Pipeline */}
        <View style={s.section}>
          <SectionHeader title="Pipeline Stage" />
          <Card>
            {/* Stage dots */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.stageTrack}>
              {STAGES.map((stg, i) => {
                const isCurrent = stg === status;
                const isPast    = i < stIdx;
                const stStyle   = STATUS_STYLE[stg];
                return (
                  <View key={stg} style={s.stageItem}>
                    <View style={[s.stageDot,
                      isCurrent && { backgroundColor: stStyle.color, borderColor: stStyle.color },
                      isPast    && { backgroundColor: C.p, borderColor: C.p },
                    ]}>
                      {(isCurrent || isPast) && (
                        <Text style={{ color: C.white, fontSize: 9, fontWeight: "800" }}>✓</Text>
                      )}
                    </View>
                    <Text style={[s.stageLabel,
                      isCurrent && { color: stStyle.color, fontWeight: "700" },
                      isPast    && { color: C.p },
                    ]}>{stg}</Text>
                    {i < STAGES.length - 1 && (
                      <View style={[s.stageLine, isPast && { backgroundColor: C.p }]} />
                    )}
                  </View>
                );
              })}
            </ScrollView>

            <Divider />

            <View style={s.moveRow}>
              <TouchableOpacity
                style={[s.prevBtn, stIdx === 0 && s.btnDisabled]}
                onPress={() => moveStage(-1)} disabled={stIdx === 0}>
                <Text style={[s.prevBtnTxt, stIdx === 0 && { color: C.ink3 }]}>← Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.nextBtn, stIdx === STAGES.length - 1 && s.btnDisabled, S.shadowP]}
                onPress={() => moveStage(1)} disabled={stIdx === STAGES.length - 1}>
                <Text style={s.nextBtnTxt}>Next Stage →</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* Notes */}
        <View style={s.section}>
          <SectionHeader title="Notes" />
          {lead.notes && (
            <View style={s.existingNote}>
              <Text style={s.existingNoteTxt}>{lead.notes}</Text>
              <Text style={s.existingNoteDate}>{lead.createdAt}</Text>
            </View>
          )}
          <TextInput style={s.noteInput}
            placeholder="Add a note…"
            placeholderTextColor={C.ink3}
            value={note} onChangeText={setNote}
            multiline textAlignVertical="top" />
          <TouchableOpacity
            style={[s.saveNoteBtn, S.shadowP, !note && { opacity: 0.5 }]}
            onPress={() => { /* save logic */ }} disabled={!note}>
            <Text style={s.saveNoteBtnTxt}>Save Note</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },

  header:      { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: C.white, borderBottomWidth: 1, borderBottomColor: C.line },
  backBtn:     { width: 34, height: 34, borderRadius: R.md, backgroundColor: C.bg, alignItems: "center", justifyContent: "center" },
  backArrow:   { fontSize: 18, color: C.ink2 },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: "800", color: C.ink, marginHorizontal: 10 },
  statusPill:  { borderRadius: R.full, paddingHorizontal: 10, paddingVertical: 5 },
  statusPillTxt:{ fontSize: 11, fontWeight: "700" },

  scroll: { paddingBottom: 40 },

  profileCard: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: C.white, padding: 20, borderBottomWidth: 1, borderBottomColor: C.line },
  avatar:      { width: 56, height: 56, borderRadius: 28, backgroundColor: C.pLight, alignItems: "center", justifyContent: "center" },
  avatarTxt:   { fontSize: 20, fontWeight: "800", color: C.p },
  name:        { fontSize: 18, fontWeight: "800", color: C.ink, marginBottom: 3 },
  phone:       { fontSize: 13, color: C.ink3, marginBottom: 5 },
  sourceRow:   { flexDirection: "row", alignItems: "center", gap: 6 },
  sourceDot:   { width: 7, height: 7, borderRadius: 4 },
  sourceTxt:   { fontSize: 11, color: C.ink3 },

  qaRow:       { flexDirection: "row", backgroundColor: C.white, borderBottomWidth: 1, borderBottomColor: C.line },
  qaBtn:       { flex: 1, alignItems: "center", paddingVertical: 14, gap: 4 },
  qaBtnBorder: { borderRightWidth: 1, borderRightColor: C.line },
  qaEmoji:     { fontSize: 20 },
  qaLabel:     { fontSize: 10, fontWeight: "700", color: C.ink2 },

  section: { paddingHorizontal: 16, marginTop: 20 },

  stageTrack: { paddingVertical: 8, gap: 0, alignItems: "center" },
  stageItem:  { flexDirection: "row", alignItems: "center" },
  stageDot:   { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: C.line, backgroundColor: C.white, alignItems: "center", justifyContent: "center" },
  stageLabel: { fontSize: 10, color: C.ink3, marginHorizontal: 4, width: 58, textAlign: "center" },
  stageLine:  { width: 14, height: 2, backgroundColor: C.line },

  moveRow:    { flexDirection: "row", gap: 10, marginTop: 8 },
  prevBtn:    { flex: 1, height: 42, borderRadius: R.md, borderWidth: 2, borderColor: C.line, alignItems: "center", justifyContent: "center" },
  prevBtnTxt: { fontSize: 13, fontWeight: "600", color: C.ink2 },
  nextBtn:    { flex: 1, height: 42, borderRadius: R.md, backgroundColor: C.p, alignItems: "center", justifyContent: "center" },
  nextBtnTxt: { fontSize: 13, fontWeight: "700", color: C.white },
  btnDisabled:{ opacity: 0.4 },

  existingNote:    { backgroundColor: C.white, borderRadius: R.md, padding: 14, marginBottom: 10, borderLeftWidth: 3, borderLeftColor: C.p, ...S.shadow },
  existingNoteTxt: { fontSize: 13, color: C.ink, lineHeight: 20, marginBottom: 6 },
  existingNoteDate:{ fontSize: 10, color: C.ink3 },

  noteInput:   { minHeight: 80, backgroundColor: C.white, borderRadius: R.md, borderWidth: 1.5, borderColor: C.line, padding: 14, fontSize: 14, color: C.ink, marginBottom: 10 },
  saveNoteBtn: { height: 44, backgroundColor: C.p, borderRadius: R.md, alignItems: "center", justifyContent: "center" },
  saveNoteBtnTxt:{ fontSize: 13, fontWeight: "700", color: C.white },
});

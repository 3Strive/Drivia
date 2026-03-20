import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { C, S, R } from "../constants/theme";
import { ScreenHeader, Card, SectionHeader, Badge } from "../components/ui";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PERIODS = ["7d", "30d", "3m", "6m", "1y"] as const;
type Period = typeof PERIODS[number];

const BARS: Record<Period, { label: string; val: number }[]> = {
  "7d":  [{ label:"Mon",val:12},{ label:"Tue",val:8 },{ label:"Wed",val:15},{ label:"Thu",val:10},{ label:"Fri",val:18},{ label:"Sat",val:22},{ label:"Sun",val:9 }],
  "30d": [{ label:"W1", val:48},{ label:"W2", val:62},{ label:"W3", val:54},{ label:"W4", val:71}],
  "3m":  [{ label:"Aug",val:180},{ label:"Sep",val:195},{ label:"Oct",val:218}],
  "6m":  [{ label:"May",val:145},{ label:"Jun",val:160},{ label:"Jul",val:155},{ label:"Aug",val:180},{ label:"Sep",val:195},{ label:"Oct",val:218}],
  "1y":  [{ label:"N",val:130},{ label:"D",val:145},{ label:"J",val:110},{ label:"F",val:125},{ label:"M",val:162},{ label:"A",val:140},{ label:"M2",val:175},{ label:"J2",val:165},{ label:"J3",val:185},{ label:"A2",val:180},{ label:"S",val:195},{ label:"O",val:218}],
};

const PLATFORMS = [
  { name:"WhatsApp",  enquiries:156, leads:42, conv:"27%", color:C.wa  },
  { name:"Facebook",  enquiries:89,  leads:18, conv:"20%", color:C.fb  },
  { name:"Instagram", enquiries:54,  leads:9,  conv:"17%", color:C.ig  },
  { name:"Walk-in",   enquiries:31,  leads:12, conv:"39%", color:C.gold},
];

const TOP_CARS = [
  { car:"Toyota Camry 2021",    sold:8,  revenue:"₦132M" },
  { car:"Honda CR-V 2020",      sold:5,  revenue:"₦102M" },
  { car:"Lexus RX350 2018",     sold:4,  revenue:"₦104M" },
  { car:"Toyota Corolla 2020",  sold:6,  revenue:"₦81M"  },
];

// ─── SIMPLE BAR CHART (no external lib needed) ────────────────────────────────
function BarChart({ bars }: { bars: { label: string; val: number }[] }) {
  const max = Math.max(...bars.map(b => b.val));
  return (
    <View style={s.barChart}>
      {bars.map((b, i) => {
        const pct = Math.max(6, Math.round((b.val / max) * 100));
        return (
          <View key={i} style={s.barItem}>
            <Text style={s.barVal}>₦{b.val}M</Text>
            <View style={s.barTrack}>
              <View style={[s.barFill, { height: `${pct}%` as any }]} />
            </View>
            <Text style={s.barLabel}>{b.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

// ─── SCREEN ───────────────────────────────────────────────────────────────────
export default function Analytics() {
  const [period, setPeriod] = useState<Period>("30d");
  const totalLeads = PLATFORMS.reduce((a, p) => a + p.leads, 0);

  return (
    <SafeAreaView style={s.safe}>
      <ScreenHeader title="Analytics" sub="Drivia" onBack={() => router.back()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Period picker */}
        <View style={s.periodRow}>
          {PERIODS.map(p => (
            <TouchableOpacity key={p} onPress={() => setPeriod(p)}
              style={[s.periodBtn, period === p && s.periodBtnActive]}>
              <Text style={[s.periodText, period === p && s.periodTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* KPI strip */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.kpiStrip}>
          {[
            { icon:"💰", label:"Revenue",   val:"₦218M",  color:C.p     },
            { icon:"🚗", label:"Cars Sold", val:"21",     color:C.green },
            { icon:"📊", label:"Avg Price", val:"₦21.4M", color:"#0D9488"},
            { icon:"🎯", label:"Leads",     val:"80",     color:C.gold  },
          ].map(k => (
            <View key={k.label} style={[s.kpiCard, { borderLeftColor: k.color }]}>
              <Text style={s.kpiIcon}>{k.icon}</Text>
              <Text style={[s.kpiVal, { color: k.color }]}>{k.val}</Text>
              <Text style={s.kpiLabel}>{k.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Revenue chart */}
        <View style={s.section}>
          <SectionHeader title="Revenue (₦M)" />
          <Card>
            <BarChart bars={BARS[period]} />
          </Card>
        </View>

        {/* Platform table */}
        <View style={s.section}>
          <SectionHeader title="Platform Performance" />
          <Card style={{ padding: 0 }}>
            <View style={[s.tableRow, s.tableHead]}>
              {["Platform", "Enquiries", "Leads", "Conv."].map(h => (
                <Text key={h} style={s.tableHeadText}>{h}</Text>
              ))}
            </View>
            {PLATFORMS.map((p, i) => (
              <View key={p.name}
                style={[s.tableRow, i < PLATFORMS.length - 1 && s.tableRowBorder]}>
                <View style={s.tableCell}>
                  <View style={[s.platDot, { backgroundColor: p.color }]} />
                  <Text style={s.platName}>{p.name}</Text>
                </View>
                <Text style={s.tableVal}>{p.enquiries}</Text>
                <Text style={s.tableVal}>{p.leads}</Text>
                <Text style={[s.tableVal, { color: C.green, fontWeight: "800" }]}>{p.conv}</Text>
              </View>
            ))}
          </Card>
        </View>

        {/* Top selling cars */}
        <View style={s.section}>
          <SectionHeader title="Top Selling Cars" />
          <Card>
            {TOP_CARS.map((c, i) => (
              <View key={c.car}
                style={[s.carRow, i < TOP_CARS.length - 1 && s.rowBorder]}>
                <View style={s.rankBadge}>
                  <Text style={s.rankText}>{i + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.carName}>{c.car}</Text>
                  <Text style={s.carRev}>{c.revenue}</Text>
                </View>
                <View style={s.soldBadge}>
                  <Text style={s.soldText}>{c.sold} sold</Text>
                </View>
              </View>
            ))}
          </Card>
        </View>

        {/* Lead source breakdown */}
        <View style={s.section}>
          <SectionHeader title="Lead Sources" />
          <Card>
            {PLATFORMS.map(p => {
              const pct = Math.round((p.leads / totalLeads) * 100);
              return (
                <View key={p.name} style={s.sourceRow}>
                  <View style={[s.platDot, { backgroundColor: p.color }]} />
                  <Text style={s.sourceName}>{p.name}</Text>
                  <View style={s.sourceBarWrap}>
                    <View style={[s.sourceBar, { width: `${pct}%` as any, backgroundColor: p.color }]} />
                  </View>
                  <Text style={s.sourcePct}>{pct}%</Text>
                </View>
              );
            })}
          </Card>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: C.bg },
  scroll: { paddingBottom: 40 },

  periodRow:       { flexDirection: "row", gap: 8, padding: 16, paddingBottom: 0 },
  periodBtn:       { flex: 1, paddingVertical: 8, borderRadius: R.md, borderWidth: 1.5, borderColor: C.line, alignItems: "center", backgroundColor: C.white },
  periodBtnActive: { borderColor: C.p, backgroundColor: C.pLight },
  periodText:      { fontSize: 12, fontWeight: "600", color: C.ink3 },
  periodTextActive:{ color: C.p, fontWeight: "700" },

  kpiStrip: { paddingHorizontal: 16, paddingVertical: 16, gap: 10 },
  kpiCard:  { backgroundColor: C.white, borderRadius: R.md, padding: 14, width: 120, borderLeftWidth: 3, ...S.shadow },
  kpiIcon:  { fontSize: 18, marginBottom: 6 },
  kpiVal:   { fontSize: 18, fontWeight: "800", marginBottom: 2 },
  kpiLabel: { fontSize: 10, color: C.ink3, fontWeight: "600" },

  section: { paddingHorizontal: 16, marginTop: 16 },

  barChart: { flexDirection: "row", alignItems: "flex-end", height: 130, gap: 5 },
  barItem:  { flex: 1, alignItems: "center", gap: 4 },
  barVal:   { fontSize: 8, color: C.ink3, fontWeight: "600" },
  barTrack: { flex: 1, width: "100%", backgroundColor: C.bg, borderRadius: 4, justifyContent: "flex-end", overflow: "hidden" },
  barFill:  { backgroundColor: C.p, borderRadius: 4, width: "100%" },
  barLabel: { fontSize: 9, color: C.ink3, fontWeight: "600" },

  tableHead:     { backgroundColor: C.bg, borderTopLeftRadius: R.lg, borderTopRightRadius: R.lg },
  tableRow:      { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 11 },
  tableRowBorder:{ borderBottomWidth: 1, borderBottomColor: C.line },
  tableHeadText: { flex: 1, fontSize: 10, fontWeight: "700", color: C.ink3, textTransform: "uppercase", letterSpacing: 0.3 },
  tableCell:     { flex: 1, flexDirection: "row", alignItems: "center", gap: 7 },
  platDot:       { width: 7, height: 7, borderRadius: 4 },
  platName:      { fontSize: 12, fontWeight: "600", color: C.ink },
  tableVal:      { flex: 1, fontSize: 12, color: C.ink2, textAlign: "center" },

  carRow:    { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 11 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: C.line },
  rankBadge: { width: 26, height: 26, borderRadius: R.sm, backgroundColor: C.pLight, alignItems: "center", justifyContent: "center" },
  rankText:  { fontSize: 12, fontWeight: "800", color: C.p },
  carName:   { fontSize: 13, fontWeight: "700", color: C.ink },
  carRev:    { fontSize: 11, color: C.ink3, marginTop: 2 },
  soldBadge: { backgroundColor: C.greenBg, borderRadius: R.sm, paddingHorizontal: 8, paddingVertical: 4 },
  soldText:  { fontSize: 11, fontWeight: "700", color: C.green },

  sourceRow:    { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  sourceName:   { fontSize: 12, color: C.ink2, width: 74 },
  sourceBarWrap:{ flex: 1, height: 6, backgroundColor: C.bg, borderRadius: 3, overflow: "hidden" },
  sourceBar:    { height: 6, borderRadius: 3 },
  sourcePct:    { fontSize: 11, fontWeight: "700", color: C.ink, width: 34, textAlign: "right" },
});

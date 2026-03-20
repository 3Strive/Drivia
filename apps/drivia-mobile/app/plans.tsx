import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { C, S, R } from "../constants/theme";
import { ScreenHeader, Card, SectionHeader, PrimaryBtn } from "../components/ui";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PLANS = [
  {
    id: "free",  name: "Free",  price: 0,     priceStr: "₦0",      period: "forever",
    features: ["5 listings", "10 broadcasts/mo", "2 platforms", "Basic leads"],
    missing:  ["CRM & analytics", "Inspection credits", "Listing boost", "WhatsApp API"],
  },
  {
    id: "pro",   name: "Pro",   price: 15000, priceStr: "₦15,000", period: "/month",
    popular: true,
    features: ["30 listings", "200 broadcasts/mo", "All 3 platforms", "Full CRM & analytics", "Inspection credits", "Priority support", "3 team members"],
    missing:  ["WhatsApp API", "Dedicated manager"],
  },
  {
    id: "vvip",  name: "VVIP", price: 45000, priceStr: "₦45,000", period: "/month",
    features: ["Unlimited listings", "Unlimited broadcasts", "All platforms + API", "Full CRM & analytics", "Unlimited inspection credits", "Dedicated account manager", "Custom branding"],
    missing:  [] as string[],
  },
];

const ADD_ONS = [
  { name: "Inspection Credit",   price: "₦2,500",  desc: "Per car"              },
  { name: "Extra Listings Pack", price: "₦5,000",  desc: "10 extra slots"        },
  { name: "Listing Boost",       price: "₦3,000",  desc: "Featured for 7 days"  },
  { name: "WhatsApp API",        price: "₦12,000", desc: "Per month"             },
];

// ─── SCREEN ───────────────────────────────────────────────────────────────────
export default function Plans() {
  const [billing,  setBilling]  = useState<"monthly" | "yearly">("monthly");
  const [selected, setSelected] = useState("pro");

  return (
    <SafeAreaView style={s.safe}>
      <ScreenHeader title="Plans & Billing" sub="Drivia" onBack={() => router.back()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Current plan card */}
        <View style={[s.currentCard, S.shadowP]}>
          <View>
            <Text style={s.currentEye}>Current Plan</Text>
            <Text style={s.currentName}>Pro Plan 🚀</Text>
            <Text style={s.currentRenew}>Renews Dec 1 · ₦15,000/month</Text>
          </View>
          <View>
            {[
              { label: "Listings",   used: 18, total: 30  },
              { label: "Broadcasts", used: 42, total: 200 },
            ].map(u => (
              <View key={u.label} style={s.usageRow}>
                <Text style={s.usageLbl}>{u.label} {u.used}/{u.total}</Text>
                <View style={s.usageBarWrap}>
                  <View style={[s.usageBar, { width: `${Math.round(u.used / u.total * 100)}%` as any }]} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Billing toggle */}
        <View style={s.toggle}>
          {(["monthly", "yearly"] as const).map(b => (
            <TouchableOpacity key={b} onPress={() => setBilling(b)}
              style={[s.toggleBtn, billing === b && s.toggleBtnActive]}>
              <Text style={[s.toggleTxt, billing === b && s.toggleTxtActive]}>
                {b === "yearly" ? "Yearly  (Save 20%)" : "Monthly"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Plan cards */}
        <View style={s.plansWrap}>
          {PLANS.map(plan => {
            const sel = selected === plan.id;
            const displayPrice = billing === "yearly" && plan.price > 0
              ? "₦" + Math.round(plan.price * 0.8).toLocaleString()
              : plan.priceStr;
            return (
              <TouchableOpacity key={plan.id} onPress={() => setSelected(plan.id)}
                style={[s.planCard, sel && s.planCardSel]} activeOpacity={0.85}>

                {(plan as any).popular && (
                  <View style={s.popularBanner}>
                    <Text style={s.popularTxt}>MOST POPULAR</Text>
                  </View>
                )}

                <View style={s.planTop}>
                  <View>
                    <Text style={s.planName}>{plan.name}</Text>
                    <Text style={s.planPeriod}>{plan.period}</Text>
                  </View>
                  <View style={s.planPriceRow}>
                    <Text style={[s.planPrice, sel && { color: C.p }]}>{displayPrice}</Text>
                    {sel && <View style={s.check}><Text style={{ color: C.white, fontSize: 10 }}>✓</Text></View>}
                  </View>
                </View>

                {plan.features.map(f => (
                  <View key={f} style={s.featRow}>
                    <Text style={[s.featDot, { color: C.green }]}>✓</Text>
                    <Text style={s.featTxt}>{f}</Text>
                  </View>
                ))}
                {plan.missing.map(f => (
                  <View key={f} style={s.featRow}>
                    <Text style={[s.featDot, { color: C.ink3 }]}>✗</Text>
                    <Text style={[s.featTxt, { color: C.ink3 }]}>{f}</Text>
                  </View>
                ))}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* CTA */}
        <View style={s.ctaSection}>
          <PrimaryBtn
            label={`Upgrade to ${PLANS.find(p => p.id === selected)?.name} →`}
            onPress={() => {}} />
          <Text style={s.payNote}>Paystack · Flutterwave · Bank Transfer · USSD</Text>
        </View>

        {/* Add-ons */}
        <View style={s.section}>
          <SectionHeader title="Add-ons" />
          <Card style={{ padding: 0 }}>
            {ADD_ONS.map((a, i) => (
              <View key={a.name}
                style={[s.addonRow, i < ADD_ONS.length - 1 && s.addonBorder]}>
                <View style={{ flex: 1 }}>
                  <Text style={s.addonName}>{a.name}</Text>
                  <Text style={s.addonDesc}>{a.desc}</Text>
                </View>
                <Text style={s.addonPrice}>{a.price}</Text>
                <TouchableOpacity style={s.addBtn}>
                  <Text style={s.addBtnTxt}>Add</Text>
                </TouchableOpacity>
              </View>
            ))}
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
  section:{ paddingHorizontal: 16, marginTop: 20 },

  currentCard:  { margin: 16, marginBottom: 0, borderRadius: R.lg, padding: 18, backgroundColor: C.p, gap: 14 },
  currentEye:   { fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: "600", marginBottom: 4 },
  currentName:  { fontSize: 20, fontWeight: "800", color: C.white, marginBottom: 4 },
  currentRenew: { fontSize: 11, color: "rgba(255,255,255,0.65)", marginBottom: 10 },
  usageRow:     { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 6 },
  usageLbl:     { fontSize: 11, color: "rgba(255,255,255,0.8)", width: 140 },
  usageBarWrap: { flex: 1, height: 5, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 3, overflow: "hidden" },
  usageBar:     { height: 5, backgroundColor: C.white, borderRadius: 3 },

  toggle:        { flexDirection: "row", margin: 16, backgroundColor: C.bg, borderRadius: R.md, borderWidth: 1, borderColor: C.line, overflow: "hidden" },
  toggleBtn:     { flex: 1, paddingVertical: 12, alignItems: "center" },
  toggleBtnActive:{ backgroundColor: C.white, borderRadius: R.md, margin: 3, ...S.shadow },
  toggleTxt:     { fontSize: 13, fontWeight: "600", color: C.ink3 },
  toggleTxtActive:{ color: C.p, fontWeight: "700" },

  plansWrap:    { paddingHorizontal: 16, gap: 12 },
  planCard:     { borderRadius: R.lg, borderWidth: 2, borderColor: C.line, backgroundColor: C.white, padding: 18, overflow: "hidden" },
  planCardSel:  { borderColor: C.p, backgroundColor: C.pLight },
  popularBanner:{ backgroundColor: C.p, marginHorizontal: -18, marginTop: -18, marginBottom: 14, paddingVertical: 5, alignItems: "center" },
  popularTxt:   { fontSize: 9, fontWeight: "800", color: C.white, letterSpacing: 1.5 },
  planTop:      { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 },
  planName:     { fontSize: 18, fontWeight: "800", color: C.ink },
  planPeriod:   { fontSize: 11, color: C.ink3, marginTop: 2 },
  planPriceRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  planPrice:    { fontSize: 22, fontWeight: "800", color: C.ink },
  check:        { width: 20, height: 20, borderRadius: 10, backgroundColor: C.p, alignItems: "center", justifyContent: "center" },
  featRow:      { flexDirection: "row", gap: 8, marginBottom: 5 },
  featDot:      { fontSize: 12, fontWeight: "800", width: 14 },
  featTxt:      { flex: 1, fontSize: 12, color: C.ink2, lineHeight: 18 },

  ctaSection: { padding: 16 },
  payNote:    { fontSize: 11, color: C.ink3, textAlign: "center", marginTop: 10 },

  addonRow:    { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16, paddingVertical: 12 },
  addonBorder: { borderBottomWidth: 1, borderBottomColor: C.line },
  addonName:   { fontSize: 13, fontWeight: "700", color: C.ink },
  addonDesc:   { fontSize: 11, color: C.ink3, marginTop: 2 },
  addonPrice:  { fontSize: 13, fontWeight: "800", color: C.p },
  addBtn:      { backgroundColor: C.pLight, borderRadius: R.sm, paddingHorizontal: 12, paddingVertical: 5 },
  addBtnTxt:   { fontSize: 11, fontWeight: "700", color: C.p },
});

import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, Switch,
} from "react-native";
import { router } from "expo-router";
import { C, S, R } from "../constants/theme";
import { ScreenHeader, Card, SectionHeader, Badge, Chip } from "../components/ui";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PLATFORMS = [
  { id:"whatsapp",  name:"WhatsApp",  color:C.wa, letter:"W",  followers:312,  posts:89,  reach:28400, conv:"27%", connected:true,  autoPost:true  },
  { id:"facebook",  name:"Facebook",  color:C.fb, letter:"f",  followers:1240, posts:156, reach:84200, conv:"20%", connected:true,  autoPost:true  },
  { id:"instagram", name:"Instagram", color:C.ig, letter:"ig", followers:890,  posts:112, reach:52100, conv:"17%", connected:true,  autoPost:false },
  { id:"twitter",   name:"Twitter/X", color:C.tw, letter:"X",  followers:0,    posts:0,   reach:0,     conv:"—",   connected:false, autoPost:false },
];

type PostStatus = "Live" | "Scheduled" | "Draft" | "Archived";
const POSTS: { id:string; title:string; platform:string; status:PostStatus; reach:number; enquiries:number; date:string }[] = [
  { id:"1", title:"2021 Toyota Camry — ₦16.5M",          platform:"WhatsApp",  status:"Live",      reach:287,  enquiries:14, date:"Nov 1"  },
  { id:"2", title:"New Arrival: Highlander 2022",          platform:"Facebook",  status:"Live",      reach:1840, enquiries:32, date:"Oct 30" },
  { id:"3", title:"Price Drop: Camry now ₦15.5M",          platform:"Instagram", status:"Scheduled", reach:0,    enquiries:0,  date:"Nov 3"  },
  { id:"4", title:"Verified Tokunbo Stock — Oct",          platform:"WhatsApp",  status:"Archived",  reach:301,  enquiries:22, date:"Oct 1"  },
  { id:"5", title:"Weekend Sale — 3 SUVs Available",       platform:"Facebook",  status:"Live",      reach:980,  enquiries:18, date:"Oct 28" },
];

const STATUS_STYLE: Record<PostStatus, [string, string]> = {
  Live:      [C.green,   C.greenBg],
  Scheduled: [C.gold,    C.goldBg ],
  Draft:     [C.p,       C.pLight ],
  Archived:  [C.ink3,    C.bg     ],
};

const PLAT_COLOR: Record<string, string> = {
  WhatsApp: C.wa, Facebook: C.fb, Instagram: C.ig, "Twitter/X": C.tw,
};

// ─── SCREEN ───────────────────────────────────────────────────────────────────
export default function ManageSocials() {
  const [platforms, setPlatforms] = useState(PLATFORMS);
  const [filter,    setFilter]    = useState("All");

  const toggleAutoPost = (id: string) =>
    setPlatforms(prev => prev.map(p => p.id === id ? { ...p, autoPost: !p.autoPost } : p));

  const filteredPosts = filter === "All"
    ? POSTS
    : POSTS.filter(p => p.platform === filter || p.status === filter);

  return (
    <SafeAreaView style={s.safe}>
      <ScreenHeader title="Manage Socials" sub="Drivia" onBack={() => router.back()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Platform cards */}
        <View style={s.section}>
          <SectionHeader title="Connected Platforms" />
          {platforms.map(pl => (
            <View key={pl.id} style={[s.platCard, S.shadow, !pl.connected && s.platCardOff]}>
              <View style={s.platTop}>
                <View style={[s.platIcon, { backgroundColor: pl.color + "20" }]}>
                  <Text style={[s.platLetter, { color: pl.color }]}>{pl.letter}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.platName}>{pl.name}</Text>
                  {pl.connected
                    ? <Text style={[s.platFollowers, { color: C.green }]}>{pl.followers.toLocaleString()} followers</Text>
                    : <Text style={s.platFollowers}>Not connected</Text>}
                </View>
                {pl.connected
                  ? <Badge label="✓ Connected" color={C.green} bg={C.greenBg} />
                  : <TouchableOpacity style={s.connectBtn}><Text style={s.connectBtnTxt}>Connect</Text></TouchableOpacity>}
              </View>

              {pl.connected && (
                <>
                  <View style={s.platStats}>
                    {[
                      { label:"Posts",  val:String(pl.posts)              },
                      { label:"Reach",  val:pl.reach.toLocaleString()     },
                      { label:"Conv.",  val:pl.conv                       },
                    ].map(st => (
                      <View key={st.label} style={s.platStat}>
                        <Text style={s.platStatVal}>{st.val}</Text>
                        <Text style={s.platStatLbl}>{st.label}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={s.autoPostRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={s.autoPostLbl}>Auto-post new listings</Text>
                      <Text style={s.autoPostSub}>Share new cars to {pl.name} automatically</Text>
                    </View>
                    <Switch
                      value={pl.autoPost}
                      onValueChange={() => toggleAutoPost(pl.id)}
                      trackColor={{ false: C.line, true: pl.color }}
                      thumbColor={C.white} />
                  </View>
                </>
              )}
            </View>
          ))}
        </View>

        {/* Posts */}
        <View style={s.section}>
          <SectionHeader title="All Posts" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.filterRow}>
            {["All","WhatsApp","Facebook","Instagram","Live","Scheduled","Archived"].map(f => (
              <Chip key={f} label={f} selected={filter === f} onPress={() => setFilter(f)} />
            ))}
          </ScrollView>

          {filteredPosts.map(post => {
            const [stColor, stBg] = STATUS_STYLE[post.status];
            return (
              <View key={post.id} style={[s.postCard, S.shadow]}>
                <View style={s.postTop}>
                  <View style={[s.platDot, { backgroundColor: PLAT_COLOR[post.platform] ?? C.ink3 }]} />
                  <Text style={s.postTitle} numberOfLines={1}>{post.title}</Text>
                  <Badge label={post.status} color={stColor} bg={stBg} />
                </View>
                <View style={s.postMeta}>
                  <Text style={s.postDate}>{post.platform} · {post.date}</Text>
                  {post.reach > 0 && (
                    <View style={s.postStats}>
                      <Text style={s.postStat}>👁 {post.reach.toLocaleString()}</Text>
                      <Text style={s.postStat}>💬 {post.enquiries}</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: C.bg },
  scroll:  { paddingBottom: 40 },
  section: { paddingHorizontal: 16, marginTop: 20 },

  platCard:    { backgroundColor: C.white, borderRadius: R.lg, padding: 16, marginBottom: 12 },
  platCardOff: { opacity: 0.55 },
  platTop:     { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 },
  platIcon:    { width: 42, height: 42, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  platLetter:  { fontSize: 14, fontWeight: "900" },
  platName:    { fontSize: 14, fontWeight: "800", color: C.ink },
  platFollowers:{ fontSize: 11, color: C.ink3, marginTop: 2 },
  connectBtn:  { backgroundColor: C.pLight, borderRadius: R.sm, paddingHorizontal: 10, paddingVertical: 6 },
  connectBtnTxt:{ fontSize: 11, fontWeight: "700", color: C.p },

  platStats:    { flexDirection: "row", backgroundColor: C.bg, borderRadius: R.md, padding: 12, marginBottom: 12 },
  platStat:     { flex: 1, alignItems: "center", borderRightWidth: 1, borderRightColor: C.line },
  platStatVal:  { fontSize: 14, fontWeight: "800", color: C.ink },
  platStatLbl:  { fontSize: 10, color: C.ink3, marginTop: 2 },

  autoPostRow: { flexDirection: "row", alignItems: "center" },
  autoPostLbl: { fontSize: 13, fontWeight: "700", color: C.ink },
  autoPostSub: { fontSize: 11, color: C.ink3, marginTop: 2 },

  filterRow: { paddingBottom: 14, gap: 8 },

  postCard:  { backgroundColor: C.white, borderRadius: R.md, padding: 14, marginBottom: 10 },
  postTop:   { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  platDot:   { width: 8, height: 8, borderRadius: 4 },
  postTitle: { flex: 1, fontSize: 13, fontWeight: "700", color: C.ink },
  postMeta:  { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  postDate:  { fontSize: 11, color: C.ink3 },
  postStats: { flexDirection: "row", gap: 12 },
  postStat:  { fontSize: 11, fontWeight: "600", color: C.ink2 },
});

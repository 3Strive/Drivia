import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from "react-native";
import { C, S } from "../../constants/theme";
import { Badge, Card, ScreenHeader, SectionHeader } from "../../components/ui";

type PlatformId = "whatsapp" | "facebook" | "instagram";
const PLATFORMS = [
  { id:"whatsapp"  as PlatformId, name:"WhatsApp",  color:C.wa, letter:"W"  },
  { id:"facebook"  as PlatformId, name:"Facebook",  color:C.fb, letter:"f"  },
  { id:"instagram" as PlatformId, name:"Instagram", color:C.ig, letter:"ig" },
];
const RECENT = [
  { id:"1", title:"New Camry just landed!",         platform:"whatsapp",  reach:320, enquiries:18, date:"Oct 5",  status:"Sent"      },
  { id:"2", title:"Weekend promo: SUVs from 18M",  platform:"facebook",  reach:810, enquiries:34, date:"Oct 3",  status:"Sent"      },
  { id:"3", title:"Inspection-certified cars only", platform:"instagram", reach:540, enquiries:21, date:"Oct 1",  status:"Sent"      },
  { id:"4", title:"October deals don't miss out",   platform:"whatsapp",  reach:0,   enquiries:0,  date:"Oct 10", status:"Scheduled" },
];
const PLAT_COLOR: Record<string,string> = { whatsapp:C.wa, facebook:C.fb, instagram:C.ig };
const PLAT_LETTER: Record<string,string> = { whatsapp:"W", facebook:"f", instagram:"ig" };

export default function Broadcast() {
  const [compose,  setCompose]  = useState(false);
  const [message,  setMessage]  = useState("");
  const [selPlats, setSelPlats] = useState<PlatformId[]>(["whatsapp"]);
  const [filter,   setFilter]   = useState("All");
  const togglePlat = (id: PlatformId) =>
    setSelPlats(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const filtered = filter === "All" ? RECENT : RECENT.filter(b => b.platform === filter);

  return (
    <View style={s.screen}>
      <ScreenHeader title="Broadcast" right={
        <TouchableOpacity style={s.composeBtn} onPress={() => setCompose(true)}>
          <Text style={s.composeBtnText}>Compose</Text>
        </TouchableOpacity>
      } />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.statsRow}>
          {[
            { icon:"📣", label:"Sent",       val:"12",   color:C.p    },
            { icon:"👁️", label:"Reach",      val:"4.2K", color:C.green},
            { icon:"💬", label:"Enquiries",  val:"142",  color:C.fb   },
            { icon:"📈", label:"Conv. Rate", val:"3.4%", color:C.gold },
          ].map(st => (
            <View key={st.label} style={[s.statCard, { borderColor:st.color+"30" }]}>
              <Text style={{ fontSize:20, marginBottom:6 }}>{st.icon}</Text>
              <Text style={[s.statVal, { color:st.color }]}>{st.val}</Text>
              <Text style={s.statLabel}>{st.label}</Text>
            </View>
          ))}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filterRow}>
          {["All","whatsapp","facebook","instagram"].map(f => {
            const active = filter === f;
            const color = f === "All" ? C.p : PLAT_COLOR[f];
            return (
              <TouchableOpacity key={f} style={[s.filterChip, active && { backgroundColor:color, borderColor:color }]} onPress={() => setFilter(f)}>
                <Text style={[s.filterText, active && { color:C.white }]}>{f === "All" ? "All" : f.charAt(0).toUpperCase()+f.slice(1)}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={s.section}>
          <SectionHeader title="Recent Broadcasts" />
          {filtered.map(b => (
            <Card key={b.id} style={{ marginBottom:10 }}>
              <View style={s.bRow}>
                <View style={[s.platCircle, { backgroundColor:PLAT_COLOR[b.platform]+"22" }]}>
                  <Text style={[s.platLetter, { color:PLAT_COLOR[b.platform] }]}>{PLAT_LETTER[b.platform]}</Text>
                </View>
                <View style={{ flex:1 }}>
                  <Text style={s.bTitle}>{b.title}</Text>
                  <Text style={s.bDate}>{b.date}</Text>
                </View>
                <Badge label={b.status} color={b.status === "Sent" ? C.green : C.gold} />
              </View>
              {b.status === "Sent" && (
                <View style={s.bStats}>
                  {([["Reach", String(b.reach)],["Enquiries", String(b.enquiries)],["Conv.", b.reach > 0 ? ((b.enquiries/b.reach)*100).toFixed(1)+"%" : "0%"]] as [string,string][]).map(([k,v]) => (
                    <View key={k} style={s.bStat}>
                      <Text style={s.bStatVal}>{v}</Text>
                      <Text style={s.bStatLabel}>{k}</Text>
                    </View>
                  ))}
                </View>
              )}
            </Card>
          ))}
        </View>
        <View style={{ height:24 }} />
      </ScrollView>
      <Modal visible={compose} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setCompose(false)}>
        <View style={s.modal}>
          <View style={s.handle} />
          <View style={s.mHeader}>
            <Text style={s.mTitle}>New Broadcast</Text>
            <TouchableOpacity onPress={() => setCompose(false)}><Text style={s.mClose}>X</Text></TouchableOpacity>
          </View>
          <ScrollView style={{ paddingHorizontal:20 }} showsVerticalScrollIndicator={false}>
            <Text style={s.fieldLabel}>Send to</Text>
            <View style={s.platRow}>
              {PLATFORMS.map(pl => {
                const sel = selPlats.includes(pl.id);
                return (
                  <TouchableOpacity key={pl.id} onPress={() => togglePlat(pl.id)}
                    style={[s.platBtn, sel && { borderColor:pl.color, backgroundColor:pl.color+"18" }]}>
                    <Text style={[s.platBtnLetter, { color:sel?pl.color:C.ink3 }]}>{pl.letter}</Text>
                    <Text style={[s.platBtnName, { color:sel?pl.color:C.ink3 }]}>{pl.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={s.fieldLabel}>Message</Text>
            <TextInput style={s.msgBox} placeholder="Type your broadcast message..."
              value={message} onChangeText={setMessage} multiline numberOfLines={5} textAlignVertical="top" />
            {selPlats.includes("whatsapp") && message.length > 0 && (
              <View style={s.preview}>
                <Text style={s.previewLabel}>WhatsApp Preview</Text>
                <View style={s.waBubble}>
                  <Text style={s.waBubbleText}>{message}</Text>
                  <Text style={s.waBubbleTime}>10:42 checkcheck</Text>
                </View>
              </View>
            )}
            <Text style={s.fieldLabel}>Audience</Text>
            <View style={s.audienceRow}>
              {["All contacts","SUV buyers","Budget buyers","Luxury"].map(a => (
                <TouchableOpacity key={a} style={s.audienceChip}>
                  <Text style={s.audienceChipText}>{a}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={s.mActions}>
              <TouchableOpacity style={[s.sendBtn, { flex:1, backgroundColor:C.p }]} onPress={() => setCompose(false)}>
                <Text style={s.sendBtnText}>Send Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.sendBtn, { backgroundColor:C.pLight }]} onPress={() => setCompose(false)}>
                <Text style={[s.sendBtnText, { color:C.p }]}>Schedule</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height:40 }} />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  screen:      { flex:1, backgroundColor:C.bg },
  composeBtn:  { backgroundColor:C.p, borderRadius:10, paddingHorizontal:12, paddingVertical:8 },
  composeBtnText: { color:C.white, fontWeight:"700", fontSize:13 },
  statsRow:    { paddingHorizontal:20, gap:10, paddingBottom:14 },
  statCard:    { backgroundColor:C.white, borderRadius:14, padding:14, width:110, borderWidth:1.5 },
  statVal:     { fontSize:20, fontWeight:"800", color:C.ink, marginBottom:2 },
  statLabel:   { fontSize:10, color:C.ink3, fontWeight:"500" },
  filterRow:   { paddingHorizontal:20, gap:8, marginBottom:16 },
  filterChip:  { paddingHorizontal:14, paddingVertical:8, borderRadius:10, backgroundColor:C.white, borderWidth:1.5, borderColor:C.line },
  filterText:  { fontSize:12, fontWeight:"600", color:C.ink3 },
  section:     { paddingHorizontal:20 },
  bRow:        { flexDirection:"row", alignItems:"center", gap:10, marginBottom:10 },
  platCircle:  { width:36, height:36, borderRadius:18, alignItems:"center", justifyContent:"center" },
  platLetter:  { fontSize:13, fontWeight:"900" },
  bTitle:      { fontSize:13, fontWeight:"700", color:C.ink },
  bDate:       { fontSize:11, color:C.ink3, marginTop:1 },
  bStats:      { flexDirection:"row", borderTopWidth:1, borderTopColor:C.line, paddingTop:10 },
  bStat:       { flex:1, alignItems:"center" },
  bStatVal:    { fontSize:15, fontWeight:"800", color:C.ink },
  bStatLabel:  { fontSize:10, color:C.ink3, marginTop:2 },
  modal:       { flex:1, backgroundColor:C.white, borderTopLeftRadius:24, borderTopRightRadius:24 },
  handle:      { width:40, height:4, backgroundColor:C.line, borderRadius:2, alignSelf:"center", marginTop:12 },
  mHeader:     { flexDirection:"row", alignItems:"center", justifyContent:"space-between", paddingHorizontal:20, paddingVertical:16 },
  mTitle:      { fontSize:18, fontWeight:"800", color:C.ink },
  mClose:      { fontSize:16, color:C.ink3, fontWeight:"700" },
  fieldLabel:  { fontSize:12, fontWeight:"700", color:C.ink2, marginBottom:8, marginTop:16 },
  platRow:     { flexDirection:"row", gap:8 },
  platBtn:     { flex:1, borderRadius:12, borderWidth:1.5, borderColor:C.line, padding:10, alignItems:"center", gap:4, backgroundColor:C.white },
  platBtnLetter: { fontSize:15, fontWeight:"900" },
  platBtnName: { fontSize:10, fontWeight:"700" },
  msgBox:      { backgroundColor:C.bg, borderRadius:12, padding:14, fontSize:14, color:C.ink, minHeight:110, borderWidth:1.5, borderColor:C.line },
  preview:     { marginTop:14, backgroundColor:"#E3F2E1", borderRadius:12, padding:12 },
  previewLabel:{ fontSize:10, fontWeight:"700", color:C.green, marginBottom:8 },
  waBubble:    { backgroundColor:"#DCF8C6", borderRadius:12, borderBottomRightRadius:3, padding:10 },
  waBubbleText:{ fontSize:13, color:"#1C1C1C", lineHeight:19 },
  waBubbleTime:{ fontSize:10, color:"#667781", textAlign:"right", marginTop:4 },
  audienceRow: { flexDirection:"row", flexWrap:"wrap", gap:8 },
  audienceChip:{ paddingHorizontal:12, paddingVertical:7, borderRadius:10, backgroundColor:C.pLight },
  audienceChipText: { fontSize:12, fontWeight:"600", color:C.p },
  mActions:    { flexDirection:"row", gap:10, marginTop:24 },
  sendBtn:     { height:50, borderRadius:13, alignItems:"center", justifyContent:"center", paddingHorizontal:20 },
  sendBtnText: { fontSize:14, fontWeight:"700", color:C.white },
});

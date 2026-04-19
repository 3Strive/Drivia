import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { C } from '../../constants/theme';

const { width } = Dimensions.get('window');
const TOTAL = 7;

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface PlanOption {
  id: string;
  name: string;
  price: string;
  period: string;
  popular: boolean;
  features: string[];
}
interface PlatOption {
  id: string;
  name: string;
  letter: string;
  color: string;
  desc: string;
}

const PLANS: PlanOption[] = [
  {
    id: 'free',
    name: 'Free',
    price: '₦0',
    period: 'forever',
    popular: false,
    features: ['5 listings', '10 broadcasts', '2 platforms', 'Basic leads'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₦15K',
    period: 'per month',
    popular: true,
    features: ['30 listings', '200 broadcasts', '3 platforms', 'Full CRM'],
  },
  {
    id: 'vvip',
    name: 'VVIP',
    price: '₦45K',
    period: 'per month',
    popular: false,
    features: ['Unlimited', 'Unlimited', 'All platforms', 'Manager'],
  },
];

const PLATFORMS: PlatOption[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    letter: 'W',
    color: C.wa,
    desc: 'Business messaging',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    letter: 'f',
    color: C.fb,
    desc: 'Page + Marketplace',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    letter: 'ig',
    color: C.ig,
    desc: 'Photo listings',
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    letter: 'X',
    color: C.tw,
    desc: 'Reach & visibility',
  },
];

const CAR_TYPES = [
  'Brand New',
  'Tokunbo',
  'Nigerian Used',
  'SUVs',
  'Saloon Cars',
  'Trucks',
  'Luxury',
  'Budget',
];

// ─── PROGRESS ────────────────────────────────────────────────────────────────
function Progress({ step }: { step: number }) {
  return (
    <View style={s.progressRow}>
      {Array.from({ length: TOTAL }).map((_, i) => (
        <View
          key={i}
          style={[
            s.dot,
            i + 1 === step
              ? s.dotActive
              : i + 1 < step
                ? s.dotDone
                : s.dotPending,
          ]}
        />
      ))}
    </View>
  );
}

// ─── STEP 1: Phone ────────────────────────────────────────────────────────────
function Step1({ onNext }: { onNext: () => void }) {
  const [phone, setPhone] = useState('');
  return (
    <View style={s.step}>
      <Text style={s.eyebrow}>Step 1 of {TOTAL}</Text>
      <Text style={s.title}>Welcome to Drivia 👋</Text>
      <Text style={s.sub}>Enter your WhatsApp number to get started.</Text>

      <Text style={s.label}>WhatsApp / Phone Number</Text>
      <View style={s.inputRow}>
        <View style={s.flag}>
          <Text style={{ fontSize: 20 }}>🇳🇬</Text>
        </View>
        <TextInput
          style={[
            s.input,
            {
              flex: 1,
              borderLeftWidth: 0,
              borderRadius: 0,
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
            },
          ]}
          placeholder="0801 234 5678"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>
      <Text style={s.hint}>Used as your primary contact on Drivia.</Text>

      <TouchableOpacity style={[s.waBtn]} onPress={onNext} activeOpacity={0.85}>
        <Text style={s.waBtnText}>📱 Continue with WhatsApp</Text>
      </TouchableOpacity>

      <View style={s.divRow}>
        <View style={s.divLine} />
        <Text style={s.divText}>or</Text>
        <View style={s.divLine} />
      </View>

      <TouchableOpacity onPress={onNext}>
        <Text style={s.linkText}>I will use email instead →</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── STEP 2: OTP ──────────────────────────────────────────────────────────────
function Step2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const refs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleOtp = (val: string, idx: number) => {
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 3) refs[idx + 1].current?.focus();
  };

  return (
    <View style={s.step}>
      <Text style={s.eyebrow}>Step 2 of {TOTAL}</Text>
      <Text style={s.title}>Verify your number</Text>
      <Text style={s.sub}>
        We sent a 4-digit code to{' '}
        <Text style={{ fontWeight: '700', color: C.ink }}>0801 234 5678</Text>
      </Text>

      <View style={s.otpRow}>
        {otp.map((v, i) => (
          <TextInput
            key={i}
            ref={refs[i]}
            style={[s.otpBox, v ? s.otpBoxFilled : null]}
            value={v}
            onChangeText={(t) => handleOtp(t, i)}
            maxLength={1}
            keyboardType="number-pad"
            textAlign="center"
          />
        ))}
      </View>

      <View style={s.navRow}>
        <TouchableOpacity style={s.backBtn} onPress={onBack}>
          <Text style={s.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.nextBtn, { flex: 1 }]}
          onPress={onNext}
          activeOpacity={0.85}
        >
          <Text style={s.nextBtnText}>Verify & Continue →</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ marginTop: 14, alignItems: 'center' }}>
        <Text style={s.linkText}>Resend code in 0:45</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── STEP 3: Dealership Details ───────────────────────────────────────────────
function Step3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [biz, setBiz] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [about, setAbout] = useState('');

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={s.step}>
        <Text style={s.eyebrow}>Step 3 of {TOTAL}</Text>
        <Text style={s.title}>Your dealership details</Text>
        <Text style={s.sub}>Shown on your public profile and listings.</Text>

        {/* Logo upload placeholder */}
        <View style={s.logoUpload}>
          <Text style={{ fontSize: 28 }}>📷</Text>
          <Text style={[s.hint, { color: C.p, marginTop: 4 }]}>
            Upload Logo
          </Text>
        </View>

        <Text style={s.label}>Business Name *</Text>
        <TextInput
          style={s.input}
          placeholder="e.g. Lagos Auto Hub"
          value={biz}
          onChangeText={setBiz}
        />

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Your Name *</Text>
            <TextInput
              style={s.input}
              placeholder="Full name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Est. Year</Text>
            <TextInput
              style={s.input}
              placeholder="2019"
              keyboardType="number-pad"
              value={year}
              onChangeText={setYear}
            />
          </View>
        </View>

        <Text style={s.label}>About Your Dealership</Text>
        <TextInput
          style={[s.input, s.textarea]}
          placeholder="What makes you stand out? e.g. Certified Tokunbo SUVs, fully inspected…"
          value={about}
          onChangeText={setAbout}
          multiline
          numberOfLines={3}
        />

        <View style={s.navRow}>
          <TouchableOpacity style={s.backBtn} onPress={onBack}>
            <Text style={s.backBtnText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.nextBtn, { flex: 1 }]}
            onPress={onNext}
            activeOpacity={0.85}
          >
            <Text style={s.nextBtnText}>Continue →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// ─── STEP 4: Location & Inventory ─────────────────────────────────────────────
function Step4({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    'Brand New',
    'Tokunbo',
  ]);
  const toggle = (t: string) =>
    setSelectedTypes((p) =>
      p.includes(t) ? p.filter((x) => x !== t) : [...p, t],
    );

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={s.step}>
        <Text style={s.eyebrow}>Step 4 of {TOTAL}</Text>
        <Text style={s.title}>Where do you operate?</Text>
        <Text style={s.sub}>Select your location and car types.</Text>

        <Text style={s.label}>Primary Location *</Text>
        <View style={[s.input, { justifyContent: 'center' }]}>
          <Text style={{ color: C.ink3 }}>Lekki, Lagos</Text>
        </View>

        <Text style={s.label}>Car types you sell</Text>
        <View style={s.chipWrap}>
          {CAR_TYPES.map((t) => {
            const sel = selectedTypes.includes(t);
            return (
              <TouchableOpacity
                key={t}
                onPress={() => toggle(t)}
                style={[s.chip, sel && s.chipSelected]}
              >
                <Text style={[s.chipText, sel && s.chipTextSelected]}>{t}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={s.label}>Monthly stock volume</Text>
        <View style={[s.input, { justifyContent: 'center' }]}>
          <Text style={{ color: C.ink3 }}>1 – 5 cars/month</Text>
        </View>

        <View style={s.navRow}>
          <TouchableOpacity style={s.backBtn} onPress={onBack}>
            <Text style={s.backBtnText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.nextBtn, { flex: 1 }]}
            onPress={onNext}
            activeOpacity={0.85}
          >
            <Text style={s.nextBtnText}>Continue →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// ─── STEP 5: Platforms ────────────────────────────────────────────────────────
function Step5({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [selected, setSelected] = useState<string[]>(['whatsapp', 'facebook']);
  const toggle = (id: string) =>
    setSelected((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  return (
    <View style={s.step}>
      <Text style={s.eyebrow}>Step 5 of {TOTAL}</Text>
      <Text style={s.title}>Connect your platforms</Text>
      <Text style={s.sub}>Auto-post new listings to these channels.</Text>

      {PLATFORMS.map((pl) => {
        const sel = selected.includes(pl.id);
        return (
          <TouchableOpacity
            key={pl.id}
            onPress={() => toggle(pl.id)}
            style={[s.platCard, sel && s.platCardSelected]}
          >
            <View style={[s.platIcon, { backgroundColor: pl.color + '22' }]}>
              <Text style={[s.platLetter, { color: pl.color }]}>
                {pl.letter}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.platName}>{pl.name}</Text>
              <Text style={s.platDesc}>{pl.desc}</Text>
            </View>
            {sel && (
              <View style={s.checkCircle}>
                <Text
                  style={{ color: C.white, fontSize: 10, fontWeight: '800' }}
                >
                  ✓
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}

      <View style={s.tipBox}>
        <Text style={s.tipTitle}>💡 You can connect these later</Text>
        <Text style={s.tipSub}>
          From Settings → Manage Socials at any time.
        </Text>
      </View>

      <View style={s.navRow}>
        <TouchableOpacity style={s.backBtn} onPress={onBack}>
          <Text style={s.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.nextBtn, { flex: 1 }]}
          onPress={onNext}
          activeOpacity={0.85}
        >
          <Text style={s.nextBtnText}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── STEP 6: Plan ─────────────────────────────────────────────────────────────
function Step6({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [selected, setSelected] = useState('free');
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={s.step}>
        <Text style={s.eyebrow}>Step 6 of {TOTAL}</Text>
        <Text style={s.title}>Choose your plan</Text>
        <Text style={s.sub}>Start free, upgrade anytime. No card needed.</Text>

        {PLANS.map((plan) => {
          const sel = selected === plan.id;
          return (
            <TouchableOpacity
              key={plan.id}
              onPress={() => setSelected(plan.id)}
              style={[s.planCard, sel && s.planCardSelected]}
            >
              {plan.popular && (
                <View style={s.popularBadge}>
                  <Text style={s.popularText}>POPULAR</Text>
                </View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <View>
                  <Text style={s.planName}>{plan.name}</Text>
                  <Text style={s.planPrice}>
                    {plan.price} <Text style={s.planPeriod}>{plan.period}</Text>
                  </Text>
                </View>
                {sel && (
                  <View style={s.checkCircle}>
                    <Text
                      style={{
                        color: C.white,
                        fontSize: 10,
                        fontWeight: '800',
                      }}
                    >
                      ✓
                    </Text>
                  </View>
                )}
              </View>
              <View style={{ marginTop: 10, gap: 4 }}>
                {plan.features.map((f) => (
                  <Text key={f} style={s.planFeat}>
                    ✓ {f}
                  </Text>
                ))}
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={[s.tipBox, { backgroundColor: C.pLight }]}>
          <Text style={[s.tipTitle, { color: C.p }]}>
            🎁 14-day free trial on Pro
          </Text>
          <Text style={[s.tipSub, { color: C.ink3 }]}>
            Try all Pro features. Cancel before day 14.
          </Text>
        </View>

        <View style={s.navRow}>
          <TouchableOpacity style={s.backBtn} onPress={onBack}>
            <Text style={s.backBtnText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.nextBtn, { flex: 1 }]}
            onPress={onNext}
            activeOpacity={0.85}
          >
            <Text style={s.nextBtnText}>Continue →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// ─── STEP 7: Success ──────────────────────────────────────────────────────────
function Step7() {
  const checks = [
    { icon: '📋', label: 'Dealer profile created' },
    { icon: '💬', label: 'WhatsApp & Facebook connected' },
    { icon: '🚀', label: 'Free plan activated' },
    { icon: '🗺️', label: 'Listed on Drivia Marketplace' },
  ];
  return (
    <View style={[s.step, { alignItems: 'center' }]}>
      <View style={s.successRing}>
        <Text style={{ fontSize: 32 }}>✓</Text>
      </View>
      <Text style={s.eyebrow}>You are all set!</Text>
      <Text style={[s.title, { textAlign: 'center' }]}>
        Welcome to Drivia 🚗
      </Text>
      <Text style={[s.sub, { textAlign: 'center' }]}>
        Your dealer account is ready.
      </Text>

      <View style={{ width: '100%', gap: 10, marginBottom: 28 }}>
        {checks.map((c) => (
          <View key={c.label} style={s.checkRow}>
            <View style={s.checkIconBox}>
              <Text>{c.icon}</Text>
            </View>
            <Text style={s.checkLabel}>{c.label}</Text>
            <Text style={s.checkDone}>✓</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[s.nextBtn, { width: '100%' }]}
        onPress={() => router.replace('/(tabs)')}
        activeOpacity={0.85}
      >
        <Text style={s.nextBtnText}>Go to my Dashboard →</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 14 }}
        onPress={() => router.replace('/(tabs)/inventory')}
      >
        <Text style={[s.linkText, { color: C.ink3 }]}>
          + Add my first listing now
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Onboarding() {
  const [step, setStep] = useState(1);
  const next = () => setStep((p) => Math.min(p + 1, TOTAL));
  const back = () => setStep((p) => Math.max(p - 1, 1));

  const steps = [
    <Step1 key={1} onNext={next} />,
    <Step2 key={2} onNext={next} onBack={back} />,
    <Step3 key={3} onNext={next} onBack={back} />,
    <Step4 key={4} onNext={next} onBack={back} />,
    <Step5 key={5} onNext={next} onBack={back} />,
    <Step6 key={6} onNext={next} onBack={back} />,
    <Step7 key={7} />,
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={s.header}>
        <View style={s.logo}>
          <Text style={s.logoText}>D</Text>
        </View>
        <Text style={s.logoName}>Drivia</Text>
      </View>

      {/* Progress bar */}
      <View style={s.progressWrap}>
        <View style={s.progressTrack}>
          <View
            style={[s.progressFill, { width: `${(step / TOTAL) * 100}%` }]}
          />
        </View>
        <Progress step={step} />
      </View>

      {steps[step - 1]}
    </KeyboardAvoidingView>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 8,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: C.p,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { color: C.white, fontWeight: '800', fontSize: 16 },
  logoName: { fontSize: 18, fontWeight: '800', color: C.ink },

  progressWrap: { paddingHorizontal: 20, marginBottom: 4 },
  progressTrack: {
    height: 3,
    backgroundColor: C.line,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: { height: '100%', backgroundColor: C.p, borderRadius: 2 },
  progressRow: { flexDirection: 'row', gap: 5 },
  dot: { height: 4, borderRadius: 2 },
  dotActive: { width: 24, backgroundColor: C.p },
  dotDone: { width: 14, backgroundColor: '#a78bfa' },
  dotPending: { width: 14, backgroundColor: C.line },

  step: { flex: 1, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: C.p,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: C.ink,
    lineHeight: 30,
    marginBottom: 6,
  },
  sub: { fontSize: 14, color: C.ink3, lineHeight: 22, marginBottom: 22 },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: C.ink2,
    marginBottom: 6,
    marginTop: 4,
  },
  hint: { fontSize: 11, color: C.ink3, marginTop: 5 },

  inputRow: { flexDirection: 'row' },
  flag: {
    width: 48,
    height: 46,
    backgroundColor: C.white,
    borderWidth: 1.5,
    borderColor: C.line,
    borderRadius: 12,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 46,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: C.line,
    backgroundColor: C.white,
    paddingHorizontal: 14,
    fontSize: 14,
    color: C.ink,
    marginBottom: 4,
  },
  textarea: { height: 88, paddingTop: 12, textAlignVertical: 'top' },

  otpRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  otpBox: {
    flex: 1,
    height: 58,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: C.line,
    backgroundColor: C.white,
    fontSize: 26,
    fontWeight: '800',
    color: C.p,
    textAlign: 'center',
  },
  otpBoxFilled: { borderColor: C.p },

  navRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  backBtn: {
    height: 50,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: C.line,
    backgroundColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: { fontSize: 14, fontWeight: '700', color: C.ink2 },
  nextBtn: {
    height: 50,
    borderRadius: 14,
    backgroundColor: C.p,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnText: { fontSize: 14, fontWeight: '700', color: C.white },
  linkText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.p,
    textAlign: 'center',
  },

  waBtn: {
    height: 50,
    borderRadius: 13,
    backgroundColor: C.wa,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  waBtnText: { fontSize: 14, fontWeight: '700', color: C.white },
  divRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  divLine: { flex: 1, height: 1, backgroundColor: C.line },
  divText: { fontSize: 12, color: C.ink3 },

  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  chip: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: C.line,
    backgroundColor: C.white,
  },
  chipSelected: { borderColor: C.p, backgroundColor: C.pLight },
  chipText: { fontSize: 12, fontWeight: '600', color: C.ink3 },
  chipTextSelected: { color: C.p },

  platCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: C.line,
    backgroundColor: C.white,
    marginBottom: 10,
  },
  platCardSelected: { borderColor: C.p, backgroundColor: C.pLight },
  platIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  platLetter: { fontSize: 13, fontWeight: '900' },
  platName: { fontSize: 13, fontWeight: '700', color: C.ink },
  platDesc: { fontSize: 11, color: C.ink3 },

  planCard: {
    borderRadius: 14,
    borderWidth: 2,
    borderColor: C.line,
    backgroundColor: C.white,
    padding: 16,
    marginBottom: 10,
    overflow: 'hidden',
  },
  planCardSelected: { borderColor: C.p, backgroundColor: C.pLight },
  planName: { fontSize: 16, fontWeight: '800', color: C.ink, marginBottom: 4 },
  planPrice: { fontSize: 20, fontWeight: '800', color: C.p },
  planPeriod: { fontSize: 12, fontWeight: '400', color: C.ink3 },
  planFeat: { fontSize: 12, color: C.ink2, lineHeight: 18 },
  popularBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: C.p,
    paddingVertical: 4,
    alignItems: 'center',
  },
  popularText: {
    fontSize: 9,
    fontWeight: '800',
    color: C.white,
    letterSpacing: 1,
  },

  tipBox: {
    backgroundColor: '#FFFAF0',
    borderRadius: 11,
    padding: 12,
    marginVertical: 14,
    borderWidth: 1,
    borderColor: '#FAF089',
  },
  tipTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#744210',
    marginBottom: 2,
  },
  tipSub: { fontSize: 11, color: '#92400E', lineHeight: 16 },

  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: C.p,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: C.p,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: C.p,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: C.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: C.line,
  },
  checkIconBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: C.greenBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkLabel: { flex: 1, fontSize: 13, fontWeight: '600', color: C.ink },
  checkDone: { fontSize: 12, fontWeight: '700', color: C.green },

  logoUpload: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: C.pLight,
    borderWidth: 2,
    borderColor: C.p,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
});

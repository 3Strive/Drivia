import React, { ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { C, S, R } from '../constants/theme';

// ─── BADGE ────────────────────────────────────────────────────────────────────
export function Badge({
  label,
  color = C.p,
  bg,
  leftIcon,
  rightIcon,
}: {
  label: string;
  color?: string;
  bg?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}) {
  return (
    <View
      style={[
        st.badge,
        {
          backgroundColor: bg ?? color + '18',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        },
      ]}
    >
      {leftIcon && leftIcon}
      <Text style={[st.badgeText, { color }]}>{label}</Text>
    </View>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
export function StatCard({
  icon,
  label,
  value,
  color = C.p,
  sub,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  color?: string;
  sub?: string;
}) {
  return (
    <View style={[st.statCard, S.shadow]}>
      <View style={[st.statIcon, { backgroundColor: color + '18' }]}>
        <Text style={{ fontSize: 18 }}>{icon}</Text>
      </View>
      <Text style={st.statValue}>{value}</Text>
      <Text style={st.statLabel}>{label}</Text>
      {sub && <Text style={[st.statSub, { color }]}>{sub}</Text>}
    </View>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
export function SectionHeader({
  title,
  action,
  onAction,
  style,
}: {
  title: string;
  action?: string;
  style?: ViewStyle;
  onAction?: () => void;
}) {
  return (
    <View style={st.sectionHeader}>
      <Text style={st.sectionTitle || style}>{title}</Text>
      {action && (
        <TouchableOpacity onPress={onAction}>
          <Text style={st.sectionAction}>{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ─── SCREEN HEADER ────────────────────────────────────────────────────────────
export function ScreenHeader({
  title,
  sub,
  right,
  onBack,
}: {
  title: string;
  sub?: string;
  right?: React.ReactNode;
  onBack?: () => void;
}) {
  return (
    <View style={st.screenHeader}>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', flex: 1, gap: 10 }}
      >
        {onBack && (
          <TouchableOpacity onPress={onBack} style={st.backBtn}>
            <Text style={st.backArrow}>←</Text>
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }}>
          {sub && <Text style={st.screenSub}>{sub}</Text>}
          <Text style={st.screenTitle}>{title}</Text>
        </View>
      </View>
      {right}
    </View>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[st.card, S.shadow, style]}>{children}</View>;
}

// ─── PRIMARY BUTTON ───────────────────────────────────────────────────────────
export function PrimaryBtn({
  label,
  onPress,
  loading,
  disabled,
  color = C.p,
  style,
}: {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  color?: string;
  style?: ViewStyle;
}) {
  return (
    <TouchableOpacity
      style={[st.primaryBtn, { backgroundColor: color }, S.shadowP, style]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={C.white} />
      ) : (
        <Text style={st.primaryBtnText}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

// ─── OUTLINE BUTTON ───────────────────────────────────────────────────────────
export function OutlineBtn({
  label,
  onPress,
  color = C.p,
  style,
}: {
  label: string;
  onPress: () => void;
  color?: string;
  style?: ViewStyle;
}) {
  return (
    <TouchableOpacity
      style={[st.outlineBtn, { borderColor: color }, style]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={[st.outlineBtnText, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
export function EmptyState({
  icon,
  title,
  sub,
}: {
  icon: string;
  title: string;
  sub?: string;
}) {
  return (
    <View style={st.empty}>
      <Text style={st.emptyIcon}>{icon}</Text>
      <Text style={st.emptyTitle}>{title}</Text>
      {sub && <Text style={st.emptySub}>{sub}</Text>}
    </View>
  );
}

// ─── DIVIDER ──────────────────────────────────────────────────────────────────
export function Divider() {
  return <View style={st.divider} />;
}

// ─── ROW ITEM (label + value) ─────────────────────────────────────────────────
export function RowItem({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[st.rowItem, !last && st.rowItemBorder]}>
      <Text style={st.rowLabel}>{label}</Text>
      <Text style={st.rowValue}>{value}</Text>
    </View>
  );
}

// ─── CHIP ─────────────────────────────────────────────────────────────────────
export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[st.chip, selected && st.chipSelected]}
    >
      <Text style={[st.chipText, selected && st.chipTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const st = StyleSheet.create({
  badge: { borderRadius: R.sm, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontSize: 10, fontWeight: '700' },

  statCard: {
    flex: 1,
    backgroundColor: C.white,
    borderRadius: R.lg,
    padding: 14,
  },
  statIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: { fontSize: 20, fontWeight: '800', color: C.ink, marginBottom: 2 },
  statLabel: { fontSize: 11, color: C.ink3, fontWeight: '500' },
  statSub: { fontSize: 10, fontWeight: '600', marginTop: 3 },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: C.ink },
  sectionAction: { fontSize: 12, fontWeight: '600', color: C.p },

  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: C.white,
    borderBottomWidth: 1,
    borderBottomColor: C.line,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: R.md,
    backgroundColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: { fontSize: 18, color: C.ink2 },
  screenSub: {
    fontSize: 11,
    color: C.ink3,
    fontWeight: '500',
    marginBottom: 1,
  },
  screenTitle: { fontSize: 20, fontWeight: '800', color: C.ink },

  card: { backgroundColor: C.white, borderRadius: R.lg, padding: 16 },

  primaryBtn: {
    height: 50,
    borderRadius: R.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  primaryBtnText: { fontSize: 15, fontWeight: '700', color: C.white },

  outlineBtn: {
    height: 48,
    borderRadius: R.md,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  outlineBtnText: { fontSize: 14, fontWeight: '700' },

  empty: { alignItems: 'center', paddingVertical: 48, paddingHorizontal: 24 },
  emptyIcon: { fontSize: 44, marginBottom: 14 },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: C.ink2,
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 13,
    color: C.ink3,
    textAlign: 'center',
    lineHeight: 20,
  },

  divider: { height: 1, backgroundColor: C.line },

  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
  },
  rowItemBorder: { borderBottomWidth: 1, borderBottomColor: C.line },
  rowLabel: { fontSize: 12, color: C.ink3, fontWeight: '600' },
  rowValue: { fontSize: 13, fontWeight: '700', color: C.ink },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: R.full,
    borderWidth: 1.5,
    borderColor: C.line,
    backgroundColor: C.white,
  },
  chipSelected: { borderColor: C.p, backgroundColor: C.pLight },
  chipText: { fontSize: 12, fontWeight: '600', color: C.ink3 },
  chipTextSelected: { color: C.p },
});

import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../../constants/theme';

function TabIcon({
  emoji,
  label,
  focused,
}: {
  emoji: string;
  label: string;
  focused: boolean;
}) {
  return (
    <View style={[s.tab, focused && s.tabActive]}>
      <Text style={{ fontSize: 18 }}>{emoji}</Text>
      <Text style={[s.tabLabel, focused && s.tabLabelActive]}>{label}</Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: s.tabBar,
        tabBarShowLabel: false,
        tabBarItemStyle: s.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="" label="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🚗" label="Inventory" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="leads"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="💬" label="Leads" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="broadcast"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="📣" label="Broadcast" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="👤" label="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const s = StyleSheet.create({
  tabBar: {
    height: 80,
    justifyContent: 'flex-end',
    backgroundColor: C.white,
    borderTopWidth: 1,
    borderTopColor: C.line,
    alignItems: 'baseline',
    paddingBottom: 0,
    paddingTop: 8,
    gap: 4,
  },
  tabBarItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center', // ← fixed
    paddingVertical: 8,
    paddingHorizontal: 2,
    borderRadius: 12,
    gap: 3,
    height: 50,
  },
  tabActive: { backgroundColor: C.pLight },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: C.ink3,
    width: 50,
    textAlign: 'center',
  },
  tabLabelActive: { color: C.p },
});

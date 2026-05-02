import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="marketplace" options={{ presentation: 'card' }} />
          <Stack.Screen name="analytics" options={{ presentation: 'card' }} />
          <Stack.Screen name="crm" options={{ presentation: 'card' }} />
          <Stack.Screen name="socials" options={{ presentation: 'card' }} />
          <Stack.Screen name="plans" options={{ presentation: 'card' }} />
        </Stack>
      </GestureHandlerRootView>
    </>
  );
}

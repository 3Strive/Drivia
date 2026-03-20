import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="marketplace" options={{ presentation: "card" }} />
        <Stack.Screen name="analytics"   options={{ presentation: "card" }} />
        <Stack.Screen name="crm"         options={{ presentation: "card" }} />
        <Stack.Screen name="socials"     options={{ presentation: "card" }} />
        <Stack.Screen name="plans"       options={{ presentation: "card" }} />
      </Stack>
    </>
  );
}

import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="TrackYourInput"
        options={{
          title: "Track Your Input",
        }}
      />
      <Stack.Screen
        name="ComparePrices"
        options={{
          title: "Compare Prices",
        }}
      />
      <Stack.Screen
        name="JoinBuyingGroups"
        options={{
          title: "Join Buying Groups",
        }}
      />
    </Stack>
  );
}

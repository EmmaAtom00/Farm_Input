import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(dashboard)/Dashboard" />
      <Stack.Screen name="(dashboard)/MyInputs" />
      <Stack.Screen name="(dashboard)/ActiveGroups" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(profile)/Profile" />
      <Stack.Screen name="(profile)/EditProfile" />
      <Stack.Screen name="(notification)/Notification" />
      <Stack.Screen name="(newInput)/NewInput" />
      <Stack.Screen name="(newInput)/EditInput" />
      <Stack.Screen name="(mySpending)/MySpending" />
      <Stack.Screen name="(buyingGroups)/BuyingGroups" />
      <Stack.Screen name="(comparePrices)/ComparePrices" />
      <Stack.Screen name="(HelpAndSupport)/UserGuide" />
      <Stack.Screen name="(HelpAndSupport)/PrivacyPolicy" />
      <Stack.Screen name="(HelpAndSupport)/TermsOfService" />
      <Stack.Screen name="(HelpAndSupport)/FAQs" />
    </Stack>
  );
}

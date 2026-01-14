import { Stack } from "expo-router";

export default function MainLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="dashboard" />
            <Stack.Screen name="(onboarding)" />
            <Stack.Screen name="(profile)/EditProfile" />
            <Stack.Screen name="(notification)/Notification" />
            <Stack.Screen name="(newInput)/NewInput" />
            <Stack.Screen name="(mySpending)/MySpending" />
            <Stack.Screen name="(HelpAndSupport)/UserGuide" />
            <Stack.Screen name="(HelpAndSupport)/PrivacyPolicy" />
        </Stack>
    );
}

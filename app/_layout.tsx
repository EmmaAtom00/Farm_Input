import { SplashScreen } from "@/components/common/SplashScreen";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import "./global.css";
import { checkOnboardingStatus } from "@/constant/api";

function RootLayoutNav() {
  const { loading, signedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const rootSegment = segments[0]; // "(main)", "(auth)", "(core)"
    const inMain = rootSegment === "(main)";
    const inAuth = rootSegment === "(auth)";

    // Not signed in → block main
    if (!signedIn && inMain) {
      router.replace("/(auth)/Login");
      return;
    }

    // Signed in → block auth screens
    if (signedIn && inAuth) {
      const handleOnboardingRedirect = async () => {
        try {
          const hasCompletedOnboarding = await checkOnboardingStatus();
          // console.log("Onboarding completed:", hasCompletedOnboarding);

          if (hasCompletedOnboarding) {
            router.replace("/(main)/(dashboard)/Dashboard");
          } else {
            router.replace("/(main)/(onboarding)/TrackYourInput");
          }
        } catch (error) {
          console.error("Error checking onboarding status:", error);
          // fallback route if API fails
          router.replace("/(main)/(dashboard)/Dashboard");
        }
      };

      handleOnboardingRedirect();
    }
  }, [loading, signedIn, segments, router]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(core)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(main)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

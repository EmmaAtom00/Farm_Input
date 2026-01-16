import { SplashScreen } from '@/components/common/SplashScreen';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Stack } from "expo-router";
import "./global.css";

function RootLayoutNav() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(core)" options={{ title: "Core" }} />
      <Stack.Screen name="(auth)" options={{ title: "Auth" }} />
      <Stack.Screen name="(main)" options={{ title: "Main" }} />
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

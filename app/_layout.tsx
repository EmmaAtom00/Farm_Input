import { Stack } from "expo-router";
import './global.css'

export default function RootLayout() {
<<<<<<< HEAD
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(core)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(main)" />
    </Stack>
  );
=======
  return <Stack>
    <Stack.Screen
      name="(tabs)"
      options={{ headerShown: false }}
    />
  </Stack>;
>>>>>>> 6f868053fa874e197d9234b0f3c92949402bf5d1
}

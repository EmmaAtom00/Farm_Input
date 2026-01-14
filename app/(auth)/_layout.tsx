import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack>
      {/* <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false
        }}
      /> */}
      <Stack.Screen
        name="Signup"
        options={{
          title: 'Sign Up',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Login"
        options={{
          title: 'Sign in',
          headerShown: false
        }}
      />
    </Stack>
  );
}

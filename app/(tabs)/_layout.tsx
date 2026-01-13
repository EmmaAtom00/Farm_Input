import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="Signup"
        options={{
          title: 'Sign Up',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="Login"
        options={{
          title: 'Sign in',
          headerShown: false
        }}
      />
    </Tabs>
  );
}

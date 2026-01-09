import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Pressable style={{ marginTop: 20 }} onPress={() => { router.push('/Signup'); }}>
        <Text>Signup</Text>
      </Pressable>
    </View>
  );
}

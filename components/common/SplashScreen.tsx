import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icon from "../../assets/images/icon.png";

export function SplashScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={icon}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      </View>
    </SafeAreaView>
  );
}

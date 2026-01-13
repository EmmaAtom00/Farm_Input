import { FeatureProps } from "@/constant";
import { Text, View } from "react-native";

function Feature({ title, description }: FeatureProps) {
  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <Text className="font-semibold text-gray-900">{title}</Text>
      <Text className="text-sm text-gray-600 mt-1">{description}</Text>
    </View>
  );
}

export default Feature
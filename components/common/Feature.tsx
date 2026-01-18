import { FeatureProps } from "@/constant";
import { Text, View } from "react-native";

function Feature({
  title,
  description,
  style,
  titleStyle,
  descriptionStyle,
}: FeatureProps) {
  return (
    <View
      className="bg-white rounded-2xl p-4 mb-3 border border-gray-200"
      style={style}
    >
      <Text className="font-semibold text-gray-900" style={titleStyle}>
        {title}
      </Text>
      <Text className="text-sm text-gray-600 mt-1" style={descriptionStyle}>
        {description}
      </Text>
    </View>
  );
}

export default Feature;

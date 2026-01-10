import { CardProps } from "@/constant";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const card = ({ title, description }: CardProps) => {
  return (
    <View className="bg-white p-6 rounded-lg shadow-md">
      <View className="bg-green-100 w-12 h-12 rounded-full justify-center items-center mb-4">
        <Ionicons name="checkmark-circle-outline" size={24} color="#16a34a" />
      </View>
      <Text className="text-2xl font-semibold mb-2">{title}</Text>
      <Text className="text-gray-600 mb-2">
        {description}
      </Text>
    </View>
  );
};

export default card;

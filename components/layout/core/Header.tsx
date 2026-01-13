import { HeaderProps } from "@/constant";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Header = ({ title = "FarmInput", onSignUp }: HeaderProps) => {
  return (
    <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
      <Text className="text-xl font-semibold text-green-700">
        {title}
      </Text>

      <TouchableOpacity
        onPress={onSignUp}
        activeOpacity={0.8}
        className="bg-green-600 px-4 py-1.5 rounded-full"
      >
        <Text className="text-white text-sm font-medium">
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

import { HeaderProps } from "@/constant";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Header = ({ title = "FarmInput", onSignUp }: HeaderProps) => {
  return (
    <View className="flex-row items-center justify-between bg-white px-5 py-4 border-b border-gray-100">
      <Text className="text-3xl text-green-700">{title}</Text>

      <TouchableOpacity
        onPress={onSignUp}
        activeOpacity={0.7}
        className="bg-green-600 px-4 py-2 rounded-lg"
      >
        <Text className="text-white font-semibold">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

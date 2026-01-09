import Header from "@/components/layout/core/Header";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const farmInput1 = require("../../assets/images/Farminput1.jpeg");
const farmInput2 = require("../../assets/images/Farminput2.jpeg");

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView stickyHeaderIndices={[0]}>
        <Header />
        <View className="px-4 pt-16 bg-green-100 min-h-[100vh]">
          <Text className="text-7xl py-4">
            Your Complete Agricultural Input Management Solution
          </Text>
          <Text className="text-green-500 text-2xl py-4">
            Track farm inputs, compare prices, and save money through bulk
            purchasing with FarmInput. Join thousands of farmers optimizing
            their agricultural spending.
          </Text>

          <View className="mt-8 flex-row justify-between">
            <TouchableOpacity className="bg-green-600 px-6 py-4 rounded-lg w-2/5 items-center">
              <Text className="text-white text-xl font-semibold">
                Get Started
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className=" px-6 py-4 rounded-lg w-2/5 items-center border-green-600 border-2">
              <Text className="text-xl font-semibold">Learn More</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={farmInput1}
            className="rounded-lg self-center mt-6"
            // resizeMode="center"
            style={{ width: 350, height: 200 }}
          />
        </View>

        <View className="px-4 py-16 bg-white">
          <View className="bg-green-500 py-10 px-16 rounded-t-lg flex-col gap-5">
            <Text className="text-5xl text-white">Ready to Shop?</Text>
            <Text className="text-gray-100 text-xl">
              Access quality farm inputs at competitive prices. Download our app
              and start saving today.
            </Text>
            <TouchableOpacity className="bg-white flex-row mt-4 px-6 py-3 rounded-lg w-1/2 items-center">
              <Text className="text-green-600 text-xl font-semibold">
                Shop Now
              </Text>
              <Ionicons name="arrow-forward" size={24} color="green" />
            </TouchableOpacity>
          </View>
          <Image source={farmInput2} className="rounded-b-lg w-full h-60" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

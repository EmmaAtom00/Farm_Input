import Card from "@/components/common/Card";
import FarmInputFooter from "@/components/layout/core/Footer";
import Header from "@/components/layout/core/Header";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import farmInput1 from "../../assets/images/Farminput1.jpeg";
import farmInput2 from "../../assets/images/Farminput2.jpeg";

const HomeScreen = () => {
  const router = useRouter()
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        enabled={true}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={20} // adjust if you have a header
      >
        <ScrollView
          stickyHeaderIndices={[0]}
          keyboardShouldPersistTaps="handled"
        >
          <Header onSignUp={() => router.push("/Signup")} />
          <View className="px-4 pt-16 bg-green-100 min-h-[100vh]">
            <Text className="text-7xl py-4">
              Your Complete Agricultural Input Management Solution
            </Text>
            <Text className="text-gray-600 text-2xl py-4">
              Track farm inputs, compare prices, and save money through bulk
              purchasing with FarmInput. Join thousands of farmers optimizing
              their agricultural spending.
            </Text>

            <View className="mt-8 flex-row gap-8">
              <TouchableOpacity onPress={() => router.push("/Signup")} className="bg-green-600 flex-row px-6 py-4 gap-4 rounded-lg w-2/5 items-center">
                <Text className="text-white text-xl font-semibold">
                  Get Started
                </Text>
                <Ionicons name="arrow-forward" size={12} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/HowItWorksScreen")}
                className=" px-6 py-4 rounded-lg w-2/5 items-center border-green-600 border"
              >
                <Text className="text-xl font-semibold">Learn More</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={farmInput1}
              className="rounded-lg self-center mt-10 mb-20 w-full h-80"
            // resizeMode="center"
            />
          </View>

          <View className="px-4 py-16 bg-white">
            <View className="bg-green-500 py-10 px-16 rounded-t-lg flex-col gap-5">
              <Text className="text-5xl text-white">Ready to Shop?</Text>
              <Text className="text-gray-100 text-xl">
                Access quality farm inputs at competitive prices. Download our
                app and start saving today.
              </Text>
              <TouchableOpacity className="bg-white flex-row mt-4 px-6 py-3 gap-4 rounded-lg w-1/2 items-center">
                <Text className="text-green-600 text-xl font-semibold">
                  Shop Now
                </Text>
                <Ionicons name="arrow-forward" size={12} color="green" />
              </TouchableOpacity>
            </View>
            <Image source={farmInput2} className="rounded-b-lg w-full h-60" />
          </View>

          <View className="px-4 py-16 bg-gray-100">
            <View className="items-center mb-10">
              <Text className="text-4xl mb-6">Why Choose FarmInput?</Text>
              <Text className="text-gray-600 text-xl ">
                Join the smart farming revolution
              </Text>
            </View>

            <View className="space-y-8 gap-8">
              <Card
                title="Save Money"
                description="Access bulk purchasing discounts and compare prices across suppliers to get the best deals on farm inputs."
              />

              <Card
                title="Track Spending"
                description="Monitor your agricultural expenses with detailed analytics and insights to make informed decisions."
              />
              <Card
                title="Join Communities"
                description="Connect with other farmers in buying groups to unlock better prices through collective purchasing power."
              />
              <Card
                title="Verified Suppliers"
                description="Access a network of trusted and verified agricultural input suppliers with ratings and reviews."
              />
              <Card
                title="Mobile First"
                description="Manage your farm inputs on-the-go with our intuitive mobile-optimized application."
              />
              <Card
                title="Data Insights"
                description="Get detailed spending trends and analysis to optimize your agricultural budget and planning."
              />
            </View>
          </View>

          <View className="px-4 py-16 bg-green-500 items-center">
            <Text className="text-5xl text-white mb-6">Join Our Community</Text>
            <Text className="text-gray-100 text-xl text-center mb-6">
              Subscribe to our newsletter for farming tips, market updates, and
              exclusive deals
            </Text>

            <View className="flex-row items-center">
              <TextInput
                placeholder="Enter your email"
                className="border border-white px-4 py-3 rounded-bl-lg rounded-tl-lg w-2/3"
              />
              <TouchableOpacity
                onPress={() => Keyboard.dismiss()}
                className="bg-white px-6 py-3 rounded-br-lg rounded-tr-lg w-fit items-center justify-center"
              >
                <Text className="text-green-600 text-xl font-semibold">
                  Subscribe
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <FarmInputFooter />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;

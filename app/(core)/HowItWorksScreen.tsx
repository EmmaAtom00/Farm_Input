import Feature from "@/components/common/feature";
import Step from "@/components/common/step";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HowItWorksScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View className="p-6 bg-green-500">
          <Link href="/" className="flex-row items-center mb-8">
            <Ionicons name="arrow-back" size={15} color="white" />
            <Text className="text-xl text-white ml-2">Back to Home</Text>
          </Link>

          <Text className="text-6xl font-bold text-white mb-4">
            How FarmInput Works
          </Text>
          <Text className="text-lg text-white">
            Your complete guide to using FarmInput
          </Text>
        </View>

        <View className="items-center py-12 px-6">
          <Text className="text-4xl font-semibold">
            Getting Started is Easy
          </Text>
          <Text className="mt-2 text-center text-gray-600">
            Follow these simple steps to begin your journey
          </Text>

          <View className="mt-14 items-center">
            <View className="bg-green-200 p-6 rounded-full mb-4">
              <Ionicons name="phone-portrait-outline" size={24} color="green" />
            </View>

            <View className="bg-green-500 rounded-full h-8 w-8 items-center justify-center mb-2">
              <Text className="text-white font-bold">1</Text>
            </View>

            <Text className="text-xl font-semibold mb-2">
              Access the Platform
            </Text>
            <Text className="text-center text-gray-600">
              Visit our website and click "Sign In" to access the
              mobile-optimized application'
            </Text>
          </View>

          <View className="mt-14 items-center">
            <View className="bg-green-200 p-6 rounded-full mb-4">
              <Ionicons name="person-add-outline" size={24} color="green" />
            </View>

            <View className="bg-green-500 rounded-full h-8 w-8 items-center justify-center mb-2">
              <Text className="text-white font-bold">2</Text>
            </View>

            <Text className="text-xl font-semibold mb-2">
              Create Your Account
            </Text>
            <Text className="text-center text-gray-600">
              Register with your phone number, verify with OTP, and complete
              your farmer profile
            </Text>
          </View>

          <View className="mt-14 items-center">
            <View className="bg-green-200 p-6 rounded-full mb-4">
              <Ionicons name="checkmark-outline" size={24} color="green" />
            </View>

            <View className="bg-green-500 rounded-full h-8 w-8 items-center justify-center mb-2">
              <Text className="text-white font-bold">3</Text>
            </View>

            <Text className="text-xl font-semibold mb-2">
              Complete Onboarding
            </Text>
            <Text className="text-center text-gray-600">
              Set up your farm details, preferences, and start exploring the
              platform features
            </Text>
          </View>

          <View className="mt-14 items-center">
            <View className="bg-green-200 p-6 rounded-full mb-4">
              <Ionicons name="trending-up-outline" size={24} color="green" />
            </View>

            <View className="bg-green-500 rounded-full h-8 w-8 items-center justify-center mb-2">
              <Text className="text-white font-bold">4</Text>
            </View>

            <Text className="text-xl font-semibold mb-2">Start Managing</Text>
            <Text className="text-center text-gray-600">
              Begin logging inputs, tracking spending, and joining buying groups
              to save money
            </Text>
          </View>
        </View>

        <View>
          <Text className="text-2xl font-bold text-gray-900 mt-6">
            How Deliveries Work
          </Text>
          <Text className="text-sm text-gray-500 mt-1 mb-4">
            Efficient delivery to get inputs when you need them
          </Text>

          <View className="bg-emerald-50 rounded-2xl p-4">
            <Step
              icon="🔔"
              title="Order Confirmation"
              description="After order placement, you receive confirmation with estimated delivery date and pickup location."
            />
            <Step
              icon="📦"
              title="Order Processing"
              description="Supplier prepares your order. For group purchases, all member orders are consolidated."
            />
            <Step
              icon="✅"
              title="Pickup / Delivery"
              description="Collect your inputs from designated pickup point or arrange direct delivery to your farm."
            />

            <View className="bg-sky-100 rounded-xl p-4 mt-2">
              <Text className="font-semibold text-sky-700 mb-1">
                🔔 Stay Updated
              </Text>
              <Text className="text-sm text-sky-800">
                Track your order status in real-time through the app. Get
                notifications when your order is ready for pickup and coordinate
                with other group members for collection.
              </Text>
            </View>
          </View>

          {/* KEY FEATURES */}
          <Text className="text-2xl font-bold text-gray-900 mt-8">
            Key Features
          </Text>
          <Text className="text-sm text-gray-500 mt-1 mb-4">
            Everything you need to manage farm inputs efficiently
          </Text>

          <Feature
            title="Input Logging"
            description="Record all purchases with details like quantity, price, supplier, and date for comprehensive tracking."
          />
          <Feature
            title="Supplier Directory"
            description="Access verified suppliers with ratings, reviews, locations, and contact information."
          />
          <Feature
            title="Spending Analytics"
            description="View detailed charts and trends of your agricultural spending over time with insights."
          />
          <Feature
            title="Buying Groups"
            description="Join or create groups with other farmers to access bulk discounts and save money."
          />
          <Feature
            title="Price Comparison"
            description="Compare prices across regions and suppliers to find the best deals on farm inputs."
          />
          <Feature
            title="Mobile Access"
            description="Full mobile optimization lets you manage everything on-the-go from your smartphone."
          />

          {/* CTA */}
          <View className="bg-emerald-600 rounded-2xl p-6 mt-8 mb-10">
            <Text className="text-white text-2xl font-bold text-center">
              Ready to Get Started?
            </Text>
            <Text className="text-emerald-100 text-center mt-2">
              Join thousands of farmers already saving money and managing inputs
              smarter
            </Text>

            <View className="flex-row justify-center mt-4 space-x-3">
              <TouchableOpacity className="bg-white px-5 py-3 rounded-xl">
                <Text className="text-emerald-700 font-semibold">
                  Sign Up Now
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="border border-white px-5 py-3 rounded-xl">
                <Text className="text-white font-semibold">Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HowItWorksScreen;

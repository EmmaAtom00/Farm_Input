import Card from "@/components/common/Card";
import FarmInputFooter from "@/components/layout/core/Footer";
import Header from "@/components/layout/core/Header";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import farmInput1 from "../../assets/images/Farminput1.jpeg";
import farmInput2 from "../../assets/images/Farminput2.jpeg";

const HomeScreen = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Header onSignUp={() => router.push("/(auth)/Login")} />

        {/* Hero Section */}
        <View style={{ paddingHorizontal: 16, paddingTop: 64, backgroundColor: '#dcfce7', minHeight: 600 }}>
          <Text style={{ fontSize: 48, fontWeight: '700', paddingVertical: 16, lineHeight: 56 }}>
            Your Complete Agricultural Input Management Solution
          </Text>
          <Text style={{ color: '#4b5563', fontSize: 20, paddingVertical: 16, lineHeight: 28 }}>
            Track farm inputs, compare prices, and save money through bulk
            purchasing with FarmInput. Join thousands of farmers optimizing
            their agricultural spending.
          </Text>

          <View style={{ marginTop: 32, flexDirection: 'row', gap: 32 }}>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/Signup")}
              style={{
                backgroundColor: '#16a34a',
                flexDirection: 'row',
                paddingHorizontal: 24,
                paddingVertical: 16,
                gap: 16,
                borderRadius: 8,
                width: '40%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
                Get Started
              </Text>
              <Ionicons name="arrow-forward" size={12} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/(core)/HowItWorksScreen")}
              style={{
                paddingHorizontal: 24,
                paddingVertical: 16,
                borderRadius: 8,
                width: '40%',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: '#16a34a'
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '600' }}>Learn More</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={farmInput1}
            style={{
              borderRadius: 8,
              alignSelf: 'center',
              marginTop: 40,
              marginBottom: 80,
              width: '100%',
              height: 320
            }}
            resizeMode="cover"
          />
        </View>

        {/* Shop Section */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 64, backgroundColor: 'white' }}>
          <View style={{ backgroundColor: '#22c55e', paddingVertical: 40, paddingHorizontal: 64, borderTopLeftRadius: 8, borderTopRightRadius: 8, gap: 20 }}>
            <Text style={{ fontSize: 36, color: 'white', fontWeight: '700' }}>Ready to Shop?</Text>
            <Text style={{ color: '#f3f4f6', fontSize: 18, lineHeight: 28 }}>
              Access quality farm inputs at competitive prices. Download our
              app and start saving today.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                marginTop: 16,
                paddingHorizontal: 24,
                paddingVertical: 12,
                gap: 16,
                borderRadius: 8,
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: '#16a34a', fontSize: 18, fontWeight: '600' }}>
                Shop Now
              </Text>
              <Ionicons name="arrow-forward" size={12} color="#16a34a" />
            </TouchableOpacity>
          </View>
          <Image
            source={farmInput2}
            style={{
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              width: '100%',
              height: 240
            }}
            resizeMode="cover"
          />
        </View>

        {/* Why Choose Section */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 64, backgroundColor: '#f3f4f6' }}>
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <Text style={{ fontSize: 32, marginBottom: 24, fontWeight: '700' }}>Why Choose FarmInput?</Text>
            <Text style={{ color: '#4b5563', fontSize: 18 }}>
              Join the smart farming revolution
            </Text>
          </View>

          <View style={{ gap: 32 }}>
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

        {/* Newsletter Section */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 64, backgroundColor: '#22c55e', alignItems: 'center' }}>
          <Text style={{ fontSize: 36, color: 'white', marginBottom: 24, fontWeight: '700' }}>Join Our Community</Text>
          <Text style={{ color: '#f3f4f6', fontSize: 18, textAlign: 'center', marginBottom: 24 }}>
            Subscribe to our newsletter for farming tips, market updates, and
            exclusive deals
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              placeholder="Enter your email"
              style={{
                borderWidth: 1,
                borderColor: 'white',
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                width: '66%',
                color: '#1f2937'
              }}
              placeholderTextColor="#9ca3af"
            />
            <TouchableOpacity
              onPress={() => Keyboard.dismiss()}
              style={{
                backgroundColor: 'white',
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                width: '34%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: '#16a34a', fontSize: 18, fontWeight: '600' }}>
                Subscribe
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FarmInputFooter />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

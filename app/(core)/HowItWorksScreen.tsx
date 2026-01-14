import Feature from "@/components/common/Feature";
import OnboardingStep from "@/components/common/OnboardingStep";
import PurchaseStepsCard from "@/components/common/PurchaseStepsCard";
import Step from "@/components/common/Step";
import {
  groupPurchaseSteps,
  individualPurchaseSteps,
} from "@/constant/purchaseSteps";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HowItWorksScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* HERO */}
        <View style={styles.hero}>
          <Link href="/" style={styles.backLink}>
            <Ionicons name="arrow-back" size={16} color="#fff" />
            <Text style={styles.backText}>Back to Home</Text>
          </Link>

          <Text style={styles.heroTitle}>How FarmInput Works</Text>
          <Text style={styles.heroSubtitle}>
            Your complete guide to using FarmInput
          </Text>
        </View>

        {/* ONBOARDING */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Getting Started is Easy</Text>
          <Text style={styles.sectionSubtitle}>
            Follow these simple steps to begin your journey
          </Text>

          <OnboardingStep
            step={1}
            icon="phone-portrait-outline"
            title="Access the Platform"
            description='Visit our website and click "Sign In" to access the app'
          />

          <OnboardingStep
            step={2}
            icon="person-add-outline"
            title="Create Your Account"
            description="Register with your phone number and complete your profile"
          />

          <OnboardingStep
            step={3}
            icon="checkmark-circle-outline"
            title="Complete Onboarding"
            description="Set preferences and farm details to get started"
          />

          <OnboardingStep
            step={4}
            icon="trending-up-outline"
            title="Start Managing"
            description="Track inputs, spending, and join buying groups"
          />
        </View>

        {/* PURCHASE STEPS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Placing Orders Made Simple
          </Text>
          <Text style={styles.sectionSubtitle}>
            Multiple ways to purchase your farm inputs
          </Text>

          <PurchaseStepsCard
            iconName="cart-outline"
            title="Individual Purchases"
            steps={individualPurchaseSteps}
          />

          <PurchaseStepsCard
            iconName="people-outline"
            title="Group Purchases"
            subtitle="Save up to 20%"
            steps={groupPurchaseSteps}
          />
        </View>

        {/* DELIVERY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How Deliveries Work</Text>
          <Text style={styles.sectionSubtitle}>
            Efficient delivery when you need it
          </Text>

          <View style={styles.deliveryCard}>
            <Step
              icon={<Ionicons name="notifications-outline" size={18} />}
              title="Order Confirmation"
              description="Receive confirmation and delivery details"
            />
            <Step
              icon={<Ionicons name="cube-outline" size={18} />}
              title="Order Processing"
              description="Supplier prepares and consolidates orders"
            />
            <Step
              icon={<Ionicons name="checkmark-done-outline" size={18} />}
              title="Pickup / Delivery"
              description="Collect or receive inputs at your farm"
            />

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>
                <Ionicons name="information-circle-outline" size={16} /> Stay
                Updated
              </Text>
              <Text style={styles.infoText}>
                Track your order in real-time and receive notifications.
              </Text>
            </View>
          </View>
        </View>

        {/* FEATURES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <Text style={styles.sectionSubtitle}>
            Everything you need to manage inputs efficiently
          </Text>

          <Feature title="Input Logging" description="Track all purchases" />
          <Feature title="Supplier Directory" description="Verified suppliers" />
          <Feature title="Spending Analytics" description="Visual insights" />
          <Feature title="Buying Groups" description="Bulk discounts" />
          <Feature title="Price Comparison" description="Best deals" />
          <Feature title="Mobile Access" description="Manage on the go" />
        </View>

        {/* CTA */}
        <View style={styles.cta}>
          <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
          <Text style={styles.ctaSubtitle}>
            Join thousands of farmers saving money
          </Text>

          <View style={styles.ctaActions}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => router.push("/Signup")}
            >
              <Text style={styles.primaryText}>Sign Up Now</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn}>
              <Text style={styles.secondaryText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  scroll: { paddingBottom: 0 },

  hero: {
    backgroundColor: "#22c55e",
    padding: 24,
    paddingTop: 16,
  },
  backLink: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#ecfdf5",
    lineHeight: 24,
  },

  section: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#1f2937",
    marginBottom: 8,
  },
  sectionSubtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 28,
    fontSize: 15,
    lineHeight: 22,
  },

  deliveryCard: {
    backgroundColor: "#f0fdf4",
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#dcfce7",
  },

  infoBox: {
    backgroundColor: "#f0f9ff",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#0284c7",
  },
  infoTitle: {
    fontWeight: "600",
    color: "#0369a1",
    marginBottom: 6,
    fontSize: 14,
  },
  infoText: {
    color: "#075985",
    fontSize: 14,
    lineHeight: 20,
  },

  cta: {
    backgroundColor: "#22c55e",
    padding: 32,
    paddingBottom: 40,
  },
  ctaTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  ctaSubtitle: {
    color: "#d1fae5",
    textAlign: "center",
    marginBottom: 28,
    fontSize: 16,
    lineHeight: 24,
  },
  ctaActions: {
    flexDirection: "column",
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryText: {
    color: "#047857",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryBtn: {
    borderWidth: 2,
    borderColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});


export default HowItWorksScreen;

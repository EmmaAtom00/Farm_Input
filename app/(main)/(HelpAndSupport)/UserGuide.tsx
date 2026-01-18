import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserGuide = () => {
  const sections = [
    {
      id: "1",
      title: "Getting Started",
      icon: "rocket",
      content: [
        "Download and open the FarmInput app",
        "Register using your phone number and receive an OTP",
        "Enter the 6-digit OTP to log in",
        "Complete your profile with farm location, crops, and farm size",
        "Set your State, LGA, and Village from your profile",
      ],
    },
    {
      id: "2",
      title: "Logging Farm Inputs",
      icon: "leaf",
      content: [
        'Tap "Log New Input" from the dashboard',
        "Select input category (fertilizer, seeds, pesticides, etc.)",
        "Enter input name, quantity, unit, and price in Naira (₦)",
        "Optionally add supplier details and purchase date",
        "Save the input to track your spending automatically",
      ],
    },
    {
      id: "3",
      title: "Viewing Spending & Analysis",
      icon: "stats-chart",
      content: [
        'Open "My Spending" from the dashboard',
        "View all logged inputs in chronological order",
        "Filter spending by category or date range",
        "See total spending breakdown and trends",
        "Export spending reports for record keeping",
      ],
    },
    {
      id: "4",
      title: "Finding Suppliers & Comparing Prices",
      icon: "pricetag",
      content: [
        "Browse the Supplier Directory by category or location",
        "View supplier ratings, products, and price ranges",
        "Compare regional prices for selected inputs",
        "Check average prices in your State and LGA",
        "Identify best-value suppliers before purchasing",
      ],
    },
    {
      id: "5",
      title: "Buying Groups & Notifications",
      icon: "people",
      content: [
        "Join buying groups based on crop or location",
        "Participate in bulk purchase opportunities",
        "Create a buying group and invite other farmers",
        "Receive alerts for price drops and group updates",
        "Get notified when minimum order targets are met",
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#22c55e" />
        </Pressable>
        <Text style={styles.headerTitle}>User Guide</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.introCard}>
          <Ionicons name="help-circle" size={32} color="#3b82f6" />
          <Text style={styles.introTitle}>Welcome to FarmInput</Text>
          <Text style={styles.introText}>
            Learn how to track farm inputs, manage spending, compare prices, and
            save money through group purchasing.
          </Text>
        </View>

        {sections.map((section) => (
          <View key={section.id} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View
                style={[styles.sectionIcon, { backgroundColor: "#22c55e20" }]}
              >
                <Ionicons
                  name={section.icon as any}
                  size={20}
                  color="#22c55e"
                />
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>

            {section.content.map((item, index) => (
              <View key={index} style={styles.contentItem}>
                <View style={styles.bullet} />
                <Text style={styles.contentText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.tipsCard}>
          <Ionicons name="bulb" size={24} color="#f59e0b" />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.tipsTitle}>Helpful Tip</Text>
            <Text style={styles.tipsText}>
              Keep your inputs updated regularly to get accurate spending
              insights and better price comparisons.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
    color: "#1f2937",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 20,
  },
  introCard: {
    backgroundColor: "#eff6ff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  introTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginTop: 12,
    marginBottom: 8,
  },
  introText: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1f2937",
  },
  contentItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22c55e",
    marginTop: 6,
    marginRight: 10,
  },
  contentText: {
    fontSize: 13,
    color: "#6b7280",
    flex: 1,
    lineHeight: 18,
  },
  tipsCard: {
    flexDirection: "row",
    backgroundColor: "#fffbeb",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#92400e",
    marginBottom: 4,
  },
  tipsText: {
    fontSize: 12,
    color: "#b45309",
    lineHeight: 16,
  },
});

export default UserGuide;

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Introduction",
      content:
        'FarmInput ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the FarmInput mobile application and services.',
    },
    {
      title: "Information We Collect",
      content:
        "We collect personal information such as your phone number, name, profile details, farm location (State, LGA, Village), farm size, crops, and optional profile photo. We also collect farm input records, supplier details, spending data, usage information, device data, and buying group participation details.",
    },
    {
      title: "How We Use Your Information",
      content:
        "Your information is used to provide and maintain the FarmInput service, authenticate users, manage farm input records, generate spending analytics, compare regional prices using anonymized data, facilitate buying groups, send notifications, improve app features, provide support, and prevent fraud.",
    },
    {
      title: "Information Sharing",
      content:
        "We may share anonymized and aggregated price data for regional comparisons. When you join buying groups, your name and basic profile are visible to group members. Supplier reviews you submit are publicly visible. We do not sell your personal data or share your contact details with advertisers.",
    },
    {
      title: "Data Security",
      content:
        "We use industry-standard security measures including encrypted data transmission, secure cloud storage, regular security updates, limited employee access, and OTP-based authentication. However, no system is completely secure, and absolute security cannot be guaranteed.",
    },
    {
      title: "Data Retention",
      content:
        "We retain your data for as long as your account is active or as required to provide services. You may request account deletion at any time. Some information may be retained for up to 90 days after deletion for legal, security, or compliance purposes.",
    },
    {
      title: "Your Privacy Rights",
      content:
        "You have the right to access, correct, export, or delete your personal data, opt out of non-essential communications, and withdraw consent for processing. These actions can be taken through the app or by contacting privacy@farminput.com.",
    },
    {
      title: "Children’s Privacy",
      content:
        "FarmInput is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If such data is identified, it will be deleted promptly.",
    },
    {
      title: "Third-Party Services",
      content:
        "FarmInput may link to third-party services such as supplier websites and uses external analytics and crash-reporting tools. We are not responsible for the privacy practices of these third parties.",
    },
    {
      title: "International Data Transfers",
      content:
        "Your data is primarily stored on servers located in Nigeria. If you access the app from outside Nigeria, your data may be transferred to and processed within Nigeria.",
    },
    {
      title: "Contact Us",
      content:
        "If you have questions or concerns about this Privacy Policy, please contact us at privacy@farminput.com or FarmInput Technologies Ltd., 123 Agriculture Boulevard, Abuja, Nigeria.",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#22c55e" />
        </Pressable>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.introCard}>
          <Ionicons name="shield-checkmark" size={32} color="#22c55e" />
          <Text style={styles.introTitle}>Your Privacy Matters</Text>
          <Text style={styles.introText}>
            We are transparent about how we collect, use, and protect your
            information
          </Text>
        </View>

        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        <View style={styles.lastUpdated}>
          <Text style={styles.lastUpdatedText}>
            Last updated: January 10, 2026
          </Text>
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
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#dcfce7",
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
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 20,
  },
  lastUpdated: {
    alignItems: "center",
    paddingVertical: 12,
  },
  lastUpdatedText: {
    fontSize: 12,
    color: "#9ca3af",
  },
});

export default PrivacyPolicy;

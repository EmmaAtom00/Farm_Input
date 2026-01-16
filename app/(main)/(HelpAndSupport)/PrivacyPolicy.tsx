import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Introduction',
      content:
        'FarmInput is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.',
    },
    {
      title: 'Information We Collect',
      content:
        'We collect information you provide directly, such as your name, email address, and farm details. We also collect information about your usage patterns and interactions with our app to improve our services.',
    },
    {
      title: 'How We Use Your Information',
      content:
        'Your information is used to provide and improve our services, process transactions, send notifications, and analyze usage patterns. We never sell your personal information to third parties.',
    },
    {
      title: 'Data Security',
      content:
        'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
    },
    {
      title: 'Your Rights',
      content:
        'You have the right to access, update, or delete your personal information at any time. You can manage your preferences in your account settings.',
    },
    {
      title: 'Contact Us',
      content:
        'If you have any questions about this Privacy Policy, please contact us at privacy@farminput.com',
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
            We take your privacy seriously and are transparent about how we handle your data
          </Text>
        </View>

        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        <View style={styles.lastUpdated}>
          <Text style={styles.lastUpdatedText}>Last updated: January 2024</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
    color: '#1f2937',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 20,
  },
  introCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#dcfce7',
  },
  introTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 12,
    marginBottom: 8,
  },
  introText: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 20,
  },
  lastUpdated: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  lastUpdatedText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default PrivacyPolicy;
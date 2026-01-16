import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TermsOfService = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content:
        'By creating an account or using FarmInput, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our Service. You must be at least 18 years old to use FarmInput.',
    },
    {
      title: '2. Service Description',
      content:
        'FarmInput provides a platform for farmers to track and manage farm input purchases, analyze spending patterns and trends, compare regional input prices, find and rate agricultural suppliers, join or create buying groups for bulk purchasing, and communicate with other farmers. We reserve the right to modify, suspend, or discontinue any part of the Service at any time with or without notice.',
    },
    {
      title: '3. User Accounts and Registration',
      content:
        'You must provide a valid phone number to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate your account if you violate these Terms or engage in fraudulent, abusive, or illegal activities.',
    },
    {
      title: '4. User Responsibilities and Conduct',
      content:
        'When using FarmInput, you agree to provide accurate and truthful information, use the Service only for lawful purposes, respect the rights and property of other users, not post false or misleading information, not harass or abuse other users, not attempt to hack or disrupt the Service, and not impersonate others or create fake accounts.',
    },
    {
      title: '5. User Content and Data',
      content:
        'You retain ownership of all data you input into FarmInput. By using the Service, you grant us a license to use, store, and process your data to provide and improve the Service. We may use anonymized, aggregated data for regional price comparisons and analytics. All content you post must be respectful, honest, and comply with applicable laws.',
    },
    {
      title: '6. Buying Groups',
      content:
        'FarmInput facilitates connections between farmers for group purchasing but is not a party to any transactions. Users are solely responsible for verifying supplier credentials, negotiating payment terms, and coordinating delivery. We do not guarantee the success of group purchases, product quality, or supplier reliability.',
    },
    {
      title: '7. Pricing Information',
      content:
        'Regional price comparisons are based on user-submitted data and provided for informational purposes only. Actual prices may vary. We do not guarantee the accuracy, completeness, or timeliness of pricing information. Always verify current prices with suppliers before making purchases.',
    },
    {
      title: '8. Intellectual Property',
      content:
        'The FarmInput app, including all software, design, text, graphics, logos, and other materials, is owned by FarmInput Technologies Ltd and protected by intellectual property laws. You may not copy, modify, distribute, sell, or reverse engineer any part of the Service without our express written permission.',
    },
    {
      title: '9. Disclaimers and Limitation of Liability',
      content:
        'FarmInput is provided "as is" and "as available" without warranties of any kind. We do not guarantee that the Service will be uninterrupted or error-free. FarmInput is a record-keeping and networking tool and does not provide agricultural, financial, or legal advice. To the maximum extent permitted by law, FarmInput Technologies Ltd shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.',
    },
    {
      title: '10. Indemnification',
      content:
        'You agree to indemnify and hold harmless FarmInput Technologies Ltd, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Service, violation of these Terms, or infringement of any rights of another party.',
    },
    {
      title: '11. Modifications to Terms',
      content:
        'We reserve the right to modify these Terms at any time. We will notify users of significant changes via app notification or email. Your continued use of FarmInput after changes constitutes acceptance of the modified Terms. We recommend reviewing these Terms periodically.',
    },
    {
      title: '12. Termination',
      content:
        'You may terminate your account at any time through the app settings. Upon termination, your right to use the Service ceases immediately. We may terminate or suspend your account immediately, without prior notice, if you breach these Terms or engage in conduct that we determine to be harmful to the Service or other users.',
    },
    {
      title: '13. Governing Law and Dispute Resolution',
      content:
        'These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms or your use of FarmInput shall be resolved through good-faith negotiation. If negotiation fails, disputes shall be resolved through arbitration in Abuja, Nigeria, in accordance with the Arbitration and Conciliation Act.',
    },
    {
      title: '14. Severability',
      content:
        'If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.',
    },
    {
      title: '15. Entire Agreement',
      content:
        'These Terms, together with our Privacy Policy, constitute the entire agreement between you and FarmInput Technologies Ltd regarding the use of the Service, superseding any prior agreements.',
    },
    {
      title: 'Contact Us',
      content:
        'If you have questions about these Terms of Service, please contact us at: Email: legal@farminput.com | Address: FarmInput Technologies Ltd. 123 Agriculture Boulevard Abuja, Nigeria | Phone: +234 800 FARM INPUT',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#22c55e" />
        </Pressable>
        <Text style={styles.headerTitle}>Terms of Service</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.introCard}>
          <Ionicons name="document-text" size={32} color="#3b82f6" />
          <Text style={styles.introTitle}>Terms & Conditions</Text>
          <Text style={styles.introText}>
            Please read these terms carefully before using FarmInput
          </Text>
        </View>

        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        <View style={styles.lastUpdated}>
          <Text style={styles.lastUpdatedText}>Last updated: January 10, 2026</Text>
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
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#bfdbfe',
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

export default TermsOfService;
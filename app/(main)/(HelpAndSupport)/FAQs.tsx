import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const FAQs = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I create an account?',
      answer:
        'Download the FarmInput app, tap Sign Up, enter your name, email, and password. Verify your email and complete your profile with farm details.',
    },
    {
      id: '2',
      question: 'How do I record farm inputs?',
      answer:
        'Go to the dashboard and tap "Record Input". Select the input type, enter quantity, unit, and cost. You can add notes for reference. Your spending is automatically tracked.',
    },
    {
      id: '3',
      question: 'Can I compare prices from different suppliers?',
      answer:
        'Yes! Use the "Compare Prices" feature to search for products and see prices from multiple suppliers. You can filter by rating, delivery time, and availability.',
    },
    {
      id: '4',
      question: 'What are buying groups?',
      answer:
        'Buying groups are communities of farmers who pool their orders to get bulk discounts. Join groups that match your needs and get notifications about group orders.',
    },
    {
      id: '5',
      question: 'How do I track my spending?',
      answer:
        'Go to "My Spending" to see your total spending, breakdown by category, and recent transactions. This helps you manage your farm budget effectively.',
    },
    {
      id: '6',
      question: 'Is my data secure?',
      answer:
        'Yes, we use industry-standard encryption and security measures to protect your personal and financial information. See our Privacy Policy for more details.',
    },
    {
      id: '7',
      question: 'How do I reset my password?',
      answer:
        'On the login screen, tap "Forgot Password", enter your email, and follow the instructions sent to your email to reset your password.',
    },
    {
      id: '8',
      question: 'Can I edit my profile?',
      answer:
        'Yes, go to your profile settings and tap "Edit Profile" to update your name, email, and other information.',
    },
  ];

  const renderFAQ = ({ item }: { item: FAQ }) => (
    <Pressable
      style={styles.faqCard}
      onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
    >
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{item.question}</Text>
        <Ionicons
          name={expandedId === item.id ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#22c55e"
        />
      </View>

      {expandedId === item.id && (
        <View style={styles.answerContainer}>
          <Text style={styles.answer}>{item.answer}</Text>
        </View>
      )}
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#22c55e" />
        </Pressable>
        <Text style={styles.headerTitle}>FAQs</Text>
      </View>

      <View style={styles.introCard}>
        <Ionicons name="help-circle" size={32} color="#f59e0b" />
        <Text style={styles.introTitle}>Frequently Asked Questions</Text>
        <Text style={styles.introText}>
          Find answers to common questions about FarmInput
        </Text>
      </View>

      <FlatList
        data={faqs}
        renderItem={renderFAQ}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
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
  introCard: {
    marginHorizontal: 12,
    marginVertical: 12,
    backgroundColor: '#fffbeb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  introTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 12,
    marginBottom: 4,
  },
  introText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingBottom: 20,
  },
  faqCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  question: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
    marginRight: 12,
  },
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  answer: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 20,
  },
});

export default FAQs;
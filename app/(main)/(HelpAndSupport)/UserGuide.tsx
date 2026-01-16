import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserGuide = () => {
  const sections = [
    {
      id: '1',
      title: 'Getting Started',
      icon: 'rocket',
      content: [
        'Create your account with your email and password',
        'Complete your profile with farm details',
        'Set up your preferences for notifications',
      ],
    },
    {
      id: '2',
      title: 'Recording Farm Inputs',
      icon: 'leaf',
      content: [
        'Go to "Record Input" from the dashboard',
        'Select the input type (seeds, fertilizer, etc.)',
        'Enter quantity, unit, and cost',
        'Add notes for reference',
        'Your spending is automatically tracked',
      ],
    },
    {
      id: '3',
      title: 'Comparing Prices',
      icon: 'pricetag',
      content: [
        'Use the "Compare Prices" feature to find best deals',
        'Search for specific products or suppliers',
        'Check ratings and delivery times',
        'View offers from multiple suppliers',
      ],
    },
    {
      id: '4',
      title: 'Joining Buying Groups',
      icon: 'people',
      content: [
        'Browse available buying groups',
        'Check group details and discount rates',
        'Join groups that match your needs',
        'Get notifications about group orders',
      ],
    },
    {
      id: '5',
      title: 'Managing Your Profile',
      icon: 'person',
      content: [
        'Update your name and email anytime',
        'View your activity history',
        'Manage notification preferences',
        'Logout when done',
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
          <Text style={styles.introTitle}>How to Use FarmInput</Text>
          <Text style={styles.introText}>
            Learn how to make the most of FarmInput to manage your farm efficiently
          </Text>
        </View>

        {sections.map((section) => (
          <View key={section.id} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View
                style={[
                  styles.sectionIcon,
                  { backgroundColor: '#22c55e20' },
                ]}
              >
                <Ionicons name={section.icon as any} size={20} color="#22c55e" />
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
            <Text style={styles.tipsTitle}>Pro Tips</Text>
            <Text style={styles.tipsText}>
              Regularly update your farm inputs to get accurate spending analytics
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  contentItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
    marginTop: 6,
    marginRight: 10,
  },
  contentText: {
    fontSize: 13,
    color: '#6b7280',
    flex: 1,
    lineHeight: 18,
  },
  tipsCard: {
    flexDirection: 'row',
    backgroundColor: '#fffbeb',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 4,
  },
  tipsText: {
    fontSize: 12,
    color: '#b45309',
    lineHeight: 16,
  },
});

export default UserGuide;
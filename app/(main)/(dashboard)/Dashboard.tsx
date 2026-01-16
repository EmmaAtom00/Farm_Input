import { getGroups, getUserData, logout } from '@/constant/api';
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  route: string;
}

interface StatCard {
  id: string;
  label: string;
  value: string;
  icon: string;
  color: string;
  route?: string;
}

interface UserInput {
  id: string;
  category: string;
  quantity: number;
  unit: string;
  cost: number;
  date: string;
}

const Dashboard = () => {
  const [userName, setUserName] = useState('User');
  const [totalInputs, setTotalInputs] = useState('0');
  const [activeGroupsCount, setActiveGroupsCount] = useState('0');
  const [userInputs, setUserInputs] = useState<UserInput[]>([]);
  const { logout: contextLogout } = useAuth();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const userData = await getUserData();
      console.log(userData)
      if (userData?.name) {
        setUserName(userData.name);
      }

      // Fetch groups to count active ones
      const groupsData = await getGroups();
      if (groupsData.success && groupsData.groups) {
        const activeGroups = groupsData.groups.filter((g: any) => g.status === 'active');
        setActiveGroupsCount(activeGroups.length.toString());
      }

      // Mock user inputs - in production, fetch from API
      setTotalInputs('12');
      setUserInputs([
        {
          id: '1',
          category: 'Seeds',
          quantity: 5,
          unit: 'kg',
          cost: 2500,
          date: '2 hours ago',
        },
        {
          id: '2',
          category: 'Fertilizer',
          quantity: 10,
          unit: 'bags',
          cost: 3500,
          date: '1 day ago',
        },
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      await contextLogout();
      router.replace('/(core)');
    } catch (error) {
      alert('Failed to logout. Please try again.');
      console.error('Logout error:', error);
    }
  };

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Record Input',
      icon: 'add-circle',
      color: '#22c55e',
      route: '/(main)/(newInput)/NewInput',
    },
    {
      id: '2',
      title: 'My Spending',
      icon: 'wallet',
      color: '#f59e0b',
      route: '/(main)/(mySpending)/MySpending',
    },
    {
      id: '3',
      title: 'Compare Prices',
      icon: 'pricetag',
      color: '#3b82f6',
      route: '/(main)/(comparePrices)/ComparePrices',
    },
    {
      id: '4',
      title: 'Buying Groups',
      icon: 'people',
      color: '#8b5cf6',
      route: '/(main)/(buyingGroups)/BuyingGroups',
    },
  ];

  const stats: StatCard[] = [
    {
      id: '1',
      label: 'Total Inputs',
      value: totalInputs,
      icon: 'leaf',
      color: '#22c55e',
      route: '/(main)/(dashboard)/MyInputs',
    },
    {
      id: '2',
      label: 'This Month',
      value: '₦8,500',
      icon: 'calendar',
      color: '#f59e0b',
    },
    {
      id: '3',
      label: 'Active Groups',
      value: activeGroupsCount,
      icon: 'people',
      color: '#3b82f6',
      route: '/(main)/(dashboard)/ActiveGroups',
    },
  ];

  const renderQuickAction = ({ item }: { item: QuickAction }) => (
    <Pressable
      style={styles.actionCard}
      onPress={() => router.push(item.route as any)}
    >
      <View style={[styles.actionIcon, { backgroundColor: item.color + '20' }]}>
        <Ionicons name={item.icon as any} size={28} color={item.color} />
      </View>
      <Text style={styles.actionTitle}>{item.title}</Text>
    </Pressable>
  );

  const renderStatCard = ({ item }: { item: StatCard }) => (
    <Pressable
      style={styles.statCard}
      onPress={() => item.route && router.push(item.route as any)}
    >
      <View style={[styles.statIcon, { backgroundColor: item.color + '20' }]}>
        <Ionicons name={item.icon as any} size={24} color={item.color} />
      </View>
      <Text style={styles.statLabel}>{item.label}</Text>
      <Text style={styles.statValue}>{item.value}</Text>
    </Pressable>
  );

  const renderUserInput = ({ item }: { item: UserInput }) => (
    <View style={styles.inputCard}>
      <View style={styles.inputContent}>
        <Text style={styles.inputCategory}>{item.category}</Text>
        <Text style={styles.inputDetails}>
          {item.quantity} {item.unit} • ₦{item.cost.toLocaleString()}
        </Text>
        <Text style={styles.inputDate}>{item.date}</Text>
      </View>
      <Pressable onPress={() => router.push('/(main)/(newInput)/NewInput' as any)}>
        <Ionicons name="pencil" size={20} color="#22c55e" />
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{userName}!</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Pressable onPress={() => router.push('/(main)/(notification)/Notification' as any)}>
              <Ionicons name="notifications-outline" size={24} color="#22c55e" />
            </Pressable>
            <Pressable onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color="#ef4444" />
            </Pressable>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <FlatList
            data={stats}
            renderItem={renderStatCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <FlatList
            data={quickActions}
            renderItem={renderQuickAction}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
          />
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <View style={styles.activityHeader}>
            <Text style={styles.sectionTitle}>Your Recent Inputs</Text>
            <Pressable onPress={() => router.push('/(main)/(dashboard)/MyInputs' as any)}>
              <Text style={styles.viewAll}>View All</Text>
            </Pressable>
          </View>

          {userInputs.length > 0 ? (
            <FlatList
              data={userInputs}
              renderItem={renderUserInput}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="leaf-outline" size={40} color="#d1d5db" />
              <Text style={styles.emptyText}>No inputs recorded yet</Text>
            </View>
          )}
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          <View style={styles.activityCard}>
            <View style={[styles.activityIcon, { backgroundColor: '#22c55e20' }]}>
              <Ionicons name="leaf" size={20} color="#22c55e" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.activityTitle}>Seeds purchased</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
            <Text style={styles.activityAmount}>₦2,500</Text>
          </View>

          <View style={styles.activityCard}>
            <View style={[styles.activityIcon, { backgroundColor: '#f59e0b20' }]}>
              <Ionicons name="water" size={20} color="#f59e0b" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.activityTitle}>Fertilizer applied</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
            <Text style={styles.activityAmount}>₦3,500</Text>
          </View>

          <View style={styles.activityCard}>
            <View style={[styles.activityIcon, { backgroundColor: '#3b82f620' }]}>
              <Ionicons name="people" size={20} color="#3b82f6" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.activityTitle}>Joined buying group</Text>
              <Text style={styles.activityTime}>3 days ago</Text>
            </View>
          </View>
        </View>

        {/* Help & Support Section */}
        <View style={styles.supportSection}>
          <Text style={styles.sectionTitle}>Help & Support</Text>

          <Pressable
            style={styles.supportCard}
            onPress={() => router.push('/(main)/(HelpAndSupport)/UserGuide' as any)}
          >
            <View style={[styles.supportIcon, { backgroundColor: '#3b82f620' }]}>
              <Ionicons name="book" size={20} color="#3b82f6" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.supportTitle}>User Guide</Text>
              <Text style={styles.supportSubtitle}>Learn how to use FarmInput</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
          </Pressable>

          <Pressable
            style={styles.supportCard}
            onPress={() => router.push('/(main)/(HelpAndSupport)/FAQs' as any)}
          >
            <View style={[styles.supportIcon, { backgroundColor: '#f59e0b20' }]}>
              <Ionicons name="help-circle" size={20} color="#f59e0b" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.supportTitle}>FAQs</Text>
              <Text style={styles.supportSubtitle}>Frequently asked questions</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
          </Pressable>

          <Pressable
            style={styles.supportCard}
            onPress={() => router.push('/(main)/(HelpAndSupport)/PrivacyPolicy' as any)}
          >
            <View style={[styles.supportIcon, { backgroundColor: '#22c55e20' }]}>
              <Ionicons name="shield-checkmark" size={20} color="#22c55e" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.supportTitle}>Privacy Policy</Text>
              <Text style={styles.supportSubtitle}>How we protect your data</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
          </Pressable>

          <Pressable
            style={styles.supportCard}
            onPress={() => router.push('/(main)/(HelpAndSupport)/TermsOfService' as any)}
          >
            <View style={[styles.supportIcon, { backgroundColor: '#8b5cf620' }]}>
              <Ionicons name="document-text" size={20} color="#8b5cf6" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.supportTitle}>Terms of Service</Text>
              <Text style={styles.supportSubtitle}>Our terms and conditions</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
          </Pressable>

          <Pressable
            style={styles.supportCard}
            onPress={() => router.push('/(main)/(profile)/Profile' as any)}
          >
            <View style={[styles.supportIcon, { backgroundColor: '#ef444420' }]}>
              <Ionicons name="person" size={20} color="#ef4444" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.supportTitle}>My Profile</Text>
              <Text style={styles.supportSubtitle}>View and manage your profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
          </Pressable>
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  greeting: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  statsSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  actionsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1f2937',
    textAlign: 'center',
  },
  activitySection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAll: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: '600',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
    color: '#9ca3af',
  },
  activityAmount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#22c55e',
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  inputContent: {
    flex: 1,
  },
  inputCategory: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  inputDetails: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  inputDate: {
    fontSize: 11,
    color: '#9ca3af',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 8,
  },
  supportSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  supportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  supportTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  supportSubtitle: {
    fontSize: 11,
    color: '#9ca3af',
  },
});

export default Dashboard;
import { getGroups, getInputsList, getUserData, logout } from "@/constant/api";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Route = Parameters<typeof router.push>[0];

interface QuickAction {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  route: Route;
}

interface StatCard {
  id: string;
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  route?: Route;
}

interface UserInput {
  id: string;
  category: string;
  quantity: number;
  unit: string;
  cost: number;
  date: string;
  notes: string;
}

const Dashboard = () => {
  const [userName, setUserName] = useState("User");
  const [totalInputs, setTotalInputs] = useState("0");
  const [monthlySpending, setMonthlySpending] = useState("₦0");
  const [activeGroupsCount, setActiveGroupsCount] = useState("0");
  const [userInputs, setUserInputs] = useState<UserInput[]>([]);
  const {logoutUser} = useAuth()

  const loadDashboardData = useCallback(async () => {
    try {
      const userData = await getUserData();

      if (userData?.full_name) setUserName(userData.full_name);

      const groupsData = await getGroups();
      if (groupsData?.success && Array.isArray(groupsData.groups)) {
        const activeGroups = groupsData.groups.filter(
          (g: { status: string }) => g.status === "active",
        );
        setActiveGroupsCount(activeGroups.length.toString());
      }

      const inputsData = await getInputsList();

      if (Array.isArray(inputsData)) {
        const inputs = [...inputsData].reverse();

        setTotalInputs(inputs.length.toString());

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const totalMCost = inputs.reduce((sum, input: any) => {
          const date = input.purchase_date
            ? new Date(input.purchase_date)
            : null;

          if (
            date &&
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
          ) {
            return sum + (input.unit_price || 0);
          }
          return sum;
        }, 0);

        setMonthlySpending(`₦${totalMCost.toLocaleString()}`);

        const transformedInputs: UserInput[] = inputs
          .slice(0, 2)
          .map((input: any) => ({
            id: input._id?.toString(),
            category: input.category || "Unknown",
            quantity: input.quantity || 0,
            unit: input.unit || "",
            cost: input.unit_price || 0,
            date: input.purchase_date
              ? new Date(input.purchase_date).toLocaleDateString()
              : "Unknown",
            notes: input.notes || "",
          }));

        setUserInputs(transformedInputs);
      } else {
        setTotalInputs("0");
        setMonthlySpending("₦0");
        setUserInputs([]);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setTotalInputs("0");
      setMonthlySpending("₦0");
      setUserInputs([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDashboardData();
    }, [loadDashboardData]),
  );

  const handleLogout = async () => {
    try {
      await logoutUser()
      await logout();
    } catch (error) {
      alert("Failed to logout. Please try again.");
      console.error("Logout error:", error);
    }
  };

  const quickActions: QuickAction[] = [
    {
      id: "1",
      title: "Record Input",
      icon: "add-circle",
      color: "#22c55e",
      route: "/(main)/(newInput)/NewInput",
    },
    {
      id: "2",
      title: "My Spending",
      icon: "wallet",
      color: "#f59e0b",
      route: "/(main)/(mySpending)/MySpending",
    },
    {
      id: "3",
      title: "Compare Prices",
      icon: "pricetag",
      color: "#3b82f6",
      route: "/(main)/(comparePrices)/ComparePrices",
    },
    {
      id: "4",
      title: "Buying Groups",
      icon: "people",
      color: "#8b5cf6",
      route: "/(main)/(buyingGroups)/BuyingGroups",
    },
  ];

  const stats: StatCard[] = [
    {
      id: "1",
      label: "Total Inputs",
      value: totalInputs,
      icon: "leaf",
      color: "#22c55e",
      route: "/(main)/(dashboard)/MyInputs",
    },
    {
      id: "2",
      label: "This Month",
      value: monthlySpending,
      icon: "calendar",
      color: "#f59e0b",
    },
    {
      id: "3",
      label: "Active Groups",
      value: activeGroupsCount,
      icon: "people",
      color: "#3b82f6",
      route: "/(main)/(dashboard)/ActiveGroups",
    },
  ];

  const renderQuickAction = ({ item }: { item: QuickAction }) => (
    <Pressable
      style={styles.actionCard}
      onPress={() => router.push(item.route)}
    >
      <View style={[styles.actionIcon, { backgroundColor: item.color + "20" }]}>
        <Ionicons name={item.icon} size={28} color={item.color} />
      </View>
      <Text style={styles.actionTitle}>{item.title}</Text>
    </Pressable>
  );

  const renderStatCard = ({ item }: { item: StatCard }) => (
    <Pressable
      style={styles.statCard}
      onPress={() => item.route && router.push(item.route)}
    >
      <View style={[styles.statIcon, { backgroundColor: item.color + "20" }]}>
        <Ionicons name={item.icon} size={24} color={item.color} />
      </View>
      <Text style={styles.statLabel}>{item.label}</Text>
      <Text style={styles.statValue}>{item.value}</Text>
    </Pressable>
  );

  const renderUserInput = ({ item }: { item: UserInput }) => {
    
    return (
      <View style={styles.inputCard}>
        <View style={styles.inputContent}>
          <Text style={styles.inputCategory}>{item.category}</Text>
          <Text style={styles.inputDetails}>
            {item.quantity} {item.unit} • ₦{item.cost}
          </Text>
          <Text style={styles.inputDate}>{item.date}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(main)/(newInput)/EditInput",
                params: {
                  id: item.id,
                  category: item.category,
                  quantity: item.quantity.toString(),
                  unit: item.unit,
                  cost: item.cost.toString(),
                  date: item.date,
                  notes: item.notes,
                },
              })
            }
          >
            <Ionicons name="pencil" size={20} color="green" />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{userName}!</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
            <Pressable
              onPress={() => router.push("/(main)/(notification)/Notification")}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#22c55e"
              />
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
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 12,
            }}
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
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          />
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <View style={styles.activityHeader}>
            <Text style={styles.sectionTitle}>Your Recent Inputs</Text>
            <Pressable
              onPress={() => router.push("/(main)/(dashboard)/MyInputs")}
            >
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
            <View
              style={[styles.activityIcon, { backgroundColor: "#22c55e20" }]}
            >
              <Ionicons name="leaf" size={20} color="#22c55e" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.activityTitle}>Seeds purchased</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
            <Text style={styles.activityAmount}>₦2,500</Text>
          </View>

          <View style={styles.activityCard}>
            <View
              style={[styles.activityIcon, { backgroundColor: "#f59e0b20" }]}
            >
              <Ionicons name="water" size={20} color="#f59e0b" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.activityTitle}>Fertilizer applied</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
            <Text style={styles.activityAmount}>₦3,500</Text>
          </View>

          <View style={styles.activityCard}>
            <View
              style={[styles.activityIcon, { backgroundColor: "#3b82f620" }]}
            >
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
            onPress={() => router.push("/(main)/(HelpAndSupport)/UserGuide")}
          >
            <View
              style={[styles.supportIcon, { backgroundColor: "#3b82f620" }]}
            >
              <Ionicons name="book" size={20} color="#3b82f6" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.supportTitle}>User Guide</Text>
              <Text style={styles.supportSubtitle}>
                Learn how to use FarmInput
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
          </Pressable>

          <Pressable
            style={styles.supportCard}
            onPress={() => router.push("/(main)/(HelpAndSupport)/FAQs")}
          >
            <View
              style={[styles.supportIcon, { backgroundColor: "#f59e0b20" }]}
            >
              <Ionicons name="help-circle" size={20} color="#f59e0b" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.supportTitle}>FAQs</Text>
              <Text style={styles.supportSubtitle}>
                Frequently asked questions
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
          </Pressable>

          <Pressable
            style={styles.supportCard}
            onPress={() =>
              router.push("/(main)/(HelpAndSupport)/PrivacyPolicy")
            }
          >
            <View
              style={[styles.supportIcon, { backgroundColor: "#22c55e20" }]}
            >
              <Ionicons name="shield-checkmark" size={20} color="#22c55e" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.supportTitle}>Privacy Policy</Text>
              <Text style={styles.supportSubtitle}>
                How we protect your data
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
          </Pressable>

          <Pressable
            style={styles.supportCard}
            onPress={() =>
              router.push("/(main)/(HelpAndSupport)/TermsOfService")
            }
          >
            <View
              style={[styles.supportIcon, { backgroundColor: "#8b5cf620" }]}
            >
              <Ionicons name="document-text" size={20} color="#8b5cf6" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.supportTitle}>Terms of Service</Text>
              <Text style={styles.supportSubtitle}>
                Our terms and conditions
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
          </Pressable>

          <Pressable
            style={styles.supportCard}
            onPress={() => router.push("/(main)/(profile)/Profile")}
          >
            <View
              style={[styles.supportIcon, { backgroundColor: "#ef444420" }]}
            >
              <Ionicons name="person" size={20} color="#ef4444" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.supportTitle}>My Profile</Text>
              <Text style={styles.supportSubtitle}>
                View and manage your profile
              </Text>
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
    backgroundColor: "#f9fafb",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  greeting: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
  },
  statsSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 11,
    color: "#6b7280",
    marginBottom: 4,
    textAlign: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
  },
  actionsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1f2937",
    textAlign: "center",
  },
  activitySection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  viewAll: {
    fontSize: 12,
    color: "#22c55e",
    fontWeight: "600",
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
    color: "#9ca3af",
  },
  activityAmount: {
    fontSize: 13,
    fontWeight: "600",
    color: "#22c55e",
  },
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  inputContent: {
    flex: 1,
  },
  inputCategory: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  inputDetails: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  inputDate: {
    fontSize: 11,
    color: "#9ca3af",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 13,
    color: "#9ca3af",
    marginTop: 8,
  },
  supportSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  supportCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  supportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  supportTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  supportSubtitle: {
    fontSize: 11,
    color: "#9ca3af",
  },
});

export default Dashboard;

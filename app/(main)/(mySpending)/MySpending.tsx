import { getSpendingSummary, getSpendingTrends } from "@/constant/api";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SpendingItem {
  id: string;
  type: string;
  description: string;
  amount: number;
  date: string;
  category:
    | "seeds"
    | "fertilizer"
    | "pesticide"
    | "equipment"
    | "labor"
    | "other";
}

interface SpendingSummary {
  period: string;
  total: number;
  items: {
    id: string;
    category: string;
    description: string;
    cost: number;
    date: string;
  }[];
}

const MySpending = () => {
  const [spendingData, setSpendingData] = useState<SpendingSummary | null>(
    null,
  );
  const [spending, setSpending] = useState<SpendingItem[]>([]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [categoryBreakdown, setCategoryBreakdown] = useState<
    Record<string, number>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpendingData();
  }, []);

  const fetchSpendingData = async () => {
    try {
      setLoading(true);

      const [summaryData, trendsData] = await Promise.all([
        getSpendingSummary(),
        getSpendingTrends(),
      ]);

      if (summaryData) {
        setSpendingData(summaryData);
        setTotalSpending(summaryData.total ?? 0);

        if (Array.isArray(summaryData.items)) {
          const transformedItems: SpendingItem[] = summaryData.items.map(
            (item: any) => ({
              id: item.id,
              type: item.category,
              description: item.description,
              amount: item.cost,
              date: item.date,
              category: item.category.toLowerCase() as SpendingItem["category"],
            }),
          );

          setSpending(transformedItems);
        } else {
          setSpending([]);
        }
      }

      if (trendsData?.success && trendsData.breakdown) {
        setCategoryBreakdown(trendsData.breakdown);
      } else {
        setCategoryBreakdown({});
      }
    } catch (error) {
      console.error("Error fetching spending data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      seeds: "#22c55e",
      fertilizer: "#f59e0b",
      pesticide: "#ef4444",
      equipment: "#3b82f6",
      labor: "#8b5cf6",
      other: "#6b7280",
    };
    return colors[category] || "#6b7280";
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      seeds: "leaf",
      fertilizer: "water",
      pesticide: "bug",
      equipment: "hammer",
      labor: "people",
      other: "help-circle",
    };
    return icons[category] || "help-circle";
  };

  const renderSpendingItem = ({ item }: { item: SpendingItem }) => (
    <View style={styles.spendingCard}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: getCategoryColor(item.category) + "20" },
        ]}
      >
        <Ionicons
          name={getCategoryIcon(item.category) as any}
          size={24}
          color={getCategoryColor(item.category)}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.itemType}>{item.type}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemDate}>{item.date}</Text>
      </View>

      <Text style={styles.amount}>₦{item.amount.toLocaleString()}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#22c55e" />
          </Pressable>
          <Text style={styles.headerTitle}>My Spending</Text>
        </View>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Loading spending data...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#22c55e" />
        </Pressable>
        <Text style={styles.headerTitle}>My Spending</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Spending</Text>
          <Text style={styles.totalAmount}>
            ₦{totalSpending.toLocaleString()}
          </Text>
        </View>

        <FlatList
          data={Object.entries(categoryBreakdown)}
          keyExtractor={([category]) => category}
          scrollEnabled={false}
          style={styles.categoryList}
          renderItem={({ item: [category, amount] }) => (
            <View style={styles.categoryCard}>
              <View
                style={[
                  styles.categoryDot,
                  { backgroundColor: getCategoryColor(category) },
                ]}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.categoryName}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
                <Text style={styles.categoryAmount}>
                  ₦{amount.toLocaleString()}
                </Text>
              </View>
              <Text style={styles.categoryPercent}>
                {totalSpending > 0
                  ? ((amount / totalSpending) * 100).toFixed(0)
                  : 0}
                %
              </Text>
            </View>
          )}
        />
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>
          {spendingData?.period} Recent Spending
        </Text>
      </View>

      {spending.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="wallet-outline" size={64} color="#d1d5db" />
          <Text style={styles.emptyText}>No spending recorded yet</Text>
          <Text style={styles.emptySubtext}>
            Start recording your farm inputs to track spending
          </Text>
        </View>
      ) : (
        <FlatList
          data={spending}
          renderItem={renderSpendingItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.listContent, { paddingBottom: 80 }]}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
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
  statsContainer: { paddingHorizontal: 12, paddingVertical: 12 },
  totalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  totalLabel: { fontSize: 14, color: "#6b7280", marginBottom: 8 },
  totalAmount: { fontSize: 28, fontWeight: "700", color: "#22c55e" },
  categoryList: { marginBottom: 12 },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  categoryDot: { width: 12, height: 12, borderRadius: 6, marginRight: 12 },
  categoryName: { fontSize: 14, fontWeight: "500", color: "#1f2937" },
  categoryAmount: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  categoryPercent: { fontSize: 14, fontWeight: "600", color: "#1f2937" },
  listHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  listTitle: { fontSize: 16, fontWeight: "600", color: "#1f2937" },
  listContent: { paddingHorizontal: 12, paddingVertical: 8, paddingBottom: 20 },
  spendingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  content: { flex: 1 },
  itemType: { fontSize: 14, fontWeight: "600", color: "#1f2937" },
  itemDescription: { fontSize: 12, color: "#6b7280", marginBottom: 4 },
  itemDate: { fontSize: 11, color: "#9ca3af" },
  amount: { fontSize: 14, fontWeight: "700", color: "#22c55e" },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
  },
});

export default MySpending;

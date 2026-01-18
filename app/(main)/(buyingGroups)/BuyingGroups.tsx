import { getGroups, joinGroup } from "@/constant/api";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface BuyingGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  status: "active" | "pending" | "completed";
  discount: number;
  nextOrder: string;
}

const BuyingGroups = () => {
  const [groups, setGroups] = useState<BuyingGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [joiningGroupId, setJoiningGroupId] = useState<string | null>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;

  /* ---------------- FETCH GROUPS ---------------- */
  const fetchGroups = useCallback(async () => {
    try {
      const data = await getGroups();
      if (data?.success && data.groups) {
        const transformed: BuyingGroup[] = data.groups.map((group: any) => ({
          id: group.id,
          name: group.name,
          description: group.description,
          members: group.member_count ?? 0,
          status: group.status ?? "active",
          discount: group.discount_percentage ?? 0,
          nextOrder: group.next_order_date ?? "TBD",
        }));
        setGroups(transformed);
      } else {
        setGroups([]);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
      setGroups([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  /* ---------------- CREATE GROUP MODAL ---------------- */
  const openCreateGroup = useCallback(() => {
    setShowCreateGroup(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const closeCreateGroup = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setShowCreateGroup(false));
  }, [slideAnim]);

  /* ---------------- JOIN GROUP ---------------- */
  const handleJoinGroup = useCallback(
    async (groupId: string) => {
      setJoiningGroupId(groupId);
      try {
        const response = await joinGroup(groupId);
        if (response?.success) {
          alert("Successfully joined the group!");
          fetchGroups();
        } else {
          alert(response?.message || "Failed to join group");
        }
      } catch (error) {
        console.error("Join group error:", error);
        alert("Failed to join group. Please try again.");
      } finally {
        setJoiningGroupId(null);
      }
    },
    [fetchGroups],
  );

  /* ---------------- HELPERS ---------------- */
  const getStatusColor = (status: BuyingGroup["status"]) => {
    switch (status) {
      case "active":
        return "#22c55e";
      case "pending":
        return "#f59e0b";
      case "completed":
      default:
        return "#6b7280";
    }
  };

  const getStatusLabel = (status: BuyingGroup["status"]) =>
    status.charAt(0).toUpperCase() + status.slice(1);

  /* ---------------- MODAL COMPONENT ---------------- */
  const CreateGroupModal = useMemo(
    () => (
      <Modal visible={showCreateGroup} transparent animationType="none">
        <Pressable style={styles.modalOverlay} onPress={closeCreateGroup} />

        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [500, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create Buying Group</Text>
            <Pressable onPress={closeCreateGroup}>
              <Ionicons name="close" size={22} color="#6b7280" />
            </Pressable>
          </View>

          {/* FORM */}
          <View style={formStyles.form}>
            <View style={formStyles.field}>
              <Text style={formStyles.label}>Group Name</Text>
              <TextInput
                placeholder="e.g. Maize Farmers - Kaduna North"
                style={formStyles.input}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={formStyles.field}>
              <Text style={formStyles.label}>Product</Text>
              <TextInput
                placeholder="e.g. NPK Fertilizer"
                style={formStyles.input}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={formStyles.row}>
              <View style={formStyles.halfField}>
                <Text style={formStyles.label}>Members (Current)</Text>
                <TextInput
                  placeholder="12"
                  keyboardType="number-pad"
                  style={formStyles.input}
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={formStyles.halfField}>
                <Text style={formStyles.label}>Max Members</Text>
                <TextInput
                  placeholder="15"
                  keyboardType="number-pad"
                  style={formStyles.input}
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            <View style={formStyles.field}>
              <Text style={formStyles.label}>Savings (%)</Text>
              <TextInput
                placeholder="15"
                keyboardType="number-pad"
                style={formStyles.input}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={formStyles.field}>
              <Text style={formStyles.label}>Combined Order (Bags)</Text>
              <TextInput
                placeholder="240"
                keyboardType="number-pad"
                style={formStyles.input}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={formStyles.field}>
              <Text style={formStyles.label}>Target Price / Unit (₦)</Text>
              <TextInput
                placeholder="10625"
                keyboardType="number-pad"
                style={formStyles.input}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={formStyles.field}>
              <Text style={formStyles.label}>Duration (Days)</Text>
              <TextInput
                placeholder="3"
                keyboardType="number-pad"
                style={formStyles.input}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <Pressable style={formStyles.submitButton}>
              <Text style={formStyles.submitText}>Create Group</Text>
            </Pressable>
          </View>
        </Animated.View>
      </Modal>
    ),
    [closeCreateGroup, showCreateGroup, slideAnim],
  );

  /* ---------------- RENDER GROUP ---------------- */
  const renderGroup = ({ item }: { item: BuyingGroup }) => (
    <Pressable style={styles.groupCard}>
      <View style={styles.groupHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.groupName}>{item.name}</Text>
          <Text style={styles.groupDescription}>{item.description}</Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) + "20" },
          ]}
        >
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {getStatusLabel(item.status)}
          </Text>
        </View>
      </View>

      <View style={styles.groupStats}>
        <View style={styles.statItem}>
          <Ionicons name="people" size={16} color="#6b7280" />
          <Text style={styles.statText}>{item.members} members</Text>
        </View>

        <View style={styles.statItem}>
          <Ionicons name="pricetag" size={16} color="#22c55e" />
          <Text style={[styles.statText, { color: "#22c55e", fontWeight: "600" }]}>
            {item.discount}% off
          </Text>
        </View>

        <View style={styles.statItem}>
          <Ionicons name="calendar" size={16} color="#6b7280" />
          <Text style={styles.statText}>{item.nextOrder}</Text>
        </View>
      </View>

      <Pressable
        style={[
          styles.joinButton,
          joiningGroupId === item.id && styles.joinButtonDisabled,
        ]}
        onPress={() => handleJoinGroup(item.id)}
        disabled={joiningGroupId === item.id}
      >
        <Text style={styles.joinButtonText}>
          {joiningGroupId === item.id ? "Joining..." : "Join Group"}
        </Text>
      </Pressable>
    </Pressable>
  );

  /* ---------------- UI ---------------- */
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#22c55e" />
          </Pressable>
          <Text style={styles.headerTitle}>Buying Groups</Text>
          <Pressable style={styles.createButton} onPress={openCreateGroup}>
            <Ionicons name="add-circle-outline" size={18} color="#22c55e" />
            <Text style={styles.createButtonText}>Create</Text>
          </Pressable>
        </View>

        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Loading groups...</Text>
        </View>

        {CreateGroupModal}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#22c55e" />
        </Pressable>
        <Text style={styles.headerTitle}>Buying Groups</Text>
        <Pressable style={styles.createButton} onPress={openCreateGroup}>
          <Ionicons name="add-circle-outline" size={18} color="#22c55e" />
          <Text style={styles.createButtonText}>Create</Text>
        </Pressable>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#3b82f6" />
        <Text style={styles.infoText}>
          Join groups to get discounts on bulk purchases
        </Text>
      </View>

      {groups.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="people-outline" size={64} color="#d1d5db" />
          <Text style={styles.emptyText}>No buying groups available</Text>
        </View>
      ) : (
        <FlatList
          data={groups}
          renderItem={renderGroup}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}

      {CreateGroupModal}
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
  createButton: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#ecfdf5',
  },
  createButtonText: {
    color: '#22c55e',
    fontSize: 13,
    fontWeight: '600',
  },


  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    minHeight: 300,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
    color: '#1f2937',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  infoText: {
    fontSize: 13,
    color: '#1e40af',
    marginLeft: 8,
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingBottom: 20,
  },
  groupCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  groupName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  groupStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 12,
    color: '#6b7280',
  },
  joinButton: {
    backgroundColor: '#22c55e',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  joinButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 12,
  },
});

const formStyles = StyleSheet.create({
  form: {
    marginTop: 16,
  },
  field: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  halfField: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});


export default BuyingGroups;
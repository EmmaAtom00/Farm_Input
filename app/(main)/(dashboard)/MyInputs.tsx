import { deleteInput, getInputsList } from "@/constant/api";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Route = Parameters<typeof router.push>[0];

interface UserInput {
  id: string;
  category: string;
  quantity: number;
  unit: string;
  cost: number;
  date: string;
  notes?: string;
}

const MyInputs = () => {
  const [userInputs, setUserInputs] = useState<UserInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedInput, setSelectedInput] = useState<UserInput | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<UserInput | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);

      if (diffDays < 1) return "Today";
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const fetchInputs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getInputsList();

      if (!Array.isArray(response)) {
        setUserInputs([]);
        return;
      }

      const formattedInputs: UserInput[] = response
        .map((input: any) => ({
          id: input.id || input._id,
          category: input.category,
          quantity: input.quantity,
          unit: input.unit,
          cost: input.unit_price || input.cost || 0,
          date: formatDate(input.purchase_date || input.date),
          notes: input.notes,
        }))
        .reverse();

      setUserInputs(formattedInputs);
    } catch (err) {
      console.error(err);
      setError("Failed to load inputs");
      setUserInputs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchInputs();
    }, [fetchInputs]),
  );

  const openModal = (input: UserInput) => {
    setSelectedInput(input);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedInput(null);
  };

  const openDeleteModal = (input: UserInput) => {
    setDeleteTarget(input);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setDeleteTarget(null);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteInput(deleteTarget.id);
      setUserInputs((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      closeDeleteModal();
    }
  };

  const renderInput = ({ item }: { item: UserInput }) => (
    <Pressable onPress={() => openModal(item)}>
      <View style={styles.inputCard}>
        <View style={styles.inputContent}>
          <Text style={styles.inputCategory}>{item.category}</Text>
          <Text style={styles.inputDetails}>
            {item.quantity} {item.unit} • ₦{item.cost.toLocaleString()}
          </Text>

          {item.notes && (
            <Text style={styles.inputNotes}>
              {item.notes.length > 30
                ? `${item.notes.slice(0, 30)}...`
                : item.notes}
            </Text>
          )}

          <Text style={styles.inputDate}>{item.date}</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 8 }}>
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
              } as Route)
            }
          >
            <Ionicons name="pencil" size={20} color="green" />
          </Pressable>

          <Pressable onPress={() => openDeleteModal(item)}>
            <Ionicons name="trash" size={20} color="#ef4444" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#22c55e" />
        </Pressable>

        <Text style={styles.headerTitle}>My Inputs</Text>

        <Pressable
          onPress={() => router.push("/(main)/(newInput)/NewInput" as Route)}
        >
          <Ionicons name="add-circle" size={24} color="#22c55e" />
        </Pressable>
      </View>

      {/* CONTENT */}
      {loading ? (
        <View style={styles.loadingState}>
          <Text>Loading inputs...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorState}>
          <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={userInputs}
          renderItem={renderInput}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* VIEW MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              {selectedInput && (
                <>
                  <Text style={styles.modalCategory}>
                    {selectedInput.category}
                  </Text>
                  <Text>
                    Quantity: {selectedInput.quantity} {selectedInput.unit}
                  </Text>
                  <Text>Cost: ₦{selectedInput.cost.toLocaleString()}</Text>
                  <Text>Date: {selectedInput.date}</Text>

                  {selectedInput.notes && (
                    <Text style={styles.modalNotes}>{selectedInput.notes}</Text>
                  )}
                </>
              )}
            </ScrollView>

            <Pressable style={styles.modalCloseButton} onPress={closeModal}>
              <Text style={styles.modalCloseText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* DELETE MODAL */}
      <Modal visible={deleteModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModalContent}>
            <Text style={styles.deleteModalText}>Delete this input?</Text>

            <View style={styles.deleteModalButtons}>
              <Pressable style={styles.cancelButton} onPress={closeDeleteModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>

              <Pressable style={styles.confirmButton} onPress={confirmDelete}>
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
  },

  listContent: { padding: 12 },

  inputCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  inputContent: { flex: 1, paddingRight: 8 },
  inputCategory: { fontWeight: "600", marginBottom: 4 },
  inputDetails: { color: "#6b7280", marginBottom: 4 },
  inputNotes: {
    fontSize: 12,
    color: "#9ca3af",
    fontStyle: "italic",
  },
  inputDate: { fontSize: 12, color: "#9ca3af" },

  loadingState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    marginTop: 8,
    color: "#ef4444",
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    maxHeight: "80%",
  },
  modalCategory: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  modalNotes: { marginTop: 12, color: "#6b7280" },
  modalCloseButton: {
    marginTop: 16,
    backgroundColor: "#22c55e",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalCloseText: { color: "#fff", fontWeight: "600" },

  deleteModalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  deleteModalText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },
  deleteModalButtons: { flexDirection: "row", gap: 12 },
  cancelButton: {
    backgroundColor: "#9ca3af",
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  confirmButton: {
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default MyInputs;

import { getInputCategories, logInput, updateInput } from "@/constant/api";
import styles from "@/constant/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface InputData {
  id?: string;
  category: string;
  quantity: number;
  unit: string;
  cost: number;
  date: string;
  notes?: string;
}

interface InputFormProps {
  initialData?: InputData; // if present → UPDATE, else CREATE
}

const InputForm = ({ initialData }: InputFormProps) => {
  const [inputType, setInputType] = useState(initialData?.category || "");
  const [quantity, setQuantity] = useState(
    initialData ? String(initialData.quantity) : "",
  );
  const [unit, setUnit] = useState(initialData?.unit || "");
  const [cost, setCost] = useState(initialData ? String(initialData.cost) : "");
  const [date, setDate] = useState(
    initialData?.date || new Date().toISOString().split("T")[0],
  );
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const units = ["kg", "liters", "bags", "units", "hours"];

  const isEditing = Boolean(initialData?.id);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getInputCategories();
      data.categories = [
        "fertilizer",
        "seeds",
        "pesticides",
        "equipment",
        "herbicides",
      ];
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async () => {
    if (!quantity || !unit || !cost) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      let response;

      if (isEditing && initialData?.id) {
        response = await updateInput(
          initialData.id,
          inputType,
          parseFloat(quantity),
          unit,
          parseFloat(cost),
          date,
          notes,
        );
      } else {
        response = await logInput(
          inputType,
          parseFloat(quantity),
          unit,
          parseFloat(cost),
          date,
          notes,
        );
      }

      if (response?.success !== false) {
        alert(
          isEditing
            ? "Input updated successfully!"
            : "Input recorded successfully!",
        );
        router.back();
      } else {
        alert(response.message || "Operation failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "space-between",
            gap:4,
            padding: 16,
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderBottomColor: "#e5e7eb",
          }}
        >
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#22c55e" />
          </Pressable>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#1f2937" }}>
            {isEditing ? "Edit Input" : "Record Input"}
          </Text>
        </View>

        <View>
          <Text style={styles.inputTitle}>Input Type*</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {categories.length > 0 ? (
              categories.map((type) => (
                <Pressable
                  key={type}
                  onPress={() => setInputType(type)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: inputType === type ? "#22c55e" : "#e5e7eb",
                    backgroundColor: inputType === type ? "#f0fdf4" : "#fff",
                  }}
                >
                  <Text
                    style={{
                      color: inputType === type ? "#22c55e" : "#6b7280",
                      fontWeight: "500",
                    }}
                  >
                    {type}
                  </Text>
                </Pressable>
              ))
            ) : (
              <Text style={{ color: "#9ca3af" }}>Loading categories...</Text>
            )}
          </View>
        </View>

        <View>
          <Text style={styles.inputTitle}>Quantity*</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={quantity}
            onChangeText={setQuantity}
          />
        </View>

        <View>
          <Text style={styles.inputTitle}>Unit*</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {units.map((u) => (
              <Pressable
                key={u}
                onPress={() => setUnit(u)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: unit === u ? "#22c55e" : "#e5e7eb",
                  backgroundColor: unit === u ? "#f0fdf4" : "#fff",
                }}
              >
                <Text
                  style={{
                    color: unit === u ? "#22c55e" : "#6b7280",
                    fontWeight: "500",
                  }}
                >
                  {u}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View>
          <Text style={styles.inputTitle}>Cost*</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={cost}
            onChangeText={setCost}
          />
        </View>

        <View>
          <Text style={styles.inputTitle}>Date</Text>
          <TextInput style={styles.input} value={date} onChangeText={setDate} />
        </View>

        <View>
          <Text style={styles.inputTitle}>Notes</Text>
          <TextInput
            style={[styles.input, { minHeight: 100, textAlignVertical: "top" }]}
            multiline
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        <Pressable
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading
              ? isEditing
                ? "Updating..."
                : "Recording..."
              : isEditing
                ? "Update Input"
                : "Record Input"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InputForm;

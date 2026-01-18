import { getUserData, updateProfile } from "@/constant/api";
import styles from "@/constant/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [village, setVillage] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [primaryCrops, setPrimaryCrops] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const userData = await getUserData();

      if (userData) {
        setName(userData.full_name || "");
        setEmail(userData.email || "");
        setPhone(userData.phone || "");
        setState(userData?.location?.state || "");
        setLga(userData?.location?.lga || "");
        setVillage(userData?.location?.village || "");
        setFarmSize(userData.farm_size || "");
        setPrimaryCrops(
          Array.isArray(userData.primary_crops)
            ? userData.primary_crops.join(", ")
            : "",
        );
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!name.trim() || !email.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    setUpdating(true);

    try {
      const location = {
        state: state.trim(),
        lga: lga.trim(),
        village: village.trim(),
      };

      const cropsArray = primaryCrops
        .split(",")
        .map((crop) => crop.trim())
        .filter(Boolean);

      const data = await updateProfile(
        name.trim(),
        email.trim(),
        phone.trim(),
        location,
        farmSize.trim(),
        cropsArray,
      );

      if (data?.user) {
        alert("Profile updated successfully!");
        router.back();
      } else {
        alert(data?.message || "Failed to update profile. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please check your connection and try again.");
      console.error("Update profile error:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderBottomColor: "#e5e7eb",
          }}
        >
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#22c55e" />
          </Pressable>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              marginLeft: 12,
              color: "#1f2937",
            }}
          >
            Edit Profile
          </Text>
        </View>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderBottomColor: "#e5e7eb",
          }}
        >
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#22c55e" />
          </Pressable>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              marginLeft: 12,
              color: "#1f2937",
            }}
          >
            Edit Profile
          </Text>
        </View>

        {/* Personal Information */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.inputTitle}>Personal Information</Text>

          <Text style={styles.inputTitle}>Full Name*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.inputTitle}>Email*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.inputTitle}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* Location */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.inputTitle}>Location</Text>

          <Text style={styles.inputTitle}>State</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your state"
            value={state}
            onChangeText={setState}
          />

          <Text style={styles.inputTitle}>LGA</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your LGA"
            value={lga}
            onChangeText={setLga}
          />

          <Text style={styles.inputTitle}>Village</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your village"
            value={village}
            onChangeText={setVillage}
          />
        </View>

        {/* Farm Information */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.inputTitle}>Farm Information</Text>

          <Text style={styles.inputTitle}>Farm Size</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your farm size (e.g., 5 hectares)"
            value={farmSize}
            onChangeText={setFarmSize}
          />

          <Text style={styles.inputTitle}>Primary Crops</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter crops separated by comma (e.g., Maize, Sorghum)"
            value={primaryCrops}
            onChangeText={setPrimaryCrops}
          />
        </View>

        <Pressable
          style={styles.button}
          onPress={handleUpdateProfile}
          disabled={updating}
        >
          <Text style={styles.buttonText}>
            {updating ? "Updating..." : "Update Profile"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

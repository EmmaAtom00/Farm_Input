import { getProfile, getUserData } from "@/constant/api";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Location {
  state: string;
  lga: string;
  village: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: Location;
  farmSize: string;
  primaryCrops: string[];
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const userData = await getUserData();

      if (!userData) {
        setProfile(null);
        return;
      }

      setProfile({
        name: userData.full_name ?? "User",
        email: userData.email ?? "",
        phone: userData.phone ?? "",
        location: {
          state: userData?.location?.state ?? "",
          lga: userData?.location?.lga ?? "",
          village: userData?.location?.village ?? "",
        },
        farmSize: userData?.farm_size ?? "",
        primaryCrops: Array.isArray(userData.primary_crops)
          ? userData.primary_crops
          : [],
      });
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#22c55e" />
          </Pressable>

          <Text style={styles.headerTitle}>My Profile</Text>

          <Pressable
            onPress={() => router.push("/(main)/(profile)/EditProfile")}
          >
            <Ionicons name="pencil" size={24} color="#22c55e" />
          </Pressable>
        </View>

        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Loading profile...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#22c55e" />
          </Pressable>

          <Text style={styles.headerTitle}>My Profile</Text>

          <Pressable
            onPress={() => router.push("/(main)/(profile)/EditProfile")}
          >
            <Ionicons name="pencil" size={24} color="#22c55e" />
          </Pressable>
        </View>

        {/* Personal Information */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="person" size={24} color="#22c55e" />
            <Text style={styles.cardTitle}>Personal Information</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>{profile?.name}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{profile?.email}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>{profile?.phone}</Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="location" size={24} color="#3b82f6" />
            <Text style={styles.cardTitle}>Location</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>State</Text>
            <Text style={styles.value}>{profile?.location.state}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>LGA</Text>
            <Text style={styles.value}>{profile?.location.lga}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Village</Text>
            <Text style={styles.value}>{profile?.location.village}</Text>
          </View>
        </View>

        {/* Farm Information */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="leaf" size={24} color="#f59e0b" />
            <Text style={styles.cardTitle}>Farm Information</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Farm Size</Text>
            <Text style={styles.value}>{profile?.farmSize}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.cropsSection}>
            <Text style={styles.label}>Primary Crops</Text>

            <View style={styles.cropsContainer}>
              {profile?.primaryCrops.length ? (
                profile.primaryCrops.map((crop, index) => (
                  <View key={`${crop}-${index}`} style={styles.cropButton}>
                    <Text style={styles.cropButtonText}>{crop}</Text>
                  </View>
                ))
              ) : (
                <Text style={{ color: "#6b7280", fontSize: 12, marginTop: 8 }}>
                  No crops added
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Edit Button */}
        <Pressable
          style={styles.editButton}
          onPress={() => router.push("/(main)/(profile)/EditProfile")}
        >
          <Ionicons name="pencil" size={20} color="white" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
    flex: 1,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#1f2937" },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  label: { fontSize: 13, color: "#6b7280", fontWeight: "500" },
  value: { fontSize: 14, color: "#1f2937", fontWeight: "600" },
  divider: { height: 1, backgroundColor: "#e5e7eb" },
  cropsSection: { paddingVertical: 12 },
  cropsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  cropButton: {
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#22c55e",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cropButtonText: { fontSize: 12, color: "#22c55e", fontWeight: "600" },
  editButton: {
    flexDirection: "row",
    backgroundColor: "#22c55e",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  editButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});

export default Profile;

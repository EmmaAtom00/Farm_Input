import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Welcome back!</Text>
                        <Text style={styles.subGreeting}>Manage your farm inputs</Text>
                    </View>
                    <TouchableOpacity style={styles.profileButton}>
                        <Ionicons name="person-circle" size={40} color="#22c55e" />
                    </TouchableOpacity>
                </View>

                {/* Quick Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Ionicons name="list-outline" size={24} color="#22c55e" />
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Inputs Logged</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Ionicons name="wallet-outline" size={24} color="#22c55e" />
                        <Text style={styles.statValue}>$2,450</Text>
                        <Text style={styles.statLabel}>Total Spent</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Ionicons name="people-outline" size={24} color="#22c55e" />
                        <Text style={styles.statValue}>3</Text>
                        <Text style={styles.statLabel}>Groups Joined</Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="add-circle-outline" size={24} color="#22c55e" />
                        <Text style={styles.actionText}>Log New Input</Text>
                        <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="search-outline" size={24} color="#22c55e" />
                        <Text style={styles.actionText}>Compare Prices</Text>
                        <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="people-outline" size={24} color="#22c55e" />
                        <Text style={styles.actionText}>Browse Groups</Text>
                        <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
                    </TouchableOpacity>
                </View>

                {/* Recent Activity */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    <View style={styles.activityItem}>
                        <View style={styles.activityIcon}>
                            <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                        </View>
                        <View style={styles.activityContent}>
                            <Text style={styles.activityTitle}>Fertilizer purchased</Text>
                            <Text style={styles.activityTime}>2 hours ago</Text>
                        </View>
                        <Text style={styles.activityAmount}>$450</Text>
                    </View>
                    <View style={styles.activityItem}>
                        <View style={styles.activityIcon}>
                            <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                        </View>
                        <View style={styles.activityContent}>
                            <Text style={styles.activityTitle}>Joined buying group</Text>
                            <Text style={styles.activityTime}>1 day ago</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    greeting: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1f2937",
    },
    subGreeting: {
        fontSize: 14,
        color: "#6b7280",
        marginTop: 4,
    },
    profileButton: {
        padding: 8,
    },
    statsContainer: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 24,
    },
    statCard: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    statValue: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1f2937",
        marginTop: 8,
    },
    statLabel: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 4,
        textAlign: "center",
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1f2937",
        marginBottom: 12,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    actionText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        fontWeight: "500",
        color: "#1f2937",
    },
    activityItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    activityIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#ecfdf5",
        justifyContent: "center",
        alignItems: "center",
    },
    activityContent: {
        flex: 1,
        marginLeft: 12,
    },
    activityTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1f2937",
    },
    activityTime: {
        fontSize: 12,
        color: "#9ca3af",
        marginTop: 4,
    },
    activityAmount: {
        fontSize: 14,
        fontWeight: "600",
        color: "#22c55e",
    },
});

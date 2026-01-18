import { completeOnboarding } from "@/constant/api";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JoinBuyingGroups() {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleCompleteOnboarding = async () => {
        setIsLoading(true);
        try {
            await completeOnboarding();
            router.replace("/(main)/(dashboard)/Dashboard");
        } catch (error) {
            console.error("Error completing onboarding:", error);
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Progress Indicator */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressDot} />
                    <View style={styles.progressDot} />
                    <View style={[styles.progressDot, styles.progressDotActive]} />
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="people-outline" size={64} color="#22c55e" />
                    </View>

                    <Text style={styles.title}>Join Buying Groups</Text>
                    <Text style={styles.description}>
                        Connect with other farmers to unlock bulk discounts and save up to 20% on farm inputs.
                    </Text>

                    <View style={styles.featureList}>
                        <View style={styles.featureItem}>
                            <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                            <Text style={styles.featureText}>Collective purchasing power</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                            <Text style={styles.featureText}>Bulk discounts up to 20%</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                            <Text style={styles.featureText}>Community support</Text>
                        </View>
                    </View>
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={handleCompleteOnboarding}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <Text style={styles.nextButtonText}>Get Started</Text>
                                <Ionicons name="arrow-forward" size={20} color="#fff" />
                            </>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={() => router.push("/(main)/(dashboard)/Dashboard")}
                        disabled={isLoading}
                    >
                        <Text style={styles.skipButtonText}>Skip for now</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    progressContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
        marginBottom: 32,
    },
    progressDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#e5e7eb",
    },
    progressDotActive: {
        backgroundColor: "#22c55e",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    iconContainer: {
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 12,
        color: "#1f2937",
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        color: "#6b7280",
        marginBottom: 32,
        lineHeight: 24,
    },
    featureList: {
        width: "100%",
        gap: 16,
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    featureText: {
        fontSize: 16,
        color: "#374151",
        fontWeight: "500",
    },
    buttonContainer: {
        gap: 12,
        marginTop: 32,
    },
    nextButton: {
        backgroundColor: "#22c55e",
        paddingVertical: 14,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    nextButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    skipButton: {
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#d1d5db",
    },
    skipButtonText: {
        color: "#6b7280",
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    },
});

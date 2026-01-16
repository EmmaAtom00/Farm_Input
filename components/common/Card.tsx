import { CardProps } from "@/constant";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Card = ({ title, description }: CardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.iconWrapper}>
                <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color="#16a34a"
                />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

export default Card;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        padding: 24,
        borderRadius: 12,
        alignItems: "center",

        // shadow (iOS)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        // shadow (Android)
        elevation: 4,
    },
    iconWrapper: {
        backgroundColor: "#dcfce7", // green-100
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 8,
    },
    description: {
        color: "#4b5563", // gray-600
        marginBottom: 8,
        textAlign: "center",
    },
});

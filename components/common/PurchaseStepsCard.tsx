// components/PurchaseStepsCard.tsx
import { PurchaseStepsCardProps } from "@/constant";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

const PurchaseStepsCard: React.FC<PurchaseStepsCardProps> = ({
  iconName,
  title,
  subtitle,
  steps,
}) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <Ionicons name={iconName} size={24} color="white" />
        </View>

        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && (
            <Text style={styles.subtitle}>{subtitle}</Text>
          )}
        </View>
      </View>

      {/* Steps */}
      {steps.map((step) => (
        <View key={step.id} style={styles.stepRow}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepNumber}>{step.id}</Text>
          </View>

          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>
              {step.description}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PurchaseStepsCard;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 56, // px-14
    paddingVertical: 32,   // py-8
    marginTop: 24,         // mt-6
    borderRadius: 6,       // rounded-md
    backgroundColor: "#ffffff",
    gap: 28,               // gap-7
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  iconWrapper: {
    backgroundColor: "#22c55e", // green-500
    padding: 8,
    borderRadius: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
  },

  subtitle: {
    color: "#16a34a", // green-600
    fontWeight: "500",
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },

  stepCircle: {
    backgroundColor: "#86efac", // green-300
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  stepNumber: {
    color: "#16a34a", // green-600
  },

  stepContent: {
    flex: 1,
  },

  stepTitle: {
    fontSize: 20,
    fontWeight: "600",
  },

  stepDescription: {
    fontSize: 14,
  },
});

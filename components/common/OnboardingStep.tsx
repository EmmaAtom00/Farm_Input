import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface Props {
  step: number;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

const OnboardingStep = ({ step, icon, title, description }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={24} color="#15803d" />
      </View>

      <View style={styles.stepCircle}>
        <Text style={styles.stepText}>{step}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default OnboardingStep;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 56,
  },
  iconCircle: {
    backgroundColor: "#bbf7d0",
    padding: 24,
    borderRadius: 9999,
    marginBottom: 16,
  },
  stepCircle: {
    backgroundColor: "#22c55e",
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  stepText: {
    color: "#fff",
    fontWeight: "700",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    textAlign: "center",
    color: "#4b5563",
  },
});

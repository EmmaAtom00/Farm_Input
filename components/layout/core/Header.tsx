import { HeaderProps } from "@/constant";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Header = ({ title = "FarmInput", onSignUp }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        onPress={onSignUp}
        activeOpacity={0.8}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16, // px-4
    paddingVertical: 16,   // py-4
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb", // gray-200
    width: "100%",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#15803d", // green-700
  },

  button: {
    backgroundColor: "#16a34a", // green-600
    paddingHorizontal: 16,
    paddingVertical: 6, // py-1.5
    borderRadius: 9999, // rounded-full
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
});

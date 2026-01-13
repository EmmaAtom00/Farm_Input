import { Ionicons } from "@expo/vector-icons"; // or react-native-vector-icons
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FarmInputFooter = () => {
  return (
    <View style={styles.footer}>
      {/* Brand */}
      <Text style={styles.brand}>FarmInput</Text>
      <Text style={styles.tagline}>
        Empowering farmers with smart agricultural input management.
      </Text>

      {/* Quick Links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <Text style={styles.link}>Home</Text>
        <Text style={styles.link}>About Us</Text>
        <Text style={styles.link}>Produce</Text>
        <Text style={styles.link}>How It Works</Text>
      </View>

      {/* Contact */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <Text style={styles.text}>Email: info@farminput.com</Text>
        <Text style={styles.text}>Phone: +234 800 FARM INPUT</Text>
        <Text style={styles.text}>Support: support@farminput.com</Text>
      </View>

      {/* Social Icons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Follow Us</Text>
        <View style={styles.socialRow}>
          <TouchableOpacity>
            <Ionicons name="logo-facebook" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="logo-twitter" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="logo-instagram" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="logo-linkedin" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Copyright */}
      <Text style={styles.copyright}>
        © 2026 FarmInput. All rights reserved.
      </Text>
    </View>
  );
};

export default FarmInputFooter;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#0b1624",
    padding: 20,
  },
  brand: {
    color: "#00ff7f",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  tagline: {
    color: "#cbd5e1",
    fontSize: 13,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#ffffff",
    fontWeight: "600",
    marginBottom: 8,
  },
  link: {
    color: "#cbd5e1",
    fontSize: 14,
    marginBottom: 4,
  },
  text: {
    color: "#cbd5e1",
    fontSize: 14,
    marginBottom: 4,
  },
  socialRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#1e293b",
    marginVertical: 16,
  },
  copyright: {
    color: "#94a3b8",
    fontSize: 12,
    textAlign: "center",
  },
});
import { checkOnboardingStatus, saveUserData, signup } from "@/constant/api";
import styles from "@/constant/styles";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import icon from "../../assets/images/icon.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const data = await signup(name, email, password);

      if (data.success) {
        alert("Account created successfully!");

        // Save user data if available
        if (data.userData) {
          await saveUserData(data.userData);
        }

        // Check onboarding
        const hasCompletedOnboarding = await checkOnboardingStatus();

        if (hasCompletedOnboarding) {
          router.replace("/(main)/(dashboard)/Dashboard");
        } else {
          router.replace("/(main)/(onboarding)/TrackYourInput");
        }
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please check your connection and try again.");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    router.push("/(auth)/Login");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.accountContainer}>
          <View style={styles.titleView}>
            <Image style={styles.logo} source={icon} />
            <Text style={styles.title}>FarmInput</Text>
          </View>

          <View style={styles.accountView}>
            <Text style={styles.accountTitle}>Create Account</Text>
            <Text style={styles.accountText}>Tell us about your farm</Text>
          </View>
        </View>

        <View>
          <Text style={styles.inputTitle}>PERSONAL INFORMATION</Text>

          <Text style={styles.inputTitle}>Name*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View>
          <Text style={styles.inputTitle}>Email*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View>
          <Text style={styles.inputTitle}>Password*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            returnKeyType="done"
          />
        </View>

        <Pressable style={styles.button} onPress={handleSignup} disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? "Creating Account..." : "Sign Up"}
          </Text>
        </Pressable>

        <Text style={styles.linkText}>
          Already have an account?
          <Text style={styles.link} onPress={handleLogin}>
            {" "}
            Sign In
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;

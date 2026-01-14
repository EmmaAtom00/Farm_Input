import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_CONFIG = {
    baseUrl: process.env.EXPO_PUBLIC_API_URL || 'https://farminput-capstone-project.onrender.com',
    endpoints: {
        auth: {
            login: '/auth/login/',
            signup: '/auth/signup/',
        },
    },
};

const ONBOARDING_KEY = "hasseenonboarding"

export const completeOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
}

export const checkOnboardingStatus = async () => {
  const value = await AsyncStorage.getItem(ONBOARDING_KEY);
  return value === "true";
}
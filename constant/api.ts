import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import { router } from "expo-router";

let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void) => {
  onUnauthorized = handler;
};

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://farminput-capstone-project-1dbl.onrender.com";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.status === 401) {
      await clearAuthToken();
      await clearUserData();
      onUnauthorized?.();
    }
    return Promise.reject(error);
  },
);

export const API_CONFIG = {
  baseUrl: BASE_URL,
  endpoints: {
    auth: {
      signup: "/api/auth/signup",
      login: "/api/auth/login",
      forgotPassword: "/api/auth/forgotpassword",
      resetPassword: "/api/auth/resetpassword",
    },
    users: {
      profile: "/api/users/profile",
      discover: "/api/users/discover",
    },
    farms: {
      get: "/api/farms",
      update: "/api/farms",
    },
    inputs: {
      categories: "/api/inputs/categories",
      list: "/api/inputs",
      log: "/api/inputs/log",
      update: "/api/inputs/log/:id",
      delete: "/api/inputs/log/:id",
    },
    spending: {
      summary: "/api/spending/summary",
      trends: "/api/spending/trends",
      annual: "/api/spending/annual",
    },
    pricing: {
      products: "/api/pricing/products",
      comparison: "/api/pricing/:id/comparison",
      sources: "/api/pricing/:id/sources",
      alerts: "/api/pricing/alerts",
    },
    groups: {
      list: "/api/groups",
      create: "/api/groups",
      detail: "/api/groups/:id",
      join: "/api/groups/:id/join",
      update: "/api/groups/:id",
      messages: "/api/groups/:id/messages",
    },
    suppliers: {
      list: "/api/suppliers",
      products: "/api/suppliers/products",
      compare: "/api/suppliers/compare",
      review: "/api/suppliers/review",
    },
    planning: {
      estimate: "/api/planning/estimate",
      summary: "/api/planning/summary",
    },
  },
};

const ONBOARDING_KEY = "hasseenonboarding";
const AUTH_TOKEN_KEY = "authToken";
const USER_DATA_KEY = "userData";

/** Onboarding */
export const completeOnboarding = async () =>
  AsyncStorage.setItem(ONBOARDING_KEY, "true");

export const checkOnboardingStatus = async () => {
  const value = await AsyncStorage.getItem(ONBOARDING_KEY);
  return value === "true";
};

/** Auth */
export const saveAuthToken = async (token: string) =>
  AsyncStorage.setItem(AUTH_TOKEN_KEY, token);

export const getAuthToken = async () => {
  return AsyncStorage.getItem(AUTH_TOKEN_KEY);
};

export const clearAuthToken = async () =>
  AsyncStorage.removeItem(AUTH_TOKEN_KEY);

export const saveUserData = async (userData: any) =>
  AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

export const getUserData = async () => {
  const data = await AsyncStorage.getItem(USER_DATA_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearUserData = async () => AsyncStorage.removeItem(USER_DATA_KEY);

/** API Calls */
export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await axiosInstance.post(
      API_CONFIG.endpoints.auth.signup,
      {
        full_name: name,
        email,
        password,
      },
    );

    if (response.data.success && response.data.token) {
      await saveAuthToken(response.data.token);
    }

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Signup failed",
    };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(API_CONFIG.endpoints.auth.login, {
      email,
      password,
    });

    if (response.data.success && response.data.token) {
      await saveAuthToken(response.data.token);
    }

    const userData = await getProfile();
    return { ...response.data, userData };
  } catch (error: any) {
    console.log(error);

    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post(
      API_CONFIG.endpoints.auth.forgotPassword,
      { email },
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send reset link",
    };
  }
};

export const resetPassword = async (
  token: string,
  email: string,
  password: string,
) => {
  try {
    const response = await axiosInstance.put(
      `${API_CONFIG.endpoints.auth.resetPassword}/${token}`,
      {
        email,
        password,
      },
    );

    if (response.data.success && response.data.token) {
      await saveAuthToken(response.data.token);
    }

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to reset password",
    };
  }
};

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get(
      API_CONFIG.endpoints.users.profile,
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch profile",
    };
  }
};

export const updateProfile = async (
  name: string,
  email: string,
  phone: string,
  location: { state: string; lga: string; village: string },
  farm_size: string,
  primary_crops: string[],
) => {
  try {
    const reqData = {
      full_name: name,
      email,
      phone,
      location,
      farm_size,
      primary_crops: primary_crops.filter(Boolean),
    };

    const response = await axiosInstance.put(
      API_CONFIG.endpoints.users.profile,
      reqData,
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update profile",
    };
  }
};

export const logout = async () => {
  await clearAuthToken();
  await clearUserData();
  router.replace("/");
};

/** Inputs */
export const getInputCategories = async () => {
  try {
    const response = await axiosInstance.get(
      API_CONFIG.endpoints.inputs.categories,
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to fetch input categories",
    };
  }
};

export const logInput = async (
  category: string,
  quantity: number,
  unit: string,
  cost: number,
  date: string,
  notes?: string,
) => {
  try {
    const response = await axiosInstance.post(API_CONFIG.endpoints.inputs.log, {
      category,
      quantity,
      unit,
      unit_price: cost,
      purchase_date: date,
      notes,
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to log input",
    };
  }
};

export const updateInput = async (
  inputId: string,
  category: string,
  quantity: number,
  unit: string,
  cost: number,
  date: string,
  notes?: string,
) => {
  try {
    if (!inputId) {
      throw new Error("Input ID is missing");
    }

    const response = await axiosInstance.put(
      API_CONFIG.endpoints.inputs.update.replace(":id", inputId),
      {
        category,
        quantity,
        unit,
        unit_price: cost,
        notes,
      },
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update input",
    };
  }
};

export const deleteInput = async (inputId: string) => {
  try {
    const response = await axiosInstance.delete(
      API_CONFIG.endpoints.inputs.delete.replace(":id", inputId),
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete",
    };
  }
};

/** Spending */
export const getSpendingSummary = async () => {
  try {
    const response = await axiosInstance.get(
      API_CONFIG.endpoints.spending.summary,
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to fetch spending summary",
    };
  }
};

export const getSpendingTrends = async () => {
  try {
    const response = await axiosInstance.get(
      API_CONFIG.endpoints.spending.trends,
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to fetch spending trends",
    };
  }
};

/** Pricing */
export const getPricingProducts = async () => {
  try {
    const response = await axiosInstance.get(
      API_CONFIG.endpoints.pricing.products,
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch products",
    };
  }
};

export const compareProductPrices = async (productId: string) => {
  try {
    const response = await axiosInstance.get(
      API_CONFIG.endpoints.pricing.comparison.replace(":id", productId),
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to compare prices",
    };
  }
};

/** Groups */
export const getGroups = async () => {
  try {
    const response = await axiosInstance.get(API_CONFIG.endpoints.groups.list);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch groups",
    };
  }
};

export const joinGroup = async (groupId: string) => {
  try {
    const response = await axiosInstance.post(
      API_CONFIG.endpoints.groups.join.replace(":id", groupId),
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to join group",
    };
  }
};

export const getGroupDetail = async (groupId: string) => {
  try {
    const response = await axiosInstance.get(
      API_CONFIG.endpoints.groups.detail.replace(":id", groupId),
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch group details",
    };
  }
};

/** Inputs List */
export const getInputsList = async () => {
  try {
    const response = await axiosInstance.get(API_CONFIG.endpoints.inputs.list);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch inputs list",
      inputs: [],
    };
  }
};

export default axiosInstance;

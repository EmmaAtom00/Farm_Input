import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance } from 'axios';
import { router } from 'expo-router';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://farmerinput-capstoneproject.onrender.com';

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            await clearAuthToken();
            await clearUserData();
            router.replace("/(auth)/Login")
        }
        return Promise.reject(error);
    }
);

export const API_CONFIG = {
    baseUrl: BASE_URL,
    endpoints: {
        auth: {
            signup: '/api/auth/signup',
            login: '/api/auth/login',
            forgotPassword: '/api/auth/forgotpassword',
            resetPassword: '/api/auth/resetpassword',
        },
        users: {
            profile: '/api/users/profile',
            discover: '/api/users/discover',
        },
        farms: {
            get: '/api/farms',
            update: '/api/farms',
        },
        inputs: {
            categories: '/api/inputs/categories',
            list: '/api/inputs',
            log: '/api/inputs/log',
        },
        spending: {
            summary: '/api/spending/summary',
            trends: '/api/spending/trends',
            annual: '/api/spending/annual',
        },
        pricing: {
            products: '/api/pricing/products',
            comparison: '/api/pricing/:id/comparison',
            sources: '/api/pricing/:id/sources',
            alerts: '/api/pricing/alerts',
        },
        groups: {
            list: '/api/groups',
            create: '/api/groups',
            detail: '/api/groups/:id',
            join: '/api/groups/:id/join',
            update: '/api/groups/:id',
            messages: '/api/groups/:id/messages',
        },
        suppliers: {
            list: '/api/suppliers',
            products: '/api/suppliers/products',
            compare: '/api/suppliers/compare',
            review: '/api/suppliers/review',
        },
        planning: {
            estimate: '/api/planning/estimate',
            summary: '/api/planning/summary',
        },
    },
};

const ONBOARDING_KEY = "hasseenonboarding";
const AUTH_TOKEN_KEY = "authToken";
const USER_DATA_KEY = "userData";

// Onboarding functions
export const completeOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
}

export const checkOnboardingStatus = async () => {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === "true";
}

// Auth functions
export const saveAuthToken = async (token: string) => {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
}

export const getAuthToken = async () => {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
}

export const clearAuthToken = async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
}

export const saveUserData = async (userData: any) => {
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
}

export const getUserData = async () => {
    const data = await AsyncStorage.getItem(USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
}

export const clearUserData = async () => {
    await AsyncStorage.removeItem(USER_DATA_KEY);
}

// API calls using Axios
export const signup = async (name: string, email: string, password: string) => {
    try {
        const response = await axiosInstance.post(API_CONFIG.endpoints.auth.signup, {
            full_name: name,
            email,
            password,
        });

        if (response.data.success && response.data.token) {
            await saveAuthToken(response.data.token);
        }

        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Signup failed',
        };
    }
}

export const login = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post(API_CONFIG.endpoints.auth.login, {
            email,
            password,
        });

        if (response.data.success && response.data.token) {
            await saveAuthToken(response.data.token);
        }

        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Login failed',
        };
    }
}

export const forgotPassword = async (email: string) => {
    try {
        const response = await axiosInstance.post(API_CONFIG.endpoints.auth.forgotPassword, {
            email,
        });

        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to send reset link',
        };
    }
}

export const resetPassword = async (token: string, email: string, password: string) => {
    try {
        const response = await axiosInstance.put(
            `${API_CONFIG.endpoints.auth.resetPassword}/${token}`,
            {
                email,
                password
            }
        );

        if (response.data.success && response.data.token) {
            await saveAuthToken(response.data.token);
        }

        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to reset password',
        };
    }
}

export const getProfile = async () => {
    try {
        const response = await axiosInstance.get(API_CONFIG.endpoints.users.profile);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch profile',
        };
    }
}

export const updateProfile = async (name: string, email: string) => {
    try {
        const response = await axiosInstance.put(API_CONFIG.endpoints.users.profile, {
            name,
            email,
        });

        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to update profile',
        };
    }
}

export const logout = async () => {
    await clearAuthToken();
    await clearUserData();
}

// Inputs API
export const getInputCategories = async () => {
    try {
        const response = await axiosInstance.get(API_CONFIG.endpoints.inputs.categories);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch input categories',
        };
    }
}

export const logInput = async (category: string, quantity: number, unit: string, cost: number, date: string, notes?: string) => {
    try {
        console.log("logging input")
        const response = await axiosInstance.post(API_CONFIG.endpoints.inputs.log, {
            category,
            quantity,
            unit,
            unit_price: cost,
            purchase_date: date,
            notes,
            "supplier_id": "{supplier_id}",
            "input_id": "{input_id}",
        });
        console.log(response)
        return response.data;
    } catch (error: any) {
        console.log(error)
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to log input',
        };
    }
}

// Spending API
export const getSpendingSummary = async () => {
    try {
        const response = await axiosInstance.get(API_CONFIG.endpoints.spending.summary);
        // console.log(response.data)
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch spending summary',
        };
    }
}

export const getSpendingTrends = async () => {
    try {
        const response = await axiosInstance.get(API_CONFIG.endpoints.spending.trends);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch spending trends',
        };
    }
}

// Pricing API
export const getPricingProducts = async () => {
    try {
        const response = await axiosInstance.get(API_CONFIG.endpoints.pricing.products);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch products',
        };
    }
}

export const compareProductPrices = async (productId: string) => {
    try {
        const response = await axiosInstance.get(
            API_CONFIG.endpoints.pricing.comparison.replace(':id', productId)
        );
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to compare prices',
        };
    }
}

// Groups API
export const getGroups = async () => {
    try {
        const response = await axiosInstance.get(API_CONFIG.endpoints.groups.list);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch groups',
        };
    }
}

export const joinGroup = async (groupId: string) => {
    try {
        const response = await axiosInstance.post(
            API_CONFIG.endpoints.groups.join.replace(':id', groupId)
        );
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to join group',
        };
    }
}

export const getGroupDetail = async (groupId: string) => {
    try {
        const response = await axiosInstance.get(
            API_CONFIG.endpoints.groups.detail.replace(':id', groupId)
        );
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch group details',
        };
    }
}

// Get user inputs list
export const getInputsList = async () => {
    try {
        const response = await axiosInstance.get(API_CONFIG.endpoints.inputs.list);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch inputs list',
            inputs: [],
        };
    }
}

export default axiosInstance;

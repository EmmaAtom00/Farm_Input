import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getAuthToken, logout as apiLogout } from "@/constant/api";

type AuthContextType = {
  loading: boolean;
  signedIn: boolean;
  loginUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  loading: true,
  signedIn: false,
  loginUser: async () => {},
  logoutUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();

  // Initial auth check
  useEffect(() => {
    async function checkAuth() {
      const token = await getAuthToken();
      setSignedIn(!!token);
      setLoading(false);
    }
    checkAuth();
  }, []);

  const loginUser = async () => {
    const token = await getAuthToken();
    setSignedIn(!!token);
  };

  const logoutUser = async () => {
    await apiLogout();
    setSignedIn(false);
    router.replace("/(auth)/Login");
  };

  return (
    <AuthContext.Provider value={{ loading, signedIn, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

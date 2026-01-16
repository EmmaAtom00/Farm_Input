import { getAuthToken } from '@/constant/api';
import { useRouter, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';

interface AuthContextType {
    isLoading: boolean;
    isSignedIn: boolean;
    logout: () => Promise<void>;
    refreshAuth: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType>({
    isLoading: true,
    isSignedIn: false,
    logout: async () => { },
    refreshAuth: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const router = useRouter();
    const segments = useSegments();

    const checkAuthStatus = async () => {
        try {
            const token = await getAuthToken();
            setIsSignedIn(!!token);
        } catch (e) {
            console.error('Failed to restore token', e);
            setIsSignedIn(false);
        }
    };

    useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                const token = await getAuthToken();
                setIsSignedIn(!!token);
            } catch (e) {
                console.error('Failed to restore token', e);
                setIsSignedIn(false);
            } finally {
                setIsLoading(false);
            }
        };

        bootstrapAsync();
    }, []);

    useEffect(() => {
        if (isLoading) return;

        const inAuthGroup = segments[0] === '(auth)';
        const inCoreGroup = segments[0] === '(core)';

        if (isSignedIn && (inAuthGroup || inCoreGroup)) {
            // User is signed in and trying to access auth/core pages
            router.replace('/(main)/(dashboard)/Dashboard');
        } else if (!isSignedIn && segments[0] === '(main)') {
            // User is not signed in but trying to access main pages
            router.replace('/(core)');
        }
    }, [isSignedIn, segments, isLoading]);

    const handleLogout = async () => {
        setIsSignedIn(false);
    };

    const refreshAuth = async () => {
        await checkAuthStatus();
    };

    return (
        <AuthContext.Provider value={{ isLoading, isSignedIn, logout: handleLogout, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

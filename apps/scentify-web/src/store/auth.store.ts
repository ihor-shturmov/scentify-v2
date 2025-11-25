import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    setUser: (user: User, token: string) => void;
    logout: () => void;
    getAuthHeader: () => { Authorization: string } | {};
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            setUser: (user, token) => set({ user, token, isAuthenticated: true }),
            logout: () => set({ user: null, token: null, isAuthenticated: false }),
            getAuthHeader: () => {
                const token = get().token;
                return token ? { Authorization: `Bearer ${token}` } : {};
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);

import { useAuthStore } from '../store/auth.store';

/**
 * Custom hook to get authentication headers for API requests
 * Usage: const authHeaders = useAuthHeaders();
 * Then include in fetch: headers: { ...authHeaders, 'Content-Type': 'application/json' }
 */
export function useAuthHeaders() {
    return useAuthStore((state) => state.getAuthHeader());
}

/**
 * Helper function to make authenticated fetch requests
 * Usage: const data = await authFetch('/api/endpoint', { method: 'POST', body: JSON.stringify(data) });
 */
export async function authFetch(url: string, options: RequestInit = {}) {
    const token = useAuthStore.getState().token;

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
}

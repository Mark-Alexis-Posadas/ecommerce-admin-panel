import { AuthContext } from "./AuthContext";
import type { AuthUser } from "./AuthContext";
import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { api, TOKEN_KEY } from "../services/api";
export function AuthProvider({ children }: {
    children: ReactNode;
}) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(!!localStorage.getItem(TOKEN_KEY));
    const logout = useCallback(() => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem('token'); localStorage.removeItem('user'); localStorage.removeItem('userInfo'); setToken(null); setUser(null); }, []);
    useEffect(() => {
        let active = true;
        const stored = localStorage.getItem(TOKEN_KEY);
        if (!stored) {
            return;
        }
        api.get<AuthUser>('/api/auth/me').then(({ data }) => { if (!active || stored !== localStorage.getItem(TOKEN_KEY))
            return; if (data.role !== "admin") {
            const timer = window.setTimeout(logout, 0);
            return () => window.clearTimeout(timer);
        } setUser(data); setToken(stored); }).catch(() => { if (active && stored === localStorage.getItem(TOKEN_KEY))
            logout(); }).finally(() => { if (active)
            setLoading(false); });
        return () => { active = false; };
    }, [logout]);
    useEffect(() => { window.addEventListener('shopzone:session-expired', logout); return () => window.removeEventListener('shopzone:session-expired', logout); }, [logout]);
    useEffect(() => {
        if (!token)
            return;
        let expiry: number;
        try {
            const payload: unknown = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
            if (typeof payload !== 'object' || payload === null || !('exp' in payload) || typeof payload.exp !== 'number') {
                const timer = window.setTimeout(logout, 0);
                return () => window.clearTimeout(timer);
            }
            expiry = payload.exp * 1000;
        }
        catch {
 const timer = window.setTimeout(logout, 0);
 return () => window.clearTimeout(timer);
        }
        const timer = window.setTimeout(logout, Math.max(0, expiry - Date.now()));
        return () => window.clearTimeout(timer);
    }, [token, logout]);
    const authenticate = async (path: string, body: {
        email: string;
        password: string;
        name?: string;
    }) => {
        const { data } = await api.post<AuthUser & {
            token: string;
        }>(path, body);
        if (data.role !== "admin") {
            logout();
            throw new Error("Admin access required");
        }
        localStorage.setItem(TOKEN_KEY, data.token);
        setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
        setToken(data.token);
    };
    return <AuthContext.Provider value={{ user, token, loading, logout, login: (email, password) => authenticate('/api/auth/login', { email, password }), register: (name, email, password) => authenticate('/api/auth/signup', { name, email, password }) }}>{children}</AuthContext.Provider>;
}

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { api, TOKEN_KEY } from "../services/api";
export interface AuthUser { _id: string; name: string; email: string; role: "customer" | "admin" }
interface Session { user: AuthUser | null; token: string | null; loading: boolean; login: (email: string, password: string) => Promise<void>; register: (name: string, email: string, password: string) => Promise<void>; logout: () => void }
const AuthContext = createContext<Session | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
 const [user, setUser] = useState<AuthUser | null>(null);
 const [token, setToken] = useState<string | null>(null);
 const [loading, setLoading] = useState(true);
 const logout = useCallback(() => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem('token'); localStorage.removeItem('user'); localStorage.removeItem('userInfo'); setToken(null); setUser(null); }, []);
 useEffect(() => {
 let active = true;
 const stored = localStorage.getItem(TOKEN_KEY);
 if (!stored) { setLoading(false); return; }
 api.get<AuthUser>('/api/auth/me').then(({data}) => { if (!active) return; if (data.role !== "admin") { logout(); return; } setUser(data); setToken(stored); }).catch(() => { if (active) logout(); }).finally(() => { if (active) setLoading(false); });
 return () => { active = false; };
 }, [logout]);
 useEffect(() => { window.addEventListener('shopzone:session-expired', logout); return () => window.removeEventListener('shopzone:session-expired', logout); }, [logout]);
 useEffect(() => {
 if (!token) return;
 const timer = window.setTimeout(logout, 7 * 24 * 60 * 60 * 1000);
 return () => window.clearTimeout(timer);
 }, [token, logout]);
 const authenticate = async (path: string, body: {email: string; password: string; name?: string}) => {
 const {data} = await api.post<AuthUser & {token: string}>(path, body);
 if (data.role !== "admin") { logout(); throw new Error("Admin access required"); }
 localStorage.setItem(TOKEN_KEY, data.token); setUser({_id:data._id,name:data.name,email:data.email,role:data.role}); setToken(data.token);
 };
 return <AuthContext.Provider value={{user,token,loading,logout,login:(email,password)=>authenticate('/api/auth/login',{email,password}),register:(name,email,password)=>authenticate('/api/auth/signup',{name,email,password})}}>{children}</AuthContext.Provider>;
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('AuthProvider required'); return context; }

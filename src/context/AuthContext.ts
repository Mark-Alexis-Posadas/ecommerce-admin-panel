import { createContext } from "react";
export interface AuthUser {
    _id: string;
    name: string;
    email: string;
    role: "customer" | "admin";
}
export interface Session {
    user: AuthUser | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}
export const AuthContext = createContext<Session | null>(null);

import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import type { AuthUser } from './AuthContext';
import { api, TOKEN_KEY } from '../services/api';
import { AdminAccessError } from '../services/authErrors';
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(!!localStorage.getItem(TOKEN_KEY));
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    // Remove obsolete admin-session storage without clearing the separate customer session.
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userInfo');
    setToken(null);
    setUser(null);
    setLoading(false);
  }, []);
  useEffect(() => {
    let active = true;
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) return;
    api
      .get<AuthUser>('/api/auth/me', { timeout: 10000 })
      .then(({ data }) => {
        if (!active || stored !== localStorage.getItem(TOKEN_KEY)) return;
        if (data.role !== 'admin') {
          logout();
          return;
        }
        setUser(data);
        setToken(stored);
      })
      .catch(() => {
        if (active && stored === localStorage.getItem(TOKEN_KEY)) logout();
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [logout]);
  useEffect(() => {
    window.addEventListener('shopzone:session-expired', logout);
    const changed = (event: StorageEvent) => {
      if ((event.key === TOKEN_KEY && event.newValue === null) || event.key === null) logout();
    };
    window.addEventListener('storage', changed);
    return () => {
      window.removeEventListener('shopzone:session-expired', logout);
      window.removeEventListener('storage', changed);
    };
  }, [logout]);
  useEffect(() => {
    if (!token) return;
    let expiry = Date.now();
    try {
      const payload: unknown = JSON.parse(
        atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')),
      );
      if (
        typeof payload === 'object' &&
        payload !== null &&
        'exp' in payload &&
        typeof payload.exp === 'number' &&
        Number.isFinite(payload.exp)
      )
        expiry = payload.exp * 1000;
    } catch {
      /* Invalid tokens are discarded by the timeout below. */
    }
    const timer = window.setTimeout(logout, Math.max(0, Math.min(expiry - Date.now(), 2147483647)));
    return () => window.clearTimeout(timer);
  }, [token, logout]);
  const login = async (email: string, password: string) => {
    const { data } = await api.post<AuthUser & { token: string }>(
      '/api/auth/login',
      { email: email.trim(), password },
      { timeout: 10000 },
    );
    if (data.role !== 'admin') {
      logout();
      throw new AdminAccessError();
    }
    if (typeof data.token !== 'string' || !data.token)
      throw new Error('Invalid authentication response');
    localStorage.setItem(TOKEN_KEY, data.token);
    setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
    setToken(data.token);
    setLoading(false);
  };
  return (
    <AuthContext.Provider value={{ user, token, loading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

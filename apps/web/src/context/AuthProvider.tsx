'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '@/services/api';
import { AuthUser, LoginRequest, authService } from '@/services/auth.service';

const ACCESS_TOKEN_KEY = 'pgcb_access_token';
const REFRESH_TOKEN_KEY = 'pgcb_refresh_token';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  fetchMe: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function setAuthHeader(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    if (typeof document !== 'undefined') {
      document.cookie = `access_token=${token}; Path=/; Max-Age=900; SameSite=Lax`;
    }
    return;
  }

  delete api.defaults.headers.common.Authorization;
  if (typeof document !== 'undefined') {
    document.cookie = 'access_token=; Path=/; Max-Age=0; SameSite=Lax';
  }
}

function readStorage(key: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(key);
}

function writeStorage(key: string, value: string | null) {
  if (typeof window === 'undefined') {
    return;
  }

  if (value === null) {
    localStorage.removeItem(key);
    return;
  }

  localStorage.setItem(key, value);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(() => {
    writeStorage(ACCESS_TOKEN_KEY, null);
    writeStorage(REFRESH_TOKEN_KEY, null);
    setAuthHeader(null);
    setUser(null);
  }, []);

  const fetchMe = useCallback(async () => {
    const profile = await authService.me();
    setUser(profile);
  }, []);

  const refresh = useCallback(async () => {
    const refreshToken = readStorage(REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      throw new Error('Missing refresh token');
    }

    const data = await authService.refresh(refreshToken);
    writeStorage(ACCESS_TOKEN_KEY, data.access_token);
    setAuthHeader(data.access_token);
  }, []);

  const login = useCallback(async (payload: LoginRequest) => {
    const data = await authService.login(payload);

    writeStorage(ACCESS_TOKEN_KEY, data.access_token);
    writeStorage(REFRESH_TOKEN_KEY, data.refresh_token);
    setAuthHeader(data.access_token);

    await fetchMe();
  }, [fetchMe]);

  const logout = useCallback(async () => {
    const refreshToken = readStorage(REFRESH_TOKEN_KEY);

    try {
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } finally {
      clearSession();
    }
  }, [clearSession]);

  useEffect(() => {
    async function initAuth() {
      try {
        const token = readStorage(ACCESS_TOKEN_KEY);

        if (!token) {
          setIsLoading(false);
          return;
        }

        setAuthHeader(token);

        try {
          await fetchMe();
        } catch {
          await refresh();
          await fetchMe();
        }
      } catch {
        clearSession();
      } finally {
        setIsLoading(false);
      }
    }

    void initAuth();
  }, [clearSession, fetchMe, refresh]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      login,
      logout,
      refresh,
      fetchMe,
    }),
    [user, isLoading, login, logout, refresh, fetchMe]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
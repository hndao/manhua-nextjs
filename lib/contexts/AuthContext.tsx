'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/comic';
import * as authApi from '@/lib/api/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, recaptchaToken?: string) => Promise<{ requiresVerification: boolean; email?: string }>;
  register: (name: string, email: string, password: string, password_confirmation: string, recaptchaToken?: string) => Promise<{ requiresVerification: boolean; email?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  setUserData: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      if (authApi.isAuthenticated()) {
        const userData = await authApi.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Failed to load user:', error);
      // Clear invalid tokens from both localStorage and cookies
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
      document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string, recaptchaToken?: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.login({ email, password, recaptcha_token: recaptchaToken });

      // Check if verification is required
      if ('requires_verification' in response && response.requires_verification) {
        return { requiresVerification: true, email: response.email };
      }

      // Login successful, set user
      if ('user' in response) {
        setUser(response.user);
      }
      return { requiresVerification: false };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    recaptchaToken?: string
  ) => {
    setIsLoading(true);
    try {
      const response = await authApi.register({
        name,
        email,
        password,
        password_confirmation,
        recaptcha_token: recaptchaToken,
      });

      // Check if verification is required
      if ('requires_verification' in response && response.requires_verification) {
        return { requiresVerification: true, email: response.email };
      }

      // Registration successful, set user
      if ('user' in response) {
        setUser(response.user);
      }
      return { requiresVerification: false };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    if (authApi.isAuthenticated()) {
      try {
        const userData = await authApi.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to refresh user:', error);
        setUser(null);
      }
    }
  };

  const setUserData = (userData: User) => {
    setUser(userData);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
    setUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


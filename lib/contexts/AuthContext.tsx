'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/comic';
import * as authApi from '@/lib/api/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
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
      // Clear invalid token
      localStorage.removeItem('auth_token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.login({ email, password });
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    setIsLoading(true);
    try {
      const response = await authApi.register({
        name,
        email,
        password,
        password_confirmation,
      });
      setUser(response.user);
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

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
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


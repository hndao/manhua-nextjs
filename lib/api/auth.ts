/**
 * Authentication API Functions
 */

import apiClient from './client';
import { User, ApiResponse } from '@/types/comic';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

/**
 * POST /register - Register a new user
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/register', data);
  
  // Store token in localStorage
  if (response.data.data.token) {
    localStorage.setItem('auth_token', response.data.data.token);
  }
  
  return response.data.data;
}

/**
 * POST /login - Login user
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/login', credentials);
  
  // Store token in localStorage
  if (response.data.data.token) {
    localStorage.setItem('auth_token', response.data.data.token);
  }
  
  return response.data.data;
}

/**
 * POST /logout - Logout user (requires auth)
 */
export async function logout(): Promise<void> {
  try {
    await apiClient.post('/logout');
  } finally {
    // Always remove token from localStorage
    localStorage.removeItem('auth_token');
  }
}

/**
 * GET /user - Get current authenticated user (requires auth)
 */
export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<ApiResponse<User>>('/user');
  return response.data.data;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('auth_token');
}

/**
 * Get stored auth token
 */
export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}


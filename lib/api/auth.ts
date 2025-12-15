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
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

/**
 * Set auth tokens in both localStorage and cookies
 */
function setAuthTokens(accessToken: string, refreshToken: string) {
  // Store access token in localStorage for client-side API calls
  localStorage.setItem('auth_token', accessToken);

  // Store refresh token in localStorage
  localStorage.setItem('refresh_token', refreshToken);

  // Store access token in cookie for server-side access (7 days)
  const accessExpiryDate = new Date();
  accessExpiryDate.setDate(accessExpiryDate.getDate() + 7);
  document.cookie = `auth_token=${accessToken}; path=/; expires=${accessExpiryDate.toUTCString()}; SameSite=Lax`;

  // Store refresh token in cookie (30 days)
  const refreshExpiryDate = new Date();
  refreshExpiryDate.setDate(refreshExpiryDate.getDate() + 30);
  document.cookie = `refresh_token=${refreshToken}; path=/; expires=${refreshExpiryDate.toUTCString()}; SameSite=Lax`;
}

/**
 * Remove auth tokens from both localStorage and cookies
 */
function removeAuthTokens() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('refresh_token');

  // Remove cookies by setting expiry to past date
  document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
  document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
}

/**
 * POST /register - Register a new user
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/register', data);

  // Store tokens in localStorage and cookies
  if (response.data.data.access_token && response.data.data.refresh_token) {
    setAuthTokens(response.data.data.access_token, response.data.data.refresh_token);
  }

  return response.data.data;
}

/**
 * POST /login - Login user
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/login', credentials);

  // Store tokens in localStorage and cookies
  if (response.data.data.access_token && response.data.data.refresh_token) {
    setAuthTokens(response.data.data.access_token, response.data.data.refresh_token);
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
    // Always remove tokens from localStorage and cookies
    removeAuthTokens();
  }
}

/**
 * POST /refresh - Refresh access token using refresh token
 */
export async function refreshAccessToken(): Promise<RefreshResponse> {
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  // Create a temporary client with refresh token
  const response = await apiClient.post<ApiResponse<RefreshResponse>>(
    '/refresh',
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  // Store new tokens
  if (response.data.data.access_token && response.data.data.refresh_token) {
    setAuthTokens(response.data.data.access_token, response.data.data.refresh_token);
  }

  return response.data.data;
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

/**
 * Get stored refresh token
 */
export function getRefreshToken(): string | null {
  return localStorage.getItem('refresh_token');
}


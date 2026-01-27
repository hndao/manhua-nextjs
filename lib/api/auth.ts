/**
 * Authentication API Functions
 */

import apiClient from './client';
import { User, ApiResponse } from '@/types/comic';

export interface LoginCredentials {
  email: string;
  password: string;
  recaptcha_token?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  recaptcha_token?: string;
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

export interface VerificationResponse {
  email: string;
  requires_verification: boolean;
  provider?: string;
}

export interface VerifyEmailData {
  email: string;
  code: string;
}

export interface ResendVerificationData {
  email: string;
}

export interface SocialAuthRedirectResponse {
  redirect_url: string;
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
 * Returns either AuthResponse (if no verification needed) or VerificationResponse
 */
export async function register(data: RegisterData): Promise<AuthResponse | VerificationResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse | VerificationResponse>>('/register', data);

  // Store tokens in localStorage and cookies only if we got tokens back
  const responseData = response.data.data as any;
  if (responseData.access_token && responseData.refresh_token) {
    setAuthTokens(responseData.access_token, responseData.refresh_token);
  }

  return response.data.data;
}

/**
 * POST /login - Login user
 * Returns either AuthResponse (if verified) or VerificationResponse (if not verified)
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse | VerificationResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse | VerificationResponse>>('/login', credentials);

  // Store tokens in localStorage and cookies only if we got tokens back
  const responseData = response.data.data as any;
  if (responseData.access_token && responseData.refresh_token) {
    setAuthTokens(responseData.access_token, responseData.refresh_token);
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

/**
 * POST /verify-email - Verify email with 6-digit code
 */
export async function verifyEmail(data: VerifyEmailData): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/verify-email', data);

  // Store tokens in localStorage and cookies
  if (response.data.data.access_token && response.data.data.refresh_token) {
    setAuthTokens(response.data.data.access_token, response.data.data.refresh_token);
  }

  return response.data.data;
}

/**
 * POST /resend-verification - Resend verification code
 */
export async function resendVerificationCode(data: ResendVerificationData): Promise<void> {
  await apiClient.post('/resend-verification', data);
}

/**
 * GET /auth/{provider} - Get social auth redirect URL
 */
export async function getSocialAuthRedirect(provider: 'google' | 'facebook' | 'twitter'): Promise<string> {
  const response = await apiClient.get<ApiResponse<SocialAuthRedirectResponse>>(`/auth/${provider}`);
  return response.data.data.redirect_url;
}

/**
 * GET /auth/{provider}/callback - Handle social auth callback
 * This should be called from the callback page with the code from the URL
 */
export async function handleSocialAuthCallback(
  provider: 'google' | 'facebook' | 'twitter',
  code: string,
  state?: string
): Promise<AuthResponse | VerificationResponse> {
  const params = new URLSearchParams({ code });
  if (state) params.append('state', state);

  const response = await apiClient.get<ApiResponse<AuthResponse | VerificationResponse>>(
    `/auth/${provider}/callback?${params.toString()}`
  );

  // Store tokens in localStorage and cookies only if we got tokens back
  const responseData = response.data.data as any;
  if (responseData.access_token && responseData.refresh_token) {
    setAuthTokens(responseData.access_token, responseData.refresh_token);
  }

  return response.data.data;
}


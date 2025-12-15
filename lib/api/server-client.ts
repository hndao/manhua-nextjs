/**
 * Server-Side API Client for Laravel Backend
 * Used in Server Components where localStorage is not available
 */

import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

/**
 * Create an API client instance with authentication token
 */
export function createServerApiClient(token?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: API_BASE_URL,
    headers,
    withCredentials: true,
  });
}

export default createServerApiClient;


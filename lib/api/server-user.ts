/**
 * Server-Side User API Functions
 * For use in Server Components with token from cookies
 */

import { createServerApiClient } from './server-client';
import { Bookmark, ReadingHistory, ApiResponse } from '@/types/comic';

/**
 * GET /bookmarks - Get user's bookmarked comics (Server-side)
 */
export async function getBookmarksServer(token: string): Promise<Bookmark[]> {
  const client = createServerApiClient(token);
  const response = await client.get<ApiResponse<Bookmark[]>>('/bookmarks');
  return response.data.data;
}

/**
 * GET /history - Get user's reading history (Server-side)
 */
export async function getReadingHistoryServer(token: string): Promise<ReadingHistory[]> {
  const client = createServerApiClient(token);
  const response = await client.get<ApiResponse<ReadingHistory[]>>('/history');
  return response.data.data;
}


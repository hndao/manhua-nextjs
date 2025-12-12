/**
 * User/Auth API Functions
 * All endpoints require authentication
 */

import apiClient from './client';
import { User, Bookmark, ReadingHistory, ApiResponse } from '@/types/comic';

/**
 * GET /user - Get authenticated user details
 */
export async function getUser(): Promise<User> {
  const response = await apiClient.get<ApiResponse<User>>('/user');
  return response.data.data;
}

/**
 * GET /bookmarks - Get user's bookmarked comics
 */
export async function getBookmarks(): Promise<Bookmark[]> {
  const response = await apiClient.get<ApiResponse<Bookmark[]>>('/bookmarks');
  return response.data.data;
}

/**
 * POST /bookmarks/{comic_id} - Add comic to bookmarks
 */
export async function addBookmark(comicId: number): Promise<void> {
  await apiClient.post(`/bookmarks/${comicId}`);
}

/**
 * DELETE /bookmarks/{comic_id} - Remove comic from bookmarks
 */
export async function removeBookmark(comicId: number): Promise<void> {
  await apiClient.delete(`/bookmarks/${comicId}`);
}

/**
 * GET /history - Get user's reading history
 */
export async function getReadingHistory(): Promise<ReadingHistory[]> {
  const response = await apiClient.get<ApiResponse<ReadingHistory[]>>('/history');
  return response.data.data;
}

/**
 * POST /history - Update reading history
 */
export async function updateReadingHistory(data: {
  comic_id: number;
  chapter_id: number;
  last_page_read: number;
}): Promise<void> {
  await apiClient.post('/history', data);
}

/**
 * POST /comics/{comic_id}/rate - Rate a comic
 */
export async function rateComic(
  comicId: number,
  data: { rating: number; review?: string }
): Promise<void> {
  await apiClient.post(`/comics/${comicId}/rate`, data);
}


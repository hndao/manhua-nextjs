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
 * GET /bookmarks/{comic_id}/check - Check if comic is bookmarked
 */
export async function checkBookmark(comicId: number): Promise<boolean> {
  const response = await apiClient.get<ApiResponse<{ is_bookmarked: boolean }>>(`/bookmarks/${comicId}/check`);
  return response.data.data.is_bookmarked;
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
 * Toggle bookmark status for a comic
 */
export async function toggleBookmark(comicId: number, isBookmarked: boolean): Promise<void> {
  if (isBookmarked) {
    await removeBookmark(comicId);
  } else {
    await addBookmark(comicId);
  }
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
 * GET /comics/{comic_id}/rating - Get user's rating for a comic
 */
export async function getUserRating(comicId: number): Promise<{
  has_rated: boolean;
  rating: number | null;
  review?: string;
}> {
  const response = await apiClient.get(`/comics/${comicId}/rating`);
  return response.data.data;
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


/**
 * Chapters API Functions
 */

import apiClient from './client';
import { Chapter, Page, ApiResponse } from '@/types/comic';

/**
 * GET /chapters/{id} - Get chapter details (increments view count)
 */
export async function getChapter(id: number): Promise<Chapter> {
  const response = await apiClient.get<ApiResponse<Chapter>>(`/chapters/${id}`);
  return response.data.data;
}

/**
 * GET /chapters/{id}/pages - Get all pages for a chapter
 */
export async function getChapterPages(id: number): Promise<Page[]> {
  const response = await apiClient.get<Page[]>(`/chapters/${id}/pages`);
  return response.data;
}


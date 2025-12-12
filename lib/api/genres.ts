/**
 * Genres API Functions
 */

import apiClient from './client';
import { Genre, Comic, PaginatedResponse, ApiResponse } from '@/types/comic';

/**
 * GET /genres - Get all genres with comic counts
 */
export async function getGenres(): Promise<Genre[]> {
  const response = await apiClient.get<Genre[]>('/genres');
  return response.data;
}

/**
 * GET /genres/{slug} - Get single genre details
 */
export async function getGenreBySlug(slug: string): Promise<Genre> {
  const response = await apiClient.get<ApiResponse<Genre>>(`/genres/${slug}`);
  return response.data.data;
}

/**
 * GET /genres/{slug}/comics - Get paginated comics for a genre
 */
export async function getGenreComics(
  slug: string,
  params?: {
    per_page?: number;
    page?: number;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
  }
): Promise<PaginatedResponse<Comic>> {
  const response = await apiClient.get<PaginatedResponse<Comic>>(`/genres/${slug}/comics`, { params });
  return response.data;
}


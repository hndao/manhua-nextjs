/**
 * Comics API Functions
 */

import apiClient from './client';
import { Comic, PaginatedResponse, ApiResponse, Chapter, Page } from '@/types/comic';

export interface GetComicsParams {
  per_page?: number;
  status?: 'ongoing' | 'completed' | 'hiatus' | 'cancelled';
  type?: 'manga' | 'manhua' | 'manhwa' | 'webtoon';
  genre?: string;
  featured?: boolean;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  page?: number;
}

/**
 * GET /comics - Get paginated list of comics with filters
 */
export async function getComics(params?: GetComicsParams): Promise<PaginatedResponse<Comic>> {
  const response = await apiClient.get<PaginatedResponse<Comic>>('/comics', { params });
  return response.data;
}

/**
 * GET /comics/{slug} - Get single comic details with all chapters
 */
export async function getComicBySlug(slug: string): Promise<Comic> {
  const response = await apiClient.get<ApiResponse<Comic>>(`/comics/${slug}`);
  return response.data.data;
}

/**
 * GET /comics/{slug}/chapters - Get paginated chapters for a comic
 */
export async function getComicChapters(
  slug: string,
  params?: { per_page?: number; page?: number }
): Promise<PaginatedResponse<Chapter>> {
  const response = await apiClient.get<PaginatedResponse<Chapter>>(`/comics/${slug}/chapters`, { params });
  return response.data;
}

/**
 * GET /search - Search comics by title, description, or author
 */
export async function searchComics(query: string): Promise<Comic[]> {
  const response = await apiClient.get<ApiResponse<Comic[]>>('/search', {
    params: { q: query },
  });
  return response.data.data;
}

/**
 * Get featured comics
 */
export async function getFeaturedComics(per_page: number = 6): Promise<Comic[]> {
  const response = await getComics({ featured: true, per_page });
  return response.data;
}

/**
 * Get hot/ongoing comics
 */
export async function getHotComics(per_page: number = 12): Promise<Comic[]> {
  const response = await getComics({ 
    status: 'ongoing', 
    per_page,
    sort_by: 'total_views',
    sort_order: 'desc'
  });
  return response.data;
}

/**
 * Get recently updated comics
 */
export async function getRecentlyUpdated(per_page: number = 10): Promise<Comic[]> {
  const response = await getComics({
    per_page,
    sort_by: 'updated_at',
    sort_order: 'desc'
  });
  return response.data;
}

/**
 * Get top comics by views (Most Popular)
 */
export async function getTopByViews(per_page: number = 50): Promise<Comic[]> {
  const response = await getComics({
    per_page,
    sort_by: 'total_views',
    sort_order: 'desc'
  });
  return response.data;
}

/**
 * Get top comics by rating (Top Rated)
 */
export async function getTopByRating(per_page: number = 50): Promise<Comic[]> {
  const response = await getComics({
    per_page,
    sort_by: 'average_rating',
    sort_order: 'desc'
  });
  return response.data;
}

/**
 * Get newest comics (New Releases)
 */
export async function getNewestComics(per_page: number = 50): Promise<Comic[]> {
  const response = await getComics({
    per_page,
    sort_by: 'created_at',
    sort_order: 'desc'
  });
  return response.data;
}


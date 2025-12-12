/**
 * Authors API Functions
 */

import apiClient from './client';
import { Author, Comic, PaginatedResponse, ApiResponse } from '@/types/comic';

export interface GetAuthorsParams {
  per_page?: number;
  page?: number;
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

/**
 * GET /authors - Get paginated list of authors
 */
export async function getAuthors(params?: GetAuthorsParams): Promise<PaginatedResponse<Author>> {
  const response = await apiClient.get<PaginatedResponse<Author>>('/authors', { params });
  return response.data;
}

/**
 * GET /authors/{slug} - Get single author details
 */
export async function getAuthorBySlug(slug: string): Promise<Author> {
  const response = await apiClient.get<ApiResponse<Author>>(`/authors/${slug}`);
  return response.data.data;
}

/**
 * GET /authors/{slug}/comics - Get paginated comics for an author
 */
export async function getAuthorComics(
  slug: string,
  params?: { per_page?: number; page?: number }
): Promise<PaginatedResponse<Comic>> {
  const response = await apiClient.get<PaginatedResponse<Comic>>(`/authors/${slug}/comics`, { params });
  return response.data;
}


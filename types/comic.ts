/**
 * TypeScript types for the Manhua application
 * Based on Laravel API structure from API_DOCUMENTATION.md
 */

export interface Author {
  id: number;
  name: string;
  slug: string;
  role: 'author' | 'artist' | 'both';
  created_at: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  comics_count?: number;
  created_at: string;
}

export interface Page {
  id: number;
  page_number: number;
  image_url: string;
  width: number;
  height: number;
}

export interface Chapter {
  id: number;
  comic_id: number;
  slug: string;
  title: string;
  chapter_number: number;
  volume_number?: number;
  total_pages: number;
  total_views: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
  pages?: Page[];
  comic?: Comic;
}

export interface Comic {
  id: number;
  title: string;
  slug: string;
  description: string;
  cover_image: string;
  status: 'ongoing' | 'completed' | 'hiatus' | 'cancelled';
  type: 'manga' | 'manhua' | 'manhwa' | 'webtoon';
  total_chapters: number;
  total_views: number;
  average_rating: number;
  total_ratings: number;
  release_date?: string;
  is_featured: boolean;
  authors: Author[];
  genres: Genre[];
  chapters?: Chapter[];
  chapters_count: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    from: number | null;
    last_page: number;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
  // Legacy fields for backward compatibility
  total?: number;
  per_page?: number;
  current_page?: number;
  last_page?: number;
}

export interface ApiResponse<T> {
  data: T;
}

export interface Bookmark {
  id: number;
  user_id: number;
  comic_id: number;
  comic: Comic;
  created_at: string;
}

export interface ReadingHistory {
  id: number;
  user_id: number;
  comic_id: number;
  chapter_id: number;
  last_page_read: number;
  comic: Comic;
  chapter: Chapter;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

// Frontend-specific types
export interface Banner {
  id: string;
  image: string;
  title: string;
  link: string;
  comic?: Comic;
}

export interface Ranking {
  rank: number;
  comic: Comic;
  category: 'overall' | 'male' | 'female' | 'new';
}


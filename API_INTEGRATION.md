# API Integration Guide

This Next.js application is integrated with the Laravel backend API.

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
```

### API Client

The API client is configured in `lib/api/client.ts` with:
- Automatic authentication token handling
- Request/response interceptors
- Error handling
- CORS support

## API Modules

### Comics API (`lib/api/comics.ts`)

```typescript
import { getComics, getComicBySlug, getFeaturedComics } from '@/lib/api/comics';

// Get paginated comics with filters
const comics = await getComics({
  per_page: 20,
  status: 'ongoing',
  featured: true,
  sort_by: 'total_views',
  sort_order: 'desc'
});

// Get single comic by slug
const comic = await getComicBySlug('tong-thong-hormone');

// Get featured comics
const featured = await getFeaturedComics(6);
```

### Chapters API (`lib/api/chapters.ts`)

```typescript
import { getChapter, getChapterPages } from '@/lib/api/chapters';

// Get chapter details (increments view count)
const chapter = await getChapter(3401);

// Get all pages for a chapter
const pages = await getChapterPages(3401);
```

### Genres API (`lib/api/genres.ts`)

```typescript
import { getGenres, getGenreComics } from '@/lib/api/genres';

// Get all genres
const genres = await getGenres();

// Get comics by genre
const actionComics = await getGenreComics('action', { per_page: 20 });
```

### Authors API (`lib/api/authors.ts`)

```typescript
import { getAuthors, getAuthorComics } from '@/lib/api/authors';

// Get all authors
const authors = await getAuthors({ per_page: 50 });

// Get author's comics
const comics = await getAuthorComics('xuong-zha-ya');
```

### User API (`lib/api/user.ts`)

All user endpoints require authentication:

```typescript
import { 
  getBookmarks, 
  addBookmark, 
  updateReadingHistory 
} from '@/lib/api/user';

// Get user's bookmarks
const bookmarks = await getBookmarks();

// Add bookmark
await addBookmark(60);

// Update reading history
await updateReadingHistory({
  comic_id: 60,
  chapter_id: 3401,
  last_page_read: 5
});
```

## TypeScript Types

All API types are defined in `types/comic.ts`:

- `Comic` - Comic/Manhua data
- `Chapter` - Chapter data
- `Page` - Page/Image data
- `Author` - Author data
- `Genre` - Genre data
- `User` - User data
- `Bookmark` - Bookmark data
- `ReadingHistory` - Reading history data
- `PaginatedResponse<T>` - Paginated API response
- `ApiResponse<T>` - Single item API response

## Image Handling

Use the image utility functions from `lib/utils/image.ts`:

```typescript
import { getImageUrl, getOptimizedImageUrl } from '@/lib/utils';

// Get full image URL
const coverUrl = getImageUrl(comic.cover_image);

// Get optimized image URL
const optimizedUrl = getOptimizedImageUrl(comic.cover_image, {
  width: 300,
  height: 400,
  quality: 80
});
```

## Error Handling

The API client automatically handles:
- 401 Unauthorized - Clears auth token
- Network errors
- Response errors

Example error handling in components:

```typescript
try {
  const comics = await getComics();
} catch (error) {
  console.error('Failed to fetch comics:', error);
  // Handle error (show toast, fallback UI, etc.)
}
```

## Authentication

Store the auth token in localStorage:

```typescript
// After login
localStorage.setItem('auth_token', token);

// The API client will automatically include it in requests
```

## Data Fetching Patterns

### Server Components (Recommended)

```typescript
// app/page.tsx
import { getComics } from '@/lib/data';

export default async function HomePage() {
  const comics = await getComics({ per_page: 12 });
  
  return <div>{/* Render comics */}</div>;
}
```

### Client Components with SWR

```typescript
'use client';
import useSWR from 'swr';
import { getComics } from '@/lib/data';

export default function ComicsList() {
  const { data, error, isLoading } = useSWR('comics', () => getComics());
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading comics</div>;
  
  return <div>{/* Render comics */}</div>;
}
```

## Laravel Backend

Make sure the Laravel backend is running:

```bash
cd ../manhua-laravel
php artisan serve
```

The API will be available at `http://127.0.0.1:8000/api/v1`

## CORS Configuration

The Laravel backend is configured to allow requests from:
- `http://localhost:3000`
- `http://127.0.0.1:3000`


/**
 * Data API - Wrapper functions for the Laravel API
 * Re-exports from lib/api with simplified names
 */

export {
  getComics,
  getComicBySlug,
  getComicChapters,
  searchComics,
  getFeaturedComics,
  getHotComics,
  getRecentlyUpdated,
  getTopByViews,
  getTopByRating,
  getNewestComics,
} from '@/lib/api/comics';

export {
  getChapter,
  getChapterPages,
} from '@/lib/api/chapters';

export {
  getGenres,
  getGenreBySlug,
  getGenreComics,
} from '@/lib/api/genres';

export {
  getAuthors,
  getAuthorBySlug,
  getAuthorComics,
} from '@/lib/api/authors';

export {
  getUser,
  getBookmarks,
  addBookmark,
  removeBookmark,
  getReadingHistory,
  updateReadingHistory,
  rateComic,
} from '@/lib/api/user';


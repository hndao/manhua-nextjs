/**
 * Image utility functions
 */

const LARAVEL_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://127.0.0.1:8000';
const IMAGE_CDN_URL = process.env.NEXT_PUBLIC_IMAGE_CDN_URL;

/**
 * Get full image URL from relative path
 * Handles both Laravel storage paths and CDN URLs
 */
export function getImageUrl(path: string | null | undefined): string {
  if (!path) {
    return '/placeholder-comic.jpg'; // You can add a placeholder image
  }

  // If already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If CDN is configured, use it
  if (IMAGE_CDN_URL) {
    return `${IMAGE_CDN_URL}/${path}`;
  }

  // Otherwise use Laravel storage URL
  return `${LARAVEL_BASE_URL}/storage/${path}`;
}

/**
 * Get optimized image URL with width/height parameters
 * This assumes you have image optimization set up on the backend
 */
export function getOptimizedImageUrl(
  path: string | null | undefined,
  options?: { width?: number; height?: number; quality?: number }
): string {
  const baseUrl = getImageUrl(path);
  
  if (!options || baseUrl.includes('placeholder')) {
    return baseUrl;
  }

  const params = new URLSearchParams();
  if (options.width) params.append('w', options.width.toString());
  if (options.height) params.append('h', options.height.toString());
  if (options.quality) params.append('q', options.quality.toString());

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}


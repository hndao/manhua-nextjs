/**
 * Image utility functions
 */

const LARAVEL_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://127.0.0.1:8000';
const IMAGE_CDN_URL = process.env.NEXT_PUBLIC_IMAGE_CDN_URL;

/**
 * Get placeholder image URL
 */
export function getPlaceholderImage(width: number = 400, height: number = 600): string {
  return `https://placehold.co/${width}x${height}/e5e7eb/9ca3af?text=No+Image`;
}

/**
 * Get full image URL from relative path
 * Handles both Laravel storage paths and CDN URLs
 */
export function getImageUrl(path: string | null | undefined): string {
  if (!path) {
    return getPlaceholderImage();
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
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${LARAVEL_BASE_URL}/${cleanPath}`;
}

/**
 * Handle image error by setting a placeholder
 */
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
  const img = event.currentTarget;
  img.src = getPlaceholderImage();
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


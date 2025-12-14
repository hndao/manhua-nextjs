/**
 * Utility functions for formatting data
 */

/**
 * Format large numbers (e.g., 1200000 -> 1.2M)
 */
export function formatNumber(num: number): string {
  if (num >= 100000000) {
    return `${(num / 100000000).toFixed(1)}亿`;
  }
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}万`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Format date to relative time (e.g., "2 hours ago", "Today 10:00")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return '刚刚 / Just now';
  if (diffMins < 60) return `${diffMins}分钟前 / ${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}小时前 / ${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}天前 / ${diffDays}d ago`;
  
  return date.toLocaleDateString('zh-CN');
}

/**
 * Format date to display format (consistent across server/client)
 * Returns format: DD/MM/YYYY
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Get status display text
 */
export function getStatusText(status: 'ongoing' | 'completed' | 'hiatus'): string {
  const statusMap = {
    ongoing: '连载中 / Ongoing',
    completed: '已完结 / Completed',
    hiatus: '休刊中 / Hiatus',
  };
  return statusMap[status];
}


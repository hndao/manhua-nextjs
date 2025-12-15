'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark } from '@/types/comic';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import apiClient from '@/lib/api/client';

interface BookmarksPageDesktopProps {
  bookmarks: Bookmark[];
  isManageMode: boolean;
  onToggleManageMode: () => void;
  onDelete: (deletedIds: number[]) => void;
}

export default function BookmarksPageDesktop({
  bookmarks,
  isManageMode,
  onToggleManageMode,
  onDelete,
}: BookmarksPageDesktopProps) {
  const t = useTranslations();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSelectAll = () => {
    setSelectedIds(selectedIds.length === bookmarks.length ? [] : bookmarks.map(item => item.id));
  };

  const handleToggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await Promise.all(
        selectedIds.map(id => {
          const item = bookmarks.find(b => b.id === id);
          if (item) {
            return apiClient.delete(`/bookmarks/${item.comic_id}`);
          }
        })
      );
      onDelete(selectedIds);
      setSelectedIds([]);
      setShowConfirmDialog(false);
      onToggleManageMode();
    } catch (error) {
      console.error('Failed to delete bookmarks:', error);
      alert(t('bookmarks.deleteError'));
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 24) return t('time.hoursAgo', { hours: diffInHours });
    if (diffInHours < 48) return t('time.yesterday');
    return t('time.daysAgo', { days: Math.floor(diffInHours / 24) });
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container-responsive">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('bookmarks.title')}</h1>
            <p className="text-gray-600">{t('bookmarks.description')}</p>
          </div>
          {bookmarks.length > 0 && (
            <button
              onClick={onToggleManageMode}
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {isManageMode ? t('bookmarks.done') : t('bookmarks.manage')}
            </button>
          )}
        </div>

        {isManageMode && bookmarks.length > 0 && (
          <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <button onClick={handleSelectAll} className="text-sm font-medium text-blue-600 hover:text-blue-700">
                {selectedIds.length === bookmarks.length ? t('bookmarks.deselectAll') : t('bookmarks.selectAll')}
              </button>
              {selectedIds.length > 0 && (
                <span className="text-sm text-gray-600">
                  {t('bookmarks.selectedCount', { count: selectedIds.length })}
                </span>
              )}
            </div>
            <button
              onClick={() => selectedIds.length > 0 && setShowConfirmDialog(true)}
              disabled={selectedIds.length === 0 || isDeleting}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {isDeleting ? t('common.loading') : t('bookmarks.deleteSelected')}
            </button>
          </div>
        )}

        {bookmarks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-2">{t('bookmarks.noBookmarks')}</p>
            <p className="text-gray-400">{t('bookmarks.noBookmarksDescription')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-6">
            {bookmarks.map((item) => (
              <div key={item.id} className="group relative">
                {isManageMode && (
                  <div className="absolute top-2 left-2 z-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleToggleSelect(item.id)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                )}
                <Link href={`/comic/${item.comic.slug}`} className="block">
                  <div className="relative aspect-[2/3] mb-3">
                    <Image
                      src={item.comic.cover_image}
                      alt={item.comic.title}
                      fill
                      className="rounded-lg object-cover group-hover:shadow-lg transition-shadow"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-1">
                    {item.comic.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {t('bookmarks.addedAt', { time: formatDate(item.created_at) })}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        title={t('bookmarks.confirmDelete')}
        message={t('bookmarks.confirmDeleteMessage', { count: selectedIds.length })}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirmDialog(false)}
        variant="danger"
      />
    </div>
  );
}


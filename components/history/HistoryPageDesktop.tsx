'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ReadingHistory } from '@/types/comic';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import apiClient from '@/lib/api/client';

interface HistoryPageDesktopProps {
  history: ReadingHistory[];
  isManageMode: boolean;
  onToggleManageMode: () => void;
  onDelete: (deletedIds: number[]) => void;
}

export default function HistoryPageDesktop({
  history,
  isManageMode,
  onToggleManageMode,
  onDelete,
}: HistoryPageDesktopProps) {
  const t = useTranslations();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSelectAll = () => {
    if (selectedIds.length === history.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(history.map(item => item.id));
    }
  };

  const handleToggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleDeleteClick = () => {
    if (selectedIds.length > 0) {
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      // Delete each selected item
      await Promise.all(
        selectedIds.map(id => {
          const item = history.find(h => h.id === id);
          if (item) {
            return apiClient.delete(`/history/${item.comic_id}`);
          }
        })
      );

      onDelete(selectedIds);
      setSelectedIds([]);
      setShowConfirmDialog(false);
      onToggleManageMode();
    } catch (error) {
      console.error('Failed to delete history:', error);
      alert(t('history.deleteError'));
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return t('time.hoursAgo', { hours: diffInHours });
    } else if (diffInHours < 48) {
      return t('time.yesterday');
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return t('time.daysAgo', { days: diffInDays });
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container-responsive">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('history.title')}
            </h1>
            <p className="text-gray-600">{t('history.description')}</p>
          </div>

          {history.length > 0 && (
            <button
              onClick={onToggleManageMode}
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {isManageMode ? t('history.done') : t('history.manage')}
            </button>
          )}
        </div>

        {/* Manage Mode Actions */}
        {isManageMode && history.length > 0 && (
          <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <button
                onClick={handleSelectAll}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {selectedIds.length === history.length
                  ? t('history.deselectAll')
                  : t('history.selectAll')}
              </button>
              {selectedIds.length > 0 && (
                <span className="text-sm text-gray-600">
                  {t('history.selectedCount', { count: selectedIds.length })}
                </span>
              )}
            </div>

            <button
              onClick={handleDeleteClick}
              disabled={selectedIds.length === 0 || isDeleting}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isDeleting ? t('common.loading') : t('history.deleteSelected')}
            </button>
          </div>
        )}

        {/* History List */}
        {history.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-2">{t('history.noHistory')}</p>
            <p className="text-gray-400">{t('history.noHistoryDescription')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                {/* Checkbox in Manage Mode */}
                {isManageMode && (
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleToggleSelect(item.id)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                )}

                {/* Comic Cover */}
                <Link href={`/comic/${item.comic.slug}`} className="flex-shrink-0">
                  <Image
                    src={item.comic.cover_image}
                    alt={item.comic.title}
                    width={80}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                </Link>

                {/* Comic Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/comic/${item.comic.slug}`}
                    className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1"
                  >
                    {item.comic.title}
                  </Link>

                  <p className="text-sm text-gray-600 mt-1">
                    {t('history.lastRead')}: {formatDate(item.updated_at)}
                  </p>

                  {item.chapter && (
                    <p className="text-sm text-gray-500 mt-1">
                      {t('history.chapter', { number: item.chapter.chapter_number })}
                      {item.last_page_read > 0 && ` • ${t('history.page', { number: item.last_page_read })}`}
                    </p>
                  )}
                </div>

                {/* Continue Reading Button */}
                {!isManageMode && item.chapter && (
                  <Link
                    href={`/comic/${item.comic.slug}/${item.chapter.slug || `chuong-${item.chapter.chapter_number}-${item.chapter.id}`}`}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {t('history.continueReading')}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title={t('history.confirmDelete')}
        message={t('history.confirmDeleteMessage', { count: selectedIds.length })}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirmDialog(false)}
        variant="danger"
      />
    </div>
  );
}


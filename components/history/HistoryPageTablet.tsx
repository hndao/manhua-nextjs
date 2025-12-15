'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ReadingHistory } from '@/types/comic';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import apiClient from '@/lib/api/client';

interface HistoryPageTabletProps {
  history: ReadingHistory[];
  isManageMode: boolean;
  onToggleManageMode: () => void;
  onDelete: (deletedIds: number[]) => void;
}

export default function HistoryPageTablet({
  history,
  isManageMode,
  onToggleManageMode,
  onDelete,
}: HistoryPageTabletProps) {
  const t = useTranslations();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSelectAll = () => {
    setSelectedIds(selectedIds.length === history.length ? [] : history.map(item => item.id));
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
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 24) return t('time.hoursAgo', { hours: diffInHours });
    if (diffInHours < 48) return t('time.yesterday');
    return t('time.daysAgo', { days: Math.floor(diffInHours / 24) });
  };

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="container-responsive">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('history.title')}</h1>
            <p className="text-sm text-gray-600">{t('history.description')}</p>
          </div>
          {history.length > 0 && (
            <button
              onClick={onToggleManageMode}
              className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {isManageMode ? t('history.done') : t('history.manage')}
            </button>
          )}
        </div>

        {isManageMode && history.length > 0 && (
          <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <button onClick={handleSelectAll} className="text-sm font-medium text-blue-600">
                {selectedIds.length === history.length ? t('history.deselectAll') : t('history.selectAll')}
              </button>
              {selectedIds.length > 0 && (
                <span className="text-sm text-gray-600">
                  {t('history.selectedCount', { count: selectedIds.length })}
                </span>
              )}
            </div>
            <button
              onClick={() => selectedIds.length > 0 && setShowConfirmDialog(true)}
              disabled={selectedIds.length === 0 || isDeleting}
              className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {isDeleting ? t('common.loading') : t('history.deleteSelected')}
            </button>
          </div>
        )}

        {history.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-1">{t('history.noHistory')}</p>
            <p className="text-sm text-gray-400">{t('history.noHistoryDescription')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {history.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                {isManageMode && (
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleToggleSelect(item.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                )}
                <Link href={`/comic/${item.comic.slug}`} className="flex-shrink-0">
                  <Image src={item.comic.cover_image} alt={item.comic.title} width={60} height={90} className="rounded-lg object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/comic/${item.comic.slug}`} className="text-base font-semibold text-gray-900 hover:text-blue-600 line-clamp-1">
                    {item.comic.title}
                  </Link>
                  <p className="text-xs text-gray-600 mt-0.5">{t('history.lastRead')}: {formatDate(item.last_read_at)}</p>
                  {item.chapter && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {t('history.chapter', { number: item.chapter.chapter_number })}
                    </p>
                  )}
                </div>
                {!isManageMode && item.chapter && (
                  <Link href={`/comic/${item.comic.slug}/${item.chapter.slug || `chuong-${item.chapter.chapter_number}-${item.chapter.id}`}`} className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    {t('history.continueReading')}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        title={t('history.confirmDelete')}
        message={t('history.confirmDeleteMessage', { count: selectedIds.length })}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirmDialog(false)}
        variant="danger"
      />
    </div>
  );
}


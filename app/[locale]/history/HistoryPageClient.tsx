'use client';

import { useState } from 'react';
import { ReadingHistory } from '@/types/comic';
import HistoryPageDesktop from '@/components/history/HistoryPageDesktop';
import HistoryPageTablet from '@/components/history/HistoryPageTablet';
import HistoryPageMobile from '@/components/history/HistoryPageMobile';
import ResponsiveContainer from '@/components/responsive/ResponsiveContainer';

interface HistoryPageClientProps {
  history: ReadingHistory[];
}

export default function HistoryPageClient({ history: initialHistory }: HistoryPageClientProps) {
  const [history, setHistory] = useState<ReadingHistory[]>(initialHistory);
  const [isManageMode, setIsManageMode] = useState(false);

  const handleDelete = (deletedIds: number[]) => {
    setHistory(history.filter(item => !deletedIds.includes(item.id)));
  };

  return (
    <ResponsiveContainer
      mobile={
        <HistoryPageMobile
          history={history}
          isManageMode={isManageMode}
          onToggleManageMode={() => setIsManageMode(!isManageMode)}
          onDelete={handleDelete}
        />
      }
      tablet={
        <HistoryPageTablet
          history={history}
          isManageMode={isManageMode}
          onToggleManageMode={() => setIsManageMode(!isManageMode)}
          onDelete={handleDelete}
        />
      }
      desktop={
        <HistoryPageDesktop
          history={history}
          isManageMode={isManageMode}
          onToggleManageMode={() => setIsManageMode(!isManageMode)}
          onDelete={handleDelete}
        />
      }
    />
  );
}


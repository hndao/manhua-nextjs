'use client';

import { useState } from 'react';
import { Bookmark } from '@/types/comic';
import BookmarksPageDesktop from '@/components/bookmarks/BookmarksPageDesktop';
import BookmarksPageTablet from '@/components/bookmarks/BookmarksPageTablet';
import BookmarksPageMobile from '@/components/bookmarks/BookmarksPageMobile';
import ResponsiveContainer from '@/components/responsive/ResponsiveContainer';

interface BookmarksPageClientProps {
  bookmarks: Bookmark[];
}

export default function BookmarksPageClient({ bookmarks: initialBookmarks }: BookmarksPageClientProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const [isManageMode, setIsManageMode] = useState(false);

  const handleDelete = (deletedIds: number[]) => {
    setBookmarks(bookmarks.filter(item => !deletedIds.includes(item.id)));
  };

  return (
    <ResponsiveContainer
      mobile={
        <BookmarksPageMobile
          bookmarks={bookmarks}
          isManageMode={isManageMode}
          onToggleManageMode={() => setIsManageMode(!isManageMode)}
          onDelete={handleDelete}
        />
      }
      tablet={
        <BookmarksPageTablet
          bookmarks={bookmarks}
          isManageMode={isManageMode}
          onToggleManageMode={() => setIsManageMode(!isManageMode)}
          onDelete={handleDelete}
        />
      }
      desktop={
        <BookmarksPageDesktop
          bookmarks={bookmarks}
          isManageMode={isManageMode}
          onToggleManageMode={() => setIsManageMode(!isManageMode)}
          onDelete={handleDelete}
        />
      }
    />
  );
}


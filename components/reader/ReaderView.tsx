'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Chapter, Page } from '@/types/comic';
import ReaderHeader from './ReaderHeader';
import ReaderContent from './ReaderContent';
import ReaderControls from './ReaderControls';
import ReaderToolbar from './ReaderToolbar';

interface ReaderViewProps {
  chapter: Chapter;
  pages: Page[];
}

export default function ReaderView({ chapter, pages }: ReaderViewProps) {
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [brightness, setBrightness] = useState(100);

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    if (!showControls) return;

    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showControls, currentPage]);

  // Toggle controls on click/tap
  const handleContentClick = () => {
    setShowControls(!showControls);
  };

  // Navigate to next page
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
      setShowControls(true);
    }
  };

  // Navigate to previous page
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setShowControls(true);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, pages.length]);

  // Get previous and next chapter IDs from the comic's chapters
  const chapters = chapter.comic?.chapters || [];
  const currentChapterIndex = chapters.findIndex(ch => ch.id === chapter.id);
  const prevChapter = currentChapterIndex > 0 ? chapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex < chapters.length - 1 ? chapters[currentChapterIndex + 1] : null;

  return (
    <div 
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors`}
      style={{ filter: `brightness(${brightness}%)` }}
    >
      {/* Header */}
      <ReaderHeader 
        chapter={chapter}
        show={showControls}
        onToggle={() => setShowControls(!showControls)}
      />

      {/* Main Content */}
      <ReaderContent
        pages={pages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onClick={handleContentClick}
        isDarkMode={isDarkMode}
      />

      {/* Bottom Controls (Mobile/Tablet) */}
      <div className="lg:hidden">
        <ReaderControls
          chapter={chapter}
          currentPage={currentPage}
          totalPages={pages.length}
          prevChapter={prevChapter}
          nextChapter={nextChapter}
          show={showControls}
          onPageChange={setCurrentPage}
          isDarkMode={isDarkMode}
          onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
          brightness={brightness}
          onBrightnessChange={setBrightness}
        />
      </div>

      {/* Floating Toolbar (Desktop) */}
      <div className="hidden lg:block">
        <ReaderToolbar
          chapter={chapter}
          prevChapter={prevChapter}
          nextChapter={nextChapter}
          isDarkMode={isDarkMode}
          onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
          brightness={brightness}
          onBrightnessChange={setBrightness}
        />
      </div>
    </div>
  );
}


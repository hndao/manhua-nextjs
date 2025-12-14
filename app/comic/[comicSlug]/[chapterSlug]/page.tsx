import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getChapter, getChapterPages } from '@/lib/data/api';
import ReaderView from '@/components/reader/ReaderView';

interface ReaderPageProps {
  params: Promise<{
    comicSlug: string;
    chapterSlug: string;
  }>;
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { chapterSlug } = await params;
  const t = await getTranslations();

  try {
    // For now, we'll extract the chapter ID from the slug
    // The slug format should be like "chuong-1-3309" where 3309 is the ID
    const chapterIdMatch = chapterSlug.match(/-(\d+)$/);
    if (!chapterIdMatch) {
      notFound();
    }
    
    const chapterId = Number(chapterIdMatch[1]);

    // Fetch chapter details and pages
    const chapter = await getChapter(chapterId);
    const pages = await getChapterPages(chapterId);

    return <ReaderView chapter={chapter} pages={pages} />;
  } catch (error) {
    console.error('Error fetching chapter:', error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ReaderPageProps) {
  const { chapterSlug } = await params;
  
  try {
    const chapterIdMatch = chapterSlug.match(/-(\d+)$/);
    if (!chapterIdMatch) {
      return { title: 'Chapter Not Found' };
    }
    
    const chapterId = Number(chapterIdMatch[1]);
    const chapter = await getChapter(chapterId);
    
    return {
      title: `${chapter.comic?.title} - ${chapter.title || `Chapter ${chapter.chapter_number}`}`,
      description: `Read ${chapter.comic?.title} ${chapter.title || `Chapter ${chapter.chapter_number}`} online`,
    };
  } catch (error) {
    return {
      title: 'Chapter Not Found',
    };
  }
}


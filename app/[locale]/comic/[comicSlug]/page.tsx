import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { cache } from 'react';
import { getComicBySlug, getComics } from '@/lib/data/api';
import ComicInfo from '@/components/comic/ComicInfo';
import ComicDescription from '@/components/comic/ComicDescription';
import ChapterList from '@/components/comic/ChapterList';
import RecommendedComics from '@/components/comic/RecommendedComics';

interface ComicPageProps {
  params: Promise<{
    comicSlug: string;
  }>;
}

// Cache the comic fetch to avoid duplicate requests between page and metadata
const getCachedComic = cache(async (slug: string) => {
  return await getComicBySlug(slug);
});

export default async function ComicPage({ params }: ComicPageProps) {
  const { comicSlug } = await params;
  const t = await getTranslations();

  try {
    // Fetch comic details by slug (cached)
    const comic = await getCachedComic(comicSlug);

    // Fetch recommended comics (same genres or random)
    const recommendedComicsData = await getComics({ per_page: 6 });
    const recommendedComics = recommendedComicsData.data;

    return (
      <div className="min-h-screen bg-white">
        {/* Comic Info Section */}
        <ComicInfo comic={comic} />

        {/* Description Section */}
        <ComicDescription comic={comic} />

        {/* Chapter List Section */}
        <ChapterList comic={comic} />

        {/* Recommended Comics Section */}
        {recommendedComics.length > 0 && (
          <RecommendedComics comics={recommendedComics} />
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching comic:', error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ComicPageProps) {
  const { comicSlug } = await params;

  try {
    // Use the same cached function to avoid duplicate API calls
    const comic = await getCachedComic(comicSlug);

    return {
      title: `${comic.title} - Manhua Reader`,
      description: comic.description,
      openGraph: {
        title: comic.title,
        description: comic.description,
        images: [comic.cover_image],
      },
    };
  } catch (error) {
    return {
      title: 'Comic Not Found',
    };
  }
}


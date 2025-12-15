import RankingsPageClient from './RankingsPageClient';
import { getTopByViews, getTopByRating, getNewestComics } from '@/lib/api/comics';
import { Comic } from '@/types/comic';

interface RankingsPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function RankingsPage({ searchParams }: RankingsPageProps) {
  const params = await searchParams;
  const tab = (params.tab as 'popular' | 'topRated' | 'newReleases') || 'popular';

  let popularComics: Comic[] = [];
  let topRatedComics: Comic[] = [];
  let newReleasesComics: Comic[] = [];

  try {
    // Fetch all rankings data in parallel
    const [popular, topRated, newReleases] = await Promise.all([
      getTopByViews(50),
      getTopByRating(50),
      getNewestComics(50),
    ]);

    popularComics = popular;
    topRatedComics = topRated;
    newReleasesComics = newReleases;
  } catch (error) {
    console.error('Failed to fetch rankings:', error);
  }

  return (
    <RankingsPageClient
      initialTab={tab}
      popularComics={popularComics}
      topRatedComics={topRatedComics}
      newReleasesComics={newReleasesComics}
    />
  );
}


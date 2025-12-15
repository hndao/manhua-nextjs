'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Comic } from '@/types/comic';
import RankingsPageDesktop from '@/components/rankings/RankingsPageDesktop';
import RankingsPageTablet from '@/components/rankings/RankingsPageTablet';
import RankingsPageMobile from '@/components/rankings/RankingsPageMobile';
import ResponsiveContainer from '@/components/responsive/ResponsiveContainer';
import { getTopByViews, getTopByRating, getNewestComics } from '@/lib/api/comics';

interface RankingsPageClientProps {
  initialTab: 'popular' | 'topRated' | 'newReleases';
  popularComics: Comic[];
  topRatedComics: Comic[];
  newReleasesComics: Comic[];
}

export default function RankingsPageClient({
  initialTab,
  popularComics,
  topRatedComics,
  newReleasesComics,
}: RankingsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'popular' | 'topRated' | 'newReleases'>(initialTab);

  // Filter states
  const [statusFilter, setStatusFilter] = useState<'all' | 'ongoing' | 'completed'>('all');
  const [genreFilter, setGenreFilter] = useState<string>('all');

  // Comics state
  const [comics, setComics] = useState<Comic[]>(
    initialTab === 'popular' ? popularComics : initialTab === 'topRated' ? topRatedComics : newReleasesComics
  );
  const [isLoading, setIsLoading] = useState(false);

  // Fetch comics when tab or filters change
  useEffect(() => {
    const fetchComics = async () => {
      setIsLoading(true);
      try {
        let fetchFunction;
        switch (activeTab) {
          case 'popular':
            fetchFunction = getTopByViews;
            break;
          case 'topRated':
            fetchFunction = getTopByRating;
            break;
          case 'newReleases':
            fetchFunction = getNewestComics;
            break;
        }

        const data = await fetchFunction(50, statusFilter, genreFilter);
        setComics(data);
      } catch (error) {
        console.error('Failed to fetch comics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComics();
  }, [activeTab, statusFilter, genreFilter]);

  const handleTabChange = (tab: 'popular' | 'topRated' | 'newReleases') => {
    setActiveTab(tab);
    // Reset filters when changing tabs
    setStatusFilter('all');
    setGenreFilter('all');

    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push(`/rankings?${params.toString()}`);
  };

  const pageProps = {
    activeTab,
    comics,
    onTabChange: handleTabChange,
    statusFilter,
    genreFilter,
    onStatusFilterChange: setStatusFilter,
    onGenreFilterChange: setGenreFilter,
    isLoading,
  };

  return (
    <ResponsiveContainer
      mobile={<RankingsPageMobile {...pageProps} />}
      tablet={<RankingsPageTablet {...pageProps} />}
      desktop={<RankingsPageDesktop {...pageProps} />}
    />
  );
}


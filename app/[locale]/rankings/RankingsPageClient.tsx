'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Comic } from '@/types/comic';
import RankingsPageDesktop from '@/components/rankings/RankingsPageDesktop';
import RankingsPageTablet from '@/components/rankings/RankingsPageTablet';
import RankingsPageMobile from '@/components/rankings/RankingsPageMobile';
import ResponsiveContainer from '@/components/responsive/ResponsiveContainer';

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

  const handleTabChange = (tab: 'popular' | 'topRated' | 'newReleases') => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push(`/rankings?${params.toString()}`);
  };

  // Get comics based on active tab
  const comics =
    activeTab === 'popular'
      ? popularComics
      : activeTab === 'topRated'
      ? topRatedComics
      : newReleasesComics;

  const pageProps = {
    activeTab,
    comics,
    onTabChange: handleTabChange,
  };

  return (
    <ResponsiveContainer
      mobile={<RankingsPageMobile {...pageProps} />}
      tablet={<RankingsPageTablet {...pageProps} />}
      desktop={<RankingsPageDesktop {...pageProps} />}
    />
  );
}


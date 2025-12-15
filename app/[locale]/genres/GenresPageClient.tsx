'use client';

import { Genre } from '@/types/comic';
import GenresPageDesktop from '@/components/genres/GenresPageDesktop';
import GenresPageTablet from '@/components/genres/GenresPageTablet';
import GenresPageMobile from '@/components/genres/GenresPageMobile';
import ResponsiveContainer from '@/components/responsive/ResponsiveContainer';

interface GenresPageClientProps {
  genres: Genre[];
}

export default function GenresPageClient({ genres }: GenresPageClientProps) {
  return (
    <ResponsiveContainer
      mobile={<GenresPageMobile genres={genres} />}
      tablet={<GenresPageTablet genres={genres} />}
      desktop={<GenresPageDesktop genres={genres} />}
    />
  );
}


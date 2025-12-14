'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Genre } from '@/types/comic';
import { getGenres } from '@/lib/api/genres';

interface GenresContextType {
  genres: Genre[];
  isLoading: boolean;
  error: Error | null;
  refreshGenres: () => Promise<void>;
}

const GenresContext = createContext<GenresContextType | undefined>(undefined);

export function GenresProvider({ children }: { children: ReactNode }) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load genres on mount
  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const genresData = await getGenres();
      setGenres(Array.isArray(genresData) ? genresData : []);
    } catch (err) {
      console.error('Failed to load genres:', err);
      setError(err instanceof Error ? err : new Error('Failed to load genres'));
      setGenres([]);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshGenres = async () => {
    await loadGenres();
  };

  const value: GenresContextType = {
    genres,
    isLoading,
    error,
    refreshGenres,
  };

  return <GenresContext.Provider value={value}>{children}</GenresContext.Provider>;
}

export function useGenres() {
  const context = useContext(GenresContext);
  if (context === undefined) {
    throw new Error('useGenres must be used within a GenresProvider');
  }
  return context;
}


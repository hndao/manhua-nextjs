import { getComics, getFeaturedComics, getHotComics } from '@/lib/api/comics';
import Banner from '@/components/landing/Banner';
import EditorPicks from '@/components/landing/EditorPicks';
import HotSerials from '@/components/landing/HotSerials';
import DailyUpdates from '@/components/landing/DailyUpdates';
import Rankings from '@/components/landing/Rankings';

export default async function Home() {
  try {
    // Fetch data from API in parallel
    const [
      featuredComics,
      editorPicksData,
      hotComics,
      dailyUpdates,
      overallRankings,
      maleRankings,
      femaleRankings,
      newComics,
    ] = await Promise.all([
      getComics({ limit: 5 }), // Banner comics
      getComics({ limit: 6 }), // Editor picks
      getComics({ limit: 12 }), // Hot serials
      getComics({ limit: 10 }), // Daily updates
      getComics({ limit: 5 }), // Overall rankings
      getComics({ limit: 5 }), // Male rankings
      getComics({ limit: 5 }), // Female rankings
      getComics({ limit: 5 }), // New comics
    ]);

    return (
      <div className="bg-white">
        {/* Banner Section */}
        <Banner comics={featuredComics.data} />

        {/* Editor Picks Section */}
        <EditorPicks comics={editorPicksData.data} />

        {/* Hot Serials Section */}
        <HotSerials comics={hotComics.data} />

        {/* Daily Updates Section */}
        <DailyUpdates comics={dailyUpdates.data} />

        {/* Rankings Section */}
        <Rankings
          overall={overallRankings.data}
          male={maleRankings.data}
          female={femaleRankings.data}
          newComics={newComics.data}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);

    // Show error message when API is not available
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Unable to Connect to API
          </h1>
          <p className="text-gray-600 mb-6">
            Please make sure the Laravel backend is running at <code className="bg-gray-100 px-2 py-1 rounded">http://127.0.0.1:8000</code>
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left max-w-md mx-auto">
            <p className="text-sm text-blue-900 font-medium mb-2">To start the Laravel backend:</p>
            <code className="block bg-blue-900 text-blue-100 px-3 py-2 rounded text-sm">
              cd ../manhua-laravel<br />
              php artisan serve
            </code>
          </div>
        </div>
      </div>
    );
  }
}

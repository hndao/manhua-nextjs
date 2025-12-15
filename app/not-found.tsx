import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
          <div className="max-w-2xl w-full text-center">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="relative inline-block">
                {/* Large 404 Text */}
                <h1 className="text-[120px] md:text-[180px] lg:text-[220px] font-bold text-gray-200 leading-none select-none">
                  404
                </h1>
                
                {/* Sad Book Icon Overlay */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    className="w-24 h-24 md:w-32 md:h-32 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                    {/* Sad face on book */}
                    <circle cx="9" cy="11" r="0.5" fill="currentColor" />
                    <circle cx="15" cy="11" r="0.5" fill="currentColor" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 14c.5-.5 1.5-1 3-1s2.5.5 3 1"
                      transform="scale(1, -1) translate(0, -28)"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Oops! Page Not Found
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-2">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>
              <p className="text-sm md:text-base text-gray-500">
                Here are some helpful links instead:
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm md:text-base inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go to Home
              </Link>

              <Link
                href="/rankings"
                className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm md:text-base inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                View Rankings
              </Link>

              <Link
                href="/search"
                className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm md:text-base inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Comics
              </Link>
            </div>

            {/* Popular Genres Quick Links */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500 mb-4">Browse Comics</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link
                  href="/genres"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm"
                >
                  Genres
                </Link>
                <Link
                  href="/rankings?tab=popular"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm"
                >
                  Most Popular
                </Link>
                <Link
                  href="/rankings?tab=new"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm"
                >
                  New Releases
                </Link>
              </div>
            </div>

            {/* Language Selection */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">Choose your language:</p>
              <div className="flex gap-3 justify-center">
                <Link
                  href="/?locale=en"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  English
                </Link>
                <Link
                  href="/?locale=vi"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Tiếng Việt
                </Link>
                <Link
                  href="/?locale=zh"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  中文
                </Link>
              </div>
            </div>
          </div>
    </div>
  );
}


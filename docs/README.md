# Manhua Reader - Frontend Documentation

## Overview

This is the frontend application for the Manhua Reader platform, built with Next.js 16, React 19, and TypeScript. The application provides a modern, responsive reading experience for Chinese comics (Manhua) with support for multiple languages.

## Technology Stack

- **Framework**: Next.js 16.0.10 (App Router with Turbopack)
- **React**: 19.0.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v4
- **Internationalization**: next-intl
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Node.js**: >= 20.9.0 (Recommended: v22.x)

## Project Structure

```
manhua-nextjs/
├── app/                          # Next.js App Router pages
│   ├── [locale]/                 # Locale-specific routes
│   │   ├── page.tsx             # Home page
│   │   ├── comic/               # Comic details & reader
│   │   ├── search/              # Search page
│   │   ├── rankings/            # Rankings page
│   │   ├── genres/              # Genres page
│   │   ├── bookmarks/           # User bookmarks
│   │   ├── history/             # Reading history
│   │   ├── login/               # Login page
│   │   ├── register/            # Register page
│   │   └── not-found.tsx        # Locale-specific 404
│   ├── not-found.tsx            # Root 404 page
│   └── layout.tsx               # Root layout
├── components/                   # React components
│   ├── common/                  # Shared components
│   ├── home/                    # Home page components
│   ├── comic/                   # Comic-related components
│   ├── reader/                  # Reader components
│   ├── search/                  # Search components
│   ├── rankings/                # Rankings components
│   ├── genres/                  # Genres components
│   ├── bookmarks/               # Bookmarks components
│   └── history/                 # History components
├── lib/                         # Utilities and libraries
│   ├── api/                     # API client and functions
│   ├── contexts/                # React contexts
│   └── utils/                   # Utility functions
├── messages/                    # Translation files
│   ├── en.json                  # English translations
│   ├── vi.json                  # Vietnamese translations
│   └── zh.json                  # Chinese translations
├── types/                       # TypeScript type definitions
├── public/                      # Static assets
└── docs/                        # Documentation

```

## Key Features

### 1. Multi-Language Support
- English (en)
- Vietnamese (vi)
- Chinese (zh)
- Automatic locale detection from URL, cookie, or browser settings
- Middleware-based URL rewriting for clean URLs

### 2. Responsive Design
- **Mobile**: < 768px
- **Tablet**: 768px - 1439px
- **Desktop**: >= 1440px
- Separate components for each breakpoint
- Custom `useBreakpoint` hook for responsive logic

### 3. Authentication
- Laravel Sanctum token-based authentication
- Refresh token mechanism (7-day access token, 30-day refresh token)
- Automatic token refresh on expiration
- Protected routes for authenticated users
- Server-side and client-side authentication

### 4. Comic Reading Experience
- Vertical scroll reading mode
- Sticky header on desktop with chapter navigation
- Previous/Next chapter buttons
- Dark mode support
- Brightness control
- Keyboard navigation (arrow keys)
- Reading progress tracking
- View counting

### 5. User Features
- **Bookmarks**: Save favorite comics
- **Reading History**: Track reading progress
- **Manage Mode**: Bulk delete bookmarks/history
- **Ratings**: Rate comics
- **Search**: Full-text search with filters
- **Rankings**: Most Popular, Top Rated, New Releases

### 6. Search & Discovery
- Real-time search with autocomplete
- Filter by status, genre, sort order
- Server-side rendering for SEO
- Responsive grid layouts

## Getting Started

### Prerequisites
- Node.js >= 20.9.0 (Recommended: v22.x)
- npm or yarn
- Laravel backend running

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8001/api/v1
```

3. Run development server:
```bash
npm run dev
```

4. Open http://localhost:3000

### Build for Production

```bash
npm run build
npm start
```

## Documentation Files

1. **README.md** (this file) - Project overview and getting started
2. **ARCHITECTURE.md** - Technical architecture and design patterns
3. **API_INTEGRATION.md** - API integration guide
4. **USER_GUIDE.md** - End-user feature guide
5. **DEVELOPMENT_GUIDE.md** - Developer workflow and best practices

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Laravel API base URL | `http://127.0.0.1:8001/api/v1` |
| `NEXT_PUBLIC_IMAGE_CDN_URL` | Optional CDN URL for images | `https://cdn.example.com` |

## Support

For issues or questions:
- Check existing documentation in `/docs`
- Review API documentation in `API_DOCUMENTATION.md`
- Check responsive design specs in `RESPONSIVE_DESIGN_SPEC.md`


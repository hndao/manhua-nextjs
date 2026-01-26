# Frontend Architecture

## Overview

The Manhua Reader frontend follows a modern React architecture using Next.js 16 App Router with server and client components, TypeScript for type safety, and a component-based design system.

## Architecture Principles

### 1. Server-First Approach
- Use Server Components by default for better performance
- Client Components only when needed (interactivity, hooks, browser APIs)
- Server-side data fetching for SEO and initial page load

### 2. Responsive Component Pattern
- Separate components for Mobile, Tablet, and Desktop
- Single client component orchestrates responsive rendering
- Breakpoint detection via custom `useBreakpoint` hook

### 3. Type Safety
- Strict TypeScript configuration
- Shared types in `/types` directory
- API response types match Laravel backend

### 4. Internationalization
- next-intl for translations
- Middleware-based locale detection
- URL rewriting for clean URLs (no `/[locale]` prefix visible)

## Component Architecture

### Component Hierarchy

```
Page (Server Component)
  └── PageClient (Client Component)
      ├── PageDesktop (Desktop >= 1440px)
      ├── PageTablet (Tablet 768px - 1439px)
      └── PageMobile (Mobile < 768px)
```

### Example: Search Page

```typescript
// app/[locale]/search/page.tsx (Server Component)
export default async function SearchPage({ searchParams }) {
  const comics = await searchComics(searchParams);
  return <SearchPageClient initialComics={comics} />;
}

// app/[locale]/search/SearchPageClient.tsx (Client Component)
'use client';
export default function SearchPageClient({ initialComics }) {
  const breakpoint = useBreakpoint();
  
  if (breakpoint === 'desktop') return <SearchPageDesktop />;
  if (breakpoint === 'tablet') return <SearchPageTablet />;
  return <SearchPageMobile />;
}
```

## State Management

### 1. React Context API

**AuthContext** (`lib/contexts/AuthContext.tsx`)
- User authentication state
- Login/logout functions
- Token management
- Auto-refresh tokens

**GenresContext** (`lib/contexts/GenresContext.tsx`)
- Cached genre list
- Prevents redundant API calls

### 2. Local State
- Component-level state with `useState`
- Form state management
- UI state (modals, dropdowns, etc.)

### 3. URL State
- Search parameters for filters
- Pagination state
- Shareable URLs

## Data Flow

### Client-Side Data Flow

```
User Action
  ↓
Component Event Handler
  ↓
API Client Function (lib/api/*)
  ↓
Axios Request with Auth Token
  ↓
Laravel Backend
  ↓
Response
  ↓
Update Component State
  ↓
Re-render UI
```

### Server-Side Data Flow

```
Page Request
  ↓
Server Component
  ↓
API Function (lib/api/*)
  ↓
Server API Client (lib/api/server-client.ts)
  ↓
Laravel Backend (with token from cookie)
  ↓
Response
  ↓
Render HTML
  ↓
Send to Client
```

## API Integration

### Client-Side API Client

**Location**: `lib/api/client.ts`

Features:
- Axios instance with base URL
- Automatic token injection from localStorage
- 401 error handling with token refresh
- Request queuing during token refresh

### Server-Side API Client

**Location**: `lib/api/server-client.ts`

Features:
- Accepts token as parameter (from cookies)
- Used in Server Components
- No localStorage access

### API Modules

- `lib/api/auth.ts` - Authentication (login, register, refresh)
- `lib/api/comics.ts` - Comics data
- `lib/api/chapters.ts` - Chapter data
- `lib/api/genres.ts` - Genres data
- `lib/api/user.ts` - User data (bookmarks, history)
- `lib/api/server-user.ts` - Server-side user data

## Routing

### URL Structure

```
/                           → Home page (en locale by default)
/comic/{slug}              → Comic details
/comic/{slug}/{chapter}    → Chapter reader
/search                    → Search page
/rankings                  → Rankings page
/genres                    → Genres page
/bookmarks                 → User bookmarks (protected)
/history                   → Reading history (protected)
/login                     → Login page
/register                  → Register page
```

### Locale Handling

Middleware rewrites URLs internally:
```
User visits: /search
Middleware rewrites to: /en/search (or user's locale)
```

Locale determined by:
1. Query parameter (`?locale=vi`)
2. Cookie (`NEXT_LOCALE`)
3. Default locale (`en`)

## Authentication Flow

### Login Flow

```
1. User submits login form
2. POST /api/v1/login
3. Receive access_token + refresh_token
4. Store both in localStorage
5. Store both in cookies (for SSR)
6. Update AuthContext
7. Redirect to home
```

### Token Refresh Flow

```
1. API request returns 401
2. Check if refresh token exists
3. POST /api/v1/refresh with refresh_token
4. Receive new access_token + refresh_token
5. Update tokens in storage
6. Retry original request
7. Queue other requests during refresh
```

### Protected Routes

Server Components check for token in cookies:
```typescript
const token = cookies().get('access_token')?.value;
if (!token) redirect('/login');
```

## Performance Optimizations

### 1. Image Optimization
- Next.js Image component
- Lazy loading for images below fold
- Priority loading for above-fold images
- Responsive image sizes

### 2. Code Splitting
- Automatic route-based code splitting
- Dynamic imports for heavy components
- Separate bundles for each page

### 3. Caching
- Genre list cached in GenresContext
- Server-side data caching with Next.js cache
- Browser caching for static assets

### 4. Server Components
- Reduce JavaScript bundle size
- Faster initial page load
- Better SEO

## Error Handling

### 1. API Errors
- Try-catch blocks in async functions
- User-friendly error messages
- Automatic retry for 401 errors

### 2. 404 Errors
- Root 404: `app/not-found.tsx`
- Locale 404: `app/[locale]/not-found.tsx`
- Custom styled 404 pages

### 3. Form Validation
- Client-side validation
- Server-side validation errors displayed
- Field-level error messages

## Security

### 1. Authentication
- Token-based authentication
- HttpOnly cookies for SSR
- Automatic token refresh
- Logout on token expiration

### 2. XSS Prevention
- React automatic escaping
- Sanitized user input
- Content Security Policy headers

### 3. CSRF Protection
- Laravel Sanctum CSRF protection
- SameSite cookie attribute

## Testing Strategy

### Recommended Testing Approach

1. **Unit Tests**: Component logic, utility functions
2. **Integration Tests**: API integration, context providers
3. **E2E Tests**: Critical user flows (login, reading, bookmarking)

### Testing Tools (to be implemented)
- Jest for unit tests
- React Testing Library for component tests
- Playwright/Cypress for E2E tests


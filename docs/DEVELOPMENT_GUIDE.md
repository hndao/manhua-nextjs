# Development Guide

## Development Environment Setup

### Prerequisites

1. **Node.js**: v22.x (minimum v20.9.0)
   ```bash
   # Using nvm
   nvm install 22
   nvm use 22
   ```

2. **Package Manager**: npm (comes with Node.js)

3. **IDE**: VS Code (recommended) with extensions:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript and JavaScript Language Features

### Initial Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env.local
   ```

4. Update `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8001/api/v1
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

6. Open http://localhost:3000

## Development Workflow

### Creating New Features

#### 1. Create a New Page

**Server Component** (default):
```typescript
// app/[locale]/my-page/page.tsx
import { getTranslations } from 'next-intl/server';

export default async function MyPage() {
  const t = await getTranslations();
  
  return (
    <div>
      <h1>{t('myPage.title')}</h1>
    </div>
  );
}
```

**Client Component** (when needed):
```typescript
// app/[locale]/my-page/MyPageClient.tsx
'use client';

import { useTranslations } from 'next-intl';

export default function MyPageClient() {
  const t = useTranslations();
  
  return (
    <div>
      <h1>{t('myPage.title')}</h1>
    </div>
  );
}
```

#### 2. Create Responsive Components

```typescript
// app/[locale]/my-page/MyPageClient.tsx
'use client';

import { useBreakpoint } from '@/lib/hooks/useBreakpoint';
import MyPageDesktop from '@/components/my-page/MyPageDesktop';
import MyPageTablet from '@/components/my-page/MyPageTablet';
import MyPageMobile from '@/components/my-page/MyPageMobile';

export default function MyPageClient() {
  const breakpoint = useBreakpoint();
  
  if (breakpoint === 'desktop') return <MyPageDesktop />;
  if (breakpoint === 'tablet') return <MyPageTablet />;
  return <MyPageMobile />;
}
```

#### 3. Add Translations

Update all three language files:

```json
// messages/en.json
{
  "myPage": {
    "title": "My Page",
    "description": "This is my page"
  }
}

// messages/vi.json
{
  "myPage": {
    "title": "Trang của tôi",
    "description": "Đây là trang của tôi"
  }
}

// messages/zh.json
{
  "myPage": {
    "title": "我的页面",
    "description": "这是我的页面"
  }
}
```

#### 4. Add API Integration

```typescript
// lib/api/my-feature.ts
import apiClient from './client';
import { ApiResponse } from '@/types/comic';

export interface MyData {
  id: number;
  name: string;
}

export async function getMyData(): Promise<MyData[]> {
  const response = await apiClient.get<ApiResponse<MyData[]>>('/my-data');
  return response.data.data;
}
```

### Code Style Guidelines

#### TypeScript

1. **Use strict typing**:
   ```typescript
   // Good
   interface Props {
     title: string;
     count: number;
   }
   
   // Bad
   interface Props {
     title: any;
     count: any;
   }
   ```

2. **Define interfaces for all props**:
   ```typescript
   interface MyComponentProps {
     title: string;
     onSubmit: (data: FormData) => void;
   }
   
   export default function MyComponent({ title, onSubmit }: MyComponentProps) {
     // ...
   }
   ```

3. **Use type imports**:
   ```typescript
   import type { Comic, Chapter } from '@/types/comic';
   ```

#### React Components

1. **Use functional components**:
   ```typescript
   // Good
   export default function MyComponent() {
     return <div>Hello</div>;
   }
   
   // Avoid class components
   ```

2. **Use hooks properly**:
   ```typescript
   // Good - hooks at top level
   export default function MyComponent() {
     const [state, setState] = useState(0);
     const value = useMemo(() => compute(), []);
     
     return <div>{value}</div>;
   }
   ```

3. **Extract complex logic to custom hooks**:
   ```typescript
   // lib/hooks/useMyFeature.ts
   export function useMyFeature() {
     const [data, setData] = useState(null);
     
     useEffect(() => {
       // Complex logic here
     }, []);
     
     return { data };
   }
   ```

#### Tailwind CSS

1. **Use utility classes**:
   ```tsx
   <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
   ```

2. **Use responsive prefixes**:
   ```tsx
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
   ```

3. **Group related classes**:
   ```tsx
   <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
   ```

### Best Practices

#### 1. Server vs Client Components

**Use Server Components for**:
- Data fetching
- Static content
- SEO-important content
- Reducing JavaScript bundle

**Use Client Components for**:
- Interactivity (onClick, onChange)
- React hooks (useState, useEffect)
- Browser APIs (localStorage, window)
- Context consumers

#### 2. Data Fetching

**Server-side** (preferred for initial load):
```typescript
export default async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}
```

**Client-side** (for dynamic updates):
```typescript
'use client';

export default function Component() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  return <div>{data}</div>;
}
```

#### 3. Error Handling

```typescript
try {
  const data = await apiCall();
  return data;
} catch (error) {
  console.error('Error fetching data:', error);
  // Show user-friendly error message
  throw error; // or return default value
}
```

#### 4. Performance Optimization

**Image Optimization**:
```tsx
import Image from 'next/image';

<Image
  src={comic.cover_image}
  alt={comic.title}
  width={300}
  height={400}
  priority={isAboveFold}
  loading={isAboveFold ? 'eager' : 'lazy'}
/>
```

**Code Splitting**:
```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>
});
```

**Memoization**:
```typescript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

const handleClick = useCallback(() => {
  doSomething();
}, [dependency]);
```

## Common Tasks

### Adding a New API Endpoint

1. Add function to appropriate API module:
   ```typescript
   // lib/api/comics.ts
   export async function getComicsByAuthor(authorId: number): Promise<Comic[]> {
     const response = await apiClient.get(`/authors/${authorId}/comics`);
     return response.data.data;
   }
   ```

2. Add TypeScript types if needed:
   ```typescript
   // types/comic.ts
   export interface AuthorComics {
     author: Author;
     comics: Comic[];
   }
   ```

3. Use in component:
   ```typescript
   const comics = await getComicsByAuthor(authorId);
   ```

### Adding a New Translation Key

1. Add to all language files:
   ```json
   // messages/en.json
   "newFeature": {
     "title": "New Feature"
   }
   ```

2. Use in component:
   ```typescript
   const t = useTranslations();
   <h1>{t('newFeature.title')}</h1>
   ```

### Creating a Protected Route

```typescript
// app/[locale]/protected-page/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const token = cookies().get('access_token')?.value;
  
  if (!token) {
    redirect('/login');
  }
  
  // Page content
}
```

## Debugging

### Common Issues

**1. "Hydration Error"**
- Cause: Server and client render different HTML
- Solution: Ensure consistent rendering, avoid browser-only APIs in server components

**2. "Module not found"**
- Cause: Incorrect import path
- Solution: Use `@/` alias for absolute imports from root

**3. "API 404 Error"**
- Cause: Wrong API URL or endpoint
- Solution: Check `.env.local` and API endpoint path

### Debugging Tools

1. **React DevTools**: Inspect component tree and props
2. **Network Tab**: Monitor API requests
3. **Console Logs**: Add strategic console.logs
4. **Next.js Error Overlay**: Shows detailed error information

## Git Workflow

### Branch Strategy

- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: New features
- `bugfix/*`: Bug fixes

### Commit Messages

Follow conventional commits:
```
feat: Add bookmark functionality
fix: Fix reader header sticky behavior
docs: Update API documentation
style: Format code with prettier
refactor: Restructure component hierarchy
```

### Before Committing

1. Run linter: `npm run lint`
2. Check TypeScript: `npm run type-check` (if available)
3. Test locally
4. Review changes

## Deployment

### Build Process

```bash
npm run build
```

### Environment Variables

Ensure production environment variables are set:
- `NEXT_PUBLIC_API_URL`: Production API URL

### Deployment Platforms

- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Docker container

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app)


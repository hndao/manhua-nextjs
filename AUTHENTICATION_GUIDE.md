# Authentication System Guide

## Overview

The Manhua platform now has a complete authentication system using Laravel Sanctum (backend) and React Context (frontend).

## Backend (Laravel)

### Authentication Controller
**Location:** `manhua-laravel/app/Http/Controllers/Api/AuthController.php`

#### Endpoints:
- `POST /api/v1/register` - Register new user
- `POST /api/v1/login` - Login user
- `POST /api/v1/logout` - Logout user (requires auth)
- `GET /api/v1/user` - Get authenticated user (requires auth)

### API Routes
**Location:** `manhua-laravel/routes/api.php`

Public routes:
```php
POST /api/v1/register
POST /api/v1/login
```

Protected routes (require Bearer token):
```php
POST /api/v1/logout
GET /api/v1/user
GET /api/v1/bookmarks
POST /api/v1/bookmarks/{comic}
DELETE /api/v1/bookmarks/{comic}
GET /api/v1/history
POST /api/v1/history
POST /api/v1/comics/{comic}/rate
```

## Frontend (Next.js)

### 1. API Functions
**Location:** `manhua-nextjs/lib/api/auth.ts`

Functions:
- `register(data)` - Register new user
- `login(credentials)` - Login user
- `logout()` - Logout user
- `getCurrentUser()` - Get current user
- `isAuthenticated()` - Check if user is logged in
- `getAuthToken()` - Get stored token

### 2. Auth Context
**Location:** `manhua-nextjs/lib/contexts/AuthContext.tsx`

Provides:
- `user` - Current user object or null
- `isLoading` - Loading state
- `isAuthenticated` - Boolean auth status
- `login(email, password)` - Login function
- `register(name, email, password, password_confirmation)` - Register function
- `logout()` - Logout function
- `refreshUser()` - Refresh user data

Usage:
```tsx
import { useAuth } from '@/lib/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Use auth state and functions
}
```

### 3. Pages

#### Login Page
**Location:** `manhua-nextjs/app/[locale]/login/page.tsx`
- Email/password form
- Error handling
- Redirects to home after login
- Link to register page

#### Register Page
**Location:** `manhua-nextjs/app/[locale]/register/page.tsx`
- Full name, email, password, confirm password
- Client-side validation
- Server-side error display
- Redirects to home after registration
- Link to login page

#### Profile Page
**Location:** `manhua-nextjs/app/[locale]/profile/page.tsx`
- Protected route (redirects to login if not authenticated)
- Displays user information
- Quick links to bookmarks and history
- Logout button

### 4. Header Component
**Location:** `manhua-nextjs/components/layout/Header.tsx`

Features:
- Shows Login/Register buttons when not authenticated
- Shows user menu with dropdown when authenticated
- User menu includes:
  - Profile link
  - Bookmarks link
  - Reading History link
  - Logout button
- Responsive design (desktop and mobile)

## Authentication Flow

### Registration Flow
1. User fills registration form
2. Frontend sends POST to `/api/v1/register`
3. Backend creates user and returns token
4. Frontend stores token in localStorage
5. AuthContext updates user state
6. User is redirected to home page

### Login Flow
1. User fills login form
2. Frontend sends POST to `/api/v1/login`
3. Backend validates credentials and returns token
4. Frontend stores token in localStorage
5. AuthContext updates user state
6. User is redirected to home page

### Logout Flow
1. User clicks logout
2. Frontend sends POST to `/api/v1/logout`
3. Backend revokes token
4. Frontend removes token from localStorage
5. AuthContext clears user state
6. User is redirected to home page

### Protected Routes
1. User tries to access protected page (e.g., /profile)
2. Page checks `isAuthenticated` from AuthContext
3. If not authenticated, redirects to /login
4. If authenticated, displays page content

## Token Management

### Storage
- Tokens are stored in `localStorage` with key `auth_token`
- Token is automatically included in all API requests via axios interceptor

### API Client
**Location:** `manhua-nextjs/lib/api/client.ts`

Features:
- Request interceptor adds `Authorization: Bearer {token}` header
- Response interceptor handles 401 errors (clears token and redirects)
- CORS enabled with credentials

## Testing the Authentication

### 1. Start Both Servers
```bash
# Terminal 1 - Laravel Backend
cd manhua-laravel
php artisan serve

# Terminal 2 - Next.js Frontend
cd manhua-nextjs
nvm use 22
npm run dev
```

### 2. Test Registration
1. Go to http://localhost:3000/register
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
3. Click "Register"
4. Should redirect to home page
5. Header should show user menu with "Test User"

### 3. Test Logout
1. Click on user name in header
2. Click "Logout"
3. Should redirect to home
4. Header should show Login/Register buttons

### 4. Test Login
1. Click "Login" in header
2. Enter credentials:
   - Email: test@example.com
   - Password: password123
3. Click "Login"
4. Should redirect to home
5. Header should show user menu

### 5. Test Protected Route
1. While logged in, go to http://localhost:3000/profile
2. Should see profile page with user info
3. Logout
4. Try to access http://localhost:3000/profile
5. Should redirect to login page

## Next Steps

- [ ] Implement Bookmarks page
- [ ] Implement Reading History page
- [ ] Add password reset functionality
- [ ] Add email verification
- [ ] Add social login (Google, Facebook)
- [ ] Add remember me functionality
- [ ] Add session timeout handling


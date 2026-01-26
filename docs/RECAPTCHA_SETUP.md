# reCAPTCHA Setup Guide (Frontend)

## Overview

This guide explains how to set up and use Google reCAPTCHA v3 in the Next.js frontend.

## Quick Start

### 1. Get Your Site Key

1. Visit https://www.google.com/recaptcha/admin
2. Register your site with reCAPTCHA v3
3. Copy your **Site Key** (this is public and safe to expose)

### 2. Configure Environment Variable

Add to `.env.local`:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
```

**Important**: The variable must start with `NEXT_PUBLIC_` to be accessible in the browser.

### 3. Use in Your Forms

```typescript
import { useRecaptcha } from '@/lib/hooks/useRecaptcha';

export default function MyForm() {
  const { executeRecaptcha, isLoaded } = useRecaptcha();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get reCAPTCHA token
    const token = await executeRecaptcha('my_action');

    // Send token with your API request
    await myApiCall({ ...data, recaptcha_token: token });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <button type="submit" disabled={!isLoaded}>
        Submit
      </button>
    </form>
  );
}
```

## API Reference

### `useRecaptcha()` Hook

Returns an object with:

- **`isLoaded: boolean`** - Whether reCAPTCHA script is loaded and ready
- **`executeRecaptcha(action: string): Promise<string>`** - Execute reCAPTCHA and get token

#### Parameters

- **`action`** (string): A descriptive name for this action (e.g., 'login', 'register', 'rate_comic')
  - Used for analytics in reCAPTCHA admin console
  - Should be lowercase with underscores
  - Examples: 'login', 'register', 'submit_comment', 'rate_comic'

#### Returns

A Promise that resolves to a reCAPTCHA token (string).

#### Throws

- Error if reCAPTCHA is not loaded
- Error if site key is not configured
- Error if reCAPTCHA execution fails

## Protected Forms

The following forms are protected with reCAPTCHA:

1. **Registration** (`/register`)
2. **Login** (`/login`)
3. **Comic Rating** (on comic detail pages)

## How It Works

1. **Script Loading**: The `useRecaptcha` hook automatically loads the reCAPTCHA script when the component mounts
2. **Token Generation**: When you call `executeRecaptcha(action)`, it contacts Google's servers and returns a token
3. **Token Validation**: The token is sent to the backend, which verifies it with Google
4. **Score Evaluation**: Google returns a score (0.0-1.0) indicating if the user is likely human

## Best Practices

### 1. Call `executeRecaptcha` Just Before Submission

```typescript
// ✅ Good - Execute right before API call
const handleSubmit = async (e) => {
  e.preventDefault();
  const token = await executeRecaptcha('login');
  await login(email, password, token);
};

// ❌ Bad - Token might expire
const token = await executeRecaptcha('login');
// ... do other stuff ...
await login(email, password, token); // Token might be expired
```

### 2. Disable Submit Button Until Loaded

```typescript
<button type="submit" disabled={isLoading || !isLoaded}>
  Submit
</button>
```

### 3. Use Descriptive Action Names

```typescript
// ✅ Good
await executeRecaptcha('register');
await executeRecaptcha('login');
await executeRecaptcha('rate_comic');

// ❌ Bad
await executeRecaptcha('submit');
await executeRecaptcha('action');
```

### 4. Handle Errors Gracefully

```typescript
try {
  const token = await executeRecaptcha('login');
  await login(email, password, token);
} catch (error) {
  console.error('reCAPTCHA failed:', error);
  setError('Verification failed. Please try again.');
}
```

## Styling the reCAPTCHA Badge

reCAPTCHA v3 shows a small badge in the bottom-right corner. You can customize its position:

```css
.grecaptcha-badge {
  visibility: hidden;
}
```

**Important**: If you hide the badge, you must include the following text:

```html
<p className="text-xs text-gray-500">
  This site is protected by reCAPTCHA and the Google{' '}
  <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
  <a href="https://policies.google.com/terms">Terms of Service</a> apply.
</p>
```

This is already included in the registration and login forms.

## Troubleshooting

### Issue: "reCAPTCHA not loaded or site key not configured"

**Solution**: 
1. Check that `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set in `.env.local`
2. Restart the Next.js dev server after adding the variable
3. Verify the variable name starts with `NEXT_PUBLIC_`

### Issue: Submit button is always disabled

**Solution**: Check that `isLoaded` is true. The reCAPTCHA script might be blocked by ad blockers or privacy extensions.

### Issue: Token verification fails on backend

**Possible causes**:
1. Token expired (valid for 2 minutes)
2. Token already used
3. Wrong secret key on backend
4. Network issues

**Solution**: Check backend logs for specific error messages.

## Testing

### Development Testing

For development, you can use Google's test keys:

```env
# Test keys (always pass verification)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
```

**Note**: These test keys should only be used in development, never in production.

### Production Testing

1. Register your production domain at https://www.google.com/recaptcha/admin
2. Add both `localhost` and your production domain to the allowed domains
3. Test on both environments

## Files

- `lib/hooks/useRecaptcha.ts` - Main hook implementation
- `lib/api/auth.ts` - Auth API with reCAPTCHA support
- `lib/api/user.ts` - User API with reCAPTCHA support
- `lib/contexts/AuthContext.tsx` - Auth context with reCAPTCHA
- `app/[locale]/register/page.tsx` - Registration form
- `app/[locale]/login/page.tsx` - Login form
- `components/comic/ComicInfo.tsx` - Rating submission

## References

- [Google reCAPTCHA v3 Documentation](https://developers.google.com/recaptcha/docs/v3)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)


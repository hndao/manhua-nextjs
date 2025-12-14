# Responsive Components Guide

## Overview

This guide explains how to separate components by device type (mobile, tablet, desktop) for easier maintenance in the Manhua project.

## Breakpoints

The project uses these breakpoints (defined in `tailwind.config.ts`):
- **Mobile**: `< 768px` (375px base)
- **Tablet**: `768px - 1439px`
- **Desktop**: `>= 1440px`

## Approach 1: ResponsiveContainer Component (Recommended)

### Usage

```tsx
import ResponsiveContainer from '@/components/responsive/ResponsiveContainer';
import MyComponentMobile from './MyComponentMobile';
import MyComponentTablet from './MyComponentTablet';
import MyComponentDesktop from './MyComponentDesktop';

export default function MyComponent() {
  return (
    <ResponsiveContainer
      mobile={<MyComponentMobile />}
      tablet={<MyComponentTablet />}
      desktop={<MyComponentDesktop />}
    />
  );
}
```

### How It Works

The `ResponsiveContainer` uses Tailwind's responsive classes to show/hide components:
- `block md:hidden` - Shows only on mobile
- `hidden md:block xl:hidden` - Shows only on tablet
- `hidden xl:block` - Shows only on desktop

### Benefits

✅ **Clean separation** - Each device type has its own component file
✅ **Easy to maintain** - Changes to mobile don't affect desktop
✅ **No JavaScript** - Uses CSS media queries (better performance)
✅ **SSR compatible** - Works with server-side rendering
✅ **Type-safe** - Full TypeScript support

### Example: Separated Header Components

```
components/layout/
├── Header.tsx                 # Main component using ResponsiveContainer
├── header/
│   ├── HeaderMobile.tsx      # Mobile-specific header
│   ├── HeaderTablet.tsx      # Tablet-specific header
│   └── HeaderDesktop.tsx     # Desktop-specific header
```

**Header.tsx:**
```tsx
import ResponsiveContainer from '@/components/responsive/ResponsiveContainer';
import HeaderMobile from './header/HeaderMobile';
import HeaderTablet from './header/HeaderTablet';
import HeaderDesktop from './header/HeaderDesktop';

export default function Header() {
  return (
    <ResponsiveContainer
      mobile={<HeaderMobile />}
      tablet={<HeaderTablet />}
      desktop={<HeaderDesktop />}
    />
  );
}
```

## Approach 2: useBreakpoint Hook

### Usage

```tsx
'use client';

import { useBreakpoint } from '@/lib/hooks/useBreakpoint';
import MobileComponent from './MobileComponent';
import TabletComponent from './TabletComponent';
import DesktopComponent from './DesktopComponent';

export default function MyComponent() {
  const breakpoint = useBreakpoint();

  if (breakpoint === 'mobile') {
    return <MobileComponent />;
  }

  if (breakpoint === 'tablet') {
    return <TabletComponent />;
  }

  return <DesktopComponent />;
}
```

### Available Hooks

```tsx
import { 
  useBreakpoint,  // Returns 'mobile' | 'tablet' | 'desktop'
  useIsMobile,    // Returns boolean
  useIsTablet,    // Returns boolean
  useIsDesktop    // Returns boolean
} from '@/lib/hooks/useBreakpoint';
```

### Benefits

✅ **Dynamic rendering** - Can conditionally render based on screen size
✅ **Flexible logic** - Can combine with other conditions
✅ **Client-side only** - Requires 'use client' directive

### Drawbacks

⚠️ **Hydration mismatch** - Initial render might not match server
⚠️ **JavaScript required** - Won't work without JS
⚠️ **Performance** - Adds event listeners for resize

## Approach 3: Tailwind Responsive Classes (Current Approach)

### Usage

```tsx
export default function MyComponent() {
  return (
    <div>
      {/* Mobile */}
      <div className="block md:hidden">
        <MobileLayout />
      </div>

      {/* Tablet */}
      <div className="hidden md:block xl:hidden">
        <TabletLayout />
      </div>

      {/* Desktop */}
      <div className="hidden xl:block">
        <DesktopLayout />
      </div>
    </div>
  );
}
```

### Benefits

✅ **Simple** - No extra components needed
✅ **SSR compatible** - Works with server-side rendering
✅ **No JavaScript** - Pure CSS solution

### Drawbacks

⚠️ **Mixed concerns** - All device logic in one file
⚠️ **Harder to maintain** - Large files with multiple layouts
⚠️ **Code duplication** - Similar code repeated for each breakpoint

## Recommendation

### Use **Approach 1 (ResponsiveContainer)** when:
- Component has significantly different layouts for each device
- You want clean separation of concerns
- Multiple developers working on different device versions
- Component is complex (like Header, Footer, Navigation)

### Use **Approach 2 (useBreakpoint Hook)** when:
- You need dynamic logic based on screen size
- Component behavior changes based on breakpoint
- You need to combine breakpoint with other state

### Use **Approach 3 (Tailwind Classes)** when:
- Component has minor differences between devices
- Just hiding/showing elements
- Simple responsive adjustments

## Migration Example

### Before (Single File):
```tsx
// components/layout/Header.tsx (270 lines)
export default function Header() {
  return (
    <header>
      <div className="hidden md:block">{/* Desktop code */}</div>
      <div className="md:hidden">{/* Mobile code */}</div>
    </header>
  );
}
```

### After (Separated Files):
```tsx
// components/layout/Header.tsx (15 lines)
import ResponsiveContainer from '@/components/responsive/ResponsiveContainer';
import HeaderMobile from './header/HeaderMobile';
import HeaderTablet from './header/HeaderTablet';
import HeaderDesktop from './header/HeaderDesktop';

export default function Header() {
  return (
    <ResponsiveContainer
      mobile={<HeaderMobile />}
      tablet={<HeaderTablet />}
      desktop={<HeaderDesktop />}
  />
  );
}
```

```tsx
// components/layout/header/HeaderMobile.tsx (140 lines)
export default function HeaderMobile() {
  // Mobile-specific code only
}
```

```tsx
// components/layout/header/HeaderTablet.tsx (100 lines)
export default function HeaderTablet() {
  // Tablet-specific code only
}
```

```tsx
// components/layout/header/HeaderDesktop.tsx (120 lines)
export default function HeaderDesktop() {
  // Desktop-specific code only
}
```

## Best Practices

1. **Keep shared logic in custom hooks**
   ```tsx
   // lib/hooks/useHeaderLogic.ts
   export function useHeaderLogic() {
     const { user, logout } = useAuth();
     const t = useTranslations();
     return { user, logout, t };
   }
   ```

2. **Use shared components for common elements**
   ```tsx
   // components/layout/header/UserMenu.tsx
   export function UserMenu({ user, logout }) {
     // Shared user menu logic
   }
   ```

3. **Name files clearly**
   - `ComponentMobile.tsx`
   - `ComponentTablet.tsx`
   - `ComponentDesktop.tsx`

4. **Document breakpoint-specific behavior**
   ```tsx
   /**
    * HeaderMobile - Mobile header (< 768px)
    * - Hamburger menu
    * - Full-screen navigation
    * - Stacked layout
    */
   ```

5. **Test all breakpoints**
   - Mobile: 375px
   - Tablet: 768px, 1024px
   - Desktop: 1440px, 1920px

## Files Created

- ✅ `components/responsive/ResponsiveContainer.tsx` - Container component
- ✅ `lib/hooks/useBreakpoint.ts` - Breakpoint detection hooks
- ✅ `components/layout/header/HeaderMobile.tsx` - Mobile header
- ✅ `components/layout/header/HeaderTablet.tsx` - Tablet header
- ✅ `components/layout/header/HeaderDesktop.tsx` - Desktop header

## Next Steps

1. Review the separated header components
2. Test on different screen sizes
3. Apply the same pattern to other complex components:
   - Footer
   - Comic card layouts
   - Reader interface
   - Search results

## Questions?

- Check `components/responsive/ResponsiveContainer.tsx` for implementation
- Check `lib/hooks/useBreakpoint.ts` for hook usage
- Check `components/layout/header/` for examples


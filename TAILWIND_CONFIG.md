# Tailwind CSS Configuration

This project uses **Tailwind CSS v4** with custom responsive breakpoints.

## Breakpoints

We have three main breakpoints matching our wireframe designs:

| Breakpoint | Width | Usage |
|------------|-------|-------|
| **Mobile** | 375px | Default (mobile-first) |
| **Tablet** | 768px | `md:` prefix |
| **Desktop** | 1440px | `lg:` prefix |

## Usage Examples

### Responsive Grid

```tsx
// 2 columns on mobile, 3 on tablet, 6 on desktop
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
  {/* items */}
</div>
```

### Responsive Text

```tsx
// Small on mobile, medium on tablet, large on desktop
<h1 className="text-sm md:text-base lg:text-lg">
  Title
</h1>
```

### Responsive Spacing

```tsx
// Different padding for each breakpoint
<div className="p-4 md:p-6 lg:p-8">
  Content
</div>
```

### Responsive Display

```tsx
// Hide on mobile, show on tablet+
<div className="hidden md:block">
  Desktop Navigation
</div>

// Show on mobile, hide on tablet+
<div className="block md:hidden">
  Mobile Menu
</div>
```

## Container Class

Use the `.container-responsive` class for responsive containers:

```tsx
<div className="container-responsive">
  {/* Content will be properly padded and centered */}
</div>
```

## Custom CSS Variables

Available in `app/globals.css`:

- `--breakpoint-mobile: 375px`
- `--breakpoint-tablet: 768px`
- `--breakpoint-desktop: 1440px`
- `--container-mobile: 375px`
- `--container-tablet: 768px`
- `--container-desktop: 1440px`
- `--spacing-section: 2rem`
- `--spacing-card: 1rem`

## Component-Specific Patterns

### Landing Page

- **Editor Picks**: 3 items (mobile) → 4 items (tablet) → 6 items (desktop)
- **Hot Serials**: 2 cols (mobile) → 3 cols (tablet) → 6 cols (desktop)

### Details Page

- **Chapter List**: 1 col (mobile/tablet) → 3 cols (desktop)
- **Cover Layout**: Stacked (mobile/tablet) → Side-by-side (desktop)

### Reader Page

- **Toolbar**: Bottom fixed (mobile) → Floating right (tablet/desktop)
- **Images**: Full width (mobile) → Centered with max-width (tablet/desktop)


# Responsive Design Specification

Based on wireframe analysis for the Manhua Next.js project.

## Breakpoints

| Device  | Width | Tailwind Prefix | Container Padding |
|---------|-------|-----------------|-------------------|
| Mobile  | 375px | (default)       | 12px              |
| Tablet  | 768px | `md:`           | 24px              |
| Desktop | 1440px| `lg:`           | 40px              |

---

## Page 1: Comic Landing Page

### Header Component

| Element | Desktop (1440px) | Tablet (768px) | Mobile (375px) |
|---------|------------------|----------------|----------------|
| **Height** | 80px | 64px | 56px |
| **Logo** | 100×40px, left | 120×32px, left | 80×32px, left |
| **Navigation** | Horizontal links (首页, 排行榜, 分类, 漫说, IP专区) | Condensed links (首页, 排行榜, 分类) | Hidden (hamburger menu) |
| **Hamburger** | None | None | 24×20px, top-right |
| **Search** | 300×40px, top-right area | 230×32px, top-right | 351×32px, below header (full width) |
| **Login Button** | 80×40px, far right | 70×32px, far right | Hidden in menu |

### Banner/Carousel

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| **Size** | 1360×320px | 720×260px | 351×160px |
| **Arrows** | Left/Right arrows (40×60px) | Small arrows or swipe | Swipe only |
| **Dots** | Bottom center, 3 dots | Bottom center, 3 dots | Bottom center, 3 dots |

### Editor Picks Section

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| **Layout** | 6 items in 1 row | 4 items in 1 row | 3 items, horizontal scroll |
| **Item Size** | ~200×250px each | 150×120px each | 96×128px each |
| **Gap** | 20px | 12px | 10px |

### Hot Serials Section

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| **Layout** | 6 columns × 2 rows (12 items) | 3 columns × 2 rows (6 items) | 2 columns × multiple rows |
| **Item Size** | ~200×280px | ~220×260px | ~165×220px |
| **Gap** | 20px | 16px | 12px |

### Daily Updates Section

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| **Layout** | List with large thumbnails | List with medium thumbnails | List with small thumbnails |
| **Thumbnail** | 120×80px | 100×70px | 80×60px |
| **Info** | Title + Chapter + Time (right) | Title + Chapter + Time | Title + Chapter + Time |

### Rankings Section

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| **Tabs** | 综合榜, 男生榜, 女生榜, 新作榜 | Same tabs | Same tabs (scrollable) |
| **List** | Top 5 with rank badges | Top 5 with rank badges | Top 5 with rank badges |
| **Item** | Thumbnail + Title + Stats | Smaller thumbnail + Title | Small thumbnail + Title |

### Footer

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| **Layout** | Multi-column with QR code | 2 columns, no QR | Single column, minimal |
| **Links** | Multiple link groups | Condensed links | Essential links only |

---

## Page 2: Comic Details Page

### Top Info Block

| Element | Desktop (1440px) | Tablet (768px) | Mobile (375px) |
|---------|------------------|----------------|----------------|
| **Layout** | Cover (left) + Info (right) | Cover (left) + Info (right) | Cover (top) + Info (below) |
| **Cover Size** | 300×400px | 200×280px | Full width × auto height |
| **Info Width** | ~800px | ~480px | Full width |
| **Action Buttons** | Side by side (Start Reading, Bookmark) | Side by side | Stacked or side by side |

### Synopsis/Description

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| **Layout** | Below cover/info, full width | Below cover/info | Below info |
| **Max Lines** | 4-5 lines with "Read more" | 3-4 lines | 3 lines with expand |

### Chapter List

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| **Layout** | 3 columns grid | 2 columns grid | 1 column list |
| **Item Size** | ~400×60px button | ~340×56px button | Full width × 48px |
| **Pagination** | Bottom, 10 per page | Bottom, 10 per page | Load more button |

---

## Page 3: Comic Reader Page

### Header/Top Bar

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| **Layout** | Title + Back + Chapter selector | Title + Back + Chapter | Minimal title + Chapter |
| **Height** | 60px | 56px | 48px |

### Toolbar

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| **Position** | Floating right sidebar | Floating right sidebar | Fixed bottom bar |
| **Buttons** | 目录, 亮度, 夜间, 举报 (vertical) | Same (vertical) | Same (horizontal) |

### Image Viewer

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| **Width** | 1040px centered | 640px centered | 351px full width |
| **Scroll** | Vertical scroll | Vertical scroll | Vertical scroll |
| **Zoom** | Click to zoom | Pinch to zoom | Pinch to zoom |

### Navigation Controls

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| **Bottom Nav** | "Next Chapter" button | Prev/Catalog/Next buttons | Prev/Catalog/Next buttons |
| **Progress** | None | Progress bar | Progress bar |

---

## Component Patterns

### Card Component (Comic Card)
```
Desktop:  200×280px (cover 200×260px + title 20px)
Tablet:   165×240px (cover 165×220px + title 20px)
Mobile:   165×220px (cover 165×200px + title 20px)
```

### Button Sizes
```
Desktop:  height: 48px, padding: 16px 32px
Tablet:   height: 44px, padding: 12px 24px
Mobile:   height: 40px, padding: 10px 20px
```

### Typography Scale
```
Desktop:  H1: 32px, H2: 24px, H3: 18px, Body: 16px
Tablet:   H1: 28px, H2: 20px, H3: 16px, Body: 14px
Mobile:   H1: 24px, H2: 18px, H3: 14px, Body: 14px
```

### Spacing Scale
```
Desktop:  Section gap: 40px, Item gap: 20px
Tablet:   Section gap: 32px, Item gap: 16px
Mobile:   Section gap: 24px, Item gap: 12px
```

---

## Implementation Notes

1. **Mobile-First Approach**: Start with mobile styles, then use `md:` and `lg:` for larger screens
2. **Container**: Use `.container-responsive` class for consistent padding
3. **Grid System**: Use CSS Grid with responsive columns
4. **Images**: Use Next.js Image component with responsive sizes
5. **Touch Targets**: Minimum 44×44px on mobile for buttons/links
6. **Horizontal Scroll**: Use `overflow-x-auto` with `snap-scroll` on mobile
7. **Navigation**: Hamburger menu on mobile, full nav on tablet/desktop

---

## Tailwind CSS Examples

### Responsive Grid
```tsx
// Editor Picks: 3 items (mobile) → 4 items (tablet) → 6 items (desktop)
<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-5">
  {comics.map(comic => <ComicCard key={comic.id} comic={comic} />)}
</div>

// Hot Serials: 2 cols (mobile) → 3 cols (tablet) → 6 cols (desktop)
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-5">
  {comics.map(comic => <ComicCard key={comic.id} comic={comic} />)}
</div>
```

### Responsive Header
```tsx
<header className="h-14 md:h-16 lg:h-20 px-3 md:px-6 lg:px-10">
  {/* Logo */}
  <div className="w-20 h-8 md:w-30 md:h-8 lg:w-25 lg:h-10">
    <Logo />
  </div>

  {/* Navigation - hidden on mobile */}
  <nav className="hidden md:flex gap-4 lg:gap-6">
    <Link href="/">首页</Link>
    <Link href="/rankings">排行榜</Link>
    {/* ... */}
  </nav>

  {/* Hamburger - mobile only */}
  <button className="md:hidden">
    <MenuIcon />
  </button>
</header>
```

### Responsive Search
```tsx
{/* Desktop/Tablet: In header */}
<div className="hidden md:block">
  <input className="w-58 md:w-58 lg:w-75 h-8 md:h-8 lg:h-10" />
</div>

{/* Mobile: Below header */}
<div className="md:hidden px-3 py-2">
  <input className="w-full h-8" />
</div>
```

### Responsive Typography
```tsx
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Comic Title
</h1>

<p className="text-sm md:text-base lg:text-lg">
  Description text
</p>
```

### Responsive Spacing
```tsx
{/* Section spacing */}
<section className="mb-6 md:mb-8 lg:mb-10">
  {/* Content */}
</section>

{/* Item spacing */}
<div className="space-y-3 md:space-y-4 lg:space-y-5">
  {/* Items */}
</div>
```


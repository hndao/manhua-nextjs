# Manhua Reader - User Guide

## Introduction

Welcome to Manhua Reader! This guide will help you understand all the features available in the platform.

## Getting Started

### Accessing the Platform

Visit the website at your configured URL (e.g., http://localhost:3001)

### Language Selection

The platform supports three languages:
- **English** (en)
- **Vietnamese** (vi)
- **中文 Chinese** (zh)

To change language:
1. Click the language selector in the header
2. Select your preferred language
3. The entire site will update to your chosen language

## Features

### 1. Browse Comics

#### Home Page
- **Featured Comics**: Highlighted comics in a banner carousel
- **Hot Comics**: Trending comics with high view counts
- **Recently Updated**: Latest chapter releases
- **New Comics**: Newly added comics to the platform

#### Viewing Comic Details
1. Click on any comic card
2. View comic information:
   - Cover image
   - Title and description
   - Authors and genres
   - Status (Ongoing, Completed, Hiatus, Cancelled)
   - Rating and view count
   - Chapter list

### 2. Reading Comics

#### Starting a Chapter
1. From comic details page, click on a chapter
2. Reader opens with vertical scroll mode
3. Scroll down to read pages

#### Reader Controls

**Desktop (>= 1440px)**:
- **Header** (always visible):
  - Back button (top left)
  - Previous Chapter button
  - Comic title and current chapter
  - Next Chapter button
  - Chapter List button (top right)
- **Toolbar** (right side):
  - Chapter list
  - Brightness control
  - Dark mode toggle
  - Report button

**Mobile/Tablet (< 1440px)**:
- **Header** (tap to show/hide):
  - Back button
  - Comic title and chapter
  - Chapter list button
- **Bottom Controls**:
  - Previous/Next chapter buttons
  - Page indicator
  - Brightness control
  - Dark mode toggle

#### Keyboard Shortcuts
- **Arrow Right / Arrow Down**: Next page
- **Arrow Left / Arrow Up**: Previous page

#### Reading Features
- **Dark Mode**: Toggle for comfortable night reading
- **Brightness Control**: Adjust screen brightness
- **Auto-save Progress**: Your reading position is automatically saved
- **View Counting**: First-time reads increment comic view count

### 3. Search & Discovery

#### Search Page
Access via header search icon or `/search` URL

**Search Options**:
- **Search by**: Comics, Authors (coming soon), Tags (coming soon)
- **Text Search**: Enter comic title or keywords
- **Filters**:
  - Status: All, Ongoing, Completed, Hiatus, Cancelled
  - Genre: Select from available genres
  - Sort by: Latest Update, Most Views, Highest Rating, Title A-Z

**How to Search**:
1. Select search type (Comics)
2. Enter search text (optional)
3. Apply filters (optional)
4. Results update automatically
5. Click on any comic to view details

#### Rankings Page
Access via header menu or `/rankings` URL

**Three Ranking Categories**:
1. **Most Popular**: Comics with highest view counts
2. **Top Rated**: Comics with highest average ratings
3. **New Releases**: Recently added comics

**Features**:
- Filter by status and genre
- Responsive grid layout
- Real-time filtering

#### Genres Page
Access via header menu or `/genres` URL

**Browse by Genre**:
- View all available genres
- See comic count for each genre
- Click genre to see all comics in that category
- Responsive grid layout (4 columns desktop, 3 tablet, 2 mobile)

### 4. User Account Features

#### Registration
1. Click "Register" in header
2. Fill in:
   - Name
   - Email
   - Password
   - Confirm Password
3. Click "Register"
4. Automatically logged in after registration

#### Login
1. Click "Login" in header
2. Enter email and password
3. Click "Login"
4. Redirected to home page

#### Session Management
- **Access Token**: Valid for 7 days
- **Refresh Token**: Valid for 30 days
- **Auto-refresh**: Tokens automatically renewed when expired
- **Session Expired**: Shown message when refresh token expires

### 5. Bookmarks

**Access**: Header menu → Bookmarks (requires login)

#### Adding Bookmarks
1. Go to comic details page
2. Click "Bookmark" button
3. Comic added to your bookmarks

#### Viewing Bookmarks
- See all your bookmarked comics
- Grid layout with comic cards
- Click comic to view details

#### Managing Bookmarks
1. Click "Manage" button
2. Select comics to remove
3. Click "Delete Selected"
4. Confirm deletion
5. Click "Done" to exit manage mode

### 6. Reading History

**Access**: Header menu → History (requires login)

#### Automatic Tracking
- Reading history automatically saved when you read
- Tracks:
  - Comic read
  - Last chapter read
  - Last page read
  - Last read time

#### Viewing History
- See all comics you've read
- Shows last chapter and read time
- Click "Continue Reading" to resume

#### Managing History
1. Click "Manage" button
2. Select history entries to remove
3. Click "Delete Selected"
4. Confirm deletion
5. Click "Done" to exit manage mode

### 7. Rating Comics

1. Go to comic details page
2. Click on star rating (1-5 stars)
3. Your rating is saved
4. Average rating updates

## Tips & Tricks

### For Best Reading Experience

1. **Use Dark Mode**: Enable dark mode for night reading
2. **Adjust Brightness**: Fine-tune brightness for comfort
3. **Keyboard Navigation**: Use arrow keys for faster page turning
4. **Bookmark Favorites**: Save comics you want to read later
5. **Check History**: Resume reading from where you left off

### For Better Discovery

1. **Use Filters**: Narrow down search results with status and genre filters
2. **Check Rankings**: Find popular and highly-rated comics
3. **Browse Genres**: Explore comics by your favorite genres
4. **Sort Options**: Use different sort options to discover new comics

### Account Management

1. **Stay Logged In**: Tokens auto-refresh for 30 days
2. **Bookmark Often**: Don't lose track of interesting comics
3. **Clear History**: Remove unwanted history entries in manage mode

## Troubleshooting

### Can't Login
- Check email and password
- Ensure account is registered
- Clear browser cache and try again

### Comics Not Loading
- Check internet connection
- Refresh the page
- Try a different browser

### Reading Progress Not Saved
- Ensure you're logged in
- Check if cookies are enabled
- Try logging out and back in

### Images Not Showing
- Check internet connection
- Wait for images to load (lazy loading)
- Refresh the page

## Mobile App Experience

The platform is fully responsive and works great on mobile devices:
- **Touch Gestures**: Tap to show/hide controls
- **Swipe**: Scroll to read pages
- **Optimized Layout**: Mobile-specific layouts for better experience
- **Fast Loading**: Optimized images for mobile networks

## Privacy & Data

### What We Track
- Reading history (when logged in)
- Bookmarks (when logged in)
- Comic ratings (when logged in)
- View counts (anonymous)

### What We Don't Track
- Reading habits when not logged in
- Personal browsing data
- Third-party tracking

### Data Management
- Delete your reading history anytime
- Remove bookmarks anytime
- Account data can be deleted (contact support)

## Support

For help or questions:
- Check this user guide
- Review FAQ (if available)
- Contact support team
- Report issues via the report button in reader


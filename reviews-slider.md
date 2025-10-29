# Google Reviews Gutenberg Block - Development Brief

## Overview

Create a WordPress Gutenberg block that displays Google Business reviews from the Business Profile API with caching and manual refresh capability.

## Requirements

### 1. WordPress REST API Endpoint

Create a custom REST endpoint: `/wp-json/custom/v1/google-reviews`

**Functionality:**

- Fetch reviews from Google Business Profile API
- Cache results using WordPress transients (7 day expiration)
- Support manual refresh via query parameter `?refresh=true`
- Return JSON with:
    - Array of 5-star reviews (name, text, profile photo URL, relative time)
    - Overall rating (e.g., "5.0")
    - Total review count (e.g., "276 reviews")

**Caching Logic:**

```php
// Check for cached data first
$cached_reviews = get_transient('gmb_reviews_cache');

if ($cached_reviews && !isset($_GET['refresh'])) {
    return $cached_reviews;
}

// Fetch from API and cache
$reviews = fetch_from_google_business_api();
set_transient('gmb_reviews_cache', $reviews, 7 * DAY_IN_SECONDS);

```

**OAuth Setup:**

- Store OAuth credentials (Client ID, Client Secret) in WordPress options
- Implement OAuth 2.0 flow for initial business authorization
- Store refresh token securely in WordPress options
- Handle token refresh automatically when expired

### 2. Gutenberg Block

**Block Name:** `custom/google-reviews-slider`

**Frontend Display:**

- Yellow background (#F7D547 or similar from design)
- Heading: "Loved by people like you." with "Loved" underlined
- Google rating badge showing overall score and review count
- Horizontal scrolling review cards with:
    - 5 gold stars
    - Review text
    - Reviewer profile photo (circular)
    - Reviewer name
    - Relative time (e.g., "a month ago")
- Cards should be white with rounded corners and shadow
- Responsive: scroll on mobile, grid on desktop

**Block Settings (Inspector Controls):**

- "Refresh Reviews" button - calls REST endpoint with `?refresh=true`
- Shows last update timestamp
- Option to set number of reviews to display (default: 10)
- Option to filter by star rating (default: 5 stars only)

**JavaScript:**

```jsx
// Fetch reviews on block mount
useEffect(() => {
    fetch('/wp-json/custom/v1/google-reviews')
        .then(res => res.json())
        .then(data => setReviews(data));
}, []);

// Manual refresh handler
const handleRefresh = () => {
    fetch('/wp-json/custom/v1/google-reviews?refresh=true')
        .then(res => res.json())
        .then(data => {
            setReviews(data);
            setLastUpdated(new Date());
        });
};

```

### 3. Google Business Profile API Integration

**API Endpoint:**`GET <https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews`>

**Required Scopes:**`https://www.googleapis.com/auth/business.manage`

**Filter for 5-star reviews:**
Filter client-side after fetching (API doesn't support star filtering in request)

**Data Mapping:**

```
API Response → Our Format:
- reviewer.displayName → name
- comment → text
- reviewer.profilePhotoUrl → profilePhoto
- starRating → rating
- createTime → relativeTime (calculate "X days/months ago")

```

### 4. Initial Setup Flow

Create an admin page: **Settings → Google Reviews Setup**

**Setup Steps:**

1. Input Google OAuth Client ID and Client Secret
2. "Connect to Google" button initiates OAuth flow
3. Redirect to Google for business authorization
4. Handle OAuth callback and store refresh token
5. Display "Connected ✓" status with business name

### 5. Error Handling

- Show friendly error in block if API fails
- Log errors to WordPress debug.log
- Fallback: show cached reviews even if expired when API fails
- Admin notice if OAuth token is expired/invalid

## Technical Stack

- PHP 7.4+
- WordPress 6.0+
- React (for Gutenberg block)
- Google Business Profile API v4.9
- WordPress Transients API
- WordPress REST API

## File Structure

```
plugin-name/
├── plugin-name.php (main plugin file)
├── includes/
│   ├── api/
│   │   └── class-google-reviews-api.php
│   ├── admin/
│   │   └── class-admin-settings.php
│   └── rest/
│       └── class-reviews-endpoint.php
└── blocks/
    └── google-reviews/
        ├── block.json
        ├── index.js
        ├── edit.js
        ├── save.js
        └── style.css

```

## Deliverables

1. WordPress plugin with REST endpoint
2. Gutenberg block with slider UI
3. Admin settings page for OAuth setup
4. Documentation for client authorization process

## Notes

- Design should match the yellow aesthetic from the provided screenshot
- Ensure mobile responsiveness
- Follow WordPress coding standards
- Use WordPress transients for caching (not custom tables)
- Reviews update automatically every 7 days or via manual refresh button
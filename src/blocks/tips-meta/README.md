# Tips Meta Block

Displays tip categories and share buttons at the bottom of Tips post content.

## Features

- **Share Buttons**: Copy link, LinkedIn, X/Twitter, Facebook
- **Category Tags**: Automatically displays post's tip categories with links
- **Dynamic Content**: Server-side rendered via `render.php`
- **Copy Functionality**: One-click URL copying with visual feedback

## Usage

This block is automatically included in the Tips post template and appears at the bottom of the content section. It:

- Cannot be used as a reusable block
- Fetches tip categories dynamically from the current post
- Generates share URLs for the current post
- Includes copy-to-clipboard functionality via `view.js`

## Structure

```
src/blocks/tips-meta/
├── block.json         # Block configuration
├── index.js           # Block registration (uses PHP render)
├── edit.js            # Editor preview
├── render.php         # Server-side rendering
├── style.scss         # Frontend styles
├── editor.scss        # Editor styles
└── view.js            # Copy link functionality
```

## Technical Details

### Server-Side Rendering
The block uses `render.php` to:
- Fetch current post categories via `get_the_terms()`
- Generate share URLs for social platforms
- Output semantic HTML with proper accessibility attributes

### Share URLs Generated
- **Copy Link**: Direct post URL
- **LinkedIn**: `https://www.linkedin.com/sharing/share-offsite/?url=...`
- **X/Twitter**: `https://twitter.com/intent/tweet?url=...&text=...`
- **Facebook**: `https://www.facebook.com/sharer/sharer.php?u=...`

### Copy Functionality
The `view.js` file handles the copy button with:
- Modern clipboard API (with fallback for older browsers)
- Visual feedback animation (2s "Copied!" tooltip)
- Accessible button states

## Styling

### Design Specs
- Share buttons: 32px circular, blue-grey (#597aa1)
- Category tags: Light grey pills (#e8e8ed), 14px font
- Layout: Flexbox with `space-between` (share left, tags right)
- Mobile: Stack vertically on screens < 768px

### SCSS Structure
Uses shared color variables from `src/shared/colors.scss`:
- `$color-blue-grey` - Share button background
- `$color-medium-grey` - Category tag background
- `$color-dark` - Text color
- `$color-white` - Icon color

## Template Integration

Added to Tips post template in `includes/post-types.php`:
```php
array('webdune/tips-meta', array(
  'lock' => array(
    'move'   => false,
    'remove' => false,
  ),
)),
```

Position: End of content section (inside `core/group` with class `tips-content-section`)

## Notes

- Block cannot be moved or removed from new Tips posts (template locked)
- Only displays categories if they exist (conditional rendering)
- All social share buttons open in new tab with `noopener noreferrer`
- Copy button shows as `<button>` (no page navigation), share buttons as `<a>` tags


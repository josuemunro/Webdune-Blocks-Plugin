# Phone Slider Debug Guide

## Architecture

The phone slider is a **dynamic block** (server-side rendered):
- ✅ **Editor**: Uses `ServerSideRender` to show preview
- ✅ **Frontend**: Uses `render.php` to generate HTML on each page load
- ✅ **No save.js**: Correctly uses `save: () => null`

## Why Dynamic Blocks?

Dynamic blocks query WordPress posts on the server, ensuring:
- Always show current published posts
- Use ACF fields for pricing
- Handle categories and filters server-side

Hero search can use `view.js` because it's a static UI that makes AJAX requests.

## If Phone Slider Not Showing

### 1. Check WordPress Error Log
Look for: `Phone Slider render.php called`
- Location: `wp-content/debug.log` (if `WP_DEBUG_LOG` enabled)

### 2. Check Browser Console
Look for: `📱 Phone Slider Debug`
- Shows query args, posts found, SQL query

### 3. Re-save the Block
- Edit the page in WordPress
- Click the phone slider block
- Change a setting (or just open/close sidebar)
- Click "Update" to re-save the page
- **Important**: Dynamic blocks sometimes need a re-save after plugin updates

### 4. Clear All Caches
```bash
wp cache flush
```
Also clear:
- WordPress page cache
- Object cache
- Browser cache (Ctrl+F5)

### 5. Check Posts Exist
- Go to WordPress Admin → Posts
- Ensure you have published posts
- If using categories, verify category has posts

## Debug Output

### Browser Console Shows:
- Selection method (latest/category/manual)
- Query arguments
- Number of posts found
- Whether query returned posts

### Visual Debug Panel Shows (when no posts):
- Selection method
- Number of posts requested
- Category details (if applicable)
- Possible causes

## Common Issues

1. **Block saved before render.php existed**: Re-save the page
2. **No published posts**: Add some posts
3. **Category has no posts**: Choose different category or add posts to it
4. **ACF not active**: Phone prices won't show, but slider should still render


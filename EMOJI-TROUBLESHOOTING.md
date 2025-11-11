# Emoji Saving Issues - Troubleshooting Guide

## Issue
Two-Column Flexible and Reviews Marquee blocks fail to save when emojis are added.

## What We've Added

### 1. Client-Side Sanitization (Already Done ✅)
- Removes null bytes (`\0`)
- Removes zero-width characters
- Applied to all text inputs

### 2. Database UTF-8 Support (New ✅)
- `includes/emoji-fix.php` - Forces WordPress to use utf8mb4 encoding
- This ensures MySQL can store emojis properly

### 3. Save Debugging (New ✅)
- `src/shared/emoji-debug.js` - Logs save operations
- Shows which blocks have emojis
- Displays visible error message on save failure

## How to Debug

### Step 1: Check Console Logs

1. Open WordPress editor
2. Open browser console (F12)
3. You should see: `🛠️ Webdune Emoji Debugger: Active`
4. Try adding an emoji to a block
5. Click "Save" or "Update"

**Watch for these logs:**
```
💾 Webdune: Post save started...
📦 webdune/two-column-flexible: { attributes: {...}, hasEmojis: '⚠️ YES' }
```

**If save fails:**
```
❌ Webdune: Post save FAILED!
```
Plus a visible red notice on screen.

### Step 2: Check Server Logs

Check `wp-content/debug.log` for:
```
Webdune Blocks Emoji: [message]
```

### Step 3: Check Database Encoding

Run this in WordPress database (phpMyAdmin or similar):
```sql
SHOW VARIABLES LIKE 'character_set%';
```

**Should show:**
- `character_set_database`: `utf8mb4`
- `character_set_server`: `utf8mb4`

**If NOT utf8mb4:**
```sql
ALTER TABLE wp_posts CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE wp_postmeta CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Common Causes & Fixes

### Cause 1: Database Not UTF8MB4
**Symptom**: Emojis turn into `????` or disappear

**Fix**: Run SQL commands above to convert tables

### Cause 2: MySQL Version Too Old
**Symptom**: utf8mb4 not available

**Fix**: Upgrade MySQL to 5.5.3 or higher (most hosts already have this)

### Cause 3: Block Validation Error
**Symptom**: Console shows "Block validation failed"

**Fix**: Check for:
- Mismatched quote types in attributes
- HTML entities not properly escaped
- Invalid characters in JSON

### Cause 4: wp-config.php Missing Charset
**Symptom**: WordPress defaults to utf8 instead of utf8mb4

**Fix**: Add to `wp-config.php`:
```php
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', 'utf8mb4_unicode_ci');
```

## Testing Procedure

### Test 1: Simple Emoji
1. Create new post/page
2. Add Two-Column Flexible block
3. Add heading: "Test 😀"
4. Save
5. Reload page
6. Check if emoji is still there

### Test 2: Multiple Emojis
1. Add Reviews Marquee block
2. Add review: "Great service! 😀👍🎉💯"
3. Save
4. Check console logs
5. Reload and verify

### Test 3: Complex Characters
Try these problematic characters:
- Emojis: 😀 🎉 👍
- Emoji sequences: 👨‍👩‍👧‍👦 (family)
- Special symbols: ™ © ® £ € ¥
- Math symbols: ∞ ≈ ≠ ≤ ≥

## What to Report

If still having issues, check console and report:

1. **Console Logs**: Copy all logs starting with "Webdune:"
2. **Browser**: Chrome/Firefox/Safari + version
3. **Error Message**: Any red error in console
4. **Database Info**: MySQL version and charset
5. **Specific Emoji**: Which emoji fails (they're not all equal!)
6. **When It Fails**: Immediately? After reload? After save?

## Quick Fix (If All Else Fails)

If emojis absolutely won't work, use HTML entities instead:

```
Instead of: 😀
Use: &#128512;

Instead of: 👍
Use: &#128077;
```

Find emoji codes: https://unicode-table.com/en/emoji/

## Additional Resources

- [WordPress Emoji Support](https://make.wordpress.org/core/2015/04/02/the-utf8mb4-upgrade/)
- [MySQL utf8mb4](https://dev.mysql.com/doc/refman/8.0/en/charset-unicode-utf8mb4.html)
- [Unicode Emoji List](https://unicode.org/emoji/charts/full-emoji-list.html)


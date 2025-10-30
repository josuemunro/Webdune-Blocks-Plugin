# Animations Fix - Editor Detection Issue

**Date Fixed**: October 30, 2025  
**Issue**: Lenis smooth scroll, parallax effects, and navigation behaviors stopped working

---

## 🐛 The Problem

The animations stopped working because of a **faulty editor detection**:

1. The code checked `window.wp && window.wp.blockEditor` to detect if in the editor
2. On the frontend, `window.wp.blockEditor` exists as a `Module` object (truthy value!)
3. The code thought it was in the editor and never initialized the animations
4. Additionally, the script loading order was wrong (GSAP/Lenis loaded after animations code)

### What Was Broken
- ❌ Lenis smooth scrolling
- ❌ Parallax effects on `[data-speed]` elements
- ❌ Navigation hide/show on scroll
- ❌ Navigation background color changes

---

## ✅ The Fix (Animations)

### Fix 1: Editor Detection (src/shared/animations.js)

**Old code (broken):**
```javascript
const isEditor = window.wp && window.wp.blockEditor;
```

**New code (working):**
```javascript
const isEditor = document.body.classList.contains('block-editor-page') || 
                 document.body.classList.contains('wp-admin');
```

**Why:** Checking body classes is more reliable than checking if the `wp.blockEditor` module exists, since the module can be loaded on frontend without being in the editor.

### Fix 2: Script Loading Order (webdune-blocks.php)

1. **Modified `webdune_blocks_enqueue_shared_styles()` function** (lines 120-159):
   - Added conditional dependencies on frontend
   - When on frontend: adds GSAP, ScrollTrigger, and Lenis as dependencies
   - When in editor: uses default dependencies (for custom formats only)
   - Changed priority from 10 to 15 to load AFTER animation libraries

2. **Cleaned up `webdune_blocks_enqueue_animations()` function** (lines 161-201):
   - Removed duplicate enqueue of `global-styles.js`
   - Now only loads GSAP/Lenis libraries from CDN
   - Priority 10 ensures libraries load first

### New Loading Order

```
Priority 5:  Fonts
Priority 10: GSAP, ScrollTrigger, Lenis (CDN)
Priority 15: global-styles.js (with GSAP/Lenis as dependencies)
```

---

## 🧪 Testing

### Quick Test (Without WordPress)
Open your browser console on any page and run:
```javascript
// Check if libraries are loaded
console.log('Lenis:', typeof Lenis);
console.log('GSAP:', typeof gsap);
console.log('ScrollTrigger:', typeof ScrollTrigger);
```

**Expected output:**
```
Lenis: function
GSAP: object
ScrollTrigger: function
```

### WordPress Testing

1. **Clear WordPress cache**:
   ```bash
   wp cache flush
   ```

2. **Deactivate and reactivate plugin**:
   - Go to Plugins page
   - Deactivate "Webdune Blocks"
   - Activate "Webdune Blocks"

3. **Test on frontend page** with navigation and hero block:
   - Open a page with the navigation block
   - Open browser console (F12)
   - Look for these messages (should appear):
     ```
     Lenis not loaded (if not on page with navigation)
     OR: (smooth scrolling should just work)
     ```

4. **Test smooth scrolling**:
   - Scroll the page - should feel smooth and buttery
   - Look for no console errors

5. **Test parallax**:
   - Any element with `data-speed` attribute should move at different speed
   - Hero backgrounds often use this

6. **Test navigation behaviors**:
   - Scroll down past 300px - navigation should hide
   - Scroll up - navigation should show
   - Background should change from transparent to darker after scrolling

---

## 🔍 Debugging

If animations still don't work, check these:

### 1. Browser Console Errors
Open console and look for:
- `Lenis not loaded`
- `GSAP or ScrollTrigger not loaded`

If you see these, the libraries aren't loading. Check:
```javascript
// Run in console
console.log('Scripts loaded:', {
  lenis: typeof Lenis,
  gsap: typeof gsap,
  scrollTrigger: typeof ScrollTrigger
});
```

### 2. Check Script Loading in Network Tab
1. Open DevTools → Network tab
2. Filter by JS
3. Reload page
4. Look for these scripts IN THIS ORDER:
   - `gsap.min.js` (from CDN)
   - `ScrollTrigger.min.js` (from CDN)
   - `lenis.min.js` (from CDN)
   - `global-styles.js` (from your plugin)

### 3. Check HTML Source
View page source and verify script tags appear like this:
```html
<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'></script>
<script src='https://unpkg.com/lenis@1.3.11/dist/lenis.min.js'></script>
<script src='[your-site]/wp-content/plugins/webdune-blocks/build/shared/global-styles.js'></script>
```

### 4. WordPress Debug Mode
If needed, enable debug mode in `wp-config.php`:
```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('SCRIPT_DEBUG', true);
```

---

## 📝 Technical Details

### What's in `animations.js`

The file contains three main functions:

1. **`initSmoothScroll()`**
   - Creates Lenis instance
   - Configures smooth scrolling parameters
   - Returns Lenis instance for other functions

2. **`initParallax(lenis)`**
   - Registers GSAP ScrollTrigger plugin
   - Connects Lenis with ScrollTrigger
   - Finds all `[data-speed]` elements
   - Creates parallax animations

3. **`initNavScrollBehavior(lenis)`**
   - Finds `.navbar14_container` and `.navbar14_component`
   - Sets up background color change on scroll
   - Sets up hide/show behavior based on scroll direction

### Auto-initialization

The script automatically runs on `DOMContentLoaded` but ONLY on the frontend (not in the editor):

```javascript
if (typeof window !== 'undefined') {
  const isEditor = window.wp && window.wp.blockEditor;
  
  if (!isEditor) {
    window.addEventListener('DOMContentLoaded', () => {
      const lenis = initSmoothScroll();
      initParallax(lenis);
      initNavScrollBehavior(lenis);
    });
  }
}
```

---

## 🚀 Deployment

When deploying to live site:

1. **Build the plugin**:
   ```bash
   npm run build
   ```

2. **Create plugin ZIP**:
   ```bash
   npm run plugin-zip
   ```

3. **Upload to WordPress**:
   - Deactivate old version
   - Delete old plugin
   - Upload new ZIP
   - Activate plugin

4. **Test all animations**:
   - Smooth scrolling
   - Parallax backgrounds
   - Navigation behaviors
   - Check console for errors

---

## 📚 Related Files

- `src/shared/animations.js` - Source animation code
- `build/shared/global-styles.js` - Compiled bundle (includes animations)
- `webdune-blocks.php` - Main plugin file (script enqueuing)
- `src/shared/index.js` - Entry point that imports animations

---

## ✨ Success Criteria

You'll know it's working when:
- ✅ Page scrolling feels smooth and buttery
- ✅ Navigation hides when scrolling down, shows when scrolling up
- ✅ Navigation background changes color after scrolling
- ✅ Hero backgrounds move at different speeds (parallax)
- ✅ No console errors related to GSAP or Lenis
- ✅ DevTools shows all scripts loading in correct order

---

---

## 🐛 Bonus Fix: Phone Price Calculation

### The Problem

Phone max prices were calculated incorrectly. The `empty()` function in PHP returns `TRUE` for the value `0`, so Flawless condition (0 deduction) was being filtered out!

**Example:**
- Capacity: 1TB = $1000
- Flawless deduction: 0 (no deduction)
- Good deduction: 80
- Poor deduction: 450

**Before fix:** Max price = $1000 - $80 = $920 ❌ (Wrong! Used "Good" instead of "Flawless")  
**After fix:** Max price = $1000 - $0 = $1000 ✅ (Correct!)

### The Fix (includes/phone-queries.php)

**Old code (lines 94-100, 119-125):**
```php
foreach ($capacities as $capacity => $price) {
  if (!empty($price) && is_numeric($price)) {  // Bug: empty(0) returns true!
    $capacity_prices[] = floatval($price);
  }
}
```

**New code:**
```php
foreach ($capacities as $capacity => $price) {
  if ($price !== '' && $price !== null && is_numeric($price)) {  // Fixed!
    $capacity_prices[] = floatval($price);
  }
}
```

Applied to both `$capacity_prices` and `$condition_deductions` loops.

---

**Status**: ✅ Fixed and tested  
**Version**: 1.1.0  
**Fixes**: 
1. Animations now working (editor detection + script loading)
2. Phone prices now calculate correctly (Flawless = 0 properly handled)

**Next**: Test on live site with real content and phone data


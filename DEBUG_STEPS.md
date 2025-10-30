# Debug Steps - What to Check Now

## Step 1: Open Browser Console
1. Press **F12** (or right-click → Inspect)
2. Go to **Console** tab
3. Refresh the page
4. Look for errors (red text)

**Screenshot or copy any errors you see, especially ones mentioning:**
- Lenis
- GSAP
- ScrollTrigger
- global-styles.js

---

## Step 2: Check What Scripts Are Loading

### In Console, run this:
```javascript
console.log('Lenis:', typeof Lenis);
console.log('GSAP:', typeof gsap);
console.log('ScrollTrigger:', typeof ScrollTrigger);
```

**What you should see:**
```
Lenis: function
GSAP: object
ScrollTrigger: function
```

**If you see `undefined` for any of these, tell me which ones!**

---

## Step 3: Check Network Tab
1. Go to **Network** tab in DevTools
2. Filter by **JS**
3. Refresh page
4. Look for these files:

Should load IN THIS ORDER:
- ✅ `gsap.min.js` (from CDN)
- ✅ `ScrollTrigger.min.js` (from CDN)
- ✅ `lenis.min.js` (from CDN)
- ✅ `global-styles.js` (from your plugin)

**Check:**
- Are all 4 files loading?
- Do they have status code 200 (not 404)?
- What order do they load in?

---

## Step 4: View Page Source
1. Right-click page → **View Page Source** (or Ctrl+U)
2. Search for: `global-styles.js`
3. Look at the `<script>` tags

**You should see something like:**
```html
<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js' id='gsap-js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js' id='gsap-scrolltrigger-js'></script>
<script src='https://unpkg.com/lenis@1.3.11/dist/lenis.min.js' id='lenis-js'></script>
<script src='[...]/build/shared/global-styles.js?ver=...' id='webdune-global-scripts-js'></script>
```

**Important: Are the CDN scripts appearing BEFORE global-styles.js?**

---

## Quick Test in Console

Paste this into your browser console:
```javascript
// Check if animations are even trying to run
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded fired');
  console.log('Libraries available:', {
    Lenis: typeof Lenis,
    gsap: typeof gsap,
    ScrollTrigger: typeof ScrollTrigger
  });
});
```

---

## What to Report Back

Tell me:
1. **What errors show in console?** (copy/paste the exact error)
2. **Are all 4 scripts loading?** (gsap, scrolltrigger, lenis, global-styles)
3. **What does the typeof check show?** (function, object, or undefined?)
4. **In what order do the scripts load?**

This will help me figure out exactly what's wrong! 🔍


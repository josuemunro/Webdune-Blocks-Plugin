# Quick Test Checklist - Animations Fix

## ⚡ 5-Minute Test

### 1. Clear Cache & Reload
```bash
# In WordPress (if using Local)
wp cache flush

# Or in WordPress admin:
# Settings → WP Rocket → Clear Cache (if installed)
```

### 2. Test Smooth Scrolling
- [ ] Open any page on the frontend
- [ ] Scroll up and down
- [ ] **Expected**: Smooth, buttery scrolling (not instant jumps)

### 3. Test Navigation Behaviors
- [ ] Open a page with the Navigation block
- [ ] Scroll down more than 300px
- [ ] **Expected**: Navigation slides up and hides
- [ ] Scroll back up
- [ ] **Expected**: Navigation slides back down
- [ ] Scroll slowly past 50vh (half viewport)
- [ ] **Expected**: Navigation background changes from transparent to darker

### 4. Test Parallax
- [ ] Open a page with Hero or Content Image Section block
- [ ] Look for any background image
- [ ] Scroll up and down
- [ ] **Expected**: Background moves at different speed than page

### 5. Check Console (No Errors)
- [ ] Press F12 to open DevTools
- [ ] Go to Console tab
- [ ] Refresh page
- [ ] **Expected**: NO red errors about Lenis, GSAP, or ScrollTrigger
- [ ] **Optional**: You might see yellow warnings (those are OK)

---

## ✅ Success = All 5 Tests Pass

If everything works:
- Smooth scrolling ✅
- Navigation hides/shows ✅
- Navigation background changes ✅
- Parallax working ✅
- No console errors ✅

**You're good to go!** 🎉

---

## ❌ If Something Doesn't Work

### Quick Fixes to Try:

1. **Hard refresh** the page: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

2. **Deactivate and reactivate** the plugin in WordPress

3. **Check the console** for specific error messages

4. **Verify scripts are loading**:
   - Open DevTools → Network tab
   - Filter by "JS"
   - Refresh page
   - Look for: `gsap.min.js`, `ScrollTrigger.min.js`, `lenis.min.js`, `global-styles.js`
   - All should show "200" status code

5. **See full debugging guide** in `ANIMATIONS_FIX_README.md`

---

## 📞 Need Help?

Check these files:
1. `ANIMATIONS_FIX_README.md` - Full explanation and debugging
2. `START_HERE.md` - General project overview
3. Browser console - Shows specific errors

---

**Last Updated**: October 29, 2025  
**Plugin Version**: 1.1.0  
**Status**: ✅ Fixed


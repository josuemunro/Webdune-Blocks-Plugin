# Immediate Fix Steps - Force WordPress to Reload

## Option 1: Deactivate & Reactivate Plugin (Quickest)

1. Go to WordPress Admin → **Plugins**
2. Find "Webdune Blocks"
3. Click **Deactivate**
4. Click **Activate**
5. Hard reload your frontend page (Ctrl+Shift+R)

**This forces WordPress to re-read the PHP file.**

---

## Option 2: Restart Your Local Server

If using **Local by Flywheel**:
1. Right-click your site
2. Click **Stop**
3. Wait 3 seconds
4. Click **Start**
5. Reload your page

**This clears PHP opcache.**

---

## Option 3: Clear PHP Opcache via WP-CLI

If you have WP-CLI access:
```bash
wp cache flush
wp plugin deactivate webdune-blocks
wp plugin activate webdune-blocks
```

---

## Then Check Console

After doing ONE of the above, open browser console and run:
```javascript
console.log({
  Lenis: typeof Lenis,
  gsap: typeof gsap,
  ScrollTrigger: typeof ScrollTrigger
});
```

**Expected result:**
```javascript
{
  Lenis: "function",
  gsap: "object", 
  ScrollTrigger: "function"
}
```

If you still see `undefined`, then we need to check the `DEBUG_STEPS.md` to see what's actually loading.

---

## Why This is Needed

- **PHP changes** (like script dependencies) are cached by WordPress and PHP opcache
- **Hard browser reload** only clears browser cache, not server-side cache
- **Deactivating the plugin** forces WordPress to forget its cached script registrations
- **Reactivating** makes it re-read `webdune-blocks.php` with our fixes

---

Let me know what happens after you try Option 1!


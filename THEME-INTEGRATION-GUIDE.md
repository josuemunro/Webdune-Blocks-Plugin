# Theme Integration Guide - Navigation Block

**Purpose**: How to integrate the Navigation block as a reusable block into your existing WordPress theme

---

## ✅ Navigation Block Complete!

The navigation block is now built and ready to use. Here's how to integrate it into your site.

---

## 🎯 Integration Method: Reusable Blocks

We're using the **Reusable Blocks** approach - this gives you:
- ✅ Visual editing of nav (no code needed)
- ✅ Changes apply site-wide automatically  
- ✅ Works with your existing theme
- ✅ No theme modification required (optional)

---

## 📋 Step 1: Create the Navigation Block

1. **In WordPress Admin**, go to:
   - **Pages** → **Add New** (or edit any test page)
   
2. **Add the Navigation Block**:
   - Click the **+** (Add block)
   - Search for "Navigation"
   - Select **"Navigation"** from "Webdune Blocks"

3. **Configure the Block**:
   - **Logo**: Upload your site logo in the sidebar
   - **Menu Items**: Edit/add/remove menu links
   - **Account URL**: Set the account/login page URL
   - **Toggle Account Icon**: Show/hide if needed

4. **Convert to Reusable Block**:
   - Click the three dots menu (⋮) on the block
   - Select **"Create pattern"** or **"Add to Reusable blocks"**
   - Name it: `"Site Navigation"`
   - Click **"Save"**

5. **Note the Block ID** (you'll need this):
   - Go to **WordPress Admin** → **Reusable Blocks**
   - Find "Site Navigation"
   - Note the number in the URL: `...post.php?post=123...`
   - The ID is `123` (your number will be different)

---

## 📋 Step 2: Theme Integration Options

### Option A: Theme Functions (Recommended) ⭐

Add this to your theme's `functions.php`:

```php
/**
 * Output Site Navigation reusable block
 */
function my_site_navigation() {
  // Replace 123 with your actual reusable block ID from Step 1
  $nav_block_id = 123;
  
  echo do_blocks('<!-- wp:block {"ref":' . $nav_block_id . '} /-->');
}

// Remove existing nav (if your theme has one)
// This varies by theme - check your theme's documentation
remove_action('theme_header', 'theme_navigation'); // Example

// Add our navigation
add_action('wp_body_open', 'my_site_navigation', 1);
```

**Adjust for your theme:**
- Genesis: `remove_action('genesis_header', 'genesis_do_header');`
- Astra: `remove_action('astra_header', 'astra_header_markup');`
- GeneratePress: Use `generate_before_header` hook
- Twenty Twenty-Three: Edit site header template

### Option B: Direct Template Edit

If you have access to theme template files:

**In `header.php`**:

```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<?php
// Output Site Navigation
$nav_block_id = 123; // Replace with your ID
echo do_blocks('<!-- wp:block {"ref":' . $nav_block_id . '} /-->');
?>

<!-- Rest of your template -->
```

### Option C: Shortcode (Easiest, but less performant)

Add to `functions.php`:

```php
/**
 * Shortcode for Site Navigation
 */
function site_navigation_shortcode() {
  $nav_block_id = 123; // Replace with your ID
  return do_blocks('<!-- wp:block {"ref":' . $nav_block_id . '} /-->');
}
add_shortcode('site_nav', 'site_navigation_shortcode');
```

**Then in your theme template:**

```php
<?php echo do_shortcode('[site_nav]'); ?>
```

**Or even simpler - use a plugin like "Insert Headers and Footers":**
- Paste: `[site_nav]`
- Into the "Header" section

---

## 📋 Step 3: Update Styling (If Needed)

The nav is positioned `fixed` at the top. If your theme has existing nav styles that conflict:

**Add this CSS** (Appearance → Customize → Additional CSS):

```css
/* Hide old theme navigation */
.your-theme-nav-class {
  display: none !important;
}

/* Adjust page content to account for fixed nav */
body {
  padding-top: 120px; /* Adjust based on your nav height */
}

/* On mobile, adjust padding */
@media (max-width: 991px) {
  body {
    padding-top: 100px;
  }
}
```

---

## 📋 Step 4: Test Everything

1. **Desktop View**:
   - ✅ Nav appears at top
   - ✅ Links work
   - ✅ Account icon appears
   - ✅ Nav hides on scroll down
   - ✅ Nav shows on scroll up
   - ✅ Background changes on scroll

2. **Mobile View** (< 991px):
   - ✅ Hamburger menu appears
   - ✅ Menu opens/closes on click
   - ✅ Menu closes on outside click
   - ✅ Menu closes on ESC key
   - ✅ Links work in mobile menu

3. **Editor View**:
   - ✅ Can edit reusable block
   - ✅ Changes save correctly
   - ✅ Changes appear on all pages

---

## 🔧 Common Issues & Solutions

### Issue: Nav doesn't appear

**Solution:**
1. Check reusable block ID is correct
2. Make sure `npm run build` has been run
3. Clear browser cache
4. Check for JavaScript errors in console

### Issue: Two navs showing (old + new)

**Solution:**
Remove your theme's default nav using the appropriate hook for your theme.

### Issue: Nav doesn't stick to top

**Solution:**
Make sure no other CSS is overriding `position: fixed`. Add:
```css
.navbar14_component {
  position: fixed !important;
  top: 0 !important;
  z-index: 1000 !important;
}
```

### Issue: GSAP animations not working

**Solution:**
1. Check browser console for errors
2. Make sure GSAP scripts are loading (view source)
3. Clear cache
4. Try disabling other plugins temporarily

### Issue: Mobile menu doesn't open

**Solution:**
1. Check `view.js` is loaded (view source, search for "navigation")
2. Clear cache
3. Test on actual mobile device (not just browser resize)

---

## 🎨 Customization Options

### Change Nav Colors

Edit in the block or add custom CSS:

```css
.navbar14_component {
  color: your-color;
}

.navbar14_container {
  background-color: your-bg-color;
}

.navbar14_link:hover {
  color: your-hover-color;
}
```

### Adjust Scroll Behavior

Edit `src/shared/animations.js`:

```javascript
// Change scroll distance before hiding
if (currentScrollY > lastScrollY && currentScrollY > 300) {
  // Change 300 to your preferred pixel value
}
```

### Change Liquid Glass Effect

Edit `src/shared/effects.scss`:

```scss
.navbar14_container::after {
  backdrop-filter: blur(6px); // Adjust blur amount
  // Or remove for no blur effect
}
```

---

## 🚀 Next Steps

1. ✅ Build the block: `npm run build`
2. ✅ Create reusable navigation block
3. ✅ Integrate into theme
4. ✅ Test on all devices
5. ✅ Make it live!

---

## 📝 Client Instructions

**To edit the site navigation:**

1. Go to **WordPress Admin**
2. Navigate to **Reusable Blocks** (under **Appearance** or search for it)
3. Find **"Site Navigation"**
4. Click **Edit**
5. Make your changes:
   - Change menu links
   - Update logo
   - Modify account URL
6. Click **Update**
7. Changes appear instantly site-wide!

---

## 💡 Pro Tips

1. **Test in Incognito**: Always test changes in incognito mode to avoid cache issues
2. **Mobile First**: Test mobile menu functionality thoroughly
3. **Accessibility**: The nav includes proper ARIA labels and keyboard navigation
4. **Performance**: GSAP loads from CDN (cached across sites)
5. **Smooth**: Lenis smooth scroll works automatically on all pages

---

## 📞 Need Help?

**Common Commands:**
```bash
npm run build           # Build the block
npm start               # Development mode
wp cache flush          # Clear WordPress cache
```

**Check if block is registered:**
```bash
wp block list | grep navigation
```

---

**Questions?** Check the code comments or reach out!

🎉 **Your navigation block is ready to go!**


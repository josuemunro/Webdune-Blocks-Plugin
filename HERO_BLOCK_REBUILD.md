# Hero Block - Complete Rebuild ✨

**Date**: October 24, 2025  
**Status**: ✅ Complete - Ready for Testing

---

## 🎯 What Was Done

The Hero block has been **completely rebuilt** using the Webflow export as the source of truth.

### Files Updated:
1. ✅ `src/blocks/hero/block.json` - Updated attributes for phone search
2. ✅ `src/blocks/hero/edit.js` - Rebuilt with Webflow structure
3. ✅ `src/blocks/hero/save.js` - Rebuilt with Webflow HTML output
4. ✅ `src/blocks/hero/style.scss` - Ported all Webflow CSS directly
5. ✅ `src/blocks/hero/editor.scss` - Enhanced for better editing UX

---

## 🎨 New Features

### Integrated Phone Search
- ✅ Phone search input now **integrated into hero** (not separate block)
- ✅ Search placeholder text is editable
- ✅ Search button text is editable
- ✅ Dropdown results container included (ready for JS)

### Exact Webflow Match
- ✅ Same HTML structure as Webflow export
- ✅ Same CSS classes (no renaming needed)
- ✅ Same visual appearance
- ✅ Gradient background (editable colors)
- ✅ Hero image on bottom-right

### Block Attributes

```json
{
  "heading": "A better way to sell your phone",
  "subheading": "Fast. Fair. Free. As it should be.",
  "heroImage": { object with id, url, alt },
  "searchPlaceholder": "Enter phone model e.g. iPhone14",
  "searchButtonText": "Get quote",
  "gradientStart": "#52729b",
  "gradientEnd": "#99a8b1"
}
```

### Editable Elements

**In Editor:**
- ✏️ Main heading (H1) - RichText
- ✏️ Subheading - RichText
- 🖼️ Hero image - MediaUpload
- ✏️ Search placeholder text - TextControl (sidebar)
- ✏️ Search button text - RichText
- 🎨 Gradient colors - Color pickers (sidebar)

---

## 🏗️ Structure

### HTML Structure (matches Webflow):
```html
<section class="section_home-hero" style="gradient">
  <div class="padding-global z-index-1">
    <div class="w-layout-blockcontainer container-medium w-container">
      <div class="home-hero_wrap">
        <div class="home-hero_content">
          <h1 class="text-color-white">Heading</h1>
          <div class="home-hero_subheading">Subheading</div>
          
          <div class="home-hero_phone-lockup-wrap">
            <form class="home-hero_phone-lookup">
              <input class="home-hero_phone-lookup-input" />
              <a class="button is-icon">
                <div>Button Text</div>
                <div class="icon-embed-arrow">→ SVG</div>
              </a>
            </form>
            
            <div class="phone-lookup">
              <!-- Results dropdown -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="padding-global home-hero_image-wrapper">
    <div class="container-large home-hero_img-container">
      <img class="home-hero_img" src="..." />
    </div>
  </div>
</section>
```

---

## 📱 Responsive Behavior

### Desktop (> 991px)
- Full-width gradient background
- Content on left (60% width)
- Hero image on bottom-right
- Search bar below subheading

### Tablet (768px - 991px)
- Content 80% width
- Smaller hero image
- Search bar full-width

### Mobile (< 767px)
- Content 100% width
- Hero image below content (centered)
- Search form stacks vertically
- Reduced font sizes

---

## 🎨 CSS Classes Reference

### Key Webflow Classes Used:
- `.section_home-hero` - Main section with gradient
- `.padding-global` - 5% left/right padding
- `.container-medium` - Max 66rem container
- `.container-large` - Max 80rem container
- `.home-hero_content` - Left content area
- `.home-hero_phone-lookup` - Search form container
- `.phone-lookup` - Results dropdown
- `.button.is-icon` - Yellow CTA button
- `.home-hero_img` - Hero image (cutout person)

---

## 🧪 Testing Checklist

### In WordPress Editor:
- [ ] Block appears in "Webdune Blocks" category
- [ ] Heading is editable inline
- [ ] Subheading is editable inline
- [ ] Search button text is editable inline
- [ ] Hero image can be selected/changed via sidebar
- [ ] Gradient colors can be changed via sidebar
- [ ] Search placeholder can be edited via sidebar
- [ ] Block saves without errors
- [ ] Block reloads with saved content
- [ ] No console errors

### On Frontend:
- [ ] Gradient background displays correctly
- [ ] Text is white and readable
- [ ] Hero image appears bottom-right (desktop)
- [ ] Search form is functional (white bg, yellow button)
- [ ] Button has hover effect
- [ ] Responsive: stacks on mobile
- [ ] Hero image appears below on mobile
- [ ] No layout shifts
- [ ] All typography matches Webflow

### Browser Testing:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## 🔧 Build Instructions

### 1. Build the Block
```bash
# Make sure you're in the plugin directory
cd "E:\Josue Munro\Documents\Projects\WebDune\SellmyCell\DEVELOPMENT\Webdune Blocks Plugin"

# Build all blocks (or just run npm start if already running)
npm run build

# Or for development with watch mode
npm start
```

### 2. Check Build Output
Verify these files exist in `build/blocks/hero/`:
- `block.json`
- `index.js`
- `index.css` (editor styles)
- `style-index.css` (frontend styles)
- `index.asset.php`

### 3. Test in WordPress
1. Open WordPress admin
2. Go to Pages → Add New
3. Click (+) to add block
4. Search for "Hero Section"
5. Add the block
6. Edit content and test all features

---

## 🚨 Known Limitations

### Phone Search Functionality
- ⚠️ The phone search **input is included** but **not yet functional**
- ⚠️ Search requires JavaScript to:
  - Listen for input changes
  - Query WordPress posts (phones) via REST API
  - Display results in `.phone-lookup` dropdown
  - Handle click events

**Next Steps for Search:**
1. Create JavaScript file for search functionality
2. Enqueue script only on pages with hero block
3. Use WordPress REST API to query phone posts
4. Show/hide `.phone-lookup` based on results
5. Add "View all models" link functionality

### Image Optimization
- Hero image uses simple `<img>` tag
- Could add `srcset` for responsive images
- Could add lazy loading for below-fold

---

## 📝 Next Blocks to Build

Following the same pattern, we can now build:

### Priority Order:
1. **Process Section** - ✅ Already done!
2. **Hero** - ✅ Just completed!
3. **Navigation** - Glass nav with backdrop blur
4. **Footer** - Multi-column footer
5. **Family Business Section** - Full-width image with overlay
6. **Phones Slider** - Swiper carousel
7. **Reviews Marquee** - Infinite scroll
8. **FAQs Accordion** - Expandable items
9. **Company Phones** - Two-column layout
10. **Charity Section** - Dark bg with logos
11. **Stats Section** - 3-column stats
12. **Trust CTA** - Simple heading + button
13. **Footer Image** - Full-width photo

---

## 🎓 Pattern Established

This hero rebuild establishes the pattern for all other blocks:

1. ✅ Copy Webflow HTML structure exactly
2. ✅ Port Webflow CSS classes directly
3. ✅ Make strategic elements editable (RichText, MediaUpload)
4. ✅ Add block attributes for customization
5. ✅ Keep JavaScript separate (enqueue when needed)
6. ✅ Maintain responsive breakpoints from Webflow
7. ✅ Use Webflow class names (easier to debug)

---

## 💡 Tips for Testing

### Quick Visual Check
Compare side-by-side:
- Left: Webflow export (`webflow-exported-home-page/index.html`)
- Right: WordPress page with hero block

### Gradient Check
Default gradient should be:
- Start: `#52729b` (blue-grey)
- End: `#99a8b1` (lighter grey)

### Typography Check
- H1: 5rem (80px), weight 400, line-height 1.1
- Subheading: 1.75rem (28px), weight 400
- Button: 1.125rem (18px)

### Spacing Check
- Hero content: 12rem top padding
- Content max-width: 40rem minimum
- Phone lookup: 32rem width

---

## 🐛 Troubleshooting

### "Block not appearing in inserter"
- Run `npm run build` to compile
- Check `build/blocks/hero/block.json` exists
- Refresh WordPress admin

### "Styles not applying"
- Check `style-index.css` exists in build folder
- Clear browser cache
- Check browser console for 404 errors

### "Gradient not showing"
- Check inline style on `.section_home-hero`
- Verify gradientStart and gradientEnd attributes
- Check browser DevTools computed styles

### "Hero image not displaying"
- Check image URL in attributes
- Verify image is uploaded to Media Library
- Check browser console for CORS errors

---

**Ready to test!** 🎉

Try adding the Hero block to a page and let me know how it looks!



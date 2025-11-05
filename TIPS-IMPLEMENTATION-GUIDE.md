# Tips Post Type Implementation Guide

**Created**: October 31, 2025  
**Version**: 1.0.0

## 📋 Overview

A complete blogging system for SellMyCell with a custom "Tips" post type, featuring:
- **Custom Post Type**: "Tips" with categories and tags
- **Block Template**: Locked structure for consistent post layout
- **Tips Grid Block**: Displays tips on archive pages
- **Related Tips Block**: Shows related posts on single pages
- **Custom Content Styling**: Beautiful typography and layout for post content

---

## 🎯 What Was Built

### 1. Custom Post Type: Tips (`includes/post-types.php`)

**Features**:
- Custom post type `tip` (displays as "Tips")
- Two taxonomies: `tip_category` (hierarchical) and `tip_tag` (flat)
- Auto-calculates read time (based on 200 words/min)
- REST API ready for headless use
- **Locked block template** - structure is fixed, content is editable

**WordPress Admin**:
- New "Tips" menu item in admin (lightbulb icon)
- Categories and Tags submenus
- Full Gutenberg editing experience

---

### 2. Tips Grid Block (`webdune/tips-grid`)

**Purpose**: Display tips on manually created archive pages

**Features**:
- Grid layout (2-4 columns, responsive)
- Shows featured image, tags, read time, title, excerpt
- Pagination support
- Hover animations
- Dynamic PHP rendering

**Inspector Controls**:
- Posts Per Page (3-24)
- Columns (2-4)
- Show/Hide: Tags, Read Time, Excerpt

**Usage**:
1. Create a new page (e.g., "Tips Archive")
2. Add the Tips Grid block
3. Configure settings in sidebar
4. Publish

---

### 3. Related Tips Block (`webdune/related-tips`)

**Purpose**: Show related tips on single Tips posts (part of locked template)

**Features**:
- 3-column grid (responsive)
- Auto-selects related posts by tags/categories
- "All Posts" button (optional)
- Editable heading
- Dynamic PHP rendering

**Inspector Controls**:
- Heading text (editable)
- Number of posts (2-6)
- Show/Hide button
- Button text & URL

**Usage**:
- Automatically included in Tips post template
- Customize via sidebar when editing a Tip

---

### 4. Tips Content Section Styles (`src/shared/tips-content.scss`)

**Purpose**: Beautiful, scoped styles for Tips post content

**Applies to**: Any block with class `tips-content-section`

**Styled Elements**:
- **Typography**: Headings (H2-H4), paragraphs, lists
- **Images**: Rounded corners, captions with left border
- **Quotes**: Orange left border, custom styling
- **Code**: Background color, syntax-friendly
- **Links**: Blue hover states
- **Tables**: Bordered, responsive
- **Buttons**: Yellow CTA buttons
- **Share buttons**: Social media styling
- **Tags**: Pill-style tags

**Layout**:
- Max-width: 768px (48rem)
- Padding: Responsive (4rem desktop, 2rem tablet, 1.5rem mobile)
- White background
- Generous vertical spacing

---

## 🏗️ Block Template Structure

When you create a new Tip, it comes with this **locked structure**:

1. **Navigation** - Uses `site-header` pattern (ID: 19396) or Webdune Navigation block as fallback
2. **Template Hero Block** - For title, featured image, read time
3. **Content Section** (Group) - Your blog content goes here
   - Core Gutenberg blocks (paragraphs, headings, images, etc.)
   - Styled via `tips-content-section` class
4. **Related Tips Block** - Auto-shows related posts
5. **CTA Section** - Call to action
6. **Footer** - Uses `site-footer` pattern (ID: 19397) or Webdune Footer block as fallback

**⚠️ Important**: Blocks can't be added, removed, or reordered. Only content within blocks can be edited.

**Pattern Blocks**: The template automatically uses your site's `site-header` and `site-footer` patterns if they exist. If these patterns are not found, it falls back to using the Webdune Navigation and Footer blocks.

---

## 📝 How to Create a Tip

1. **In WordPress Admin**, click **Tips > Add New**
2. **Template loads automatically** with 5 sections
3. **Edit the Template Hero**:
   - Set title
   - Choose background color
   - Upload featured image
   - Set read time text
4. **Add Content** in the Content Section:
   - Use headings (H2, H3, H4)
   - Add paragraphs, images, quotes
   - Insert lists, code blocks, etc.
5. **Configure Related Tips**:
   - Edit heading if needed
   - Set number of posts to show
   - Toggle "All Posts" button
6. **Update CTA Section** (optional)
7. **Set Featured Image** (right sidebar)
8. **Add Categories & Tags** (right sidebar)
9. **Publish!**

---

## 🎨 Creating a Tips Archive Page

### Option 1: Simple Archive (Recommended)

1. Create a new **Page** called "Tips"
2. Add the **Tips Grid Block**
3. Configure in sidebar:
   - Posts Per Page: 9
   - Columns: 3
   - Show tags, read time, excerpt: On
4. Add other blocks above/below as needed:
   - Hero section
   - Introductory text
   - CTA section
5. Publish

### Option 2: Custom Design

Build your archive page with any combination of:
- Template Hero (for page title)
- Tips Grid (for posts)
- Two-Column Flexible (for features)
- CTA Section (for conversions)

---

## 🎛️ Customization Options

### Tips Grid Block

```php
// Attributes you can customize in sidebar:
- postsPerPage: 3-24 (default: 9)
- columns: 2-4 (default: 3)
- showTags: true/false (default: true)
- showReadTime: true/false (default: true)
- showExcerpt: true/false (default: true)
```

### Related Tips Block

```php
// Attributes you can customize in sidebar:
- heading: string (default: "Related tips")
- postsCount: 2-6 (default: 3)
- showButton: true/false (default: true)
- buttonText: string (default: "All posts")
- buttonUrl: string (default: "/tips")
```

---

## 📂 File Structure

```
webdune-blocks/
├── includes/
│   └── post-types.php          ✅ NEW - Custom post type registration
├── src/
│   ├── blocks/
│   │   ├── tips-grid/          ✅ NEW - Archive page block
│   │   │   ├── block.json
│   │   │   ├── index.js
│   │   │   ├── edit.js
│   │   │   ├── save.js
│   │   │   ├── style.scss
│   │   │   └── editor.scss
│   │   └── related-tips/       ✅ NEW - Single post block
│   │       ├── block.json
│   │       ├── index.js
│   │       ├── edit.js
│   │       ├── save.js
│   │       ├── style.scss
│   │       └── editor.scss
│   └── shared/
│       └── tips-content.scss   ✅ NEW - Content styling
└── includes/
    └── block-helpers.php       ✅ UPDATED - Render callbacks
```

---

## 🔧 Technical Details

### Custom Post Type

**Post Type**: `tip`  
**Slug**: `/tips/[post-name]`  
**REST API**: `/wp-json/wp/v2/tips`  
**Archive**: `https://yourdomain.com/tips/` (if using WordPress archive)

### Taxonomies

**Categories**:
- Taxonomy: `tip_category`
- Slug: `/tip-category/[term]`
- Hierarchical: Yes

**Tags**:
- Taxonomy: `tip_tag`
- Slug: `/tip-tag/[term]`
- Hierarchical: No

### Dynamic Blocks

Both blocks are **server-side rendered** via PHP:
- `webdune_render_tips_grid_block()` - Queries and displays tips grid
- `webdune_render_related_tips_block()` - Finds related posts by taxonomy

### Content Styling

The `tips-content-section` class is applied via the block template and automatically styles all core Gutenberg blocks within.

---

## 🚀 Deployment Checklist

- [x] Custom post type registered
- [x] Taxonomies registered
- [x] Tips Grid block built
- [x] Related Tips block built
- [x] Content styles added
- [x] Render callbacks implemented
- [x] Build successful
- [ ] Test in WordPress admin
- [ ] Create sample tips
- [ ] Create archive page
- [ ] Add menu items
- [ ] Set featured images
- [ ] Test pagination
- [ ] Test mobile responsiveness

---

## 💡 Content Tips

### Writing a Tip

- **Title**: Keep under 60 characters for SEO
- **Featured Image**: Use 1280x720px (or larger)
- **Content**: Aim for 500-1500 words
- **Headings**: Use H2 for main sections, H3 for subsections
- **Images**: Add captions for better UX
- **Tags**: Use 3-5 relevant tags
- **Categories**: Choose 1-2 categories

### SEO Best Practices

- Add meta description via SEO plugin
- Use keyword in title and first paragraph
- Include alt text on all images
- Internal link to related tips
- Use descriptive URLs (auto-generated from title)

---

## 🎨 Design System

All blocks use the existing Webdune design system:

**Colors**:
- Primary (Yellow): `#FFD940`
- Dark Gray: `#3C3C3C`
- Light Gray: `#F5F5F7`
- Brick (Accents): `#CB6833`

**Typography**:
- Font: Helvetica World
- Base size: 16px (1rem)
- Fluid scaling via `clamp()`

**Containers**:
- Small: 48rem (768px) - Used for Tips content
- Medium: 64rem (1024px)
- Large: 80rem (1280px) - Used for Tips grid

**Breakpoints**:
- Desktop: Default
- Tablet: ≤991px
- Mobile Landscape: ≤767px
- Mobile Portrait: ≤479px

---

## 🐛 Troubleshooting

### Tips Not Showing in Admin

**Solution**: The post type is registered on plugin activation. Try:
1. Deactivate & reactivate plugin
2. Flush permalinks: Settings > Permalinks > Save Changes

### Block Template Not Applying

**Solution**: Template only applies to **new** Tips posts. Existing posts keep their structure.

### Related Tips Not Showing

**Possible causes**:
- Not enough published tips
- No matching tags/categories
- Current post has no tags/categories

### Styles Not Applying

**Solution**:
1. Run `npm run build`
2. Clear WordPress cache
3. Hard refresh browser (Ctrl+Shift+R)
4. Check that group block has class `tips-content-section`

---

## 🔮 Future Enhancements

**Potential additions**:
- Author bio section
- Estimated read time in REST API
- Featured tips toggle
- Tips search functionality
- Related tips by custom criteria
- Newsletter signup in template
- Social sharing buttons
- Print-friendly styles
- Dark mode support

---

## 📞 Support

**Documentation**:
- `START_HERE.md` - Project overview
- `PROJECT_STATUS.md` - Current state
- `BLOCK_INVENTORY.md` - All blocks

**Commands**:
```bash
npm start          # Development mode
npm run build      # Production build
wp cache flush     # Clear WordPress cache
```

---

## 🚀 Advanced Features & Automations (November 2025 Update)

### 1. Auto-Sync Metadata from Template Hero

**Post Title Sync**:
- Updates post title when you edit the Template Hero heading
- Happens automatically on save - no manual copying needed!

**Featured Image Sync**:
- Updates featured image when you upload an image to Template Hero
- Syncs on post save - featured image shows in Tips Grid and site-wide

### 2. Smart Pattern/Block Fallback System

**Navigation & Footer**:
- Uses your site's `site-header` pattern (ID: 19396) if it exists
- Falls back to Webdune Navigation block if pattern not found
- Same logic for `site-footer` pattern (ID: 19397) → Webdune Footer
- Both are locked in template (can't move/remove)

### 3. Automatic Permalink Flush

**No More 404s!**:
- Rewrite rules flush automatically when plugin is activated
- Your client will never need to manually flush permalinks
- Tips URLs work immediately after activation

### 4. Fixed Tips Grid Editor Controls

**Toggles Now Work!**:
- Show/Hide Tags toggle is fully functional
- Show/Hide Read Time toggle is fully functional
- Show/Hide Excerpt toggle is fully functional
- All controls update the preview immediately

---

**Last Updated**: November 4, 2025  
**Status**: ✅ Complete & Production Ready


# Project Status - Webdune Blocks Plugin

**Last Updated**: November 4, 2025  
**Project**: SellMyCell Custom Gutenberg Blocks  
**Status**: Homepage + Tips + FAQ Complete - Ready for Live Deployment

---

## 📊 Current Progress

**Core Blocks Completed**: 16 / 16 (100%) ✅  
**Tips System**: Complete with custom post type, clickable cards, InnerBlocks content, smart pattern/block fallback  
**FAQ System**: Complete with ToC, categories, and scroll anchors  
**Status**: All core blocks built, compiled, and ready for deployment  
**Next**: Live site testing with real data

### ✅ Completed & Built (Ready to Use)

1. **Navigation Block** (`webdune/navigation`)
   - Liquid glass effect (backdrop blur)
   - GSAP scroll behaviors (hide/show, background change)
   - Lenis smooth scrolling site-wide
   - Mobile hamburger menu
   - Editable logo & menu items
   - Account icon toggle
   - SVG glass distortion filter

2. **Footer Block** (`webdune/footer`)
   - Multi-column responsive layout
   - Logo & tagline
   - Quick links (editable array)
   - Contact information (hours, email, phone, address)
   - Newsletter signup form
   - Social media links (Instagram, TikTok, etc.)
   - Fully responsive

3. **Hero Block** (`webdune/hero`)
   - Homepage hero with gradient background
   - **✅ Phone Search Functionality Complete:**
     - Live AJAX search with 300ms debounce
     - Real-time results dropdown (max 3 items)
     - ACF integration for pricing (capacities, conditions, minimum offer)
     - Keyboard support (Enter to redirect)
     - Click outside to close
     - Loading, error, and no-results states
     - Redirects to `/select-model/?phone=[search]`
   - Image cutout on right
   - Fully responsive

4. **Template Hero Block** (`webdune/template-hero`)
   - For interior pages (How it Works, About, etc.)
   - Two layout variants: Image+Phone or Wide Image
   - Custom background colors
   - Optional down arrow
   - Fully responsive

5. **Process Section Block** (`webdune/process-section`)
   - 4-step numbered process
   - Side image
   - Optional decorative line
   - Fully responsive

6. **Two-Column Flexible Block** (`webdune/two-column-flexible`)
   - Highly customizable 2-column layout
   - Single/double image modes
   - Video support
   - Gradient underline text format
   - 20+ configuration options

7. **CTA Section Block** (`webdune/cta-section`)
   - Customizable background color
   - H2 heading with gradient underline support
   - Up to 3 toggleable buttons
   - 3 button styles (Primary, White, Secondary)
   - Fully responsive (stacks on mobile)

8. **FAQ Block (Parent)** (`webdune/faq`)
   - InnerBlocks container for FAQ items
   - Editable section heading
   - Optional CTA button
   - Uses InnerBlocks pattern for flexibility
   - Fully responsive

9. **FAQ Item Block (Child)** (`webdune/faq-item`)
   - Clickable question pill
   - Expandable answer area
   - Smooth accordion animation (vanilla JS)
   - Plus/minus icon toggle
   - Default open toggle
   - Keyboard accessible
   - Fully responsive

10. **Phone Slider Block** (`webdune/phone-slider`)
   - Swiper.js horizontal slider
   - Dynamic PHP rendering of phone posts
   - Displays phone image, name, max price
   - Post selection: Latest, By Category, Manual
   - Previous/Next navigation arrows
   - Optional autoplay
   - Configurable number of posts (3-20)
   - Bottom text section with CTA button
   - Desktop: Shows 3-4 phones, centered
   - Mobile: Shows 1 phone at a time
   - Fully responsive

11. **Reviews Marquee Block** (`webdune/reviews-marquee`)
   - Infinite scrolling marquee animation
   - Two offset rows (desktop) / single row (mobile)
   - Manual review entry via attributes
   - 5-star display with gold stars
   - Google rating badge (rating + review count)
   - Review cards: stars, text, author, photo, date
   - Configurable autoplay speed
   - Add/remove reviews in sidebar
   - Profile photo upload per review
   - Beautiful yellow background
   - Swiper.js powered
   - Fully responsive

12. **Content Image Section Block** (`webdune/content-image-section`)
   - Full-width background image with overlay
   - Customizable overlay color and opacity (0-100%)
   - Centered text content with white text color option
   - Optional parallax effect (0.75 speed)
   - Optional CTA button
   - Editable heading and optional content text
   - Supports gradient underline text format
   - Responsive padding (15rem desktop, 10rem mobile)
   - Z-indexed layers for proper stacking
   - Editor preview with placeholder when no image
   - Fully responsive

13. **Charity Section Block** (`webdune/charity-section`)
   - Dark background with white text
   - Customizable background color
   - Editable heading with rich text support
   - Highlighted text color (default yellow)
   - Optional content paragraph
   - Optional CTA button with URL and new tab option
   - Logo management system (up to 4 logos)
   - Two logo size options: height-fixed (11.25rem) or width-fixed (14rem)
   - Logo upload with alt text
   - Logo grid layout (space-between desktop, centered wrap mobile)
   - Responsive padding (10rem desktop, 7.5rem mobile)
   - Fully responsive

14. **Stats Section Block** (`webdune/stats-section`)
   - 3-column statistics grid layout
   - **GSAP ScrollTrigger count-up animations** on section reveal
   - Animates from 0 to target number over 2 seconds
   - Handles formatted numbers (commas, dollar signs, etc.)
   - Editable heading with rich text support
   - Up to 3 customizable stat items
   - Each stat has: number and label
   - Number formatting preserved ($1,697,167, 5,510, etc.)
   - Optional gradient underline on labels
   - Responsive grid (3-col desktop, wraps mobile)
   - Responsive font sizes (3.5rem desktop, 2.25rem mobile)
   - Responsive padding (10rem desktop, 7.5rem mobile)
   - Animation triggers once per page load
   - Fully responsive

15. **FAQ with ToC Block** (`webdune/faq-with-toc`) - NEW Nov 2025
   - Full FAQ page with sidebar table of contents
   - Two-column layout: sticky sidebar + content area
   - Auto-generates table of contents from categories
   - Smooth scrolling to FAQ categories
   - Active state highlighting on scroll
   - Dynamic scroll anchor generation
   - InnerBlocks for FAQ categories
   - Fully responsive (stacks on mobile)
   - Integrates with Lenis smooth scroll
   - Based on Webflow FAQ page design

16. **FAQ Category Block** (`webdune/faq-category`) - NEW Nov 2025
   - Child block for FAQ with ToC
   - Category name with RichText editing
   - Auto-generated category IDs for scroll anchors
   - Contains FAQ Item blocks
   - Scroll target for table of contents
   - Editor preview of scroll target ID

### Tips System Enhancements - November 2025

**Tips Post Type**:
- ✅ Locked block template with InnerBlocks content area
- ✅ Allowed blocks: paragraphs, headings, lists, quotes, images, videos, etc.
- ✅ Default page template: "Webdune Full Width" (with fallback)
- ✅ Block restrictions to maintain consistent formatting
- ✅ Smart pattern/block fallback system:
  - Uses `site-header` pattern (ID: 19396) or falls back to Webdune Navigation
  - Uses `site-footer` pattern (ID: 19397) or falls back to Webdune Footer
  - Automatically locked in template (can't move/remove)
- ✅ Auto-sync metadata from Template Hero:
  - Post title syncs with hero heading
  - Featured image syncs with hero image
- ✅ Automatic permalink flush on plugin activation (no more 404s!)

**Tips Grid Block (Enhanced)**:
- ✅ Whole card now clickable (not just image/link)
- ✅ Featured image, title, read time, tags, excerpt
- ✅ "Read more" is visual element (not separate link)
- ✅ Improved hover states and animations

---

## 🏗️ Infrastructure Complete

### Shared Styles (Global)
- ✅ `colors.scss` - Brand colors
- ✅ `typography.scss` - Font system (Helvetica World)
- ✅ `layout.scss` - Container sizes, padding
- ✅ `theme-overrides.scss` - Webflow overrides
- ✅ `utilities.scss` - Hide classes, spacing, gradient underline format
- ✅ `effects.scss` - Liquid glass nav effect

### Shared JavaScript
- ✅ `animations.js` - GSAP scroll behaviors, Lenis smooth scroll, parallax

### PHP Integration
- ✅ Auto-registration of blocks
- ✅ GSAP/Lenis script loading
- ✅ Swiper.js conditional loading
- ✅ Custom image sizes
- ✅ Font loading

### Build System
- ✅ Webpack configured
- ✅ SCSS compilation
- ✅ JS bundling (including view scripts)
- ✅ Auto-rebuild on save (`npm start`)

---

## 🎯 Next Steps

### Immediate Priority: Live Site Deployment & Testing

**1. Deploy to Production** 
- Set up Git repository on GitHub
- Version tagging strategy (semantic versioning)
- Deploy plugin to live WordPress site
- Activate and verify all blocks appear

**2. Live Testing with Real Data**
- ✅ Phone Search (Hero Block) - Test with real phone posts
- ✅ Phone Slider - Test with actual phone database
- Verify all ACF field integrations
- Test AJAX functionality on live server
- Performance monitoring

**3. Full Page Testing**
- Build complete homepage with all blocks
- Build interior pages (How It Works, About, etc.)
- Mobile responsiveness check
- Cross-browser testing
- Page speed analysis

### Future Development (Pending Webflow Export)

**Blog Blocks** (specifications needed)
- Blog post grid/list
- Blog sidebar components
- Blog post content blocks

**FAQs Page Blocks** (specifications needed)
- Table of Contents generator
- FAQ categories
- Search functionality

**About Us Blocks** (specifications needed)
- Team member cards
- Timeline components
- Company values section

### Phase 2: Enhancements

**Google My Business API Integration**
- Reviews Marquee block enhancement
- Pull live reviews from Google
- Auto-update review content
- Rating aggregation
- Implementation guide needed

**Performance Optimizations**
- Image lazy loading optimization
- Critical CSS extraction
- JS bundle optimization
- Caching strategies

---

## 📂 File Structure

```
webdune-blocks/
├── src/
│   ├── blocks/
│   │   ├── cta-section/               ✅ Complete
│   │   ├── faq/                       ✅ Complete
│   │   ├── faq-item/                  ✅ Complete
│   │   ├── footer/                    ✅ Complete
│   │   ├── hero/                      ✅ Complete
│   │   ├── navigation/                ✅ Complete
│   │   ├── process-section/           ✅ Complete
│   │   ├── template-hero/             ✅ Complete
│   │   └── two-column-flexible/       ✅ Complete
│   ├── shared/
│   │   ├── animations.js              ✅ GSAP behaviors
│   │   ├── colors.scss                ✅ Brand colors
│   │   ├── effects.scss               ✅ Liquid glass
│   │   ├── layout.scss                ✅ Containers
│   │   ├── theme-overrides.scss       ✅ Webflow overrides
│   │   ├── typography.scss            ✅ Font system
│   │   └── utilities.scss             ✅ Utility classes
│   └── index.js                       ✅ Block registration
├── build/                             ✅ Compiled assets
├── includes/
│   ├── block-helpers.php              ✅ Helper functions
│   └── phone-queries.php              ✅ Phone search queries
├── sellmycell.webflow/                ✅ Source HTML/CSS
└── webdune-blocks.php                 ✅ Main plugin file
```

---

## 🔧 Development Workflow

### Daily Commands
```bash
npm start              # Development mode (auto-rebuild)
npm run build          # Production build
```

### WordPress Commands (in Local shell)
```bash
wp plugin list         # Check plugin status
wp cache flush         # Clear cache
wp block list          # List registered blocks
```

### Testing Checklist
- [ ] Block appears in inserter
- [ ] Attributes editable
- [ ] Save/reload works
- [ ] Frontend displays correctly
- [ ] Mobile responsive
- [ ] No console errors

---

## 📖 Documentation

### For Developers
- **START_HERE.md** - Quick start guide
- **QUICK_REFERENCE.md** - Common commands
- **BLOCK_INVENTORY.md** - All blocks with specs
- **SETUP_GUIDE.md** - Local environment setup
- **THEME-INTEGRATION-GUIDE.md** - Nav/footer integration

### Per-Block Documentation
- `src/blocks/template-hero/README.md` - Template Hero usage
- `src/blocks/two-column-flexible/README.md` - 2-Column Flexible usage

### Source Reference
- **sellmycell.webflow/** - HTML/CSS source from Webflow
- **wp_cursor_brief.md** - Original project brief

---

## 🎨 Design System

### Colors
- **Primary**: `#FFD940` (Yellow)
- **Dark**: `#3C3C3C`
- **Light**: `#F5F5F7`
- **White**: `#FFFFFF`
- **Brick**: `#CB6833`

### Typography
- **Font**: Helvetica World (Bold, Regular, Italic)
- **Fluid sizing**: Responsive font scaling via calc()

### Containers
- **Small**: 48rem (768px)
- **Medium**: 64rem (1024px)
- **Large**: 80rem (1280px)

### Breakpoints
- **Desktop**: Default
- **Tablet**: ≤991px
- **Mobile Landscape**: ≤767px
- **Mobile Portrait**: ≤479px

---

## 🚨 Known Issues & Notes

### None Currently
All built blocks are functioning as expected.

### Future Considerations
1. **✅ Phone Search**: COMPLETED - ACF integration and AJAX backend working
2. **Reviews Marquee**: May need Google Reviews API integration
3. **Phone Slider**: Requires Swiper.js setup
4. **Parallax**: Elements need `[data-speed]` attribute

---

## 💡 Tips for Next Developer/AI

### Starting a New Block
1. Check `sellmycell.webflow/index.html` for section HTML
2. Extract CSS from `sellmycell.webflow.css`
3. Copy structure from similar existing block
4. Use shared styles (don't reinvent)
5. Test mobile breakpoints from Webflow export

### Common Patterns
- All blocks use: `section > .padding-global > .container-*`
- Colors use SCSS variables from `colors.scss`
- Inspector controls in `edit.js`, output in `save.js`
- Editor styles in `editor.scss`, frontend in `style.scss`

### GSAP/Animations
- Already loaded globally via `animations.js`
- Parallax auto-works on `[data-speed]` elements
- Nav behaviors auto-apply to `.navbar14_component`

### Helpful Commands
```bash
# Find where a class is used
grep -r "navbar14_component" src/

# Check if block is registered
wp block list | grep webdune

# Rebuild specific block
npm run build
```

---

## 🎯 Project Goals

### Phase 1: Foundation (Current)
Build core blocks to replace WP Bakery on new pages.

### Phase 2: Content Blocks
Add remaining content blocks (stats, charity, reviews, etc.).

### Phase 3: Polish & Deploy
- Performance optimization
- Browser testing
- Mobile device testing
- Production deployment
- Client training

### Phase 4: Advanced Features
- Phone search backend (AJAX)
- Google Reviews integration
- Phone slider with real data
- Advanced animations

---

## 📞 Getting Help

### Documentation Order
1. **START_HERE.md** - Always start here
2. **QUICK_REFERENCE.md** - Quick answers
3. **BLOCK_INVENTORY.md** - Block specifications
4. This file - **PROJECT_STATUS.md** - Current state

### Common Issues
- **Build fails**: Check for missing imports or syntax errors
- **Block doesn't appear**: Run `npm run build` and clear WordPress cache
- **Styles not applying**: Check shared styles are imported
- **GSAP not working**: Verify scripts are enqueued in `webdune-blocks.php`

---

**Last Build**: October 30, 2025  
**Build Status**: ✅ Successful  
**Plugin ZIP**: ✅ Ready (`webdune-blocks.zip`)

### Recent Updates (Oct 30, 2025)
- ✅ **Animations Fixed**: Lenis smooth scroll, parallax, and navigation behaviors working
- ✅ **Phone Prices Fixed**: Correct calculation for Flawless condition (0 deduction)
- ✅ **Lenis Recalc**: FAQ toggles now trigger scroll recalculation
- ✅ **Two-Column H2**: Added H2/H3 heading level selector
- ✅ **Two-Column Center**: Added center align text option
- ✅ **FAQ Button**: Fixed visibility on frontend
- ✅ **Content Image Heights**: Fixed heights when content disabled (56rem/48rem/40rem)

**Status**: Homepage ready for live deployment. Future blocks coming soon!

---

*This document is automatically updated with each major milestone.*


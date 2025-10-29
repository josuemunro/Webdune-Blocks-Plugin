# Quick Reference - Webdune Blocks Plugin

**Version**: 1.0.0  
**Status**: Ready for Deployment  
**Last Updated**: October 29, 2025

---

## 📚 Documentation Index

### Start Here
1. **[START_HERE.md](START_HERE.md)** - Project overview, current status, setup instructions
2. **[README.md](README.md)** - Complete project documentation, architecture, features
3. **[PROJECT_STATUS.md](PROJECT_STATUS.md)** - Detailed progress tracking, what's complete, what's next

### Development
4. **[BLOCK_INVENTORY.md](BLOCK_INVENTORY.md)** - All blocks specifications, attributes, features
5. **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Git setup, version control, deployment procedures

### Implementation Guides
6. **[PHONE_SEARCH_IMPLEMENTATION.md](PHONE_SEARCH_IMPLEMENTATION.md)** - Testing phone search with real data
7. **[PHONE_SLIDER_IMPLEMENTATION.md](PHONE_SLIDER_IMPLEMENTATION.md)** - Testing phone slider block
8. **[REVIEWS_MARQUEE_IMPLEMENTATION.md](REVIEWS_MARQUEE_IMPLEMENTATION.md)** - Reviews marquee usage

### Integration
9. **[THEME-INTEGRATION-GUIDE.md](THEME-INTEGRATION-GUIDE.md)** - How to integrate nav/footer into theme

---

## ⚡ Common Commands

### Development
```bash
# Start development (auto-rebuild on save)
npm start

# Production build
npm run build

# Linting
npm run lint:js
npm run lint:css
```

### WordPress (via SSH/WP-CLI)
```bash
# Clear cache
wp cache flush

# List all blocks
wp block list | grep webdune

# Check plugin status
wp plugin list

# Activate/deactivate
wp plugin activate webdune-blocks
wp plugin deactivate webdune-blocks
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-block

# Commit changes
git add .
git commit -m "feat: add new block"

# Push to GitHub
git push origin feature/new-block

# Create a release
git checkout main
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main --tags
```

---

## 🎯 Current Status

### ✅ Complete (14/14 Core Blocks)
1. Navigation (liquid glass, mobile menu)
2. Footer (newsletter, social links)
3. Hero (homepage with phone search) - *needs live testing*
4. Template Hero (interior pages)
5. Process Section (4-step numbered)
6. Two-Column Flexible (gradient underlines)
7. CTA Section (3 button styles)
8. FAQ Parent (InnerBlocks container)
9. FAQ Item (accordion animation)
10. Phone Slider (Swiper.js) - *needs live testing*
11. Reviews Marquee (infinite scroll) - *Phase 2: GMB API*
12. Content Image Section (bg + overlay)
13. Charity Section (logo grid)
14. Stats Section (GSAP count-up)

### 📋 Next Steps
- Deploy to live site
- Test phone search with real data
- Test phone slider with real posts
- Build future blocks (blog, FAQs page, about us) when Webflow export provided

### 🔮 Phase 2
- Google My Business API for Reviews Marquee
- Performance optimizations
- Advanced animations

---

## 🏗️ Block Structure Template

Every block follows this pattern:

```
src/blocks/[block-name]/
├── block.json          # Block metadata
├── index.js            # Entry point (registers block + format types)
├── edit.js             # Editor component (React)
├── save.js             # Frontend output
├── style.scss          # Frontend styles
├── editor.scss         # Editor-only styles
└── view.js             # Optional: Frontend JavaScript
```

---

## 🎨 Design System Quick Reference

### SASS Color Variables
```scss
$color-primary: #FFD940;  // Yellow
$color-dark: #3C3C3C;     // Dark gray
$color-light: #F5F5F7;    // Light gray
$color-white: #FFFFFF;
$color-black: #000000;
$color-brick: #CB6833;    // Orange/brick
```

### Container Classes
```scss
.container-small   // 48rem (768px)
.container-medium  // 64rem (1024px)
.container-large   // 80rem (1280px)
```

### Standard Section Structure
```jsx
<section className="section_[block-name]">
  <div className="padding-global">
    <div className="container-large">
      <div className="[block-name]_content">
        {/* Your content */}
      </div>
    </div>
  </div>
</section>
```

---

## 🐛 Troubleshooting Quick Fixes

### Blocks Not Appearing
```bash
wp cache flush
# Then hard refresh browser (Ctrl+Shift+R)
```

### JavaScript Errors
```bash
npm install
npm run build
# Clear browser cache
```

### Styles Not Loading
```bash
rm -rf build/
npm run build
# Clear all caches (WP + browser)
```

### Phone Search Not Working
1. Check ACF fields are set up on phone posts
2. Check browser console Network tab for AJAX errors
3. Verify `includes/phone-queries.php` exists

### Phone Slider Empty
1. Check phone posts exist (at least 3-5)
2. Try "Latest Posts" in block settings
3. Verify Swiper.js is loading (check console)

---

## 📁 Important File Locations

### Plugin Files
- **Main**: `webdune-blocks.php`
- **Build**: `build/` (auto-generated)
- **Source**: `src/blocks/[block-name]/`
- **Shared**: `src/shared/` (colors, typography, utilities)

### PHP Helpers
- **Phone Queries**: `includes/phone-queries.php`
- **Block Helpers**: `includes/block-helpers.php`

### Configuration
- **Webpack**: `webpack.config.js`
- **Package**: `package.json`

---

## 🚀 Quick Deployment

### First Time (FTP)
1. `npm run build`
2. Upload entire `webdune-blocks` folder to `/wp-content/plugins/`
3. Activate in WordPress Admin
4. Test blocks

### Updates (Git Pull)
```bash
ssh user@server.com
cd /wp-content/plugins/webdune-blocks
git pull origin main
npm install
npm run build
wp cache flush
```

---

## 🔗 Quick Links

### WordPress Resources
- Block Editor Handbook: https://developer.wordpress.org/block-editor/
- Block Editor Components: https://developer.wordpress.org/block-editor/reference-guides/components/
- WP-CLI Documentation: https://wp-cli.org/

### External Dependencies
- GSAP: https://gsap.com/docs/v3/
- Swiper.js: https://swiperjs.com/
- Lenis Smooth Scroll: https://lenis.studiofreight.com/

---

## 📊 Testing Checklist

### Before Deployment
- [ ] `npm run build` successful
- [ ] No console errors locally
- [ ] All blocks display correctly
- [ ] Mobile responsive
- [ ] Version number updated

### After Deployment
- [ ] Plugin activated
- [ ] Blocks appear in inserter
- [ ] Test one page thoroughly
- [ ] Phone search working
- [ ] Phone slider loading
- [ ] No JavaScript errors
- [ ] Mobile check

---

## 💡 Pro Tips

1. **Keep `npm start` running** during development
2. **Use browser DevTools** to debug (F12)
3. **Test in editor AND frontend** - both are important
4. **Commit often** with clear messages
5. **Tag releases** with semantic versioning
6. **Test on staging** before production
7. **Back up before deploying** to production

---

## 🆘 Need Help?

### Documentation Order
1. START_HERE.md - Start here for overview
2. README.md - Complete documentation
3. BLOCK_INVENTORY.md - Block specifications
4. PROJECT_STATUS.md - Current state
5. DEPLOYMENT_GUIDE.md - How to deploy
6. This file - Quick reference

### Implementation Guides
- Phone search issues → PHONE_SEARCH_IMPLEMENTATION.md
- Phone slider issues → PHONE_SLIDER_IMPLEMENTATION.md
- Reviews marquee → REVIEWS_MARQUEE_IMPLEMENTATION.md

---

**Last Updated**: October 29, 2025  
**Plugin Version**: 1.0.0  
**Status**: Ready for Production Deployment ✅


# Webdune Blocks Plugin - Project Reference

**Last Updated**: January 23, 2026  
**Status**: 16/16 Core Blocks Complete (100%) - Ready for Production  
**Purpose**: Custom Gutenberg blocks for SellMyCell to replace WP Bakery

---

## 🚀 Quick Start

###Development Commands
```bash
npm start          # Development (auto-rebuild on save)
npm run build      # Production build
npm run plugin-zip # Build + create deployment zip
npm run deploy:prod # Build + deploy to live site 🚀
```

### Deploy to Production
```bash
npm run deploy:prod
```
This will:
- Build the plugin
- Create zip with assets folder
- Backup existing plugin on server
- Upload via SCP
- Extract and set permissions

### WordPress Commands (SSH/WP-CLI)
```bash
wp cache flush                  # Clear cache
wp block list | grep webdune    # List our blocks
wp plugin list                  # Check plugin status
```

---

## 📁 Project Structure

```
webdune-blocks/
├── src/
│   ├── blocks/           # All block source files
│   │   ├── navigation/
│   │   ├── footer/
│   │   ├── hero/
│   │   └── [14 more blocks...]
│   └── shared/           # Colors, typography, animations
├── build/                # Compiled files (auto-generated)
├── includes/             # PHP helpers
│   ├── post-types.php    # Tips CPT registration
│   ├── phone-queries.php # Phone search functionality
│   ├── block-helpers.php # Block utility functions
│   └── emoji-fix.php     # Emoji sanitization
├── WORK_LOGS/            # Implementation details
│   ├── phone-search.md
│   ├── phone-slider.md
│   └── user-roles.md
├── webdune-blocks.php    # Main plugin file
└── package.json          # Dependencies
```

---

## 🎯 Current Status

### ✅ Completed (16/16 Core Blocks)
1. **Navigation** - Liquid glass, mobile menu
2. **Footer** - Newsletter, social links
3. **Hero** - Homepage with phone search
4. **Template Hero** - Interior pages (2 layouts)
5. **Process Section** - 4-step numbered guide
6. **Two-Column Flexible** - Gradient underlines
7. **CTA Section** - 3 button styles
8. **FAQ Parent** - InnerBlocks container
9. **FAQ Item** - Accordion animation
10. **FAQ with ToC** - Sidebar table of contents
11. **FAQ Category** - Child block for categorized FAQs
12. **Phone Slider** - Swiper.js, dynamic PHP
13. **Reviews Marquee** - Infinite scroll
14. **Content Image Section** - Background + overlay
15. **Charity Section** - Logo grid
16. **Stats Section** - GSAP count-up

### 📦 Source of Truth
- **Webflow Export**: `sellmycell.webflow/` folder
- Use exact HTML structure and CSS from export
- Mobile styles already included - use them!

### 🔮 Phase 2 (Future)
- Google My Business API for Reviews Marquee
- Additional blocks as needed (new Webflow exports)
- Performance optimizations

---

## 🏗️ Block Development

### Standard Block Structure
```
src/blocks/[name]/
├── block.json      # Metadata & registration
├── index.js        # Entry point (MUST import SCSS)
├── edit.js         # Editor component
├── save.js         # Frontend output
├── style.scss      # Frontend + Editor styles
├── editor.scss     # Editor-only styles
└── view.js         # Frontend JavaScript (optional)
```

### Critical: SCSS Imports
**In `index.js`, you MUST import SCSS:**
```javascript
import './style.scss';      // Required
import './editor.scss';     // Required if exists
```

### Webpack CSS Naming (DO NOT GET THIS WRONG!)
- `style.scss` → builds to `style-index.css`
- `editor.scss` → builds to `index.css`

**In `block.json`, use these EXACT paths:**
```json
{
  "editorScript": "file:./index.js",
  "editorStyle": "file:./index.css",        ← NOT editor.css!
  "style": "file:./style-index.css",        ← NOT style.css!
  "viewScript": "file:./view.js"
}
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

## 🎨 Design System

### Colors (SASS Variables)
```scss
$color-primary: #FFD940;  // Yellow
$color-dark: #3C3C3C;     // Dark gray
$color-light: #F5F5F7;    // Light gray
$color-white: #FFFFFF;
$color-black: #000000;
$color-brick: #CB6833;    // Orange/brick
```

Import in blocks: `@import '../../shared/colors.scss';`

### Typography
- **Font**: Helvetica World (already loaded globally)
- Variants: Regular, Bold, Italic, BoldItalic

### Containers
```scss
.container-small   // 48rem (768px)
.container-medium  // 64rem (1024px)
.container-large   // 80rem (1280px)
```

### GSAP/Animations
- Already loaded globally via `src/shared/animations.js`
- Parallax auto-works on `[data-speed]` elements
- Nav behaviors auto-apply to `.navbar14_component`

---

## 🌐 Server Setup

### Production Server
- **URL**: https://sellmycell.co.nz
- **Server**: CloudPanel on Nginx (DigitalOcean)
- **WordPress Path**: `/home/sellmycell/htdocs/sellmycell.co.nz`
- **Theme Path**: `/home/sellmycell/htdocs/sellmycell.co.nz/wp-content/themes/sellmycell`
- **Logs**: `/home/sellmycell/logs/`
- **Backups**: `/home/sellmycell/backups/`

### SSH Access
See `CREDENTIALS.local.md` (gitignored) for:
- SSH key path
- Server IP
- Database credentials

### Custom Post Types

#### Tips (`tip`)
- Blog-style articles
- Registered in: `includes/post-types.php`
- Locked block template with Template Hero
- Auto-syncs title and featured image from Template Hero block

#### User Orders (`user_orders`)
- Order management system
- Registered in: Theme `functions.php` line ~638
- **Uses custom capabilities**: `capability_type => 'order'`
- See [User Roles & Permissions](#-user-roles--permissions) below

---

## 👥 User Roles & Permissions

### order_editor Role
Custom role for staff who manage orders but shouldn't access admin settings.

**Can Do:**
- ✅ View and edit User Orders
- ✅ Access their Profile

**Cannot Do:**
- ❌ Delete User Orders
- ❌ See Posts, Tips, Pages, Media
- ❌ Access Plugins, Themes, Settings
- ❌ See WooCommerce, WPBakery, or other admin menus

**How It Works:**
1. User Orders CPT uses `capability_type => 'order'` (unique capabilities)
2. Members plugin assigns only: `read`, `read_order`, `edit_order`, `edit_orders`
3. Theme code hides all admin menus except User Orders
4. WooCommerce admin access filter allows role to access wp-admin

**Implementation Details:**  
See **[WORK_LOGS/user-roles.md](WORK_LOGS/user-roles.md)** for:
- Full code snippets
- Step-by-step setup
- Troubleshooting
- Menu slug discovery process

**Key Files Modified:**
- Theme `functions.php` lines 636-637: Added `capability_type => 'order'`
- Theme `functions.php` lines ~2000-2070: Role filters and menu hiding

**Members Plugin Setup:**
1. Go to Users > Roles > order_editor
2. Check: `read`, `read_order`, `edit_order`, `edit_orders`
3. Leave unchecked: All `delete_order*` capabilities
4. Leave unchecked: All `edit_posts`, `edit_pages`, `edit_tips` capabilities

---

## 🐛 Troubleshooting

### Blocks Not Appearing
```bash
wp cache flush
# Hard refresh browser (Ctrl+Shift+R)
```

### Styles Not Loading
```bash
rm -rf build/
npm run build
# Clear WP cache + browser cache
```

### Phone Search Not Working
1. Check ACF fields exist on phone posts
2. Check browser console Network tab for AJAX errors
3. Verify `includes/phone-queries.php` exists
4. See **[WORK_LOGS/phone-search.md](WORK_LOGS/phone-search.md)**

### Phone Slider Empty
1. Check phone posts exist (at least 3-5)
2. Try "Latest Posts" in block settings
3. Verify Swiper.js is loading
4. See **[WORK_LOGS/phone-slider.md](WORK_LOGS/phone-slider.md)**

### Blocks Failing to Save with Emojis
- Null bytes or zero-width characters breaking JSON
- Solution: Sanitize text attributes (see `includes/emoji-fix.php`)
- Already fixed in: Reviews Marquee, Two-Column Flexible

### User Role Can't Access Admin
- Check they have `read` capability
- Check WooCommerce isn't redirecting them
- See **[WORK_LOGS/user-roles.md](WORK_LOGS/user-roles.md)**

---

## 📚 Work Logs

Detailed implementation notes for specific features:

- **[Phone Search](WORK_LOGS/phone-search.md)** - AJAX phone search functionality
- **[Phone Slider](WORK_LOGS/phone-slider.md)** - Dynamic Swiper.js slider
- **[User Roles](WORK_LOGS/user-roles.md)** - Custom role & permissions setup

---

## 💡 Development Tips

1. **Keep `npm start` running** - Auto-rebuilds on save
2. **Use browser DevTools** - Check console for errors
3. **Test editor AND frontend** - Both views matter
4. **Commit often** - Small commits easier to debug
5. **Follow Webflow export** - Don't make up CSS
6. **Mobile styles included** - Use what's in the export
7. **Back up before deploying** - Auto-backup in deploy script

---

## 📋 Common Issues

### InnerBlocks Not Working
**Problem**: Button to add child blocks doesn't work

**Wrong**:
```javascript
const { insertBlock } = useDispatch('core/block-editor');
insertBlock(newBlock, undefined, clientId); // ❌ Returns Promise, unreliable
```

**Correct**:
```javascript
const { replaceInnerBlocks } = useDispatch('core/block-editor');

const innerBlocks = useSelect(
  (select) => {
    const { getBlock } = select('core/block-editor');
    return getBlock(clientId)?.innerBlocks || [];
  },
  [clientId]
);

const addChildBlock = () => {
  const newBlock = createBlock('webdune/child-block', {});
  const updatedBlocks = [...innerBlocks, newBlock];
  replaceInnerBlocks(clientId, updatedBlocks, false); // ✅ Works!
};
```

### Webpack Build Errors
```bash
# Clear everything and rebuild
rm -rf node_modules build package-lock.json
npm install
npm run build
```

---

## 🎓 Resources

### WordPress
- **Block Editor Handbook**: https://developer.wordpress.org/block-editor/
- **Block Components**: https://developer.wordpress.org/block-editor/reference-guides/components/
- **WP-CLI**: https://wp-cli.org/

### External Libraries
- **GSAP**: https://gsap.com/docs/v3/
- **Swiper.js**: https://swiperjs.com/
- **Lenis Smooth Scroll**: https://lenis.studiofreight.com/

---

## 📊 Testing Checklist

### Before Deployment
- [ ] `npm run build` successful
- [ ] No console errors locally
- [ ] All blocks display correctly
- [ ] Mobile responsive
- [ ] Version number updated in `webdune-blocks.php`

### After Deployment
- [ ] Plugin activated
- [ ] Blocks appear in inserter
- [ ] Test one page thoroughly
- [ ] Phone search working (if applicable)
- [ ] Phone slider loading (if applicable)
- [ ] No JavaScript errors in console
- [ ] Mobile check on actual device

---

## 🔄 Git Workflow

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
git tag -a v1.0.1 -m "Release v1.0.1"
git push origin main --tags
```

---

## 📞 Need Help?

### Quick Answers
- **Block not showing?** → Check `npm start` is running, clear cache
- **Styles wrong?** → Check SCSS imports in `index.js`, rebuild
- **AJAX not working?** → Check Network tab, verify nonce
- **Role issues?** → Check **[WORK_LOGS/user-roles.md](WORK_LOGS/user-roles.md)**
- **Deployment fails?** → Check SSH key, server credentials
- **More details?** → Check **[README.md](README.md)** for full docs

---

## 🎯 Block List (Quick Reference)

| Block | Status | Notes |
|-------|--------|-------|
| Navigation | ✅ | Liquid glass, mobile menu |
| Footer | ✅ | Newsletter, social links |
| Hero | ✅ | Phone search needs live testing |
| Template Hero | ✅ | 2 layout options |
| Process Section | ✅ | 4-step numbered |
| Two-Column Flexible | ✅ | Gradient underlines |
| CTA Section | ✅ | 3 button styles |
| FAQ Parent | ✅ | InnerBlocks container |
| FAQ Item | ✅ | Accordion animation |
| FAQ with ToC | ✅ | Sidebar navigation |
| FAQ Category | ✅ | Child block |
| Phone Slider | ✅ | Needs live testing |
| Reviews Marquee | ✅ | Phase 2: GMB API |
| Content Image Section | ✅ | Background + overlay |
| Charity Section | ✅ | Logo grid |
| Stats Section | ✅ | GSAP count-up |

---

**Ready to build?** 🚀

1. Run `npm start`
2. Open WordPress block editor
3. Insert "Webdune" blocks
4. Edit inline, save, publish!

---

*Last Updated: January 23, 2026*  
*Plugin Version: 1.1.0*  
*Status: Production Ready ✅*

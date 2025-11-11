# 🚀 START HERE - Webdune Blocks Plugin

**Last Updated**: November 4, 2025  
**Project Status**: 16/16 Core Blocks Complete & Polished (100%)  
**Current Phase**: Homepage + Tips + FAQ Complete - Ready for Live Deployment

---

## 📍 You Are Here

This is the **Webdune Blocks Plugin** for SellMyCell - a custom Gutenberg blocks system that will replace WP Bakery for new pages.

### Current Status - November 4, 2025
- ✅ Plugin structure created
- ✅ Documentation complete & streamlined
- ✅ Helper functions ready
- ✅ Shared styles configured (colors, typography, layout, utilities, effects)
- ✅ Shared animations (GSAP, Lenis, parallax)
- ✅ Development workflow established
- ✅ **All 16 Core Blocks Completed and Built** (100%):
  - Navigation block (liquid glass, scroll behaviors, mobile menu)
  - Footer block (newsletter, social links, contact info)
  - Hero block (Homepage with phone search UI - needs live testing)
  - Template Hero block (Interior pages, 2 layouts)
  - Process Section block (4-step numbered)
  - Two-Column Flexible block (gradient underline format)
  - CTA Section block (3 toggleable buttons)
  - FAQ Parent block (InnerBlocks container)
  - FAQ Item block (accordion with vanilla JS)
  - Phone Slider block (Swiper.js, dynamic PHP - needs live testing)
  - Reviews Marquee block (infinite scroll, manual entries)
  - Content Image Section block (background image with overlay)
  - Charity Section block (logos, colored text, dark background)
  - Stats Section block (GSAP count-up animations)
  - FAQ with ToC block (sidebar table of contents, categorized FAQs - NEW)
  - FAQ Category block (child block for FAQ with ToC - NEW)
- 📦 **SOURCE**: Webflow export in `sellmycell.webflow/` folder
- ✅ **TIPS SYSTEM**: Custom post type with locked template, InnerBlocks content, clickable cards, pattern fallbacks
- 🎯 **NEXT**: 
  - Deploy to live site for testing
  - Test phone search with real data
  - Test phone slider with real posts
  - Build additional blocks (blog, FAQs page, about us) once new Webflow export provided
  - Phase 2: Google My Business API for reviews

---

## 📚 Documentation Guide (Streamlined)

### Essential Documents
1. **START_HERE.md** ← You are here! Quick start and overview
2. **PROJECT_STATUS.md** - Current progress and next priorities
3. **BLOCK_INVENTORY.md** - All 16 blocks with specs and status
4. **README.md** - Complete project documentation
5. **THEME-INTEGRATION-GUIDE.md** - How to integrate blocks into theme

### Implementation Guides
6. **PHONE_SEARCH_IMPLEMENTATION.md** - Testing phone search functionality
7. **PHONE_SLIDER_IMPLEMENTATION.md** - Testing phone slider block
8. **REVIEWS_MARQUEE_IMPLEMENTATION.md** - Testing reviews marquee block

### Source Files
9. **sellmycell.webflow/** - Source HTML/CSS/assets from Webflow export
10. **wp_cursor_brief.md** - Original project brief with design system

### Core Plugin Files
11. **webdune-blocks.php** - Main plugin file (auto-registers blocks)
12. **package.json** - Dependencies and npm scripts

---

## 🎯 Current Goals & Workflow

### ✅ Development Workflow Established

**Source of Truth**: `sellmycell.webflow/` folder contains:
- `index.html` - Full homepage with all sections
- `how-it-works.html` - Interior page example
- `css/sellmycell.webflow.css` - All compiled styles
- `js/webflow.js` - Webflow interactions
- Custom styles in `<div class="custom-styles">` (nav liquid glass, underlines, etc.)
- Parallax/scroll scripts at end of HTML

**Block Building Process**:
1. Locate the section in `index.html` (each section = potential block)
2. Copy exact HTML structure
3. Extract relevant CSS from `sellmycell.webflow.css`
4. **IMPORTANT**: Convert Webflow CSS variables to SASS variables
   - `var(--white)` → `$color-white`
   - `var(--brick)` → `$color-brick`
   - See `src/shared/colors.scss` for all available SASS variables
5. Use existing shared styles (typography, colors, layout)
6. Mobile styles are already in the export - use them!
7. **Don't make up random CSS** - use what's in the export

### ✅ Completed Blocks (Ready to Use)
- [x] Navigation block (liquid glass effect)
- [x] Footer block (multi-column, newsletter)
- [x] Hero block (Homepage with phone search)
- [x] Template Hero block (Interior pages)
- [x] Process Section block
- [x] Two-Column Flexible block
- [x] CTA Section block
- [x] FAQ Parent block (InnerBlocks)
- [x] FAQ Item block (accordion animation)
- [x] Phone Slider block (Swiper.js, dynamic PHP)
- [x] Reviews Marquee block (infinite scroll)

### ✅ All Core Blocks Complete!
- [x] Navigation
- [x] Footer
- [x] Hero (with phone search)
- [x] Template Hero
- [x] Process Section
- [x] Two-Column Flexible
- [x] CTA Section
- [x] FAQ Parent & FAQ Item
- [x] Phone Slider
- [x] Reviews Marquee
- [x] Content Image Section
- [x] Charity Section
- [x] Stats Section
- [ ] ~~Full Width Photo~~ (Can use Content Image Section with content disabled)
- [ ] ~~Hero Simple~~ (Not needed - Template Hero covers this)

### 🚀 Ready for Live Site Testing
- [ ] Deploy plugin to live site
- [ ] Test phone search with real phone posts
- [ ] Test phone slider with real data
- [ ] Test all blocks on actual pages
- [ ] Performance testing
- [ ] Mobile device testing

### 📋 Future Blocks (Pending Webflow Export)
- [ ] Blog-related blocks
- [ ] FAQs page with Table of Contents
- [ ] About Us page blocks

### 🔮 Phase 2 Enhancements
- [ ] Google My Business API integration for Reviews Marquee
- [ ] Performance optimizations
- [ ] Advanced animations

---

## 🛠️ Required WordPress Plugins

### Must Have (Development)
1. **Advanced Custom Fields (ACF) PRO** - For phone post fields
   - Free version OK for now, PRO has repeater fields
   - Install from: wordpress.org/plugins/advanced-custom-fields/

2. **Query Monitor** - Debugging (dev only)
   - Helps debug queries, hooks, performance
   - Install from: wordpress.org/plugins/query-monitor/

### Nice to Have (Development)
3. **WordPress Importer** - For importing phone posts later
4. **User Switching** - Switch between admin/editor easily
5. **Regenerate Thumbnails** - After adding custom image sizes

### Will Need Later (Production)
6. **Google Reviews Plugin** - TBD (Phase 2)
7. **WP Rocket** or similar - Caching (production only)

### DO NOT Install
- ❌ WP Bakery Page Builder (old system, not needed)
- ❌ Any page builder plugins (we're replacing these)
- ❌ Heavy SEO plugins yet (keep it light for dev)

---

## 📁 Folder Structure Setup

### Recommended Structure

```
E:\Josue Munro\Documents\Projects\WebDune\SellmyCell\
│
├── Webdune Blocks Plugin\          ← CURRENT FOLDER (Plugin source)
│   ├── src/
│   ├── includes/
│   ├── webdune-blocks.php
│   ├── package.json
│   └── [all documentation]
│
├── sellmycell-local\               ← FULL SITE (from All-in-One import)
│   └── [will be created later after 3hr export]
│
└── sellmycell-dev\                 ← NEW FRESH DEV SITE
    └── app\
        └── public\
            ├── wp-content\
            │   ├── plugins\
            │   │   └── webdune-blocks\  ← SYMLINK to plugin source
            │   └── uploads\             ← Copy downloaded media here
            ├── wp-config.php
            └── [WordPress files]
```

### Why This Structure?

1. **Plugin Source** (current folder) - This is your main development folder
2. **Fresh Dev Site** - Clean WordPress for initial block development
3. **Full Import Site** - Will have all real data once export completes

---

## 🔗 Setting Up Symlink (Recommended)

Instead of copying the plugin folder, create a **symlink** so changes sync automatically:

### Windows (Git Bash / Admin PowerShell)
```bash
# In Local site plugins directory
cd ~/Local Sites/sellmycell-dev/app/public/wp-content/plugins/

# Create symlink (Windows)
cmd //c mklink //D webdune-blocks "E:\Josue Munro\Documents\Projects\WebDune\SellmyCell\Webdune Blocks Plugin"
```

### Benefits
- Edit files in main plugin folder
- Changes automatically appear in Local site
- Don't duplicate files
- Same folder for both sites later

---

## 💻 Cursor Workspace Setup

### Option 1: Single Workspace (Recommended for Now)
Open just the **plugin folder** in Cursor:
```
E:\Josue Munro\Documents\Projects\WebDune\SellmyCell\Webdune Blocks Plugin
```

**Why**: You're only editing plugin files. WordPress core files you don't touch.

### Option 2: Multi-Root Workspace (Later, if needed)
Create `.code-workspace` file:
```json
{
  "folders": [
    {
      "name": "Plugin Source",
      "path": "E:\\Josue Munro\\Documents\\Projects\\WebDune\\SellmyCell\\Webdune Blocks Plugin"
    },
    {
      "name": "Dev Site Theme",
      "path": "C:\\Users\\[YOU]\\Local Sites\\sellmycell-dev\\app\\public\\wp-content\\themes\\[THEME-NAME]"
    }
  ]
}
```

**For now**: Stick with **Option 1**. You don't need to see WordPress core files.

---

## 🚀 Quick Start Commands

### 1. Create Local Site
In Local by Flywheel:
- Site name: `sellmycell-dev`
- PHP: 8.0+
- Server: Nginx
- MySQL: 8.0

### 2. Set Up Plugin
```bash
# Navigate to Local site plugins folder
cd ~/Local Sites/sellmycell-dev/app/public/wp-content/plugins/

# Create symlink (or copy folder)
# [See symlink instructions above]

# Navigate to plugin
cd webdune-blocks

# Install dependencies
npm install

# Start development
npm start
```

### 3. Set Up ACF Fields (For Phone Search Later)
Don't worry about this yet, but when ready:
- Tools → Import Field Groups
- Import the JSON from client site
- Or manually create:
  - Field Group: "Phone Details"
  - Repeater: `capacity_groups`
  - Repeater: `condition_modifiers`
  - Number: `minimum_price`

### 4. Add Sample Phone Posts
Create 3-5 test posts:
- Title: "Apple iPhone 16 Pro Max"
- Add featured image (phone photo)
- Add ACF fields (capacity + conditions)
- Publish

---

## 🎨 First Block to Build: Process Section

**Why this one first?**
- Simplest block (no dynamic data)
- No AJAX or complex functionality
- Good learning block
- Used on homepage
- Figma: `22:9`

**What it has:**
- Section heading
- 4 numbered steps (heading + description)
- Image on left
- Optional CTA button

**Estimated time**: 1-2 hours

---

## 📊 Progress Tracking

### Phase 1: Foundation & Core (8 blocks)
| Block | Status | Priority | Est. Time |
|-------|--------|----------|-----------|
| Navigation | ✅ **COMPLETE** | HIGH | 2-3 hrs |
| Footer | ✅ **COMPLETE** | HIGH | 2-3 hrs |
| Hero | ✅ **COMPLETE** | HIGH | 2-3 hrs |
| Template Hero | ✅ **COMPLETE** | HIGH | 2-3 hrs |
| Process Section | ✅ **COMPLETE** | HIGH | 1-2 hrs |
| Two Column Flexible | ✅ **COMPLETE** | MEDIUM | 2-3 hrs |
| CTA Section | ✅ **COMPLETE** | MEDIUM | 1-2 hrs |
| FAQ (Parent) | 🔲 **NEXT** | HIGH | 1-2 hrs |
| FAQ Item | 🔲 To Do | HIGH | 1-2 hrs |
| Phone Search | 🔲 To Do | HIGH | 3-4 hrs |

**Phase 1 Progress**: 9/10 blocks (90%)

### Phase 2: Dynamic Content (2 blocks)
- Phone Slider (3-4 hrs)
- Reviews Marquee (3-4 hrs)

### Phase 3: Content & Specialty (6 blocks)
- Various content blocks (~1-2 hrs each)

---

## 🐛 Common Issues & Solutions

### npm install fails
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Plugin doesn't appear
- Check symlink is correct
- Check file permissions
- Restart Local site
- Check `wp-content/plugins/webdune-blocks/webdune-blocks.php` exists

### Build folder empty
```bash
# Make sure npm start is running
npm start

# Or build once
npm run build
```

### Can't see blocks in editor
- Make sure plugin is **activated**
- Check no JavaScript errors in console
- Try `wp cache flush` in Local site shell

### Adding child blocks programmatically (InnerBlocks)
**Problem**: Button to add child blocks doesn't work, nothing appears in editor

**Common mistake**: Using `insertBlock()` incorrectly with InnerBlocks
```javascript
// ❌ WRONG - insertBlock returns a Promise, doesn't work reliably
const { insertBlock } = useDispatch('core/block-editor');
insertBlock(newBlock, undefined, clientId);
```

**Solution**: Use `replaceInnerBlocks()` to append to existing blocks
```javascript
// ✅ CORRECT - replaceInnerBlocks with updated array
const { replaceInnerBlocks } = useDispatch('core/block-editor');

// Get current inner blocks
const innerBlocks = useSelect(
  (select) => {
    const { getBlock } = select('core/block-editor');
    return getBlock(clientId)?.innerBlocks || [];
  },
  [clientId]
);

// Function to add child block
const addChildBlock = () => {
  const newBlock = createBlock('webdune/child-block', {
    // attributes here
  });
  
  // Append to existing blocks
  const updatedBlocks = [...innerBlocks, newBlock];
  
  // Replace with updated array
  replaceInnerBlocks(clientId, updatedBlocks, false);
};
```

**Example blocks**: FAQ Parent, FAQ with ToC, FAQ Category

### Blocks failing to save with emojis or special characters
**Problem**: Block content won't save when emojis (😀) or special characters are added

**Common causes**:
1. Null bytes (`\0`) in the text
2. Zero-width characters that break JSON parsing
3. MySQL not using utf8mb4 collation

**Solution**: Sanitize text attributes before saving
```javascript
// Add sanitization helper function in edit.js
const sanitizeTextAttribute = (value) => {
  if (!value) return value;
  // Remove null bytes that can break database saves
  let sanitized = value.replace(/\0/g, '');
  // Remove problematic zero-width characters
  sanitized = sanitized.replace(/[\u200B-\u200D\uFEFF]/g, '');
  return sanitized;
};

// Apply to all text input onChange handlers
<RichText
  value={text}
  onChange={(value) => setAttributes({ text: sanitizeTextAttribute(value) })}
/>

<TextControl
  value={text}
  onChange={(value) => setAttributes({ text: sanitizeTextAttribute(value) })}
/>
```

**For multi-line text**: Use `TextareaControl` instead of `TextControl`
```javascript
import { TextareaControl } from '@wordpress/components';

<TextareaControl
  label="Review Text"
  value={text}
  onChange={(value) => updateText(sanitizeTextAttribute(value))}
  rows={4}
/>
```

**Fixed blocks**: Reviews Marquee, Two-Column Flexible

**Still having emoji issues?** See `EMOJI-TROUBLESHOOTING.md` for:
- Console debugging tools (auto-loads in editor)
- Database encoding checks
- Step-by-step diagnosis
- Server-side fixes

---

## 📝 Daily Workflow

### Morning Setup
```bash
# 1. Start Local site (if not running)
# 2. Open Cursor to plugin folder
# 3. Open terminal in plugin folder
npm start
# 4. Open browser to: http://sellmycell-dev.local/wp-admin
```

### Development Loop
1. Create/edit block files in `src/blocks/[block-name]/`
2. Save files (npm start auto-compiles)
3. Refresh browser to see changes
4. Test in editor
5. Test on frontend
6. Repeat

### Deployment Workflow

**Before deploying to live site:**

1. **Bump Version Number** (for significant changes)
   ```php
   // Edit webdune-blocks.php
   * Version: 1.0.1  ← Increment this
   
   // Also update the constant
   define('WEBDUNE_BLOCKS_VERSION', '1.0.1');
   ```

2. **Build & Create ZIP**
   ```bash
   npm run plugin-zip
   ```

3. **Tag in Git** (optional but recommended)
   ```bash
   git add .
   git commit -m "feat: add phone slider debugging"
   git tag -a v1.0.1 -m "Version 1.0.1: Phone slider debug improvements"
   git push origin main --tags
   ```

4. **Deploy to Live Site**
   
   **Option A: Automated Deployment (Recommended) 🚀**
   ```bash
   npm run deploy:prod
   ```
   This command will:
   - Build the plugin
   - Create the zip with assets folder
   - Backup existing plugin on server
   - Upload new version via SCP
   - Extract and replace automatically
   - Set proper permissions
   
   **Option B: Manual WordPress Update**
   - Go to Plugins → Installed Plugins
   - Find "Webdune Blocks"
   - Click "Deactivate"
   - Click "Delete" (WordPress will properly clear all files)
   - Go to Plugins → Add New → Upload Plugin
   - Choose `webdune-blocks.zip`
   - Click "Install Now" → "Activate"
   
   **Option C: Manual FTP/File Manager (If needed)**
   - Deactivate plugin in WordPress
   - Wait 30 seconds (let server release file locks)
   - Delete via FTP/File Manager: `wp-content/plugins/webdune-blocks/`
   - Upload new `webdune-blocks.zip` and extract
   - Activate in WordPress
   
   **Why you need the assets folder:**
   - Contains Helvetica World fonts (.woff2 files)
   - Loaded on every page (frontend + editor)
   - Can't be removed without breaking typography
   
   **Deployment Requirements (for automated deploy):**
   - SSH key at `~/.ssh/github_rsa`
   - SSH access to production server
   - Git Bash or Linux/Mac terminal
   
   **If deployment fails:**
   - Check SSH key path and permissions
   - Verify server credentials in `deploy-to-production.sh`
   - Backup is automatically created before deployment
   - Fallback to Option B or C

### Evening Wrap-up
```bash
# Commit progress
git add .
git commit -m "Added Process Section block"
git push

# Stop npm start (Ctrl+C)
# Can leave Local site running
```

---

## 🆘 Need Help?

### Quick Answers
- **Block specs?** → Check BLOCK_INVENTORY.md
- **Current progress?** → Check PROJECT_STATUS.md
- **Design system?** → Check wp_cursor_brief.md
- **How to integrate?** → Check THEME-INTEGRATION-GUIDE.md

### Common Commands
```bash
npm start              # Development (watch mode)
npm run build          # Production build
npm run plugin-zip     # Build + create deployment zip
npm run deploy:prod    # Build + deploy to live site automatically 🚀
wp plugin list         # List plugins (in Local shell)
wp cache flush         # Clear cache (in Local shell)
```

---

## ✅ Today's Checklist

### Setup (30-45 mins)
- [ ] Local site created: `sellmycell-dev`
- [ ] WordPress installed & running
- [ ] ACF plugin installed & activated
- [ ] Plugin folder symlinked to Local site
- [ ] `npm install` completed
- [ ] `npm start` running
- [ ] Plugin activated in WordPress
- [ ] "Webdune Blocks" category visible in editor

### First Block (1-2 hours)
- [ ] Create Process Section block structure
- [ ] Build edit.js (editor component)
- [ ] Build save.js (frontend output)
- [ ] Add basic styles
- [ ] Test in editor
- [ ] Test on frontend
- [ ] Commit to git

### Stretch Goals (if time)
- [ ] Make Process Section responsive
- [ ] Add decorative line option
- [ ] Start Hero block or CTA block

---

## 🎯 Success Metrics

**You'll know setup is working when:**
1. ✅ Local site loads at `http://sellmycell-dev.local`
2. ✅ Can login to WP Admin
3. ✅ "Webdune Blocks" appears in Plugins (activated)
4. ✅ Creating a page shows "Webdune Blocks" category
5. ✅ `npm start` runs without errors
6. ✅ Making a change in `src/` triggers rebuild

**You'll know first block works when:**
1. ✅ Block appears in inserter
2. ✅ Can add block to page
3. ✅ Can edit content inline
4. ✅ Saving/reloading keeps content
5. ✅ Frontend displays correctly
6. ✅ No console errors

---

## 🔄 What Happens After Export Completes

In ~3 hours when All-in-One WP Migration finishes:

1. **Create new Local site**: `sellmycell-local`
2. **Import the full site** with real data
3. **Symlink same plugin folder** to new site
4. **Test blocks with real content**
5. **Continue development** with accurate data

The fresh `sellmycell-dev` site is just for initial building/testing. The `sellmycell-local` site will be your "real" development site with actual phone posts, content, etc.

---

## 🎓 Learning Path

### Day 1 (Today)
- Setup Local + Plugin
- Build Process Section (simple block)
- Understand block structure

### Day 2-3
- Build Hero block (more complex)
- Build FAQ blocks (InnerBlocks pattern)
- Build CTA block (reusable component)

### Day 4-5
- Build Phone Search (AJAX)
- Build Navigation & Footer
- Test responsive design

### Week 2+
- Build Phase 2 & 3 blocks
- Polish & optimize
- Deploy to staging

---

## 💡 Pro Tips

1. **Keep `npm start` running** - Don't restart it for every change
2. **Use browser DevTools** - Check console for errors
3. **Test in editor AND frontend** - Both views are important
4. **Commit often** - Small commits are easier to debug
5. **Follow the patterns** - Use standard section structure
6. **Read WordPress docs** - Block Editor Handbook is excellent
7. **Ask questions** - Better to clarify than guess

---

## 📞 Resources

- **WordPress Block Editor Handbook**: https://developer.wordpress.org/block-editor/
- **@wordpress/components**: https://developer.wordpress.org/block-editor/reference-guides/components/
- **ACF Documentation**: https://www.advancedcustomfields.com/resources/
- **Webflow Export**: Located in `webflow-exported-home-page/` directory

---

**Ready to start?** 🚀

1. Create Local site: `sellmycell-dev`
2. Symlink plugin folder
3. Run `npm install && npm start`
4. Let's build the Process Section block!

**Questions?** Check QUICK_REFERENCE.md or ask!

---

*Remember: The goal isn't perfection on day 1. It's progress. Build, test, learn, iterate.* ✨


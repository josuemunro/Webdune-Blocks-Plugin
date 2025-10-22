# 🚀 START HERE - Webdune Blocks Plugin

**Last Updated**: October 21, 2025  
**Project Status**: Foundation Complete → Ready for Block Development  
**Current Phase**: Setting up Local environment + Building first blocks

---

## 📍 You Are Here

This is the **Webdune Blocks Plugin** for SellMyCell - a custom Gutenberg blocks system that will replace WP Bakery for new pages.

### Current Status
- ✅ Plugin structure created
- ✅ Documentation complete
- ✅ Helper functions ready
- ✅ Shared styles configured
- ✅ Local by Flywheel setup complete
- ✅ Development workflow established
- ✅ Process Section block completed
- 🔄 **IN PROGRESS**: Building Hero block
- ⏳ **WAITING**: All-in-One WP Migration export (~3 hours)

---

## 📚 Documentation Guide

### Read These First
1. **START_HERE.md** ← You are here! Overview and quick navigation
2. **QUICK_REFERENCE.md** - Cheat sheet for common tasks and commands
3. **SETUP_GUIDE.md** - Detailed Local by Flywheel setup instructions

### Reference Documentation
4. **README.md** - Complete project documentation
5. **BLOCK_INVENTORY.md** - All 16 blocks with specifications and Figma nodes
6. **wp_cursor_brief.md** - Original project brief with design system

### Core Plugin Files
7. **webdune-blocks.php** - Main plugin file (auto-registers blocks)
8. **package.json** - Dependencies and npm scripts

---

## 🎯 Current Goals

### Immediate (Today)
- [x] Create Local by Flywheel site: `sellmycell-dev`
- [ ] Install required WordPress plugins
- [ ] Copy plugin folder to `wp-content/plugins/`
- [ ] Run `npm install` in plugin folder
- [ ] Activate plugin in WordPress
- [ ] Build first block (Process Section - easiest start)

### This Week
- [ ] Complete Phase 1 foundation blocks (8 blocks)
- [ ] Set up shared components
- [ ] Test responsive design
- [ ] Document any issues/learnings

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
| Navigation | 🔲 To Do | HIGH | 2-3 hrs |
| Footer | 🔲 To Do | HIGH | 2-3 hrs |
| Hero | 🔲 **NEXT** | HIGH | 2-3 hrs |
| Phone Search | 🔲 To Do | HIGH | 3-4 hrs |
| **Process Section** | ✅ **COMPLETED** | HIGH | 1-2 hrs |
| FAQ (Parent) | 🔲 To Do | HIGH | 1-2 hrs |
| FAQ Item | 🔲 To Do | HIGH | 1-2 hrs |
| CTA Section | 🔲 To Do | MEDIUM | 1 hr |

**Total Phase 1**: ~16-22 hours (2-3 days)

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
- **How do I...?** → Check QUICK_REFERENCE.md
- **Block specs?** → Check BLOCK_INVENTORY.md
- **Setup issues?** → Check SETUP_GUIDE.md
- **Design system?** → Check wp_cursor_brief.md

### Common Commands
```bash
npm start              # Development (watch mode)
npm run build          # Production build
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
- **Figma File**: Open in Figma Desktop with MCP

---

**Ready to start?** 🚀

1. Create Local site: `sellmycell-dev`
2. Symlink plugin folder
3. Run `npm install && npm start`
4. Let's build the Process Section block!

**Questions?** Check QUICK_REFERENCE.md or ask!

---

*Remember: The goal isn't perfection on day 1. It's progress. Build, test, learn, iterate.* ✨


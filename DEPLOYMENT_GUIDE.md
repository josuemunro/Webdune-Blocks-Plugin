# Deployment Guide - Webdune Blocks Plugin

**Last Updated**: October 29, 2025  
**Plugin Version**: 1.0.0  
**Status**: Ready for Production Deployment

---

## 📋 Table of Contents

1. [Git & GitHub Setup](#git--github-setup)
2. [Version Control Strategy](#version-control-strategy)
3. [Pre-Deployment Checklist](#pre-deployment-checklist)
4. [Deployment Methods](#deployment-methods)
5. [Post-Deployment Testing](#post-deployment-testing)
6. [Rollback Procedures](#rollback-procedures)
7. [Troubleshooting](#troubleshooting)

---

## 🔧 Git & GitHub Setup

### Initial GitHub Repository Setup

If you haven't already connected to GitHub:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all files
git add .

# 3. Initial commit
git commit -m "Initial commit: Webdune Blocks Plugin v1.0.0 - All 14 core blocks complete"

# 4. Create a new repository on GitHub (via web interface)
# Go to: https://github.com/new
# Repository name: webdune-blocks-sellmycell
# Description: Custom Gutenberg blocks plugin for SellMyCell
# Private repository (recommended)

# 5. Add remote origin
git remote add origin https://github.com/YOUR-USERNAME/webdune-blocks-sellmycell.git

# 6. Push to GitHub
git branch -M main
git push -u origin main
```

### .gitignore Configuration

Ensure your `.gitignore` includes:

```gitignore
# Dependencies
node_modules/
vendor/

# Build files
build/

# OS files
.DS_Store
Thumbs.db
*~

# IDE files
.vscode/
.idea/
*.sublime-*

# WordPress
wp-config-local.php

# Logs
*.log
npm-debug.log*

# Environment
.env
.env.local

# Temporary files
*.tmp
*.bak
*.swp
```

---

## 📦 Version Control Strategy

### Semantic Versioning

We use **Semantic Versioning** (MAJOR.MINOR.PATCH):

```
1.0.0
│ │ │
│ │ └─ PATCH: Bug fixes, minor CSS tweaks (1.0.1, 1.0.2, etc.)
│ └─── MINOR: New features, new blocks (1.1.0, 1.2.0, etc.)
└───── MAJOR: Breaking changes, major rewrites (2.0.0, 3.0.0, etc.)
```

#### Examples:
- **1.0.0** → Initial release with 14 core blocks
- **1.0.1** → Bug fix for phone slider
- **1.1.0** → Add blog blocks (new feature)
- **1.2.0** → Google My Business API integration (new feature)
- **2.0.0** → Major architecture change (breaking change)

### Branching Strategy

```
main (production-ready code)
│
├── develop (integration branch)
│   │
│   ├── feature/blog-blocks
│   ├── feature/gmb-api
│   ├── bugfix/phone-slider-mobile
│   └── hotfix/critical-nav-issue
```

**Branch Types:**

1. **`main`** - Production-ready code only
2. **`develop`** - Integration branch for features
3. **`feature/*`** - New features (`feature/blog-blocks`)
4. **`bugfix/*`** - Bug fixes (`bugfix/phone-slider-mobile`)
5. **`hotfix/*`** - Critical fixes for production (`hotfix/security-patch`)

### When to Deploy (Version Milestones)

**✅ Deploy on these events:**
- Major version release (v1.0.0, v2.0.0)
- Minor version with new features (v1.1.0, v1.2.0)
- Critical bug fixes (hotfix)
- After thorough testing on staging

**❌ Don't deploy on:**
- Every commit
- Work-in-progress features
- Unreviewed code
- Untested changes

### Version Workflow Example

```bash
# 1. Working on a new feature
git checkout -b feature/blog-blocks

# Make changes, commit frequently
git add src/blocks/blog-grid
git commit -m "feat: add blog grid block"

git add src/blocks/blog-sidebar
git commit -m "feat: add blog sidebar block"

# 2. When feature is complete, merge to develop
git checkout develop
git merge feature/blog-blocks

# 3. Test on staging site

# 4. When ready to release, merge to main and tag
git checkout main
git merge develop

# 5. Update version number in plugin file
# Edit webdune-blocks.php: Version: 1.1.0

# 6. Commit version bump
git add webdune-blocks.php
git commit -m "chore: bump version to 1.1.0"

# 7. Create tag
git tag -a v1.1.0 -m "Release v1.1.0: Add blog blocks"

# 8. Push to GitHub
git push origin main
git push origin v1.1.0
```

---

## ✅ Pre-Deployment Checklist

### Before Every Deployment

- [ ] **Version number updated** in `webdune-blocks.php`
- [ ] **Changelog updated** (or created)
- [ ] **Production build created** (`npm run build`)
- [ ] **All files committed** to Git
- [ ] **Tagged with version** (`git tag v1.0.0`)
- [ ] **Tested locally** with real content
- [ ] **No console errors** in browser
- [ ] **No PHP errors** in logs
- [ ] **Backup current production site** before deployment

### Code Quality Checks

```bash
# Run linting
npm run lint:js
npm run lint:css

# Production build (check for errors)
npm run build

# Check file sizes
ls -lh build/blocks/*/style-*.css
ls -lh build/blocks/*/index-*.js
```

### Update Version Number

Edit `webdune-blocks.php`:

```php
/**
 * Plugin Name:       Webdune Blocks
 * Description:       Custom Gutenberg blocks for SellMyCell
 * Version:           1.0.0  ← UPDATE THIS
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Webdune
 * License:           GPL v2 or later
 * Text Domain:       webdune-blocks
 */
```

---

## 🚀 Deployment Methods

### Method 1: FTP/SFTP (Recommended for Initial Deployment)

**Best for:** First deployment, full plugin installation

#### Step 1: Build Production Assets

```bash
# Navigate to plugin directory
cd /path/to/webdune-blocks

# Install dependencies (if not already)
npm install

# Build production files
npm run build

# Verify build folder has content
ls build/blocks/
```

#### Step 2: Prepare Plugin Folder

```bash
# Remove node_modules (not needed on server)
# Keep: src/, build/, includes/, assets/, *.php, *.md

# Files to upload:
webdune-blocks/
├── assets/
├── build/              ← IMPORTANT
├── includes/
├── src/                ← Optional (not used on server)
├── webdune-blocks.php  ← IMPORTANT
├── package.json        ← Optional
└── *.md files          ← Optional (documentation)
```

#### Step 3: Upload via FTP

```
1. Connect to your server via FTP (FileZilla, Cyberduck, etc.)
2. Navigate to: /wp-content/plugins/
3. Upload entire 'webdune-blocks' folder
4. Ensure permissions are correct (755 for folders, 644 for files)
```

#### Step 4: Activate Plugin

```
1. Go to WordPress Admin → Plugins
2. Find "Webdune Blocks"
3. Click "Activate"
4. Verify no errors appear
```

---

### Method 2: Git Pull on Server (Recommended for Updates)

**Best for:** Updates after initial deployment

#### Prerequisites

- SSH access to server
- Git installed on server
- Plugin folder is a Git repository

#### Deployment Steps

```bash
# 1. SSH into your server
ssh user@your-server.com

# 2. Navigate to plugin directory
cd /path/to/wp-content/plugins/webdune-blocks

# 3. Pull latest changes
git fetch origin
git pull origin main

# 4. Install dependencies (if package.json changed)
npm install

# 5. Build production assets
npm run build

# 6. Set correct permissions
chmod -R 755 .
find . -type f -exec chmod 644 {} \;

# 7. Exit SSH
exit
```

#### Verify Deployment

1. Go to WordPress Admin → Plugins
2. Check plugin version number
3. Test one block on a page
4. Check browser console for errors

---

### Method 3: WP-CLI (Advanced)

**Best for:** Automated deployments, CI/CD

```bash
# SSH into server
ssh user@your-server.com

# Navigate to WordPress root
cd /path/to/wordpress

# Deactivate plugin
wp plugin deactivate webdune-blocks

# Pull latest code
cd wp-content/plugins/webdune-blocks
git pull origin main
npm install
npm run build

# Reactivate plugin
cd /path/to/wordpress
wp plugin activate webdune-blocks

# Clear cache
wp cache flush
```

---

### Method 4: GitHub Actions (CI/CD) - Optional

For automated deployments on push to `main`:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    tags:
      - 'v*'  # Only deploy on version tags

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build production assets
        run: npm run build
      
      - name: Deploy to server
        uses: SamKirkland/FTP-Deploy-Action@4.3.0
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          server-dir: /wp-content/plugins/webdune-blocks/
          exclude: |
            **/.git*
            **/.git*/**
            **/node_modules/**
            **/src/**
```

---

## 🧪 Post-Deployment Testing

### Immediate Checks (Within 5 minutes)

1. **Plugin Activated**
   - WordPress Admin → Plugins
   - Verify "Webdune Blocks" is active
   - Check for any error messages

2. **Block Inserter**
   - Create a new page
   - Click "+" to add block
   - Verify "Webdune Blocks" category appears
   - All 14 blocks should be listed

3. **Frontend Check**
   - Visit a page with existing blocks
   - Check for visual issues
   - Open browser console (F12)
   - Look for JavaScript errors (red text)

4. **PHP Errors**
   - Check WordPress debug log
   - `wp-content/debug.log` (if enabled)
   - No fatal errors should appear

### Detailed Testing (Within 1 hour)

#### Test Hero Block with Phone Search
```
1. Edit homepage
2. Verify phone search bar appears
3. Type a phone name (e.g., "iPhone 16")
4. Check dropdown appears with results
5. Click a result
6. Verify redirect works
```

#### Test Phone Slider with Real Data
```
1. Edit page with phone slider
2. Verify phone posts are loading
3. Check images display correctly
4. Test navigation arrows
5. Test on mobile (responsive)
```

#### Test All Animations
```
1. Navigate to homepage
2. Scroll down slowly
3. Verify stats counter animates
4. Check parallax effects work
5. Test navigation scroll behavior
```

### Performance Testing

```bash
# Use Google PageSpeed Insights
https://pagespeed.web.dev/

# Or GTmetrix
https://gtmetrix.com/

# Target metrics:
- Load time: < 3 seconds
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
```

### Mobile Testing

Test on actual devices:
- iOS (iPhone)
- Android
- Various screen sizes

Or use browser dev tools:
- Chrome DevTools (F12) → Device Toolbar
- Test: 375px (mobile), 768px (tablet), 1440px (desktop)

---

## 🔄 Rollback Procedures

### Quick Rollback via FTP

If something breaks after deployment:

```
1. Connect via FTP
2. Navigate to /wp-content/plugins/
3. Rename folder: webdune-blocks → webdune-blocks-broken
4. Upload previous version from backup
5. Clear browser cache
6. Test site
```

### Rollback via Git

```bash
# SSH into server
ssh user@your-server.com

# Navigate to plugin
cd /path/to/wp-content/plugins/webdune-blocks

# Check current version
git log --oneline -5

# Rollback to previous version
git reset --hard v1.0.0  # or specific commit hash

# Rebuild assets
npm install
npm run build

# Clear WordPress cache
cd /path/to/wordpress
wp cache flush
```

### Deactivate Plugin Emergency

If the plugin is causing critical issues:

**Via WordPress Admin:**
```
1. Go to Plugins page
2. Click "Deactivate" under Webdune Blocks
```

**Via FTP/SSH (if admin is inaccessible):**
```bash
# SSH method
cd /path/to/wp-content/plugins
mv webdune-blocks webdune-blocks.disabled

# Site will automatically deactivate the plugin
```

**Via Database (last resort):**
```sql
-- Connect to database
UPDATE wp_options 
SET option_value = '' 
WHERE option_name = 'active_plugins';

-- This deactivates ALL plugins
-- You'll need to reactivate others manually
```

---

## 🔧 Troubleshooting

### Issue: Blocks Not Appearing

**Symptoms:** "Webdune Blocks" category doesn't show in block inserter

**Solutions:**
```bash
# 1. Check plugin is activated
# WordPress Admin → Plugins

# 2. Clear WordPress cache
wp cache flush

# 3. Clear browser cache
# Chrome: Ctrl+Shift+Delete

# 4. Rebuild assets
npm run build

# 5. Check file permissions
chmod -R 755 webdune-blocks/
```

### Issue: JavaScript Errors

**Symptoms:** Console shows "Uncaught ReferenceError" or similar

**Solutions:**
```bash
# 1. Check build folder exists and has content
ls -la build/blocks/

# 2. Rebuild assets
npm install
npm run build

# 3. Hard refresh browser
# Chrome: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

# 4. Check for JavaScript conflicts
# Temporarily deactivate other plugins
```

### Issue: Styles Not Loading

**Symptoms:** Blocks appear but have no styling

**Solutions:**
```bash
# 1. Check CSS files exist
ls build/blocks/*/style-*.css

# 2. Clear all caches:
# - WordPress cache
# - Browser cache
# - CDN cache (if using Cloudflare, etc.)

# 3. Check file permissions
find build/ -type f -name "*.css" -exec chmod 644 {} \;

# 4. Force rebuild
rm -rf build/
npm run build
```

### Issue: Phone Search Not Working

**Symptoms:** Search doesn't return results or shows errors

**Solutions:**
```bash
# 1. Check AJAX endpoint
# Browser console → Network tab → Look for "admin-ajax.php" requests

# 2. Verify ACF fields exist
# Check one phone post → Custom Fields section

# 3. Check PHP errors
# Review wp-content/debug.log

# 4. Test query manually
# Create test page with this PHP:
<?php
$phones = get_posts(array('post_type' => 'phone', 'posts_per_page' => 5));
var_dump($phones);
?>
```

### Issue: Phone Slider Not Loading

**Symptoms:** Slider shows "No phones found" or doesn't load

**Solutions:**
```
1. Check phone posts exist
   - WordPress Admin → Phones (or custom post type)
   - Ensure at least 3-5 published phone posts

2. Check slider settings
   - Edit block → Inspector → Post Selection Method
   - Try "Latest Posts" first

3. Verify Swiper.js loading
   - Browser console → Check for Swiper errors
   - View page source → Search for "swiper"

4. Check render.php file
   - FTP → includes/phone-slider/render.php
   - Ensure file exists and has correct code
```

---

## 📞 Deployment Support

### Documentation References
- **Setup Guide**: [START_HERE.md](START_HERE.md)
- **Block Specs**: [BLOCK_INVENTORY.md](BLOCK_INVENTORY.md)
- **Phone Search**: [PHONE_SEARCH_IMPLEMENTATION.md](PHONE_SEARCH_IMPLEMENTATION.md)
- **Phone Slider**: [PHONE_SLIDER_IMPLEMENTATION.md](PHONE_SLIDER_IMPLEMENTATION.md)

### Pre-Deployment Consultation

**Before deploying to production, consider:**
- Scheduling deployment during low-traffic hours
- Notifying team members
- Having a backup person available
- Testing on staging environment first

---

## 📝 Deployment Checklist Template

Copy this for each deployment:

```markdown
## Deployment: v1.0.0 - October 29, 2025

### Pre-Deployment
- [ ] Version number updated in webdune-blocks.php
- [ ] Git committed and tagged (v1.0.0)
- [ ] Production build created (`npm run build`)
- [ ] Tested locally with no errors
- [ ] Backup of current production site created
- [ ] Team notified of deployment window

### Deployment
- [ ] Uploaded/pulled to server
- [ ] Plugin activated in WordPress
- [ ] File permissions set correctly

### Post-Deployment Testing
- [ ] All blocks appear in inserter
- [ ] Homepage displays correctly
- [ ] Phone search working with real data
- [ ] Phone slider loading real posts
- [ ] No JavaScript errors in console
- [ ] No PHP errors in debug log
- [ ] Mobile responsive check
- [ ] Page load speed acceptable (< 3s)

### Issues Found
- None / [List any issues]

### Deployed By
[Your Name] - [Date/Time]
```

---

**Ready to deploy?** Follow Method 1 (FTP/SFTP) for your first deployment!

**Questions?** Review the troubleshooting section or check other documentation files.

---

*Last updated: October 29, 2025*
*Plugin Version: 1.0.0*
*Status: Ready for Production* ✅


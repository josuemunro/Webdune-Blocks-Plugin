# Webdune Blocks Plugin - Setup Guide

## 🎯 Project Overview
Building custom Gutenberg blocks for SellMyCell website. This plugin provides native WordPress blocks with inline editing for the client.

---

## 📋 Prerequisites

### Software Required
- ✅ **Local by Flywheel** (latest version)
- ✅ **Node.js** (v16+ recommended)
- ✅ **Git** (for version control)
- ✅ **VS Code** or preferred code editor

### Client Site Access
- Database export from live site
- `wp-content` folder from live site
- Access credentials (if needed)

---

## 🔧 Local by Flywheel Setup

### Step 1: Install Local
1. Download from [localwp.com](https://localwp.com/)
2. Run installer (accept defaults)
3. Launch Local

### Step 2: Create New Site
1. Click **"+ Create a new site"**
2. **Site Name**: `sellmycell-local`
3. **Environment**: 
   - PHP: 8.0 or higher
   - Web Server: Nginx (recommended)
   - MySQL: 8.0
4. **WordPress Setup**:
   - Username: `admin`
   - Password: (your choice - save it!)
   - Email: (your email)
5. Click **"Add Site"**

### Step 3: Import Existing Site (Alternative)
If you have site backup:
1. Click **"+ Create from existing site"**
2. Choose import method:
   - **From ZIP**: If you have All-in-One WP Migration export
   - **From Folder**: If you have files + database dump
3. Follow prompts to import

### Step 4: Verify Installation
1. Right-click site → **"Open Site Shell"**
2. Run: `wp --info`
3. Should see WordPress CLI info

---

## 🗂️ Plugin Installation

### Method 1: Clone This Repo (Once Set Up)
```bash
# In Local site shell
cd wp-content/plugins
git clone [YOUR_REPO_URL] webdune-blocks
cd webdune-blocks
npm install
npm start
```

### Method 2: Manual Setup
1. Navigate to: `[Local Sites Path]/sellmycell-local/app/public/wp-content/plugins/`
2. Copy `webdune-blocks` folder here
3. Open terminal in plugin folder
4. Run:
   ```bash
   npm install
   npm start
   ```

---

## 🧪 Activate Plugin

1. Go to Local site URL (e.g., `http://sellmycell.local`)
2. Login to WP Admin (`/wp-admin`)
3. Navigate to **Plugins**
4. Find "Webdune Blocks"
5. Click **"Activate"**

---

## 🎨 Test Blocks

1. Go to **Pages → Add New**
2. Click **"+"** to add block
3. Look for **"Webdune Blocks"** category
4. Add a block to test!

---

## 📁 Project Structure

```
webdune-blocks/
├── webdune-blocks.php       # Main plugin file
├── package.json              # Dependencies & scripts
├── webpack.config.js         # Build configuration (optional)
├── .gitignore               # Git ignore rules
├── README.md                # Project overview
├── SETUP_GUIDE.md           # This file
├── BLOCK_INVENTORY.md       # Block catalog
│
├── src/                      # Source files
│   ├── index.js             # Main entry point
│   ├── blocks/              # Individual blocks
│   │   ├── hero/
│   │   │   ├── block.json
│   │   │   ├── index.js
│   │   │   ├── edit.js
│   │   │   ├── save.js
│   │   │   └── style.scss
│   │   ├── phone-search/
│   │   ├── process-section/
│   │   ├── faq/
│   │   ├── faq-item/
│   │   └── [more blocks...]
│   │
│   ├── shared/
│   │   ├── layout.scss      # Global layout utilities
│   │   ├── colors.scss      # Color variables
│   │   └── components/      # Shared React components
│   │
│   └── assets/              # Images, icons, fonts
│
├── build/                    # Compiled files (auto-generated)
└── includes/                 # PHP helper functions
```

---

## 🎨 Design Tokens

### Colors
```scss
$color-primary: #FFD940;      // Yellow
$color-dark: #3C3C3C;         // Dark gray
$color-light: #F5F5F7;        // Light gray
$color-white: #FFFFFF;
$color-black: #000000;
```

### Typography
- **Font**: Helvetica World (check license, fallback to Helvetica Neue, Arial)
- **H1**: 80px / 88px line-height
- **H2**: 60px / 64px line-height
- **H3**: 32px / 40px line-height
- **Body**: 18px / 22px line-height

---

## 🔄 Development Workflow

### Daily Development
```bash
# Terminal 1: Watch & compile
npm start

# Terminal 2: Local site shell (for WP CLI commands)
wp --info
```

### Before Committing
```bash
npm run lint:js    # Check JavaScript
npm run lint:css   # Check styles
```

### Build for Production
```bash
npm run build
```

---

## 🐛 Troubleshooting

### Plugin Doesn't Appear
- Check if plugin is activated
- Run `npm run build` in plugin directory
- Clear WordPress cache
- Check browser console for errors

### Blocks Don't Show
- Ensure plugin is active
- Check `build/` folder exists and has files
- Verify block registration in main plugin file
- Check browser console

### npm start Fails
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Local Site Won't Load
- Check Local app is running
- Verify site is started (green indicator)
- Check site URL in Local
- Try stopping and restarting site

---

## 📚 Useful Commands

### WordPress CLI
```bash
# Check WordPress version
wp core version

# List plugins
wp plugin list

# Activate plugin
wp plugin activate webdune-blocks

# Flush rewrite rules
wp rewrite flush

# Export database
wp db export backup.sql
```

### npm Scripts
```bash
npm start          # Development mode (watch)
npm run build      # Production build
npm run format     # Format code
npm run lint:js    # Lint JavaScript
npm run lint:css   # Lint CSS/SCSS
```

---

## 🔐 Git Workflow

### Initial Setup
```bash
git init
git add .
git commit -m "Initial plugin setup"
git remote add origin [YOUR_REPO_URL]
git push -u origin main
```

### Daily Workflow
```bash
# Create feature branch
git checkout -b feature/hero-block

# Work on feature...
git add .
git commit -m "Add hero block with search functionality"

# Push to remote
git push origin feature/hero-block

# Merge to main when ready
git checkout main
git merge feature/hero-block
git push origin main
```

---

## 🚀 Deployment Checklist

Before deploying to live site:

- [ ] Run `npm run build`
- [ ] Test all blocks in Local environment
- [ ] Check responsive design (desktop, tablet, mobile)
- [ ] Verify no console errors
- [ ] Test with real content
- [ ] Check page load speed
- [ ] Backup live site first!
- [ ] Upload via FTP or zip entire plugin folder
- [ ] Activate on live site
- [ ] Test one page thoroughly before rolling out

---

## 📞 Support

- **Documentation**: See README.md
- **Block Inventory**: See BLOCK_INVENTORY.md
- **WordPress Docs**: https://developer.wordpress.org/block-editor/

---

## ✅ Setup Complete!

You're ready to start building. Next steps:
1. ✅ Local site running
2. ✅ Plugin activated
3. ✅ `npm start` running
4. 🎨 Start building blocks!


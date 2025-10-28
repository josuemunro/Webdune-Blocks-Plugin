# Webdune Blocks - Custom Gutenberg Blocks for SellMyCell

A modern WordPress plugin providing custom Gutenberg blocks with true inline editing for the SellMyCell website.

## 🎯 Overview

This plugin creates a suite of custom WordPress blocks specifically designed for SellMyCell, a New Zealand phone repair and buyback business. The blocks provide a clean, intuitive editing experience while maintaining high performance and modern web standards.

**Key Features:**
- ✅ True inline editing (no sidebar-only editing)
- ✅ Native WordPress integration (no plugin dependencies*)
- ✅ Better performance than page builders
- ✅ Modern React development
- ✅ Responsive design built-in
- ✅ Clean, maintainable codebase

*Except for Google Reviews integration in Phase 2

## 📦 Included Blocks

**Progress: 7/16 blocks complete (44%)**

### ✅ Complete (7 blocks)
- Navigation (liquid glass effect, scroll behaviors)
- Footer (newsletter, social, contact info)
- Hero (Homepage with search UI)
- Template Hero (Interior pages, 2 layouts)
- Process Section (4-step numbered)
- Two Column Flexible (gradient underline format)
- CTA Section (3 toggleable buttons)

### 🔲 To Do (9 blocks remaining)
- FAQ (Parent + Child) ← Next priority
- Phone Search (AJAX) ← High priority
- Phone Slider (Swiper.js)
- Reviews Marquee (infinite scroll)
- Content Image Section
- Charity Section
- Stats Section
- Full Width Photo

**Total: 16 custom blocks**

See [BLOCK_INVENTORY.md](BLOCK_INVENTORY.md) for detailed block specifications.

## 🚀 Quick Start

### Prerequisites
- WordPress 6.0+
- PHP 7.4+
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd wp-content/plugins
   git clone [YOUR_REPO_URL] webdune-blocks
   cd webdune-blocks
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development**
   ```bash
   npm start
   ```

4. **Activate the plugin**
   - Go to WordPress Admin → Plugins
   - Find "Webdune Blocks"
   - Click "Activate"

5. **Start building!**
   - Create a new page
   - Click "+" to add a block
   - Find blocks under "Webdune Blocks" category

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup instructions.

## 🛠️ Development

### Available Commands

```bash
# Development mode (watches for changes)
npm start

# Production build
npm run build

# Code formatting
npm run format

# Linting
npm run lint:js      # JavaScript
npm run lint:css     # Styles
npm run lint:pkg-json # package.json

# Create plugin ZIP
npm run plugin-zip
```

### Project Structure

```
webdune-blocks/
├── webdune-blocks.php      # Main plugin file
├── package.json            # Dependencies & scripts
├── README.md               # This file
├── SETUP_GUIDE.md         # Detailed setup guide
├── BLOCK_INVENTORY.md     # Block specifications
│
├── src/                    # Source files
│   ├── blocks/            # Individual blocks
│   ├── shared/            # Shared styles & components
│   └── assets/            # Images, icons, fonts
│
├── build/                  # Compiled files (gitignored)
│
└── includes/              # PHP helper functions
    ├── phone-queries.php
    └── block-helpers.php
```

### Creating a New Block

1. **Use WordPress create-block tool**
   ```bash
   npx @wordpress/create-block [block-name] --namespace webdune --no-plugin
   ```

2. **Move to blocks directory**
   ```bash
   mv [block-name] src/blocks/
   ```

3. **Register in main plugin file**
   Add block name to `$blocks` array in `webdune-blocks.php`

4. **Follow standard structure**
   ```
   src/blocks/[block-name]/
   ├── block.json         # Block registration & metadata
   ├── index.js           # Entry point
   ├── edit.js            # Editor component (React)
   ├── save.js            # Frontend output
   ├── style.scss         # Frontend + editor styles
   └── editor.scss        # Editor-only styles (optional)
   ```

5. **Use standard section structure**
   ```jsx
   <section className="[block-name]-section">
     <div className="padding-global">
       <div className="container-large">
         <div className="[block-name]-content">
           {/* Block content here */}
         </div>
       </div>
     </div>
   </section>
   ```

## 🎨 Design System

### Colors
- **Primary**: `#FFD940` (Yellow)
- **Dark**: `#3C3C3C` (Dark gray)
- **Light**: `#F5F5F7` (Light gray)
- **White**: `#FFFFFF`

### Typography
- **Font**: Helvetica World (fallback: Helvetica Neue, Arial)
- **H1**: 80px / 88px line-height
- **H2**: 60px / 64px line-height  
- **H3**: 32px / 40px line-height
- **Body**: 18px / 22px line-height

### Layout
- **Max Width**: 1240px
- **Horizontal Padding**: 5%
- **Section Padding**: clamp(3rem, 8vw, 6rem)

See `src/shared/colors.scss` and `src/shared/layout.scss` for complete design tokens.

## 🔌 Plugin Architecture

### Block Registration
Blocks are registered automatically in `webdune-blocks.php` by scanning the `build/blocks/` directory.

### Shared Styles
Global layout utilities and color variables are loaded on all pages via `src/shared/layout.scss` and `src/shared/colors.scss`.

### Dynamic Blocks
Some blocks (like Phone Slider) use PHP render callbacks instead of `save.js` for dynamic content that needs to query the database.

### Asset Loading
- Swiper.js loads conditionally only when slider blocks are present
- Block-specific assets are enqueued automatically by WordPress

## 📱 Phone Data Integration

The plugin integrates with WordPress posts representing phone models. Each phone has:

- **Capacity Groups**: Different storage sizes with base prices (16GB, 32GB, etc.)
- **Condition Modifiers**: Price adjustments for phone condition (Flawless, Good, Poor, Broken)
- **Minimum Price**: Floor price regardless of condition

See `includes/phone-queries.php` for query functions.

## 🧪 Testing

### Local Testing
1. Use Local by Flywheel or similar
2. Create test pages with each block
3. Test with real content
4. Check responsive design
5. Verify no console errors

### Pre-Deployment Checklist
- [ ] All blocks working correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] No JavaScript errors
- [ ] No PHP errors
- [ ] Images optimized
- [ ] Tested with real content
- [ ] Performance checked (page load time)
- [ ] Accessibility reviewed

## 🚢 Deployment

### Building for Production

```bash
# Build production assets
npm run build

# Create plugin ZIP (optional)
npm run plugin-zip
```

### Deployment Methods

**Option 1: Direct Upload**
1. Build production files (`npm run build`)
2. Upload entire `webdune-blocks/` folder via FTP to `wp-content/plugins/`
3. Activate in WordPress Admin

**Option 2: ZIP Upload**
1. Create ZIP: `npm run plugin-zip`
2. WordPress Admin → Plugins → Add New → Upload Plugin
3. Upload the ZIP file
4. Activate

**Option 3: WP-CLI** (if you have SSH access)
```bash
wp plugin install webdune-blocks.zip --activate
```

### Post-Deployment
1. Test one page thoroughly
2. Check for any errors
3. Test all blocks
4. Verify mobile responsiveness
5. Check page load speed

## 🔒 Security

- All output is escaped using WordPress functions
- All input is sanitized
- Nonce verification for AJAX
- Capability checks where needed
- Follows WordPress coding standards

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Proper heading hierarchy
- Alt text for all images
- Color contrast compliance (WCAG AA)

## 🌍 Internationalization

All user-facing strings are wrapped in translation functions:
```php
__('Text to translate', 'webdune-blocks')
_e('Text to translate', 'webdune-blocks')
```

Translation files go in `/languages/` directory.

## 🤝 Contributing

This is a private plugin for SellMyCell. For internal development:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request
5. Get review approval
6. Merge to main

## 📄 License

GPL v2 or later

## 🆘 Support

**Documentation:**
- Setup Guide: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- Block Inventory: [BLOCK_INVENTORY.md](BLOCK_INVENTORY.md)
- WordPress Block Editor Docs: https://developer.wordpress.org/block-editor/

**Troubleshooting:**
See [SETUP_GUIDE.md](SETUP_GUIDE.md) → Troubleshooting section

## 📊 Project Status

- **Version**: 1.0.0
- **Status**: In Development
- **Blocks Complete**: 0/16
- **Last Updated**: October 21, 2025

## 🎯 Roadmap

### Phase 1 (Weeks 1-2)
- [ ] Setup & Foundation
- [ ] Navigation & Footer
- [ ] Hero Block
- [ ] Phone Search
- [ ] Process Section
- [ ] FAQ Blocks

### Phase 2 (Week 3)
- [ ] Phone Slider
- [ ] Reviews Marquee
- [ ] CTA Section

### Phase 3 (Week 4)
- [ ] Content blocks
- [ ] Polish & optimization
- [ ] Documentation
- [ ] Deployment

---

**Built with ❤️ by Webdune for SellMyCell**


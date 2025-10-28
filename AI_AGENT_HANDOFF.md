# AI Agent Handoff Document

**Date**: October 28, 2025  
**Project**: Webdune Blocks Plugin for SellMyCell  
**Handoff From**: Previous AI Agent  
**Status**: 5 blocks complete, ready for next block

---

## 🎯 Quick Context

You're working on a **custom Gutenberg blocks plugin** for SellMyCell that will replace WP Bakery. The client has a Webflow export in `sellmycell.webflow/` - that's your source of truth for HTML/CSS.

### What's Done ✅
- Plugin structure complete
- 5 blocks built and working
- Shared styles system (colors, typography, layout, utilities, effects)
- Shared animations (GSAP, Lenis, parallax)
- Build system configured and tested

### What's Next 🎯
- **Footer block** (next priority, 2-3 hours)
- CTA Section block
- Phone Search block (complex, needs AJAX)
- FAQ blocks (parent + child)

---

## 📖 Read These First

**Priority order for onboarding**:

1. **START_HERE.md** - Project overview, setup, workflow
2. **PROJECT_STATUS.md** - Current state, what's done, what's next
3. **NEXT_STEPS.md** - Detailed guide for building footer block
4. **BLOCK_INVENTORY.md** - All blocks with specs
5. **THEME-INTEGRATION-GUIDE.md** - How to integrate nav/footer into theme

---

## 🔧 Essential Commands

```bash
# Development (auto-rebuild on save)
npm start

# Production build
npm run build

# WordPress cache clear (in Local shell)
wp cache flush

# List registered blocks
wp block list | grep webdune
```

---

## 📂 Key Files & Locations

### Source Materials
- `sellmycell.webflow/index.html` - HTML structure for all blocks
- `sellmycell.webflow/css/sellmycell.webflow.css` - All CSS
- `sellmycell.webflow/how-it-works.html` - Interior page example

### Completed Blocks
- `src/blocks/process-section/` ✅
- `src/blocks/hero/` ✅ (homepage hero with phone search UI)
- `src/blocks/two-column-flexible/` ✅ (highly configurable)
- `src/blocks/template-hero/` ✅ (interior pages, 2 layouts)
- `src/blocks/navigation/` ✅ (liquid glass, GSAP, mobile menu)

### Shared Resources
- `src/shared/colors.scss` - Brand colors ($color-primary, $color-dark, etc.)
- `src/shared/typography.scss` - Helvetica World font system
- `src/shared/layout.scss` - Containers, padding
- `src/shared/utilities.scss` - Hide classes, spacing utilities
- `src/shared/effects.scss` - Liquid glass nav effect
- `src/shared/animations.js` - GSAP behaviors, Lenis smooth scroll, parallax

### Core Files
- `src/index.js` - Block registration (add new blocks here)
- `webdune-blocks.php` - Main plugin file (auto-registers blocks)
- `webpack.config.js` - Build configuration (shouldn't need changes)

---

## 🏗️ Block Development Pattern

Every block follows this structure:

```
src/blocks/[block-name]/
├── block.json          # Metadata, attributes, supports
├── index.js            # Registers the block
├── edit.js             # Editor component (inspector controls, preview)
├── save.js             # Frontend HTML output
├── style.scss          # Frontend styles (mobile responsive)
├── editor.scss         # Editor-only styles (optional)
├── view.js             # Frontend JS interactivity (optional)
└── README.md           # Block documentation (optional)
```

### Standard block.json
```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "webdune/block-name",
  "title": "Block Title",
  "category": "webdune",
  "icon": "icon-name",
  "attributes": { ... },
  "editorScript": "file:./index.js",
  "editorStyle": "file:./index.css",
  "style": "file:./style-index.css"
}
```

### Standard edit.js pattern
```javascript
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();
  
  return (
    <>
      <InspectorControls>
        <PanelBody title="Settings">
          {/* Controls here */}
        </PanelBody>
      </InspectorControls>
      
      <div {...blockProps}>
        {/* Block preview */}
      </div>
    </>
  );
}
```

---

## 🎨 Design System Reference

### Colors (from colors.scss)
```scss
$color-primary: #FFD940;  // Yellow
$color-dark: #3C3C3C;     // Dark gray
$color-light: #F5F5F7;    // Light gray
$color-white: #FFFFFF;
$color-brick: #CB6833;
```

### Containers (from layout.scss)
- `.container-small` - 48rem (768px)
- `.container-medium` - 64rem (1024px)
- `.container-large` - 80rem (1280px)

### Section Structure Pattern
```html
<section class="section_block-name">
  <div class="padding-global">
    <div class="w-layout-blockcontainer container-large w-container">
      <!-- Content here -->
    </div>
  </div>
</section>
```

### Breakpoints
- Desktop: Default styles
- Tablet: `@media screen and (max-width: 991px)`
- Mobile Landscape: `@media screen and (max-width: 767px)`
- Mobile Portrait: `@media screen and (max-width: 479px)`

---

## 🚨 Important Notes

### Do's ✅
- **DO** use exact HTML/CSS from Webflow export
- **DO** import shared styles (`@import '../../shared/colors.scss'`)
- **DO** follow existing block patterns
- **DO** test mobile breakpoints
- **DO** run `npm run build` after changes
- **DO** check browser console for errors

### Don'ts ❌
- **DON'T** make up random CSS - use Webflow export
- **DON'T** skip mobile styles - they're in the export
- **DON'T** create inline styles - use SCSS files
- **DON'T** forget to register new blocks in `src/index.js`
- **DON'T** modify `webdune-blocks.php` block array (auto-registers from build/)

---

## 🔍 How to Find Things

### Finding HTML for a Block
```bash
# In sellmycell.webflow/index.html
# Search for: section class="section_[block-name]"
# Example: section class="section_footer"
```

### Finding CSS for a Block
```bash
# In sellmycell.webflow/css/sellmycell.webflow.css
# Search for: .[block-name]_
# Example: .footer2_
```

### Finding Mobile Styles
```bash
# Mobile styles are usually at the bottom of sellmycell.webflow.css
# After line 3000+
# Look for @media queries
```

---

## 🐛 Common Issues & Solutions

### Issue: Build fails with module not found
**Solution**: Check your imports, might be missing a dependency or wrong path

### Issue: Block doesn't appear in editor
**Solution**: 
```bash
npm run build
wp cache flush
# Check browser console for errors
```

### Issue: Styles not applying
**Solution**:
- Check SCSS imports are correct
- Make sure `npm run build` completed successfully
- Hard refresh browser (Ctrl+Shift+R)
- Check specificity (might need more specific selector)

### Issue: Mobile menu not working (nav)
**Solution**:
- Check `view.js` is built (`build/blocks/navigation/view.js`)
- Check browser console for JS errors
- Make sure block.json has `"viewScript": "file:./view.js"`

---

## 💡 Pro Tips

### When Starting a New Block
1. Find it in `sellmycell.webflow/index.html`
2. Copy a similar existing block as starting point
3. Extract CSS from `sellmycell.webflow.css`
4. Update `src/index.js` to import your new block
5. Build and test incrementally

### GSAP Animations
Already set up globally - just works on:
- Elements with `[data-speed]` (parallax)
- `.navbar14_component` (nav behaviors)
- All pages have Lenis smooth scroll

### Testing Workflow
1. Make changes
2. Save (auto-rebuilds if `npm start` is running)
3. Refresh editor/frontend
4. Check browser console
5. Test mobile breakpoints

---

## 📦 What's in the Build

After `npm run build`, you'll find in `build/`:

```
build/
├── blocks/
│   ├── hero/
│   │   ├── index.js              # Block code
│   │   ├── index.asset.php       # Dependencies
│   │   ├── index.css             # Editor styles
│   │   └── style-index.css       # Frontend styles
│   ├── navigation/
│   │   ├── index.js
│   │   ├── view.js               # Frontend interactivity
│   │   ├── index.css
│   │   └── style-index.css
│   └── [other blocks...]
└── shared/
    ├── global-styles.js          # Shared animations
    ├── global-styles.css         # Shared styles
    └── global-styles.asset.php
```

---

## 🎯 Next Block: Footer

The footer is **very similar** to the navigation block. Use these as reference:
- `src/blocks/navigation/` - Structure and patterns
- Lines ~1100+ in `sellmycell.webflow/index.html` - Footer HTML
- Search `.footer2_` in `sellmycell.webflow.css` - Footer CSS

See **NEXT_STEPS.md** for detailed footer development guide.

---

## 🚀 Quick Start (If You're Just Joining)

```bash
# 1. Install dependencies (if needed)
npm install

# 2. Start development mode
npm start

# 3. Check what's built
ls -la build/blocks/

# 4. Read documentation
cat START_HERE.md
cat PROJECT_STATUS.md
cat NEXT_STEPS.md

# 5. Start building footer
mkdir src/blocks/footer
# Copy navigation block as template
# See NEXT_STEPS.md for details
```

---

## 📞 Resources

### WordPress Block Editor Handbook
https://developer.wordpress.org/block-editor/

### WordPress Components
https://developer.wordpress.org/block-editor/reference-guides/components/

### GSAP Documentation
https://gsap.com/docs/v3/

### Lenis Smooth Scroll
https://lenis.darkroom.engineering/

---

## ✅ Pre-Flight Checklist

Before starting work, verify:
- [ ] `npm install` completed successfully
- [ ] `npm start` runs without errors
- [ ] WordPress site is running (Local by Flywheel)
- [ ] Plugin is activated
- [ ] Can see existing blocks in editor
- [ ] Read START_HERE.md
- [ ] Read PROJECT_STATUS.md
- [ ] Read NEXT_STEPS.md

---

## 🎓 Learning from Existing Blocks

### Simple Block
Look at: `src/blocks/process-section/`
- Good for: Understanding basic structure

### Complex Block
Look at: `src/blocks/two-column-flexible/`
- Good for: Array handling, multiple options, complex layouts

### Interactive Block
Look at: `src/blocks/navigation/`
- Good for: Frontend JS (view.js), mobile menu, GSAP integration

---

## 🏁 You're Ready to Go!

Everything is set up, documented, and working. The patterns are established. Just follow the existing block structure and adapt for your new block.

**Good luck!** 🚀

---

**Last Updated**: October 28, 2025  
**Build Status**: ✅ All blocks building successfully  
**Test Status**: ✅ All completed blocks tested  
**Ready For**: Footer block development

---

*P.S. If something isn't clear, check the existing block files - they're your best documentation!*


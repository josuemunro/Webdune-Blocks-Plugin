# Navigation & Footer Implementation Guide

**Date**: October 28, 2025  
**Purpose**: Answer key questions about implementing nav/footer blocks in WordPress

---

## 🤔 Your Questions Answered

### 1. **WordPress Default Nav/Footer - Do we turn them off?**

**Answer**: Yes and No - it depends on your theme approach.

#### Option A: Block Theme (Recommended) ✅

**Best for**: Full control, modern WordPress

- Use WordPress **Full Site Editing (FSE)** / Block Themes
- No default nav/footer - you build everything with blocks
- Replace theme's `header.html` and `footer.html` templates
- Your blocks become the actual site structure

**How it works**:
```
themes/your-theme/
  ├── templates/
  │   ├── header.html     ← Your nav block
  │   └── footer.html     ← Your footer block
  └── theme.json
```

**Pros**:
- Complete control
- No theme interference
- True block-based experience
- Can use your blocks in template editor

#### Option B: Classic Theme with Hooks 🟡

**If using existing theme** (like GeneratePress, Astra, etc.)

You'll need to:
1. **Disable theme's nav**: `remove_action('wp_head', 'theme_navigation')`
2. **Disable theme's footer**: `remove_action('wp_footer', 'theme_footer')`
3. **Add your blocks** via hooks or template overrides

**Example code** (in your plugin):
```php
// In webdune-blocks.php or separate file

// Remove theme's default header/footer
add_action('after_setup_theme', function() {
  // These vary by theme - check theme's hooks
  remove_action('genesis_header', 'genesis_do_header');
  remove_action('genesis_footer', 'genesis_do_footer');
});

// Add your blocks in specific locations
add_action('wp_body_open', function() {
  echo do_blocks('<!-- wp:webdune/navigation /-->');
});

add_action('wp_footer', function() {
  echo do_blocks('<!-- wp:webdune/footer /-->');
}, 1); // Priority 1 = very early
```

#### Our Recommendation: **Block Theme**

Since you're building custom blocks anyway, might as well go full FSE:

**Benefits**:
- No conflicts with theme nav/footer
- Cleaner implementation
- More maintainable
- Clients can edit nav/footer in Site Editor

---

### 2. **Custom Styles - Where should they go?**

You have custom styles in `.custom-styles` div:
- Liquid glass nav background
- Gradient underlines
- Responsive font sizing
- Utility classes

#### Recommended Structure:

```
src/shared/
├── global-styles.scss         ← Main entry point
├── utilities.scss             ← Utility classes (NEW)
├── effects.scss               ← Liquid glass, etc (NEW)
├── custom-underlines.scss     ← Gradient underlines (NEW)
└── responsive-fonts.scss      ← Fluid typography (NEW)
```

**Then in `global-styles.scss`**:
```scss
// Existing
@import './colors.scss';
@import './typography.scss';
@import './layout.scss';
@import './theme-overrides.scss';

// Add these
@import './utilities.scss';      // Hide classes, spacing, etc
@import './effects.scss';        // Liquid glass nav
@import './custom-underlines.scss';  // Your gradient underline format
@import './responsive-fonts.scss';   // Fluid font sizing
```

#### Why not just dump it all in one file?

- **Maintainability**: Easy to find/edit specific styles
- **Reusability**: Import effects only where needed
- **Block-specific**: Nav block can import effects.scss
- **Performance**: Can conditionally load effects

#### Alternative: Block-Specific Styles

For nav-only styles (liquid glass):
```scss
// In src/blocks/navigation/style.scss
@import '../../shared/colors.scss';

// Nav-specific liquid glass effect
.navbar14_container {
  // ... styles from custom-styles div
}
```

---

### 3. **Parallax & Scrolling Scripts - Where do they go?**

Currently in `sellmycell.webflow/index.html`:
- GSAP
- ScrollTrigger
- Lenis smooth scroll
- Parallax animations
- Nav show/hide on scroll
- Nav background color change

#### Recommended Approach:

**Create**: `src/shared/animations.js`

```javascript
// GSAP animations and scroll behaviors
// Loaded globally when needed

export function initSmoothScroll() {
  // Lenis initialization
}

export function initParallax() {
  // Parallax effect for [data-speed] elements
}

export function initNavScrollBehavior() {
  // Nav hide/show, background color change
}

// Auto-init on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initParallax();
    initNavScrollBehavior();
  });
}
```

**Register in PHP** (`webdune-blocks.php`):

```php
/**
 * Enqueue GSAP and animation scripts
 */
function webdune_blocks_enqueue_animations() {
  // Only on frontend
  if (is_admin()) {
    return;
  }

  // GSAP from CDN
  wp_enqueue_script(
    'gsap',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
    array(),
    '3.12.2',
    true // Footer
  );

  wp_enqueue_script(
    'gsap-scrolltrigger',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
    array('gsap'),
    '3.12.2',
    true
  );

  wp_enqueue_script(
    'lenis',
    'https://unpkg.com/lenis@1.3.11/dist/lenis.min.js',
    array(),
    '1.3.11',
    true
  );

  // Your custom animations
  $animations_js = WEBDUNE_BLOCKS_BUILD_URL . 'shared/animations.js';
  $animations_js_path = WEBDUNE_BLOCKS_BUILD_DIR . 'shared/animations.js';

  if (file_exists($animations_js_path)) {
    wp_enqueue_script(
      'webdune-animations',
      $animations_js,
      array('gsap', 'gsap-scrolltrigger', 'lenis'),
      filemtime($animations_js_path),
      true
    );
  }
}
add_action('wp_enqueue_scripts', 'webdune_blocks_enqueue_animations');
```

#### Alternative: Conditional Loading

Only load when nav block is present:

```php
function webdune_blocks_enqueue_animations() {
  global $post;
  
  // Check if page has nav block
  if (is_a($post, 'WP_Post') && has_block('webdune/navigation', $post)) {
    // Enqueue scripts...
  }
}
```

**Pros**: Better performance (only load when needed)  
**Cons**: Nav is usually on every page anyway

---

## 🎯 Recommended Setup for Navigation Block

Based on your export, here's the ideal structure:

### File Structure:
```
src/blocks/navigation/
├── block.json
├── index.js
├── edit.js              ← Editor view
├── save.js              ← Frontend output
├── style.scss           ← Frontend styles (includes liquid glass)
├── editor.scss          ← Editor styles
├── view.js              ← Frontend interactivity (mobile menu)
└── README.md

src/shared/
├── animations.js        ← GSAP, Lenis, parallax, nav behavior
└── effects.scss         ← Liquid glass effect (imported by nav)
```

### What goes where:

**style.scss** (Nav block):
```scss
@import '../../shared/colors.scss';
@import '../../shared/effects.scss';  // Liquid glass

.navbar14_component {
  // Nav structure styles
}

.navbar14_container {
  // Use liquid glass from effects.scss
  @extend .liquid-glass;  // or include mixin
}
```

**animations.js** (Shared):
```javascript
// All scroll behaviors
// Auto-runs on page load
// Works with any nav on any page
```

**view.js** (Nav block):
```javascript
// Nav-specific JS
// Mobile menu toggle
// Dropdown interactions
```

---

## 🔧 Implementation Order

1. **First**: Create shared files
   - `src/shared/effects.scss` (liquid glass)
   - `src/shared/animations.js` (GSAP behaviors)
   - Register animations in PHP

2. **Then**: Build nav block
   - Import effects.scss for liquid glass
   - Nav behaviors handled by animations.js
   - Focus on structure and editability

3. **Finally**: Test
   - Nav appears/hides on scroll
   - Background changes on scroll
   - Liquid glass effect works
   - Mobile menu functions

---

## 📝 Quick Decision Matrix

| Question | Answer |
|----------|--------|
| **Where: Liquid glass styles?** | `src/shared/effects.scss` → imported by nav |
| **Where: Gradient underline?** | `src/shared/custom-underlines.scss` → global |
| **Where: GSAP scroll behaviors?** | `src/shared/animations.js` → auto-loads |
| **Where: Mobile menu toggle?** | `src/blocks/navigation/view.js` |
| **Where: Parallax for images?** | `src/shared/animations.js` (checks for `[data-speed]`) |
| **Disable theme nav?** | Not needed if using FSE / Block Theme |
| **Scripts in footer?** | Yes - enqueue with `$in_footer = true` |

---

## 💡 Best Practices

1. **Shared styles**: Anything used by 2+ blocks
2. **Block styles**: Unique to one block only
3. **Effects/animations**: Global behaviors, loaded once
4. **Block behaviors**: Specific interactions, loaded per block
5. **CDN for libraries**: GSAP, Lenis (faster, cached)
6. **Bundle your code**: animations.js, view.js (via webpack)

---

## 🎬 Ready to Build Nav Block?

**Next Steps**:
1. Extract nav HTML from `sellmycell.webflow/index.html`
2. Create `src/shared/effects.scss` for liquid glass
3. Create `src/shared/animations.js` for scroll behaviors
4. Build the nav block (attributes: logo, menu items, etc.)
5. Register scripts in `webdune-blocks.php`
6. Test on a page with the nav block

**Want me to start building?** I can:
- Extract exact nav HTML/CSS from your export
- Set up the shared files properly
- Build the nav block structure
- Handle all the GSAP/Lenis integration

---

**Questions before we start?** 🚀


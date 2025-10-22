# WordPress Custom Gutenberg Blocks Plugin - Development Brief

## Project Overview
Building a custom Gutenberg blocks plugin called "Webdune Blocks" for a phone repair business (SellMyCell). The existing site uses WP Bakery Page Builder and has legacy pages that must remain untouched. We're creating new native Gutenberg blocks that provide true inline editing for the client while maintaining clean, performant code.

### ✅ Project Decisions (January 21, 2025)
- **Plugin Name**: "Webdune Blocks" (clear distinction from existing site components)
- **Block Namespace**: `webdune` (e.g., `webdune/hero`)
- **Total Blocks**: 16 blocks across 3 phases
- **Google Reviews**: Start with existing plugin, custom integration later
- **Slider Library**: Swiper.js (desktop marquee → mobile slider)
- **Phone Data**: WordPress Posts with ACF fields (capacities + conditions)
- **Navigation/Footer**: Built as blocks for easy client editing
- **Mobile Designs**: Homepage mobile design in Figma, other pages desktop-only
- **Development Approach**: Complete homepage first, then extend to other pages
- **Local Development**: Using Local by Flywheel with duplicate of live site

## Technical Stack
- **CMS**: WordPress (existing installation with WP Bakery, ACF, WooCommerce)
- **Development Approach**: Custom Gutenberg blocks plugin (native WordPress blocks)
- **Block Framework**: `@wordpress/create-block` scaffold
- **Frontend**: React (for block editor), modern CSS, Vanilla JS
- **Build Tools**: WordPress Scripts (webpack under the hood)
- **Version Control**: Git (plugin folder only)
- **Local Development**: Local by Flywheel or similar
- **Deployment**: FTP/SFTP plugin upload to live site

## Why Custom Blocks (Not ACF/Page Builders)
- True inline editing experience (edit directly on canvas, not sidebars)
- Native WordPress integration (no plugin dependencies)
- Better performance than page builders
- Modern React development workflow
- Future-proof (WordPress's direction)
- Clean, maintainable codebase
- Client gets best-in-class UX

## Plugin Structure
```
wp-content/plugins/webdune-blocks/
├── webdune-blocks.php            # Main plugin file
├── package.json                  # Build dependencies
├── webpack.config.js             # Optional custom webpack config
├── src/                          # Source files
│   ├── blocks/
│   │   ├── hero/
│   │   │   ├── block.json       # Block registration & metadata
│   │   │   ├── edit.js          # Editor (React component)
│   │   │   ├── save.js          # Frontend output
│   │   │   ├── style.scss       # Frontend + editor styles
│   │   │   └── editor.scss      # Editor-only styles (optional)
│   │   ├── hero-simple/         # Variant hero block
│   │   ├── faq/
│   │   ├── faq-item/            # Nested block for FAQ
│   │   ├── cta/
│   │   ├── reviews/
│   │   ├── phone-slider/
│   │   ├── content-section/     # Reusable general content block
│   │   └── [5 more blocks as needed]
│   ├── shared/
│   │   ├── layout.scss          # Global layout utilities
│   │   ├── components/          # Shared React components
│   │   └── utils.js             # Helper functions
│   └── index.js                 # Entry point (registers all blocks)
├── build/                        # Compiled files (gitignored)
├── assets/                       # Static assets
└── README.md
```

## Standard Section Structure
Every block should follow this consistent HTML structure for layout:

```jsx
<section className="[block-name]-section">
  <div className="padding-global">
    <div className="container-large">
      <div className="[block-name]-content">
        {/* Block-specific content here */}
      </div>
    </div>
  </div>
</section>
```

**Layout CSS (shared across all blocks):**
```scss
// src/shared/layout.scss
.padding-global {
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 0;
  padding-bottom: 0;
}

.container-large {
  max-width: 1240px;
  margin: 0 auto;
  width: 100%;
}

section {
  padding-top: clamp(3rem, 8vw, 6rem);
  padding-bottom: clamp(3rem, 8vw, 6rem);
}

// Responsive adjustments
@media (max-width: 768px) {
  .padding-global {
    padding-left: 5%;
    padding-right: 5%;
  }
}
```

This structure keeps layouts consistent and makes styling predictable across all blocks.

## Required Blocks

### 1. Hero Block (Primary)
**Attributes:**
- Heading (RichText)
- Subheading (RichText)
- Background Image (MediaUpload)
- CTA Button (text, URL, opens in new tab toggle)
- Layout variant (centered, left-aligned, etc.)

**Features:**
- Inline editable text
- Image upload with preview
- Link picker for CTA
- Style variations via block styles API

### 2. Hero Block (Simple Variant)
Lighter version for internal pages

### 3. Content Section Block
**Attributes:**
- Heading (RichText)
- Body content (RichText or InnerBlocks for flexibility)
- Optional image (MediaUpload)
- Image position (left/right toggle)

### 4. FAQ Block
**Structure:**
- Uses **InnerBlocks** to allow adding multiple FAQ items
- Allows only `sellmycell/faq-item` child blocks
- Accordion functionality with vanilla JS

### 5. FAQ Item Block (Nested)
**Attributes:**
- Question (RichText)
- Answer (RichText)
- Default to closed/open toggle

### 6. CTA Block
**Attributes:**
- Heading (RichText)
- Description (RichText)
- Button text and URL
- Background color options
- Layout style (centered, full-width, etc.)

### 7. Google Reviews Block
**Integration:**
- Connect to existing Google Reviews API/plugin
- Display reviews in grid/slider
- Star ratings, review text, author name
- **Note:** Investigate existing implementation on site first

### 8. Phone Slider Block
**Integration:**
- Query from existing phone database (standard WordPress posts)
- Display as carousel/slider
- Phone image, name, price
- Link to phone detail page
- **Note:** Check existing database structure first

### 9-11. Additional Content Blocks
Based on design needs:
- Text + Image combinations
- Grid layouts for features
- Testimonials
- Stats/numbers section
- etc.

## Block Development Pattern

### Basic Block Structure (Hero Example)

**block.json:**
```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "webdune/hero",
  "title": "Hero Section",
  "category": "webdune",
  "icon": "cover-image",
  "description": "Main hero section with heading, subheading, image, and CTA",
  "keywords": ["hero", "header", "banner"],
  "attributes": {
    "heading": {
      "type": "string",
      "default": ""
    },
    "subheading": {
      "type": "string",
      "default": ""
    },
    "backgroundImage": {
      "type": "object",
      "default": {}
    },
    "ctaText": {
      "type": "string",
      "default": "Learn More"
    },
    "ctaUrl": {
      "type": "string",
      "default": ""
    },
    "ctaOpenInNewTab": {
      "type": "boolean",
      "default": false
    }
  },
  "supports": {
    "align": ["wide", "full"],
    "anchor": true
  },
  "textdomain": "webdune-blocks",
  "editorScript": "file:./index.js",
  "style": "file:./style-index.css"
}
```

**edit.js (Editor View - React):**
```jsx
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();
  const { heading, subheading, backgroundImage, ctaText, ctaUrl, ctaOpenInNewTab } = attributes;

  return (
    <>
      {/* Sidebar Settings */}
      <InspectorControls>
                  <PanelBody title={__('CTA Settings', 'webdune-blocks')}>
          <TextControl
            label={__('Button URL', 'webdune-blocks')}
            value={ctaUrl}
            onChange={(value) => setAttributes({ ctaUrl: value })}
          />
          <ToggleControl
            label={__('Open in new tab', 'webdune-blocks')}
            checked={ctaOpenInNewTab}
            onChange={(value) => setAttributes({ ctaOpenInNewTab: value })}
          />
        </PanelBody>
      </InspectorControls>

      {/* Block Content */}
      <section {...blockProps} className="hero-section">
        <div className="padding-global">
          <div className="container-large">
            <div className="hero-content">
              <RichText
                tagName="h1"
                value={heading}
                onChange={(value) => setAttributes({ heading: value })}
                placeholder={__('Enter heading...', 'webdune-blocks')}
                className="hero-heading"
              />
              
              <RichText
                tagName="p"
                value={subheading}
                onChange={(value) => setAttributes({ subheading: value })}
                placeholder={__('Enter subheading...', 'webdune-blocks')}
                className="hero-subheading"
              />

              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(media) => setAttributes({ backgroundImage: media })}
                  allowedTypes={['image']}
                  value={backgroundImage.id}
                  render={({ open }) => (
                    <div className="hero-image-upload">
                      {backgroundImage.url ? (
                        <>
                          <img src={backgroundImage.url} alt="" />
                          <Button onClick={open} variant="secondary">
                            {__('Change Image', 'webdune-blocks')}
                          </Button>
                        </>
                      ) : (
                        <Button onClick={open} variant="primary">
                          {__('Upload Image', 'webdune-blocks')}
                        </Button>
                      )}
                    </div>
                  )}
                />
              </MediaUploadCheck>

              <RichText
                tagName="span"
                value={ctaText}
                onChange={(value) => setAttributes({ ctaText: value })}
                placeholder={__('Button text...', 'webdune-blocks')}
                className="hero-cta"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

**save.js (Frontend Output):**
```jsx
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save();
  const { heading, subheading, backgroundImage, ctaText, ctaUrl, ctaOpenInNewTab } = attributes;

  return (
    <section {...blockProps} className="hero-section">
      <div className="padding-global">
        <div className="container-large">
          <div className="hero-content">
            {heading && (
              <RichText.Content tagName="h1" value={heading} className="hero-heading" />
            )}
            
            {subheading && (
              <RichText.Content tagName="p" value={subheading} className="hero-subheading" />
            )}

            {backgroundImage.url && (
              <img src={backgroundImage.url} alt={backgroundImage.alt || ''} className="hero-image" />
            )}

            {ctaText && ctaUrl && (
              <a 
                href={ctaUrl} 
                className="hero-cta button"
                target={ctaOpenInNewTab ? '_blank' : '_self'}
                rel={ctaOpenInNewTab ? 'noopener noreferrer' : undefined}
              >
                <RichText.Content tagName="span" value={ctaText} />
              </a>
            )}
          </div>
        </div>
      </section>
  );
}
```

### InnerBlocks Pattern (FAQ Example)

**FAQ parent block using InnerBlocks:**
```jsx
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit() {
  const blockProps = useBlockProps();
  
  const ALLOWED_BLOCKS = ['webdune/faq-item'];
  const TEMPLATE = [
    ['webdune/faq-item', {}],
    ['webdune/faq-item', {}],
  ];

  return (
    <section {...blockProps} className="faq-section">
      <div className="padding-global">
        <div className="container-large">
          <div className="faq-content">
            <InnerBlocks
              allowedBlocks={ALLOWED_BLOCKS}
              template={TEMPLATE}
              renderAppender={InnerBlocks.ButtonBlockAppender}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

## Development Workflow

### Initial Setup

1. **Pull existing site locally:**
   ```bash
   # Use Local by Flywheel or similar to clone their site
   # You'll need database export + wp-content folder
   ```

2. **Create plugin directory:**
   ```bash
   cd wp-content/plugins
   mkdir webdune-blocks
   cd webdune-blocks
   ```

3. **Initialize first block:**
   ```bash
   npx @wordpress/create-block hero --namespace webdune
   ```

4. **Set up for multiple blocks:**
   - Move block into `src/blocks/hero/`
   - Create main plugin file `webdune-blocks.php`
   - Set up build process to compile all blocks

5. **Install dependencies:**
   ```bash
   npm install
   ```

6. **Start development server:**
   ```bash
   npm start
   # Watches files, hot reloads in WP block editor
   ```

### Adding More Blocks

For each new block:
```bash
npx @wordpress/create-block [block-name] --namespace webdune --no-plugin
# Move into src/blocks/[block-name]/
# Register in main plugin file
```

### Main Plugin File Structure

**webdune-blocks.php:**
```php
<?php
/**
 * Plugin Name: Webdune Blocks
 * Description: Custom Gutenberg blocks for modern WordPress sites
 * Version: 1.0.0
 * Author: Webdune
 * Text Domain: webdune-blocks
 */

if (!defined('ABSPATH')) {
    exit;
}

// Register custom block category
function webdune_block_category($categories) {
    return array_merge(
        $categories,
        [
            [
                'slug'  => 'webdune',
                'title' => 'Webdune Blocks',
                'icon'  => 'layout',
            ],
        ]
    );
}
add_filter('block_categories_all', 'webdune_block_category', 10, 2);

// Register all blocks
function webdune_register_blocks() {
    $blocks = [
        'hero',
        'hero-simple',
        'faq',
        'faq-item',
        'cta',
        'reviews',
        'phone-slider',
        'content-section',
        // Add more blocks here
    ];

    foreach ($blocks as $block) {
        register_block_type(__DIR__ . '/build/blocks/' . $block);
    }
}
add_action('init', 'webdune_register_blocks');

// Enqueue shared styles globally if needed
function webdune_enqueue_shared_styles() {
    wp_enqueue_style(
        'webdune-shared-styles',
        plugins_url('build/shared/layout.css', __FILE__),
        [],
        filemtime(plugin_dir_path(__FILE__) . 'build/shared/layout.css')
    );
}
add_action('wp_enqueue_scripts', 'webdune_enqueue_shared_styles');
add_action('admin_enqueue_scripts', 'webdune_enqueue_shared_styles');
```

### Build Configuration

**package.json:**
```json
{
  "name": "webdune-blocks",
  "version": "1.0.0",
  "scripts": {
    "build": "wp-scripts build",
    "start": "wp-scripts start",
    "format": "wp-scripts format",
    "lint:css": "wp-scripts lint-style",
    "lint:js": "wp-scripts lint-js"
  },
  "devDependencies": {
    "@wordpress/scripts": "^27.0.0"
  }
}
```

### Testing Locally

1. Activate plugin in WP admin
2. Create new page or edit existing
3. Click "+" to add block
4. Look for "Webdune Blocks" category
5. Select your custom blocks
6. Edit inline, see changes immediately
7. Preview/publish page

### Deployment

1. **Build production assets:**
   ```bash
   npm run build
   ```

2. **Prepare plugin:**
   - Ensure all files in `build/` directory
   - Remove `node_modules/` (not needed on server)
   - Keep: plugin PHP file, build folder, README

3. **Upload to live site:**
   ```bash
   # Via FTP: Upload entire plugin folder to wp-content/plugins/
   # Or via WP CLI if you have SSH:
   wp plugin install webdune-blocks.zip --activate
   ```

4. **Activate plugin** in WordPress admin → Plugins

5. **Client can now use blocks:**
   - Edit page → Add block → Webdune Blocks category
   - All your custom blocks appear
   - True inline editing experience

## Integration Points

### Phone Database
**Investigation needed:**
- Check if "Posts" are being used for phones (as seen in screenshot)
- Determine post meta structure
- Phone attributes: model, brand, repair price, etc.

**Phone Slider Block approach:**
```jsx
// Use WordPress REST API or WP_Query in PHP render callback
// For dynamic blocks, use render_callback in block.json instead of save.js

// block.json
{
  "render": "file:./render.php"
}

// render.php
<?php
$args = [
    'post_type' => 'post', // or 'phone' if custom post type
    'posts_per_page' => 10,
    // Query phone posts
];
$phones = new WP_Query($args);
// Output slider HTML
?>
```

### Google Reviews
- Check existing implementation (plugin or custom)
- May use Google Places API
- Reviews block can fetch and display with custom styling
- Consider caching to avoid API rate limits

### Blog Integration
- "Blogs" custom post type (seen in screenshot)
- Blog hub page uses standard WP_Query
- Individual blog posts use single.php template (or custom block for post content)

## WordPress Best Practices

### Coding Standards
- Follow WordPress coding standards
- Use `esc_html()`, `esc_url()`, `esc_attr()` for output
- Sanitize all input
- Internationalization: wrap strings in `__()` or `_e()`
- Use `wp_enqueue_script/style` for assets

### Performance
- Conditional loading: only load block assets when block is used
- Optimize images before upload
- Minify production builds (handled by wp-scripts)
- Use WordPress caching APIs where appropriate
- Lazy load images with `loading="lazy"` attribute

### Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Proper heading hierarchy
- Alt text for all images
- Color contrast compliance

### Security
- Nonce verification for any AJAX calls
- Capability checks for admin functionality
- Escape all output
- Sanitize all input
- Use WordPress APIs (don't reinvent the wheel)

## Client Experience

### How Editing Works
1. Client logs into WordPress admin
2. Goes to Pages → Edit page
3. Clicks "+" button in editor
4. Sees "SellMyCell Blocks" category with all your custom blocks
5. Selects block (e.g., "Hero Section")
6. **Edits directly on canvas:**
   - Clicks heading → types new heading
   - Clicks subheading → edits text
   - Clicks image → uploads new one
   - CTA settings in sidebar (URL, open in new tab)
7. Saves page → changes go live

**Key difference from WP Bakery:**
- No drag-and-drop rearranging (unless you implement)
- Cleaner, more constrained interface
- Can't break design
- Faster, more intuitive editing

### Page Updates vs Overwrites
- Blocks are **modular** - client can add/remove individual blocks
- Each block maintains its own content
- No "overwriting" entire pages
- Can mix your blocks with native WordPress blocks (paragraph, image, etc.)
- Old WP Bakery pages remain untouched
- New pages use your blocks exclusively

## Version Control Strategy

**Git structure:**
```
.gitignore:
node_modules/
build/
*.log
.DS_Store
```

**What to commit:**
- All `src/` files
- `package.json` and `package-lock.json`
- Main plugin PHP file
- README and documentation
- NOT `build/` folder (regenerate with `npm run build`)

**Branches:**
- `main` - stable, deployed code
- `develop` - active development
- Feature branches for new blocks

## Troubleshooting

### Block doesn't appear in editor
- Check plugin is activated
- Verify block is registered in main plugin file
- Run `npm run build` if using production
- Clear WordPress cache

### Styles not loading
- Check style handles in block.json
- Verify file paths
- Clear browser cache
- Check console for 404 errors

### InnerBlocks not working
- Ensure allowed blocks are registered
- Check block nesting settings
- Verify save function includes `<InnerBlocks.Content />`

## Success Criteria
- ✅ All 8-11 blocks built and functional
- ✅ Client can edit content inline without code
- ✅ Pages load fast (better performance than WP Bakery)
- ✅ Consistent layout structure across all blocks
- ✅ Old WP Bakery pages continue working
- ✅ Plugin easily deployable via FTP
- ✅ Code is clean, commented, maintainable
- ✅ Version controlled and documented

## Resources
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [@wordpress/create-block](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/)
- [Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
- [InnerBlocks Documentation](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/inner-blocks)

---

**Next Steps:**
1. Set up local WordPress environment with their existing site
2. Create plugin structure
3. Build first block (hero) to validate workflow
4. Iterate on remaining blocks
5. Test with client for editing UX
6. Deploy to live site
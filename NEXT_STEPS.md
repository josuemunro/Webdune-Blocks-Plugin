# Next Steps - For New Developer/AI

**Date**: October 28, 2025  
**Current State**: 5 blocks complete, foundation solid, ready for next block  
**Next Block**: Footer

---

## 🎯 Immediate Next Task: Footer Block

The footer block is very similar to the navigation block you just built. Here's how to approach it:

### 1. Locate Footer in Webflow Export

```bash
# In sellmycell.webflow/index.html, search for:
"footer2" or "section_footer"
```

The footer section starts around line 1100+ in `index.html`.

### 2. Create Footer Block Structure

```bash
mkdir src/blocks/footer
```

Create these files:
- `block.json` - Copy from navigation, adjust attributes
- `index.js` - Standard registration
- `edit.js` - Editor component
- `save.js` - Frontend output
- `style.scss` - Frontend styles
- `editor.scss` - Editor styles

### 3. Footer Attributes (Suggested)

```json
{
  "logo": { "type": "object" },
  "tagline": { "type": "string" },
  "quickLinks": { "type": "array" },
  "officeHours": { "type": "string" },
  "email": { "type": "string" },
  "phone": { "type": "string" },
  "address": { "type": "string" },
  "showNewsletter": { "type": "boolean" },
  "socialLinks": { "type": "array" }
}
```

### 4. CSS Classes to Extract

From `sellmycell.webflow.css`, search for:
- `.footer2_component`
- `.footer2_`
- Check around lines 2500-2800 (approximate)

### 5. Key Features to Include

- ✅ Multi-column layout (logo, links, contact, newsletter)
- ✅ Newsletter signup form
- ✅ Social media icons
- ✅ Contact information
- ✅ Quick links (editable array)
- ✅ Fully responsive

### 6. Similar to Navigation

The footer uses similar patterns:
- Reusable block approach (same as nav)
- Theme integration via `functions.php`
- Grid layout for columns
- Responsive stacking on mobile

---

## 📋 Step-by-Step Footer Development

### Step 1: Set Up Files (15 min)

```bash
# Create block directory
mkdir src/blocks/footer

# Copy navigation block as template
cp src/blocks/navigation/block.json src/blocks/footer/
cp src/blocks/navigation/index.js src/blocks/footer/
cp src/blocks/navigation/edit.js src/blocks/footer/
cp src/blocks/navigation/save.js src/blocks/footer/
cp src/blocks/navigation/style.scss src/blocks/footer/
cp src/blocks/navigation/editor.scss src/blocks/footer/
```

Then rename all references from "navigation" to "footer".

### Step 2: Extract HTML (30 min)

1. Open `sellmycell.webflow/index.html`
2. Find `<footer class="footer2_component">`
3. Copy the entire footer section
4. Simplify/clean up for WordPress

### Step 3: Extract CSS (30 min)

1. Open `sellmycell.webflow/css/sellmycell.webflow.css`
2. Search for `.footer2_`
3. Copy all footer-related CSS
4. Adapt to SCSS in `style.scss`

### Step 4: Build Attributes (45 min)

Create inspector controls for:
- Logo upload
- Quick links (array with add/remove)
- Contact info (text fields)
- Social links (array)
- Newsletter toggle

### Step 5: Mobile Responsive (30 min)

Check Webflow export for mobile breakpoints:
- Desktop: Multi-column
- Tablet: 2 columns
- Mobile: Single column stack

### Step 6: Test & Polish (30 min)

- Build: `npm run build`
- Test in editor
- Test on frontend
- Test mobile breakpoints

**Total Estimated Time**: 2.5-3 hours

---

## 🛠️ Quick Commands for Footer Development

```bash
# Start development mode
npm start

# Build when done
npm run build

# Register the block (in src/index.js)
# Add: import './blocks/footer';

# Add to plugin registration (webdune-blocks.php)
# Already auto-registers from build/ folder

# Test in WordPress
wp block list | grep footer
```

---

## 📖 Reference Files

### Look at These for Patterns
- `src/blocks/navigation/` - Very similar structure
- `src/blocks/two-column-flexible/edit.js` - Array handling (quick links)
- `src/shared/colors.scss` - Use brand colors
- `sellmycell.webflow/index.html` - Lines ~1100+ (footer HTML)

### Don't Reinvent
- Use existing shared styles
- Copy inspector control patterns
- Follow same file structure

---

## 🎨 After Footer: Next Blocks Priority

### 1. CTA Section Block (Easy, 1-2 hrs)
- Simple reusable CTA
- Heading, text, button
- Background color options
- Used in multiple places

### 2. FAQ Blocks (Medium, 2-3 hrs)
- Parent container (uses InnerBlocks)
- Child accordion items
- Vanilla JS for accordion animation
- Plus/minus icon toggle

### 3. Phone Search Block (Complex, 3-4 hrs)
- AJAX functionality
- WordPress post queries
- ACF field integration
- Dropdown with results

---

## 💡 Tips & Tricks

### When Stuck
1. Check similar existing block
2. Search Webflow export for HTML/CSS
3. Check console for errors
4. Clear WordPress cache: `wp cache flush`

### Common Patterns

**Inspector Controls** (sidebar):
```javascript
<InspectorControls>
  <PanelBody title="Settings">
    <TextControl ... />
    <ToggleControl ... />
  </PanelBody>
</InspectorControls>
```

**Array Attributes** (like menu items):
```javascript
const [items, setItems] = useState(attributes.items);

const addItem = () => {
  setAttributes({ items: [...items, newItem] });
};

const removeItem = (index) => {
  setAttributes({ items: items.filter((_, i) => i !== index) });
};
```

**Media Upload**:
```javascript
<MediaUpload
  onSelect={(media) => setAttributes({ logo: media })}
  render={({ open }) => (
    <Button onClick={open}>Upload</Button>
  )}
/>
```

### Debugging

**Block not appearing?**
```bash
npm run build
wp cache flush
# Check browser console
```

**Styles not applying?**
```bash
# Make sure imported in style.scss
@import '../../shared/colors.scss';

# Clear cache
# Hard refresh browser (Ctrl+Shift+R)
```

**GSAP not working?**
```javascript
// Check webdune-blocks.php has:
wp_enqueue_script('gsap', ...);
// Check animations.js is loaded
```

---

## 🗂️ File Organization

Keep it clean:
```
src/blocks/footer/
├── block.json          # Metadata & attributes
├── index.js            # Registration
├── edit.js             # Editor component
├── save.js             # Frontend output
├── style.scss          # Frontend styles
├── editor.scss         # Editor styles
└── README.md           # Block documentation (optional)
```

---

## ✅ Footer Block Checklist

When building the footer, make sure to:

- [ ] Logo upload & display
- [ ] Tagline text (editable)
- [ ] Quick links array (add/remove/edit)
- [ ] Office hours text
- [ ] Email link
- [ ] Phone link
- [ ] Address text
- [ ] Newsletter signup toggle
- [ ] Social media links array (Instagram, TikTok, etc.)
- [ ] Multi-column layout (4 columns on desktop)
- [ ] Responsive (stacks on mobile)
- [ ] Dark background styling
- [ ] Company tagline ("100% NZ owned & operated")
- [ ] Form styling (newsletter)

---

## 🚀 You're Ready!

Everything is set up and working. The patterns are established. Just follow the structure from the navigation block and adapt for footer content.

**Questions?** Check:
1. START_HERE.md
2. BLOCK_INVENTORY.md
3. Navigation block files (your template)
4. Webflow export (your source)

**Good luck building the footer!** 🎉

---

*Last Updated: October 28, 2025*


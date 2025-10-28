# Block Inventory - Webdune Blocks for SellMyCell

## 📦 Block Categories

All blocks are under the **"Webdune Blocks"** category in the block inserter.

---

## 🏗️ Phase 1: Foundation & Core Blocks (Priority)

### 1. Navigation Block ✓ Build as Block
**Name**: `webdune/navigation`  
**Purpose**: Site-wide navigation with logo, menu links, and mobile hamburger  
**Attributes**:
- Logo (MediaUpload)
- Menu Items (Array of objects: text, url, openInNewTab)
- Background opacity (for floating nav effect)
- Sticky behavior toggle

**Features**:
- Desktop: Horizontal menu with logo left, links right
- Mobile: Hamburger menu
- Backdrop blur effect for floating nav
- Active page indicator

**Priority**: HIGH - Needed for all pages

---

### 2. Footer Block ✓ Build as Block
**Name**: `webdune/footer`  
**Purpose**: Site-wide footer with company info, links, newsletter, social  
**Attributes**:
- Logo (MediaUpload)
- Company tagline (RichText)
- Quick Links (Array)
- Contact Info (Object: hours, email, phone, address)
- Newsletter signup toggle
- Social Icons (Array: platform, url)

**Features**:
- Multi-column layout
- Email signup form
- Social media links

**Priority**: HIGH - Needed for all pages

---

### 3. Hero Block (Main)
**Name**: `webdune/hero`  
**Figma**: `170:924` (Home - Hero v3)  
**Purpose**: Primary hero for homepage with heading, subheading, image, and CTA  
**Attributes**:
- Heading (RichText)
- Subheading (RichText)
- Background Image (MediaUpload)
- Background Gradient (Color Picker - start/end colors)
- Hero Image Right (MediaUpload) - the person with phone
- CTA Button Text (Text)
- CTA Button URL (URLInput)
- CTA Button Opens New Tab (Toggle)

**Features**:
- Gradient background overlay
- Image on right side
- Inline editable text
- Responsive: Stacks on mobile

**Priority**: HIGH - Homepage first block

---

### 4. Phone Search Block (Separate from Hero)
**Name**: `webdune/phone-search`  
**Figma**: `170:963` (Search bar) + `170:927` (Dropdown)  
**Purpose**: Search phones with autocomplete dropdown  
**Attributes**:
- Placeholder text (Text)
- Button text (Text)
- Results to show (Number - default 3)
- Show "View all models" link (Toggle)

**Features**:
- AJAX search of WordPress posts (phones)
- Shows phone image, name, price range
- Dropdown with search results
- "Sell" button for each result
- Links to phone detail page
- Can be used in hero or standalone

**Data Source**: WordPress Posts with ACF fields
- Capacity groups (16GB, 32GB, etc.) with base prices
- Condition modifiers (Flawless, Good, Poor, Broken)
- Minimum price field

**Priority**: HIGH - Key functionality

---

### 5. Process Section Block
**Name**: `webdune/process-section`  
**Figma**: `22:9` (Process Section)  
**Purpose**: 4-step process with numbers, headings, descriptions  
**Attributes**:
- Section Heading (RichText)
- Decorative Line Toggle (Boolean)
- Steps (Array of 4 objects):
  - Number (auto-generated 1-4)
  - Heading (RichText)
  - Description (RichText)
- Side Image (MediaUpload)
- CTA Button Text (Text - optional, for last step)
- CTA Button URL (URLInput)

**Features**:
- 4 numbered steps
- Image on left
- Content on right
- Decorative line under heading

**Priority**: HIGH - Homepage

---

### 6. FAQ Block (Parent)
**Name**: `webdune/faq`  
**Figma**: `26:77` (FAQ Section)  
**Purpose**: FAQ section with accordion items  
**Attributes**:
- Section Heading (RichText)
- Section Button Text (Text - optional)
- Section Button URL (URLInput - optional)
- Uses **InnerBlocks** (allows only `webdune/faq-item`)

**Features**:
- Container for FAQ items
- Optional heading and CTA button
- Centers FAQ items
- Template with 2 default FAQ items

**Priority**: HIGH - Homepage

---

### 7. FAQ Item Block (Child/Nested)
**Name**: `webdune/faq-item`  
**Figma**: `26:118` (FAQ Pill) + `26:132` (FAQ Answer)  
**Purpose**: Individual FAQ accordion item  
**Attributes**:
- Question (RichText)
- Answer (RichText)
- Default Open (Toggle - false by default)
- Icon (Select: "plus" or "minus")

**Features**:
- Clickable pill with question
- Expandable answer area
- Smooth accordion animation (vanilla JS)
- Plus/minus icon toggle

**Priority**: HIGH - Goes with FAQ block

---

### 8. CTA Section Block (Reusable)
**Name**: `webdune/cta-section`  
**Figma**: Multiple (22:256, 26:81, etc.)  
**Purpose**: Call-to-action section with heading, text, button  
**Attributes**:
- Background Color (ColorPicker - default white, options: white, light gray, dark, primary)
- Heading (RichText)
- Decorative Line Toggle (Boolean)
- Description (RichText - optional)
- Button Text (Text)
- Button URL (URLInput)
- Button Opens New Tab (Toggle)
- Layout (Select: "centered", "left-aligned")

**Features**:
- Multiple background options
- Optional decorative underline
- Centered or left-aligned layouts
- Reusable across many sections

**Priority**: MEDIUM - Used in multiple places

---

## 🎯 Phase 2: Dynamic Content Blocks

### 9. Phone Slider Block
**Name**: `webdune/phone-slider`  
**Figma**: `23:293` (Phones Wrap)  
**Purpose**: Horizontal slider of phone models with prices  
**Attributes**:
- Section Heading (RichText)
- Section Subheading (RichText - optional)
- Post Selection Method (Select: "latest", "manual", "category")
  - If "manual": Post Selector (allows choosing specific posts)
  - If "category": Category Selector
- Number of Posts (Number - default 5)
- Show Navigation Arrows (Toggle - true)
- Autoplay (Toggle - false)
- Autoplay Speed (Number - milliseconds)

**Features**:
- Uses Swiper.js
- Displays phone image, name, max price
- Previous/Next arrows
- Desktop: Show 3-4 at once
- Mobile: Show 1 at a time
- Links to phone detail page

**Dynamic**: PHP render callback to query posts

**Priority**: MEDIUM - Homepage feature

---

### 10. Reviews Marquee Block
**Name**: `webdune/reviews-marquee`  
**Figma**: `26:260` (Reviews Section)  
**Purpose**: Infinite scrolling reviews with Google rating  
**Attributes**:
- Section Heading (RichText)
- Show Google Rating Card (Toggle - true)
- Google Rating (Number - 5.0)
- Google Review Count (Number - 276)
- Reviews (Array or pull from Google Reviews plugin)
  - Each review: stars, text, author name, author image, date
- Animation Speed (Number - default: 60 seconds)
- Pause on Hover (Toggle - true)

**Features**:
- Two rows of cards (offset)
- Infinite marquee scroll animation
- Google rating badge
- Review cards with stars, text, author
- Uses Swiper.js for mobile

**Integration**: 
- **Phase 1**: Hard-coded reviews from Figma
- **Phase 2**: Pull from Google Reviews plugin or API

**Priority**: MEDIUM - Homepage social proof

---

## 🏢 Phase 3: Content & Specialty Blocks

### 11. Content Image Section Block
**Name**: `webdune/content-image-section`  
**Figma**: `26:28` (Family Business Section)  
**Purpose**: Text content with background image overlay  
**Attributes**:
- Background Image (MediaUpload)
- Background Overlay Color (ColorPicker)
- Background Overlay Opacity (RangeControl 0-100)
- Heading (RichText)
- Content (RichText)
- Decorative Line Toggle (Boolean)
- Button Text (Text - optional)
- Button URL (URLInput)
- Text Color (ColorPicker - default white)

**Features**:
- Full-width background image
- Dark overlay for text readability
- Centered text content
- Optional CTA button

**Priority**: LOW-MEDIUM - Storytelling section

---

### 12. Two Column Content Block
**Name**: `webdune/two-column-content`  
**Figma**: `26:159` (Process content - Bulk Sales)  
**Purpose**: Text content on one side, image on other  
**Attributes**:
- Image Position (Select: "left", "right")
- Image (MediaUpload)
- Image Border Radius (RangeControl)
- Content Heading (RichText)
- Content Body (RichText)
- Decorative Line Toggle (Boolean)
- Button Text (Text - optional)
- Button URL (URLInput)

**Features**:
- 50/50 split on desktop
- Stacks on mobile
- Image with rounded corners option
- Flexible image placement

**Priority**: LOW-MEDIUM - Interior pages

---

### 13. Charity Section Block
**Name**: `webdune/charity-section`  
**Figma**: `26:198` (Charity Section)  
**Purpose**: Charity information with logos  
**Attributes**:
- Background Color (ColorPicker - default dark)
- Heading (RichText - supports colored text)
- Heading Highlight Color (ColorPicker - for highlighted words)
- Content (RichText - optional)
- Button Text (Text - optional)
- Button URL (URLInput)
- Charity Logos (Array of MediaUpload - up to 3-4)

**Features**:
- Dark background
- Inline colored text in heading
- Logo grid below
- Optional CTA button

**Priority**: LOW - Specific to homepage

---

### 14. Stats Section Block
**Name**: `webdune/stats-section`  
**Figma**: `26:214` (Stats Section)  
**Purpose**: Impact statistics in columns  
**Attributes**:
- Section Heading (RichText)
- Decorative Line Toggle (Boolean)
- Stats (Array of 3 objects):
  - Number (RichText - for formatting like "$1,697,167")
  - Label (RichText)
  - Decorative Line Toggle (Boolean)

**Features**:
- 3-column layout
- Large numbers
- Descriptive labels
- Optional decorative underlines
- Responsive: Stacks on mobile

**Priority**: LOW - Homepage impact

---

### 15. Full Width Photo Block
**Name**: `webdune/full-width-photo`  
**Figma**: `26:278` (Photo Section)  
**Purpose**: Full-width image section  
**Attributes**:
- Image (MediaUpload)
- Image Alt Text (Text)
- Height (Select: "auto", "small" ~500px, "medium" ~700px, "large" ~900px)
- Object Position (Select: "center", "top", "bottom")

**Features**:
- Full viewport width
- Maintains aspect ratio
- Optional height constraints
- Can be used as visual break

**Priority**: LOW - Visual element

---

### 16. Hero Simple Block
**Name**: `webdune/hero-simple`  
**Figma**: `70:401` (Hero Section - Interior pages)  
**Purpose**: Simpler hero for interior pages  
**Attributes**:
- Heading (RichText)
- Subheading (RichText)
- Hero Image (MediaUpload)
- Image Position (Select: "left", "right")
- Background Color (ColorPicker - default light gray)

**Features**:
- Less complex than main hero
- No gradient, simpler layout
- Text + image side by side
- Used on How it Works, About, etc.

**Priority**: LOW-MEDIUM - Interior pages

---

## 📝 Block Development Status

| Priority | Block Name | Status | Source | Dependencies |
|----------|------------|--------|---------|--------------|
| HIGH | Navigation | 🔄 **IN PROGRESS** | Webflow export | GSAP, Lenis |
| HIGH | Footer | 🔲 To Do | Webflow export | GSAP, Lenis |
| HIGH | Hero (Homepage) | ✅ **COMPLETE** | Webflow export | None |
| HIGH | Template Hero (Interior) | ✅ **COMPLETE** | Webflow export | None |
| HIGH | Phone Search | 🔲 To Do | Webflow export | PHP query logic |
| HIGH | Process Section | ✅ **COMPLETE** | Webflow export | None |
| HIGH | FAQ (Parent) | 🔲 To Do | Webflow export | InnerBlocks |
| HIGH | FAQ Item (Child) | 🔲 To Do | Webflow export | Vanilla JS |
| MEDIUM | CTA Section | 🔲 To Do | Webflow export | None |
| MEDIUM | Phone Slider | 🔲 To Do | Webflow export | PHP, Swiper.js |
| MEDIUM | Reviews Marquee | 🔲 To Do | Webflow export | Swiper.js |
| LOW-MED | Content Image | 🔲 To Do | Webflow export | None |
| LOW-MED | Two Column Flexible | ✅ **COMPLETE** | Webflow export | None |
| LOW | Charity Section | 🔲 To Do | Webflow export | None |
| LOW | Stats Section | 🔲 To Do | Webflow export | None |
| LOW | Full Width Photo | 🔲 To Do | Webflow export | None |

---

## 🎨 Shared Components

These will be created in `src/shared/components/`:

1. **ButtonControl** - Reusable button settings panel
2. **ImageUploadControl** - Image upload with preview
3. **DecoratativeLineControl** - Optional decorative underline
4. **ColorSelector** - Brand color picker
5. **PostSelector** - Post/page selection interface

---

## 🎯 Development Order (Recommended)

### Week 1: Foundation
1. Setup plugin structure
2. Navigation block
3. Footer block
4. Simple CTA block

### Week 2: Homepage Core
5. Hero block
6. Process section
7. FAQ + FAQ Item blocks

### Week 3: Homepage Dynamic
8. Phone search block (basic first)
9. Phone slider block
10. Reviews marquee (static first)

### Week 4: Content & Polish
11. Remaining content blocks
12. Mobile responsiveness
13. Performance optimization
14. Documentation

---

## ✅ Definition of Done (Per Block)

- [ ] Block appears in "Webdune Blocks" category
- [ ] All attributes editable in inspector/inline
- [ ] Follows standard section structure (section > padding-global > container-large)
- [ ] Matches Figma design (desktop)
- [ ] Responsive (mobile/tablet tested)
- [ ] No console errors
- [ ] Clean, commented code
- [ ] Save/reload works correctly
- [ ] Documented in this inventory

---

## 📚 Block Documentation Template

For each block, document:

```markdown
## Block Name

**Category**: Webdune Blocks  
**Figma**: [Node ID]  
**Status**: ✓ Complete / 🔨 In Progress / 🔲 To Do

### Attributes
- [Attribute name] (Type) - Description

### Usage
Where and how this block is typically used

### Notes
Any special considerations, dependencies, or gotchas
```

---

**Last Updated**: October 28, 2025  
**Total Blocks**: 16  
**Completed**: 4 (Process Section, Hero, Template Hero, Two Column Flexible)  
**In Progress**: 1 (Navigation)  
**To Do**: 11

---

## 📖 Workflow & Source

**All blocks are built from**: `sellmycell.webflow/` Webflow export
- HTML structure from `index.html` or page-specific HTML files
- CSS from `sellmycell.webflow.css`
- Custom styles from inline `<style>` tags in `<div class="custom-styles">`
- Scripts from bottom of HTML (GSAP, Lenis, parallax, nav behavior)
- Mobile styles included in export - use them!


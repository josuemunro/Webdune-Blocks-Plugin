<!-- 49535263-cdd0-4043-af9c-eb4ef1da9dde 4bec06e9-cf9d-459f-9619-a3195b56f6f9 -->
# Scroll Animation System Implementation

## Overview

Create a data-attribute-based animation system that works across all blocks. Elements with `data-fade-up`, `data-fade-in`, `data-stagger-children`, or `data-underline-expand` will automatically animate on scroll using GSAP ScrollTrigger.

## Animation Specifications

- **Duration**: 0.8s
- **Stagger delay**: 0.15s between items
- **Easing**: power2.out
- **Trigger point**: 25% into viewport (start: "top 75%")
- **Once**: true (animations only play once)

## Implementation Steps

### 1. Create Centralized Animation System

**File**: `src/shared/scroll-animations.js`

Create new animation initialization file that:

- Registers ScrollTrigger plugin
- Queries all elements with animation data attributes
- Sets initial states (opacity: 0, y: 40 for fade-up)
- Creates ScrollTrigger animations with batch processing for performance
- Handles special cases: underline width expansions, stagger groups, bouncing arrow loop

Data attributes to support:

- `data-fade-up` - Standard fade up from below
- `data-fade-in` - Fade in without movement (for images)
- `data-fade-delay="0.3"` - Optional delay in seconds
- `data-stagger-children` - Parent element whose children stagger
- `data-stagger-delay="0.15"` - Custom stagger delay (optional)
- `data-underline-expand` - Width animation 0% → 100% on underlines
- `data-bounce-loop` - Bouncing animation loop (Template Hero arrow)

### 2. Import Animation System

**File**: `src/shared/index.js`

Add import for new scroll-animations.js file so webpack bundles it with global-styles.js

### 3. Update Block Save Functions

Update each block's `save.js` to add data attributes to animated elements:

#### Hero Block (`src/blocks/hero/save.js`)

- H1: `data-fade-up data-fade-delay="0.5"` (extra delay for loading)
- Subheading div: `data-fade-up data-fade-delay="0.6"`
- Phone lookup wrap: `data-fade-up data-fade-delay="0.7"`
- Hero image: `data-fade-in data-fade-delay="0.9"` (fade in, not up, happens last)

#### Process Section (`src/blocks/process-section/save.js`)

- H2 heading: `data-fade-up`
- Decorative underline (if exists in markup): `data-underline-expand`
- Each `.home-process_list-item`: `data-fade-up` (will auto-stagger due to shared trigger)
- Process image: `data-fade-up`
- CTA button (in list item): already has `data-fade-up` on parent

#### Content Image Section (`src/blocks/content-image-section/save.js`)

- H2 heading: `data-fade-up`
- Underline (if exists): `data-underline-expand`

#### Phone Slider (`src/blocks/phone-slider/save.js`)

- H2 heading: `data-fade-up`
- Underline (if exists): `data-underline-expand`
- Swiper wrapper: `data-stagger-children` on `.swiper-wrapper` (children will stagger left to right)
- Text under slider: `data-fade-up`
- Button: `data-fade-up`

#### Reviews Marquee (`src/blocks/reviews-marquee/save.js`)

- H2 heading: `data-fade-up`
- Underline element: `data-underline-expand`
- Reviews badge (totals): `data-fade-up`

#### FAQ Section (`src/blocks/faq/save.js`)

- H2 heading: `data-fade-up`
- Underline: `data-underline-expand`
- Button: `data-fade-up`
- Note: FAQ items animate individually (add to save.js of faq-item block)

#### FAQ Item (`src/blocks/faq-item/save.js`)

- Each `.faq5_accordion`: `data-fade-up`

#### Two-Column Flexible (`src/blocks/two-column-flexible/save.js`)

- H2 heading: `data-fade-up`
- Underline: `data-underline-expand`
- Body text paragraph: `data-fade-up`
- Button: `data-fade-up`
- Image: `data-fade-up`

#### Charity Section (`src/blocks/charity-section/save.js`)

- H2 heading: `data-fade-up`
- Paragraph: `data-fade-up`
- Button: `data-fade-up`
- Each logo image: `data-fade-up` (will stagger naturally)

#### Stats Section (`src/blocks/stats-section/save.js`)

- H2 heading: `data-fade-up`
- Underline: `data-underline-expand`
- Each `.stats_stat`: `data-fade-up`

**Special**: Update `view.js` to trigger counter animation AFTER fade-up completes (add onComplete callback or increase start trigger)

#### CTA Section (`src/blocks/cta-section/save.js`)

- H2 heading: `data-fade-up`
- Underline: `data-underline-expand`
- Button container: `data-stagger-children` (buttons stagger left to right)

#### Footer (`src/blocks/footer/save.js`)

- Logo: `data-fade-up`
- Text under logo: `data-fade-up`
- Each footer column's bold heading: `data-fade-up`
- Each footer column: `data-stagger-children` on the links container (optional, can skip if too complex)

#### Template Hero (`src/blocks/template-hero/save.js`)

- H1 heading: `data-fade-up`
- Each additional text element (p tags): `data-fade-up` (natural stagger)
- Button (if exists): `data-fade-up`
- Down arrow: `data-fade-in data-fade-delay="0.5" data-bounce-loop` (fade in, then bounce loop starts)
- Main image: `data-fade-up`
- Phone image: `data-fade-up data-fade-delay="0.2"` (after main image)

#### Tips Grid (`src/blocks/tips-grid/save.js`)

- Tip grid container: `data-stagger-children` (cards stagger first to last)

#### FAQ with ToC (`src/blocks/faq-with-toc/save.js`)

- Headings: `data-fade-up`
- FAQ items: handled by faq-category block
- ToC container (entire sidebar): `data-fade-up` (as one unit)

#### FAQ Category (`src/blocks/faq-category/save.js`)

- Category heading: `data-fade-up`
- Each accordion item: `data-fade-up`

### 4. Testing & Refinement

- Build plugin and test on development site
- Verify animations trigger at correct viewport position
- Check stagger timing feels natural
- Ensure Stats counter triggers after fade-up
- Verify Swiper isn't broken by phone slider animations
- Test Template Hero bouncing arrow loop
- Check performance with multiple animated sections

## Key Files to Create/Modify

**New Files:**

- `src/shared/scroll-animations.js`

**Modified Files:**

- `src/shared/index.js`
- `src/blocks/hero/save.js`
- `src/blocks/process-section/save.js`
- `src/blocks/content-image-section/save.js`
- `src/blocks/phone-slider/save.js`
- `src/blocks/reviews-marquee/save.js`
- `src/blocks/faq/save.js`
- `src/blocks/faq-item/save.js`
- `src/blocks/two-column-flexible/save.js`
- `src/blocks/charity-section/save.js`
- `src/blocks/stats-section/save.js`
- `src/blocks/stats-section/view.js` (adjust counter trigger)
- `src/blocks/cta-section/save.js`
- `src/blocks/footer/save.js`
- `src/blocks/template-hero/save.js`
- `src/blocks/tips-grid/save.js`
- `src/blocks/faq-with-toc/save.js`
- `src/blocks/faq-category/save.js`

## Benefits

- Centralized animation logic (easy to adjust timing globally)
- Data attributes make intentions clear in markup
- No editor UI needed (hardcoded as requested)
- Performance optimized with GSAP batch processing
- Easy for future devs to add animations to new blocks
- Client-proof (no UI to accidentally break)

### To-dos

- [ ] Create src/shared/scroll-animations.js with GSAP ScrollTrigger system supporting data-fade-up, data-fade-in, data-stagger-children, data-underline-expand, and data-bounce-loop
- [ ] Import scroll-animations.js in src/shared/index.js
- [ ] Add animation data attributes to Hero block save.js (h1, subheading, search, image)
- [ ] Add animation data attributes to Process Section save.js (heading, underline, items, image, button)
- [ ] Add animation data attributes to Content Image Section save.js
- [ ] Add animation data attributes to Phone Slider save.js with careful stagger on swiper children
- [ ] Add animation data attributes to Reviews Marquee save.js
- [ ] Add animation data attributes to FAQ and FAQ Item save.js files
- [ ] Add animation data attributes to Two-Column Flexible save.js
- [ ] Add animation data attributes to Charity Section save.js
- [ ] Add animation data attributes to Stats Section save.js and update view.js to trigger counter after fade-up
- [ ] Add animation data attributes to CTA Section save.js with staggered buttons
- [ ] Add animation data attributes to Footer save.js
- [ ] Add animation data attributes to Template Hero save.js including bouncing arrow loop
- [ ] Add animation data attributes to Tips Grid save.js
- [ ] Add animation data attributes to FAQ with ToC and FAQ Category save.js files
- [ ] Build plugin, test all animations, verify timing, check Swiper compatibility, test bouncing arrow, verify stats counter triggers correctly
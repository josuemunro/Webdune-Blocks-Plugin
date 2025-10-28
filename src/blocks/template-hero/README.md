# Template Hero Block

**Block Name**: `webdune/template-hero`  
**Category**: Webdune Blocks  
**Status**: ✅ Complete

## Overview

The Template Hero block is designed for interior pages (like "How it Works", "About", etc.). It features a clean layout with a heading, subheading, optional down arrow, and image on the right side.

## Features

### Two Layout Variants

1. **Image + Phone** (Default)
   - Main background image with rounded corners (7:8 aspect ratio)
   - Phone image overlay positioned on the right
   - Grid ratio: 1fr 1fr (equal columns)
   - Gap: 7.5rem

2. **Wide Image**
   - Single wide image with 3:2 aspect ratio
   - No phone overlay
   - Grid ratio: 4fr 7fr (smaller text, larger image)
   - Gap: 8rem
   - Smaller max-width on text column (28rem vs 30rem)

### Customizable Options

- **Layout Type**: Choose between "Image + Phone" or "Wide Image"
- **Background Color**: Custom color picker (default: #597AA1)
- **Heading**: Editable H1 text (white color)
- **Subheading**: Editable paragraph text (large size, white color)
- **Main Image**: Upload/change the primary image
- **Phone Image**: Upload/change the phone overlay (only for "Image + Phone" layout)
- **Down Arrow**: Toggle visibility of the decorative down arrow

## Usage

### Inserting the Block

1. Open the block inserter (+)
2. Search for "Template Hero" or navigate to "Webdune Blocks" category
3. Click to add the block

### Configuring the Layout

1. Select the block
2. In the **Inspector Controls** (right sidebar):
   - Choose **Layout Type**:
     - "Image + Phone" for the default layout with phone overlay
     - "Wide Image" for a single wide image
   - Toggle **Show Down Arrow** on/off
   - Click the **Background Color** picker to customize

### Adding Images

1. In the **Inspector Controls**, locate the **Main Image** panel
2. Click "Select Image" to open the media library
3. Choose an image (recommended: high-quality portrait for "Image + Phone", landscape for "Wide Image")
4. If using "Image + Phone" layout:
   - Open the **Phone Image** panel
   - Click "Select Phone Image"
   - Choose a phone screenshot or mockup

### Editing Text

1. Click directly on the heading to edit
2. Click on the subheading paragraph to edit
3. Text is white by default for contrast against colored backgrounds

## Technical Details

### HTML Structure

```html
<section class="section_template-hero" style="background-color: #597AA1">
  <div class="padding-global z-index-1">
    <div class="w-layout-blockcontainer container-large w-container">
      <div class="template-hero_content [is-wide]">
        <div class="template-hero_left [is-wide]">
          <h1 class="text-color-white">Heading</h1>
          <p class="text-size-xlarge text-color-white">Subheading</p>
          <div class="template-hero_down-arrow">
            <!-- SVG arrow -->
          </div>
        </div>
        <div class="template-hero_right [is-wide]">
          <img class="template-hero_img-main [is-wide]" />
          <!-- Phone wrapper only for "Image + Phone" layout -->
          <div class="template-hero_img-phone-wrapper">
            <img class="template-hero_img-phone" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### CSS Classes

- `.section_template-hero` - Main section wrapper
- `.template-hero_content` - Grid container for content
- `.template-hero_content.is-wide` - Wide image variant
- `.template-hero_left` - Text content column
- `.template-hero_left.is-wide` - Narrower text column for wide layout
- `.template-hero_right` - Image column
- `.template-hero_img-main` - Main background image
- `.template-hero_img-main.is-wide` - Wide image variant (3:2 aspect ratio)
- `.template-hero_img-phone-wrapper` - Phone image overlay container
- `.template-hero_img-phone` - Phone image
- `.template-hero_down-arrow` - Decorative down arrow

### Responsive Breakpoints

- **Desktop**: Full grid layout as specified
- **Tablet** (≤991px): Stacks to single column, reduced padding
- **Mobile Landscape** (≤767px): Further reduced spacing and font sizes
- **Mobile Portrait** (≤479px): Smallest sizing, compact layout

### Default Attributes

```json
{
  "layoutType": "image-phone",
  "backgroundColor": "#597AA1",
  "heading": "How it works",
  "subheading": "Skip the faff of TradeMe and Marketplace...",
  "mainImage": {},
  "phoneImage": {},
  "showDownArrow": true
}
```

## Design Specifications

### Image + Phone Layout

- **Grid**: 1fr 1fr (equal columns)
- **Gap**: 7.5rem (120px)
- **Text Max-Width**: 30rem (480px)
- **Main Image Aspect**: 7:8
- **Border Radius**: 1.875rem (30px)
- **Phone Position**: Absolute, right: 12.125rem from container

### Wide Image Layout

- **Grid**: 4fr 7fr (36% text, 64% image)
- **Gap**: 8rem (128px)
- **Text Max-Width**: 28rem (448px)
- **Main Image Aspect**: 3:2
- **Border Radius**: 1.875rem (30px)
- **No Phone Overlay**

## Example Use Cases

1. **"How it Works" page** (Image + Phone)
   - Background: Blue (#597AA1)
   - Main image: Person using phone
   - Phone image: App screenshot overlay

2. **"About Us" page** (Wide Image)
   - Background: Custom brand color
   - Wide landscape image of team/office

3. **"Contact" page** (Wide Image)
   - Background: Neutral color
   - Wide map or location image

## Best Practices

1. **Image Dimensions**:
   - For "Image + Phone": Portrait images work best (7:8 ratio, e.g., 875×1000px)
   - For "Wide Image": Landscape images (3:2 ratio, e.g., 1200×800px)

2. **Background Colors**:
   - Use colors with good contrast to white text
   - Consider brand colors: Primary yellow (#FFD940), Dark (#3C3C3C), etc.

3. **Text Length**:
   - Keep headings concise (1-5 words)
   - Subheadings should be 1-2 sentences

4. **Phone Images**:
   - Use actual phone mockups or screenshots
   - Ensure phone image has transparent background if needed
   - Recommended size: ~500×1000px

## Troubleshooting

**Images not appearing?**
- Check that images are uploaded successfully
- Verify image URLs in Inspector Controls
- Try removing and re-adding the image

**Layout not switching?**
- Save the page after changing layout type
- Refresh the editor if changes don't appear

**Text not visible?**
- Ensure background color contrasts with white text
- Check that text isn't empty

**Phone overlay positioned incorrectly?**
- Ensure main image has 7:8 aspect ratio
- Check that phone image is appropriate size

## Related Blocks

- **Hero Block** (`webdune/hero`) - For homepage hero with gradient and phone search
- **Two Column Flexible** (`webdune/two-column-flexible`) - For general content layouts

---

**Created**: October 27, 2025  
**Last Updated**: October 27, 2025  
**Source**: Based on live Webflow site at https://sellmycell.webflow.io/how-it-works


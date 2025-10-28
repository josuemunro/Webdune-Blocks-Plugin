# 2-Column Flexible Block

The most flexible block in the Webdune Blocks plugin. Perfect for creating varied layouts with text and media content.

## Block Name
`webdune/two-column-flexible`

## Features

### ✨ Custom Gradient Underline Format
This block includes a **custom RichText format** that adds gradient underlining to selected text. Look for the underline button in the RichText toolbar when editing H2 or Rich Text fields.

**CSS Class**: `.gradient-underline`

---

## Block Options

### 📏 Section Settings

#### Section Padding
- **Medium**: 7.5rem top/bottom (5rem on tablet, 3rem on mobile)
- **Large**: 10rem top/bottom (7rem on tablet, 5rem on mobile)

#### Show Header
Toggle to show/hide a section header above the 2-column grid. Header uses H2 with RichText editing (supports bold, italic, and gradient underline).

#### Container Size
- **XSmall**: `.container-xsmall`
- **Small**: `.container-small`
- **Medium**: `.container-medium` (default)
- **Large**: `.container-large`

#### Background Color
- **Transparent**: No background (default)
- **Light Grey**: `#F5F5F7`
- **Custom**: Opens color picker for any color

---

### 📝 Text Content (Left Column)

#### Show Number
Toggles a large decorative number. Automatically adds a period after the number.

**Example**: Input "1" → Displays "1."

#### Show H3
Main heading for the text column. Supports:
- Bold
- Italic
- **Gradient Underline** (custom format)

**Note**: Uses H3 for proper semantic structure when section has an H2 header above.

#### Show Rich Text
Body content area with full block support. Users can add:
- Paragraphs
- Lists (ordered and unordered)
- Headings

Supports all standard formatting: bold, italic, links, and the custom gradient underline.

#### Show CTA
Call-to-action button or link.

**Options**:
- **Style**: Button or Underline link
- **Text**: CTA label
- **URL**: Link destination (with page/post autocomplete)

#### Show Down Arrow
Decorative down arrow SVG (purely decorative, no scroll behavior).

---

### 🖼️ Media Content (Right Column)

#### Media Type: Single Image

**Modes**:
- **Full Height**: Image fills container, object-fit cover, 2rem border radius
- **Phone**: Image aligned right, optional Natural Width checkbox for absolute positioning

#### Media Type: Double Images

**Modes**:
- **Tall Overlaid**: First image (3:5 ratio) with second image overlaid at offset
  - First: margin-right: 11.5rem, margin-bottom: 9.5rem
  - Second: Absolute positioned at top: 11.5rem, right: 0
- **Stacked**: Two images stacked vertically (1:1 ratio each)

#### Media Type: Video

**Options**:
- **Aspect Ratio**: Portrait (9:16) or Square (1:1)
- **Video URL**: Enter direct video URL (MP4, WebM, etc.)

**Features**:
- Play button overlay (auto-hides when video plays)
- HTML5 video controls (appear on hover/when playing)
- Border radius: 2rem

---

## Grid Settings

### Grid Ratio
Control the width ratio between left (text) and right (media) columns.

**Default**: 4fr / 5fr (text column slightly smaller than media)

**Range**: 1-12 for each column

**Examples**:
- `4fr 5fr` - Default (slightly wider media)
- `1fr 1fr` - Equal columns
- `6fr 4fr` - Wider text column
- `3fr 7fr` - Much wider media

**Note**: On mobile/tablet (≤991px), grid becomes single column automatically.

---

## Output Structure

```html
<section class="webdune-two-column-flexible">
  <section class="section_2-col section-padding-{medium|large}" style="background-color: {color}">
    <div class="padding-global">
      <div class="w-layout-blockcontainer container-{size} w-container">
        
        <!-- Optional Header -->
        <div class="section-header-wrapper">
          <h2 class="section-header">{headerText}</h2>
        </div>

        <!-- 2-Column Grid -->
        <div class="2-col-block_grid" style="grid-template-columns: {left}fr {right}fr">
          
          <!-- Text Content -->
          <div class="2-col-block_text-content">
            <div class="2-col-block_number">{number}.</div>
            <h2 class="2-col-block_heading">{h2Text}</h2>
            <div class="2-col-block_rich-text">{richTextContent}</div>
            <div class="2-col-block_cta">
              <a href="{url}" class="{button|text-style-link}">{ctaText}</a>
            </div>
            <div class="2-col-block_down-arrow">{svg}</div>
          </div>

          <!-- Media Content -->
          <div class="2-col-block_media-content">
            <!-- Single Image / Double Images / Video -->
          </div>

        </div>
      </div>
    </div>
  </section>
</section>
```

---

## Styling Notes

### Gradient Underline
The custom underline format (`.gradient-underline`) uses:
- Background gradient positioned below text
- Yellow color (`var(--yellow)` or `$color-primary`)
- Responsive sizing (adjusts on tablet/mobile)
- Works across line breaks

### Responsive Behavior
- **Desktop (>991px)**: 2-column grid as configured
- **Tablet/Mobile (≤991px)**: Stacks to single column
- **Padding scales down** on smaller screens
- **Number size reduces** on mobile

---

## Usage Tips

1. **Start Simple**: Enable just H2 and Single Image to start
2. **Add Complexity**: Layer on number, rich text, CTA as needed
3. **Test Ratios**: Common ratios are 4:5, 1:1, and 6:4
4. **Underline Text**: Select text in H2/Rich Text and click underline button in toolbar
5. **Video Performance**: Use compressed videos for faster load times

---

## Common Use Cases

### Feature Showcase
- Number: Show feature number
- H2: Feature title
- Rich Text: Description
- CTA: "Learn more" button
- Media: Single image (full height)

### Process Steps
- Number: Step number
- H2: Step title with underlined key words
- Rich Text: Detailed description
- Down Arrow: Visual flow indicator
- Media: Phone image or video demo

### Content + Gallery
- H2: Section title
- Rich Text: Paragraph content
- CTA: Link to gallery
- Media: Double stacked images

---

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Grid layout with mobile fallback
- HTML5 video support
- CSS custom properties for colors

---

**Questions?** Check the main documentation in `/START_HERE.md` or `/QUICK_REFERENCE.md`


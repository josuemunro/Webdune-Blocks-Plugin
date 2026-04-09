# Webdune Blocks Plugin

Custom Gutenberg blocks plugin for SellMyCell, replacing WP Bakery page builder.

## Source of Truth
- HTML/CSS comes from the `sellmycell.webflow/` folder (Webflow export)
- Use exact HTML structure and CSS from the export — don't make up CSS
- Mobile styles are already in the export — use them

## Block Structure
Every block follows this pattern:
```
src/blocks/[name]/
├── block.json
├── index.js       # MUST import ./style.scss and ./editor.scss
├── edit.js
├── save.js
├── style.scss     # Frontend + Editor styles
├── editor.scss    # Editor-only styles (optional)
└── view.js        # Frontend JS (optional)
```

### Webpack CSS Naming (Critical)
- `style.scss` builds to `style-index.css`
- `editor.scss` builds to `index.css`

In block.json, use these exact paths:
```json
{
  "editorScript": "file:./index.js",
  "editorStyle": "file:./index.css",
  "style": "file:./style-index.css",
  "viewScript": "file:./view.js"
}
```

## Design System
- Colors: Use variables from `src/shared/colors.scss`
- Typography: Helvetica World (loaded globally)
- Containers: `.container-small` / `.container-medium` / `.container-large`
- Section wrapper pattern: `<section> > .padding-global > .container-*`

## Animations (GSAP)
- Loaded globally via `src/shared/animations.js` (Lenis, parallax, nav) and `src/shared/scroll-animations.js` (fade-up, fade-in, stagger)
- Parallax auto-works on `[data-speed]` elements
- Nav behaviors auto-apply to `.navbar14_component`
- Scroll animations use data attributes: `data-fade-up`, `data-fade-in`, `data-stagger-children`

## Development Rules
- Follow existing block patterns in `src/blocks/`
- Import shared styles: `@import '../../shared/colors.scss'`
- Test all 4 breakpoints: desktop, tablet (991px), mobile-landscape (767px), mobile-portrait (479px)
- Don't use inline styles
- Don't modify the block registration array in `webdune-blocks.php` — it auto-registers from `build/`

## Commands
```bash
npm start          # Development (auto-rebuild)
npm run build      # Production build
```

## Shell Environment
Git Bash on Windows does not return output reliably in this project. Use PowerShell for running commands (`npm run build`, deploy scripts, git operations) to see full output.

## Deploy
- Staging: `.\deploy-to-staging.ps1` (PowerShell)
- Staging URL: https://sellmycell.co.nz/sellmycell-stagi/
- Server: 170.64.232.219 (SSH via `~/.ssh/github_rsa`)

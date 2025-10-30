/**
 * Shared Styles Entry Point
 * This file imports all global styles that should be loaded site-wide
 */

// Import all shared styles - these will be compiled into a single CSS file
import './colors.scss';
import './typography.scss';
import './layout.scss';
import './theme-overrides.scss';
import './utilities.scss';
import './effects.scss';

// Custom rich text formats (gradient underlines, etc.)
// IMPORTANT: Import BEFORE animations.js to ensure formats register immediately
import './formats.js';

// Shared animations (GSAP, Lenis, parallax)
// These only run on frontend (not in editor)
import './animations.js';



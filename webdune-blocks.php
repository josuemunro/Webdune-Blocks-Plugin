<?php

/**
 * Plugin Name:       Webdune Blocks
 * Plugin URI:        https://webdune.co.nz
 * Description:       Custom Gutenberg blocks for SellMyCell - providing true inline editing and modern WordPress functionality.
 * Version:           1.1.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Webdune
 * Author URI:        https://webdune.co.nz
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       webdune-blocks
 * Domain Path:       /languages
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
  exit;
}

// Define plugin constants
define('WEBDUNE_BLOCKS_VERSION', '1.1.0');
define('WEBDUNE_BLOCKS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('WEBDUNE_BLOCKS_PLUGIN_URL', plugin_dir_url(__FILE__));
define('WEBDUNE_BLOCKS_BUILD_DIR', WEBDUNE_BLOCKS_PLUGIN_DIR . 'build/');
define('WEBDUNE_BLOCKS_BUILD_URL', WEBDUNE_BLOCKS_PLUGIN_URL . 'build/');
define('WEBDUNE_BLOCKS_ASSETS_URL', WEBDUNE_BLOCKS_PLUGIN_URL . 'assets/');

/**
 * Plugin activation hook - flush rewrite rules for custom post types
 * DISABLED - Caused 500 errors
 * 
 * NOTE: If Tips posts show 404 errors, manually flush permalinks:
 * Go to Settings → Permalinks and click "Save Changes"
 */
/*
function webdune_blocks_activate()
{
  // Register custom post types first
  require_once WEBDUNE_BLOCKS_PLUGIN_DIR . 'includes/post-types.php';
  webdune_register_tips_post_type();
  webdune_register_tip_category_taxonomy();
  webdune_register_tip_tag_taxonomy();
  
  // Flush rewrite rules so Tips URLs work immediately
  flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'webdune_blocks_activate');

function webdune_blocks_deactivate()
{
  flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'webdune_blocks_deactivate');
*/

/**
 * Register custom block category
 */
function webdune_blocks_category($block_categories, $editor_context)
{
  if (!empty($editor_context->post)) {
    array_unshift(
      $block_categories,
      array(
        'slug'  => 'webdune',
        'title' => __('Webdune Blocks', 'webdune-blocks'),
        'icon'  => 'layout',
      )
    );
  }
  return $block_categories;
}
add_filter('block_categories_all', 'webdune_blocks_category', 10, 2);

/**
 * Register all blocks
 */
function webdune_blocks_register_blocks()
{
  // Array of block names to register
  $blocks = array(
    // Core Navigation & Layout
    'navigation',
    'footer',

    // Heroes
    'hero',
    'template-hero',

    // Content Sections
    'process-section',
    'cta-section',
    'content-image-section',
    'two-column-flexible',
    'charity-section',
    'stats-section',

    // Dynamic Content
    'phone-slider',
    'reviews-marquee',

    // FAQ
    'faq',
    'faq-item',
    'faq-with-toc',
    'faq-category',

    // Tips / Blog
    'tips-grid',
    'related-tips',
    'tips-meta',
  );

  // Register each block
  foreach ($blocks as $block) {
    $block_path = WEBDUNE_BLOCKS_BUILD_DIR . 'blocks/' . $block;

    // Only register if block.json exists (allows gradual development)
    if (file_exists($block_path . '/block.json')) {
      register_block_type($block_path);
    }
  }
}
add_action('init', 'webdune_blocks_register_blocks');

/**
 * Enqueue fonts globally
 * These fonts apply to both editor and frontend
 */
function webdune_blocks_enqueue_fonts()
{
  $font_css = WEBDUNE_BLOCKS_ASSETS_URL . 'fonts/helvetica-world.css';
  $font_css_path = WEBDUNE_BLOCKS_PLUGIN_DIR . 'assets/fonts/helvetica-world.css';

  if (file_exists($font_css_path)) {
    wp_enqueue_style(
      'webdune-fonts',
      $font_css,
      array(),
      filemtime($font_css_path)
    );
  }
}
add_action('wp_enqueue_scripts', 'webdune_blocks_enqueue_fonts', 5); // Priority 5 to load early
add_action('admin_enqueue_scripts', 'webdune_blocks_enqueue_fonts', 5);

/**
 * Enqueue shared global styles and scripts
 * These styles apply to both editor and frontend
 * Includes: typography, layout, colors, theme overrides, custom formats
 */
function webdune_blocks_enqueue_shared_styles()
{
  $shared_css = WEBDUNE_BLOCKS_BUILD_URL . 'shared/global-styles.css';
  $shared_css_path = WEBDUNE_BLOCKS_BUILD_DIR . 'shared/global-styles.css';
  $shared_js = WEBDUNE_BLOCKS_BUILD_URL . 'shared/global-styles.js';
  $shared_js_path = WEBDUNE_BLOCKS_BUILD_DIR . 'shared/global-styles.js';
  $shared_asset_path = WEBDUNE_BLOCKS_BUILD_DIR . 'shared/global-styles.asset.php';

  // Enqueue CSS if it exists
  if (file_exists($shared_css_path)) {
    // Check if fonts are loaded, if so, depend on them. Otherwise load CSS independently.
    $font_css_path = WEBDUNE_BLOCKS_PLUGIN_DIR . 'assets/fonts/helvetica-world.css';
    $dependencies = file_exists($font_css_path) ? array('webdune-fonts') : array();

    wp_enqueue_style(
      'webdune-global-styles',
      $shared_css,
      $dependencies, // Depend on fonts only if available
      filemtime($shared_css_path)
    );
  }

  // Enqueue JS (animations + analytics on frontend, shared styles in editor)
  if (file_exists($shared_js_path)) {
    $asset_file = file_exists($shared_asset_path) ? require($shared_asset_path) : array('dependencies' => array(), 'version' => WEBDUNE_BLOCKS_VERSION);

    $dependencies = $asset_file['dependencies'];
    if (!is_admin()) {
      // Strip editor-only dependencies that should never load on the frontend
      $editor_only_deps = array(
        'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-commands',
        'wp-preferences', 'wp-preferences-persistence', 'wp-notices',
        'wp-keyboard-shortcuts', 'wp-style-engine', 'wp-token-list',
        'wp-rich-text', 'wp-primitives', 'wp-autop', 'wp-blob',
        'wp-block-serialization-default-parser', 'wp-shortcode', 'wp-warning',
        'wp-deprecated', 'moment', 'wp-date', 'wp-compose', 'wp-data',
        'wp-redux-routine', 'wp-private-apis', 'wp-html-entities',
        'wp-keycodes', 'wp-priority-queue', 'wp-is-shallow-equal', 'wp-dom',
      );
      $dependencies = array_diff($dependencies, $editor_only_deps);
      $dependencies = array_merge($dependencies, array('gsap', 'gsap-scrolltrigger', 'lenis'));
    }

    wp_enqueue_script(
      'webdune-global-scripts',
      $shared_js,
      $dependencies,
      $asset_file['version'],
      is_admin() ? true : array('in_footer' => true, 'strategy' => 'defer')
    );
  }
}
add_action('wp_enqueue_scripts', 'webdune_blocks_enqueue_shared_styles', 15); // Priority 15 to load after animations
add_action('enqueue_block_editor_assets', 'webdune_blocks_enqueue_shared_styles', 10);

/**
 * Enqueue editor-only scripts (rich text format registrations)
 * These register toolbar buttons and must NOT load on the frontend
 */
function webdune_blocks_enqueue_editor_formats()
{
  $editor_js = WEBDUNE_BLOCKS_BUILD_URL . 'shared/editor-formats.js';
  $editor_js_path = WEBDUNE_BLOCKS_BUILD_DIR . 'shared/editor-formats.js';
  $editor_asset_path = WEBDUNE_BLOCKS_BUILD_DIR . 'shared/editor-formats.asset.php';

  if (file_exists($editor_js_path)) {
    $asset_file = file_exists($editor_asset_path) ? require($editor_asset_path) : array('dependencies' => array(), 'version' => WEBDUNE_BLOCKS_VERSION);

    wp_enqueue_script(
      'webdune-editor-formats',
      $editor_js,
      $asset_file['dependencies'],
      $asset_file['version'],
      true
    );
  }
}
add_action('enqueue_block_editor_assets', 'webdune_blocks_enqueue_editor_formats', 10);

/**
 * Enqueue GSAP and animation libraries from CDN
 * For smooth scrolling, parallax, and nav behaviors
 */
function webdune_blocks_enqueue_animations()
{
  // Only on frontend
  if (is_admin()) {
    return;
  }

  // GSAP from CDN (deferred to avoid render-blocking)
  wp_enqueue_script(
    'gsap',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
    array(),
    '3.12.2',
    array('in_footer' => true, 'strategy' => 'defer')
  );

  wp_enqueue_script(
    'gsap-scrolltrigger',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
    array('gsap'),
    '3.12.2',
    array('in_footer' => true, 'strategy' => 'defer')
  );

  // Lenis smooth scroll (deferred to avoid render-blocking)
  wp_enqueue_script(
    'lenis',
    'https://unpkg.com/lenis@1.3.11/dist/lenis.min.js',
    array(),
    '1.3.11',
    array('in_footer' => true, 'strategy' => 'defer')
  );

  // Note: Our custom animations (parallax, nav behaviors, etc.) are loaded
  // via global-styles.js with proper dependencies. See webdune_blocks_enqueue_shared_styles()
}
add_action('wp_enqueue_scripts', 'webdune_blocks_enqueue_animations', 10);

/**
 * Enqueue Swiper.js for sliders
 * Only loads when needed (performance optimization)
 */
function webdune_blocks_enqueue_swiper()
{
  // Check if page has slider blocks
  global $post;

  if (is_a($post, 'WP_Post') && (
    has_block('webdune/phone-slider', $post) ||
    has_block('webdune/reviews-marquee', $post)
  )) {
    // Swiper CSS
    wp_enqueue_style(
      'swiper-css',
      'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
      array(),
      '11.0.0'
    );

    // Swiper JS (deferred to avoid render-blocking)
    wp_enqueue_script(
      'swiper-js',
      'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
      array(),
      '11.0.0',
      array('in_footer' => true, 'strategy' => 'defer')
    );
  }
}
add_action('wp_enqueue_scripts', 'webdune_blocks_enqueue_swiper');

/**
 * Preload critical fonts to eliminate the CSS→font discovery chain.
 * Without this, fonts only start downloading after helvetica-world.css is parsed.
 */
function webdune_blocks_preload_fonts()
{
  if (is_admin()) {
    return;
  }

  $font_url = WEBDUNE_BLOCKS_ASSETS_URL . 'fonts/';
  $fonts = array('HelveticaWorld-Regular.woff2', 'HelveticaWorld-Bold.woff2');

  foreach ($fonts as $font) {
    printf(
      '<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n",
      esc_url($font_url . $font)
    );
  }
}
add_action('wp_head', 'webdune_blocks_preload_fonts', 1);

/**
 * Dequeue third-party plugin assets that should not load on the frontend.
 * Runs at priority 999 so it fires after all plugins have enqueued.
 */
function webdune_blocks_dequeue_frontend_bloat()
{
  if (is_admin()) {
    return;
  }

  global $wp_styles, $wp_scripts;

  // copy-delete-posts: admin-only plugin loading 5 CSS + 6 JS on every page
  foreach ($wp_styles->registered as $handle => $style) {
    if (isset($style->src) && strpos($style->src, 'copy-delete-posts') !== false) {
      wp_dequeue_style($handle);
    }
  }
  foreach ($wp_scripts->registered as $handle => $script) {
    if (isset($script->src) && strpos($script->src, 'copy-delete-posts') !== false) {
      wp_dequeue_script($handle);
    }
  }

  // Contact Form 7: only needed on pages that actually have a form
  global $post;
  if (is_a($post, 'WP_Post') && !has_shortcode($post->post_content, 'contact-form-7') && !has_block('contact-form-7/contact-form-selector', $post)) {
    wp_dequeue_style('contact-form-7');
    wp_dequeue_script('contact-form-7');
    wp_dequeue_script('wpcf7-recaptcha');
  }
}
add_action('wp_enqueue_scripts', 'webdune_blocks_dequeue_frontend_bloat', 999);

/**
 * REMOVED: Custom image sizes
 * 
 * CRITICAL FIX: Custom image sizes caused massive storage bloat (3GB+ wasted space)
 * with 4000+ images on the site, leading to full storage and login failures.
 * 
 * Now using WordPress default sizes:
 * - Phone slider: 'medium' (300x300) - CSS handles aspect ratio
 * - All thumbnails: 'thumbnail' (150x150)  
 * - Tips images: 'large' (1024x1024)
 * - Heroes: 'full' (original)
 * 
 * No custom sizes = no storage bloat = happy site 🎉
 */
// function webdune_blocks_image_sizes() { } // REMOVED ENTIRELY

/**
 * Include helper functions and custom post types
 */
require_once WEBDUNE_BLOCKS_PLUGIN_DIR . 'includes/post-types.php';
require_once WEBDUNE_BLOCKS_PLUGIN_DIR . 'includes/phone-queries.php';
require_once WEBDUNE_BLOCKS_PLUGIN_DIR . 'includes/block-helpers.php';
require_once WEBDUNE_BLOCKS_PLUGIN_DIR . 'includes/emoji-fix.php';

/**
 * AJAX handler for phone search
 * Searches phone posts and returns results with price ranges
 */
function webdune_ajax_search_phones()
{
  // Verify nonce for security
  check_ajax_referer('webdune_phone_search', 'nonce');

  // Get search term
  $search_term = isset($_GET['search']) ? sanitize_text_field($_GET['search']) : '';

  // Get limit (default 3)
  $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 3;

  // Search phones using helper function
  $results = webdune_search_phones($search_term, $limit);

  // Return JSON response
  wp_send_json_success($results);
}
add_action('wp_ajax_search_phones', 'webdune_ajax_search_phones');
add_action('wp_ajax_nopriv_search_phones', 'webdune_ajax_search_phones');

/**
 * Enqueue phone search AJAX variables
 * Makes AJAX URL and nonce available to JavaScript
 */
function webdune_enqueue_ajax_vars()
{
  // Localize to the hero block's view script
  wp_localize_script(
    'webdune-hero-view-script',
    'webdunePhoneSearch',
    array(
      'ajaxUrl' => admin_url('admin-ajax.php'),
      'nonce'   => wp_create_nonce('webdune_phone_search'),
    )
  );
}
add_action('wp_enqueue_scripts', 'webdune_enqueue_ajax_vars');

/**
 * Check if required plugins are active
 * Displays admin notice if ACF is not active
 */
function webdune_blocks_check_dependencies()
{
  if (!function_exists('get_field')) {
    add_action('admin_notices', 'webdune_blocks_acf_missing_notice');
  }
}
add_action('plugins_loaded', 'webdune_blocks_check_dependencies');

/**
 * Display admin notice when ACF is missing
 */
function webdune_blocks_acf_missing_notice()
{
?>
  <div class="notice notice-warning">
    <p>
      <strong>Webdune Blocks:</strong> Advanced Custom Fields (ACF) plugin is recommended for full functionality.
      Phone pricing features will not work without ACF.
    </p>
  </div>
<?php
}

/**
 * Plugin activation
 */
function webdune_blocks_activate()
{
  // Flush rewrite rules
  flush_rewrite_rules();

  // Add option to track version
  add_option('webdune_blocks_version', WEBDUNE_BLOCKS_VERSION);
}
register_activation_hook(__FILE__, 'webdune_blocks_activate');

/**
 * Plugin deactivation
 */
function webdune_blocks_deactivate()
{
  // Flush rewrite rules
  flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'webdune_blocks_deactivate');

/**
 * Load plugin text domain for translations
 */
function webdune_blocks_load_textdomain()
{
  load_plugin_textdomain(
    'webdune-blocks',
    false,
    dirname(plugin_basename(__FILE__)) . '/languages'
  );
}
add_action('plugins_loaded', 'webdune_blocks_load_textdomain');

/**
 * Add max_price field to REST API
 * Exposes phone pricing data to the phone slider block
 */
function webdune_blocks_register_rest_fields()
{
  register_rest_field(
    'post',
    'max_price',
    array(
      'get_callback' => function ($post) {
        $price_range = webdune_get_phone_price_range($post['id']);
        return $price_range['max'];
      },
      'schema' => array(
        'description' => __('Maximum price for this phone', 'webdune-blocks'),
        'type' => 'integer',
      ),
    )
  );
}
add_action('rest_api_init', 'webdune_blocks_register_rest_fields');

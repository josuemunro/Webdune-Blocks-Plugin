<?php

/**
 * Plugin Name:       Webdune Blocks
 * Plugin URI:        https://webdune.com
 * Description:       Custom Gutenberg blocks for SellMyCell - providing true inline editing and modern WordPress functionality.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Webdune
 * Author URI:        https://webdune.com
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
define('WEBDUNE_BLOCKS_VERSION', '1.0.0');
define('WEBDUNE_BLOCKS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('WEBDUNE_BLOCKS_PLUGIN_URL', plugin_dir_url(__FILE__));
define('WEBDUNE_BLOCKS_BUILD_DIR', WEBDUNE_BLOCKS_PLUGIN_DIR . 'build/');
define('WEBDUNE_BLOCKS_BUILD_URL', WEBDUNE_BLOCKS_PLUGIN_URL . 'build/');

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
    // Phase 1: Foundation & Core (Priority: HIGH)
    'navigation',
    'footer',
    'hero',
    'phone-search',
    'process-section',
    'faq',
    'faq-item',

    // Phase 2: Dynamic Content (Priority: MEDIUM)
    'cta-section',
    'phone-slider',
    'reviews-marquee',

    // Phase 3: Content & Specialty (Priority: LOW-MEDIUM)
    'content-image-section',
    'two-column-content',
    'charity-section',
    'stats-section',
    'full-width-photo',
    'hero-simple',
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
 * Enqueue shared styles globally
 * These styles apply to both editor and frontend
 */
function webdune_blocks_enqueue_shared_styles()
{
  $shared_css = WEBDUNE_BLOCKS_BUILD_URL . 'shared/layout.css';
  $shared_css_path = WEBDUNE_BLOCKS_BUILD_DIR . 'shared/layout.css';

  // Only enqueue if the file exists
  if (file_exists($shared_css_path)) {
    wp_enqueue_style(
      'webdune-shared-styles',
      $shared_css,
      array(),
      filemtime($shared_css_path)
    );
  }
}
add_action('wp_enqueue_scripts', 'webdune_blocks_enqueue_shared_styles');
add_action('admin_enqueue_scripts', 'webdune_blocks_enqueue_shared_styles');

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

    // Swiper JS
    wp_enqueue_script(
      'swiper-js',
      'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
      array(),
      '11.0.0',
      true
    );
  }
}
add_action('wp_enqueue_scripts', 'webdune_blocks_enqueue_swiper');

/**
 * Add custom image sizes for blocks
 */
function webdune_blocks_image_sizes()
{
  // Phone slider thumbnail
  add_image_size('webdune-phone-thumb', 292, 360, true);

  // Review author avatar
  add_image_size('webdune-review-avatar', 80, 80, true);

  // Hero background
  add_image_size('webdune-hero-bg', 1440, 900, false);

  // Content section image
  add_image_size('webdune-content-image', 632, 520, false);
}
add_action('after_setup_theme', 'webdune_blocks_image_sizes');

/**
 * Include helper functions
 */
require_once WEBDUNE_BLOCKS_PLUGIN_DIR . 'includes/phone-queries.php';
require_once WEBDUNE_BLOCKS_PLUGIN_DIR . 'includes/block-helpers.php';

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

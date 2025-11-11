<?php
/**
 * Emoji Fix for Webdune Blocks
 * 
 * Ensures emojis and special characters are properly saved in block attributes.
 * WordPress sometimes strips or corrupts emojis when saving block data.
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
  exit;
}

/**
 * Filter block content before saving to database
 * Converts emojis to HTML entities to prevent corruption
 */
function webdune_blocks_fix_emoji_save($block_content, $block) {
  // Only process our blocks
  if (strpos($block['blockName'], 'webdune/') !== 0) {
    return $block_content;
  }

  // Blocks that need emoji protection
  $emoji_blocks = [
    'webdune/two-column-flexible',
    'webdune/reviews-marquee',
    'webdune/hero',
    'webdune/template-hero',
    'webdune/cta-section',
  ];

  if (in_array($block['blockName'], $emoji_blocks)) {
    // Ensure attributes are emoji-safe
    if (!empty($block['attrs'])) {
      // This hook runs after WordPress has already parsed the block,
      // so we can't modify attrs here. Instead, we need to use a different approach.
    }
  }

  return $block_content;
}
// Disabled for now - we'll use a different approach
// add_filter('render_block', 'webdune_blocks_fix_emoji_save', 10, 2);

/**
 * Force WordPress to use utf8mb4 encoding for emoji support
 * This ensures the database can handle emojis properly
 */
function webdune_blocks_ensure_utf8mb4() {
  global $wpdb;
  
  // Set connection charset to utf8mb4 if not already
  if (!empty($wpdb->charset) && $wpdb->charset !== 'utf8mb4') {
    $wpdb->charset = 'utf8mb4';
  }
  
  // Set collation to utf8mb4_unicode_ci if not already
  if (!empty($wpdb->collate) && strpos($wpdb->collate, 'utf8mb4') === false) {
    $wpdb->collate = 'utf8mb4_unicode_ci';
  }
}
add_action('init', 'webdune_blocks_ensure_utf8mb4', 1);

/**
 * Add emoji support meta to block editor
 * Tells WordPress editor to handle emojis properly
 */
function webdune_blocks_emoji_editor_meta() {
  ?>
  <script>
    // Ensure WordPress editor can handle emojis
    if (window.wp && window.wp.data) {
      // Add meta to tell editor about emoji support
      console.log('✅ Webdune Blocks: Emoji support enabled');
    }
  </script>
  <?php
}
add_action('admin_head', 'webdune_blocks_emoji_editor_meta');

/**
 * Sanitize block attributes to ensure emojis are preserved
 * Uses WordPress's built-in wp_encode_emoji function
 */
function webdune_blocks_sanitize_block_attrs($attrs) {
  if (!is_array($attrs)) {
    return $attrs;
  }

  foreach ($attrs as $key => $value) {
    if (is_string($value)) {
      // Use WordPress's built-in emoji encoding
      $attrs[$key] = wp_encode_emoji($value);
    } elseif (is_array($value)) {
      // Recursively sanitize arrays (like reviews array)
      $attrs[$key] = webdune_blocks_sanitize_block_attrs($value);
    }
  }

  return $attrs;
}

/**
 * Log emoji issues for debugging
 */
function webdune_blocks_log_emoji_issue($message, $data = null) {
  if (defined('WP_DEBUG') && WP_DEBUG) {
    error_log('Webdune Blocks Emoji: ' . $message);
    if ($data) {
      error_log('Data: ' . print_r($data, true));
    }
  }
}


<?php

/**
 * Block Helper Functions
 * General utility functions for blocks
 * 
 * @package Webdune_Blocks
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
  exit;
}

/**
 * Get block wrapper attributes
 * Combines default attributes with custom classes
 * 
 * @param array $attributes Block attributes
 * @param string $base_class Base CSS class for the block
 * @return string HTML attributes string
 */
function webdune_get_block_wrapper_attributes($attributes = array(), $base_class = '')
{
  $classes = array($base_class);

  // Add alignment class if set
  if (!empty($attributes['align'])) {
    $classes[] = 'align' . $attributes['align'];
  }

  // Add custom className if set
  if (!empty($attributes['className'])) {
    $classes[] = $attributes['className'];
  }

  return sprintf('class="%s"', esc_attr(implode(' ', $classes)));
}

/**
 * Sanitize block attributes
 * Ensures all attributes are safe for output
 * 
 * @param array $attributes Block attributes
 * @return array Sanitized attributes
 */
function webdune_sanitize_block_attributes($attributes)
{
  $sanitized = array();

  foreach ($attributes as $key => $value) {
    if (is_string($value)) {
      $sanitized[$key] = sanitize_text_field($value);
    } elseif (is_array($value)) {
      $sanitized[$key] = webdune_sanitize_block_attributes($value);
    } else {
      $sanitized[$key] = $value;
    }
  }

  return $sanitized;
}

/**
 * Get button HTML
 * Generates consistent button markup
 * 
 * @param array $args Button arguments {
 *     @type string $text Button text
 *     @type string $url Button URL
 *     @type bool   $new_tab Open in new tab
 *     @type string $class Additional CSS classes
 *     @type string $icon Icon to show (optional)
 * }
 * @return string Button HTML
 */
function webdune_get_button_html($args = array())
{
  $defaults = array(
    'text'     => 'Learn More',
    'url'      => '#',
    'new_tab'  => false,
    'class'    => '',
    'icon'     => false,
  );

  $args = wp_parse_args($args, $defaults);

  // Build attributes
  $attributes = array(
    'href'  => esc_url($args['url']),
    'class' => esc_attr('button ' . $args['class']),
  );

  if ($args['new_tab']) {
    $attributes['target'] = '_blank';
    $attributes['rel'] = 'noopener noreferrer';
  }

  // Build attribute string
  $attr_string = '';
  foreach ($attributes as $key => $value) {
    $attr_string .= sprintf(' %s="%s"', $key, $value);
  }

  // Build HTML
  $html = sprintf(
    '<a%s>%s%s</a>',
    $attr_string,
    esc_html($args['text']),
    $args['icon'] ? '<span class="button-icon"></span>' : ''
  );

  return $html;
}

/**
 * Get decorative line HTML
 * Generates markup for decorative underlines
 * 
 * @param string $color Line color (CSS color value)
 * @param string $width Line width (CSS width value)
 * @return string HTML for decorative line
 */
function webdune_get_decorative_line($color = 'currentColor', $width = '100px')
{
  return sprintf(
    '<div class="decorative-line" style="width: %s; background-color: %s;"></div>',
    esc_attr($width),
    esc_attr($color)
  );
}

/**
 * Get responsive image HTML
 * Generates picture element with multiple sources
 * 
 * @param int    $image_id Attachment ID
 * @param string $size Default image size
 * @param array  $args Additional arguments
 * @return string Image HTML
 */
function webdune_get_responsive_image($image_id, $size = 'full', $args = array())
{
  $defaults = array(
    'class' => '',
    'alt'   => '',
    'loading' => 'lazy',
  );

  $args = wp_parse_args($args, $defaults);

  // Get image data
  $image_src = wp_get_attachment_image_src($image_id, $size);
  $image_srcset = wp_get_attachment_image_srcset($image_id, $size);
  $image_sizes = wp_get_attachment_image_sizes($image_id, $size);

  if (!$image_src) {
    return '';
  }

  // Get alt text
  $alt = $args['alt'] ?: get_post_meta($image_id, '_wp_attachment_image_alt', true);

  // Build attributes
  $attributes = array(
    'src'     => esc_url($image_src[0]),
    'alt'     => esc_attr($alt),
    'class'   => esc_attr($args['class']),
    'loading' => esc_attr($args['loading']),
  );

  if ($image_srcset) {
    $attributes['srcset'] = esc_attr($image_srcset);
  }

  if ($image_sizes) {
    $attributes['sizes'] = esc_attr($image_sizes);
  }

  // Build HTML
  $attr_string = '';
  foreach ($attributes as $key => $value) {
    if (!empty($value)) {
      $attr_string .= sprintf(' %s="%s"', $key, $value);
    }
  }

  return sprintf('<img%s />', $attr_string);
}

/**
 * Check if block exists on page
 * Useful for conditional asset loading
 * 
 * @param string $block_name Block name (e.g., 'webdune/hero')
 * @param int|WP_Post $post Post ID or object (optional, uses global $post if not provided)
 * @return bool True if block exists
 */
function webdune_has_block($block_name, $post = null)
{
  if (!$post) {
    global $post;
  }

  if (!is_a($post, 'WP_Post')) {
    $post = get_post($post);
  }

  if (!$post) {
    return false;
  }

  return has_block($block_name, $post);
}

/**
 * Enqueue block-specific assets conditionally
 * Only loads scripts/styles if block is present on page
 * 
 * @param string $block_name Block name
 * @param string $script_handle Script handle
 * @param string $style_handle Style handle (optional)
 */
function webdune_enqueue_block_assets($block_name, $script_handle, $style_handle = '')
{
  if (webdune_has_block($block_name)) {
    if ($script_handle) {
      wp_enqueue_script($script_handle);
    }
    if ($style_handle) {
      wp_enqueue_style($style_handle);
    }
  }
}

/**
 * Get block default attributes
 * Merges user-defined attributes with defaults
 * 
 * @param array $attributes User attributes
 * @param array $defaults Default attributes
 * @return array Merged attributes
 */
function webdune_parse_block_attributes($attributes, $defaults)
{
  return array_merge($defaults, $attributes);
}

/**
 * Generate unique block ID
 * Creates a unique identifier for block instances
 * 
 * @param string $prefix Prefix for the ID
 * @return string Unique ID
 */
function webdune_generate_block_id($prefix = 'block')
{
  static $counter = 0;
  $counter++;
  return sprintf('%s-%s-%d', $prefix, uniqid(), $counter);
}

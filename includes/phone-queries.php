<?php

/**
 * Phone Query Helper Functions
 * Functions for querying phone posts and calculating prices
 * 
 * @package Webdune_Blocks
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
  exit;
}

/**
 * Search phones by keyword
 * Used by the phone-search block
 * 
 * @param string $search_term The search keyword
 * @param int    $limit       Number of results to return (default 3)
 * @return array Array of phone posts with calculated prices
 */
function webdune_search_phones($search_term = '', $limit = 3)
{
  // Sanitize search term
  $search_term = sanitize_text_field($search_term);

  if (empty($search_term)) {
    return array();
  }

  // Query arguments
  $args = array(
    'post_type'      => 'post', // Change to 'phone' if using custom post type
    'posts_per_page' => $limit,
    's'              => $search_term,
    'post_status'    => 'publish',
    'orderby'        => 'relevance',
  );

  $query = new WP_Query($args);
  $results = array();

  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();

      $post_id = get_the_ID();
      $results[] = array(
        'id'          => $post_id,
        'title'       => get_the_title(),
        'url'         => get_permalink(),
        'image'       => get_the_post_thumbnail_url($post_id, 'thumbnail'),
        'price_range' => webdune_get_phone_price_range($post_id),
      );
    }
    wp_reset_postdata();
  }

  return $results;
}

/**
 * Get phone price range
 * Calculates min and max prices based on ACF fields
 * 
 * @param int $post_id Post ID
 * @return array Array with 'min' and 'max' prices
 */
function webdune_get_phone_price_range($post_id)
{
  // Get capacity groups (ACF repeater field)
  // Adjust field names to match your ACF setup
  $capacities = get_field('capacity_groups', $post_id);

  if (empty($capacities)) {
    return array(
      'min' => 0,
      'max' => 0,
    );
  }

  $prices = array();

  // Loop through each capacity
  foreach ($capacities as $capacity) {
    // Base price for this capacity
    $base_price = isset($capacity['base_price']) ? floatval($capacity['base_price']) : 0;
    $prices[] = $base_price;
  }

  // Get condition modifiers (ACF repeater field)
  $conditions = get_field('condition_modifiers', $post_id);
  $condition_adjustments = array();

  if (!empty($conditions)) {
    foreach ($conditions as $condition) {
      $adjustment = isset($condition['price_adjustment']) ? floatval($condition['price_adjustment']) : 0;
      $condition_adjustments[] = $adjustment;
    }
  }

  // Get minimum possible price (ACF field)
  $minimum_price = get_field('minimum_price', $post_id);
  $minimum_price = $minimum_price ? floatval($minimum_price) : 100;

  // Calculate min and max
  $max_price = max($prices);
  $min_price = min($prices);

  // Apply worst condition modifier to get actual minimum
  if (!empty($condition_adjustments)) {
    $worst_adjustment = min($condition_adjustments);
    $min_price = max($minimum_price, $min_price + $worst_adjustment);
  }

  return array(
    'min' => intval($min_price),
    'max' => intval($max_price),
  );
}

/**
 * Get phones for slider
 * Can get latest, by category, or specific selection
 * 
 * @param array $args Query arguments
 * @return array Array of phone posts
 */
function webdune_get_phones_for_slider($args = array())
{
  $defaults = array(
    'method'       => 'latest',      // 'latest', 'manual', 'category'
    'number'       => 5,
    'post_ids'     => array(),       // For 'manual' method
    'category_id'  => 0,             // For 'category' method
  );

  $args = wp_parse_args($args, $defaults);

  // Base query args
  $query_args = array(
    'post_type'      => 'post',
    'posts_per_page' => $args['number'],
    'post_status'    => 'publish',
  );

  // Adjust based on method
  switch ($args['method']) {
    case 'manual':
      if (!empty($args['post_ids'])) {
        $query_args['post__in'] = $args['post_ids'];
        $query_args['orderby'] = 'post__in';
      }
      break;

    case 'category':
      if ($args['category_id']) {
        $query_args['cat'] = $args['category_id'];
      }
      break;

    case 'latest':
    default:
      $query_args['orderby'] = 'date';
      $query_args['order'] = 'DESC';
      break;
  }

  $query = new WP_Query($query_args);
  $phones = array();

  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();

      $post_id = get_the_ID();
      $price_range = webdune_get_phone_price_range($post_id);

      $phones[] = array(
        'id'          => $post_id,
        'title'       => get_the_title(),
        'url'         => get_permalink(),
        'image'       => get_the_post_thumbnail_url($post_id, 'webdune-phone-thumb'),
        'image_alt'   => get_post_meta(get_post_thumbnail_id($post_id), '_wp_attachment_image_alt', true),
        'max_price'   => $price_range['max'],
      );
    }
    wp_reset_postdata();
  }

  return $phones;
}

/**
 * Format price for display
 * 
 * @param int|float $price Price value
 * @return string Formatted price with dollar sign
 */
function webdune_format_price($price)
{
  return '$' . number_format(floatval($price), 0);
}

/**
 * Get phone price range text
 * Formats the price range as "Get $X to $Y"
 * 
 * @param int $post_id Post ID
 * @return string Formatted price range text
 */
function webdune_get_price_range_text($post_id)
{
  $range = webdune_get_phone_price_range($post_id);

  if ($range['min'] === $range['max']) {
    return 'Get up to ' . webdune_format_price($range['max']);
  }

  return sprintf(
    'Get %s to %s',
    webdune_format_price($range['min']),
    webdune_format_price($range['max'])
  );
}

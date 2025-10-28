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
  // Get all capacity prices (individual ACF text fields)
  $capacities = array(
    '16gb'   => get_field('16gb', $post_id),
    '32gb'   => get_field('32gb', $post_id),
    '64gb'   => get_field('64gb', $post_id),
    '128gb'  => get_field('128gb', $post_id),
    '256gb'  => get_field('256gb', $post_id),
    '512gb'  => get_field('512gb', $post_id),
    '1tb'    => get_field('1tb', $post_id),
  );

  // Filter out empty values and convert to float
  $capacity_prices = array();
  foreach ($capacities as $capacity => $price) {
    if (!empty($price) && is_numeric($price)) {
      $capacity_prices[] = floatval($price);
    }
  }

  // If no capacities set, return 0
  if (empty($capacity_prices)) {
    return array(
      'min' => 0,
      'max' => 0,
    );
  }

  // Get condition deductions (individual ACF text fields)
  // These are amounts to SUBTRACT from the base capacity price
  $conditions = array(
    'flawless_'   => get_field('flawless_', $post_id),    // Usually 0
    'good_'       => get_field('good_', $post_id),        // e.g. 80
    'poor_broken' => get_field('poor_broken', $post_id),  // e.g. 450
    'broken'      => get_field('broken', $post_id),       // e.g. 700
  );

  // Filter out empty values and convert to float
  $condition_deductions = array();
  foreach ($conditions as $condition => $deduction) {
    if (!empty($deduction) && is_numeric($deduction)) {
      $condition_deductions[] = floatval($deduction);
    }
  }

  // Get minimum possible offer (ACF number field)
  // Note: Field name has typo "offter" instead of "offer"
  $minimum_offer = get_field('minimum_possible_offter', $post_id);
  $minimum_offer = $minimum_offer ? floatval($minimum_offer) : 100;

  // Calculate MAX price: Highest capacity with best condition (Flawless = 0 deduction)
  $max_capacity = max($capacity_prices);
  $best_condition = !empty($condition_deductions) ? min($condition_deductions) : 0;
  $max_price = $max_capacity - $best_condition;

  // Calculate MIN price: Lowest capacity with worst condition, but not below minimum
  $min_capacity = min($capacity_prices);
  $worst_condition = !empty($condition_deductions) ? max($condition_deductions) : 0;
  $min_price = max($minimum_offer, $min_capacity - $worst_condition);

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

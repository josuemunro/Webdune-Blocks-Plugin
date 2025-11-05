<?php

/**
 * Custom Post Type: Tips
 * 
 * Registers the Tips post type for blog-style articles.
 * Uses a locked block template to maintain consistent structure.
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
  exit;
}

/**
 * Get navigation block for Tips template
 * Uses site-header pattern (ID: 19396) if it exists, otherwise fallback to Webdune Navigation
 */
function webdune_get_tips_navigation_block()
{
  // Check if site-header pattern exists
  $pattern_exists = get_post_status(19396) === 'publish';
  
  if ($pattern_exists) {
    return array('core/block', array(
      'ref' => 19396,
      'lock' => array('move' => true, 'remove' => true),
    ));
  }
  
  // Fallback to Webdune Navigation
  return array('webdune/navigation', array(
    'lock' => array('move' => true, 'remove' => true),
  ));
}

/**
 * Get footer block for Tips template
 * Uses site-footer pattern (ID: 19397) if it exists, otherwise fallback to Webdune Footer
 */
function webdune_get_tips_footer_block()
{
  // Check if site-footer pattern exists
  $pattern_exists = get_post_status(19397) === 'publish';
  
  if ($pattern_exists) {
    return array('core/block', array(
      'ref' => 19397,
      'lock' => array('move' => true, 'remove' => true),
    ));
  }
  
  // Fallback to Webdune Footer
  return array('webdune/footer', array(
    'lock' => array('move' => true, 'remove' => true),
  ));
}

/**
 * Register Tips Custom Post Type
 */
function webdune_register_tips_post_type()
{
  $labels = array(
    'name'                  => _x('Tips', 'Post Type General Name', 'webdune-blocks'),
    'singular_name'         => _x('Tip', 'Post Type Singular Name', 'webdune-blocks'),
    'menu_name'             => __('Tips', 'webdune-blocks'),
    'name_admin_bar'        => __('Tip', 'webdune-blocks'),
    'archives'              => __('Tip Archives', 'webdune-blocks'),
    'attributes'            => __('Tip Attributes', 'webdune-blocks'),
    'parent_item_colon'     => __('Parent Tip:', 'webdune-blocks'),
    'all_items'             => __('All Tips', 'webdune-blocks'),
    'add_new_item'          => __('Add New Tip', 'webdune-blocks'),
    'add_new'               => __('Add New', 'webdune-blocks'),
    'new_item'              => __('New Tip', 'webdune-blocks'),
    'edit_item'             => __('Edit Tip', 'webdune-blocks'),
    'update_item'           => __('Update Tip', 'webdune-blocks'),
    'view_item'             => __('View Tip', 'webdune-blocks'),
    'view_items'            => __('View Tips', 'webdune-blocks'),
    'search_items'          => __('Search Tip', 'webdune-blocks'),
    'not_found'             => __('Not found', 'webdune-blocks'),
    'not_found_in_trash'    => __('Not found in Trash', 'webdune-blocks'),
    'featured_image'        => __('Featured Image', 'webdune-blocks'),
    'set_featured_image'    => __('Set featured image', 'webdune-blocks'),
    'remove_featured_image' => __('Remove featured image', 'webdune-blocks'),
    'use_featured_image'    => __('Use as featured image', 'webdune-blocks'),
    'insert_into_item'      => __('Insert into tip', 'webdune-blocks'),
    'uploaded_to_this_item' => __('Uploaded to this tip', 'webdune-blocks'),
    'items_list'            => __('Tips list', 'webdune-blocks'),
    'items_list_navigation' => __('Tips list navigation', 'webdune-blocks'),
    'filter_items_list'     => __('Filter tips list', 'webdune-blocks'),
  );

  $args = array(
    'label'                 => __('Tip', 'webdune-blocks'),
    'description'           => __('Tips and helpful articles', 'webdune-blocks'),
    'labels'                => $labels,
    'supports'              => array('title', 'editor', 'excerpt', 'thumbnail', 'revisions'),
    'taxonomies'            => array('tip_category', 'tip_tag'),
    'hierarchical'          => false,
    'public'                => true,
    'show_ui'               => true,
    'show_in_menu'          => true,
    'menu_position'         => 5,
    'menu_icon'             => 'dashicons-lightbulb',
    'show_in_admin_bar'     => true,
    'show_in_nav_menus'     => true,
    'can_export'            => true,
    'has_archive'           => true,
    'exclude_from_search'   => false,
    'publicly_queryable'    => true,
    'capability_type'       => 'post',
    'show_in_rest'          => true, // Required for Gutenberg
    'rest_base'             => 'tips',
    'rewrite'               => array(
      'slug'       => 'tips',
      'with_front' => false,
    ),
    // Block template - locked structure for all Tips posts
    'template'              => array(
      // Navigation - uses site-header pattern (19396) or Webdune Navigation as fallback
      webdune_get_tips_navigation_block(),
      
      // Hero Section
      array('webdune/template-hero', array(
        'lock' => array(
          'move'   => true,
          'remove' => true,
        ),
      )),
      
      // Content Section (InnerBlocks with allowed blocks)
      array('core/group', array(
        'className' => 'tips-content-section',
        'layout' => array('type' => 'constrained'),
        'lock' => array(
          'move'   => true,
          'remove' => true,
        ),
        'templateLock' => false, // Allow adding/removing blocks inside
      ), array(
        // Introduction heading
        array('core/heading', array(
          'level' => 2,
          'placeholder' => 'Introduction',
        )),
        
        // Paragraph blocks
        array('core/paragraph', array(
          'placeholder' => 'Start writing your tip content here...',
        )),
        
        // Placeholder for more content
        array('core/paragraph', array(
          'placeholder' => 'Add more paragraphs, images, quotes, lists, etc.',
        )),
      )),
      
      // Related Tips Section
      array('webdune/related-tips', array(
        'lock' => array(
          'move'   => true,
          'remove' => true,
        ),
      )),
      
      // CTA Section
      array('webdune/cta-section', array(
        'lock' => array(
          'move'   => true,
          'remove' => true,
        ),
      )),
      
      // Footer - uses site-footer pattern (19397) or Webdune Footer as fallback
      webdune_get_tips_footer_block(),
    ),
    'template_lock'         => 'all', // Lock the template - can edit blocks but can't add/remove/move
  );

  register_post_type('tip', $args);
}
add_action('init', 'webdune_register_tips_post_type', 0);

/**
 * Register Tips Category Taxonomy
 */
function webdune_register_tip_category_taxonomy()
{
  $labels = array(
    'name'                       => _x('Tip Categories', 'Taxonomy General Name', 'webdune-blocks'),
    'singular_name'              => _x('Tip Category', 'Taxonomy Singular Name', 'webdune-blocks'),
    'menu_name'                  => __('Categories', 'webdune-blocks'),
    'all_items'                  => __('All Categories', 'webdune-blocks'),
    'parent_item'                => __('Parent Category', 'webdune-blocks'),
    'parent_item_colon'          => __('Parent Category:', 'webdune-blocks'),
    'new_item_name'              => __('New Category Name', 'webdune-blocks'),
    'add_new_item'               => __('Add New Category', 'webdune-blocks'),
    'edit_item'                  => __('Edit Category', 'webdune-blocks'),
    'update_item'                => __('Update Category', 'webdune-blocks'),
    'view_item'                  => __('View Category', 'webdune-blocks'),
    'separate_items_with_commas' => __('Separate categories with commas', 'webdune-blocks'),
    'add_or_remove_items'        => __('Add or remove categories', 'webdune-blocks'),
    'choose_from_most_used'      => __('Choose from the most used', 'webdune-blocks'),
    'popular_items'              => __('Popular Categories', 'webdune-blocks'),
    'search_items'               => __('Search Categories', 'webdune-blocks'),
    'not_found'                  => __('Not Found', 'webdune-blocks'),
    'no_terms'                   => __('No categories', 'webdune-blocks'),
    'items_list'                 => __('Categories list', 'webdune-blocks'),
    'items_list_navigation'      => __('Categories list navigation', 'webdune-blocks'),
  );

  $args = array(
    'labels'                     => $labels,
    'hierarchical'               => true, // Like categories
    'public'                     => true,
    'show_ui'                    => true,
    'show_admin_column'          => true,
    'show_in_nav_menus'          => true,
    'show_tagcloud'              => true,
    'show_in_rest'               => true, // Required for Gutenberg
    'rewrite'                    => array(
      'slug'       => 'tip-category',
      'with_front' => false,
    ),
  );

  register_taxonomy('tip_category', array('tip'), $args);
}
add_action('init', 'webdune_register_tip_category_taxonomy', 0);

/**
 * Register Tips Tag Taxonomy
 */
function webdune_register_tip_tag_taxonomy()
{
  $labels = array(
    'name'                       => _x('Tip Tags', 'Taxonomy General Name', 'webdune-blocks'),
    'singular_name'              => _x('Tip Tag', 'Taxonomy Singular Name', 'webdune-blocks'),
    'menu_name'                  => __('Tags', 'webdune-blocks'),
    'all_items'                  => __('All Tags', 'webdune-blocks'),
    'parent_item'                => __('Parent Tag', 'webdune-blocks'),
    'parent_item_colon'          => __('Parent Tag:', 'webdune-blocks'),
    'new_item_name'              => __('New Tag Name', 'webdune-blocks'),
    'add_new_item'               => __('Add New Tag', 'webdune-blocks'),
    'edit_item'                  => __('Edit Tag', 'webdune-blocks'),
    'update_item'                => __('Update Tag', 'webdune-blocks'),
    'view_item'                  => __('View Tag', 'webdune-blocks'),
    'separate_items_with_commas' => __('Separate tags with commas', 'webdune-blocks'),
    'add_or_remove_items'        => __('Add or remove tags', 'webdune-blocks'),
    'choose_from_most_used'      => __('Choose from the most used', 'webdune-blocks'),
    'popular_items'              => __('Popular Tags', 'webdune-blocks'),
    'search_items'               => __('Search Tags', 'webdune-blocks'),
    'not_found'                  => __('Not Found', 'webdune-blocks'),
    'no_terms'                   => __('No tags', 'webdune-blocks'),
    'items_list'                 => __('Tags list', 'webdune-blocks'),
    'items_list_navigation'      => __('Tags list navigation', 'webdune-blocks'),
  );

  $args = array(
    'labels'                     => $labels,
    'hierarchical'               => false, // Like tags
    'public'                     => true,
    'show_ui'                    => true,
    'show_admin_column'          => true,
    'show_in_nav_menus'          => true,
    'show_tagcloud'              => true,
    'show_in_rest'               => true, // Required for Gutenberg
    'rewrite'                    => array(
      'slug'       => 'tip-tag',
      'with_front' => false,
    ),
  );

  register_taxonomy('tip_tag', array('tip'), $args);
}
add_action('init', 'webdune_register_tip_tag_taxonomy', 0);

/**
 * Sync Tips post title with Template Hero heading
 * Updates post title when Template Hero heading changes
 */
function webdune_sync_tip_title_from_hero($post_id, $post, $update)
{
  // Only run on Tips posts
  if ($post->post_type !== 'tip') {
    return;
  }

  // Don't run on autosave or revisions
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return;
  }
  if (wp_is_post_revision($post_id)) {
    return;
  }

  // Get post content (blocks)
  $content = $post->post_content;
  
  // Parse blocks to find Template Hero
  $blocks = parse_blocks($content);
  
  foreach ($blocks as $block) {
    if ($block['blockName'] === 'webdune/template-hero') {
      // Get the heading from Template Hero
      $heading = isset($block['attrs']['heading']) ? $block['attrs']['heading'] : '';
      
      if (!empty($heading) && $heading !== $post->post_title) {
        // Remove this hook temporarily to avoid infinite loop
        remove_action('save_post_tip', 'webdune_sync_tip_title_from_hero', 10);
        
        // Update post title
        wp_update_post(array(
          'ID' => $post_id,
          'post_title' => wp_strip_all_tags($heading),
        ));
        
        // Re-add the hook
        add_action('save_post_tip', 'webdune_sync_tip_title_from_hero', 10, 3);
      }
      break;
    }
  }
}
add_action('save_post_tip', 'webdune_sync_tip_title_from_hero', 10, 3);

/**
 * Sync Tips post featured image with Template Hero image
 * Updates featured image when Template Hero image changes
 */
function webdune_sync_tip_featured_image_from_hero($post_id, $post, $update)
{
  // Only run on Tips posts
  if ($post->post_type !== 'tip') {
    return;
  }

  // Don't run on autosave or revisions
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return;
  }
  if (wp_is_post_revision($post_id)) {
    return;
  }

  // Get post content (blocks)
  $content = $post->post_content;
  
  // Parse blocks to find Template Hero
  $blocks = parse_blocks($content);
  
  foreach ($blocks as $block) {
    if ($block['blockName'] === 'webdune/template-hero') {
      // Get the image ID from Template Hero's mainImage attribute
      $main_image = isset($block['attrs']['mainImage']) ? $block['attrs']['mainImage'] : array();
      $image_id = isset($main_image['id']) ? intval($main_image['id']) : 0;
      
      if ($image_id > 0) {
        $current_featured_image = get_post_thumbnail_id($post_id);
        
        if ($image_id !== $current_featured_image) {
          // Update featured image
          set_post_thumbnail($post_id, $image_id);
        }
      }
      break;
    }
  }
}
add_action('save_post_tip', 'webdune_sync_tip_featured_image_from_hero', 20, 3);

/**
 * Add estimated read time to REST API
 */
function webdune_register_tip_rest_fields()
{
  register_rest_field(
    'tip',
    'estimated_read_time',
    array(
      'get_callback' => function ($post) {
        return webdune_calculate_read_time($post['id']);
      },
      'schema' => array(
        'description' => __('Estimated read time in minutes', 'webdune-blocks'),
        'type' => 'string',
      ),
    )
  );

  // Add featured image URL
  register_rest_field(
    'tip',
    'featured_image_url',
    array(
      'get_callback' => function ($post) {
        $image_id = get_post_thumbnail_id($post['id']);
        if ($image_id) {
          $image = wp_get_attachment_image_src($image_id, 'large');
          return $image ? $image[0] : '';
        }
        return '';
      },
      'schema' => array(
        'description' => __('Featured image URL', 'webdune-blocks'),
        'type' => 'string',
      ),
    )
  );
}
add_action('rest_api_init', 'webdune_register_tip_rest_fields');

/**
 * Calculate estimated read time
 * 
 * @param int $post_id Post ID
 * @return string Estimated read time (e.g. "5 min read")
 */
function webdune_calculate_read_time($post_id)
{
  $content = get_post_field('post_content', $post_id);
  $word_count = str_word_count(strip_tags($content));
  $read_time = ceil($word_count / 200); // Average reading speed: 200 words per minute

  if ($read_time < 1) {
    $read_time = 1;
  }

  return $read_time . ' min read';
}

/**
 * Restrict allowed blocks in Tips content section
 * Only allows specific content blocks for consistent formatting
 */
function webdune_restrict_tip_content_blocks($allowed_blocks, $block_editor_context)
{
  // Only apply to Tip post type
  if (!isset($block_editor_context->post) || $block_editor_context->post->post_type !== 'tip') {
    return $allowed_blocks;
  }

  // Allowed blocks for Tips content
  $allowed_blocks = array(
    // Text
    'core/paragraph',
    'core/heading',
    'core/list',
    'core/quote',
    'core/pullquote',
    
    // Media
    'core/image',
    'core/gallery',
    'core/video',
    'core/audio',
    'core/file',
    'core/embed',
    
    // Formatting
    'core/separator',
    'core/spacer',
    'core/table',
    'core/code',
    'core/preformatted',
    'core/html',
    
    // Webdune blocks
    'webdune/template-hero',
    'webdune/related-tips',
    'webdune/cta-section',
    'webdune/footer',
    
    // Core structure (for template)
    'core/group',
  );

  return $allowed_blocks;
}
add_filter('allowed_block_types_all', 'webdune_restrict_tip_content_blocks', 10, 2);

/**
 * Set default page template for Tips
 * Uses "Webdune Full Width" template if it exists, otherwise default
 */
function webdune_set_tip_default_template($post_id)
{
  // Only for tip post type
  if (get_post_type($post_id) !== 'tip') {
    return;
  }

  // Check if template is already set
  $current_template = get_page_template_slug($post_id);
  if ($current_template) {
    return; // Template already set, don't override
  }

  // Try to set "Webdune Full Width" template
  $templates = wp_get_theme()->get_page_templates(null, 'tip');
  
  // Look for various possible template file names
  $template_options = array(
    'templates/webdune-full-width.php',
    'template-webdune-full-width.php',
    'webdune-full-width.php',
    'page-templates/full-width.php',
    'full-width.php',
  );

  foreach ($template_options as $template) {
    if (isset($templates[$template]) || locate_template($template)) {
      update_post_meta($post_id, '_wp_page_template', $template);
      return;
    }
  }

  // If no Webdune Full Width template found, use default
  update_post_meta($post_id, '_wp_page_template', 'default');
}
add_action('save_post_tip', 'webdune_set_tip_default_template', 10, 1);


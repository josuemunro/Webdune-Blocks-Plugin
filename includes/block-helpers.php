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

/**
 * Render Tips Grid Block
 * Displays a grid of Tips posts with pagination
 * 
 * @param array $attributes Block attributes
 * @return string Block HTML
 */
function webdune_render_tips_grid_block($attributes)
{
  // Parse attributes with defaults
  $attributes = wp_parse_args($attributes, array(
    'postsPerPage' => 9,
    'showTags' => true,
    'showReadTime' => true,
    'showExcerpt' => true,
    'columns' => 3,
  ));

  // Get current page for pagination
  $paged = get_query_var('paged') ? get_query_var('paged') : 1;

  // Query Tips posts
  $query_args = array(
    'post_type' => 'tip',
    'posts_per_page' => $attributes['postsPerPage'],
    'paged' => $paged,
    'post_status' => 'publish',
    'orderby' => 'date',
    'order' => 'DESC',
  );

  $tips_query = new WP_Query($query_args);

  // Start output buffering
  ob_start();
?>
  <section class="tips-grid-section">
    <div class="padding-global">
      <div class="container-large">
        <div class="tips-grid">
          <?php if ($tips_query->have_posts()) : ?>
            <div class="tips-grid__list tips-grid__list--columns-<?php echo esc_attr($attributes['columns']); ?>" data-stagger-children="true">
              <?php while ($tips_query->have_posts()) : $tips_query->the_post(); ?>
                <article class="tips-grid__card">
                  <a href="<?php the_permalink(); ?>" class="tips-grid__card-link-wrapper">
                    <?php if (has_post_thumbnail()) : ?>
                      <div class="tips-grid__card-image">
                        <?php the_post_thumbnail('large', array('class' => 'tips-grid__card-img')); ?>
                      </div>
                    <?php endif; ?>

                    <div class="tips-grid__card-content">
                      <?php if ($attributes['showTags'] || $attributes['showReadTime']) : ?>
                        <div class="tips-grid__card-meta">
                          <?php if ($attributes['showTags']) :
                            $tags = get_the_terms(get_the_ID(), 'tip_tag');
                            if ($tags && !is_wp_error($tags)) :
                              $first_tag = array_shift($tags);
                          ?>
                              <span class="tips-grid__card-tag"><?php echo esc_html($first_tag->name); ?></span>
                          <?php endif;
                          endif; ?>

                          <?php if ($attributes['showReadTime']) : ?>
                            <span class="tips-grid__card-read-time">
                              <?php echo esc_html(webdune_calculate_read_time(get_the_ID())); ?>
                            </span>
                          <?php endif; ?>
                        </div>
                      <?php endif; ?>

                      <div class="tips-grid__card-text">
                        <h3 class="tips-grid__card-title">
                          <?php the_title(); ?>
                        </h3>

                        <?php if ($attributes['showExcerpt']) : ?>
                          <div class="tips-grid__card-excerpt">
                            <?php
                            // Limit excerpt to 20 words (same as related-tips)
                            $excerpt = get_the_excerpt();
                            echo wp_kses_post(wp_trim_words($excerpt, 20, '...'));
                            ?>
                          </div>
                        <?php endif; ?>
                      </div>

                      <div class="tips-grid__card-link">
                        <div class="tips-grid__card-link-inner">
                          <svg class="tips-grid__card-link-underline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87 3" fill="none">
                            <path d="M0.5 1.5C20.5 1.5 66.5 1.5 86.5 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                          </svg>
                          <span><?php _e('Read more', 'webdune-blocks'); ?></span>
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              <?php endwhile; ?>
            </div>

            <?php
            // Pagination
            if ($tips_query->max_num_pages > 1) :
              $big = 999999999;
              echo '<div class="tips-grid__pagination">';
              echo paginate_links(array(
                'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
                'format' => '?paged=%#%',
                'current' => max(1, $paged),
                'total' => $tips_query->max_num_pages,
                'prev_text' => __('&larr; Previous', 'webdune-blocks'),
                'next_text' => __('Next &rarr;', 'webdune-blocks'),
              ));
              echo '</div>';
            endif;
            ?>

          <?php else : ?>
            <div class="tips-grid__empty">
              <p><?php _e('No tips found.', 'webdune-blocks'); ?></p>
            </div>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </section>
<?php

  // Reset post data
  wp_reset_postdata();

  return ob_get_clean();
}

/**
 * Register Tips Grid block with render callback
 */
add_filter('render_block_webdune/tips-grid', function ($block_content, $block) {
  return webdune_render_tips_grid_block($block['attrs']);
}, 10, 2);

/**
 * Render Related Tips Block
 * Displays related Tips posts based on tags and categories
 * 
 * @param array $attributes Block attributes
 * @return string Block HTML
 */
function webdune_render_related_tips_block($attributes)
{
  // Parse attributes with defaults
  $attributes = wp_parse_args($attributes, array(
    'heading' => 'Related tips',
    'postsCount' => 3,
    'showButton' => true,
    'buttonText' => 'All posts',
    'buttonUrl' => '/tips',
  ));

  // Get current post ID
  global $post;
  if (!$post || $post->post_type !== 'tip') {
    return '';
  }

  $current_post_id = $post->ID;

  // Get tags and categories for the current post
  $tags = wp_get_post_terms($current_post_id, 'tip_tag', array('fields' => 'ids'));
  $categories = wp_get_post_terms($current_post_id, 'tip_category', array('fields' => 'ids'));

  // Build query args for related posts
  $query_args = array(
    'post_type' => 'tip',
    'posts_per_page' => $attributes['postsCount'],
    'post__not_in' => array($current_post_id),
    'post_status' => 'publish',
    'orderby' => 'date',
    'order' => 'DESC',
  );

  // Add tax query if tags or categories exist
  if (!empty($tags) || !empty($categories)) {
    $tax_query = array('relation' => 'OR');

    if (!empty($tags)) {
      $tax_query[] = array(
        'taxonomy' => 'tip_tag',
        'field' => 'term_id',
        'terms' => $tags,
      );
    }

    if (!empty($categories)) {
      $tax_query[] = array(
        'taxonomy' => 'tip_category',
        'field' => 'term_id',
        'terms' => $categories,
      );
    }

    $query_args['tax_query'] = $tax_query;
  }

  $related_query = new WP_Query($query_args);

  // Start output buffering
  ob_start();
?>
  <section class="related-tips-section">
    <div class="padding-global">
      <div class="container-large">
        <div class="related-tips">
          <div class="related-tips__header">
            <div class="related-tips__title-wrapper">
              <p class="related-tips__tagline"><?php _e('Tips', 'webdune-blocks'); ?></p>
              <h2 class="related-tips__heading"><?php echo wp_kses_post($attributes['heading']); ?></h2>
            </div>
            <?php if ($attributes['showButton']) : ?>
              <div class="related-tips__actions">
                <a href="<?php echo esc_url($attributes['buttonUrl']); ?>" class="button">
                  <?php echo esc_html($attributes['buttonText']); ?>
                </a>
              </div>
            <?php endif; ?>
          </div>

          <?php if ($related_query->have_posts()) : ?>
            <div class="related-tips__grid">
              <?php while ($related_query->have_posts()) : $related_query->the_post(); ?>
                <article class="related-tips__card">
                  <a href="<?php the_permalink(); ?>" class="related-tips__card-link-wrapper">
                    <?php if (has_post_thumbnail()) : ?>
                      <div class="related-tips__card-image">
                        <?php the_post_thumbnail('large', array('class' => 'related-tips__card-img')); ?>
                      </div>
                    <?php endif; ?>

                    <div class="related-tips__card-content">
                      <div class="related-tips__card-meta">
                        <?php
                        $tags = get_the_terms(get_the_ID(), 'tip_tag');
                        if ($tags && !is_wp_error($tags)) :
                          $first_tag = array_shift($tags);
                        ?>
                          <span class="related-tips__card-tag"><?php echo esc_html($first_tag->name); ?></span>
                        <?php endif; ?>
                        <span class="related-tips__card-read-time">
                          <?php echo esc_html(webdune_calculate_read_time(get_the_ID())); ?>
                        </span>
                      </div>

                      <div class="related-tips__card-text">
                        <h3 class="related-tips__card-title">
                          <?php the_title(); ?>
                        </h3>

                        <div class="related-tips__card-excerpt">
                          <?php
                          // Limit excerpt to 20 words
                          $excerpt = get_the_excerpt();
                          echo wp_kses_post(wp_trim_words($excerpt, 20, '...'));
                          ?>
                        </div>
                      </div>

                      <div class="related-tips__card-link">
                        <div class="related-tips__card-link-inner">
                          <svg class="related-tips__card-link-underline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87 3" fill="none">
                            <path d="M0.5 1.5C20.5 1.5 66.5 1.5 86.5 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                          </svg>
                          <span><?php _e('Read more', 'webdune-blocks'); ?></span>
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              <?php endwhile; ?>
            </div>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </section>
<?php

  // Reset post data
  wp_reset_postdata();

  return ob_get_clean();
}

/**
 * Register Related Tips block with render callback
 */
add_filter('render_block_webdune/related-tips', function ($block_content, $block) {
  return webdune_render_related_tips_block($block['attrs']);
}, 10, 2);

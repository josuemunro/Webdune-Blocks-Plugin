<?php

/**
 * Phone Slider Block - Server-side Render
 * Dynamically queries phone posts and renders the slider
 *
 * @param array $attributes Block attributes
 * @param string $content Block content (not used in dynamic blocks)
 * @param WP_Block $block Block instance
 * @return string HTML output
 */

// Extract attributes with defaults
$heading = isset($attributes['heading']) ? $attributes['heading'] : 'Your phone could be <span class="gradient-underline">worth more</span> than you think.';
$post_selection_method = isset($attributes['postSelectionMethod']) ? $attributes['postSelectionMethod'] : 'latest';
$selected_posts = isset($attributes['selectedPosts']) ? $attributes['selectedPosts'] : array();
$selected_category = isset($attributes['selectedCategory']) ? $attributes['selectedCategory'] : 0;
$number_of_posts = isset($attributes['numberOfPosts']) ? intval($attributes['numberOfPosts']) : 8;
$show_arrows = isset($attributes['showArrows']) ? $attributes['showArrows'] : true;
$autoplay = isset($attributes['autoplay']) ? $attributes['autoplay'] : false;
$autoplay_speed = isset($attributes['autoplaySpeed']) ? intval($attributes['autoplaySpeed']) : 3000;
$bottom_text = isset($attributes['bottomText']) ? $attributes['bottomText'] : 'We provide instant quotes on 80+ models - Apple, Samsung, Oppo, Sony, Google and Huawei. If yours isn\'t listed, just ask and we\'ll sort a custom quote.';
$button_text = isset($attributes['buttonText']) ? $attributes['buttonText'] : 'Find your model';
$button_url = isset($attributes['buttonUrl']) ? $attributes['buttonUrl'] : '/select-model';
$button_open_in_new_tab = isset($attributes['buttonOpenInNewTab']) ? $attributes['buttonOpenInNewTab'] : false;

// Build query args based on selection method
$query_args = array(
  'post_type' => 'post',
  'posts_per_page' => $number_of_posts,
  'post_status' => 'publish',
  'ignore_sticky_posts' => true,
);

switch ($post_selection_method) {
  case 'manual':
    if (!empty($selected_posts) && is_array($selected_posts)) {
      $query_args['post__in'] = array_map('intval', $selected_posts);
      $query_args['orderby'] = 'post__in';
    }
    break;

  case 'category':
    if ($selected_category > 0) {
      $query_args['cat'] = intval($selected_category);
    }
    break;

  case 'latest':
  default:
    $query_args['orderby'] = 'date';
    $query_args['order'] = 'DESC';
    break;
}

// Query phones
$phones_query = new WP_Query($query_args);

// DEBUG: Log query details to browser console
$debug_info = array(
  'selection_method' => $post_selection_method,
  'query_args' => $query_args,
  'found_posts' => $phones_query->found_posts,
  'post_count' => $phones_query->post_count,
  'sql_query' => $phones_query->request,
);

// Generate unique ID for this instance
$block_id = 'phone-slider-' . uniqid();

// Debug: Log that render.php is being called
error_log('Phone Slider render.php called - Selection Method: ' . $post_selection_method . ', Posts found: ' . $phones_query->found_posts);

// Start output buffering
ob_start();
?>

<section class="section_home-phones">
  <div class="padding-global">
    <div class="w-layout-blockcontainer container-small w-container">
      <div class="home-phones_header">
        <h2 class="text-align-center"><?php echo wp_kses_post($heading); ?></h2>
      </div>
    </div>
  </div>

  <!-- Phone Slider Debug -->
  <script>
    (function() {
      console.group('📱 Phone Slider Debug - <?php echo esc_js($block_id); ?>');
      console.log('Selection Method:', <?php echo json_encode($post_selection_method); ?>);
      console.log('Query Args:', <?php echo json_encode($query_args); ?>);
      console.log('Found Posts:', <?php echo intval($phones_query->found_posts); ?>);
      console.log('Post Count:', <?php echo intval($phones_query->post_count); ?>);
      <?php if ($post_selection_method === 'category' && $selected_category > 0) : ?>
        console.log('Selected Category:', <?php echo intval($selected_category); ?>);
      <?php endif; ?>
      <?php if ($post_selection_method === 'manual' && !empty($selected_posts)) : ?>
        console.log('Selected Posts:', <?php echo json_encode($selected_posts); ?>);
      <?php endif; ?>
      console.log('Has Posts:', <?php echo $phones_query->have_posts() ? 'YES' : 'NO'; ?>);
      console.groupEnd();
    })();
  </script>

  <?php if ($phones_query->have_posts()) : ?>
    <div class="home-phones_slider <?php echo esc_attr($block_id); ?>">
      <div class="phones-slider swiper-wrapper">
        <?php while ($phones_query->have_posts()) : $phones_query->the_post(); ?>
          <?php
          $phone_id = get_the_ID();
          $phone_title = get_the_title();
          $phone_url = get_permalink();
          $phone_image = get_the_post_thumbnail_url($phone_id, 'large');

          // Get price range using helper function
          $price_range = webdune_get_phone_price_range($phone_id);
          $max_price = isset($price_range['max']) ? $price_range['max'] : 0;
          ?>

          <a href="<?php echo esc_url($phone_url); ?>" class="phone-slide swiper-slide w-inline-block">
            <?php if ($phone_image) : ?>
              <img src="<?php echo esc_url($phone_image); ?>" loading="lazy" alt="<?php echo esc_attr($phone_title); ?>" class="phone-slide_img">
            <?php else : ?>
              <img src="<?php echo esc_url(plugins_url('assets/images/placeholder-phone.png', dirname(__FILE__, 3))); ?>" loading="lazy" alt="<?php echo esc_attr($phone_title); ?>" class="phone-slide_img">
            <?php endif; ?>

            <div class="phone-slide_content">
              <h3><?php echo esc_html($phone_title); ?></h3>
              <?php if ($max_price > 0) : ?>
                <div class="text-size-xlarge">Get up to <strong>$<?php echo esc_html($max_price); ?></strong></div>
              <?php endif; ?>
            </div>
          </a>
        <?php endwhile; ?>
      </div>

      <?php if ($show_arrows) : ?>
        <div class="padding-global phones-slider_arrows-wrapper">
          <div class="container-large phones-slider_container">
            <a href="#" class="phones-slider_arrow prev w-inline-block">
              <div class="icon-slider-arrow w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 28" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                  <path d="M15.4386 0.526291C15.0981 0.189398 14.6362 0 14.1544 0C13.6727 0 13.2107 0.189402 12.8702 0.526291L0.532341 12.7149C0.191428 13.0515 0 13.5083 0 13.9845C0 14.4607 0.191432 14.9175 0.532341 15.2541L12.8702 27.4428C13.2077 27.7933 13.674 27.9942 14.1634 27.9999C14.6527 28.0057 15.1238 27.8159 15.4696 27.4734C15.8153 27.131 16.0066 26.6649 15.9998 26.1811C15.9932 25.6973 15.789 25.2367 15.4339 24.9036L4.38026 13.9845L15.4339 3.06541C15.7754 2.72939 15.9678 2.2729 15.9687 1.79667C15.9694 1.32047 15.7787 0.863381 15.4385 0.526216L15.4386 0.526291Z" fill="currentColor" />
                </svg>
              </div>
            </a>
            <a href="#" class="phones-slider_arrow next w-inline-block">
              <div class="icon-slider-arrow w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 28" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                  <path d="M0.561444 0.526291C0.901915 0.189398 1.36381 0 1.84563 0C2.3273 0 2.78935 0.189402 3.12982 0.526291L15.4677 12.7149C15.8086 13.0515 16 13.5083 16 13.9845C16 14.4607 15.8086 14.9175 15.4677 15.2541L3.12982 27.4428C2.79231 27.7933 2.32598 27.9942 1.83663 27.9999C1.34729 28.0057 0.876244 27.8159 0.530437 27.4734C0.18465 27.131 -0.00662994 26.6649 0.00017643 26.1811C0.00682259 25.6973 0.210956 25.2367 0.566056 24.9036L11.6197 13.9845L0.566056 3.06541C0.224553 2.72939 0.0322409 2.2729 0.0313339 1.79667C0.0305948 1.32047 0.221288 0.863381 0.561481 0.526216L0.561444 0.526291Z" fill="currentColor" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      <?php endif; ?>
    </div>

    <script type="application/json" class="swiper-config" data-slider-id="<?php echo esc_attr($block_id); ?>">
      {
        "spaceBetween": 72,
        "loop": false,
        "initialSlide": <?php echo $phones_query->found_posts >= 3 ? 2 : 0; ?>,
        "slidesPerView": "auto",
        "centeredSlides": true,
        "autoplay": <?php echo $autoplay ? json_encode(array('delay' => $autoplay_speed)) : 'false'; ?>,
        "navigation": {
          "enabled": <?php echo $show_arrows ? 'true' : 'false'; ?>
        }
      }
    </script>

  <?php else : ?>
    <div class="padding-global">
      <div class="container-small">
        <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #856404;">⚠️ Phone Slider Debug Info</h3>
          <p><strong>No phones found!</strong> Check browser console (F12) for detailed debug information.</p>
          <ul style="text-align: left; margin: 10px 0;">
            <li><strong>Selection Method:</strong> <?php echo esc_html($post_selection_method); ?></li>
            <li><strong>Posts Per Page:</strong> <?php echo intval($number_of_posts); ?></li>
            <li><strong>Query Found:</strong> <?php echo intval($phones_query->found_posts); ?> posts</li>
            <?php if ($post_selection_method === 'category' && $selected_category > 0) : ?>
              <li><strong>Category ID:</strong> <?php echo intval($selected_category); ?>
                <?php
                $cat = get_category($selected_category);
                if ($cat) {
                  echo ' (' . esc_html($cat->name) . ' - ' . intval($cat->count) . ' posts)';
                } else {
                  echo ' <span style="color: red;">(Category not found!)</span>';
                }
                ?>
              </li>
            <?php endif; ?>
            <?php if ($post_selection_method === 'manual' && !empty($selected_posts)) : ?>
              <li><strong>Selected Post IDs:</strong> <?php echo esc_html(implode(', ', $selected_posts)); ?></li>
            <?php endif; ?>
          </ul>
          <p style="margin-bottom: 0;"><strong>Possible causes:</strong></p>
          <ul style="text-align: left; margin: 5px 0 0 0;">
            <li>No published posts exist</li>
            <li>Selected category has no posts</li>
            <li>Selected posts don't exist or aren't published</li>
            <li>Posts exist but query is filtering them out</li>
          </ul>
        </div>
      </div>
    </div>
  <?php endif; ?>

  <?php wp_reset_postdata(); ?>

  <div class="padding-global z-index-1">
    <div class="w-layout-blockcontainer container-xsmall w-container">
      <div class="home-phones_bottom-content">
        <p class="text-size-xxlarge text-align-center"><?php echo esc_html($bottom_text); ?></p>
        <a href="<?php echo esc_url($button_url); ?>" class="button w-button" <?php echo $button_open_in_new_tab ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>>
          <?php echo esc_html($button_text); ?>
        </a>
      </div>
    </div>
  </div>
</section>

<?php
return ob_get_clean();

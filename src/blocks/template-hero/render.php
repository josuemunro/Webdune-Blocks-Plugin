<?php

/**
 * Template Hero Block - Server-side Render
 * 
 * Adds dynamic content when on Tips post:
 * - "Tips" tagline above H1
 * - Read time below H1
 */

// Get block attributes
$layout_type = isset($attributes['layoutType']) ? $attributes['layoutType'] : 'image-phone';
$background_color = isset($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '#597AA1';
$heading = isset($attributes['heading']) ? $attributes['heading'] : '';
$subheading = isset($attributes['subheading']) ? $attributes['subheading'] : '';
$main_image = isset($attributes['mainImage']) ? $attributes['mainImage'] : array();
$phone_image = isset($attributes['phoneImage']) ? $attributes['phoneImage'] : array();
$show_down_arrow = isset($attributes['showDownArrow']) ? $attributes['showDownArrow'] : true;
$column_ratio_left = isset($attributes['columnRatioLeft']) ? $attributes['columnRatioLeft'] : 4;
$column_ratio_right = isset($attributes['columnRatioRight']) ? $attributes['columnRatioRight'] : 7;
$show_cta = isset($attributes['showCTA']) ? $attributes['showCTA'] : false;
$cta_text = isset($attributes['ctaText']) ? $attributes['ctaText'] : 'Learn more';
$cta_url = isset($attributes['ctaUrl']) ? $attributes['ctaUrl'] : '';
$cta_open_in_new_tab = isset($attributes['ctaOpenInNewTab']) ? $attributes['ctaOpenInNewTab'] : false;

// Check if we're on a Tips post
$is_tip_post = is_singular('tip');
$read_time = '';
if ($is_tip_post && function_exists('webdune_calculate_read_time')) {
  $read_time = webdune_calculate_read_time(get_the_ID());
}

// Build inline styles
$section_style = 'background-color: ' . esc_attr($background_color) . ';';
$grid_style = '';
if ($layout_type === 'wide-image') {
  $grid_style = 'grid-template-columns: ' . intval($column_ratio_left) . 'fr ' . intval($column_ratio_right) . 'fr;';
}

// Get wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes(array(
  'class' => 'webdune-template-hero-block',
));
?>

<section <?php echo $wrapper_attributes; ?>>
  <section class="section_template-hero" style="<?php echo $section_style; ?>">
    <div class="padding-global z-index-1">
      <div class="w-layout-blockcontainer container-large w-container">
        <div class="template-hero_content <?php echo $layout_type === 'wide-image' ? 'is-wide' : ''; ?>"
          <?php echo $grid_style ? 'style="' . esc_attr($grid_style) . '"' : ''; ?>>

          <div class="template-hero_left <?php echo $layout_type === 'wide-image' ? 'is-wide' : ''; ?>" data-stagger-children="true" data-delay="0.5" data-instant="true">
            <?php if ($is_tip_post) : ?>
              <div class="template-hero_tagline">Tips</div>
            <?php endif; ?>

            <?php if (!empty($heading)) : ?>
              <h1 class="text-color-white"><?php echo wp_kses_post($heading); ?></h1>
            <?php endif; ?>

            <?php if ($is_tip_post && !empty($read_time)) : ?>
              <div class="template-hero_read-time"><?php echo esc_html($read_time); ?></div>
            <?php endif; ?>

            <?php if (!empty($subheading)) : ?>
              <p class="text-size-xlarge text-color-white"><?php echo wp_kses_post($subheading); ?></p>
            <?php endif; ?>

            <?php if ($show_cta && !empty($cta_text)) : ?>
              <div class="template-hero_cta" style="margin-top: 24px;">
                <a
                  href="<?php echo esc_url($cta_url ? $cta_url : '#'); ?>"
                  class="button w-button"
                  <?php echo $cta_open_in_new_tab ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>>
                  <?php echo esc_html($cta_text); ?>
                </a>
              </div>
            <?php endif; ?>

            <?php if ($show_down_arrow) : ?>
              <div class="template-hero_down-arrow w-embed" data-fade-in="true" data-fade-delay="0.5" data-bounce-loop="true" data-instant="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 54" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                  <path d="M9.07488 0L8.82334 49.635L1.63214 42.4326L0 44.0348L9.94975 54L20 44.1344L18.3842 42.5161L11.1203 49.6465L11.3719 0.0114446L9.07488 0Z" fill="currentColor"></path>
                </svg>
              </div>
            <?php endif; ?>
          </div>

          <div class="template-hero_right <?php echo $layout_type === 'wide-image' ? 'is-wide' : ''; ?>">
            <?php if (!empty($main_image['url'])) : ?>
              <img
                src="<?php echo esc_url($main_image['url']); ?>"
                loading="lazy"
                alt="<?php echo !empty($main_image['alt']) ? esc_attr($main_image['alt']) : ''; ?>"
                class="template-hero_img-main <?php echo $layout_type === 'wide-image' ? 'is-wide' : ''; ?>"
                data-fade-up="true" data-delay="0.5" data-instant="true" />
            <?php endif; ?>

            <?php if ($layout_type === 'image-phone' && !empty($phone_image['url'])) : ?>
              <div class="template-hero_img-phone-wrapper"
                data-fade-up="true"
                data-fade-delay="0.7"
                data-instant="true">
                <img
                  src="<?php echo esc_url($phone_image['url']); ?>"
                  loading="lazy"
                  alt="<?php echo !empty($phone_image['alt']) ? esc_attr($phone_image['alt']) : ''; ?>"
                  class="template-hero_img-phone" />
              </div>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </div>
  </section>
</section>
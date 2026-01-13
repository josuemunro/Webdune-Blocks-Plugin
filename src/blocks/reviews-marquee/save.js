import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { heading, googleRating, reviewCount, reviews, autoplaySpeed, blockId } = attributes;

  const blockProps = useBlockProps.save({
    className: 'section_home-reviews',
  });

  return (
    <section {...blockProps}>
      <div className="padding-global z-index-1">
        <div className="w-layout-blockcontainer container-small w-container">
          <div className="home-reviews_content">
            <RichText.Content
              tagName="h2"
              className="text-align-center"
              value={heading}
              data-fade-up="true"
            />
            <div className="reviews_tag" data-fade-up="true">
              <img
                src="https://cdn.prod.website-files.com/68f9aab9d5bffd1726ea49b3/68f9ca6f3bcb96752c49a939_Google%20Logo.svg"
                loading="lazy"
                alt="Google"
                className="reviews_google-logo"
              />
              <div className="reviews_overall-rating">{googleRating}</div>
              <div className="reviews_number-of-wrapper">
                from <span className="reviews_number-of-reviews">{reviewCount}</span> reviews
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="home-reviews_slider-wrapper">
        {/* Top Row - Desktop Only */}
        <div className={`home-reviews_slider is-top ${blockId}-top`}>
          <div className="reviews-slider swiper-wrapper"></div>
        </div>

        {/* Bottom Row - Always Visible */}
        <div className={`home-reviews_slider is-bottom ${blockId}-bottom`}>
          <div className="reviews-slider swiper-wrapper"></div>
        </div>

        {/* Navigation Arrows - Mobile Only */}
        <div className="reviews-slider_navigation">
          <a href="#" className={`reviews-slider_arrow prev ${blockId}-nav-prev`}>
            <div className="icon-slider-arrow w-embed">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 28" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                <path d="M15.4386 0.526291C15.0981 0.189398 14.6362 0 14.1544 0C13.6727 0 13.2107 0.189402 12.8702 0.526291L0.532341 12.7149C0.191428 13.0515 0 13.5083 0 13.9845C0 14.4607 0.191432 14.9175 0.532341 15.2541L12.8702 27.4428C13.2077 27.7933 13.674 27.9942 14.1634 27.9999C14.6527 28.0057 15.1238 27.8159 15.4696 27.4734C15.8153 27.131 16.0066 26.6649 15.9998 26.1811C15.9932 25.6973 15.789 25.2367 15.4339 24.9036L4.38026 13.9845L15.4339 3.06541C15.7754 2.72939 15.9678 2.2729 15.9687 1.79667C15.9694 1.32047 15.7787 0.863381 15.4385 0.526216L15.4386 0.526291Z" fill="currentColor" />
              </svg>
            </div>
          </a>
          <a href="#" className={`reviews-slider_arrow next ${blockId}-nav-next`}>
            <div className="icon-slider-arrow w-embed">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 28" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                <path d="M0.561444 0.526291C0.901915 0.189398 1.36381 0 1.84563 0C2.3273 0 2.78935 0.189402 3.12982 0.526291L15.4677 12.7149C15.8086 13.0515 16 13.5083 16 13.9845C16 14.4607 15.8086 14.9175 15.4677 15.2541L3.12982 27.4428C2.79231 27.7933 2.32598 27.9942 1.83663 27.9999C1.34729 28.0057 0.876244 27.8159 0.530437 27.4734C0.18465 27.131 -0.00662994 26.6649 0.00017643 26.1811C0.00682259 25.6973 0.210956 25.2367 0.566056 24.9036L11.6197 13.9845L0.566056 3.06541C0.224553 2.72939 0.0322409 2.2729 0.0313339 1.79667C0.0305948 1.32047 0.221288 0.863381 0.561481 0.526216L0.561444 0.526291Z" fill="currentColor" />
              </svg>
            </div>
          </a>
        </div>
      </div>

      {/* Reviews Data - Will be rendered by view.js */}
      <script
        type="application/json"
        className="reviews-marquee-data"
        data-block-id={blockId}
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            reviews,
            autoplaySpeed,
            blockId
          })
            // Escape special HTML characters to prevent emoji/character corruption
            .replace(/</g, '\\u003c')
            .replace(/>/g, '\\u003e')
            .replace(/&/g, '\\u0026')
        }}
      />

    </section>
  );
}


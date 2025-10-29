import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { heading, googleRating, reviewCount, reviews, autoplaySpeed, blockId } = attributes;

  const blockProps = useBlockProps.save({
    className: 'section_home-reviews',
  });

  // Star SVG
  const starSVG = `<svg width="100%" height="100%" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.8594 17.7306C22.6399 17.9799 22.5379 18.3112 22.5791 18.6406L23.4099 25.6408C23.4539 26.0116 23.3972 26.3873 23.2458 26.7287C23.0943 27.0701 22.8537 27.3645 22.5491 27.5808C22.1967 27.8267 21.7777 27.9592 21.3479 27.9608C21.0311 27.9605 20.7189 27.8851 20.437 27.7408L14.5213 24.8208C14.2032 24.6766 13.8383 24.6766 13.5203 24.8208L7.58425 27.7808C7.25091 27.9485 6.87814 28.0223 6.5059 27.9942C6.13377 27.9659 5.77633 27.8369 5.47216 27.6208C5.16759 27.4045 4.92693 27.1101 4.77542 26.7687C4.62402 26.4273 4.56729 26.0516 4.6113 25.6808L5.44212 18.6806C5.48331 18.3512 5.38133 18.0199 5.16184 17.7706L0.527386 12.5203C0.0328426 11.9656 -0.12817 11.1896 0.105208 10.4842C0.33846 9.77893 0.930505 9.25142 1.65851 9.10027L8.19511 7.78024C8.54202 7.7192 8.84127 7.50138 9.00591 7.19023L12.1891 1.1101C12.4259 0.661234 12.8188 0.314346 13.2937 0.134769C13.7688 -0.044923 14.293 -0.044923 14.7681 0.134769C15.243 0.314357 15.6359 0.661234 15.8727 1.1101L19.0158 7.19023C19.1763 7.49648 19.4671 7.71347 19.8066 7.78024L26.3331 9.10027C26.8132 9.19788 27.2437 9.46153 27.5483 9.84498C27.8531 10.2283 28.0127 10.7068 27.9992 11.1962C27.9856 11.6856 27.7997 12.1544 27.4742 12.5203L22.8594 17.7306Z" fill="#FFD940"/>
  </svg>`;

  return (
    <section {...blockProps}>
      <div className="padding-global z-index-1">
        <div className="w-layout-blockcontainer container-small w-container">
          <div className="home-reviews_content">
            <RichText.Content
              tagName="h2"
              className="text-align-center"
              value={heading}
            />
            <div className="reviews_tag">
              <img
                src={`${window.location.origin}/wp-content/plugins/webdune-blocks/sellmycell.webflow/images/Google-Logo.svg`}
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
          <div className="reviews-slider swiper-wrapper">
            {reviews.map((review) => (
              <div key={review.id} className="review-slide swiper-slide">
                <div className="reviews_slide-top">
                  <div className="reviews_stars-wrap">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star} className="reviews_star" dangerouslySetInnerHTML={{ __html: starSVG }} />
                    ))}
                  </div>
                  <p>{review.text}</p>
                </div>
                <div className="reviews_profile-wrap">
                  {review.photo ? (
                    <img
                      src={review.photo}
                      loading="lazy"
                      alt={review.author}
                      className="reviews_profile-img"
                    />
                  ) : (
                    <div className="reviews_profile-img-placeholder"></div>
                  )}
                  <div className="reviews_profile-content">
                    <div className="reviews_profile-name">{review.author}</div>
                    <div className="reviews_profile-date">{review.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - Always Visible */}
        <div className={`home-reviews_slider is-bottom ${blockId}-bottom`}>
          <div className="reviews-slider swiper-wrapper">
            {reviews.map((review) => (
              <div key={review.id} className="review-slide swiper-slide">
                <div className="reviews_slide-top">
                  <div className="reviews_stars-wrap">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star} className="reviews_star" dangerouslySetInnerHTML={{ __html: starSVG }} />
                    ))}
                  </div>
                  <p>{review.text}</p>
                </div>
                <div className="reviews_profile-wrap">
                  {review.photo ? (
                    <img
                      src={review.photo}
                      loading="lazy"
                      alt={review.author}
                      className="reviews_profile-img"
                    />
                  ) : (
                    <div className="reviews_profile-img-placeholder"></div>
                  )}
                  <div className="reviews_profile-content">
                    <div className="reviews_profile-name">{review.author}</div>
                    <div className="reviews_profile-date">{review.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Mobile Only */}
        <div className="reviews-slider_navigation">
          <a href="#" className={`reviews-slider_arrow prev ${blockId}-nav-prev`} onClick={(e) => e.preventDefault()}>
            <div className="icon-slider-arrow w-embed">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 28" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                <path d="M15.4386 0.526291C15.0981 0.189398 14.6362 0 14.1544 0C13.6727 0 13.2107 0.189402 12.8702 0.526291L0.532341 12.7149C0.191428 13.0515 0 13.5083 0 13.9845C0 14.4607 0.191432 14.9175 0.532341 15.2541L12.8702 27.4428C13.2077 27.7933 13.674 27.9942 14.1634 27.9999C14.6527 28.0057 15.1238 27.8159 15.4696 27.4734C15.8153 27.131 16.0066 26.6649 15.9998 26.1811C15.9932 25.6973 15.789 25.2367 15.4339 24.9036L4.38026 13.9845L15.4339 3.06541C15.7754 2.72939 15.9678 2.2729 15.9687 1.79667C15.9694 1.32047 15.7787 0.863381 15.4385 0.526216L15.4386 0.526291Z" fill="currentColor" />
              </svg>
            </div>
          </a>
          <a href="#" className={`reviews-slider_arrow next ${blockId}-nav-next`} onClick={(e) => e.preventDefault()}>
            <div className="icon-slider-arrow w-embed">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 28" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                <path d="M0.561444 0.526291C0.901915 0.189398 1.36381 0 1.84563 0C2.3273 0 2.78935 0.189402 3.12982 0.526291L15.4677 12.7149C15.8086 13.0515 16 13.5083 16 13.9845C16 14.4607 15.8086 14.9175 15.4677 15.2541L3.12982 27.4428C2.79231 27.7933 2.32598 27.9942 1.83663 27.9999C1.34729 28.0057 0.876244 27.8159 0.530437 27.4734C0.18465 27.131 -0.00662994 26.6649 0.00017643 26.1811C0.00682259 25.6973 0.210956 25.2367 0.566056 24.9036L11.6197 13.9845L0.566056 3.06541C0.224553 2.72939 0.0322409 2.2729 0.0313339 1.79667C0.0305948 1.32047 0.221288 0.863381 0.561481 0.526216L0.561444 0.526291Z" fill="currentColor" />
              </svg>
            </div>
          </a>
        </div>
      </div>

      {/* Swiper Configuration */}
      <script
        type="application/json"
        className="swiper-config-reviews"
        data-block-id={blockId}
        data-autoplay-speed={autoplaySpeed}
      >
      </script>
    </section>
  );
}


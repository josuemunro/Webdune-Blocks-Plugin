import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { heading, googleRating, reviewCount, reviews, autoplaySpeed } = attributes;

  const blockProps = useBlockProps.save({
    className: 'webdune-reviews-marquee',
  });

  // Generate unique ID for this instance
  const blockId = `reviews-marquee-${Date.now()}`;

  // Star SVG
  const starSVG = `<svg width="100%" height="100%" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.0957 0.927052L15.3695 8.67812L23.7517 9.58541L17.5976 15.1969L19.3169 23.4229L12.0957 19.2396L4.87453 23.4229L6.59379 15.1969L0.439697 9.58541L8.82189 8.67812L12.0957 0.927052Z" fill="#F7D547"/>
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


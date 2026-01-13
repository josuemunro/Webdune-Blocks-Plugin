import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const {
    heading,
    subheading,
    heroImage,
    searchPlaceholder,
    searchButtonText,
    gradientStart,
    gradientEnd
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'webdune-hero-block',
  });

  return (
    <section {...blockProps}>
      <section
        className="section_home-hero"
        style={{
          backgroundImage: `linear-gradient(${gradientStart}, ${gradientEnd})`
        }}
      >
        <div className="padding-global z-index-1">
          <div className="w-layout-blockcontainer container-medium w-container">
            <div className="home-hero_wrap">
              <div className="home-hero_content">
                {heading && (
                  <RichText.Content
                    tagName="h1"
                    className="text-color-white"
                    value={heading}
                    data-fade-up="true"
                    data-fade-delay="0.5"
                    data-instant="true"
                  />
                )}

                {subheading && (
                  <RichText.Content
                    tagName="div"
                    className="home-hero_subheading"
                    value={subheading}
                    data-fade-up="true"
                    data-fade-delay="0.6"
                    data-instant="true"
                  />
                )}

                <div className="home-hero_phone-lockup-wrap" data-fade-up="true" data-fade-delay="0.7" data-instant="true">
                  <div className="home-hero_phone-lookup">
                    <input
                      className="home-hero_phone-lookup-input w-input"
                      maxLength="256"
                      name="phone-search"
                      data-name="Phone Search"
                      placeholder={searchPlaceholder}
                      type="text"
                      id="phone-search"
                    />
                    <a href="#" className="button is-icon w-inline-block">
                      <div className="hide-on-mobile">{searchButtonText}</div>
                      <div className="icon-embed-arrow w-embed">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 26 13" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                          <path d="M20.2543 12.0044L25.3264 6.80104C25.6781 6.44018 25.6781 5.8465 25.3264 5.48565L20.2543 0.270645C19.9025 -0.0902149 19.3238 -0.0902149 18.9721 0.270645C18.6203 0.631504 18.6203 1.22518 18.9721 1.58604L22.501 5.20627H0.907755C0.40849 5.20627 0 5.62533 0 6.13752C0 6.64971 0.40849 7.06877 0.907755 7.06877H22.4896L18.9607 10.689C18.7792 10.8753 18.6997 11.1081 18.6997 11.3525C18.6997 11.597 18.7905 11.8298 18.9607 12.016C19.3238 12.3653 19.9025 12.3653 20.2543 12.0044Z" fill="currentColor"></path>
                        </svg>
                      </div>
                    </a>
                  </div>

                  <div className="phone-lookup">
                    <div className="phone-lookup_results" data-lenis-prevent>
                      {/* Phone search results will be dynamically inserted here via JavaScript */}
                    </div>
                    <a href="#" className="text-size-tiny text-style-link">View all models</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="padding-global home-hero_image-wrapper">
          <div className="container-large home-hero_img-container">
            {heroImage?.url && (
              <img
                src={heroImage.url}
                loading="lazy"
                sizes="(max-width: 839px) 100vw, 839px"
                alt={heroImage.alt || ''}
                className="home-hero_img"
              />
            )}
          </div>
        </div>
      </section>
    </section>
  );
}

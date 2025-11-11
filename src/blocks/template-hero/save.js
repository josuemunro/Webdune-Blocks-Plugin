import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const {
    layoutType,
    backgroundColor,
    heading,
    subheading,
    mainImage,
    phoneImage,
    showDownArrow,
    columnRatioLeft,
    columnRatioRight
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'webdune-template-hero-block',
  });

  return (
    <section {...blockProps}>
      <section
        className="section_template-hero"
        style={{ backgroundColor }}
      >
        <div className="padding-global z-index-1">
          <div className="w-layout-blockcontainer container-large w-container">
            <div 
              className={`template-hero_content ${layoutType === 'wide-image' ? 'is-wide' : ''}`}
              style={layoutType === 'wide-image' ? { gridTemplateColumns: `${columnRatioLeft}fr ${columnRatioRight}fr` } : {}}
            >
              <div className={`template-hero_left ${layoutType === 'wide-image' ? 'is-wide' : ''}`}>
                {heading && (
                  <RichText.Content
                    tagName="h1"
                    className="text-color-white"
                    value={heading}
                  />
                )}

                {subheading && (
                  <RichText.Content
                    tagName="p"
                    className="text-size-xlarge text-color-white"
                    value={subheading}
                  />
                )}

                {showDownArrow && (
                  <div className="template-hero_down-arrow w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 54" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                      <path d="M9.07488 0L8.82334 49.635L1.63214 42.4326L0 44.0348L9.94975 54L20 44.1344L18.3842 42.5161L11.1203 49.6465L11.3719 0.0114446L9.07488 0Z" fill="currentColor"></path>
                    </svg>
                  </div>
                )}
              </div>

              <div className={`template-hero_right ${layoutType === 'wide-image' ? 'is-wide' : ''}`}>
                {mainImage?.url && (
                  <img
                    src={mainImage.url}
                    loading="lazy"
                    alt={mainImage.alt || ''}
                    className={`template-hero_img-main ${layoutType === 'wide-image' ? 'is-wide' : ''}`}
                  />
                )}

                {layoutType === 'image-phone' && phoneImage?.url && (
                  <div className="template-hero_img-phone-wrapper">
                    <img
                      src={phoneImage.url}
                      loading="lazy"
                      alt={phoneImage.alt || ''}
                      className="template-hero_img-phone"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}


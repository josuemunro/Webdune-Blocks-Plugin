import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const {
    sectionPadding,
    showHeader,
    headerText,
    containerSize,
    backgroundColor,
    customBackgroundColor,
    gridRatioLeft,
    gridRatioRight,
    showNumber,
    numberValue,
    showH3,
    h3Text,
    showH2, // Legacy - for backward compatibility
    h2Text, // Legacy - for backward compatibility
    showRichText,
    showCTA,
    ctaStyle,
    ctaText,
    ctaUrl,
    showDownArrow,
    mediaType,
    videoAspectRatio,
    videoUrl,
    singleImageMode,
    singleImageNaturalWidth,
    singleImage,
    doubleImageMode,
    doubleImageFirst,
    doubleImageSecond
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'webdune-two-column-flexible',
  });

  // Determine background color
  const getBgColor = () => {
    if (backgroundColor === 'light-grey') return '#F5F5F7';
    if (backgroundColor === 'custom') return customBackgroundColor;
    return 'transparent';
  };

  // Container class based on size
  const getContainerClass = () => {
    const sizeMap = {
      'xsmall': 'container-xsmall',
      'small': 'container-small',
      'medium': 'container-medium',
      'large': 'container-large'
    };
    return sizeMap[containerSize] || 'container-medium';
  };

  return (
    <section {...blockProps}>
      <section
        className={`section_2-col section-padding-${sectionPadding}`}
        style={{ backgroundColor: getBgColor() }}
      >
        <div className="padding-global">
          <div className={`w-layout-blockcontainer ${getContainerClass()} w-container`}>

            {showHeader && headerText && (
              <div className="section-header-wrapper">
                <RichText.Content
                  tagName="h2"
                  className="section-header"
                  value={headerText}
                />
              </div>
            )}

            <div
              className="two-col-block_grid"
              style={{ gridTemplateColumns: `${gridRatioLeft}fr ${gridRatioRight}fr` }}
            >
              {/* Text Content Column */}
              <div className="two-col-block_text-content">
                {showNumber && numberValue && (
                  <div className="two-col-block_number">
                    {numberValue}.
                  </div>
                )}

                {/* Render H3 (new) or H2 (legacy for backward compatibility) */}
                {showH3 && h3Text && (
                  <RichText.Content
                    tagName="h3"
                    className="two-col-block_heading"
                    value={h3Text}
                  />
                )}
                {showH2 && h2Text && !h3Text && (
                  <RichText.Content
                    tagName="h2"
                    className="two-col-block_heading"
                    value={h2Text}
                  />
                )}

                {showRichText && (
                  <div className="two-col-block_rich-text">
                    <InnerBlocks.Content />
                  </div>
                )}

                {showCTA && ctaText && (
                  <div className="two-col-block_cta">
                    <a
                      href={ctaUrl || '#'}
                      className={ctaStyle === 'button' ? 'button' : 'underline-cta'}
                    >
                      {ctaText}
                    </a>
                  </div>
                )}

                {showDownArrow && (
                  <div className="two-col-block_down-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="54" viewBox="0 0 20 54" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                      <path d="M9.07488 0L8.82334 49.635L1.63214 42.4326L0 44.0348L9.94975 54L20 44.1344L18.3842 42.5161L11.1203 49.6465L11.3719 0.0114446L9.07488 0Z" fill="currentColor" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Media Content Column */}
              <div className="two-col-block_media-content">
                {mediaType === 'video' && videoUrl && (
                  <div className={`media-video media-video-${videoAspectRatio}`}>
                    <div className="video-wrapper">
                      <div className="video-overlay">
                        <div className="video-play-button">
                          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="40" cy="40" r="40" fill="rgba(255,255,255,0.9)" />
                            <path d="M32 25L55 40L32 55V25Z" fill="currentColor" />
                          </svg>
                        </div>
                      </div>
                      <video
                        src={videoUrl}
                        controls
                        controlsList="nodownload"
                        playsInline
                      />
                    </div>
                  </div>
                )}

                {mediaType === 'single-image' && singleImage?.url && (
                  <div className={`media-single-image media-single-${singleImageMode} ${singleImageNaturalWidth ? 'natural-width' : ''}`}>
                    <div className="image-wrapper">
                      <img src={singleImage.url} alt={singleImage.alt || ''} />
                    </div>
                  </div>
                )}

                {mediaType === 'double-images' && (doubleImageFirst?.url || doubleImageSecond?.url) && (
                  <div className={`media-double-images media-double-${doubleImageMode}`}>
                    <div className="double-images-wrapper">
                      {doubleImageFirst?.url && (
                        <div className="double-image-first">
                          <img src={doubleImageFirst.url} alt={doubleImageFirst.alt || ''} />
                        </div>
                      )}

                      {doubleImageSecond?.url && (
                        <div className="double-image-second">
                          <img src={doubleImageSecond.url} alt={doubleImageSecond.alt || ''} />
                        </div>
                      )}
                    </div>
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


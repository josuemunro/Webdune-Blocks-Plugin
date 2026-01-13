import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    heading,
    content,
    backgroundImage,
    overlayColor,
    overlayOpacity,
    textColor,
    buttonText,
    buttonUrl,
    buttonEnabled,
    buttonOpenInNewTab,
    enableParallax,
    showContent
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'webdune-content-image-section-block',
  });

  // Convert hex to rgba
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const overlayStyle = {
    backgroundColor: hexToRgba(overlayColor, overlayOpacity / 100)
  };

  const target = buttonOpenInNewTab ? '_blank' : undefined;
  const rel = buttonOpenInNewTab ? 'noopener noreferrer' : undefined;

  return (
    <div {...blockProps}>
      <section
        className={`section_content-image ${!showContent ? 'no-content' : ''}`}
        style={{ color: textColor }}
      >
        {showContent && (
          <div className="padding-global z-index-2">
            <div className="container-small">
              <div className="content-image_content">
                <RichText.Content
                  tagName="h2"
                  className="text-align-center"
                  value={heading}
                  style={{ color: textColor }}
                  data-fade-up="true"
                />
                {content && (
                  <RichText.Content
                    tagName="p"
                    className="text-align-center"
                    value={content}
                    style={{ color: textColor }}
                    data-fade-up="true"
                  />
                )}
                {buttonEnabled && buttonText && (
                  <a
                    href={buttonUrl}
                    className="button"
                    target={target}
                    rel={rel}
                  >
                    {buttonText}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="section-bg-overlay" style={overlayStyle}></div>
        {backgroundImage.url && (
          <img
            className="section-bg-image"
            src={backgroundImage.url}
            alt={backgroundImage.alt || ''}
            data-speed={enableParallax ? '0.75' : undefined}
            loading="lazy"
          />
        )}
      </section>
    </div>
  );
}


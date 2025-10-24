import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save();
  const {
    heading,
    subheading,
    backgroundImage,
    heroImage,
    ctaText,
    ctaUrl,
    ctaOpenInNewTab,
    gradientStart,
    gradientEnd
  } = attributes;

  return (
    <section {...blockProps} className="hero-section alignfull">
      <div
        className="hero-background"
        style={{
          backgroundImage: backgroundImage.url ? `url(${backgroundImage.url})` : undefined,
          background: `linear-gradient(180deg, ${gradientStart} 0%, ${gradientEnd} 100%)`
        }}
      >
        <div className="hero-content">
          <div className="hero-text">
            {heading && (
              <RichText.Content
                tagName="h1"
                value={heading}
                className="hero-heading"
              />
            )}

            {subheading && (
              <RichText.Content
                tagName="p"
                value={subheading}
                className="hero-subheading"
              />
            )}
          </div>

          <div className="hero-image-container">
            {heroImage.url && (
              <img
                src={heroImage.url}
                alt={heroImage.alt || ''}
                className="hero-image"
              />
            )}
          </div>
        </div>

        {/* Search bar placeholder - actual search is a separate block */}
        <div className="hero-search-placeholder">
          <span className="search-input-placeholder">
            Enter phone model e.g. iPhone14
          </span>
          {ctaText && ctaUrl && (
            <a
              href={ctaUrl}
              className="search-button"
              target={ctaOpenInNewTab ? '_blank' : '_self'}
              rel={ctaOpenInNewTab ? 'noopener noreferrer' : undefined}
            >
              <RichText.Content
                tagName="span"
                value={ctaText}
              />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

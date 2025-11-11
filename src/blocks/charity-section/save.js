import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    backgroundColor,
    textColor,
    heading,
    headingHighlightColor,
    content,
    buttonText,
    buttonUrl,
    buttonOpenInNewTab,
    buttonPosition,
    charityLogos
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'webdune-charity-section-block',
  });

  const sectionStyle = {
    backgroundColor: backgroundColor,
    '--charity-highlight-color': headingHighlightColor || '#FFD940',
  };

  const contentStyle = {
    color: textColor || '#FFFFFF',
  };

  const buttonTarget = buttonOpenInNewTab ? '_blank' : undefined;
  const buttonRel = buttonOpenInNewTab ? 'noopener noreferrer' : undefined;

  return (
    <div {...blockProps}>
      <section className="section_home-charity" style={sectionStyle}>
        <div className="padding-global z-index-1">
          <div className="container-small">
            <div className="home-charity_content" style={contentStyle}>
              <RichText.Content
                tagName="h2"
                className="heading-style-h2 text-align-center"
                value={heading}
              />
              <div className="charity-innerblocks">
                <InnerBlocks.Content />
              </div>
              {content && (
                <RichText.Content
                  tagName="p"
                  className="text-align-center"
                  value={content}
                />
              )}
              {buttonText && buttonPosition === 'before' && (
                <a href={buttonUrl} className="button w-button" target={buttonTarget} rel={buttonRel}>
                  {buttonText}
                </a>
              )}
            </div>
            {charityLogos && charityLogos.length > 0 && (
              <div className="home-charity_logos">
                {charityLogos
                  .filter(logo => logo && logo.url && logo.url.trim() !== '')
                  .map((logo, index) => (
                    <img
                      key={index}
                      src={logo.url}
                      alt={logo.alt || ''}
                      loading="lazy"
                      className={`home-charity_img ${logo.sizeClass || 'height-fixed'}`}
                    />
                  ))
                }
              </div>
            )}
            {buttonText && buttonPosition === 'after' && (
              <div className="home-charity_button-after">
                <a href={buttonUrl} className="button w-button" target={buttonTarget} rel={buttonRel}>
                  {buttonText}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}


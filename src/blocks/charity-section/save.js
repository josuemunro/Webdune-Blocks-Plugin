import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    backgroundColor,
    heading,
    content,
    buttonText,
    buttonUrl,
    buttonOpenInNewTab,
    charityLogos
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'webdune-charity-section-block',
  });

  const sectionStyle = {
    backgroundColor: backgroundColor,
  };

  const buttonTarget = buttonOpenInNewTab ? '_blank' : undefined;
  const buttonRel = buttonOpenInNewTab ? 'noopener noreferrer' : undefined;

  return (
    <div {...blockProps}>
      <section className="section_home-charity" style={sectionStyle}>
        <div className="padding-global z-index-1">
          <div className="container-small">
            <div className="home-charity_content">
              <RichText.Content
                tagName="h2"
                className="heading-style-h2 text-color-white text-align-center"
                value={heading}
              />
              {content && (
                <RichText.Content
                  tagName="p"
                  className="text-align-center text-color-white"
                  value={content}
                />
              )}
              {buttonText && (
                <a href={buttonUrl} className="button w-button" target={buttonTarget} rel={buttonRel}>
                  {buttonText}
                </a>
              )}
            </div>
            {charityLogos && charityLogos.length > 0 && (
              <div className="home-charity_logos">
                {charityLogos.map((logo, index) => {
                  if (!logo || !logo.url) return null;
                  return (
                    <img
                      key={index}
                      src={logo.url}
                      alt={logo.alt || ''}
                      loading="lazy"
                      className={`home-charity_img ${logo.sizeClass || 'height-fixed'}`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}


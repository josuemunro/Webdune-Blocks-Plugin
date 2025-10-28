import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const {
    heading,
    buttonText,
    buttonUrl,
    buttonOpenInNewTab
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'section_home-faqs',
  });

  return (
    <section {...blockProps}>
      <div className="padding-global z-index-1">
        <div className="container-small">
          <div className="home-faqs_content">
            <RichText.Content
              tagName="h2"
              className="text-align-center"
              value={heading}
            />

            {buttonText && buttonUrl && (
              <a
                href={buttonUrl}
                className="button w-button"
                target={buttonOpenInNewTab ? '_blank' : '_self'}
                rel={buttonOpenInNewTab ? 'noopener noreferrer' : undefined}
              >
                {buttonText}
              </a>
            )}
          </div>

          <div className="faq5_list">
            <InnerBlocks.Content />
          </div>
        </div>
      </div>
    </section>
  );
}


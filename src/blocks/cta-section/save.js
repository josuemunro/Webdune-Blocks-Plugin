import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    heading,
    backgroundColor,
    button1,
    button2,
    button3
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'webdune-cta-section-block',
  });

  const renderButton = (button) => {
    if (!button.enabled || !button.text) return null;

    let buttonClass = 'button';
    if (button.style === 'is-white') buttonClass = 'button is-white';
    if (button.style === 'is-secondary') buttonClass = 'button is-secondary';

    const target = button.openInNewTab ? '_blank' : undefined;
    const rel = button.openInNewTab ? 'noopener noreferrer' : undefined;

    return (
      <a
        href={button.url}
        className={buttonClass}
        target={target}
        rel={rel}
      >
        {button.text}
      </a>
    );
  };

  return (
    <div {...blockProps}>
      <section className="section_cta" style={{ backgroundColor }}>
        <div className="padding-global">
          <div className="container-small">
            <div className="cta_content">
              <RichText.Content
                tagName="h2"
                className="heading-style-h2 text-align-center"
                value={heading}
              />
              <div className="cta_buttons">
                {renderButton(button1)}
                {renderButton(button2)}
                {renderButton(button3)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


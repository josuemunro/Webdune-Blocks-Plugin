import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const {
    heading,
    steps,
    image,
    ctaText,
    ctaUrl,
    showDecorativeLine
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'webdune-process-section',
  });

  return (
    <section {...blockProps}>
      <div className="process-section">
        <div className="process-container">
          <div className="process-content">
            {/* Heading with decorative line */}
            <div className="process-heading-wrapper">
              <h2 className="process-heading">{heading}</h2>
              {showDecorativeLine && (
                <div className="decorative-line"></div>
              )}
            </div>

            {/* Process steps */}
            <div className="process-steps">
              {steps.map((step, index) => (
                <div key={index} className="process-step">
                  <div className="step-number">{index + 1}.</div>
                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <div className="step-description">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            {ctaText && (
              <div className="process-cta">
                <a href={ctaUrl} className="cta-button">
                  {ctaText}
                </a>
              </div>
            )}
          </div>

          {/* Process image */}
          <div className="process-image">
            {image.url && (
              <img
                src={image.url}
                alt={image.alt || ''}
                className="process-image-img"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}



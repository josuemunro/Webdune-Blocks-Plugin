import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const {
    heading,
    steps,
    image,
    ctaText,
    ctaUrl,
    ctaOpenInNewTab
  } = attributes;

  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps}>
      <section className="section_home-process">
        <div className="padding-global z-index-1">
          <div className="w-layout-blockcontainer container-small w-container">
            <div className="home-process_content">
              <RichText.Content
                tagName="h2"
                className="text-align-center"
                value={heading}
                data-fade-up="true"
              />
              <div className="w-layout-grid home-process_grid">
                <div id="w-node-_8a0bd081-c1fe-b1ed-b226-276dc13c37b5-26ea4995" className="home-process_grid-img-wrap">
                  {image && image.url && (
                    <img
                      src={image.url}
                      loading="lazy"
                      alt={image.alt || ''}
                      className="home-process_img"
                      data-fade-up="true"
                    />
                  )}
                </div>
                <div className="home-process_list">
                  {steps.map((step, index) => (
                    <div key={index} className="home-process_list-item" data-fade-up="true">
                      <div className="home-process_number">{index + 1}.</div>
                      <div className="home-process_item-content">
                        <h3 className="home-process_h3">{step.title}</h3>
                        <div className="text-size-xlarge">{step.description}</div>
                      </div>
                    </div>
                  ))}

                  {/* CTA Button */}
                  {ctaText && (
                    <div className="home-process_list-item">
                      <div className="space-holder"></div>
                      <div className="home-process_item-content">
                        <a
                          href={ctaUrl}
                          className="button w-button"
                          target={ctaOpenInNewTab ? '_blank' : undefined}
                          rel={ctaOpenInNewTab ? 'noopener noreferrer' : undefined}
                        >
                          {ctaText}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



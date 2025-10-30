import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const {
    heading,
    postSelectionMethod,
    selectedPosts,
    selectedCategory,
    numberOfPosts,
    showArrows,
    autoplay,
    autoplaySpeed,
    bottomText,
    buttonText,
    buttonUrl,
    buttonOpenInNewTab,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'section_home-phones',
  });

  // Generate unique ID for this instance
  const blockId = `phone-slider-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section {...blockProps} data-block-id={blockId}>
      <div className="padding-global">
        <div className="w-layout-blockcontainer container-small w-container">
          <div className="home-phones_header">
            <h2
              className="text-align-center"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          </div>
        </div>
      </div>

      {/* Slider container - will be populated by view.js */}
      <div className={`home-phones_slider-container ${blockId}`} data-loading="true">
        <div className="phone-slider-loading" style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading phones...</p>
        </div>
      </div>

      <div className="padding-global z-index-1">
        <div className="w-layout-blockcontainer container-xsmall w-container">
          <div className="home-phones_bottom-content">
            <div className="margin-bottom margin-small">
              <div className="text-align-center">
                <p className="text-color-grey">{bottomText}</p>
              </div>
            </div>
            <div className="button-group justify-center">
              <a
                href={buttonUrl}
                className="button is-filled is-icon w-inline-block"
                target={buttonOpenInNewTab ? '_blank' : undefined}
                rel={buttonOpenInNewTab ? 'noopener noreferrer' : undefined}
              >
                <div>{buttonText}</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Data attributes for view.js */}
      <script
        type="application/json"
        className="phone-slider-config"
        data-block-id={blockId}
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            postSelectionMethod,
            selectedPosts,
            selectedCategory,
            numberOfPosts,
            showArrows,
            autoplay,
            autoplaySpeed,
          }),
        }}
      />
    </section>
  );
}


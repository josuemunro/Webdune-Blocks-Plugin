import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  const {
    heading,
    subheading,
    heroImage,
    searchPlaceholder,
    searchButtonText,
    gradientStart,
    gradientEnd
  } = attributes;

  const blockProps = useBlockProps({
    className: 'webdune-hero-block',
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Hero Settings', 'webdune-blocks')} initialOpen={true}>
          <TextControl
            label={__('Search Placeholder', 'webdune-blocks')}
            value={searchPlaceholder}
            onChange={(value) => setAttributes({ searchPlaceholder: value })}
            help={__('Placeholder text for phone search input', 'webdune-blocks')}
          />
          <TextControl
            label={__('Search Button Text', 'webdune-blocks')}
            value={searchButtonText}
            onChange={(value) => setAttributes({ searchButtonText: value })}
          />
        </PanelBody>

        <PanelBody title={__('Hero Image', 'webdune-blocks')}>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => setAttributes({
                heroImage: {
                  id: media.id,
                  url: media.url,
                  alt: media.alt
                }
              })}
              allowedTypes={['image']}
              value={heroImage?.id}
              render={({ open }) => (
                <div>
                  {heroImage?.url && (
                    <div style={{ marginBottom: '12px' }}>
                      <img
                        src={heroImage.url}
                        alt={heroImage.alt || ''}
                        style={{ maxWidth: '100%', height: 'auto' }}
                      />
                    </div>
                  )}
                  <Button onClick={open} variant="secondary">
                    {heroImage?.url ? __('Change Image', 'webdune-blocks') : __('Select Image', 'webdune-blocks')}
                  </Button>
                  {heroImage?.url && (
                    <Button
                      onClick={() => setAttributes({ heroImage: {} })}
                      variant="tertiary"
                      isDestructive
                      style={{ marginLeft: '8px' }}
                    >
                      {__('Remove', 'webdune-blocks')}
                    </Button>
                  )}
                </div>
              )}
            />
          </MediaUploadCheck>
        </PanelBody>

        <PanelBody title={__('Background Gradient', 'webdune-blocks')}>
          <div style={{ marginBottom: '16px' }}>
            <label>{__('Gradient Start Color', 'webdune-blocks')}</label>
            <input
              type="color"
              value={gradientStart}
              onChange={(e) => setAttributes({ gradientStart: e.target.value })}
              style={{ width: '100%', height: '40px', marginTop: '8px' }}
            />
          </div>
          <div>
            <label>{__('Gradient End Color', 'webdune-blocks')}</label>
            <input
              type="color"
              value={gradientEnd}
              onChange={(e) => setAttributes({ gradientEnd: e.target.value })}
              style={{ width: '100%', height: '40px', marginTop: '8px' }}
            />
          </div>
        </PanelBody>
      </InspectorControls>

      <section {...blockProps}>
        <section
          className="section_home-hero"
          style={{
            backgroundImage: `linear-gradient(${gradientStart}, ${gradientEnd})`
          }}
        >
          <div className="padding-global z-index-1">
            <div className="w-layout-blockcontainer container-medium w-container">
              <div className="home-hero_wrap">
                <div className="home-hero_content">
                  <RichText
                    tagName="h1"
                    className="text-color-white"
                    value={heading}
                    onChange={(value) => setAttributes({ heading: value })}
                    placeholder={__('Enter main heading...', 'webdune-blocks')}
                    allowedFormats={['core/bold', 'core/italic']}
                  />

                  <RichText
                    tagName="div"
                    className="home-hero_subheading"
                    value={subheading}
                    onChange={(value) => setAttributes({ subheading: value })}
                    placeholder={__('Enter subheading...', 'webdune-blocks')}
                    allowedFormats={[]}
                  />

                  <div className="home-hero_phone-lockup-wrap">
                    <div className="home-hero_phone-lookup">
                      <input
                        type="text"
                        className="home-hero_phone-lookup-input w-input"
                        placeholder={searchPlaceholder}
                        disabled
                      />
                      <a href="#" className="button is-icon w-inline-block" onClick={(e) => e.preventDefault()}>
                        <RichText
                          tagName="div"
                          value={searchButtonText}
                          onChange={(value) => setAttributes({ searchButtonText: value })}
                          placeholder={__('Button text...', 'webdune-blocks')}
                          allowedFormats={[]}
                        />
                        <div className="icon-embed-arrow w-embed">
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 26 13" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                            <path d="M20.2543 12.0044L25.3264 6.80104C25.6781 6.44018 25.6781 5.8465 25.3264 5.48565L20.2543 0.270645C19.9025 -0.0902149 19.3238 -0.0902149 18.9721 0.270645C18.6203 0.631504 18.6203 1.22518 18.9721 1.58604L22.501 5.20627H0.907755C0.40849 5.20627 0 5.62533 0 6.13752C0 6.64971 0.40849 7.06877 0.907755 7.06877H22.4896L18.9607 10.689C18.7792 10.8753 18.6997 11.1081 18.6997 11.3525C18.6997 11.597 18.7905 11.8298 18.9607 12.016C19.3238 12.3653 19.9025 12.3653 20.2543 12.0044Z" fill="currentColor"></path>
                          </svg>
                        </div>
                      </a>
                    </div>

                    {/* Phone lookup results - hidden in editor */}
                    <div className="phone-lookup" style={{ display: 'none' }}>
                      <div className="phone-lookup_results">
                        <div className="phone-lookup_item">
                          <div className="phone-lookup_item-details">
                            <div className="text-size-tiny">Search results appear here on frontend</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="padding-global home-hero_image-wrapper">
            <div className="container-large home-hero_img-container">
              {heroImage?.url ? (
                <img
                  src={heroImage.url}
                  alt={heroImage.alt || ''}
                  className="home-hero_img"
                />
              ) : (
                <div className="hero-image-placeholder">
                  <p>{__('Select a hero image in the sidebar →', 'webdune-blocks')}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

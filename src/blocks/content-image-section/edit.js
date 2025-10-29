import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  RangeControl,
  ToggleControl,
  Button
} from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
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

  const blockProps = useBlockProps({
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

  return (
    <>
      <InspectorControls>
        {/* Background Image */}
        <PanelBody title={__('Background Image', 'webdune-blocks')} initialOpen={true}>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => setAttributes({
                backgroundImage: {
                  url: media.url,
                  id: media.id,
                  alt: media.alt
                }
              })}
              allowedTypes={['image']}
              value={backgroundImage.id}
              render={({ open }) => (
                <div>
                  {backgroundImage.url ? (
                    <div>
                      <img
                        src={backgroundImage.url}
                        alt={backgroundImage.alt}
                        style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                      />
                      <Button
                        onClick={open}
                        variant="secondary"
                        style={{ marginRight: '10px' }}
                      >
                        {__('Replace Image', 'webdune-blocks')}
                      </Button>
                      <Button
                        onClick={() => setAttributes({
                          backgroundImage: { url: '', id: null, alt: '' }
                        })}
                        variant="link"
                        isDestructive
                      >
                        {__('Remove Image', 'webdune-blocks')}
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={open} variant="primary">
                      {__('Upload Image', 'webdune-blocks')}
                    </Button>
                  )}
                </div>
              )}
            />
          </MediaUploadCheck>
          <ToggleControl
            label={__('Enable Parallax Effect', 'webdune-blocks')}
            checked={enableParallax}
            onChange={(value) => setAttributes({ enableParallax: value })}
            help={__('Adds a subtle parallax scroll effect to the background image', 'webdune-blocks')}
          />
        </PanelBody>

        {/* Overlay Settings */}
        <PanelBody title={__('Overlay Settings', 'webdune-blocks')} initialOpen={false}>
          <div style={{ marginBottom: '16px' }}>
            <label>{__('Overlay Color', 'webdune-blocks')}</label>
            <input
              type="color"
              value={overlayColor}
              onChange={(e) => setAttributes({ overlayColor: e.target.value })}
              style={{ width: '100%', height: '40px', marginTop: '8px' }}
            />
          </div>
          <RangeControl
            label={__('Overlay Opacity (%)', 'webdune-blocks')}
            value={overlayOpacity}
            onChange={(value) => setAttributes({ overlayOpacity: value })}
            min={0}
            max={100}
            step={5}
          />
        </PanelBody>

        {/* Content Settings */}
        <PanelBody title={__('Content Settings', 'webdune-blocks')} initialOpen={false}>
          <ToggleControl
            label={__('Show Heading & Button', 'webdune-blocks')}
            checked={showContent}
            onChange={(value) => setAttributes({ showContent: value })}
            help={__('Toggle to hide all text content (for full-width photo only)', 'webdune-blocks')}
          />
          {showContent && (
            <div style={{ marginBottom: '16px' }}>
              <label>{__('Text Color', 'webdune-blocks')}</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setAttributes({ textColor: e.target.value })}
                style={{ width: '100%', height: '40px', marginTop: '8px' }}
              />
            </div>
          )}
        </PanelBody>

        {/* Button Settings */}
        <PanelBody title={__('Button Settings', 'webdune-blocks')} initialOpen={false}>
          <ToggleControl
            label={__('Show Button', 'webdune-blocks')}
            checked={buttonEnabled}
            onChange={(value) => setAttributes({ buttonEnabled: value })}
          />
          {buttonEnabled && (
            <>
              <TextControl
                label={__('Button Text', 'webdune-blocks')}
                value={buttonText}
                onChange={(value) => setAttributes({ buttonText: value })}
              />
              <TextControl
                label={__('Button URL', 'webdune-blocks')}
                value={buttonUrl}
                onChange={(value) => setAttributes({ buttonUrl: value })}
                type="url"
              />
              <ToggleControl
                label={__('Open in New Tab', 'webdune-blocks')}
                checked={buttonOpenInNewTab}
                onChange={(value) => setAttributes({ buttonOpenInNewTab: value })}
              />
            </>
          )}
        </PanelBody>
      </InspectorControls>

      {/* Editor Preview */}
      <div {...blockProps}>
        <section
          className="section_content-image"
          style={{
            backgroundImage: backgroundImage.url ? `url(${backgroundImage.url})` : 'none',
            color: textColor
          }}
        >
          {showContent && (
            <div className="padding-global z-index-2">
              <div className="container-small">
                <div className="content-image_content">
                  <RichText
                    tagName="h2"
                    className="text-align-center"
                    value={heading}
                    onChange={(value) => setAttributes({ heading: value })}
                    placeholder={__('Enter heading...', 'webdune-blocks')}
                    allowedFormats={['core/bold', 'core/italic', 'webdune/gradient-underline']}
                    style={{ color: textColor }}
                  />
                  {content && (
                    <RichText
                      tagName="p"
                      className="text-align-center"
                      value={content}
                      onChange={(value) => setAttributes({ content: value })}
                      placeholder={__('Enter additional content... (optional)', 'webdune-blocks')}
                      style={{ color: textColor }}
                    />
                  )}
                  {buttonEnabled && buttonText && (
                    <a href={buttonUrl} className="button">
                      {buttonText}
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="section-bg-overlay" style={overlayStyle}></div>
        </section>
      </div>
    </>
  );
}


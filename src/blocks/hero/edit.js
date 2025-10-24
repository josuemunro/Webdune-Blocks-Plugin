import { useBlockProps, RichText, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Button, ColorPicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();
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
    <>
      {/* Sidebar Settings */}
      <InspectorControls>
        <PanelBody title={__('Hero Settings', 'webdune-blocks')} initialOpen={true}>
          <TextControl
            label={__('CTA Button URL', 'webdune-blocks')}
            value={ctaUrl}
            onChange={(value) => setAttributes({ ctaUrl: value })}
            help={__('Enter the URL for the CTA button', 'webdune-blocks')}
          />
          <ToggleControl
            label={__('Open in new tab', 'webdune-blocks')}
            checked={ctaOpenInNewTab}
            onChange={(value) => setAttributes({ ctaOpenInNewTab: value })}
          />
        </PanelBody>

        <PanelBody title={__('Background Settings', 'webdune-blocks')}>
          <p>{__('Background Image', 'webdune-blocks')}</p>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => setAttributes({ backgroundImage: media })}
              allowedTypes={['image']}
              value={backgroundImage.id}
              render={({ open }) => (
                <Button onClick={open} variant="secondary">
                  {backgroundImage.url ? __('Change Background', 'webdune-blocks') : __('Select Background', 'webdune-blocks')}
                </Button>
              )}
            />
          </MediaUploadCheck>

          <p>{__('Hero Image (Right Side)', 'webdune-blocks')}</p>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => setAttributes({ heroImage: media })}
              allowedTypes={['image']}
              value={heroImage.id}
              render={({ open }) => (
                <Button onClick={open} variant="secondary">
                  {heroImage.url ? __('Change Hero Image', 'webdune-blocks') : __('Select Hero Image', 'webdune-blocks')}
                </Button>
              )}
            />
          </MediaUploadCheck>
        </PanelBody>

        <PanelBody title={__('Gradient Settings', 'webdune-blocks')}>
          <ColorPicker
            color={gradientStart}
            onChange={(value) => setAttributes({ gradientStart: value })}
            label={__('Gradient Start Color', 'webdune-blocks')}
          />
          <ColorPicker
            color={gradientEnd}
            onChange={(value) => setAttributes({ gradientEnd: value })}
            label={__('Gradient End Color', 'webdune-blocks')}
          />
        </PanelBody>
      </InspectorControls>

      {/* Block Content */}
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
              <RichText
                tagName="h1"
                value={heading}
                onChange={(value) => setAttributes({ heading: value })}
                placeholder={__('Enter main heading...', 'webdune-blocks')}
                className="hero-heading"
                allowedFormats={['core/bold', 'core/italic']}
              />

              <RichText
                tagName="p"
                value={subheading}
                onChange={(value) => setAttributes({ subheading: value })}
                placeholder={__('Enter subheading...', 'webdune-blocks')}
                className="hero-subheading"
                allowedFormats={['core/bold', 'core/italic']}
              />
            </div>

            <div className="hero-image-container">
              {heroImage.url ? (
                <img
                  src={heroImage.url}
                  alt={heroImage.alt || ''}
                  className="hero-image"
                />
              ) : (
                <div className="hero-image-placeholder">
                  <p>{__('Select a hero image in the sidebar', 'webdune-blocks')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Search bar placeholder - actual search is a separate block */}
          <div className="hero-search-placeholder">
            <span className="search-input-placeholder">
              Enter phone model e.g. iPhone14
            </span>
            <a
              href={ctaUrl || '#'}
              className="search-button"
              target={ctaOpenInNewTab ? '_blank' : '_self'}
              rel={ctaOpenInNewTab ? 'noopener noreferrer' : undefined}
            >
              <RichText
                tagName="span"
                value={ctaText}
                onChange={(value) => setAttributes({ ctaText: value })}
                placeholder={__('Button text...', 'webdune-blocks')}
                allowedFormats={[]}
              />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

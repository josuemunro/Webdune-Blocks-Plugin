import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  URLInput
} from '@wordpress/block-editor';
import {
  PanelBody,
  Button,
  ToggleControl,
  ColorPalette,
  TextControl
} from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  const {
    backgroundColor,
    heading,
    headingHighlightColor,
    content,
    buttonText,
    buttonUrl,
    buttonOpenInNewTab,
    charityLogos
  } = attributes;

  const blockProps = useBlockProps({
    className: 'webdune-charity-section-block',
  });

  const colors = [
    { name: 'Yellow', color: '#FFD940' },
    { name: 'Dark Gray', color: '#3C3C3C' },
    { name: 'Light Gray', color: '#F5F5F7' },
    { name: 'White', color: '#FFFFFF' },
    { name: 'Black', color: '#000000' },
    { name: 'Brick', color: '#CB6833' },
  ];

  const sectionStyle = {
    backgroundColor: backgroundColor,
  };

  // Add a logo
  const addLogo = () => {
    const newLogos = [...charityLogos, { id: 0, url: '', alt: '', sizeClass: 'height-fixed' }];
    setAttributes({ charityLogos: newLogos });
  };

  // Remove a logo
  const removeLogo = (index) => {
    const newLogos = charityLogos.filter((_, i) => i !== index);
    setAttributes({ charityLogos: newLogos });
  };

  // Update logo at specific index
  const updateLogo = (index, field, value) => {
    const newLogos = [...charityLogos];
    newLogos[index] = { ...newLogos[index], [field]: value };
    setAttributes({ charityLogos: newLogos });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Background', 'webdune-blocks')} initialOpen={true}>
          <p>{__('Background Color', 'webdune-blocks')}</p>
          <ColorPalette
            colors={colors}
            value={backgroundColor}
            onChange={(color) => setAttributes({ backgroundColor: color })}
          />
        </PanelBody>

        <PanelBody title={__('Heading Settings', 'webdune-blocks')} initialOpen={false}>
          <p>{__('Highlight Color', 'webdune-blocks')}</p>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '-8px' }}>
            {__('Use this color for highlighted text in the heading', 'webdune-blocks')}
          </p>
          <ColorPalette
            colors={colors}
            value={headingHighlightColor}
            onChange={(color) => setAttributes({ headingHighlightColor: color })}
          />
        </PanelBody>

        <PanelBody title={__('Button', 'webdune-blocks')} initialOpen={false}>
          <TextControl
            label={__('Button Text', 'webdune-blocks')}
            value={buttonText}
            onChange={(value) => setAttributes({ buttonText: value })}
          />
          <p>{__('Button URL', 'webdune-blocks')}</p>
          <URLInput
            value={buttonUrl}
            onChange={(value) => setAttributes({ buttonUrl: value })}
          />
          <ToggleControl
            label={__('Open in New Tab', 'webdune-blocks')}
            checked={buttonOpenInNewTab}
            onChange={(value) => setAttributes({ buttonOpenInNewTab: value })}
          />
        </PanelBody>

        <PanelBody title={__('Charity Logos', 'webdune-blocks')} initialOpen={true}>
          <p style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}>
            {__('Add up to 4 charity logos. Use "height-fixed" for tall logos or "width-fixed" for wide logos.', 'webdune-blocks')}
          </p>
          {charityLogos.map((logo, index) => (
            <div key={index} style={{ marginBottom: '20px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
              <h4 style={{ marginTop: '0', fontSize: '14px' }}>{__('Logo', 'webdune-blocks')} {index + 1}</h4>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(media) => {
                    updateLogo(index, 'id', media.id);
                    updateLogo(index, 'url', media.url);
                    updateLogo(index, 'alt', media.alt || '');
                  }}
                  value={logo.id}
                  allowedTypes={['image']}
                  render={({ open }) => (
                    <Button
                      className={logo.id ? 'image-button' : 'button button-primary'}
                      onClick={open}
                      style={{ marginBottom: '8px' }}
                    >
                      {!logo.id ? __('Upload Logo', 'webdune-blocks') : __('Replace Logo', 'webdune-blocks')}
                    </Button>
                  )}
                />
              </MediaUploadCheck>
              {logo.url && (
                <div style={{ marginBottom: '8px' }}>
                  <img src={logo.url} alt={logo.alt} style={{ maxWidth: '100px', height: 'auto' }} />
                </div>
              )}
              <TextControl
                label={__('Alt Text', 'webdune-blocks')}
                value={logo.alt}
                onChange={(value) => updateLogo(index, 'alt', value)}
                style={{ marginBottom: '8px' }}
              />
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <Button
                  isSecondary
                  isSmall
                  onClick={() => updateLogo(index, 'sizeClass', 'height-fixed')}
                  variant={logo.sizeClass === 'height-fixed' ? 'primary' : 'secondary'}
                >
                  {__('Height Fixed', 'webdune-blocks')}
                </Button>
                <Button
                  isSecondary
                  isSmall
                  onClick={() => updateLogo(index, 'sizeClass', 'width-fixed')}
                  variant={logo.sizeClass === 'width-fixed' ? 'primary' : 'secondary'}
                >
                  {__('Width Fixed', 'webdune-blocks')}
                </Button>
              </div>
              <Button onClick={() => removeLogo(index)} className="button is-link is-destructive" isSmall>
                {__('Remove Logo', 'webdune-blocks')}
              </Button>
            </div>
          ))}
          {charityLogos.length < 4 && (
            <Button onClick={addLogo} className="button button-primary">
              {__('+ Add Logo', 'webdune-blocks')}
            </Button>
          )}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <section className="section_charity" style={sectionStyle}>
          <div className="padding-global z-index-1">
            <div className="container-small">
              <div className="charity_content">
                <RichText
                  tagName="h2"
                  className="heading-style-h2 text-color-white text-align-center"
                  value={heading}
                  onChange={(value) => setAttributes({ heading: value })}
                  placeholder={__('Enter heading...', 'webdune-blocks')}
                  allowedFormats={['core/bold', 'core/italic']}
                />
                {content && (
                  <RichText
                    tagName="p"
                    className="text-align-center text-color-white"
                    value={content}
                    onChange={(value) => setAttributes({ content: value })}
                    placeholder={__('Enter optional content...', 'webdune-blocks')}
                  />
                )}
                {buttonText && (
                  <a href={buttonUrl} className="button w-button" target={buttonOpenInNewTab ? '_blank' : '_self'} rel={buttonOpenInNewTab ? 'noopener noreferrer' : ''}>
                    {buttonText}
                  </a>
                )}
              </div>
              <div className="charity_logos">
                {charityLogos.length === 0 && (
                  <p style={{ textAlign: 'center', color: '#999', fontStyle: 'italic' }}>
                    {__('Add charity logos in the sidebar →', 'webdune-blocks')}
                  </p>
                )}
                {charityLogos.map((logo, index) => (
                  logo.url && (
                    <img
                      key={index}
                      src={logo.url}
                      alt={logo.alt}
                      className={`charity_img ${logo.sizeClass}`}
                    />
                  )
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


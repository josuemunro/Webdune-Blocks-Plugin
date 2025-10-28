import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  MediaUpload,
  MediaUploadCheck,
  InspectorControls
} from '@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
  ToggleControl,
  Button
} from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  const {
    layoutType,
    backgroundColor,
    heading,
    subheading,
    mainImage,
    phoneImage,
    showDownArrow
  } = attributes;

  const blockProps = useBlockProps({
    className: 'webdune-template-hero-block',
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Layout Settings', 'webdune-blocks')} initialOpen={true}>
          <SelectControl
            label={__('Layout Type', 'webdune-blocks')}
            value={layoutType}
            options={[
              { label: __('Image + Phone', 'webdune-blocks'), value: 'image-phone' },
              { label: __('Wide Image', 'webdune-blocks'), value: 'wide-image' }
            ]}
            onChange={(value) => setAttributes({ layoutType: value })}
            help={__('Choose between image with phone overlay or single wide image', 'webdune-blocks')}
          />

          <ToggleControl
            label={__('Show Down Arrow', 'webdune-blocks')}
            checked={showDownArrow}
            onChange={(value) => setAttributes({ showDownArrow: value })}
          />

          <div style={{ marginTop: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              {__('Background Color', 'webdune-blocks')}
            </label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setAttributes({ backgroundColor: e.target.value })}
              style={{ width: '100%', height: '40px' }}
            />
          </div>
        </PanelBody>

        <PanelBody title={__('Main Image', 'webdune-blocks')}>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => setAttributes({
                mainImage: {
                  id: media.id,
                  url: media.url,
                  alt: media.alt
                }
              })}
              allowedTypes={['image']}
              value={mainImage?.id}
              render={({ open }) => (
                <div>
                  {mainImage?.url && (
                    <div style={{ marginBottom: '12px' }}>
                      <img
                        src={mainImage.url}
                        alt={mainImage.alt || ''}
                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                      />
                    </div>
                  )}
                  <Button onClick={open} variant="secondary">
                    {mainImage?.url ? __('Change Image', 'webdune-blocks') : __('Select Image', 'webdune-blocks')}
                  </Button>
                  {mainImage?.url && (
                    <Button
                      onClick={() => setAttributes({ mainImage: {} })}
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

        {layoutType === 'image-phone' && (
          <PanelBody title={__('Phone Image', 'webdune-blocks')}>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(media) => setAttributes({
                  phoneImage: {
                    id: media.id,
                    url: media.url,
                    alt: media.alt
                  }
                })}
                allowedTypes={['image']}
                value={phoneImage?.id}
                render={({ open }) => (
                  <div>
                    {phoneImage?.url && (
                      <div style={{ marginBottom: '12px' }}>
                        <img
                          src={phoneImage.url}
                          alt={phoneImage.alt || ''}
                          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                        />
                      </div>
                    )}
                    <Button onClick={open} variant="secondary">
                      {phoneImage?.url ? __('Change Phone Image', 'webdune-blocks') : __('Select Phone Image', 'webdune-blocks')}
                    </Button>
                    {phoneImage?.url && (
                      <Button
                        onClick={() => setAttributes({ phoneImage: {} })}
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
        )}
      </InspectorControls>

      <section {...blockProps}>
        <section
          className="section_template-hero"
          style={{ backgroundColor }}
        >
          <div className="padding-global z-index-1">
            <div className="w-layout-blockcontainer container-large w-container">
              <div className={`template-hero_content ${layoutType === 'wide-image' ? 'is-wide' : ''}`}>
                <div className={`template-hero_left ${layoutType === 'wide-image' ? 'is-wide' : ''}`}>
                  <RichText
                    tagName="h1"
                    className="text-color-white"
                    value={heading}
                    onChange={(value) => setAttributes({ heading: value })}
                    placeholder={__('Enter heading...', 'webdune-blocks')}
                    allowedFormats={[]}
                  />

                  <RichText
                    tagName="p"
                    className="text-size-xlarge text-color-white"
                    value={subheading}
                    onChange={(value) => setAttributes({ subheading: value })}
                    placeholder={__('Enter subheading...', 'webdune-blocks')}
                    allowedFormats={[]}
                  />

                  {showDownArrow && (
                    <div className="template-hero_down-arrow w-embed">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 54" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                        <path d="M9.07488 0L8.82334 49.635L1.63214 42.4326L0 44.0348L9.94975 54L20 44.1344L18.3842 42.5161L11.1203 49.6465L11.3719 0.0114446L9.07488 0Z" fill="currentColor"></path>
                      </svg>
                    </div>
                  )}
                </div>

                <div className={`template-hero_right ${layoutType === 'wide-image' ? 'is-wide' : ''}`}>
                  {mainImage?.url ? (
                    <img
                      src={mainImage.url}
                      alt={mainImage.alt || ''}
                      className={`template-hero_img-main ${layoutType === 'wide-image' ? 'is-wide' : ''}`}
                    />
                  ) : (
                    <div className="template-hero-placeholder">
                      <p>{__('Select main image in sidebar →', 'webdune-blocks')}</p>
                    </div>
                  )}

                  {layoutType === 'image-phone' && phoneImage?.url && (
                    <div className="template-hero_img-phone-wrapper">
                      <img
                        src={phoneImage.url}
                        alt={phoneImage.alt || ''}
                        className="template-hero_img-phone"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}


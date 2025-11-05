import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, ToggleControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const {
    heading,
    steps,
    image,
    ctaText,
    ctaUrl,
    ctaOpenInNewTab
  } = attributes;

  const blockProps = useBlockProps();

  const updateStep = (index, field, value) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setAttributes({ steps: newSteps });
  };

  const addStep = () => {
    const newSteps = [...steps, { title: '', description: '' }];
    setAttributes({ steps: newSteps });
  };

  const removeStep = (index) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((_, i) => i !== index);
      setAttributes({ steps: newSteps });
    }
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('CTA Button Settings', 'webdune-blocks')}>
          <TextControl
            label={__('Button URL', 'webdune-blocks')}
            value={ctaUrl}
            onChange={(value) => setAttributes({ ctaUrl: value })}
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />
          <ToggleControl
            label={__('Open in new tab', 'webdune-blocks')}
            checked={ctaOpenInNewTab}
            onChange={(value) => setAttributes({ ctaOpenInNewTab: value })}
            __nextHasNoMarginBottom
          />
        </PanelBody>
        <PanelBody title={__('Image', 'webdune-blocks')}>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => setAttributes({ image: { id: media.id, url: media.url, alt: media.alt } })}
              allowedTypes={['image']}
              value={image?.id}
              render={({ open }) => (
                <div>
                  {image?.url ? (
                    <>
                      <img src={image.url} alt={image.alt || ''} style={{ maxWidth: '100%', marginBottom: '10px' }} />
                      <Button onClick={open} variant="secondary">
                        {__('Change Image', 'webdune-blocks')}
                      </Button>
                    </>
                  ) : (
                    <Button onClick={open} variant="primary">
                      {__('Select Image', 'webdune-blocks')}
                    </Button>
                  )}
                </div>
              )}
            />
          </MediaUploadCheck>
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="process-editor-wrapper">
          <RichText
            tagName="h2"
            value={heading}
            onChange={(value) => setAttributes({ heading: value })}
            placeholder={__('Sell your phone in 4 easy steps', 'webdune-blocks')}
            allowedFormats={['core/bold', 'core/italic', 'webdune/gradient-underline']}
          />

          {steps.map((step, index) => (
            <div key={index} style={{ marginBottom: '20px', padding: '15px', background: 'white', borderRadius: '4px' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'start' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{index + 1}.</div>
                <div style={{ flex: 1 }}>
                  <TextControl
                    label={__('Title', 'webdune-blocks')}
                    value={step.title}
                    onChange={(value) => updateStep(index, 'title', value)}
                    placeholder={__('Step title...', 'webdune-blocks')}
                    __next40pxDefaultSize
                    __nextHasNoMarginBottom
                  />
                  <TextControl
                    label={__('Description', 'webdune-blocks')}
                    value={step.description}
                    onChange={(value) => updateStep(index, 'description', value)}
                    placeholder={__('Step description...', 'webdune-blocks')}
                    __next40pxDefaultSize
                    __nextHasNoMarginBottom
                  />
                  {steps.length > 1 && (
                    <Button
                      isDestructive
                      onClick={() => removeStep(index)}
                      size="small"
                    >
                      {__('Remove Step', 'webdune-blocks')}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          <Button onClick={addStep} variant="secondary" style={{ marginBottom: '20px' }}>
            {__('+ Add Step', 'webdune-blocks')}
          </Button>

          <TextControl
            label={__('CTA Button Text', 'webdune-blocks')}
            value={ctaText}
            onChange={(value) => setAttributes({ ctaText: value })}
            placeholder={__('Get started', 'webdune-blocks')}
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />
        </div>
      </div>
    </>
  );
}


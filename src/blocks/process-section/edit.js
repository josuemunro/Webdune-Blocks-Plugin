import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, ButtonGroup } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
  const {
    heading,
    steps,
    image,
    ctaText,
    ctaUrl,
    showDecorativeLine
  } = attributes;

  const blockProps = useBlockProps({
    className: 'webdune-process-section',
  });

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
        <PanelBody title={__('Process Settings', 'webdune-blocks')}>
          <ButtonGroup>
            <Button
              isPressed={showDecorativeLine}
              onClick={() => setAttributes({ showDecorativeLine: !showDecorativeLine })}
            >
              {__('Decorative Line', 'webdune-blocks')}
            </Button>
          </ButtonGroup>
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <section className="process-section">
          <div className="process-container">
            <div className="process-content">
              {/* Heading with decorative line */}
              <div className="process-heading-wrapper">
                <RichText
                  tagName="h2"
                  className="process-heading"
                  value={heading}
                  onChange={(value) => setAttributes({ heading: value })}
                  placeholder={__('Enter heading...', 'webdune-blocks')}
                  allowedFormats={['core/bold', 'core/italic']}
                />
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
                      <RichText
                        tagName="h3"
                        className="step-title"
                        value={step.title}
                        onChange={(value) => updateStep(index, 'title', value)}
                        placeholder={__('Step title...', 'webdune-blocks')}
                        allowedFormats={['core/bold', 'core/italic']}
                      />
                      <RichText
                        tagName="div"
                        className="step-description"
                        value={step.description}
                        onChange={(value) => updateStep(index, 'description', value)}
                        placeholder={__('Step description...', 'webdune-blocks')}
                        allowedFormats={['core/bold', 'core/italic']}
                      />
                      {steps.length > 1 && (
                        <Button
                          isDestructive
                          onClick={() => removeStep(index)}
                          size="small"
                        >
                          {__('Remove', 'webdune-blocks')}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                <Button onClick={addStep} variant="secondary">
                  {__('Add Step', 'webdune-blocks')}
                </Button>
              </div>

              {/* CTA Button */}
              <div className="process-cta">
                <RichText
                  tagName="div"
                  className="cta-button"
                  value={ctaText}
                  onChange={(value) => setAttributes({ ctaText: value })}
                  placeholder={__('Button text...', 'webdune-blocks')}
                  allowedFormats={['core/bold']}
                />
              </div>
            </div>

            {/* Process image */}
            <div className="process-image">
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(media) => setAttributes({ image: media })}
                  allowedTypes={['image']}
                  value={image.id}
                  render={({ open }) => (
                    <div className="image-upload">
                      {image.url ? (
                        <div className="image-preview">
                          <img src={image.url} alt={image.alt || ''} />
                          <Button onClick={open} variant="secondary">
                            {__('Change Image', 'webdune-blocks')}
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={open} variant="secondary">
                          {__('Select Image', 'webdune-blocks')}
                        </Button>
                      )}
                    </div>
                  )}
                />
              </MediaUploadCheck>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


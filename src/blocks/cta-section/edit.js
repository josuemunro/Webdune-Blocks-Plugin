import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  InspectorControls
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  ToggleControl,
  SelectControl
} from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  const {
    heading,
    backgroundColor,
    button1,
    button2,
    button3
  } = attributes;

  const blockProps = useBlockProps({
    className: 'webdune-cta-section-block',
  });

  const updateButton = (buttonNumber, key, value) => {
    const buttonAttr = `button${buttonNumber}`;
    setAttributes({
      [buttonAttr]: {
        ...attributes[buttonAttr],
        [key]: value
      }
    });
  };

  const renderButton = (button, label) => {
    if (!button.enabled) return null;

    let buttonClass = 'button';
    if (button.style === 'is-white') buttonClass = 'button is-white';
    if (button.style === 'is-secondary') buttonClass = 'button is-secondary';

    return (
      <a href={button.url} className={buttonClass}>
        {button.text}
      </a>
    );
  };

  return (
    <>
      <InspectorControls>
        {/* Background Color */}
        <PanelBody title={__('Background', 'webdune-blocks')} initialOpen={true}>
          <div>
            <label>{__('Background Color', 'webdune-blocks')}</label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setAttributes({ backgroundColor: e.target.value })}
              style={{ width: '100%', height: '40px', marginTop: '8px' }}
            />
          </div>
        </PanelBody>

        {/* Button 1 */}
        <PanelBody title={__('Button 1', 'webdune-blocks')} initialOpen={false}>
          <ToggleControl
            label={__('Show Button 1', 'webdune-blocks')}
            checked={button1.enabled}
            onChange={(value) => updateButton(1, 'enabled', value)}
            __nextHasNoMarginBottom
          />
          {button1.enabled && (
            <>
              <TextControl
                label={__('Button Text', 'webdune-blocks')}
                value={button1.text}
                onChange={(value) => updateButton(1, 'text', value)}
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
              <TextControl
                label={__('Button URL', 'webdune-blocks')}
                value={button1.url}
                onChange={(value) => updateButton(1, 'url', value)}
                type="url"
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
              <SelectControl
                label={__('Button Style', 'webdune-blocks')}
                value={button1.style}
                options={[
                  { label: 'Primary (Yellow)', value: 'default' },
                  { label: 'White', value: 'is-white' },
                  { label: 'Secondary (Dark)', value: 'is-secondary' },
                ]}
                onChange={(value) => updateButton(1, 'style', value)}
              />
              <ToggleControl
                label={__('Open in New Tab', 'webdune-blocks')}
                checked={button1.openInNewTab}
                onChange={(value) => updateButton(1, 'openInNewTab', value)}
                __nextHasNoMarginBottom
              />
            </>
          )}
        </PanelBody>

        {/* Button 2 */}
        <PanelBody title={__('Button 2', 'webdune-blocks')} initialOpen={false}>
          <ToggleControl
            label={__('Show Button 2', 'webdune-blocks')}
            checked={button2.enabled}
            onChange={(value) => updateButton(2, 'enabled', value)}
            __nextHasNoMarginBottom
          />
          {button2.enabled && (
            <>
              <TextControl
                label={__('Button Text', 'webdune-blocks')}
                value={button2.text}
                onChange={(value) => updateButton(2, 'text', value)}
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
              <TextControl
                label={__('Button URL', 'webdune-blocks')}
                value={button2.url}
                onChange={(value) => updateButton(2, 'url', value)}
                type="url"
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
              <SelectControl
                label={__('Button Style', 'webdune-blocks')}
                value={button2.style}
                options={[
                  { label: 'Primary (Yellow)', value: 'default' },
                  { label: 'White', value: 'is-white' },
                  { label: 'Secondary (Dark)', value: 'is-secondary' },
                ]}
                onChange={(value) => updateButton(2, 'style', value)}
              />
              <ToggleControl
                label={__('Open in New Tab', 'webdune-blocks')}
                checked={button2.openInNewTab}
                onChange={(value) => updateButton(2, 'openInNewTab', value)}
                __nextHasNoMarginBottom
              />
            </>
          )}
        </PanelBody>

        {/* Button 3 */}
        <PanelBody title={__('Button 3', 'webdune-blocks')} initialOpen={false}>
          <ToggleControl
            label={__('Show Button 3', 'webdune-blocks')}
            checked={button3.enabled}
            onChange={(value) => updateButton(3, 'enabled', value)}
            __nextHasNoMarginBottom
          />
          {button3.enabled && (
            <>
              <TextControl
                label={__('Button Text', 'webdune-blocks')}
                value={button3.text}
                onChange={(value) => updateButton(3, 'text', value)}
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
              <TextControl
                label={__('Button URL', 'webdune-blocks')}
                value={button3.url}
                onChange={(value) => updateButton(3, 'url', value)}
                type="url"
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
              <SelectControl
                label={__('Button Style', 'webdune-blocks')}
                value={button3.style}
                options={[
                  { label: 'Primary (Yellow)', value: 'default' },
                  { label: 'White', value: 'is-white' },
                  { label: 'Secondary (Dark)', value: 'is-secondary' },
                ]}
                onChange={(value) => updateButton(3, 'style', value)}
              />
              <ToggleControl
                label={__('Open in New Tab', 'webdune-blocks')}
                checked={button3.openInNewTab}
                onChange={(value) => updateButton(3, 'openInNewTab', value)}
                __nextHasNoMarginBottom
              />
            </>
          )}
        </PanelBody>
      </InspectorControls>

      {/* Editor Preview */}
      <div {...blockProps}>
        <section className="section_cta" style={{ backgroundColor }}>
          <div className="padding-global">
            <div className="container-small">
              <div className="cta_content">
                <RichText
                  tagName="h2"
                  className="heading-style-h2 text-align-center"
                  value={heading}
                  onChange={(value) => setAttributes({ heading: value })}
                  placeholder={__('Enter heading...', 'webdune-blocks')}
                  allowedFormats={['core/bold', 'core/italic', 'webdune/gradient-underline']}
                />
                <div className="cta_buttons">
                  {renderButton(button1, 'Button 1')}
                  {renderButton(button2, 'Button 2')}
                  {renderButton(button3, 'Button 3')}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


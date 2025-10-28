import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InspectorControls,
  RichText,
  InnerBlocks,
  URLInput
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  ToggleControl
} from '@wordpress/components';

const ALLOWED_BLOCKS = ['webdune/faq-item'];

const TEMPLATE = [
  ['webdune/faq-item', {
    question: 'What is your question?',
    answer: 'This is where your answer goes. You can edit this text to provide helpful information to your visitors.'
  }],
  ['webdune/faq-item', {
    question: 'Another question?',
    answer: 'Another helpful answer for your visitors.'
  }],
];

export default function Edit({ attributes, setAttributes }) {
  const {
    heading,
    buttonText,
    buttonUrl,
    buttonOpenInNewTab
  } = attributes;

  const blockProps = useBlockProps({
    className: 'webdune-faq-section',
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('FAQ Settings', 'webdune-blocks')}>
          <TextControl
            label={__('Button Text', 'webdune-blocks')}
            value={buttonText}
            onChange={(value) => setAttributes({ buttonText: value })}
            help={__('Leave empty to hide button', 'webdune-blocks')}
          />
          {buttonText && (
            <>
              <URLInput
                label={__('Button URL', 'webdune-blocks')}
                value={buttonUrl}
                onChange={(value) => setAttributes({ buttonUrl: value })}
              />
              <ToggleControl
                label={__('Open in new tab', 'webdune-blocks')}
                checked={buttonOpenInNewTab}
                onChange={(value) => setAttributes({ buttonOpenInNewTab: value })}
              />
            </>
          )}
        </PanelBody>
      </InspectorControls>

      <section {...blockProps}>
        <div className="padding-global z-index-1">
          <div className="container-small">
            <div className="home-faqs_content">
              <RichText
                tagName="h2"
                className="text-align-center"
                value={heading}
                onChange={(value) => setAttributes({ heading: value })}
                placeholder={__('Enter FAQ heading...', 'webdune-blocks')}
                allowedFormats={['core/bold', 'core/italic', 'webdune/gradient-underline']}
              />

              {buttonText && (
                <div className="faq-button-preview">
                  <a href={buttonUrl || '#'} className="button w-button">
                    {buttonText}
                  </a>
                </div>
              )}
            </div>

            <div className="faq5_list">
              <InnerBlocks
                allowedBlocks={ALLOWED_BLOCKS}
                template={TEMPLATE}
                templateLock={false}
                renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


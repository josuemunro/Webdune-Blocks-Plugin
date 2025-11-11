import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InspectorControls,
  RichText,
  InnerBlocks,
  URLInput,
  useInnerBlocksProps
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  ToggleControl,
  Button
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

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

export default function Edit({ attributes, setAttributes, clientId }) {
  const {
    heading,
    buttonText,
    buttonUrl,
    buttonOpenInNewTab
  } = attributes;

  const blockProps = useBlockProps({
    className: 'webdune-faq-section',
  });

  const { replaceInnerBlocks } = useDispatch('core/block-editor');
  
  // Get the inner blocks array
  const innerBlocks = useSelect(
    (select) => {
      const { getBlock } = select('core/block-editor');
      const block = getBlock(clientId);
      return block?.innerBlocks || [];
    },
    [clientId]
  );
  
  // Function to add a new FAQ item
  const addFaqItem = () => {
    console.log('Adding FAQ item. Current count:', innerBlocks.length);
    
    const newBlock = createBlock('webdune/faq-item', {
      question: 'New question?',
      answer: 'Add your answer here.'
    });
    
    console.log('New block created:', newBlock.clientId);
    
    // Append new block to existing inner blocks
    const updatedBlocks = [...innerBlocks, newBlock];
    console.log('Updating inner blocks to count:', updatedBlocks.length);
    
    // Replace all inner blocks with the updated array (including the new one)
    replaceInnerBlocks(clientId, updatedBlocks, false);
    
    console.log('✅ FAQ item added successfully!');
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('FAQ Settings', 'webdune-blocks')}>
          <TextControl
            label={__('Button Text', 'webdune-blocks')}
            value={buttonText}
            onChange={(value) => setAttributes({ buttonText: value })}
            help={__('Leave empty to hide button', 'webdune-blocks')}
            __next40pxDefaultSize
            __nextHasNoMarginBottom
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
                __nextHasNoMarginBottom
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
              />
              
              {/* Add FAQ Item Button */}
              <div style={{ marginTop: '20px', textAlign: 'center', padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>
                <Button
                  variant="primary"
                  onClick={addFaqItem}
                  className="webdune-add-faq-item"
                  style={{ width: '100%' }}
                >
                  {__('+ Add FAQ Item', 'webdune-blocks')}
                </Button>
                <p style={{ marginTop: '8px', marginBottom: '0', fontSize: '12px', color: '#666' }}>
                  {__('Or use the block inserter (+) between items', 'webdune-blocks')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


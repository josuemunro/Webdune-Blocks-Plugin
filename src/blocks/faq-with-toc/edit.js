import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  RichText,
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes, clientId }) {
  const { sectionHeading } = attributes;
  const blockProps = useBlockProps();

  // Template for FAQ categories
  const TEMPLATE = [
    ['webdune/faq-category', { categoryName: 'General' }],
    ['webdune/faq-category', { categoryName: 'Getting a quote' }],
  ];

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('FAQ Settings', 'webdune-blocks')}>
          <TextControl
            label={__('Section Heading', 'webdune-blocks')}
            value={sectionHeading}
            onChange={(value) => setAttributes({ sectionHeading: value })}
            help={__('Heading for the table of contents sidebar', 'webdune-blocks')}
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />
        </PanelBody>
      </InspectorControls>

      <section {...blockProps}>
        <div className="padding-global z-index-1">
          <div className="w-layout-blockcontainer container-large w-container">
            <div className="faq-grid">
              {/* Table of Contents Sidebar */}
              <div className="faq-column">
                <div className="faq_category-sidebar">
                  <div className="heading-style-h4">{sectionHeading}</div>
                  <div className="faq_category-links">
                    <p className="faq-toc-note">
                      {__('Table of Contents will auto-generate based on FAQ categories below', 'webdune-blocks')}
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Categories */}
              <div className="faq-column">
                <div className="faq-sections_list">
                  <InnerBlocks
                    allowedBlocks={['webdune/faq-category']}
                    template={TEMPLATE}
                    templateLock={false}
                    renderAppender={InnerBlocks.ButtonBlockAppender}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


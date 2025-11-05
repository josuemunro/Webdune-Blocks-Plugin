import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  ToggleControl,
} from '@wordpress/components';
import { useRef, useEffect, useState } from '@wordpress/element';

// Helper function to generate URL-safe slug from category name
function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export default function Edit({ attributes, setAttributes, clientId, isSelected }) {
  const { categoryName, categoryId } = attributes;
  const blockProps = useBlockProps({
    className: 'faq-section',
  });
  const hasInitialized = useRef(false);
  const [autoGenerateId, setAutoGenerateId] = useState(true);
  const previousCategoryName = useRef(categoryName);

  // Initialize categoryId only once
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      if (!categoryId) {
        // Generate initial ID from category name or use fallback
        const slug = categoryName ? generateSlug(categoryName) : `section-${clientId.substring(0, 8)}`;
        setAttributes({ categoryId: slug });
      }
    }
  }, []);

  // Auto-update categoryId when categoryName changes (if auto-generate is enabled)
  useEffect(() => {
    if (hasInitialized.current && autoGenerateId && categoryName !== previousCategoryName.current) {
      previousCategoryName.current = categoryName;
      const slug = generateSlug(categoryName);
      if (slug) {
        setAttributes({ categoryId: slug });
      }
    }
  }, [categoryName, autoGenerateId, setAttributes]);

  // Use computed value for display while initializing
  const finalCategoryId = categoryId || `section-${clientId.substring(0, 8)}`;

  // Template for FAQ items
  const TEMPLATE = [
    ['webdune/faq-item', { question: 'Your question here?', defaultOpen: false }],
    ['webdune/faq-item', { question: 'Another question?', defaultOpen: false }],
  ];

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Category Settings', 'webdune-blocks')} initialOpen={true}>
          <TextControl
            label={__('Category Name', 'webdune-blocks')}
            value={categoryName}
            onChange={(value) => setAttributes({ categoryName: value })}
            help={__('The heading for this FAQ category', 'webdune-blocks')}
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />
          <div style={{ marginBottom: '16px' }}>
            <ToggleControl
              label={__('Auto-generate ID from name', 'webdune-blocks')}
              checked={autoGenerateId}
              onChange={(value) => {
                setAutoGenerateId(value);
                if (value) {
                  // Immediately update ID based on current name
                  const slug = generateSlug(categoryName);
                  if (slug) {
                    setAttributes({ categoryId: slug });
                  }
                }
              }}
              help={autoGenerateId ? __('ID will update automatically when you change the category name', 'webdune-blocks') : __('You can manually set a custom ID', 'webdune-blocks')}
            />
          </div>
          <TextControl
            label={__('Category ID (Scroll Anchor)', 'webdune-blocks')}
            value={finalCategoryId}
            onChange={(value) => {
              setAutoGenerateId(false); // Disable auto-generate if manually edited
              setAttributes({ categoryId: value });
            }}
            help={__('Used for scroll anchors in the table of contents', 'webdune-blocks')}
            disabled={autoGenerateId}
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="scroll_target-preview">
          <small>
            📌 Scroll target ID: <strong>#{finalCategoryId}</strong>
            {autoGenerateId && <span style={{ marginLeft: '8px', color: '#2271b1' }}>✓ Auto-synced</span>}
          </small>
        </div>
        
        <h2 className="faq-h2">
          {categoryName || __('Edit category name in sidebar →', 'webdune-blocks')}
        </h2>

        <div className="faq-list">
          <InnerBlocks
            allowedBlocks={['webdune/faq-item']}
            template={TEMPLATE}
            templateLock={false}
            renderAppender={InnerBlocks.ButtonBlockAppender}
          />
        </div>
      </div>
    </>
  );
}


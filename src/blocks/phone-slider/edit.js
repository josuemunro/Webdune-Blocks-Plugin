import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
  RangeControl,
  ToggleControl,
  TextControl,
  Placeholder,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function Edit({ attributes, setAttributes }) {
  const {
    heading,
    postSelectionMethod,
    selectedPosts,
    selectedCategory,
    numberOfPosts,
    showArrows,
    autoplay,
    autoplaySpeed,
    bottomText,
    buttonText,
    buttonUrl,
    buttonOpenInNewTab,
  } = attributes;

  const blockProps = useBlockProps({
    className: 'webdune-phone-slider-editor',
  });

  // Get categories for selection
  const categories = useSelect((select) => {
    return select('core').getEntityRecords('taxonomy', 'category', {
      per_page: -1,
    });
  }, []);

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Slider Settings', 'webdune-blocks')}>
          <SelectControl
            label={__('Post Selection', 'webdune-blocks')}
            value={postSelectionMethod}
            options={[
              { label: __('Latest Posts', 'webdune-blocks'), value: 'latest' },
              { label: __('By Category', 'webdune-blocks'), value: 'category' },
            ]}
            onChange={(value) => setAttributes({ postSelectionMethod: value })}
          />

          {postSelectionMethod === 'category' && categories && (
            <SelectControl
              label={__('Select Category', 'webdune-blocks')}
              value={selectedCategory}
              options={[
                { label: __('Select...', 'webdune-blocks'), value: 0 },
                ...categories.map((cat) => ({
                  label: cat.name,
                  value: cat.id,
                })),
              ]}
              onChange={(value) => setAttributes({ selectedCategory: parseInt(value) })}
            />
          )}

          <RangeControl
            label={__('Number of Posts', 'webdune-blocks')}
            value={numberOfPosts}
            onChange={(value) => setAttributes({ numberOfPosts: value })}
            min={3}
            max={20}
          />

          <ToggleControl
            label={__('Show Navigation Arrows', 'webdune-blocks')}
            checked={showArrows}
            onChange={(value) => setAttributes({ showArrows: value })}
            __nextHasNoMarginBottom
          />

          <ToggleControl
            label={__('Enable Autoplay', 'webdune-blocks')}
            checked={autoplay}
            onChange={(value) => setAttributes({ autoplay: value })}
            __nextHasNoMarginBottom
          />

          {autoplay && (
            <RangeControl
              label={__('Autoplay Speed (ms)', 'webdune-blocks')}
              value={autoplaySpeed}
              onChange={(value) => setAttributes({ autoplaySpeed: value })}
              min={1000}
              max={10000}
              step={500}
            />
          )}
        </PanelBody>

        <PanelBody title={__('Content Settings', 'webdune-blocks')} initialOpen={false}>
          <TextControl
            label={__('Bottom Text', 'webdune-blocks')}
            value={bottomText}
            onChange={(value) => setAttributes({ bottomText: value })}
            help={__('Text displayed below the slider', 'webdune-blocks')}
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />

          <TextControl
            label={__('Button Text', 'webdune-blocks')}
            value={buttonText}
            onChange={(value) => setAttributes({ buttonText: value })}
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />

          <TextControl
            label={__('Button URL', 'webdune-blocks')}
            value={buttonUrl}
            onChange={(value) => setAttributes({ buttonUrl: value })}
            type="url"
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />

          <ToggleControl
            label={__('Open in New Tab', 'webdune-blocks')}
            checked={buttonOpenInNewTab}
            onChange={(value) => setAttributes({ buttonOpenInNewTab: value })}
            __nextHasNoMarginBottom
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="phone-slider-heading-editor">
          <RichText
            tagName="h2"
            className="text-align-center"
            value={heading}
            onChange={(value) => setAttributes({ heading: value })}
            placeholder={__('Enter slider heading...', 'webdune-blocks')}
            allowedFormats={['core/bold', 'core/italic', 'webdune/gradient-underline']}
          />
        </div>

        <Placeholder
          icon="slides"
          label={__('Phone Slider', 'webdune-blocks')}
          instructions={__(
            'Phone slider will load dynamically on the frontend. Configure settings in the sidebar.',
            'webdune-blocks'
          )}
        >
          <div style={{ padding: '20px', textAlign: 'left' }}>
            <p><strong>{__('Settings:', 'webdune-blocks')}</strong></p>
            <ul style={{ marginLeft: '20px' }}>
              <li>{__('Method:', 'webdune-blocks')} <strong>{postSelectionMethod}</strong></li>
              <li>{__('Posts:', 'webdune-blocks')} <strong>{numberOfPosts}</strong></li>
              {postSelectionMethod === 'category' && selectedCategory > 0 && (
                <li>{__('Category ID:', 'webdune-blocks')} <strong>{selectedCategory}</strong></li>
              )}
              {postSelectionMethod === 'manual' && selectedPosts.length > 0 && (
                <li>{__('Selected:', 'webdune-blocks')} <strong>{selectedPosts.length} posts</strong></li>
              )}
            </ul>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
              {__('💡 Phones will be queried and displayed on the frontend via JavaScript', 'webdune-blocks')}
            </p>
          </div>
        </Placeholder>

        <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '4px' }}>
          <p><strong>{__('Bottom Text:', 'webdune-blocks')}</strong> {bottomText}</p>
          <p><strong>{__('Button:', 'webdune-blocks')}</strong> {buttonText} → {buttonUrl}</p>
        </div>
      </div>
    </>
  );
}


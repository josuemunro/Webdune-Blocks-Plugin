import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
  RangeControl,
  ToggleControl,
  TextControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';

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
          />

          <ToggleControl
            label={__('Enable Autoplay', 'webdune-blocks')}
            checked={autoplay}
            onChange={(value) => setAttributes({ autoplay: value })}
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
          />

          <TextControl
            label={__('Button Text', 'webdune-blocks')}
            value={buttonText}
            onChange={(value) => setAttributes({ buttonText: value })}
          />

          <TextControl
            label={__('Button URL', 'webdune-blocks')}
            value={buttonUrl}
            onChange={(value) => setAttributes({ buttonUrl: value })}
            type="url"
          />

          <ToggleControl
            label={__('Open in New Tab', 'webdune-blocks')}
            checked={buttonOpenInNewTab}
            onChange={(value) => setAttributes({ buttonOpenInNewTab: value })}
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

        <div className="phone-slider-preview">
          <ServerSideRender
            block="webdune/phone-slider"
            attributes={attributes}
            EmptyResponsePlaceholder={() => (
              <div className="phone-slider-empty">
                <p>{__('No phones found. Add some phone posts to see them here.', 'webdune-blocks')}</p>
              </div>
            )}
            ErrorResponsePlaceholder={() => (
              <div className="phone-slider-error">
                <p>{__('Error loading phone slider. Please check your settings.', 'webdune-blocks')}</p>
              </div>
            )}
            LoadingResponsePlaceholder={() => (
              <div className="phone-slider-loading">
                <p>{__('Loading phones...', 'webdune-blocks')}</p>
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
}


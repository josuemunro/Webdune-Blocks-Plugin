import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  MediaUpload,
  MediaUploadCheck,
  InspectorControls,
  URLInput,
  InnerBlocks
} from '@wordpress/block-editor';
import {
  PanelBody,
  ToggleControl,
  TextControl,
  SelectControl,
  RangeControl,
  Button,
  ColorPicker,
  BaseControl
} from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  // Migrate old h2Text to h3Text (backward compatibility)
  React.useEffect(() => {
    if (attributes.h2Text && !attributes.h3Text) {
      setAttributes({
        h3Text: attributes.h2Text,
        showH3: attributes.showH2,
        h2Text: '',
        showH2: false
      });
    }
  }, []);

  const {
    sectionPadding,
    showHeader,
    headerText,
    containerSize,
    backgroundColor,
    customBackgroundColor,
    gridRatioLeft,
    gridRatioRight,
    showNumber,
    numberValue,
    showH3,
    h3Text,
    showH2,
    h2Text,
    showRichText,
    showCTA,
    ctaStyle,
    ctaText,
    ctaUrl,
    showDownArrow,
    mediaType,
    videoAspectRatio,
    videoUrl,
    singleImageMode,
    singleImageNaturalWidth,
    singleImage,
    doubleImageMode,
    doubleImageFirst,
    doubleImageSecond,
    centerAlignText
  } = attributes;

  const blockProps = useBlockProps({
    className: 'webdune-two-column-flexible',
  });

  // Determine background color
  const getBgColor = () => {
    if (backgroundColor === 'light-grey') return '#F5F5F7';
    if (backgroundColor === 'custom') return customBackgroundColor;
    return 'transparent';
  };

  // Container class based on size
  const getContainerClass = () => {
    const sizeMap = {
      'xsmall': 'container-xsmall',
      'small': 'container-small',
      'medium': 'container-medium',
      'large': 'container-large'
    };
    return sizeMap[containerSize] || 'container-medium';
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Section Settings', 'webdune-blocks')} initialOpen={true}>
          <SelectControl
            label={__('Section Padding', 'webdune-blocks')}
            value={sectionPadding}
            options={[
              { label: 'Medium (7.5rem)', value: 'medium' },
              { label: 'Large (10rem)', value: 'large' }
            ]}
            onChange={(value) => setAttributes({ sectionPadding: value })}
          />

          <ToggleControl
            label={__('Show Header', 'webdune-blocks')}
            checked={showHeader}
            onChange={(value) => setAttributes({ showHeader: value })}
          />

          <SelectControl
            label={__('Container Size', 'webdune-blocks')}
            value={containerSize}
            options={[
              { label: 'XSmall', value: 'xsmall' },
              { label: 'Small', value: 'small' },
              { label: 'Medium', value: 'medium' },
              { label: 'Large', value: 'large' }
            ]}
            onChange={(value) => setAttributes({ containerSize: value })}
          />

          <SelectControl
            label={__('Background Color', 'webdune-blocks')}
            value={backgroundColor}
            options={[
              { label: 'Transparent', value: 'transparent' },
              { label: 'Light Grey', value: 'light-grey' },
              { label: 'Custom', value: 'custom' }
            ]}
            onChange={(value) => setAttributes({ backgroundColor: value })}
          />

          {backgroundColor === 'custom' && (
            <BaseControl label={__('Custom Background Color', 'webdune-blocks')}>
              <ColorPicker
                color={customBackgroundColor}
                onChangeComplete={(value) => setAttributes({ customBackgroundColor: value.hex })}
              />
            </BaseControl>
          )}
        </PanelBody>

        <PanelBody title={__('Grid Settings', 'webdune-blocks')}>
          <RangeControl
            label={__('Left Column Ratio', 'webdune-blocks')}
            value={gridRatioLeft}
            onChange={(value) => setAttributes({ gridRatioLeft: value })}
            min={1}
            max={12}
          />
          <RangeControl
            label={__('Right Column Ratio', 'webdune-blocks')}
            value={gridRatioRight}
            onChange={(value) => setAttributes({ gridRatioRight: value })}
            min={1}
            max={12}
          />
          <p className="components-base-control__help">
            Current ratio: {gridRatioLeft}fr {gridRatioRight}fr
          </p>
        </PanelBody>

        <PanelBody title={__('Text Content', 'webdune-blocks')}>
          <ToggleControl
            label={__('Show Number', 'webdune-blocks')}
            checked={showNumber}
            onChange={(value) => setAttributes({ showNumber: value })}
          />
          {showNumber && (
            <TextControl
              label={__('Number Value', 'webdune-blocks')}
              value={numberValue}
              onChange={(value) => setAttributes({ numberValue: value })}
              help={__('Period will be added automatically', 'webdune-blocks')}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
          )}

          <SelectControl
            label={__('Heading Level', 'webdune-blocks')}
            value={showH2 ? 'h2' : (showH3 ? 'h3' : 'none')}
            options={[
              { label: 'None', value: 'none' },
              { label: 'H2 (Large)', value: 'h2' },
              { label: 'H3 (Default)', value: 'h3' }
            ]}
            onChange={(value) => {
              if (value === 'h2') {
                setAttributes({ showH2: true, showH3: false });
              } else if (value === 'h3') {
                setAttributes({ showH2: false, showH3: true });
              } else {
                setAttributes({ showH2: false, showH3: false });
              }
            }}
          />

          <ToggleControl
            label={__('Show Rich Text', 'webdune-blocks')}
            checked={showRichText}
            onChange={(value) => setAttributes({ showRichText: value })}
          />

          <ToggleControl
            label={__('Center Align Text', 'webdune-blocks')}
            checked={centerAlignText}
            onChange={(value) => setAttributes({ centerAlignText: value })}
          />

          <ToggleControl
            label={__('Show CTA', 'webdune-blocks')}
            checked={showCTA}
            onChange={(value) => setAttributes({ showCTA: value })}
          />
          {showCTA && (
            <>
              <SelectControl
                label={__('CTA Style', 'webdune-blocks')}
                value={ctaStyle}
                options={[
                  { label: 'Button', value: 'button' },
                  { label: 'Underline', value: 'underline' }
                ]}
                onChange={(value) => setAttributes({ ctaStyle: value })}
              />
              <TextControl
                label={__('CTA Text', 'webdune-blocks')}
                value={ctaText}
                onChange={(value) => setAttributes({ ctaText: value })}
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
            </>
          )}

          <ToggleControl
            label={__('Show Down Arrow', 'webdune-blocks')}
            checked={showDownArrow}
            onChange={(value) => setAttributes({ showDownArrow: value })}
          />
        </PanelBody>

        <PanelBody title={__('Media Content', 'webdune-blocks')}>
          <SelectControl
            label={__('Media Type', 'webdune-blocks')}
            value={mediaType}
            options={[
              { label: 'Single Image', value: 'single-image' },
              { label: 'Double Images', value: 'double-images' },
              { label: 'Video', value: 'video' }
            ]}
            onChange={(value) => setAttributes({ mediaType: value })}
          />

          {mediaType === 'video' && (
            <>
              <SelectControl
                label={__('Aspect Ratio', 'webdune-blocks')}
                value={videoAspectRatio}
                options={[
                  { label: 'Portrait', value: 'portrait' },
                  { label: 'Square', value: 'square' }
                ]}
                onChange={(value) => setAttributes({ videoAspectRatio: value })}
              />
              <TextControl
                label={__('Video URL', 'webdune-blocks')}
                value={videoUrl}
                onChange={(value) => setAttributes({ videoUrl: value })}
                help={__('Enter video URL (MP4, WebM, etc.)', 'webdune-blocks')}
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
            </>
          )}

          {mediaType === 'single-image' && (
            <>
              <SelectControl
                label={__('Image Mode', 'webdune-blocks')}
                value={singleImageMode}
                options={[
                  { label: 'Full Height', value: 'full-height' },
                  { label: 'Phone', value: 'phone' }
                ]}
                onChange={(value) => setAttributes({ singleImageMode: value })}
              />
              {singleImageMode === 'phone' && (
                <ToggleControl
                  label={__('Natural Width', 'webdune-blocks')}
                  checked={singleImageNaturalWidth}
                  onChange={(value) => setAttributes({ singleImageNaturalWidth: value })}
                />
              )}
            </>
          )}

          {mediaType === 'double-images' && (
            <SelectControl
              label={__('Double Image Mode', 'webdune-blocks')}
              value={doubleImageMode}
              options={[
                { label: 'Tall Overlaid', value: 'tall-overlaid' },
                { label: 'Stacked', value: 'stacked' }
              ]}
              onChange={(value) => setAttributes({ doubleImageMode: value })}
            />
          )}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <section
          className={`section_2-col section-padding-${sectionPadding}`}
          style={{ backgroundColor: getBgColor() }}
        >
          <div className="padding-global">
            <div className={`w-layout-blockcontainer ${getContainerClass()} w-container`}>

              {showHeader && (
                <div className="section-header-wrapper">
                  <RichText
                    tagName="h2"
                    className="section-header"
                    value={headerText}
                    onChange={(value) => setAttributes({ headerText: value })}
                    placeholder={__('Enter header text...', 'webdune-blocks')}
                    allowedFormats={['core/bold', 'core/italic', 'webdune/gradient-underline']}
                  />
                </div>
              )}

              <div
                className="two-col-block_grid"
                style={{ gridTemplateColumns: `${gridRatioLeft}fr ${gridRatioRight}fr` }}
              >
                {/* Text Content Column */}
                <div className={`two-col-block_text-content ${centerAlignText ? 'center-align' : ''}`}>
                  {showNumber && (
                    <div className="two-col-block_number">
                      {numberValue}.
                    </div>
                  )}

                  {showH2 && (
                    <RichText
                      tagName="h2"
                      className="two-col-block_heading"
                      value={h2Text}
                      onChange={(value) => setAttributes({ h2Text: value })}
                      placeholder={__('Enter H2 heading...', 'webdune-blocks')}
                      allowedFormats={['core/bold', 'core/italic', 'webdune/gradient-underline']}
                    />
                  )}

                  {showH3 && (
                    <RichText
                      tagName="h3"
                      className="two-col-block_heading"
                      value={h3Text}
                      onChange={(value) => setAttributes({ h3Text: value })}
                      placeholder={__('Enter H3 heading...', 'webdune-blocks')}
                      allowedFormats={['core/bold', 'core/italic', 'webdune/gradient-underline']}
                    />
                  )}

                  {showRichText && (
                    <div className="two-col-block_rich-text">
                      <InnerBlocks
                        allowedBlocks={[
                          'core/paragraph',
                          'core/list',
                          'core/heading'
                        ]}
                        template={[
                          ['core/paragraph', { placeholder: 'Add text, lists, or headings...' }]
                        ]}
                        templateLock={false}
                        renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                      />
                    </div>
                  )}

                  {showCTA && (
                    <div className="two-col-block_cta">
                      <TextControl
                        label={__('CTA Text', 'webdune-blocks')}
                        value={ctaText}
                        onChange={(value) => setAttributes({ ctaText: value })}
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                      />
                      <URLInput
                        label={__('CTA Link', 'webdune-blocks')}
                        value={ctaUrl}
                        onChange={(value) => setAttributes({ ctaUrl: value })}
                      />
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className={ctaStyle === 'button' ? 'button' : 'underline-cta'}
                      >
                        {ctaText || 'Click here'}
                      </a>
                    </div>
                  )}

                  {showDownArrow && (
                    <div className="two-col-block_down-arrow">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="54" viewBox="0 0 20 54" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                        <path d="M9.07488 0L8.82334 49.635L1.63214 42.4326L0 44.0348L9.94975 54L20 44.1344L18.3842 42.5161L11.1203 49.6465L11.3719 0.0114446L9.07488 0Z" fill="currentColor" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Media Content Column */}
                <div className="two-col-block_media-content">
                  {mediaType === 'video' && (
                    <div className={`media-video media-video-${videoAspectRatio}`}>
                      {videoUrl ? (
                        <div className="video-wrapper">
                          <div className="video-overlay">
                            <div className="video-play-button">▶</div>
                          </div>
                          <video src={videoUrl} />
                        </div>
                      ) : (
                        <div className="media-placeholder">
                          {__('Add video URL in sidebar', 'webdune-blocks')}
                        </div>
                      )}
                    </div>
                  )}

                  {mediaType === 'single-image' && (
                    <div className={`media-single-image media-single-${singleImageMode} ${singleImageNaturalWidth ? 'natural-width' : ''}`}>
                      <MediaUploadCheck>
                        <MediaUpload
                          onSelect={(media) => setAttributes({ singleImage: { id: media.id, url: media.url, alt: media.alt } })}
                          allowedTypes={['image']}
                          value={singleImage?.id}
                          render={({ open }) => (
                            <>
                              {singleImage?.url ? (
                                <div className="image-wrapper">
                                  <img src={singleImage.url} alt={singleImage.alt || ''} />
                                  <Button onClick={open} variant="secondary">
                                    {__('Change Image', 'webdune-blocks')}
                                  </Button>
                                </div>
                              ) : (
                                <Button onClick={open} variant="primary">
                                  {__('Select Image', 'webdune-blocks')}
                                </Button>
                              )}
                            </>
                          )}
                        />
                      </MediaUploadCheck>
                    </div>
                  )}

                  {mediaType === 'double-images' && (
                    <div className={`media-double-images media-double-${doubleImageMode}`}>
                      <div className="double-images-wrapper">
                        <div className="double-image-first">
                          <MediaUploadCheck>
                            <MediaUpload
                              onSelect={(media) => setAttributes({ doubleImageFirst: { id: media.id, url: media.url, alt: media.alt } })}
                              allowedTypes={['image']}
                              value={doubleImageFirst?.id}
                              render={({ open }) => (
                                <>
                                  {doubleImageFirst?.url ? (
                                    <>
                                      <img src={doubleImageFirst.url} alt={doubleImageFirst.alt || ''} />
                                      <Button onClick={open} variant="secondary" size="small">
                                        {__('Change', 'webdune-blocks')}
                                      </Button>
                                    </>
                                  ) : (
                                    <Button onClick={open} variant="primary" size="small">
                                      {__('Image 1', 'webdune-blocks')}
                                    </Button>
                                  )}
                                </>
                              )}
                            />
                          </MediaUploadCheck>
                        </div>

                        <div className="double-image-second">
                          <MediaUploadCheck>
                            <MediaUpload
                              onSelect={(media) => setAttributes({ doubleImageSecond: { id: media.id, url: media.url, alt: media.alt } })}
                              allowedTypes={['image']}
                              value={doubleImageSecond?.id}
                              render={({ open }) => (
                                <>
                                  {doubleImageSecond?.url ? (
                                    <>
                                      <img src={doubleImageSecond.url} alt={doubleImageSecond.alt || ''} />
                                      <Button onClick={open} variant="secondary" size="small">
                                        {__('Change', 'webdune-blocks')}
                                      </Button>
                                    </>
                                  ) : (
                                    <Button onClick={open} variant="primary" size="small">
                                      {__('Image 2', 'webdune-blocks')}
                                    </Button>
                                  )}
                                </>
                              )}
                            />
                          </MediaUploadCheck>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


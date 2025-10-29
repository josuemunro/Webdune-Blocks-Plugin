import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  InspectorControls
} from '@wordpress/block-editor';
import {
  PanelBody,
  Button,
  ToggleControl,
  TextControl
} from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  const {
    heading,
    showHeadingUnderline,
    stats
  } = attributes;

  const blockProps = useBlockProps({
    className: 'webdune-stats-section-block',
  });

  // Update stat at specific index
  const updateStat = (index, field, value) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setAttributes({ stats: newStats });
  };

  // Add a stat
  const addStat = () => {
    const newStats = [...stats, { number: '0', label: 'New statistic', showLabelUnderline: false }];
    setAttributes({ stats: newStats });
  };

  // Remove a stat
  const removeStat = (index) => {
    const newStats = stats.filter((_, i) => i !== index);
    setAttributes({ stats: newStats });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Heading Settings', 'webdune-blocks')} initialOpen={true}>
          <ToggleControl
            label={__('Show Decorative Underline in Heading', 'webdune-blocks')}
            help={__('Applies gradient underline to text wrapped in <span> tags', 'webdune-blocks')}
            checked={showHeadingUnderline}
            onChange={(value) => setAttributes({ showHeadingUnderline: value })}
          />
        </PanelBody>

        <PanelBody title={__('Statistics', 'webdune-blocks')} initialOpen={true}>
          <p style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}>
            {__('Add up to 3 statistics. Numbers will animate counting up on scroll.', 'webdune-blocks')}
          </p>
          {stats.map((stat, index) => (
            <div key={index} style={{ marginBottom: '20px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
              <h4 style={{ marginTop: '0', fontSize: '14px' }}>{__('Stat', 'webdune-blocks')} {index + 1}</h4>
              <TextControl
                label={__('Number', 'webdune-blocks')}
                help={__('Can include $ signs, commas, etc. (e.g. "$1,697,167" or "5,510")', 'webdune-blocks')}
                value={stat.number}
                onChange={(value) => updateStat(index, 'number', value)}
                style={{ marginBottom: '8px' }}
              />
              <div style={{ marginBottom: '8px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                  {__('Label', 'webdune-blocks')}
                </label>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '0', marginBottom: '8px' }}>
                  {__('Use the thin underline format button for gradient underlines on labels', 'webdune-blocks')}
                </p>
                <div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '8px', background: '#fff' }}>
                  <RichText
                    tagName="div"
                    value={stat.label}
                    onChange={(value) => updateStat(index, 'label', value)}
                    placeholder={__('Enter label...', 'webdune-blocks')}
                    allowedFormats={['core/bold', 'core/italic', 'webdune/gradient-underline-thin']}
                  />
                </div>
              </div>
              {stats.length > 1 && (
                <Button onClick={() => removeStat(index)} className="button is-link is-destructive" isSmall>
                  {__('Remove Stat', 'webdune-blocks')}
                </Button>
              )}
            </div>
          ))}
          {stats.length < 3 && (
            <Button onClick={addStat} className="button button-primary">
              {__('+ Add Stat', 'webdune-blocks')}
            </Button>
          )}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <section className="section_stats">
          <div className="padding-global z-index-1">
            <div className="container-medium">
              <div className="stats_content">
                <RichText
                  tagName="h2"
                  className="heading-style-h2 text-align-center"
                  value={heading}
                  onChange={(value) => setAttributes({ heading: value })}
                  placeholder={__('Enter heading...', 'webdune-blocks')}
                  allowedFormats={['core/bold', 'core/italic', 'webdune/gradient-underline']}
                />
                <div className="stats_grid">
                  {stats.map((stat, index) => (
                    <div key={index} className="stats_item">
                      <div className="stats_stat" data-target={stat.number}>
                        {stat.number}
                      </div>
                      <RichText.Content
                        tagName="div"
                        className="stats_label"
                        value={stat.label}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


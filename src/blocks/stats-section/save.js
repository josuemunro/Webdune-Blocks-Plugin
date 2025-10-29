import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    heading,
    showHeadingUnderline,
    stats
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'webdune-stats-section-block',
  });

  return (
    <div {...blockProps}>
      <section className="section_stats">
        <div className="padding-global z-index-1">
          <div className="container-medium">
            <div className="stats_content">
              <RichText.Content
                tagName="h2"
                className="heading-style-h2 text-align-center"
                value={heading}
              />
              <div className="stats_grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stats_item">
                    <div
                      className="stats_stat"
                      data-target={stat.number}
                      data-animated="false"
                    >
                      0
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
  );
}


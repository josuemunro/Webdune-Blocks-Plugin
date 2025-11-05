import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { Spinner } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { postsPerPage, showTags, showReadTime, showExcerpt, columns } = attributes;
  const blockProps = useBlockProps();

  // Fetch Tips posts
  const { posts, hasResolved } = useSelect(
    (select) => {
      const query = {
        per_page: postsPerPage,
        _embed: true,
      };
      return {
        posts: select('core').getEntityRecords('postType', 'tip', query),
        hasResolved: select('core').hasFinishedResolution('getEntityRecords', [
          'postType',
          'tip',
          query,
        ]),
      };
    },
    [postsPerPage]
  );

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Tips Grid Settings', 'webdune-blocks')}>
          <RangeControl
            label={__('Posts Per Page', 'webdune-blocks')}
            value={postsPerPage}
            onChange={(value) => setAttributes({ postsPerPage: value })}
            min={3}
            max={24}
            help={__('Number of tips to display', 'webdune-blocks')}
          />
          <RangeControl
            label={__('Columns', 'webdune-blocks')}
            value={columns}
            onChange={(value) => setAttributes({ columns: value })}
            min={2}
            max={4}
            help={__('Number of columns on desktop', 'webdune-blocks')}
          />
          <ToggleControl
            label={__('Show Tags', 'webdune-blocks')}
            checked={showTags}
            onChange={(value) => setAttributes({ showTags: value })}
          />
          <ToggleControl
            label={__('Show Read Time', 'webdune-blocks')}
            checked={showReadTime}
            onChange={(value) => setAttributes({ showReadTime: value })}
          />
          <ToggleControl
            label={__('Show Excerpt', 'webdune-blocks')}
            checked={showExcerpt}
            onChange={(value) => setAttributes({ showExcerpt: value })}
          />
        </PanelBody>
      </InspectorControls>

      <section {...blockProps}>
        <div className="padding-global">
          <div className="container-large">
            <div className="tips-grid">
              {!hasResolved ? (
                <div className="tips-grid__loading">
                  <Spinner />
                  <p>{__('Loading tips...', 'webdune-blocks')}</p>
                </div>
              ) : posts && posts.length > 0 ? (
                <div className={`tips-grid__list tips-grid__list--columns-${columns}`}>
                  {posts.map((post) => {
                    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
                    const tags = post._embedded?.['wp:term']?.flat() || [];
                    
                    return (
                      <article key={post.id} className="tips-grid__card">
                        {featuredImage && (
                          <div className="tips-grid__card-image">
                            <img
                              src={featuredImage.source_url}
                              alt={featuredImage.alt_text || post.title.rendered}
                            />
                          </div>
                        )}
                        
                        <div className="tips-grid__card-content">
                          {(showTags || showReadTime) && (
                            <div className="tips-grid__card-meta">
                              {showTags && tags.length > 0 && (
                                <span className="tips-grid__card-tag">
                                  {tags[0].name}
                                </span>
                              )}
                              {showReadTime && (
                                <span className="tips-grid__card-read-time">
                                  5 min read
                                </span>
                              )}
                            </div>
                          )}
                          
                          <h3 className="tips-grid__card-title">
                            {post.title.rendered}
                          </h3>
                          
                          {showExcerpt && post.excerpt && (
                            <div
                              className="tips-grid__card-excerpt"
                              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                            />
                          )}
                          
                          <div className="tips-grid__card-link">
                            <span>{__('Read more', 'webdune-blocks')}</span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="tips-grid__empty">
                  <p>{__('No tips found. Create your first tip!', 'webdune-blocks')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


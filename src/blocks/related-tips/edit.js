import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InspectorControls,
  RichText,
} from '@wordpress/block-editor';
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  TextControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function Edit({ attributes, setAttributes }) {
  const { heading, postsCount, showButton, buttonText, buttonUrl } = attributes;
  const blockProps = useBlockProps();

  // Get current post ID
  const postId = useSelect((select) => {
    return select('core/editor').getCurrentPostId();
  }, []);

  // Fetch related Tips posts (in editor, show latest 3 as preview)
  const { posts } = useSelect(
    (select) => {
      const query = {
        per_page: postsCount,
        exclude: [postId],
      };
      return {
        posts: select('core').getEntityRecords('postType', 'tip', query) || [],
      };
    },
    [postsCount, postId]
  );

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Related Tips Settings', 'webdune-blocks')}>
          <RangeControl
            label={__('Number of Posts', 'webdune-blocks')}
            value={postsCount}
            onChange={(value) => setAttributes({ postsCount: value })}
            min={2}
            max={6}
            help={__('How many related tips to show', 'webdune-blocks')}
          />
          <ToggleControl
            label={__('Show "All Posts" Button', 'webdune-blocks')}
            checked={showButton}
            onChange={(value) => setAttributes({ showButton: value })}
          />
          {showButton && (
            <>
              <TextControl
                label={__('Button Text', 'webdune-blocks')}
                value={buttonText}
                onChange={(value) => setAttributes({ buttonText: value })}
              />
              <TextControl
                label={__('Button URL', 'webdune-blocks')}
                value={buttonUrl}
                onChange={(value) => setAttributes({ buttonUrl: value })}
                help={__('Link to Tips archive page', 'webdune-blocks')}
              />
            </>
          )}
        </PanelBody>
      </InspectorControls>

      <section {...blockProps}>
        <div className="padding-global">
          <div className="container-large">
            <div className="related-tips">
              <div className="related-tips__header">
                <div className="related-tips__title-wrapper">
                  <p className="related-tips__tagline">Tips</p>
                  <RichText
                    tagName="h2"
                    className="related-tips__heading"
                    value={heading}
                    onChange={(value) => setAttributes({ heading: value })}
                    placeholder={__('Related tips', 'webdune-blocks')}
                  />
                </div>
                {showButton && (
                  <div className="related-tips__actions">
                    <span className="button">{buttonText}</span>
                  </div>
                )}
              </div>

              <div className="related-tips__grid">
                {posts.length > 0 ? (
                  posts.slice(0, postsCount).map((post) => (
                    <article key={post.id} className="related-tips__card">
                      {post.featured_media && (
                        <div className="related-tips__card-image">
                          <div className="related-tips__card-img-placeholder"></div>
                        </div>
                      )}
                      <div className="related-tips__card-content">
                        <div className="related-tips__card-meta">
                          <span className="related-tips__card-tag">Tag one</span>
                          <span className="related-tips__card-read-time">
                            5 min read
                          </span>
                        </div>
                        <h3 className="related-tips__card-title">
                          {post.title.rendered}
                        </h3>
                        <p className="related-tips__card-excerpt">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Suspendisse varius enim in eros.
                        </p>
                        <div className="related-tips__card-link">
                          <span>Read more</span>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="related-tips__preview-note">
                    {__('Related tips will appear here based on tags and categories', 'webdune-blocks')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, MediaUpload } from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  RangeControl,
  Button,
  IconButton,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { heading, googleRating, reviewCount, reviews, autoplaySpeed } = attributes;

  const blockProps = useBlockProps({
    className: 'webdune-reviews-marquee-editor',
  });

  const addReview = () => {
    const newReview = {
      id: reviews.length + 1,
      text: 'Enter review text...',
      author: 'Customer Name',
      date: 'a month ago',
      photo: '',
    };
    setAttributes({ reviews: [...reviews, newReview] });
  };

  const updateReview = (index, field, value) => {
    const updatedReviews = [...reviews];
    updatedReviews[index] = { ...updatedReviews[index], [field]: value };
    setAttributes({ reviews: updatedReviews });
  };

  const removeReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setAttributes({ reviews: updatedReviews });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Google Rating', 'webdune-blocks')}>
          <TextControl
            label={__('Overall Rating', 'webdune-blocks')}
            value={googleRating}
            onChange={(value) => setAttributes({ googleRating: value })}
            help={__('e.g., 5.0', 'webdune-blocks')}
          />
          <TextControl
            label={__('Review Count', 'webdune-blocks')}
            value={reviewCount}
            onChange={(value) => setAttributes({ reviewCount: value })}
            help={__('e.g., 276', 'webdune-blocks')}
          />
        </PanelBody>

        <PanelBody title={__('Marquee Settings', 'webdune-blocks')} initialOpen={false}>
          <RangeControl
            label={__('Autoplay Speed (seconds)', 'webdune-blocks')}
            value={autoplaySpeed / 1000}
            onChange={(value) => setAttributes({ autoplaySpeed: value * 1000 })}
            min={10}
            max={120}
            help={__('Time for one complete scroll cycle', 'webdune-blocks')}
          />
        </PanelBody>

        <PanelBody title={__('Reviews', 'webdune-blocks')} initialOpen={false}>
          {reviews.map((review, index) => (
            <div key={review.id} style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '4px' }}>
              <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Review #{index + 1}</div>

              <TextControl
                label={__('Author Name', 'webdune-blocks')}
                value={review.author}
                onChange={(value) => updateReview(index, 'author', value)}
              />

              <TextControl
                label={__('Review Text', 'webdune-blocks')}
                value={review.text}
                onChange={(value) => updateReview(index, 'text', value)}
                help={__('The review content', 'webdune-blocks')}
              />

              <TextControl
                label={__('Date', 'webdune-blocks')}
                value={review.date}
                onChange={(value) => updateReview(index, 'date', value)}
                placeholder="a month ago"
              />

              <MediaUpload
                onSelect={(media) => updateReview(index, 'photo', media.url)}
                allowedTypes={['image']}
                value={review.photo}
                render={({ open }) => (
                  <div style={{ marginBottom: '10px' }}>
                    <Button onClick={open} isSecondary>
                      {review.photo ? __('Change Photo', 'webdune-blocks') : __('Add Photo', 'webdune-blocks')}
                    </Button>
                    {review.photo && (
                      <div style={{ marginTop: '10px' }}>
                        <img src={review.photo} alt={review.author} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                      </div>
                    )}
                  </div>
                )}
              />

              <Button
                isDestructive
                onClick={() => removeReview(index)}
                style={{ marginTop: '10px' }}
              >
                {__('Remove Review', 'webdune-blocks')}
              </Button>
            </div>
          ))}

          <Button isPrimary onClick={addReview}>
            {__('+ Add Review', 'webdune-blocks')}
          </Button>
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="reviews-editor-header">
          <h3>{__('Reviews Marquee', 'webdune-blocks')}</h3>
          <p>{__('Configure your reviews in the sidebar →', 'webdune-blocks')}</p>
        </div>

        <div className="reviews-editor-heading">
          <RichText
            tagName="h2"
            className="text-align-center"
            value={heading}
            onChange={(value) => setAttributes({ heading: value })}
            placeholder={__('Enter heading...', 'webdune-blocks')}
            allowedFormats={['core/bold', 'core/italic']}
          />
        </div>

        <div className="reviews-editor-badge">
          <div className="reviews_tag">
            <img src={`${window.location.origin}/wp-content/plugins/webdune-blocks/sellmycell.webflow/images/Google-Logo.svg`} alt="Google" style={{ height: '20px' }} />
            <div className="reviews_overall-rating">{googleRating}</div>
            <div>from <strong>{reviewCount}</strong> reviews</div>
          </div>
        </div>

        <div className="reviews-editor-preview">
          <div className="review-cards-preview">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="review-card-preview">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p>{review.text.substring(0, 80)}...</p>
                <div className="author">
                  <strong>{review.author}</strong> • {review.date}
                </div>
              </div>
            ))}
          </div>
          <p className="preview-note">
            {reviews.length} review{reviews.length !== 1 ? 's' : ''} • Preview shows first 3
          </p>
        </div>
      </div>
    </>
  );
}


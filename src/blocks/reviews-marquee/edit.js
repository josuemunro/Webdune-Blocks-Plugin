import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, MediaUpload } from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  TextareaControl,
  RangeControl,
  Button,
  IconButton,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function Edit({ attributes, setAttributes, clientId }) {
  const { heading, googleRating, reviewCount, reviews, autoplaySpeed, blockId } = attributes;

  // Generate unique block ID on mount if not set & clean review data
  useEffect(() => {
    if (!blockId) {
      setAttributes({ blockId: `reviews-marquee-${clientId}` });
    }

    // Sanitize reviews array to ensure no null/undefined values
    const cleanedReviews = reviews.map(review => ({
      id: typeof review.id === 'number' ? review.id : 0,
      text: review.text || '',
      author: review.author || '',
      date: review.date || '',
      photo: review.photo || '',
    }));

    // Only update if data was actually cleaned
    if (JSON.stringify(cleanedReviews) !== JSON.stringify(reviews)) {
      console.log('🧹 Cleaned reviews data on load');
      setAttributes({ reviews: cleanedReviews });
    }
  }, []);

  const blockProps = useBlockProps({
    className: 'webdune-reviews-marquee-editor',
  });

  const addReview = () => {
    // Limit to 10 reviews max to prevent database issues
    if (reviews.length >= 10) {
      alert('Maximum 10 reviews allowed. Please remove a review before adding a new one.');
      return;
    }
    
    // Generate a simple unique ID that matches the default format
    const maxId = reviews.length > 0 ? Math.max(...reviews.map(r => r.id || 0)) : 0;
    const newReview = {
      id: maxId + 1, // Sequential ID matching default format
      text: 'Enter review text...',
      author: 'Customer Name',
      date: 'a month ago',
      photo: '', // Empty string instead of null
    };
    setAttributes({ reviews: [...reviews, newReview] });
  };

  const updateReview = (index, field, value) => {
    const updatedReviews = [...reviews];
    
    // Sanitize value to ensure emojis are properly handled
    if (value && typeof value === 'string') {
      // Remove any null bytes or invalid UTF-8 sequences
      value = value.replace(/\0/g, '');
      
      // Limit review text to 300 characters to prevent database issues
      if (field === 'text' && value.length > 300) {
        value = value.substring(0, 300);
      }
      
      // Limit author name to 50 characters
      if (field === 'author' && value.length > 50) {
        value = value.substring(0, 50);
      }
    }
    
    updatedReviews[index] = {
      ...updatedReviews[index],
      [field]: value || '',
      // Ensure photo is always a string, never null or undefined
      photo: field === 'photo' ? (value || '') : (updatedReviews[index].photo || ''),
    };
    
    setAttributes({ reviews: updatedReviews });
  };

  const removeReview = (index) => {
    const updatedReviews = reviews
      .filter((_, i) => i !== index)
      .map(review => ({
        ...review,
        // Ensure all fields are properly set
        id: review.id || 0,
        text: review.text || '',
        author: review.author || '',
        date: review.date || '',
        photo: review.photo || '',
      }));
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
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />
          <TextControl
            label={__('Review Count', 'webdune-blocks')}
            value={reviewCount}
            onChange={(value) => setAttributes({ reviewCount: value })}
            help={__('e.g., 276', 'webdune-blocks')}
            __next40pxDefaultSize
            __nextHasNoMarginBottom
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
          <p style={{ fontSize: '12px', color: '#d63638', marginBottom: '12px', fontWeight: '600' }}>
            ⚠️ {__('Limited to 10 reviews max and 300 chars per review to prevent database save errors on live sites.', 'webdune-blocks')}
          </p>
          {reviews.map((review, index) => (
            <div key={review.id} style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '4px' }}>
              <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Review #{index + 1}</div>

              <TextControl
                label={__('Author Name', 'webdune-blocks')}
                value={review.author}
                onChange={(value) => updateReview(index, 'author', value)}
                help={__('Max 50 characters', 'webdune-blocks')}
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />

              <TextareaControl
                label={__('Review Text', 'webdune-blocks')}
                value={review.text}
                onChange={(value) => updateReview(index, 'text', value)}
                help={`${review.text.length}/300 characters`}
                rows={4}
                style={{ fontFamily: 'inherit' }}
              />

              <TextControl
                label={__('Date', 'webdune-blocks')}
                value={review.date}
                onChange={(value) => updateReview(index, 'date', value)}
                placeholder="a month ago"
                __next40pxDefaultSize
                __nextHasNoMarginBottom
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

          <Button 
            isPrimary 
            onClick={addReview}
            disabled={reviews.length >= 10}
          >
            {reviews.length >= 10 
              ? __('Maximum 10 reviews reached', 'webdune-blocks')
              : __(`+ Add Review (${reviews.length}/10)`, 'webdune-blocks')
            }
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


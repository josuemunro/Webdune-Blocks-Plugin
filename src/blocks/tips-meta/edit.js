import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
  const blockProps = useBlockProps({
    className: 'tips-meta',
  });

  return (
    <div {...blockProps}>
      <div className="tips-meta__container">
        <div className="tips-meta__share">
          <p className="tips-meta__share-label">{__('Share this post', 'webdune-blocks')}</p>
          <div className="tips-meta__share-buttons">
            <button className="tips-meta__share-button" title="Copy link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M10.5 14.5L13.5 11.5M13.5 11.5L10.5 8.5M13.5 11.5H5.5M14.5 17H8.5C6.567 17 5 15.433 5 13.5V10.5C5 8.567 6.567 7 8.5 7H14.5C16.433 7 18 8.567 18 10.5V13.5C18 15.433 16.433 17 14.5 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="tips-meta__share-button" title="Share on LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7.5 9H4.5V19H7.5V9Z" fill="currentColor"/>
                <path d="M6 7C5.172 7 4.5 6.328 4.5 5.5C4.5 4.672 5.172 4 6 4C6.828 4 7.5 4.672 7.5 5.5C7.5 6.328 6.828 7 6 7Z" fill="currentColor"/>
                <path d="M19.5 19H16.5V14.25C16.5 13.147 16.481 11.719 15.031 11.719C13.558 11.719 13.341 12.928 13.341 14.169V19H10.341V9H13.215V10.297H13.254C13.651 9.547 14.634 8.75 16.119 8.75C19.156 8.75 19.5 10.822 19.5 13.5V19Z" fill="currentColor"/>
              </svg>
            </button>
            <button className="tips-meta__share-button" title="Share on X">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18.244 7.5H20.552L14.324 14.5L21.826 21.5H16.169L11.955 16.563L7.11 21.5H4.8L11.468 14.008L4.254 7.5H10.08L13.852 11.932L18.243 7.5H18.244ZM17.084 19.688H18.915L9.084 9.358H7.116L17.084 19.688Z" fill="currentColor"/>
              </svg>
            </button>
            <button className="tips-meta__share-button" title="Share on Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9.5 8V11H7.5V14H9.5V21H13V14H15.5L16 11H13V9C13 8.448 13.448 8 14 8H16V5H14C11.791 5 9.5 6.791 9.5 9V8Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="tips-meta__tags">
          <div className="tips-meta__tag">{__('Category one', 'webdune-blocks')}</div>
          <div className="tips-meta__tag">{__('Category two', 'webdune-blocks')}</div>
          <div className="tips-meta__tag">{__('Category three', 'webdune-blocks')}</div>
        </div>
      </div>

      <p style={{ marginTop: '12px', fontSize: '13px', color: '#666', fontStyle: 'italic' }}>
        {__('Categories and share URLs will be generated automatically on the frontend', 'webdune-blocks')}
      </p>
    </div>
  );
}

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { categoryName, categoryId } = attributes;
  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps} className="faq-section">
      {/* Scroll target anchor */}
      <div id={categoryId} className="scroll_target dynamic is-faq"></div>
      
      {/* Category heading */}
      <h2 className="faq-h2" data-fade-up="true">{categoryName}</h2>

      {/* FAQ items list */}
      <div className="faq-list">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}


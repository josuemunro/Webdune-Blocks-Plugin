import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const {
    question,
    answer,
    defaultOpen
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'faq5_accordion',
  });

  return (
    <div {...blockProps}>
      <div
        className="faq5_question"
        role="button"
        tabIndex="0"
        aria-expanded={defaultOpen ? 'true' : 'false'}
        data-faq-trigger
      >
        <div className="faq5_icon-wrapper">
          <div className="icon-embed-small">
            <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.3333 15.667V16.3336C25.3333 16.7018 25.0349 17.0003 24.6667 17.0003H17V24.667C17 25.0351 16.7015 25.3336 16.3333 25.3336H15.6667C15.2985 25.3336 15 25.0351 15 24.667V17.0003H7.3333C6.96511 17.0003 6.66663 16.7018 6.66663 16.3336V15.667C6.66663 15.2988 6.96511 15.0003 7.3333 15.0003H15V7.33365C15 6.96546 15.2985 6.66699 15.6667 6.66699H16.3333C16.7015 6.66699 17 6.96546 17 7.33365V15.0003H24.6667C25.0349 15.0003 25.3333 15.2988 25.3333 15.667Z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
        <RichText.Content
          tagName="div"
          className="faq_question-h3"
          value={question}
        />
      </div>

      <div
        className="faq5_answer"
        style={{ height: defaultOpen ? 'auto' : '0px' }}
        data-faq-answer
      >
        <RichText.Content
          tagName="p"
          className="faq_answer-inner"
          value={answer}
        />
      </div>
    </div>
  );
}


import { registerBlockType } from '@wordpress/blocks';
import { registerFormatType } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { toggleFormat } from '@wordpress/rich-text';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';

console.log('🚀 FAQ Parent block loading...');

// Register the gradient underline format for FAQ headings
registerFormatType('webdune/gradient-underline', {
  title: 'Gradient Underline',
  tagName: 'span',
  className: 'gradient-underline',
  edit: ({ isActive, value, onChange }) => {
    return (
      <RichTextToolbarButton
        icon="editor-underline"
        title="Gradient Underline"
        onClick={() => {
          onChange(
            toggleFormat(value, {
              type: 'webdune/gradient-underline',
            })
          );
        }}
        isActive={isActive}
      />
    );
  },
});

registerBlockType('webdune/faq', {
  edit: Edit,
  save: Save,
});

console.log('✅ FAQ Parent block registered!');


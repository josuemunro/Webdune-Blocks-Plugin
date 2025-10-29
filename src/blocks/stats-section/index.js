import { registerBlockType } from '@wordpress/blocks';
import { registerFormatType } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { toggleFormat } from '@wordpress/rich-text';
import './style.scss';
import './editor.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

// Register the gradient underline format
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

// Register the thin gradient underline format for stat labels
registerFormatType('webdune/gradient-underline-thin', {
  title: 'Gradient Underline (Thin)',
  tagName: 'span',
  className: 'gradient-underline thin',
  edit: ({ isActive, value, onChange }) => {
    return (
      <RichTextToolbarButton
        icon="minus"
        title="Gradient Underline (Thin)"
        onClick={() => {
          onChange(
            toggleFormat(value, {
              type: 'webdune/gradient-underline-thin',
            })
          );
        }}
        isActive={isActive}
      />
    );
  },
});

registerBlockType(metadata.name, {
  edit: Edit,
  save,
});


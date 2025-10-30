/**
 * Custom Rich Text Formats
 * Register all custom formatting options globally here to avoid conflicts
 */

import { registerFormatType } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { toggleFormat } from '@wordpress/rich-text';

// Register the gradient underline format (thick/regular)
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

// Register the thin gradient underline format (for stat labels)
registerFormatType('webdune/gradient-underline-thin', {
  title: 'Thin Underline',
  tagName: 'span',
  className: 'gradient-underline-thin',
  edit: ({ isActive, value, onChange }) => {
    return (
      <RichTextToolbarButton
        icon="minus"
        title="Thin Gradient Underline (for stats labels)"
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

// Register the charity highlight format (for charity section)
registerFormatType('webdune/charity-highlight', {
  title: 'Charity Highlight',
  tagName: 'span',
  className: 'charity-highlight',
  edit: ({ isActive, value, onChange }) => {
    return (
      <RichTextToolbarButton
        icon="marker"
        title="Charity Highlight"
        onClick={() => {
          onChange(
            toggleFormat(value, {
              type: 'webdune/charity-highlight',
            })
          );
        }}
        isActive={isActive}
      />
    );
  },
});


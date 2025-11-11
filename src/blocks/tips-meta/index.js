/**
 * Tips Meta Block
 * Displays tip categories and share buttons
 */

import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import metadata from './block.json';
import './style.scss';
import './editor.scss';

// Register the block (no save function because we use render.php)
registerBlockType(metadata.name, {
  ...metadata,
  edit,
  save: () => null, // Server-side rendering via render.php
});

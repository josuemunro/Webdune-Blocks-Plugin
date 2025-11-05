import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import './style.scss';
import './editor.scss';

console.log('🚀 FAQ Item block loading...');

registerBlockType(metadata.name, {
  ...metadata,
  edit: Edit,
  save: Save,
});

console.log('✅ FAQ Item block registered!');


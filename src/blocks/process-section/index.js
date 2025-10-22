import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';

console.log('🚀 Process Section block loading...');

registerBlockType('webdune/process-section', {
  edit: Edit,
  save: Save,
});

console.log('✅ Process Section block registered!');

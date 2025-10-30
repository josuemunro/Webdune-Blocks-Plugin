import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';

console.log('🚀 FAQ Parent block loading...');

registerBlockType('webdune/faq', {
  edit: Edit,
  save: Save,
});

console.log('✅ FAQ Parent block registered!');


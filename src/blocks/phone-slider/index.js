import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import './style.scss';

console.log('🚀 Phone Slider block loading...');

registerBlockType('webdune/phone-slider', {
  edit: Edit,
  save: Save, // Client-side block - saves HTML
});

console.log('✅ Phone Slider block registered!');

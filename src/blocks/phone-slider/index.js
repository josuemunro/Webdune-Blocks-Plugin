import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import './style.scss';

console.log('🚀 Phone Slider block loading...');

registerBlockType('webdune/phone-slider', {
  edit: Edit,
  save: () => null, // Dynamic block - uses render.php
});

console.log('✅ Phone Slider block registered!');


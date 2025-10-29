import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import './style.scss';

console.log('🚀 Reviews Marquee block loading...');

registerBlockType('webdune/reviews-marquee', {
  edit: Edit,
  save: Save,
});

console.log('✅ Reviews Marquee block registered!');


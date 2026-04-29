import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import './style.scss';

registerBlockType('webdune/reviews-marquee', {
  edit: Edit,
  save: Save,
});


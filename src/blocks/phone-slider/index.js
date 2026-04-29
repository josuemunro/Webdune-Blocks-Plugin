import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import './style.scss';

registerBlockType('webdune/phone-slider', {
  edit: Edit,
  save: Save,
});

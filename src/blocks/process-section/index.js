import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';

registerBlockType('webdune/process-section', {
  edit: Edit,
  save: Save,
});

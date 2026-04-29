const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
  ...defaultConfig,
  entry: {
    ...defaultConfig.entry(),
    // Add shared styles as a separate entry point
    'shared/global-styles': path.resolve(process.cwd(), 'src', 'shared', 'index.js'),
    // Editor-only: rich text format registrations (toolbar buttons)
    'shared/editor-formats': path.resolve(process.cwd(), 'src', 'shared', 'formats.js'),
  },
};



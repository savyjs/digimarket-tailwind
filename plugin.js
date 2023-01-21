const cssJs = require('./dist/plugin.json');
const plugin = require('tailwindcss/plugin');
const config = require('./tailwind.config');

module.exports = plugin(function ({ addComponents }) {
  addComponents(cssJs);
}, config);

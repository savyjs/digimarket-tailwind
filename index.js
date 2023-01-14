const cssJs = require('./dist/components.json');
const plugin = require('tailwindcss/plugin');
const config = require('./src/tailwind.config');

module.exports = plugin(function ({ addComponents }) {
  addComponents(cssJs);
}, config);

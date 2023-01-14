const cssJs = require('./dist/components.json');
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({
  addUtilities,
  addComponents,
  theme,
  variants,
}) {
  console.log({ cssJs });
  addComponents(cssJs);
});

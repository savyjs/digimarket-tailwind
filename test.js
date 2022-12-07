const merge = require('lodash/merge');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const customPlugin = require('./index');

expect.extend({
  toMatchCss: cssMatcher,
});

function generatePluginCss(overrides) {
  const config = {
    theme: {
      // Default options for your plugin.
      tmk: {
        YOUR_PLUGIN_CUSTOM_OPTION: false,
      },
    },
    variants: {
      // Default variants for your plugin.
      tmk: [],
    },
    corePlugins: false,
    plugins: [customPlugin],
  };

  return postcss(tailwindcss(merge(config, overrides)))
    .process('@tailwind utilities', {
      from: undefined,
    })
    .then(({ css }) => css);
}

test('utility classes can be generated', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(``);
  });
});
//
// test('options can be customized', () => {
//   return generatePluginCss({
//     theme: {
//       tmk: {
//         YOUR_PLUGIN_CUSTOM_OPTION: true,
//       },
//     },
//   }).then(css => {
//     expect(css).toMatchCss(``);
//   });
// });
//
// test('variants can be customized', () => {
//   return generatePluginCss({
//     theme: {
//       screens: {
//         sm: '640px',
//       },
//     },
//     variants: {
//       tmk: ['responsive', 'hover'],
//     },
//   }).then(css => {
//     expect(css).toMatchCss(``);
//   });
// });

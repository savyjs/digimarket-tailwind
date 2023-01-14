const plugin = require('tailwindcss/plugin');
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const postcssImport = require('postcss-import');
const postcssTailwincss = require('tailwindcss');
const postcssTailwincssNesting = require('tailwindcss/nesting');
// eslint-disable-next-line no-unused-vars
const postcss = require('postcss');
const postcssJs = require('postcss-js');
const fs = require('fs');
// eslint-disable-next-line no-unused-vars

module.exports = plugin(
  async function ({ addUtilities, addComponents, theme, variants }) {
    const css = fs.readFileSync(__dirname + '/src/all.css', 'binary');
    const root = postcss.parse(css);
    const cssFinal = await postcss([
      autoprefixer,
      postcssNested,
      postcssImport({
        root: __dirname + '/src',
      }),
      postcssTailwincss(require('./src/tailwind.config')),
      postcssTailwincssNesting,
    ]).process(root, {
      from: 'src/all.css',
      tp: 'dist/all.css',
    });
    const cssJs = postcssJs.objectify(root);

    await fs.writeFileSync(__dirname + '/dist/all.css', cssFinal.css.toString(), 'binary');
    if (cssFinal.map) {
      fs.writeFile(
        __dirname + '/dist/all.css.map',
        cssFinal.map.toString(),
        () => true
      );
    }
    console.log({});

    addComponents(cssJs);
    // If your plugin requires user config,
    // you can access these options here.
    // Docs: https://tailwindcss.com/docs/plugins#exposing-options
    const options = theme('tmk');

    // Add CSS-in-JS syntax to create utility classes.
    // Docs: https://tailwindcss.com/docs/plugins#adding-utilities
    const utilities = {
      '.example-utility-class': {
        display: 'block',
      },
    };
    addUtilities(cssJs);

    // Conditionally add utility class based on user configuration.
    if (options.YOUR_PLUGIN_CUSTOM_OPTION) {
      utilities['.custom-utility-class'] = {
        'background-color': 'red',
      };
    }

    addUtilities(utilities, {
      variants: variants('tmk'),
    });
  },
  {
    theme: {
      // Default options for your custom plugin.
      // Docs: https://tailwindcss.com/docs/plugins#exposing-options
      tmk: {
        YOUR_PLUGIN_CUSTOM_OPTION: false,
      },
    },
    variants: {
      // Default variants for your custom plugin.
      // Docs: https://tailwindcss.com/docs/plugins#variants
      tmk: ['responsive'],
    },
  }
);

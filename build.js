const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const postcssImport = require('postcss-import');
const postcssTailwincss = require('tailwindcss');
const postcssTailwincssNesting = require('tailwindcss/nesting');
const postcssGlobe = require('postcss-import-ext-glob');
const postcssWatch = require('postcss-watch-folder');
const postcss = require('postcss')([
  autoprefixer,
  postcssNested({}),
  postcssGlobe({}),
  postcssImport({
    root: __dirname + '/src',
  }),
  postcssTailwincss(require('./src/tailwind.config')),
  postcssTailwincssNesting,
]);
const postcssJs = require('postcss-js');
const fs = require('fs');

const css = fs.readFileSync(__dirname + '/src/all.css', 'binary');

postcss
  .process(css, {
    from: 'src/all.css',
    to: 'dist/all.css',
  })
  .then(result => {
    const cssJs = postcssJs.objectify(result.root);
    fs.writeFileSync('./dist/components.json', JSON.stringify(cssJs, null, 2));
    fs.writeFileSync('./dist/components.css', result.toString());
    console.info('built successfully!');
  });

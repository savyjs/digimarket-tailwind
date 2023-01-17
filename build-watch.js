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

function reBuild() {
  postcss
    .process(css, {
      from: 'src/all.css',
      to: 'dist/all.css',
    })
    .then(result => {
      const cssJs = postcssJs.objectify(result.root);
      fs.writeFileSync(
        './dist/components.json',
        JSON.stringify(cssJs, null, 2)
      );
      fs.writeFileSync('./dist/components.css', root.toString());

      console.info('built successfully!');
    });
}

const chokidar = require('chokidar');

const watcher = chokidar.watch(__dirname + '/src', {
  ignored: __dirname + '/src/all.css', // ignore dotfiles
  persistent: true,
});
reBuild();
const log = console.log.bind(console);
// Add event listeners.
watcher
  .on('change', path => {
    log(`File ${path} has been changed`);
    reBuild();
  })
  .on('unlink', path => {
    log(`File ${path} has been removed`);
    reBuild();
  });

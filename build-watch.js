const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const postcssImport = require('postcss-import');
const postcssTailwincss = require('tailwindcss');
const postCssConfig = require('./postcss.config');
const tailwindcssConfig = require('./tailwind.config');
const postcssTailwincssNesting = require('tailwindcss/nesting');
const postcssGlobe = require('postcss-import-ext-glob');
const postcssWatch = require('postcss-watch-folder');
const cssnano = require('cssnano');
const postcssPartialImport = require('postcss-partial-import');
var debug = require('postcss-debug').createDebugger();

const postcss = require('postcss');

const postcssJs = require('postcss-js');
const fs = require('fs');

async function reBuild() {
  const css = fs.readFileSync(__dirname + '/src/all.css', 'binary');

  postcss(
    postcssNested(),
    autoprefixer({}),
    postcssGlobe({}),
    postcssImport({}),
    cssnano()
  )
    .process(css, {
      from: 'src/all.css',
      to: 'dist/all.css',
    })
    .then(async result => {
      // write imported files without config
      // fs.writeFileSync('./dist/tw.css', result.css);

      // write json
      const cssJs = postcssJs.objectify(result.root);
      fs.writeFileSync('./dist/plugin.json', JSON.stringify(cssJs, null, 2));

      // process with tailwindcss config
      let translatedCss;
      try {
        translatedCss = await postcss(
          debug([
            autoprefixer,
            postcssTailwincss(require('./tailwind.config')),
            postcssTailwincssNesting({}),
            cssnano(),
          ])
        )
          .process(result)
          .then(translatedCss => {
            // write css
            fs.writeFileSync('./dist/all.css', translatedCss.css);

            console.info('built successfully!');
          })
          .finally(res => {
            // debug.inspect();
          });
      } catch (err) {
        console.error({ err });
      }
    })
    .catch(err => {
      console.error({ err });
    });
}

const chokidar = require('chokidar');
const { LazyResult } = require('postcss');

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

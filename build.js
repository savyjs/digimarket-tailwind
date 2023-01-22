const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const postcssImport = require('postcss-import');
const postcssTailwincss = require('tailwindcss');
const postcssTailwincssNesting = require('tailwindcss/nesting');
const postcssGlobe = require('postcss-import-ext-glob');
const cssnano = require('cssnano');
const postcss = require('postcss');
const postcssJs = require('postcss-js');
const fs = require('fs');
const tailwindcssConfig = require('./tailwind.config');

async function build() {
  const css = fs.readFileSync(__dirname + '/src/all.css', 'binary');
  try {
    let result = await postcss([
      autoprefixer({}),
      postcssGlobe({}),
      postcssImport({}),
      postcssNested(),
    ]).process(css, {
      from: 'src/all.css',
      to: 'dist/all.css',
    });

    result = await result.processor.use(postcssImport({})).process(result);
    result = await result.processor
      .use(postcssTailwincss(tailwindcssConfig))
      .process(result);
    result = await result.processor
      .use(postcssTailwincssNesting)
      .process(result);
    result = await result.processor.use(cssnano()).process(result);

    // write json
    const cssJs = postcssJs.objectify(result.root);
    fs.writeFileSync('./dist/plugin.json', JSON.stringify(cssJs, null, 2));

    // write css
    fs.writeFileSync('./dist/all.css', result.css);
    console.info('built successfully!');
  } catch (err) {
    console.error({ err });
    console.warn("can't build :(");
  }
}

build();
module.exports = build;

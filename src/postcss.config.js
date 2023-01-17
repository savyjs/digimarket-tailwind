module.exports = {
  plugins: {
    'postcss-import-ext-glob': {},
    'postcss-import': {},
    autoprefixer: {},
    'postcss-nested': {},
    tailwindcss: require('./tailwind.config'),
    'tailwindcss/nesting': {},
  },
};

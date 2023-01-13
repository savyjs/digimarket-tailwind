module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    tailwindcss: require('./tailwind.config'),
    'tailwindcss/nesting': {},
    autoprefixer: {},
  },
};

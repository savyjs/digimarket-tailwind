module.exports = {
  plugins: {
    'postcss-import': {},
    autoprefixer: {},
    'postcss-nested': {},
    tailwindcss: require('./tailwind.config'),
    'tailwindcss/nesting': {},
  },
};

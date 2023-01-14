const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    __dirname + '/components/**/*.{scss,css,vue,jsx,html}',
    __dirname + '/general/*.{scss,css,vue,jsx,html}',
  ],
  theme: {
    extend: {
      darkMode: true,
      colors: {
        transparent: 'transparent',
        primary: '#EF4056',
        secondary: '#008eb2',
        error: '#f44336',
        success: '#4caf50',
        alert: '#ff9800',
        dark: '#212121',
        'dark-primary': '#131212',
        'dark-accent': '#343232',
        'light-accent': '#CCC',
        light: '#EEE',
        gray: colors.gray,
        blue: colors.sky,
        red: colors.rose,
        pink: colors.fuchsia,
      },
      fontFamily: {
        sans: ['IRANSans'],
      },
    },
  },
};

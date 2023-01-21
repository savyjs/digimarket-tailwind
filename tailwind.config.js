module.exports = {
  content: [
    'src/components/**/*.{scss,css,vue,jsx,html}',
    'src/general/*.{scss,css,vue,jsx,html}',
  ],
  theme: {
    extend: {
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
      },
    },
  },
};

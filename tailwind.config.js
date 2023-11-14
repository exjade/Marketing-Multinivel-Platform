// text-red-primary -> hex values
// text-gray-base -> hex values
// border-gray-primary -> hex values
// text-blue-primary -> hex values


module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  fill: (theme) => ({
    'red': theme('colors.red.500'),
  }),
  content: [
    './src/**/*.{html, js, ts, vue}',
    './src/**/*'
  ],
  theme: {
    colors: {
      white: {
        background: "#FAF6F0"
      },
      black: {
        primary: '#000000',       
      },
      gray: {
        primary: '#9F9F9F',        
      },
      brown: {
        primary: '#776A49',
      },
      red: {
        warning: '#fd2525e3',
      },
      blue: {
        primary: '#1B74BA',
      },
      green: {
        primary: '#00473e',
      },
      orange: {
        primary: '#E27220',
      },
      yellow: {
        primary: '#E9A000',
      },
    },
    // FONTS
    fontFamily: {
      'lato-300': ['Lato', 'sans-serif;'],
      'lato-100': ['Lato', 'sans-serif;'],
      'lato-bold-700': ['Lato', 'sans-serif;'],
    }
  },
  variants: {
    extend: {
      display: ['group-hover', 'dropdown'],
    }
  },
  plugins: [require('tailwindcss-dropdown')]

};


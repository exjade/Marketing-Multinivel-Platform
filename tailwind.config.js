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
        primary: '#e3e3e3',
        normal: '#ffffff',
        placeholder: '#e3e3e3',
        login_button: '#CFCFCF',
        referralList: '#F0EFF5',

      },
      black: {
        normal: '#000000',
        background: '#181818',
        border: '#ffffff0f',
        login_button: '#434343',
        btnicon: '#313131',
        referralList: '#27282F',
        default: '#101010',
        textBg: '#121717',
        balanceCard: '#222224',
        backg: "#0D0D0D",
        breadcrums: "#222223"
      },
      gray: {
        background: '#9F9F9F',
        primary: '#9D9DAA',
        button: '#696969',
        info: '#6A757A',
        border: '#72757e',
        loader: '#707070',
        withdrawal: '#e3e3e3',
        login_input_bg: '#171717',
        landing_download: '#111827',
        landing_feature: '#E9EAF8',
        cancel: '#6A757A',
        input: '#8080802e',
        branding: '#CFCFCF',
        adminParagraph: '#374151',
        apr: '#7D8891',
        textLoader: '#56555e52',
      },
      brown: {
        button: '#776A49',
      },
      red: {
        warning: '#fd2525e3',
        logo: '#FE2E5F',
        card: '#FF4336',
        parrafo: '#F57374',

      },
      blue: {
        primary: '#1B74BA',
        emblema: '#003BB6',
        platino: '#677478',
        logo: '#00C9DB',
        placeholder: '#A6C9F2',
        landingBackground: '#050915',
        teal: '#01A99E',
        feedback: "#0D4262",
        auth: "#202124",
        input: "#12297D"

      },
      green: {
        button: '#00473e',
        success: '#22ca4c',
        card: '#DFF9E1',
        parrafo: '#16481B',
        radored: '#26A27C',
        header: '#16481B',
        landingButton: '#99E39E',
        amount: '#168E83',
        graph: "#5A5F3C"
      },
      orange: {
        leftCard: '#E27220',
        rightCard: '#E858C8',
      },
      badges: {
        diamond: '#3FA4B4',
        platinum: '#677478',
        gold: '#FE8200',
        admin: '#8D1717',
        model: '#6469E3',
      },
      button: {
        primary: 'rgb(71, 7, 234)',
        secondary: '#661FFF',
      },
      yellow: {
        pending: '#E9A000',
      },
      orange: {
        status: '#D36800',
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


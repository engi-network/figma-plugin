// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  content: [path.join(__dirname, './src/**/*.(js|jsx|ts|tsx)')],
  theme: {
    extend: {
      backgroundImage: {
        landing: "url('/src/app/assets/images/landing.svg')",
      },
      colors: {
        primary: {
          white: '#FFFFFF',
          dark: '#070706',
          green: '#65FEB7',
          blue: '#18A0FB',
        },
        secondary: {
          bg: '#232323',
          error: '#F65151',
        },
        wf: {
          bg: '#F3F5F9',
          light: '#EDEFF3',
          primary: '#40444E',
          secondary: '#B3B3B3',
          tertiary: '#AEB5C7',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#C7C7C7',
        },
      },
      borderRadius: {
        'st-small': 8,
        'st-default': 10,
      },
    },
  },
  plugins: [],
  variants: {
    extend: {},
  },
}

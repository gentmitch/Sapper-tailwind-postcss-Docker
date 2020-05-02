module.exports = {
  theme: {
    extend: {
      colors:{
        blue: '#26547c',
        red:'#ef476f',
        yellow: '#ffd166',
        green: '#06d6a0',
        white: '#fffcf9'
      }
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px'
    }
  },
  variants: {},
  plugins: [ 
    require('tailwindcss')('./tailwind.config.js')
  ],
}

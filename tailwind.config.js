const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.emerald
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.69s ease-out'
      }
    },
  },
  plugins: [],
}

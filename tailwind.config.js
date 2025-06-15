/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "inter",
        roboto: "roboto"
      },

      keyframes: {

        text: {
          '0%, 100%': {
            'background-size':'200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size':'200% 200%',
            'background-position': 'right center'
          }
      },
      },
      animation: {
        text: 'text 5s ease infinite',
      },
      colors: {
        background: "#303030",
        main: "#353535"
      },
      rotate: {
        'back-12': '-12deg'
      }
    },
  },
  plugins: [],
}


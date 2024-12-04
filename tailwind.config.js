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
        blob: {
          "0%": {
            transform: "scale(1) translate(-10%, -50%)"
          },
          "33%": {
            transform: " scale(1.1) translate(-10%, -50%)"
          },
          "66%": {
            transform: "scale(0.9) translate(-10%, -50%)"
          },
          "100%": {
            transform: "scale(1) translate(-10%, -50%)"
          }
        },
      },
      animation: {
        blob:  "blob 15s infinite",
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


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
      colors: {
        background: "#303030",
        main: "#353535"
      }
    },
  },
  plugins: [],
}


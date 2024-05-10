/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        poppins_thin: ["Poppins-Thin", "sans-serif"],
        poppins_extralight: ["Poppins-ExtraLight", "sans-serif"],
        poppins_light: ["Poppins-Light", "sans-serif"],
        poppins_regular: ["Poppins-Regular", "sans-serif"],
        poppins_medium: ["Poppins-Medium", "sans-serif"],
        poppins_semibold: ["Poppins-SemiBold", "sans-serif"],
        poppins_bold: ["Poppins-Bold", "sans-serif"],
        poppins_extrabold: ["Poppins-ExtraBold", "sans-serif"],
        poppins_black: ["Poppins-Black", "sans-serif"],
      }
    },
  },
  plugins: [],
}


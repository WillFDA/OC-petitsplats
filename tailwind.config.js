/** @type {import('tailwindcss').Config} */
export default {
  content: ["**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ["Manrope", "sans-serif"],
      serif: ["Anton", "serif"],
    },
    extend: {
      colors: {
        "primary": "#FFD15B",
        "secondary": "#EDEDED",
        "dark": "#1B1B1B",
      },
    },
  },
  plugins: [],
};
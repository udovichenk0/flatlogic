/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': 'Montserrat'
      }
    },
    colors: {
      "brown": "#bd744c",
      "gray": "#555555",
      "base-dark": "#262626"
    },
  },
  plugins: [],
}
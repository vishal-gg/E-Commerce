/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '1300': '1300px',
        '1180': '1180px',
        '378' : '378px',
      }
    },
  },
  plugins: [],
}
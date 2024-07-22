/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      opacity: {
        '0': '0',
      }
    },
  },
  plugins: [],
}


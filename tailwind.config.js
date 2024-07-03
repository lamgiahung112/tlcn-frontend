/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      animation: {
        'spin-cubic': 'spin 1s cubic-bezier(0.25, 0.1, 0.25, 1) infinite'
      },
      height: {
        'header-height': "60px",
      },
      margin: {
        'header-height': "60px",
      }
    },
  },
  plugins: [],
}


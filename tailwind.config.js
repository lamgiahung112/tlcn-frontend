/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scrollDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'spin-cubic': 'spin 1s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
        'scroll-down': 'scrollDown 0.15s linear forwards',
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


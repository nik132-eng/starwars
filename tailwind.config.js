/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#243c5a',
        secondary: {
          100: '#243c5a',
        }
      },
      animation: {
        crawl: 'crawl 60s linear forwards',
      },
      keyframes: {
        crawl: {
          '0%': { top: '100%', transform: 'rotateX(20deg)' },
          '100%': { top: '-6000px', transform: 'rotateX(25deg)' },
        },
      },
    },
  },
  plugins: [],
}
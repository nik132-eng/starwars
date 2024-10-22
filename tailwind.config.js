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
        "meteor-effect": "meteor 5s linear infinite",
      },
      keyframes: {
        crawl: {
          '0%': { top: '100%', transform: 'rotateX(20deg)' },
          '100%': { top: '-6000px', transform: 'rotateX(25deg)' },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
}
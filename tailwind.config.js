/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rubik-red': '#ef4444',
        'rubik-blue': '#3b82f6',
        'rubik-orange': '#f97316',
        'rubik-green': '#22c55e',
        'rubik-yellow': '#eab308',
      },
    },
  },
  plugins: [],
}
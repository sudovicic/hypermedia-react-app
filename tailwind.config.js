/** @type {import('tailwindcss').Config} */

const { columns, spacing } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'resource-cards-vertical': `repeat(auto-fit, minmax(${spacing["48"]}, 1fr))`,
        'resource-cards-horizontal': `repeat(auto-fit, minmax(${columns.lg}, 1fr))`
      }
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/line-clamp')
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
}

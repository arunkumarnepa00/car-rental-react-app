/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx,html}",],
  theme: {
    extend: {
    
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require('@tailwindcss/forms'),require("daisyui"),],
}


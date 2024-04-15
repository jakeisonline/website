/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin"
import tailwindanimate from "tailwindcss-animate"


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindanimate,
    plugin(function({ addBase }) {
      addBase({
        "html": { fontSize: "22px" },
      })
    }),
  ],
}


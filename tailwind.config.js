// tailwind.config.js
module.exports = {
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          350: "#bbb",
          450: "#9b9b9b",
          550: "#4a4a4a",
        },
        teal: {
          650: "#00cba5",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
}

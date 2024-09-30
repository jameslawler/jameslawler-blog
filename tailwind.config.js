/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./{content,_includes}/**/*.{njk,md,svg}",
    "./{content,_includes}/**/*.svg",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
    },
    extend: {
      container: {
        padding: "1rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "gold-0": "#c7c1b4",
      "gold-1": "#ece8df",
      "gold-2": "#5e5b55",
      "gold-3": "#504e49",
      "gold-4": "#38352e",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito-sans)", ...fontFamily.sans],
        serif: ["var(--font-crimson-pro)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

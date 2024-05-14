/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        'offwhite':'#FAF9F6'
      },
      fontFamily: {
        myfont: ["Oxanium","sans-serif"],
      },
    },

  },
  plugins: [],
});

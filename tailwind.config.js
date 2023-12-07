/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.handlebars'],
  theme: {
    screens: {
      'xsm': "35px",
      'sm': '640px',
      'md':'768px',
      'lg': '1024px',
      'xl': '1280px',
      'nav1': '1166px'
    },
    extend: {},
  },
  plugins: [],
}

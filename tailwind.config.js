/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        highlight: '#B5FF81',
      },
      fontFamily: {
        eina: ['Eina03', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
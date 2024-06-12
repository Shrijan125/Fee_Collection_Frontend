/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': 'rgba(63, 114, 175, 1)',
        'light':'#F9F7F7',
        'appBar':'#112D4E',
        'inactive':'#DBE2EF'
      },
    },
  },
  plugins: [],
}


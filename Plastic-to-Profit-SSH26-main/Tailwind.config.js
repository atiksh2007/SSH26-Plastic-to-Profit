/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'olive': {
          50: '#f6f7f4',
          100: '#e8ebe3',
          200: '#d1d7c8',
          300: '#b3bda5',
          400: '#93a180',
          500: '#7a8b64',
          600: '#556B2F',
          700: '#4a5b29',
          800: '#3f4d24',
          900: '#35401f',
        },
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
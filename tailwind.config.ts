/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: { 'cipher-gold': '#C5A572', 'cipher-dark': '#1a1a1a', 'cipher-gray': '#2a2a2a' },
      fontFamily: { 'mono': ['Monaco', 'Menlo', 'Ubuntu Mono', 'monospace'] }
    }
  },
  plugins: []
};

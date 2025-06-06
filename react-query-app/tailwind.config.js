/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    // Gradient classes for metric cards
    'from-blue-600',
    'to-blue-800',
    'from-purple-600',
    'to-purple-800',
    'from-green-600',
    'to-green-800',
    'from-red-600',
    'to-red-800',
    'from-orange-600',
    'to-orange-800',
    'from-indigo-600',
    'to-indigo-800',
    'bg-gradient-to-r',
    'bg-clip-text',
    'text-transparent'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} 
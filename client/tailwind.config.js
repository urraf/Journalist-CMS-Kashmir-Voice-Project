/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        editorial: {
          white: '#FAF8F5',
          cream: '#F0ECE4',
          charcoal: '#1A1A1A',
          dark: '#2D2D2D',
          medium: '#6B6B6B',
          light: '#9A9A9A',
          border: '#E8E4DD',
          accent: '#C9A84C',
          'accent-hover': '#B8963F',
          'dark-bg': '#0D0D0D',
          'dark-surface': '#1A1816',
          'dark-border': '#2A2724',
          'dark-text': '#E8E4DD',
        },
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        optima: ['Optima', 'serif'],
      },
    },
  },
  plugins: [
    flowbitePlugin,
    tailwindScrollbar,
  ],
};

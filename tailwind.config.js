/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf6fb',
          100: '#fae8f6',
          200: '#f3cced',
          300: '#e7a8de',
          400: '#d783cc',
          500: '#c164b8',
          600: '#a34b9c',
          700: '#833a7d',
          800: '#672f63',
          900: '#4f2650',
        },
        lilac: {
          50: '#f7f5fc',
          100: '#ece6f7',
          200: '#dccdef',
          300: '#c3a9e2',
          400: '#a880d1',
          500: '#8f60bd',
          600: '#77489f',
          700: '#5f3980',
          800: '#4c2e67',
          900: '#3c2551',
        },
        gold: {
          50: '#fdf9ef',
          100: '#faf0d2',
          200: '#f2dd9f',
          300: '#e8c46a',
          400: '#dcab43',
          500: '#c8912f',
        },
        ink: '#332538',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.8s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

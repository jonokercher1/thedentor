/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          primary: {
            light: '#83D4F1',
            DEFAULT: '#60D1FA',
            dark: '#38B7E5',
          },
          secondary: {
            light: '#ACB8FF',
            DEFAULT: '#8494F8',
            dark: '#6C7FF5',
          },
        },
        state: {
          success: '#6FAD67'
        },
        neutral: {
          100: '#FFFFFF',
          300: '#CBCFD5',
          500: '#41546E',
          700: '#162D4C',
          900: '#091728'
        }
      }
    },
  },
  plugins: [],
}

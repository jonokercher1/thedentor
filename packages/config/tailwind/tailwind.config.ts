import { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}',
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
            light: '#96A4FA',
            DEFAULT: '#8494F8',
            dark: '#6C7FF5',
          },
        },
        state: {
          success: '#59AF5E',
          warning: '#FCEFD4',
          error: '#F8D3D2'
        },
        neutral: {
          100: '#FFFFFF',
          200: '#F7F9FC',
          300: '#CBCFD5',
          500: '#41546E',
          600: '#3D4D63',
          650: '#0D2E4E',
          700: '#162D4C',
          800: '#11243E',
          900: '#091728'
        }
      },
      fontFamily: {
        body: 'var(--body-font)',
      },
      transitionProperty: {
        'width': 'width',
      }
    },
  },
  plugins: [],
}

export default config
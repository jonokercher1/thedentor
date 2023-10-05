import { Config } from 'tailwindcss'
import sharedConfig from '@dentor/config/tailwind/tailwind.config'

const config: Pick<Config, 'presets' | 'content'> = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [sharedConfig]
};

export default config
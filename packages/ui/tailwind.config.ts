import { Config } from 'tailwindcss'
import sharedConfig from '@dentor/config/tailwind/tailwind.config'

const config: Pick<Config, 'prefix' | 'presets' | 'content'> = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  prefix: 'dentor-ui',
  presets: [sharedConfig]
};

export default config
import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#005BAC',
        secondary: '#0D9488',
        accent: '#F59E0B',
        muted: '#F8FAFC',
        danger: '#DC2626',
      },
    },
  },
  plugins: [],
} satisfies Config;

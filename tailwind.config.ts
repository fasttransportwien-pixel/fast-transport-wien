import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette – inspired by the FTW logo (deep green accent on white/dark grey)
        brand: {
          50: '#effaf3',
          100: '#d8f2e0',
          200: '#b3e4c3',
          300: '#80cf9d',
          400: '#4cb375',
          500: '#22a05a', // primary green
          600: '#168047',
          700: '#11653a',
          800: '#0e5030',
          900: '#0b3f27',
        },
        ink: {
          50: '#f7f8f9',
          100: '#eceef1',
          200: '#d5d9df',
          300: '#b1b8c2',
          400: '#7c8694',
          500: '#5a6473',
          600: '#434b58',
          700: '#363c47',
          800: '#1f242c', // primary dark
          900: '#12161c',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(15, 23, 42, 0.06), 0 2px 6px -2px rgba(15, 23, 42, 0.04)',
        ring: '0 0 0 6px rgba(34, 160, 90, 0.15)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at 1px 1px, rgba(34,160,90,0.15) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};

export default config;

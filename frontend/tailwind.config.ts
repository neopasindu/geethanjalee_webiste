import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#0A0A0A',
        cardBg: '#111108',
        cardBorder: '#2D2A18',
        accent: {
          DEFAULT: '#D4A017',
          hover: '#B8860B',
          glow: 'rgba(212, 160, 23, 0.40)',
        },
        gold: {
          DEFAULT: '#F5C842',
          dark: '#D4A017',
          light: '#FFE066',
          glow: 'rgba(245, 200, 66, 0.35)',
        },
        muted: '#A09060',
      },
      fontFamily: {
        display: ['var(--font-krona)', 'system-ui', 'sans-serif'],
        prompt: ['var(--font-prompt)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        marquee: 'marquee 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#07090e',
        foreground: '#e6edf3',
        surface: {
          50: '#151b27',
          100: '#10141e',
          200: '#0c0e16',
          300: '#080a0f',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-active': 'rgba(16, 185, 129, 0.35)',
        },
        primary: {
          DEFAULT: '#10b981',
          foreground: '#04100c',
          hover: '#059669',
          glow: 'rgba(16, 185, 129, 0.25)',
        },
        cyanAccent: {
          DEFAULT: '#06b6d4',
          glow: 'rgba(6, 182, 212, 0.25)',
        },
        muted: {
          DEFAULT: '#1a202c',
          foreground: '#8b949e',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'pulse-slow': 'pulseSlow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      },
    },
  },
  plugins: [],
};

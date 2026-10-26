/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
        page: 'rgb(var(--bg-page-rgb) / <alpha-value>)',
        card: 'rgb(var(--bg-card-rgb) / <alpha-value>)',
        cardSubtle: 'rgb(var(--bg-card-subtle-rgb) / <alpha-value>)',
        textMain: 'rgb(var(--text-main-rgb) / <alpha-value>)',
        textMuted: 'rgb(var(--text-muted-rgb) / <alpha-value>)',
        borderSubtle: 'rgb(var(--border-subtle-rgb) / <alpha-value>)',
        borderHover: 'rgb(var(--border-hover-rgb) / <alpha-value>)',
        sage: {
          DEFAULT: 'rgb(var(--accent-sage-rgb) / <alpha-value>)',
          light: 'rgb(var(--accent-sage-light-rgb) / <alpha-value>)',
          hover: 'rgb(var(--accent-sage-hover-rgb) / <alpha-value>)',
          soft: 'var(--accent-sage-soft)',
        },
        terracotta: {
          DEFAULT: '#C97B63',
          hover: '#B86B54',
          darkHover: '#D6876E',
          soft: 'var(--accent-terracotta-soft)',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      maxWidth: {
        content: '1100px',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(26, 68, 102, 0.06)',
        'soft-dark': '0 4px 24px -2px rgba(0, 0, 0, 0.35)',
        'glow-sage': '0 0 24px -4px rgba(42, 126, 168, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

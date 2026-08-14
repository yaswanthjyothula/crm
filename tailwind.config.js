/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#F8FAFC', // Crisp Light Surface
          900: '#FFFFFF', // Pure White Base
          850: '#FFFFFF', // Subscription Card Pure White
          800: '#F8FAFC', // Light Card Surface
          700: '#E2E8F0',
          600: '#CBD5E1',
        },
        brand: {
          500: '#0F172A', // #0F172A Obsidian Slate Primary
          400: '#1E293B',
          600: '#0F172A',
          700: '#020617',
          glow: 'rgba(15, 23, 42, 0.15)',
        },
        emerald: {
          500: '#059669', // Active / Success
          400: '#10B981',
          600: '#047857',
        },
        amber: {
          500: '#D97706', // Retention Due / Warning
          400: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['"SF Compact Text"', '"SF Compact Display"', '"SF Compact"', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', 'system-ui', 'sans-serif'],
        display: ['"SF Compact Display"', '"SF Compact Text"', '"SF Compact"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        logo: ['"Arsenica"', '"Bodoni Moda"', '"Cinzel Decorative"', '"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        arsenica: ['"Arsenica"', '"Bodoni Moda"', '"Cinzel Decorative"', '"Playfair Display"', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
        tighter: '-0.02em',
      },
      boxShadow: {
        'glass': '0 10px 30px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        'glass-hover': '0 20px 40px 0 rgba(79, 70, 229, 0.12)',
        'indigo-glow': '0 0 50px -10px rgba(79, 70, 229, 0.2)',
        'emerald-glow': '0 0 40px -10px rgba(5, 150, 105, 0.2)',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.02)' },
        },
        'scan-beam': {
          '0%': { top: '0%' },
          '50%': { top: '95%' },
          '100%': { top: '0%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
        'scan-beam': 'scan-beam 2.5s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

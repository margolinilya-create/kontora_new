import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        yellow: {
          DEFAULT: 'var(--color-yellow)',
          ink: 'var(--color-yellow-ink)',
        },
        violet: {
          DEFAULT: 'var(--color-violet)',
          ink: 'var(--color-violet-ink)',
        },
        red: {
          DEFAULT: 'var(--color-red)',
        },
        blue: {
          DEFAULT: 'var(--color-blue)',
        },
        dark: {
          DEFAULT: 'var(--color-dark)',
          2: 'var(--color-dark-2)',
          3: 'var(--color-dark-3)',
        },
        line: 'var(--color-line)',
        cream: 'var(--color-cream)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 5vw + 1rem, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4vw + 0.5rem, 4rem)', { lineHeight: '1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.5rem, 3vw + 0.25rem, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.25rem, 2vw + 0.25rem, 1.75rem)', { lineHeight: '1.1' }],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        'sticker-sm': 'var(--shadow-sticker-sm)',
        'sticker': 'var(--shadow-sticker-md)',
        'sticker-lg': 'var(--shadow-sticker-lg)',
        'sticker-yellow': '6px 6px 0 0 var(--color-yellow)',
        'sticker-violet': '6px 6px 0 0 var(--color-violet)',
      },
      transitionDuration: {
        fast: 'var(--dur-fast)',
        DEFAULT: 'var(--dur)',
        slow: 'var(--dur-slow)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
      },
      backgroundImage: {
        'noise': "url('/brand/noise.svg')",
      },
    },
  },
  plugins: [],
}

export default config

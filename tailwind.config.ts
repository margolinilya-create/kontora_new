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
        // surfaces
        bg: {
          base: 'var(--bg-base)',
          surface: 'var(--bg-surface)',
          'surface-2': 'var(--bg-surface-2)',
          'surface-3': 'var(--bg-surface-3)',
          cream: 'var(--bg-cream)',
          'cream-2': 'var(--bg-cream-2)',
        },
        line: {
          DEFAULT: 'var(--line)',
          strong: 'var(--line-strong)',
          ink: 'var(--line-ink)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          soft: 'var(--ink-soft)',
          muted: 'var(--ink-muted)',
        },
        cream: {
          DEFAULT: 'var(--cream)',
          soft: 'var(--cream-soft)',
          muted: 'var(--cream-muted)',
        },
        // accents
        yellow: {
          DEFAULT: 'var(--accent-yellow)',
          ink: 'var(--accent-yellow-ink)',
          soft: 'var(--accent-yellow-soft)',
        },
        peach: {
          DEFAULT: 'var(--accent-peach)',
          ink: 'var(--accent-peach-ink)',
        },
        pink: {
          DEFAULT: 'var(--accent-pink)',
          ink: 'var(--accent-pink-ink)',
        },
        violet: {
          DEFAULT: 'var(--accent-violet)',
          ink: 'var(--accent-violet-ink)',
        },
        blue: {
          DEFAULT: 'var(--accent-blue)',
          soft: 'var(--accent-blue-soft)',
          ink: 'var(--accent-blue-ink)',
        },
        red: {
          DEFAULT: 'var(--accent-red)',
          ink: 'var(--accent-red-ink)',
        },
        green: {
          DEFAULT: 'var(--accent-green)',
        },
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        // moderate max 48px (не brutal 88px)
        'display-xl': ['clamp(2rem, 3.6vw + 1rem, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(1.75rem, 2.8vw + 0.75rem, 2.75rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.5rem, 1.8vw + 0.75rem, 2rem)', { lineHeight: '1.1' }],
        'display-sm': ['clamp(1.25rem, 1.2vw + 0.5rem, 1.5rem)', { lineHeight: '1.15' }],
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        ring: 'var(--shadow-ring)',
        'ring-strong': 'var(--shadow-ring-strong)',
        'ring-ink': 'var(--shadow-ring-ink)',
        'soft-sm': 'var(--shadow-soft-sm)',
        soft: 'var(--shadow-soft)',
        'soft-lg': 'var(--shadow-soft-lg)',
        'glow-yellow': 'var(--shadow-glow-yellow)',
        'glow-peach': 'var(--shadow-glow-peach)',
        'glow-pink': 'var(--shadow-glow-pink)',
        'glow-violet': 'var(--shadow-glow-violet)',
      },
      transitionDuration: {
        fast: 'var(--dur-fast)',
        DEFAULT: 'var(--dur)',
        slow: 'var(--dur-slow)',
        ambient: 'var(--dur-ambient)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        spring: 'var(--ease-spring)',
      },
      backgroundImage: {
        noise: "url('/brand/noise.svg')",
      },
    },
  },
  plugins: [],
}

export default config

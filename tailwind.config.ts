import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Official brand palette
        yellow:  '#FFD047',
        red:     '#FF4848',
        blue:    '#009FE3',
        dark:    '#282828',
        // Neutrals
        n: {
          900: '#1A1A1A',
          800: '#282828',
          700: '#3A3A3A',
          600: '#4D4D4D',
          400: '#7A7A7A',
          300: '#A0A0A0',
          200: '#C8C8C8',
          100: '#E8E8E8',
          50:  '#F7F7F5',
        },
        // Semantic
        success: '#22C55E',
        warning: '#F59E0B',
        error:   '#EF4444',
        // Order status
        status: {
          new:    '#FFD047',
          design: '#9B59B6',
          print:  '#009FE3',
          cut:    '#F39C12',
          pack:   '#1ABC9C',
          ship:   '#E67E22',
          done:   '#22C55E',
          cancel: '#EF4444',
        }
      },
      fontFamily: {
        display: ['var(--font-nunito)', 'sans-serif'],
        body:    ['var(--font-onest)', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        'display':  ['56px', { lineHeight: '1.0',  letterSpacing: '-1px',   fontWeight: '900' }],
        'h1':       ['44px', { lineHeight: '1.05', letterSpacing: '-0.5px', fontWeight: '900' }],
        'h2':       ['32px', { lineHeight: '1.1',  letterSpacing: '-0.3px', fontWeight: '900' }],
        'h3':       ['22px', { lineHeight: '1.2',  fontWeight: '800' }],
        'h4':       ['16px', { lineHeight: '1.3',  fontWeight: '800' }],
        'lead':     ['18px', { lineHeight: '1.65' }],
        'body-lg':  ['16px', { lineHeight: '1.6' }],
        'body':     ['15px', { lineHeight: '1.6' }],
        'body-sm':  ['13px', { lineHeight: '1.55' }],
        'caption':  ['11px', { lineHeight: '1.5',  fontWeight: '500' }],
        'label':    ['12px', { lineHeight: '1.4',  fontWeight: '800', letterSpacing: '0.5px' }],
      },
      borderRadius: {
        'sm':   '6px',
        'md':   '10px',
        'lg':   '14px',
        'xl':   '20px',
        '2xl':  '28px',
        'full': '9999px',
      },
      boxShadow: {
        // Sticker-style offset shadows
        'sticker-sm':  '2px 2px 0 #282828',
        'sticker':     '3px 3px 0 #282828',
        'sticker-lg':  '5px 5px 0 #282828',
        'sticker-xl':  '7px 7px 0 #282828',
        'sticker-dark': '3px 3px 0 rgba(0,0,0,0.3)',
        'admin-sm':    '0 1px 3px rgba(0,0,0,0.06)',
        'admin':       '0 4px 16px rgba(0,0,0,0.08)',
        'admin-lg':    '0 10px 40px rgba(0,0,0,0.1)',
      },
      animation: {
        'float':    'float 3s ease-in-out infinite',
        'spin-slow':'spin 8s linear infinite',
        'wiggle':   'wiggle 0.3s ease-in-out',
        'bounce-in':'bounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%':      { transform: 'translateY(-8px) rotate(-2deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%':      { transform: 'rotate(1deg)' },
        },
        bounceIn: {
          '0%':   { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)',   opacity: '1' },
        }
      },
      backgroundImage: {
        'dots': "radial-gradient(circle, #28282815 1px, transparent 1px)",
        'grid': "linear-gradient(rgba(40,40,40,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(40,40,40,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        'dots': '24px 24px',
        'grid': '32px 32px',
      }
    },
  },
  plugins: [],
}
export default config

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        command: {
          bg: '#070A10',
          panel: '#0D1322',
          card: '#121B2F',
          cardHover: '#18243E',
          border: '#1F2E4D',
          borderLight: '#2D416B',
          accent: '#0EA5E9',
        },
        trust: {
          green: '#10B981',
          greenGlow: 'rgba(16, 185, 129, 0.25)',
          amber: '#F59E0B',
          amberGlow: 'rgba(245, 158, 11, 0.25)',
          red: '#EF4444',
          redGlow: 'rgba(239, 68, 68, 0.25)',
          blue: '#38BDF8',
          cyan: '#06B6D4',
          purple: '#A855F7',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scanline 4s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}

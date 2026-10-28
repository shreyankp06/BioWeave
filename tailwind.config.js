export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#17233b',
        pine:   '#263858',
        emerald:'#f06449',
        sage:   '#7183a3',
        lime:   '#f4be75',
        beige:  '#f3f5f8',
        sand:   '#e2e8f0',
        // dark mode palette
        dark: {
          bg:    '#101827',
          card:  '#182338',
          muted: '#22324b',
          border:'#32445f',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #17233b 0%, #263858 58%, #3b426b 100%)',
      },
      animation: {
        'rise':      'rise .45s ease both',
        'spin-slow': 'spin-slow 40s linear infinite',
        'float':     'float 6s ease-in-out infinite',
        'pulse-slow':'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        rise:      { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'none' } },
        'spin-slow':{ to: { transform: 'rotate(360deg)' } },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
    },
  },
  plugins: [],
}

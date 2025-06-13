/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        stencil: ['Rajdhani', 'sans-serif'],
        anton: ['Anton', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'mgsv-bg': '#0a0a0a',
        'mgsv-red': '#7a0000',
        'mgsv-red-hover': '#ff0000',
        'mgsv-card': '#1c1c1e',
        'mgsv-text': '#ccc',
        'mgsv-green': '#00ff8c',
      },
      boxShadow: {
        'mgsv-glow': '0 0 15px #ff0000',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};

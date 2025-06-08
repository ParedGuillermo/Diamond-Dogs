// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        stencil: ['Rajdhani', 'sans-serif'],
      },
      backgroundImage: {
        military: "url('/military-bg.png')",
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out both',
        'fade-in-up-delay': 'fadeInUp 1.2s ease-out both',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        idroid: {
          bg: "#0D0D0D",           // fondo base oscuro
          surface: "#2E3B2F",      // tarjetas/cajas
          border: "#3A3A3A",       // bordes y separadores
          accent: "#00FFA0",       // verde neón tipo iDROID
          accentHover: "#00CC80",  // variante hover más oscura
          textMain: "#C0C0C0",     // texto claro
          textHeading: "#00FFA0",  // títulos en verde neón
          alert: "#FF5555",        // errores, alertas
        },
      },
      fontFamily: {
        stencil: ['Rajdhani', 'sans-serif'],
      },
      backgroundImage: {
        military: "url('/military-bg.png')",
        camo: "url('/camuflaje.png')",
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out both',
        'fade-in-up-delay': 'fadeInUp 1.2s ease-out both',
        'pulse-radar': 'pulseRadar 2s infinite ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRadar: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.5)', opacity: '0.2' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        stencil: ['Rajdhani', 'sans-serif'], // Ideal para texto estilo HUD
        anton: ['Anton', 'sans-serif'],      // Perfecto para titulares
        poppins: ['Poppins', 'sans-serif'],  // Para UI moderna
      },
      colors: {
        'mgsv-bg': '#0a0a0a',              // Fondo general oscuro
        'mgsv-red': '#7a0000',             // Rojo militar
        'mgsv-red-hover': '#ff0000',       // Rojo intenso al hover
        'mgsv-card': '#1c1c1e',            // Fondo de tarjetas/paneles
        'mgsv-text': '#cccccc',            // Texto gris claro
        'mgsv-green': '#00ff8c',           // Verde de radar/sensor
        'mgsv-gold': '#c9b037',            // Dorado para destacar rangos
        'mgsv-gray': '#2c2c2c',            // Para bordes o contrastes suaves
      },
      boxShadow: {
        'mgsv-glow': '0 0 15px #ff0000',    // Glow rojo para botones/alertas
        'hud-glow': '0 0 10px #00ff8c',     // Glow verde para radar/HUD
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        radarPing: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        gridMove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100px 100px' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'radar-ping': 'radarPing 1.5s infinite',
        'grid-scroll': 'gridMove 10s linear infinite',
      },
      backgroundImage: {
        'hud-grid': "url('/images/hud-grid.svg')", // SVG de rejilla estilo HUD
        'mgsv-bg': "url('/images/bg-mgsv.jpg')",   // Imagen de fondo completa (opcional)
      },
    },
  },
  plugins: [],
};

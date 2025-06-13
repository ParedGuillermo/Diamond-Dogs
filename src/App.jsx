import React, { useEffect, useState, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
} from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { supabase } from './supabaseClient'

// Pages
import Home from './pages/Home'
import Productos from './pages/Productos'
import Contacto from './pages/Contacto'
import Nosotros from './pages/Nosotros'
import AdminProductos from './pages/AdminProductos'
import Carrito from './pages/Carrito'
import LoginRegister from './pages/LoginRegister'
import MiPerfil from './pages/Perfil'

// Componente para reproducir sonido al hacer hover
const SoundOnHover = ({ children, soundSrc = '/sounds/beep_hover.mp3', volume = 0.4 }) => {
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  return (
    <>
      <audio ref={audioRef} src={soundSrc} preload="auto" />
      <div onMouseEnter={playSound} style={{ display: 'inline-block' }}>
        {children}
      </div>
    </>
  )
}

function AppContent() {
  const location = useLocation()
  const [user, setUser] = useState(null)

  // Obtener usuario actual y escuchar cambios de sesión
  useEffect(() => {
    // Obtiene usuario al montar componente
    supabase.auth
      .getUser()
      .then(({ data: { user } }) => setUser(user))
      .catch(() => setUser(null))

    // Listener para cambios de auth
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // Sonido al cambiar ruta
  useEffect(() => {
    const beep = new Audio('/sounds/hard_Beep.mp3')
    beep.volume = 0.5
    beep.play().catch((err) => console.warn('Autoplay bloqueado:', err))
  }, [location.pathname])

  // Sonido logout
  const playLogoutSound = () => {
    const audio = new Audio('/sounds/logout_beep.mp3')
    audio.volume = 0.6
    audio.play().catch(() => {})
  }

  // Logout
  const handleLogout = async () => {
    playLogoutSound()
    await supabase.auth.signOut()
  }

  // Links base de navegación
  const baseLinks = [
    { path: '/', label: 'MOTHER BASE' },
    { path: '/productos', label: 'ARSENAL' },
    { path: '/contacto', label: 'CODECS' },
    { path: '/nosotros', label: 'MISIÓN' },
    { path: '/carrito', label: 'CARGA' },
    { path: '/perfil', label: 'MI PERFIL' },
  ]

  const adminLink = { path: '/admin', label: 'BIG BOSS' }
  const loginLink = { path: '/loginregister', label: 'INICIAR MISIÓN' }

  // Estilo inline para NavLink activo/inactivo
  const linkStyle = (isActive) => ({
    color: isActive ? '#00ff8c' : '#00ffa2',
    textDecoration: 'none',
    fontWeight: 'bold',
    borderBottom: isActive ? '2px solid #00ff8c' : 'none',
    paddingBottom: '4px',
    transition: 'color 0.3s, border 0.3s, box-shadow 0.3s',
    cursor: 'crosshair',
    boxShadow: isActive ? '0 0 8px #00ff8c' : 'none',
  })

  return (
    <div
      style={{
        backgroundColor: '#121212',
        minHeight: '100vh',
        color: '#00ffa2',
        fontFamily: "'Share Tech Mono', monospace",
        display: 'flex',
        flexDirection: 'column',
        cursor: 'crosshair',
      }}
    >
      {/* NAVBAR */}
      <header
        style={{
          padding: '1rem',
          borderBottom: '1px solid #00ffa2',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          position: 'sticky',
          top: 0,
          backgroundColor: '#121212',
          zIndex: 100,
        }}
      >
        {baseLinks.map((link) => (
          <SoundOnHover key={link.path}>
            <NavLink to={link.path} style={({ isActive }) => linkStyle(isActive)}>
              {link.label}
            </NavLink>
          </SoundOnHover>
        ))}

        {/* ADMIN (solo si logueado y admin) */}
        {user?.user_metadata?.role === 'admin' && (
          <SoundOnHover>
            <NavLink to={adminLink.path} style={({ isActive }) => linkStyle(isActive)}>
              {adminLink.label}
            </NavLink>
          </SoundOnHover>
        )}

        {/* LOGIN o LOGOUT */}
        {!user ? (
          <SoundOnHover>
            <NavLink to={loginLink.path} style={({ isActive }) => linkStyle(isActive)}>
              {loginLink.label}
            </NavLink>
          </SoundOnHover>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              color: '#00ffa2',
              fontWeight: 'bold',
              cursor: 'crosshair',
              paddingBottom: '4px',
              borderBottom: '2px solid #00ff8c',
              transition: 'color 0.3s, border 0.3s',
              boxShadow: '0 0 8px #00ff8c',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#00ff8c')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#00ffa2')}
            title="Cerrar sesión"
          >
            CERRAR SESIÓN
          </button>
        )}
      </header>

      {/* MAIN */}
      <main style={{ flex: 1, padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/admin" element={<AdminProductos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/loginregister" element={<LoginRegister />} />
          <Route path="/perfil" element={<MiPerfil />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          padding: '1rem',
          borderTop: '1px solid #00ffa2',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: '#007a56',
        }}
      >
        Diamond Dogs © 2025 - Inspirado en iDroid
      </footer>
    </div>
  )
}

export default function App() {
  useEffect(() => {
    const audio = new Audio('/sounds/idroid_on.mp3')
    audio.volume = 0.7
    audio.play().catch((err) => console.warn('Autoplay bloqueado al iniciar', err))
  }, [])

  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  )
}


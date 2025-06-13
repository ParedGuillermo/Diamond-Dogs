import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { createClient } from '@supabase/supabase-js';

// Supabase config
const supabaseUrl = 'https://ucpsmyivlobcaayxvcjc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Pages
import Home from './pages/Home';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import AdminProductos from './pages/AdminProductos';
import Carrito from './pages/Carrito';
import LoginRegister from './pages/LoginRegister';
// CORRECCIÓN: import relativo con mayúscula exacta del archivo
import MiPerfil from './pages/Perfil';

function AppContent() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Escuchar sesión de Supabase
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // Sonido al cambiar ruta
  useEffect(() => {
    const beep = new Audio('/sounds/hard_Beep.mp3');
    beep.volume = 0.5;
    beep.play().catch(err => console.warn('Autoplay bloqueado:', err));
  }, [location.pathname]);

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const baseLinks = [
    { path: '/', label: 'MOTHER BASE' },
    { path: '/productos', label: 'ARSENAL' },
    { path: '/contacto', label: 'CODECS' },
    { path: '/nosotros', label: 'MISIÓN' },
    { path: '/carrito', label: 'CARGA' },
    { path: '/perfil', label: 'MI PERFIL' },
  ];

  const adminLink = { path: '/admin', label: 'BIG BOSS' };
  const loginLink = { path: '/loginregister', label: 'INICIAR MISIÓN' };

  return (
    <div style={{
      backgroundColor: '#121212',
      minHeight: '100vh',
      color: '#00ffa2',
      fontFamily: "'Share Tech Mono', monospace",
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* NAVBAR */}
      <header style={{
        padding: '1rem',
        borderBottom: '1px solid #00ffa2',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        position: 'sticky',
        top: 0,
        backgroundColor: '#121212',
        zIndex: 100
      }}>
        {baseLinks.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            style={({ isActive }) => ({
              color: isActive ? '#00ff8c' : '#00ffa2',
              textDecoration: 'none',
              fontWeight: 'bold',
              borderBottom: isActive ? '2px solid #00ff8c' : 'none',
              paddingBottom: '4px',
              transition: 'color 0.3s, border 0.3s',
            })}
          >
            {link.label}
          </NavLink>
        ))}

        {/* ADMIN (solo si logueado y admin) */}
        {user?.user_metadata?.role === 'admin' && (
          <NavLink
            to={adminLink.path}
            style={({ isActive }) => ({
              color: isActive ? '#00ff8c' : '#00ffa2',
              textDecoration: 'none',
              fontWeight: 'bold',
              borderBottom: isActive ? '2px solid #00ff8c' : 'none',
              paddingBottom: '4px',
              transition: 'color 0.3s, border 0.3s',
            })}
          >
            {adminLink.label}
          </NavLink>
        )}

        {/* LOGIN o LOGOUT */}
        {!user ? (
          <NavLink
            to={loginLink.path}
            style={({ isActive }) => ({
              color: isActive ? '#00ff8c' : '#00ffa2',
              textDecoration: 'none',
              fontWeight: 'bold',
              borderBottom: isActive ? '2px solid #00ff8c' : 'none',
              paddingBottom: '4px',
              transition: 'color 0.3s, border 0.3s',
            })}
          >
            {loginLink.label}
          </NavLink>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              color: '#00ffa2',
              fontWeight: 'bold',
              cursor: 'pointer',
              paddingBottom: '4px',
              borderBottom: '2px solid #00ff8c',
              transition: 'color 0.3s, border 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#00ff8c'}
            onMouseLeave={e => e.currentTarget.style.color = '#00ffa2'}
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
      <footer style={{
        padding: '1rem',
        borderTop: '1px solid #00ffa2',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#007a56'
      }}>
        Diamond Dogs © 2025 - Inspirado en iDroid
      </footer>
    </div>
  );
}

// Componente raíz
export default function App() {
  useEffect(() => {
    const audio = new Audio('/sounds/idroid_on.mp3');
    audio.volume = 0.7;
    audio.play().catch(err => console.warn("Autoplay bloqueado al iniciar", err));
  }, []);

  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

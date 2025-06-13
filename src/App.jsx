import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { playSound } from './assets/sounds/sounds';

// Pages
import Home from './pages/Home';
import Vapers from './pages/Vapers';
import Codec from './pages/Codec';
import Admin from './pages/Admin';
import LoginRegister from './pages/LoginRegister';

// Componente para efectos de sonido
const SoundOnHover = ({ children }) => {
  const handleHover = () => {
    playSound('hover');
  };

  return (
    <div onMouseEnter={handleHover}>
      {children}
    </div>
  );
};

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, checkSession } = useAuth();

  // Verificar sesión al cargar
  useEffect(() => {
    checkSession().catch(() => {
      // Limpiar tokens inválidos
      localStorage.removeItem('sb-auth-token');
      sessionStorage.removeItem('sb-auth-token');
    });
  }, []);

  // Efecto de sonido al cambiar de ruta
  useEffect(() => {
    playSound('beep');
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      playSound('logout');
      await logout();
      // Limpieza adicional
      localStorage.removeItem('sb-auth-token');
      sessionStorage.removeItem('sb-auth-token');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Links de navegación
  const baseLinks = [
    { path: '/', label: 'MOTHER BASE' },
    { path: '/vapers', label: 'VAPERS' },
    { path: '/codec', label: 'CODEC' }
  ];

  const linkStyle = (isActive) => ({
    color: isActive ? '#00FF41' : '#FF8C00',
    textDecoration: 'none',
    fontWeight: 'bold',
    borderBottom: isActive ? '2px solid #00FF41' : 'none',
    paddingBottom: '4px',
    transition: 'all 0.3s ease'
  });

  return (
    <div style={{
      backgroundColor: '#0F0F0F',
      minHeight: '100vh',
      color: '#E0E0D8',
      fontFamily: '"Courier New", monospace',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* NAVBAR */}
      <header style={{
        padding: '1rem',
        borderBottom: '1px solid #FF8C00',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        position: 'sticky',
        top: 0,
        backgroundColor: '#0F0F0F',
        zIndex: 100
      }}>
        {baseLinks.map((link) => (
          <SoundOnHover key={link.path}>
            <NavLink to={link.path} style={({ isActive }) => linkStyle(isActive)}>
              {link.label}
            </NavLink>
          </SoundOnHover>
        ))}

        {user?.role === 'admin' && (
          <SoundOnHover>
            <NavLink to="/admin" style={({ isActive }) => linkStyle(isActive)}>
              BIG BOSS
            </NavLink>
          </SoundOnHover>
        )}

        {!user ? (
          <SoundOnHover>
            <NavLink to="/login" style={({ isActive }) => linkStyle(isActive)}>
              INICIAR MISIÓN
            </NavLink>
          </SoundOnHover>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              color: '#FF8C00',
              fontWeight: 'bold',
              cursor: 'pointer',
              paddingBottom: '4px',
              borderBottom: '2px solid #FF8C00'
            }}
          >
            CERRAR SESIÓN
          </button>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vapers" element={<Vapers />} />
          <Route path="/codec" element={<Codec />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<LoginRegister />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer style={{
        padding: '1rem',
        borderTop: '1px solid #FF8C00',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#007a56'
      }}>
        Diamond Dogs © 2025 - Inspirado en iDroid
      </footer>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    playSound('startup');
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
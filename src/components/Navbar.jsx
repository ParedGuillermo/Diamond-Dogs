import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ user, onLogout }) => {
  const tabs = [
    { name: 'Mother Base', to: '/' },
    { name: 'Arsenal', to: '/productos' },
    { name: 'Codecs', to: '/contacto' },
    { name: 'Misión', to: '/nosotros' },
    { name: 'Big Boss', to: '/admin', requireAdmin: true },
    { name: 'Mi Perfil', to: '/perfil', requireAuth: true },
    { name: 'Iniciar Misión', to: '/loginregister', hideIfAuth: true },
  ]

  return (
    <nav className="w-full fixed top-0 left-0 bg-[#00FFFF] bg-opacity-90 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Navigation Links */}
        <div className="flex flex-1 justify-center gap-1">
          {tabs.map(({ name, to, requireAdmin, requireAuth, hideIfAuth }) => {
            // Filtrar según el estado del usuario
            if (requireAdmin && user?.role !== 'admin') return null
            if (requireAuth && !user) return null
            if (hideIfAuth && user) return null

            return (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-center py-2 px-3 uppercase font-stencil font-semibold tracking-wider transition-colors ${
                    isActive
                      ? 'text-black bg-idroid-accent'
                      : 'text-white hover:text-idroid-accent'
                  }`
                }
              >
                {name}
              </NavLink>
            )
          })}
        </div>

        {/* Logout Button */}
        {user && (
          <button
            onClick={onLogout}
            className="ml-4 bg-idroid-accent text-black font-stencil font-semibold px-3 py-1 rounded hover:bg-idroid-accentHover transition-colors"
            aria-label="Cerrar sesión"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
